import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

function ReactQueryProvider({ children }: Props) {
  // Khởi tạo một lần duy nhất: nếu tạo thẳng trong thân component thì mỗi lần
  // re-render (kể cả khi đổi route) sẽ sinh QueryClient mới và mất sạch cache.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        // console.log('QueryCache', err);
        // showToastErrors(err);
      },
    }),
    mutationCache: new MutationCache({
      onError: () => {
        // console.log('mutationCache', err);
        // showToastErrors(err);
      },
    }),
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
