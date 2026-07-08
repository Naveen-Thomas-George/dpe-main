import React, { ComponentType, lazy, Suspense } from 'react';

export interface DynamicOptions {
  ssr?: boolean;
  loading?: () => React.ReactNode;
}

export default function dynamic<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T } | T>,
  options?: DynamicOptions
) {
  // Simple React.lazy wrapper
  // Since Vite doesn't support the full next/dynamic feature set natively, 
  // we mock it with React.lazy and Suspense wrapper, preserving Next.js types.
  const LazyComponent = lazy(async () => {
    const res = await loader();
    if ('default' in res) {
      return res;
    }
    return { default: res };
  });

  const DynamicComponent = (props: React.ComponentProps<T>) => {
    const Loading = options?.loading ? options.loading() : null;

    return (
      <Suspense fallback={Loading}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  DynamicComponent.displayName = 'NextDynamicMock';
  return DynamicComponent;
}
