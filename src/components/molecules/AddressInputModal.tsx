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

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(address);
    onClose();
    setAddress('');
  };

  return (
    <DialogStyled open={open} onClose={onClose}>
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
        />
      </DialogContent>

      <DialogActions>
        <PrimaryButton type="button" onClick={onClose}>
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
