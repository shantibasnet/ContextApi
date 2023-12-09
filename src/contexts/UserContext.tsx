import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type IUser = {
  name: string;
  email: string;
  login:boolean
};

export interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const defaultState: IUserContext = {
  user: {
    name: '',
    email: '',
    login: true
  },
  setUser: (user: IUser) => {},
}as IUserContext

export const UserContext = createContext(defaultState);

type IUserProvider = {
  children: ReactNode;
};

export default function UserProvider({ children }: IUserProvider) {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    login: true,
  });

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
