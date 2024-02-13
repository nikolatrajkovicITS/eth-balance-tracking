import { AddressTokenBalance } from '../components/organisms/AddressTokenBalancesTable';

export enum LocalStorageKeys {
  UserTokenBalancesByAddress = 'userTokenBalancesByAddress',
}

export const saveToLocalStorage = (key: LocalStorageKeys, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getFromLocalStorage = (key: LocalStorageKeys): any | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error retrieving from localStorage', error);
    return null;
  }
};

export const addAccountBalanceStorage = (
  newAccountBalance: AddressTokenBalance,
): void => {
  const existingBalances: AddressTokenBalance[] =
    getFromLocalStorage(LocalStorageKeys.UserTokenBalancesByAddress) || [];

  const existingIndex = existingBalances.findIndex(
    balance => balance.address === newAccountBalance.address,
  );

  let updatedBalances: AddressTokenBalance[];
  if (existingIndex !== -1) {
    updatedBalances = existingBalances.map((balances, index) => {
      if (index === existingIndex) {
        return {
          ...balances,
          balance: newAccountBalance.balances,
        };
      }
      return balances;
    });
  } else {
    updatedBalances = [...existingBalances, newAccountBalance];
  }

  saveToLocalStorage(
    LocalStorageKeys.UserTokenBalancesByAddress,
    updatedBalances,
  );
};

export const loadAddressTokenBalances = (): AddressTokenBalance[] => {
  const storedData: AddressTokenBalance[] | null = getFromLocalStorage(
    LocalStorageKeys.UserTokenBalancesByAddress,
  );
  if (!storedData) {
    console.error(
      'No data found in localStorage for key:',
      LocalStorageKeys.UserTokenBalancesByAddress,
    );
    return [];
  }
  return storedData;
};
