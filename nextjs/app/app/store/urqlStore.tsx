import { createUrqlClient } from "@/graphql/client";
import { createContext, useContext, useReducer } from "react";
import { Client, Provider } from "urql";

const UrqlContext = createContext<Client | undefined>(undefined);
const UrqlDispatchContext = createContext<() => void>(() =>
  createUrqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL),
);

interface Props {
  children: React.ReactNode;
}
export function UrqlProvider({ children }: Props) {
  const [urqlClient, dispatch] = useReducer(urqlClientReducer, initialUrqlClient);

  return (
    <UrqlContext.Provider value={urqlClient}>
      <UrqlDispatchContext.Provider value={dispatch}>
        <Provider value={urqlClient}>{children}</Provider>
      </UrqlDispatchContext.Provider>
    </UrqlContext.Provider>
  );
}

export function useUrql() {
  return useContext(UrqlContext);
}

export function useRecreateUrqlClient() {
  return useContext(UrqlDispatchContext);
}

function urqlClientReducer() {
  return createUrqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);
}

const initialUrqlClient = createUrqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);
