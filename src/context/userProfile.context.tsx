import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type UserSearchTextContextType = [string, Dispatch<SetStateAction<string>>];

export const UserSearchTextContext = createContext<
  undefined | UserSearchTextContextType
>(undefined);

export const useUserSearchText = () => {
  const context = useContext(UserSearchTextContext);
  if (context === undefined) {
    throw new Error("useUserSearch must be used with Context Provider");
  }

  return context;
};

export const UserSearchTextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userSearchText, setUserSearchText] = useState("BhavyaCodes");

  return (
    <UserSearchTextContext.Provider value={[userSearchText, setUserSearchText]}>
      {children}
    </UserSearchTextContext.Provider>
  );
};
