import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // Use an absolute URL for SSR (relative URLs cannot be used in SSR)
      uri: "https://your-api.com/graphql",
      fetchOptions: {
        // Optional: Next.js-specific fetch options for caching and revalidation
        // See: https://nextjs.org/docs/app/api-reference/functions/fetch
      },
    }),
  });
});