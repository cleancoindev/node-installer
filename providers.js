const Web3HttpProvider = require('web3-providers-http');
const { providers } = require('ethers');
const { getNetworkType } = require('./web3-utils');
const { settings } = require('./settings');

const RPCS = {
  rinkeby: 'https://rinkeby.eth.aragon.network/',
  xdai: 'https://xdai.poanetwork.dev/',
}

const getProvider = () => {

  const { chainId } = settings
  const rpc = RPCS[getNetworkType(chainId)]

  console.log('chaunId', chainId)
  console.log('rpc', rpc)
  const web3Provider = new Web3HttpProvider(rpc,  
    { 
      keepAlive: true,
      timeout: 20000, // milliseconds,
      withCredentials: false
    }
  )

  return new providers.Web3Provider(web3Provider, chainId)
}

module.exports =  {
  getProvider
}

