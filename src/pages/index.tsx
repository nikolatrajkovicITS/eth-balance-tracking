import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';

import { AddressInputModal } from '@/src/components/molecules/AddressInputModal';
import { AddressTokenBalancesTable } from '@/src/components/organisms/AddressTokenBalancesTable';
import { PrimaryButton } from '@/src/components/atoms/PrimaryButton';
import { ActionType, useTokenBalance } from '../context/TokenBalanceContext';
import {
  LocalStorageKeys,
  addAccountBalanceStorage,
  getFromLocalStorage,
} from '../services/localStorageService';
import { useEthereum } from '../hooks/useEthereum';
import { useUpdateBalances } from '../hooks/useUpdateBalances';

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { state, dispatch } = useTokenBalance();
  const { getBalances } = useEthereum();

  useUpdateBalances();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const localData = getFromLocalStorage(
      LocalStorageKeys.UserTokenBalancesByAddress,
    );

    if (!localData?.length) {
      return;
    }

    dispatch({
      type: ActionType.INIT_ADDRESS_TOKEN_BALANCES,
      payload: localData,
    });
  }, [dispatch]);

  const handleSubmitAddress = async (address: string) => {
    try {
      const balances = await getBalances(address);

      const newAddressTokenBalance = {
        address,
        balances: balances.map(({ symbol, balance }) => ({
          name: symbol,
          balance,
        })),
      };

      dispatch({
        type: ActionType.ADD_OR_UPDATE_ADDRESS_BALANCE,
        payload: newAddressTokenBalance,
      });
      addAccountBalanceStorage(newAddressTokenBalance);
      setModalOpen(false);
    } catch (error) {
      console.error('Error getting balances', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={{ xs: 2, sm: 3, md: 4 }}>
        <PrimaryButton
          sx={{ mb: 2 }}
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Add Address
        </PrimaryButton>

        <AddressTokenBalancesTable
          addressTokenBalances={state.addressTokenBalances}
        />

        <AddressInputModal
          open={modalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAddress}
        />
      </Box>
    </Container>
  );
}
