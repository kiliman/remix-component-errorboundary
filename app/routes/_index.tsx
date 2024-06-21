import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import Widget from "~/components/widget";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (url.searchParams.has("error")) {
    throw new Error("This is an error");
  }
  return json({ message: "Hello, world!" });
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/?error">Trigger Route Error</Link>
        </li>
      </ul>
      <Widget />
    </div>
  );
}
