import { useContext, useMemo, useState } from "react";
import { createContext } from "react";

interface AuthProps {
  children: React.ReactNode;
  userId?: number;
}

interface UserContextInterface {
  userIds: number | undefined;
  setUserIds: React.Dispatch<number | undefined>;
}

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider = (props: AuthProps) => {
  const { children, userId } = props;

  const [userIds, setUserIds] = useState<number | undefined>(userId);

  const contextIds = useMemo(() => ({ userIds, setUserIds }), [userIds]);

  return (
    <UserContext.Provider value={contextIds}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

// Disabled due to unnecessary fast refresh
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(UserContext);
