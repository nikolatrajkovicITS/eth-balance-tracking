import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/theme';
import { TokenBalanceProvider } from '../context/TokenBalanceContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TokenBalanceProvider>
        <Component {...pageProps} />
      </TokenBalanceProvider>
    </ThemeProvider>
  );
}
