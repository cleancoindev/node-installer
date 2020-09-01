const ANY_ENTITY = `0x${''.padEnd(40, 'f')}`


// This is an exmaple we have used for the Honey pot org used on xdai.
// Replace with your own settings.
 const settings = {
  aclAddress: '0x6d3652655c59fc758942fa0a482a576146ccc2d6',
  appId: '0xabb88ccde8e73f80a3f4a14ef4f6bbfcc19f172a073a5d4cace3af06a8f2a182',
  appInitSig : 'function initialize(address,address,address,uint256,uint256,uint256,uint256)',
  appInitArgs: [
    '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9', 
    '0x05e42c4ae51ba28d8acf8c371009ad7138312ca4', 
    '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9', 
    '9999799', 
    '1000000', 
    '1000', 
    '50000000000000000'
  ],
  contract: '0x6A992a38C8780b040657A6F83049e838b9575abd',
  daoAddress : '0xe9869a0bbc8fb8c61b7d81c33fa2ba84871b3b0e',
  network : 'xdai'

}


const permissions = {
  create: [
    { 
      entity: '0x60a9372862bD752CD02D9AE482F94Cd2fe92A0Bf',
      role: '0x9d4f140430c9045e12b5a104aa9e641c09b980a26ab8e12a32a2f3d155229ae3', // UPDATE_SETTINGS_ROLE
      where: 'app',
      manager: '0x00f9092e5806628d7a44e496c503cec608e64f1f' // dandelion-voting
    },
    { 
      entity: ANY_ENTITY,
      role: '0xbf05b9322505d747ab5880dfb677dc4864381e9fc3a25ccfa184a3a53d02f4b2', // CREATE_PROPOSALS_ROLE
      where: 'app',
      manager: '0x00f9092e5806628d7a44e496c503cec608e64f1f' // dandelion-voting
    },
    { 
      entity: '0x60a9372862bD752CD02D9AE482F94Cd2fe92A0Bf',
      role: '0x3e317d8f3de745777f176274dda437b0b9bbbe0704f48e9be1821136c177b933', // CANCEL_PROPOSAL_ROLE
      where: 'app',
      manager: '0x00f9092e5806628d7a44e496c503cec608e64f1f' // dandelion-voting
    }
  ], 
  grant: [
    {
      entity: 'app',
      role: '0x8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c', //TRANSFER_ROLE
      where: '0x05e42c4ae51ba28d8acf8c371009ad7138312ca4' //vault address
    },
    {
      entity: '0x5141970563C7d70a129A05f575e9e34DF4bD81d8',
      role: '0x3e317d8f3de745777f176274dda437b0b9bbbe0704f48e9be1821136c177b933', // CANCEL_PROPOSAL_ROLE
      where: 'app'
    },
    {
      entity: '0x5141970563C7d70a129A05f575e9e34DF4bD81d8',
      role: '0x9d4f140430c9045e12b5a104aa9e641c09b980a26ab8e12a32a2f3d155229ae3', // UPDATE_SETTINGS_ROLE
      where: 'app'
    }
  ]
}
 
module.exports = { settings, permissions }