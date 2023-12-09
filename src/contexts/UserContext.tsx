// UserContext.tsx
import React, { createContext, useReducer, Dispatch, ReactNode, SetStateAction } from "react";

export type IUser = {
  name: string;
  email: string;
  login: boolean;
};

export interface IUserContext {
  user: IUser;
  dispatch: Dispatch<UserAction>;
  login: () => void;
  logout: () => void; // Add logout function
}

export const UserActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
} as const;

export type UserAction =
  | { type: typeof UserActionTypes.SET_USER; payload: IUser }
  | { type: typeof UserActionTypes.LOGOUT }
  

const userReducer = (state: IUser, action: UserAction): IUser => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return { ...state, ...action.payload };
    case UserActionTypes.LOGOUT:
      return { name: '', email: '', login: false };
    default:
      return state;
  }
};

const defaultUserState: IUser = {
  name: '',
  email: '',
  login: false,
};

export const UserContext = createContext<IUserContext | undefined>(undefined);

type IUserProvider = {
  children: ReactNode;
};

export default function UserProvider({ children }: IUserProvider) {
  const [user, dispatch] = useReducer(userReducer, defaultUserState);

  const setUser = (user: IUser) => {
    dispatch({ type: UserActionTypes.SET_USER, payload: user });
  };

  const login = () => {
    setUser({
      name: 'Shanti',
      email: 'Sha@example.com',
      login: true,
    });
  };
  const logout = () => {
    dispatch({ type: UserActionTypes.LOGOUT });
  };

  const contextValue: IUserContext = {
    user,
    dispatch,
    login,
    logout, 
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
