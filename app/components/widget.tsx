import { useEffect } from "react";
import { loader as widgetLoader } from "~/routes/api.widget";
import {
  ComponentErrorBoundary,
  useComponentFetcher,
} from "./ComponentErrorBoundary";

export default function Component() {
  return (
    <div>
      <h2>Widget</h2>
      <ComponentErrorBoundary>
        <Widget />
      </ComponentErrorBoundary>
    </div>
  );
}

export function Widget() {
  const fetcher = useComponentFetcher<typeof widgetLoader>();
  useEffect(
    () => {
      if (fetcher.state === "idle" && !fetcher.data) {
        fetcher.load("/api/widget");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetcher.state, fetcher.data]
  );

  return (
    <div>
      <button onClick={() => fetcher.load("/api/widget")}>Reload</button>
      <button onClick={() => fetcher.load("/api/widget?error")}>
        Fetcher Error
      </button>
      <ul>
        {fetcher.data?.items.map((num: number) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}
