const settings = require("./settings")

const DEFAULT_LOCAL_CHAIN = ''

function getNetworkType(chainId) {
  chainId = String(chainId)

  if (chainId === '1') return 'mainnet'
  if (chainId === '3') return 'ropsten'
  if (chainId === '4') return 'rinkeby'
  if (chainId === '100') return 'xdai'

  return DEFAULT_LOCAL_CHAIN
}

module.exports = { getNetworkType }