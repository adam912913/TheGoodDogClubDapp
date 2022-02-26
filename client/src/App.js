import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { Routes, Route } from 'react-router-dom'
import {
  notification
} from "antd";
import Web3Context from './store/web3-context'
import CollectionContext from './store/collection-context'
import contractABI from './artifacts/TheGoodDogClubDAO.json'

import HomePage from './pages/home/HomePage'
import MintPage from './pages/mint/MintPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import { CONTRACT_ADDRESS } from "./config/config";

const App = () => {
  const web3Ctx = useContext(Web3Context)
  const collectionCtx = useContext(CollectionContext)
  const [web3] = useState(window.ethereum ? new Web3(window.ethereum) : null)

  useEffect(() => {
    const setCollectionWeb3 = async () => {
      web3Ctx.setWeb3(web3)
    }
    setCollectionWeb3()

    // Check if the user has Metamask active
    if (!web3) {
      console.log('Non-Ethereum browser detected.You should consider trying MetaMask!')
      return
    }
    // Function to fetch all the blockchain data
    const loadBlockchainData = async () => {
      console.log(web3)
      // Load account
      const account = await web3Ctx.loadAccount(web3)
      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3)
      console.log(account, networkId)
      // Load Contracts
      const nftContract = collectionCtx.loadContract(web3, contractABI, CONTRACT_ADDRESS);
      console.log(nftContract)
      if (nftContract) {
        // Load total Supply
        await collectionCtx.loadTotalSupply(nftContract);
        await collectionCtx.loadSettings(nftContract);

        nftContract.events.Setting().on('data', function (event) {
          console.log(event.returnValues);
          collectionCtx.setupSettingsDirectly(event.returnValues);
        }).on('error', function (event) {
          console.log(event);
        });
      } else {
        notification.error({
          // message: '.',
          description: 'This contract is not deployed to detected network.',
          style: {
            width: 450,
          },
        });
      }

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
      });
      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        console.log(chainId)
        // window.location.reload();
      });
    }
    loadBlockchainData()
  }, [])

  console.log(web3Ctx)
  console.log(collectionCtx)
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/mint" element={<MintPage />} />
      <Route path="/" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;