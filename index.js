const {
  getTransactionPathFromIntentBasket, getInstalledApps,
} = require('./dist')
const { getInitPayload, buildNonceForAddress, buildPermissionIntents, calculateNewProxyAddress } = require('./utils')
const { settings, permissions, extraActions } = require('./settings')
const { getProvider } = require('./providers')
const { getNetworkType } = require('./web3-utils')

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

  const registerHookIntent = [settings.tokenManager, 'registerHook(address)', [proxyAddress]]

  const intentBasket = [installAppIntent, ...permissionIntents, registerHookIntent, ...extraActions]

  console.log('intent basket', intentBasket)

  // Get transaction path for install and permission intents
  const { transaction } = await getTransactionPathFromIntentBasket(
    daoAddress,
    intentBasket,
    getNetworkType(),
    PROVIDER,
    { accounts: [settings.from] }
  )

  console.log('transaction', transaction)
}

main()