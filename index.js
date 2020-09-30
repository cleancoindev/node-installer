const {
  getTransactionPathFromIntentBasket, getInstalledApps, execAppMethod
} = require('./dist')
const { getInitPayload, buildNonceForAddress, buildPermissionIntents, calculateNewProxyAddress } = require('./utils')
const { settings, permissions, extraActions } = require('./settings')
const { getProvider } = require('./providers')
const { getNetworkType } = require('./web3-utils')

const { encodeCallScript } = require('@aragon/test-helpers/evmScript')
const { encodeActCall } = require('./dist')

const PROVIDER = getProvider()
const newAppInstanceSignature = 'newAppInstance(bytes32,address,bytes,bool)'

async function main() {
  const { aclAddress, appId, appInitSig, appInitArgs, contract, daoAddress } = settings
  const initPayload =  await getInitPayload(appInitSig, appInitArgs)

  const installParams = [appId, contract, initPayload, false]

  const installAppIntent = [
    daoAddress,
    newAppInstanceSignature,
    installParams,
  ]

  // Get conterfatual proxy address for app
  const nonce = await buildNonceForAddress(daoAddress, PROVIDER)
  const proxyAddress = await calculateNewProxyAddress(daoAddress, nonce)

  console.log('nonce', nonce)
  console.log('proxyAddress', proxyAddress)

  const permissionIntents = buildPermissionIntents(
    aclAddress,
    permissions,
    proxyAddress,
  )

  // const apps = await getInstalledApps(daoAddress, getNetworkType(), PROVIDER)
  // console.log('apps',apps)

  const registerHookIntent = [settings.tokenManager, 'registerHook(address)', [proxyAddress]]

  const intentBasket = [installAppIntent, ...permissionIntents, registerHookIntent, ...extraActions]

  console.log('intent basket', intentBasket)

  const actions = intentBasket.map(([destination, methodSignature, params]) => ({
    to: destination,
    calldata: encodeActCall(methodSignature, params),
  }))
  console.log('actions', actions)

  // Encode all actions into a single EVM script.
  const script = encodeCallScript(actions)

  const newVote = encodeCallScript([{to: settings.dandelionVoting, calldata: encodeActCall('newVote(bytes,string,bool)', [script, "some vote", false])}])
  
  // console.log(
  //   `npx dao exec ${daoAddress} ${settings.dandelionVoting} newVote ${script} someVote --environment aragon:${getNetworkType()} `
  // )
  const transaction = await execAppMethod(daoAddress, settings.tollgate, 'forward(bytes)', newVote, null, 'rinkeby', PROVIDER)

  console.log('transaction', transaction)
}

main()