import { useState } from "preact/hooks";

export function Set() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uses, setUses] = useState(1);
  const [key, setKey] = useState("");

  const handleSubmit = async () => {
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
      setKey(data.key);
    }
  };

  return (
    <>
      <h1 class="font-semibold">set</h1>
      <input
        type="text"
        value={message}
        onInput={(event) =>
          setMessage((event.target as HTMLInputElement).value)}
        placeholder="Enter message"
      />
      <input
        type="file"
        onChange={(event) =>
          setFile((event.target as HTMLInputElement).files?.[0] || null)}
      />
      <input
        type="number"
        value={uses}
        onInput={(event) =>
          setUses(parseInt((event.target as HTMLInputElement).value))}
        placeholder="Uses"
      />
      <button type="submit" onClick={handleSubmit}>submit</button>
      {key !== "" && <p>key: {key}</p>}
    </>
  );
}
