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

  let intents = []
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
  intents = intents.concat(createPermissionIntents)

  if (!permissions.grant) {
    return intents
  }

  const grantPermissionIntents = permissions.grant.map(({ entity, role, where }) => {
    const who = entity === 'app' ? counterfactualAppAddr : entity
    const onApp = where === 'app' ? counterfactualAppAddr : where 

    return [aclAddress, 'grantPermission', [who, onApp, role]]
  })

  intents = intents.concat(grantPermissionIntents)

  if (!permissions.revoke) {
    return intents
  }

  const revokePermissionIntents =  permissions.revoke.map(({ entity, role, where }) => {
    return [aclAddress, 'revokePermission', [entity, where, role]]
  })

  intents = intents.concat(revokePermissionIntents)
  return intents
}

module.exports = {
  getInitPayload,
  buildNonceForAddress,
  calculateNewProxyAddress,
  buildPermissionIntents
}