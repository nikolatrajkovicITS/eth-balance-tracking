import { AddressTokenBalances } from '@/src/components/organisms/AddressTokenBalancesTable';
import { TokenBalance } from '@/src/context/TokenBalanceContext';

export const extractTokenNames = (
  balancesData: AddressTokenBalances[],
): string[] => {
  return Array.from(
    new Set(
      balancesData.flatMap(({ balances }) =>
        balances.map(balance => balance.name),
      ),
    ),
  );
};

export const getTokenBalanceByName = (
  balances: TokenBalance[],
  name: string,
): string => {
  return balances.find(balance => balance.name === name)?.balance || 'N/A';
};
