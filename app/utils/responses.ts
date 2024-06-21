import { json } from "@remix-run/node";

export function error(e: unknown) {
  if (e instanceof Error) {
    const { message, stack } = e as Error;
    return json({ $$error: { message, stack } }, { status: 500 });
  }
  return json({ $$error: { message: "Unknown error", e } }, { status: 500 });
}
