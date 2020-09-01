const { keccak256, RLP } = require('ethers/utils')
const { encodeActCall } = require('./dist')

async function getInitPayload(appInitSig, appInitArgs) {
  return encodeActCall(appInitSig, appInitArgs)
}

async function buildNonceForAddress(address, provider) {
  const txCount = await provider.getTransactionCount(address)
  return `0x${(txCount).toString(16)}`
}

/**
 * Calculates the next created address by the kernel
 * @dev see https://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed/761#761
 * @param {*} daoAddress address of the kernel
 * @param {*} nonce address nonce
 * @returns {string} conterfactual address
 */
async function calculateNewProxyAddress(daoAddress, nonce) {
  const rlpEncoded = RLP.encode([daoAddress, nonce])
  const contractAddressLong = keccak256(rlpEncoded)
  const contractAddress = `0x${contractAddressLong.substr(-40)}`

  return contractAddress
}

function buildPermissionIntents(
  aclAddress,
  permissions,
  counterfactualAppAddr
) {

  const createPermissionIntents = permissions.create.map(
    ({ entity, role, manager }) => {

      return [
        aclAddress,
        'createPermission',
        [
          entity,
          counterfactualAppAddr,
          role,
          manager,
        ],
      ]
    }
  )

  if (!permissions.grant) {
    return createPermissionIntents
  }

  const grantPermissionIntents = permissions.grant.map(({ entity, role, where }) => {
    const who = entity === 'app' ? counterfactualAppAddr : entity
    const onApp = where === 'app' ? counterfactualAppAddr : where 

    return [aclAddress, 'grantPermission', [who, onApp, role]]
  })

  return [...createPermissionIntents, ...grantPermissionIntents]
}

module.exports = {
  getInitPayload,
  buildNonceForAddress,
  calculateNewProxyAddress,
  buildPermissionIntents
}