import { useReducer } from 'react';
import CollectionContext from './collection-context';

const defaultCollectionState = {
  contract: null,
  totalSupply: null,
  settings: null
};

const collectionReducer = (state, action) => {
  if (action.type === 'CONTRACT') {
    return { ...state, contract: action.contract };
  }

  if (action.type === 'LOADSUPPLY') {
    return { ...state, totalSupply: action.totalSupply };
  }

  if (action.type === 'LOADSETTINGS') {
    return { ...state, settings: action.settings };
  }

  return defaultCollectionState;
};

const CollectionProvider = props => {
  const [CollectionState, dispatchCollectionAction] = useReducer(collectionReducer, defaultCollectionState);

  const loadContractHandler = (web3, contractABIcode, deployedContractAddress) => {
    const contract = deployedContractAddress ? new web3.eth.Contract(contractABIcode, deployedContractAddress) : '';
    console.log(contract)
    dispatchCollectionAction({ type: 'CONTRACT', contract: contract });
    return contract;
  };

  const loadTotalSupplyHandler = async (contract) => {
    const totalSupply = await contract.methods.totalTokenSupply().call();
    dispatchCollectionAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
    return totalSupply;
  };

  const loadSettingsHandler = async (contract) => {
    const settings = await contract.methods.getSetting().call();
    /**
     * Get Setting
     *  0 :     mintStep
     *  1 :     mintPricePreSale
     *  2 :     mintPricePublicSale
     *  3 :     totalLimit
     *  4 :     LIMIT_FREE_MINT_COUNT
     *  5 :     LIMIT_PRE_SALE_COUNT
     *  6 :     LIMIT_PUBLIC_SALE_COUNT
     */
    const setting_values = {
      mintStep: parseInt(settings[0]),
      mintPricePresale: settings[1],
      mintPricePublicsale: settings[2],
      totalLimit: settings[3],
      limitFreeMintCount: parseInt(settings[4]),
      limitPresaleCount: parseInt(settings[5]),
      limitPublicsaleCount: parseInt(settings[6]),
    }
    console.log(setting_values)
    dispatchCollectionAction({ type: 'LOADSETTINGS', settings: setting_values });
    return setting_values;
  }

  const setupSettingsDirectlyHandler = async (settings) => {
    const setting_values = {
      mintStep: parseInt(settings[0]),
      mintPricePresale: settings[1],
      mintPricePublicsale: settings[2],
      totalLimit: settings[3],
      limitFreeMintCount: parseInt(settings[4]),
      limitPresaleCount: parseInt(settings[5]),
      limitPublicsaleCount: parseInt(settings[6]),
    }
    console.log(setting_values)
    dispatchCollectionAction({ type: 'LOADSETTINGS', settings: setting_values });
    return setting_values;
  }

  const collectionContext = {
    contract: CollectionState.contract,
    totalSupply: CollectionState.totalSupply,
    settings: CollectionState.settings,
    accountStatus: CollectionState.accountStatus,
    loadContract: loadContractHandler,
    loadTotalSupply: loadTotalSupplyHandler,
    loadSettings: loadSettingsHandler,
    setupSettingsDirectly: setupSettingsDirectlyHandler,
  };

  return (
    <CollectionContext.Provider value={collectionContext}>
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;