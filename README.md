### Node installer.

Script for installing an app and setting up pemrissions on a single action (likely a vote).

The script only displays the `transaction` object. You can send the transaction using the truffle console (`web3.eth.sendTransaction()`)

### How to run

```
# install dependencies
yarn install
# compile toolkit
yarn compile
# Get install transaction
yarn start
```


### Settings

Here lives all the info necessary for installing and setting up the permissions of the app to install.

```
  aclAddress:      // Address of the org's ACL 
  appId:           // app id to install 
  appInitSig :     // The app initialize signature
  appInitArgs:     // The app initialize arguments
  contract:        // Address of the base contract
  daoAddress :     // Address of the dao
  from:            // Account that will be creating the transaction
  network :        // Network
```


### Permissions

#### Create


Array of permissions to create. Each item in the array should have the form of

```
{
  entity: // Entity to grant the permission to 
  role:   // Role's bytes  
  where:  // Address of the app where the permission is going to be created (if the permissions will be created on the app to install, then you should leave it as 'app')  
  manager: // Manager of the permission
}
```


### Grant

```
{
  entity:  // Entity to grant the permission to, (if you would like to grant the permission to the app to install then it sohuld be 'app' instead of an address)
  role:    // Role's bytes  
  where:   // Address of the app where the permission is going to be granted (if the permission will be granted in the app to install, then you should leave it as 'app') 
},
```

### Revoke

```
{
  entity:  // Entity to revoke the permission
  role:    // Role's bytes  
  where:   // Address of the app from which to revoke the permission
},
```