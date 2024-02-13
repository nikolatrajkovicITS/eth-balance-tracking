import { ethers } from 'ethers';
import { useBlockchain } from '../context/BlockchainContext';

interface Token {
  address: string;
  symbol: string;
}

const erc20Abi = ['function balanceOf(address owner) view returns (uint256)'];

const tokens: Token[] = [
  { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', symbol: 'USDC' },
  { address: '0xdac17f958d2ee523a2206206994597c13d831ec7', symbol: 'USDT' },
  { address: '0x6b175474e89094c44da98b954eedeac495271d0f', symbol: 'DAI' },
];

export const useEthereum = () => {
  const { provider } = useBlockchain();

  const getBalances = async (
    address: string,
  ): Promise<{ symbol: string; balance: string }[]> => {
    if (!provider) {
      console.error('Ethereum provider not initialized');
      return [];
    }

    const balances = await Promise.all(
      tokens.map(async token => {
        const contract = new ethers.Contract(
          token.address,
          [...erc20Abi, 'function decimals() view returns (uint8)'],
          provider,
        );

        const [balance, decimals] = await Promise.all([
          contract.balanceOf(address),
          contract.decimals(),
        ]);
        const formattedBalance = ethers.formatUnits(balance, decimals);

        return {
          symbol: token.symbol,
          balance: formattedBalance,
        };
      }),
    );

    return balances;
  };

  return { getBalances };
};
