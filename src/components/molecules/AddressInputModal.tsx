import { FC, useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { InputField } from '../atoms/InputField';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { isValidAddress } from '@/src/utils/ethUtils';

interface AddressInputModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void;
}

export const AddressInputModal: FC<AddressInputModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = () => {
    if (!isValidAddress(address)) {
      setError('Please enter a valid Ethereum address.');
      return;
    }

    onSubmit(address);
    onClose();
    setAddress('');
  };

  const handleClose = () => {
    onClose();
    setAddress('');
    setError('');
  };

  return (
    <DialogStyled open={open} onClose={handleClose}>
      <DialogTitle>Add New Address</DialogTitle>
      <DialogContent>
        <InputField
          autoFocus
          margin="dense"
          id="address"
          label="Ethereum Address"
          type="text"
          fullWidth
          variant="outlined"
          value={address}
          onChange={handleAddressChange}
          error={!!error}
          helperText={error}
        />
      </DialogContent>

      <DialogActions>
        <PrimaryButton type="button" onClick={handleClose}>
          Cancel
        </PrimaryButton>
        <PrimaryButton type="button" onClick={handleSubmit}>
          Add
        </PrimaryButton>
      </DialogActions>
    </DialogStyled>
  );
};

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
}));
