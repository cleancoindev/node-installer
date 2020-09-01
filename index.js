const { providers } = require('ethers')
const {
  getTransactionPath,
  getTransactionPathFromIntentBasket,
} = require('./dist')
const { getInitPayload, buildNonceForAddress, buildPermissionIntents, calculateNewProxyAddress } = require('./utils')
const { settings, permissions } = require('./settings')

const newAppInstanceSignature = 'newAppInstance(bytes32,address,bytes,bool)'

const Web3HttpProvider = require('web3-providers-http');
const web3Provider = new Web3HttpProvider('https://xdai.poanetwork.dev/',  
  { 
    keepAlive: true,
    timeout: 20000, // milliseconds,
    withCredentials: false
  }
)

const PROVIDER = new providers.Web3Provider(web3Provider, 100)

async function main() {
  const { aclAddress, appId, appInitSig, appInitArgs, contract, daoAddress, network } = settings
  const initPayload =  await getInitPayload(appInitSig, appInitArgs)

  const installParams = [appId, contract, initPayload, false]

  const installAppIntent = [
    daoAddress,
    newAppInstanceSignature,
    installParams,
  ]

  // // Look for a transaction path for the connected account
  // const path = await getTransactionPath(
  //   daoAddress,
  //   ...installAppIntent,
  //   network,
  //   PROVIDER,
   
  // )

  // if (!path.length) {
  //   throw new Error('Could not find tx path for given address')
  // }

  // const scriptExecutor =
  //   path.length === 1 ? path[0].from : path[path.length - 2].to

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

  const intentBasket = [installAppIntent, ...permissionIntents]

  console.log('intent basket', intentBasket)

  // Get transaction path for install and permission intents
  const { transaction } = await getTransactionPathFromIntentBasket(
    daoAddress,
    intentBasket,
    network,
    PROVIDER,
    { accounts: ['0x49C01b61Aa3e4cD4C4763c78EcFE75888b49ef50'] }
  )

  console.log('transaction', transaction)
}

main()