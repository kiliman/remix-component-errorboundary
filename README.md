# Remix Component Error Boundary

This example includes a new `<ComponentErrorBoundary>` component that you can wrap around any non-critical component so that when an error occurs, it will not result in the default route `<ErrorBoundary>`, which may replace the entire page.

## Usage

Wrap your existing component with `<ComponentErrorBoundary>`. You can also provide your own `fallbackRenderer` or use the default.

```ts
<ComponentErrorBoundary>
  <Comments items={items} />
</ComponentErrorBoundary>

<ComponentErrorBoundary
  fallbackRender={({ error }) => <p>💣 Oops! {error.message}</p>}
>
  <Comments items={items} />
</ComponentErrorBoundary>
```

In your component, replace `useFetcher` with `useComponentFetcher`. This ensures it correctly handles error responses and triggers the error boundary. The
`useComponetFetcher` hook also supports type inference. It removes the error response
from the return type.

```ts
export function Component({ items }: { items?: number[] }) {
  const fetcher = useComponentFetcher<typeof loader>();
  items = fetcher.data?.items ?? items ?? [];
```

Finally, in your `loader` or `action`, do not throw errors or let them escape the function. You will need to wrap in `try/catch` and instead return an error object using the `error` helper function.

```ts
import { error } from "~/utils/responses";
export async function loader() {
  try {
    // do stuff
    return json(data);
  } catch (e) {
    // catch errors and return using helper
    return error(e);
  }
}
```
