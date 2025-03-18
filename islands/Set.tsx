import { useRef, useState } from "preact/hooks";

export function Set() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uses, setUses] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    if (!file && !message) {
      alert("Please provide a message or a file.");
      return;
    }

    if (file) {
      formData.append("file", file);
    }
    if (message) {
      formData.append("message", message);
    }
    formData.append("uses", uses.toString());

    const response = await fetch("/api/set", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      setError("");
      setKey(data.key);
      setMessage("");
      setFile(null);
      setUses("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError(data.error);
    }

    setLoading(false);
  };

  return (
    <div class="flex flex-col items-center text-gray-100 pt-16">
      <h1>set a message</h1>
      <input
        type="text"
        value={message}
        onInput={(event) =>
          setMessage((event.target as HTMLInputElement).value)}
        placeholder="enter message"
        class="m-2 p-2 w-72 bg-gray-800 text-gray-100 rounded"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event) =>
          setFile((event.target as HTMLInputElement).files?.[0] || null)}
        class="m-2 p-2 w-72 bg-gray-800 text-gray-100 rounded"
      />
      <input
        type="number"
        value={uses}
        onInput={(event) => setUses((event.target as HTMLInputElement).value)}
        placeholder="uses (defaults to 1)"
        class="m-2 p-2 w-72 bg-gray-800 text-gray-100 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        class="m-2 p-2 w-72 bg-blue-500 text-white rounded"
      >
        {loading ? "loading..." : "submit"}
      </button>
      {error && <p class="text-red-500">error: {error}</p>}
      {key !== "" && <p>key: {key}</p>}
    </div>
  );
}
