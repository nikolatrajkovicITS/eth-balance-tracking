import {
  FC,
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

export interface TokenBalance {
  name: string;
  balance: string;
}

interface AddressTokenBalances {
  address: string;
  balances: TokenBalance[];
}

interface State {
  addressTokenBalances: AddressTokenBalances[];
}

export enum ActionType {
  REMOVE_BALANCE = 'REMOVE_BALANCE',
  ADD_OR_UPDATE_ADDRESS_BALANCE = 'ADD_OR_UPDATE_ADDRESS_BALANCE',
  INIT_ADDRESS_TOKEN_BALANCES = 'INIT_ADDRESS_TOKEN_BALANCES',
}

type Action =
  | {
      type: ActionType.ADD_OR_UPDATE_ADDRESS_BALANCE;
      payload: AddressTokenBalances;
    }
  | {
      type: ActionType.INIT_ADDRESS_TOKEN_BALANCES;
      payload: AddressTokenBalances[];
    }
  | { type: ActionType.REMOVE_BALANCE; payload: string };

const initialState: State = {
  addressTokenBalances: [],
};

const TokenBalanceContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_OR_UPDATE_ADDRESS_BALANCE:
      const existingIndex = state.addressTokenBalances.findIndex(
        atb => atb.address === action.payload.address,
      );

      if (existingIndex >= 0) {
        const updatedAddressTokenBalance = [...state.addressTokenBalances];
        updatedAddressTokenBalance[existingIndex] = action.payload;

        return { ...state, addressTokenBalances: updatedAddressTokenBalance };
      } else {
        return {
          ...state,
          addressTokenBalances: [...state.addressTokenBalances, action.payload],
        };
      }

    case ActionType.INIT_ADDRESS_TOKEN_BALANCES:
      return {
        ...state,
        addressTokenBalances: action.payload,
      };

    case ActionType.REMOVE_BALANCE:
      return {
        ...state,
        addressTokenBalances: state.addressTokenBalances.filter(
          atb => atb.address !== action.payload,
        ),
      };

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
