import {
  ApolloClient,
  ApolloLink,
  from as fromLinks,
  InMemoryCache,
  NormalizedCacheObject,
  QueryOptions,
  WatchQueryOptions,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { authToken } from 'src/config';
import { storage } from './storage';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  } as WatchQueryOptions,
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  } as QueryOptions,
};

function create(): ApolloClient<NormalizedCacheObject> {
  const httpLink = createUploadLink({
    uri: 'http://localhost:7000/graphql',
    headers: {
      token: storage.getItem(authToken),
    },
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = storage.getItem(authToken);
    if (token) {
      operation.setContext({
        headers: {
          token,
        },
      });
    }
    return forward(operation);
  });
  // 处理错误的时候
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors, '错误');
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        // 根据错误处理业务，省去100行代码
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        return false;
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return new ApolloClient({
    // errorLink 应在 httpLink 前
    link: fromLinks([errorLink, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions,
    connectToDevTools: true,
  });
}

export const initApollo = (): ApolloClient<NormalizedCacheObject> => {
  if (!apolloClient) {
    apolloClient = create();
  }
  return apolloClient;
};
