import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type UserSearchTextContextType = [string, Dispatch<SetStateAction<string>>];

export const UserSearchTextContext = createContext<
  undefined | UserSearchTextContextType
>(undefined);

export const UserSearchTextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userSearchText, setUserSearchText] = useState("");

  return (
    <UserSearchTextContext.Provider value={[userSearchText, setUserSearchText]}>
      {children}
    </UserSearchTextContext.Provider>
  );
};
