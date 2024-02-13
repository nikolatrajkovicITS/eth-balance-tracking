import { useCallback, useEffect } from 'react';

import { useEthereum } from './useEthereum';
import { ActionType, useTokenBalance } from '../context/TokenBalanceContext';
import { useLocalStorage, LocalStorageKeys } from '../hooks/useLocalStorage';

import { AddressTokenBalance } from '../components/organisms/AddressTokenBalancesTable';

export const useUpdateBalances = () => {
  const { getBalances } = useEthereum();
  const { state, dispatch } = useTokenBalance();

  const [_, setLocalTokenBalances] = useLocalStorage<AddressTokenBalance[]>(
    LocalStorageKeys.UserTokenBalancesByAddress,
    [],
  );

  const updateAllBalances = useCallback(async () => {
    try {
      const addresses = state.addressTokenBalances.map(
        ({ address }) => address,
      );
      const promises = addresses.map(async address => {
        const balances = await getBalances(address);

        return {
          address,
          balances: balances.map(({ symbol, balance }) => ({
            name: symbol,
            balance,
          })),
        };
      });
      const updatedBalances = await Promise.all(promises);
      console.warn('updatedBalances', updatedBalances);

      setLocalTokenBalances(updatedBalances);
      dispatch({
        type: ActionType.INIT_ADDRESS_TOKEN_BALANCES,
        payload: updatedBalances,
      });
    } catch (error) {
      console.error('Error updating balances', error);
    }
  }, [
    getBalances,
    state.addressTokenBalances,
    dispatch,
    setLocalTokenBalances,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateAllBalances();
    }, 20000);

    return () => clearInterval(intervalId);
  }, [updateAllBalances]);

  return { updateAllBalances };
};
