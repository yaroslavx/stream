import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "@/libs/constants/url.constants";

const httpLink = createHttpLink({
  uri: SERVER_URL,
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
