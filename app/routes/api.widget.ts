import { LoaderFunctionArgs, json } from "@remix-run/node";
import { error } from "~/utils/responses";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    if (url.searchParams.has("error")) {
      throw new Error("💣 This is an error in the widget");
    }
    return json({ items: range(Date.now(), Date.now() + 10) });
  } catch (e) {
    // don't return an actual Error, but a json object that represents the error
    // this way Remix won't render the route error boundary and our component
    // error boundary can handle it
    return error(e);
  }
};

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
