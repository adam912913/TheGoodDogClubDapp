import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import {
  Button,
  Input,
  Row,
  Col,
  notification
} from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import Web3Context from '../store/web3-context'
import CollectionContext from '../store/collection-context'
import { VERIFY_WHITELIST_APIURL } from "../config/config";

const MintForm = () => {
  const scrollTarget = useRef();
  const web3Ctx = useContext(Web3Context)
  const collectionCtx = useContext(CollectionContext)
  const [mint_count_value, set_mint_count_value] = useState(1)
  const [min_mint_count] = useState(1);
  const [max_mint_count, set_max_mint_count] = useState(5);
  const [is_start_minting, set_is_start_minting] = useState(false);

  useEffect(() => {
    console.log(collectionCtx.settings)
    const settings = collectionCtx.settings;
    if (settings) {
      switch (settings.mintStep) {
        case 0:
          set_max_mint_count(settings.limitFreeMintCount);
          break;
        case 1:
          set_max_mint_count(settings.limitPresaleCount);
          break;
        case 2:
          set_max_mint_count(settings.limitPublicsaleCount);
          break;

        default:
          set_max_mint_count(5);
          break;
      }
    }
    // window.scrollTo(0, scrollTarget.current.offsetTop)
    console.log('scrollTarget.current.offsetTop', scrollTarget.current.offsetTop)
    window.scrollTo({
      top: scrollTarget.current.offsetTop,
      behavior: 'smooth'
    });
  }, [collectionCtx.settings])

  function control_mint_count(is_flag) {
    console.log(web3Ctx)
    console.log(collectionCtx)
    if (is_flag && mint_count_value < max_mint_count) {
      set_mint_count_value((prev) => prev + 1)
    }
    else if (!is_flag && mint_count_value > min_mint_count) {
      set_mint_count_value((prev) => prev - 1)
    }
  }

  function onChangeInputMintCount(mint_count) {
    if (mint_count >= min_mint_count && mint_count <= max_mint_count) {
      set_mint_count_value(parseInt(mint_count))
    }
  }

  const action_connect_wallet = async () => {
    web3Ctx.connectWallet();
  }

  const action_disconnect_wallet = async () => {
    web3Ctx.disconnectWallet();
  }

  function action_mint() {
    if (web3Ctx.account === null) {
      notification.error({
        description: 'You should connect your wallet.',
      });
      return;
    }
    mintNFT();
  }

  const mintNFT = async () => {
    set_is_start_minting(true);
    const contract = collectionCtx.contract;
    let accountStatusList = await contract.methods.getAccountStatus(web3Ctx.account).call({
      from: web3Ctx.account
    });
    console.log(collectionCtx.settings)
    console.log(accountStatusList)
    const settings = collectionCtx.settings;
    let current_mint_count = parseInt(accountStatusList[settings.mintStep]);
    let total_mint_limit = -1;
    if (settings.mintStep === 0) {
      total_mint_limit = settings.limitFreeMintCount;
    }
    else if (settings.mintStep === 1) {
      total_mint_limit = settings.limitPresaleCount;
    }
    else if (settings.mintStep > 1) {
      total_mint_limit = settings.limitPublicsaleCount;
    }
    console.log(current_mint_count, total_mint_limit)
    if (current_mint_count + mint_count_value > total_mint_limit) {
      set_is_start_minting(false);
      notification.error({
        description: "You couldn't mint any more.",
      });
      return;
    }

    if (settings.mintStep === 0 || settings.mintStep === 1) {
      try {
        set_is_start_minting(true);
        const merkleTreeResult = await axios.post(VERIFY_WHITELIST_APIURL, { address: web3Ctx.account, mintStep: settings.mintStep });
        console.log(merkleTreeResult);
        if (merkleTreeResult.data !== undefined && merkleTreeResult.data.success === true && merkleTreeResult.data.verified === true) {
          callMintFunc(web3Ctx.account, contract, settings, mint_count_value, merkleTreeResult.data.proof);
        }
        else {
          notification.error({
            description: "You aren't a whitelist's member.",
          });
          set_is_start_minting(false);
        }
      } catch (error) {
        set_is_start_minting(false);
        notification.error({
          description: "No internet connection. Please check your network connection.",
        });
        console.log(error)
      }
    }
    else {
      callMintFunc(web3Ctx.account, contract, settings, mint_count_value, null);
    }
  }

  const callMintFunc = async (selectedAccount, contract, settings, mintCount, proof) => {
    console.log('before_mint', collectionCtx.settings);
    console.log(selectedAccount, contract, settings, mintCount, proof)
    if (settings.mintStep === 0) {
      //sign the transaction via Metamask
      try {
        contract.methods.mintFreeNormal(mintCount, proof).send({
          from: selectedAccount
        }).on('receipt', (res) => {
          const mintEventResult = res.events.Mint.returnValues;
          console.log(mintEventResult)
          // update settings.
          updateSettings(contract);
          notification.success({
            description: "Your new NFTs have just minted successfully.",
          });
          set_is_start_minting(false);
        }).on('error', (error) => {
          notification.error({
            description: error.message,
          });
          set_is_start_minting(false);
        });
      } catch (error) {
        notification.error({
          description: "Something went wrong: " + error.message,
        });
        set_is_start_minting(false);
      }
    }
    else if (settings.mintStep === 1) {
      //sign the transaction via Metamask
      try {
        let price = mintCount * settings.mintPricePresale;
        console.log(mintCount, settings.mintPricePresale, price)
        contract.methods.mintPresale(mintCount, proof).send({
          from: selectedAccount,
          value: price
        }).on('receipt', (res) => {
          const mintEventResult = res.events.Mint.returnValues;
          console.log(mintEventResult)
          updateSettings(contract);
          notification.success({
            description: "Your new NFTs have just minted successfully.",
          });
          set_is_start_minting(false);
          // return resolve(mintEventResult);
        }).on('error', (error) => {
          notification.error({
            description: error.message,
          });
          set_is_start_minting(false);
        });
      } catch (error) {
        notification.error({
          description: "Something went wrong: " + error.message,
        });
        set_is_start_minting(false);
      }
    }
    else if (settings.mintStep >= 2) {
      //sign the transaction via Metamask
      try {
        const web3 = web3Ctx.web3;
        const etherValue = web3.utils.fromWei(web3.utils.toBN(settings.mintPricePublicsale), 'ether') * mintCount;
        var price = web3Ctx.web3.utils.toWei(String(etherValue.toFixed(10)), 'ether');
        console.log(price)
        contract.methods.mintPublic(mintCount).send({
          from: selectedAccount,
          value: price
        }).on('receipt', (res) => {
          const mintEventResult = res.events.Mint.returnValues;
          console.log(mintEventResult)
          updateSettings(contract);
          notification.success({
            description: "Your new NFTs have just minted successfully.",
          });
          set_is_start_minting(false);
          // return resolve(mintEventResult);
        }).on('error', (error) => {
          notification.error({
            description: error.message,
          });
          set_is_start_minting(false);
        });
      } catch (error) {
        notification.error({
          description: "Something went wrong: " + error.message,
        });
        set_is_start_minting(false);
      }
    }
  }

  const updateSettings = async (nftContract) => {
    await collectionCtx.loadSettings(nftContract);
    await collectionCtx.loadTotalSupply(nftContract);
    console.log('after_mint', collectionCtx.settings);
  }

  return (
    <React.Fragment>
      <div className='mintform' ref={scrollTarget}>
        <Row>
          <Col className="gutter-row" span={24}>
            <div className="mint_count_input_group">
              <button
                className='btn_control_count minus_btn'
                onClick={() => control_mint_count(false)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <Input
                size="large"
                onChange={e => onChangeInputMintCount(e.target.value)}
                defaultValue={mint_count_value}
                value={mint_count_value}
                className="input_mint_count"
                min="1"
                max="20" />
              <button
                className="btn_control_count plus_btn"
                onClick={() => control_mint_count(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </Col>
        </Row>
        {collectionCtx.settings ? (
          <Row className='mint_status_row'>
            <Col className="gutter-row" span={24}>
              <h3>{collectionCtx.totalSupply} minted</h3>
              <h3>** Maximum {max_mint_count} per wallet **</h3>
            </Col>
          </Row>
        ) : ("")}
        <Row className="mint_btn_group">
          <Col className="gutter-row" span={24}>
            <Button
              type="primary"
              shape="round"
              loading={is_start_minting}
              size="large"
              onClick={action_mint}
              className="btn_mint"
            >
              Mint
            </Button>
            {web3Ctx.account === null ? (
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={action_connect_wallet}
                className="btn_connect_wallet"
              >
                Connect Wallet
              </Button>
            ) : (
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={action_disconnect_wallet}
                className="btn_connect_wallet"
              >
                Disconnect Wallet
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default MintForm
