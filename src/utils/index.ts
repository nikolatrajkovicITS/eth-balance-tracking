import { AddressTokenBalance } from '@/src/components/organisms/AddressTokenBalancesTable';
import { TokenBalance } from '@/src/context/TokenBalanceContext';

export const extractTokenNames = (
  balancesData: AddressTokenBalance[],
): string[] => {
  return Array.from(
    new Set(
      balancesData.flatMap(({ balances }) =>
        balances ? balances.map(token => token.name) : [],
      ),
    ),
  );
};
export const getTokenBalanceByName = (
  balances: TokenBalance[] | undefined,
  name: string,
): string => {
  return balances?.find(token => token.name === name)?.balance ?? 'N/A';
};
