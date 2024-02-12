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

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { state, dispatch } = useTokenBalance();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitAddress = (address: string) => {
    const newAddressTokenBalance = {
      address,
      balances: [
        { name: 'USDC', balance: '1000' },
        { name: 'USDT', balance: '1500' },
        { name: 'DAI', balance: '750' },
      ],
    };

    dispatch({
      type: ActionType.ADD_OR_UPDATE_ADDRESS_BALANCE,
      payload: newAddressTokenBalance,
    });
    addAccountBalanceStorage(newAddressTokenBalance);
    setModalOpen(false);
  };

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
