import React, { PropsWithChildren, createContext, useReducer } from 'react';
import localStorageService from '../common/localStorage';

type User = {
  id: string;
};

export type Session = {
  user?: User;
  isDrawerOpen?: boolean;
  currentPage?: string;
  headerText?: string;
};

type ActionType = Session & {
  type: 'SET_USER' | 'LOGOUT' | 'TOGGLE_DRAWER' | 'SET_CURRENT_PAGE' | 'SET_HEADER_TEXT';
};

const initialState: Session = {
  user: undefined,
  isDrawerOpen: false,
  currentPage: 'Counter',
  headerText: '',
};

type SessionContextType = [Session, React.Dispatch<ActionType>];

const SessionContext = createContext<SessionContextType>([initialState, (): null => null]);

const reducer = (state: Session, action: ActionType): Session => {
  const { type, ...payload } = action;

  switch (type) {
    case 'SET_USER':
      localStorageService.set('user', payload.user);

      return { ...state, user: payload.user };

    case 'LOGOUT':
      localStorageService.clear();

      return initialState;

    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: payload.isDrawerOpen };

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: payload.currentPage };

    case 'SET_HEADER_TEXT':
      return { ...state, headerText: payload.headerText };

    default:
      throw new Error();
  }
};

const SessionContextProvider = (props: PropsWithChildren<{}>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <SessionContext.Provider value={[state, dispatch]}>{props.children}</SessionContext.Provider>;
};

export default SessionContextProvider;
export { SessionContext };
