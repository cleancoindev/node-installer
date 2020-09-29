const ANY_ENTITY = `0x${''.padEnd(40, 'f')}`

// This is an exmaple we have used for the Honey pot org used on xdai.
// Replace with your own settings.
 const settings = {
  aclAddress: '0xd8d039fd5a853c7b021f5bb26fb0dadf74fd11af',
  // conviction-beta.open.aragonpm.eth
  appId: '0xe4691f497f5e74daf61612cea2d5a540b095805872218eaa9108aa5fd76779a2',
  appInitSig : 'initialize(address,address,address,uint256,uint256,uint256,uint256)',
  appInitArgs: [
    // Honey token address
    '0x1DCa6B30E7E56CD001e161F99b3ABf04016E178d',
    // Vault address 
    '0x31c43bf990c55ef9d5af22cdff00ee717973ff57', 
    // Honey token address
    '0x1DCa6B30E7E56CD001e161F99b3ABf04016E178d', 
    // decay
    '9999799', 
    // _maxRatio
    '1000000', 
    // _weight
    '1000', 
    // _minThresholdStakePercentage
    '50000000000000000'
  ],
  contract: '0xe5dc3c7788281ea24f7a0a4340e43195c6a6d8d9',
  dandelionVoting: '0xdbac6ee92894b2070521d190973e7ffeb90573f6',
  daoAddress : '0x970aefa356057bd36e7be67ba5b439557495a4e2',
  from : '0x49C01b61Aa3e4cD4C4763c78EcFE75888b49ef50',
  chainId : 4,
  tokenManager: '0x0fdf9bcc531c21085f4ce44c777a01c8cf55571d',
  vault: '0x31c43bf990c55ef9d5af22cdff00ee717973ff57'
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
    },
    {	
      entity: settings.dandelionVoting, // dandelion-voting	
      role: roles.SET_HOOK_ROLE,
      where: settings.tokenManager, // hooked TM	
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
    }
  ]
}

const extraActions = [
  // tollgate.changeFeeAmount(100000000000000000)
  // ['0xe837f9a4c7aa7b218eee9905da0799cabf3c73f5', 'changeFeeAmount(uint256)', ['5000000000000000000']]
]

 
module.exports = { settings, permissions, extraActions }
