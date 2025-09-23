import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const isServer = typeof window === "undefined";
  const uri = isServer
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/graphql"
    : "/api/graphql";

  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
