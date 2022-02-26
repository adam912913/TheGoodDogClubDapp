import { useReducer } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Context from './web3-context'

import {
  notification
} from "antd";

const providerOptions = {
  walletconnect: {
    // uncomment CustomWC to fix sending tx
    // package: CustomWC, // required
    package: WalletConnectProvider, // required
    options: {
      infuraId: 'c5ed2bf837f149e48fd0639ec2bfcc25', // required
    },
  }
}

const defaultWeb3State = {
  web3: null,
  account: null,
  networkId: null,
  is_mbmenu_opened: false,
}

const web3Reducer = (state, action) => {
  if (action.type === 'SETWEB3') {
    return { ...state, web3: action.web3 }
  }
  if (action.type === 'ACCOUNT') {
    return { ...state, account: action.account }
  }
  if (action.type === 'NETWORKID') {
    return { ...state, networkId: action.networkId }
  }
  if (action.type === 'DISCONNECTWALLET') {
    return { ...state, account: null }
  }
  if (action.type === 'SET_MBMENU_OPENED') {
    console.log('SET_MBMENU_OPENED', action)
    return { ...state, is_mbmenu_opened: action.is_mbmenu_opened }
  }
  return defaultWeb3State
}

const Web3Provider = (props) => {
  const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State)

  const setWeb3Handler = async (web3) => {
    dispatchWeb3Action({ type: 'SETWEB3', web3: web3 })
  }

  const loadAccountHandler = async (web3) => {
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    if (accounts.length > 0) {
      const account = accounts[0]
      dispatchWeb3Action({ type: 'ACCOUNT', account: account })
      if (account !== null) {
        notification.success({
          message: 'Wallet is connected.',
          description: account,
          style: {
            width: 450,
          },
        });
      }
      return account
    }
    return null;
  }

  const loadNetworkIdHandler = async (web3) => {
    const networkId = await web3.eth.net.getId()
    dispatchWeb3Action({ type: 'NETWORKID', networkId: networkId })
    return networkId
  }

  const connectWalletHandler = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      })
      console.log(providerOptions)
      await web3Modal.clearCachedProvider()
      const provider = await web3Modal.connect()
      const web3 = new Web3(provider)
      console.log(web3)
      dispatchWeb3Action({ type: 'SETWEB3', web3: web3 })

      // // Get connected chain id from Ethereum node
      // const chainId = await web3.eth.getChainId();
      // if (chainId !== 1) {
      //   await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0x1' }],
      //   });
      //   return;
      // }

      // // Get connected chain id from Ethereum node
      // const chainId = await web3.eth.getChainId();
      // if (chainId !== 4) {
      //   await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0x1' }],
      //   });
      //   return;
      // }

      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      const account = accounts[0]
      dispatchWeb3Action({ type: 'ACCOUNT', account: account })
      if (account !== null) {
        notification.success({
          message: 'Wallet is connected.',
          description: account,
          style: {
            width: 450,
          },
        });
      }
      return account;
    } catch (e) {
      console.log('Could not get a wallet connection', e)
    }
    return null;
  }

  const disconnectWalletHandler = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    })
    await web3Modal.clearCachedProvider()
    dispatchWeb3Action({ type: 'DISCONNECTWALLET' })
    notification.info({
      message: 'Wallet is disconnected.',
    });
  }

  const set_is_mbmenu_opened_handler = async (new_state) => {
    dispatchWeb3Action({ type: 'SET_MBMENU_OPENED', is_mbmenu_opened: new_state })
  }

  const web3Context = {
    web3: web3State.web3,
    account: web3State.account,
    networkId: web3State.networkId,
    is_mbmenu_opened: web3State.is_mbmenu_opened,
    setWeb3: setWeb3Handler,
    loadAccount: loadAccountHandler,
    loadNetworkId: loadNetworkIdHandler,
    connectWallet: connectWalletHandler,
    disconnectWallet: disconnectWalletHandler,
    set_is_mbmenu_opened: set_is_mbmenu_opened_handler,
  }

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  )
}

export default Web3Provider
