const ANY_ENTITY = `0x${''.padEnd(40, 'f')}`

// This is an exmaple we have used for the Honey pot org used on xdai.
// Replace with your own settings.
 const settings = {
  aclAddress: '0x621375bb212cbc32ef89813465db25e4fdb08991',
  // conviction-beta.open.aragonpm.eth
  appId: '0xe4691f497f5e74daf61612cea2d5a540b095805872218eaa9108aa5fd76779a2',
  appInitSig : 'initialize(address,address,address,uint256,uint256,uint256,uint256)',
  appInitArgs: [
    // Honey token address
    '0x5E352ED38066417d70817399dC6D9d9236b5F203',
    // Vault address 
    '0x9e4b594a5580bbae1d3aca55f1ee0bfb0d784483', 
    // Honey token address
    '0x5E352ED38066417d70817399dC6D9d9236b5F203', 
    // decay
    '9999799', 
    // _maxRatio
    '1000000', 
    // _weight
    '2500', 
    // _minThresholdStakePercentage
    '50000000000000000'
  ],
  contract: '0xe5dc3c7788281ea24f7a0a4340e43195c6a6d8d9',
  dandelionVoting: '0x9bd3fcc7118e6f4d4643d133f1148e3236a9b627',
  daoAddress : '0x209a192773ecd17c367d325f41f95170127f7e48',
  from : '0xDc2aDfA800a1ffA16078Ef8C1F251D50DcDa1065',
  chainId : 4,
  tokenManager: '0xdcc2d00fc5f887f45a984891d8b1a18764282a8c',
  tollgate: '0x19e6237a4551c3210124b662484354e5c5ade38a',
  vault: '0x9e4b594a5580bbae1d3aca55f1ee0bfb0d784483'
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
      entity: '0xe7d47aa173e36455539208ed74056ae0487fd19d',  // Old conviction voting 
      role: roles.TRANSFER_ROLE,
      where: settings.vault
    }
  ]
}

const extraActions = [
  // tollgate.changeFeeAmount(100000000000000000)
  [settings.tollgate, 'changeFeeAmount(uint256)', ['5000000000000000000']]
]

 
module.exports = { settings, permissions, extraActions }
