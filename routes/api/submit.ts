import { FreshContext } from "$fresh/server.ts";
import { keys, messages } from "../../store/store.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const { message, uses = 1 } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "invalid message" }), {
      status: 400,
    });
  }
  if (message.length > 255) {
    return new Response(JSON.stringify({ error: "message too long" }), {
      status: 400,
    });
  }

  if (keys.size === 0) {
    return new Response(JSON.stringify({ error: "sorry, no keys available" }), {
      status: 500,
    });
  }

  const idx = Math.floor(Math.random() * keys.size);
  const key = Array.from(keys)[idx];
  messages.set(key, { message, uses });
  keys.delete(key);

  return new Response(JSON.stringify({ key, error: null }), { status: 200 });
};
