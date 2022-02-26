import React from 'react'

const Web3Context = React.createContext({
  web3: null,
  account: null,
  networkId: null,
  is_mbmenu_opened: false,
  setWeb3: () => { },
  loadAccount: () => { },
  loadNetworkId: () => { },
  connectWallet: () => { },
  disconnectWallet: () => { },
  set_is_mbmenu_opened: () => { },
})

export default Web3Context
