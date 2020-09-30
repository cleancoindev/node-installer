const ANY_ENTITY = `0x${''.padEnd(40, 'f')}`

// This is an exmaple we have used for the Honey pot org used on xdai.
// Replace with your own settings.
 const settings = {
  aclAddress: '0x6d3652655c59fc758942fa0a482a576146ccc2d6',
  // conviction-beta.aragonpm.eth
  appId: '0xabb88ccde8e73f80a3f4a14ef4f6bbfcc19f172a073a5d4cace3af06a8f2a182',
  appInitSig : 'initialize(address,address,address,uint256,uint256,uint256,uint256)',
  appInitArgs: [
    // Honey token address
    '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9',
    // Vault address 
    '0x05e42c4ae51ba28d8acf8c371009ad7138312ca4', 
    // Honey token address
    '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9', 
    // decay
    '9999799', 
    // _maxRatio
    '1000000', 
    // _weight
    '2500', 
    // _minThresholdStakePercentage
    '50000000000000000'
  ],
  contract: '0x6A992a38C8780b040657A6F83049e838b9575abd',
  dandelionVoting: '0x00f9092e5806628d7a44e496c503cec608e64f1f',
  daoAddress : '0xe9869a0bbc8fb8c61b7d81c33fa2ba84871b3b0e',
  from : '',
  chainId : 100,
  tokenManager: '0x2118c3343f6d6d7a2b2ff68c82581cc188166d54',
  tollgate: '0xbf5e915efe399db0a1ddc7b99e1bb80474469aea',
  vault: '0x05e42c4ae51ba28d8acf8c371009ad7138312ca4'
}


const roles = {
  CANCEL_PROPOSAL_ROLE: '0x3e317d8f3de745777f176274dda437b0b9bbbe0704f48e9be1821136c177b933',
  CREATE_PROPOSALS_ROLE: '0xbf05b9322505d747ab5880dfb677dc4864381e9fc3a25ccfa184a3a53d02f4b2',
  SET_HOOK_ROLE: '0xed0b3a1f9ade7707147da3c9b4175ccde2d62145e0ba6b632770cbd2f1c9e34b',
  TRANSFER_ROLE: '0x8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c',
  UPDATE_SETTINGS_ROLE: '0x9d4f140430c9045e12b5a104aa9e641c09b980a26ab8e12a32a2f3d155229ae3'
}

const permissions = {
  create: [
    { 
      entity: '0x60a9372862bD752CD02D9AE482F94Cd2fe92A0Bf',
      role: roles.UPDATE_SETTINGS_ROLE,
      where: 'app',
      manager: settings.dandelionVoting
    },
    { 
      entity: ANY_ENTITY,
      role: roles.CREATE_PROPOSALS_ROLE,
      where: 'app',
      manager: settings.dandelionVoting
    },
    { 
      entity: '0x60a9372862bD752CD02D9AE482F94Cd2fe92A0Bf',
      role: roles.CANCEL_PROPOSAL_ROLE, 
      where: 'app',
      manager: settings.dandelionVoting // dandelion-voting
    }
  ], 
  grant: [
    {
      entity: 'app',
      role: roles.TRANSFER_ROLE, 
      where: settings.vault
    },
    {
      entity: '0x5141970563C7d70a129A05f575e9e34DF4bD81d8',
      role: roles.CANCEL_PROPOSAL_ROLE, 
      where: 'app'
    },
    {
      entity: '0x5141970563C7d70a129A05f575e9e34DF4bD81d8',
      role: roles.UPDATE_SETTINGS_ROLE, 
      where: 'app'
    }
  ],
  revoke: [
    {
      entity: '0xbe753d0130a4c1246fad11d3ad11864c591571ba',  // Old conviction voting 
      role: roles.TRANSFER_ROLE,
      where: settings.vault
    },
  ]
}

const extraActions = [
  // tollgate.changeFeeAmount(100000000000000000)
  [settings.tokenManager, 'revokeHook(uint256)', [0]], // First CV
  [settings.tokenManager, 'revokeHook(uint256)', [2]], // Current CV
  [settings.tollgate, 'changeFeeAmount(uint256)', ['5000000000000000000']]
]

 
module.exports = { settings, permissions, extraActions }
