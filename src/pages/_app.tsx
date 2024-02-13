import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';
import { TokenBalanceProvider } from '../context/TokenBalanceContext';
import { BlockchainProvider } from '../context/BlockchainContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <BlockchainProvider>
        <TokenBalanceProvider>
          <Component {...pageProps} />
        </TokenBalanceProvider>
      </BlockchainProvider>
    </ThemeProvider>
  );
}
