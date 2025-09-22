"use client";

import createApolloClient from "@/libs/ApolloClient";
import { ApolloProvider } from "@apollo/client/react";
import React from "react";

const client = createApolloClient();

export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
