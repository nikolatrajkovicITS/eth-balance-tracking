import { useState } from 'react';
import { Container, Box } from '@mui/material';

import { AddressInputModal } from '@/src/components/molecules/AddressInputModal';
import { AddressTokenBalancesTable } from '@/src/components/organisms/AddressTokenBalancesTable';
import { PrimaryButton } from '@/src/components/atoms/PrimaryButton';

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitAddress = (address: string) => {
    console.log(address);
  };

  const addressTokenBalances = [
    {
      address: '0xABC123...',
      balances: [
        { name: 'USDC', balance: '1000' },
        { name: 'USDT', balance: '500' },
        { name: 'DAI', balance: '750' },
      ],
    },
    {
      address: '0xDEF456...',
      balances: [
        { name: 'USDC', balance: '2000' },
        { name: 'USDT', balance: '1500' },
        { name: 'DAI', balance: '1750' },
      ],
    },
  ];

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
