import { FreshContext } from "$fresh/server.ts";
import { keys, messages } from "../../store/store.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (keys.size === 0) {
    return new Response(JSON.stringify({ error: "sorry, no keys available" }), {
      status: 500,
    });
  }

  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return new Response(JSON.stringify({ error: "invalid content type" }), {
      status: 400,
    });
  }

  const form = await req.formData();

  const uses = isNaN(parseInt(form.get("uses") as string))
    ? 1
    : parseInt(form.get("uses") as string);
  const message = form.get("message") as string ?? "";

  let fileName = "";
  let fileType = "";
  let base64 = "";
  const file = form.get("file") as File;
  if (file) {
    fileName = file.name;
    fileType = file.type;
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);

    const byteCharacters = [];
    const chunkSize = 8192;
    for (let i = 0; i < fileBytes.length; i += chunkSize) {
      const chunk = Array.from(fileBytes.slice(i, i + chunkSize));
      byteCharacters.push(String.fromCharCode.apply(null, chunk));
    }
    base64 = btoa(byteCharacters.join(""));
  }

  if (!message && !file) {
    return new Response(JSON.stringify({ error: "invalid message" }), {
      status: 400,
    });
  }

  if (typeof message === "string" && message.length > 255) {
    return new Response(JSON.stringify({ error: "message too long" }), {
      status: 400,
    });
  }

  const idx = Math.floor(Math.random() * keys.size);
  const key = Array.from(keys)[idx];
  messages[key] = { message, file: base64, fileName, fileType, uses };
  keys.delete(key);

  return new Response(JSON.stringify({ key, error: null }), { status: 200 });
};
