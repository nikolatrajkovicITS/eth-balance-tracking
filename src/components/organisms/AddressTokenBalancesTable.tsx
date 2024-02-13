import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';

import { TokenBalance } from '@/src/context/TokenBalanceContext';
import { extractTokenNames, getTokenBalanceByName } from '@/src/utils';
import { AppText } from '../atoms/AppText';

export interface AddressTokenBalance {
  address: string;
  balances: TokenBalance[];
}

interface AddressTokenBalanceTableProps {
  addressTokenBalances: AddressTokenBalance[];
}

export const AddressTokenBalancesTable: FC<AddressTokenBalanceTableProps> = ({
  addressTokenBalances,
}) => {
  if (addressTokenBalances?.length === 0) {
    return (
      <StyledAppText variant="subtitle1">
        Add the address of your account to view data or balance.
      </StyledAppText>
    );
  }

  const tokenNames = extractTokenNames(addressTokenBalances);

  return (
    <StyledTable>
      <TableHead>
        <TableRow>
          <TableCell>Address</TableCell>
          {tokenNames.map((name, idx) => (
            <TableCell key={`${name}-${idx}`}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {addressTokenBalances.map(({ address, balances }, idx) => (
          <TableRow key={`${address}-${idx}`}>
            <TableCell>{address}</TableCell>
            {tokenNames.map(name => {
              const tokenBalance = getTokenBalanceByName(balances, name);

              return (
                <TableCell key={`${address}-${name}`}>{tokenBalance}</TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

const StyledAppText = styled(AppText)(({ theme }) => ({
  background: theme.palette.grey[400],
  padding: theme.spacing(2),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  background: theme.palette.grey[400],
  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
}));
