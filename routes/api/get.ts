import { FreshContext } from "$fresh/server.ts";
import { keys, messages } from "../../store/store.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const { key } = await req.json();

  if (!key || typeof key !== "string") {
    return new Response(JSON.stringify({ error: "invalid key" }), {
      status: 400,
    });
  }

  const messageData = messages[key];
  if (!messageData) {
    return new Response(JSON.stringify({ error: "key not found" }), {
      status: 404,
    });
  }

  if (messageData.uses <= 1) {
    delete messages[key];
    keys.add(key);
  } else {
    messages[key].uses -= 1;
  }


  return new Response(
    JSON.stringify({
      message: messageData.message,
      file: messageData.file,
      fileType: messageData.fileType,
      fileName: messageData.fileName,
    }),
    {
      status: 200,
    },
  );
};
