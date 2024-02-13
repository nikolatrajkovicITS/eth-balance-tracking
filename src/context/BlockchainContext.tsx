import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { ethers } from 'ethers';

interface BlockchainContextType {
  provider: ethers.Provider | null;
}

interface BlockchainProviderProps {
  children: ReactNode;
}

const INFURA_ID: string = '';
const INFURA_NETWORK: string = 'homestead';

const BlockchainContext = createContext<BlockchainContextType | undefined>(
  undefined,
);

export const BlockchainProvider: FC<BlockchainProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<ethers.InfuraProvider | null>(null);

  useEffect(() => {
    const initEthers = () => {
      const provider = new ethers.InfuraProvider(INFURA_NETWORK, INFURA_ID);
      setProvider(provider);
    };

    initEthers();
  }, []);

  return (
    <BlockchainContext.Provider value={{ provider }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }

  return context;
};
