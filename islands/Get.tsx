import { useState } from "preact/hooks";

export function Get() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleSubmit = async () => {
    const response = await fetch("/api/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      if (data.file) {
        const byteCharacters = atob(data.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        const file = new File([blob], data.fileName);
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setFileName(data.fileName);
        setFileType(data.fileType);
      }
    } else {
      setMessage("");
      setFileUrl(null);
      setFileName(null);
      setFileType(null);
    }
  };

  return (
    <div class="flex flex-col items-center bg-gray-900 text-gray-100 justify-start min-h-screen pt-16">
      <h1>get a message</h1>
      <input
        type="text"
        value={key}
        placeholder="enter key"
        onInput={(event) => setKey((event.target as HTMLInputElement).value)}
        class="m-2 p-2 w-72 bg-gray-800 text-gray-100 rounded"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        class="m-2 p-2 w-72 bg-blue-500 text-white rounded"
      >
        submit
      </button>
      {message !== "" && <p>message: {message}</p>}
      {fileUrl && (
        <>
          <p>{fileName}</p>
          <a href={fileUrl} download={fileName || "downloaded_file"}>
            download file
          </a>
          {fileType && fileType.startsWith("image/") && (
            <img
              src={fileUrl}
              alt={fileName || "preview"}
              class="max-w-xs max-h-xs"
            />
          )}
          {fileType === "application/pdf" && (
            <embed
              src={fileUrl}
              type="application/pdf"
              width="600"
              height="400"
            />
          )}
        </>
      )}
    </div>
  );
}
