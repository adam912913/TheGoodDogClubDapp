import React from 'react';

const CollectionContext = React.createContext({
  contract: null,
  totalSupply: null,
  settings: null,
  loadContract: () => { },
  loadTotalSupply: () => { },
  loadSettings: () => { },
  setupSettingsDirectly: () => { }
});

export default CollectionContext;