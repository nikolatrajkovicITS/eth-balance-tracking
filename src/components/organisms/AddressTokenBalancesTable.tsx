import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
      <AppText variant="subtitle1">
        Add the address of your account to view data or balance.
      </AppText>
    );
  }

  const tokenNames = extractTokenNames(addressTokenBalances);

  return (
    <Table>
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
    </Table>
  );
};
