import { useState } from 'react';
import { Container, Box } from '@mui/material';

import { AddressInputModal } from '@/src/components/molecules/AddressInputModal';
import { AddressTokenBalancesTable } from '@/src/components/organisms/AddressTokenBalancesTable';
import { PrimaryButton } from '@/src/components/atoms/PrimaryButton';
import { ActionType, useTokenBalance } from '../context/TokenBalanceContext';

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { state, dispatch } = useTokenBalance();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitAddress = (address: string) => {
    const tokenBalances = [
      { name: 'USDC', balance: '1000' },
      { name: 'USDT', balance: '1500' },
      { name: 'DAI', balance: '750' },
    ];

    dispatch({
      type: ActionType.SET_BALANCES,
      payload: { address, balances: tokenBalances },
    });

    setModalOpen(false);
  };

  const addressTokenBalances = state.addresses.map(address => ({
    address,
    balances: state.tokenBalances[address] || [],
  }));

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
          addressTokenBalances={addressTokenBalances}
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
