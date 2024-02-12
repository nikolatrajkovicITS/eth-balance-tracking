import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

export const AppText: FC<TypographyProps> = props => (
  <Typography {...props}>{props.children}</Typography>
);
