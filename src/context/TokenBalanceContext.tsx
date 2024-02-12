import { FC, createContext, useReducer, useContext, ReactNode } from 'react';

export interface TokenBalance {
  name: string;
  balance: string;
}

interface State {
  addresses: string[];
  tokenBalances: { [address: string]: TokenBalance[] };
}

export enum ActionType {
  ADD_ADDRESS = 'ADD_ADDRESS',
  REMOVE_ADDRESS = 'REMOVE_ADDRESS',
  SET_BALANCES = 'SET_BALANCES',
}

type Action =
  | { type: ActionType.ADD_ADDRESS; payload: string }
  | { type: ActionType.REMOVE_ADDRESS; payload: string }
  | {
      type: ActionType.SET_BALANCES;
      payload: { address: string; balances: TokenBalance[] };
    };

const initialState: State = {
  addresses: [],
  tokenBalances: {},
};

const TokenBalanceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.includes(action.payload)
          ? state.addresses
          : [...state.addresses, action.payload],
        tokenBalances: state.tokenBalances[action.payload]
          ? state.tokenBalances
          : { ...state.tokenBalances, [action.payload]: [] },
      };
    case ActionType.REMOVE_ADDRESS:
      const { [action.payload]: removed, ...remainingBalances } =
        state.tokenBalances;
      return {
        ...state,
        addresses: state.addresses.filter(
          address => address !== action.payload,
        ),
        tokenBalances: remainingBalances,
      };
    case ActionType.SET_BALANCES:
      const { address, balances } = action.payload;
      if (!state.addresses.includes(address)) {
        return {
          ...state,
          addresses: [...state.addresses, address],
          tokenBalances: { ...state.tokenBalances, [address]: balances },
        };
      }
      return state;
    default:
      return state;
  }
};

export const TokenBalanceProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TokenBalanceContext.Provider value={{ state, dispatch }}>
      {children}
    </TokenBalanceContext.Provider>
  );
};

export const useTokenBalance = () => useContext(TokenBalanceContext);
