"use client";

import { client } from "@/graphql/client";
import { ReactNode } from "react";
import { Provider } from "urql";

export default function UrqlProvider({ children, token }: { token: string; children: ReactNode }) {
  return <Provider value={client(token)}>{children}</Provider>;
}
