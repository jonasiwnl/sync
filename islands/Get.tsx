import { useState } from "preact/hooks";

export function Get() {
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");

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
    }
  };

  return (
    <>
      <h1>get</h1>
      <input
        type="text"
        value={key}
        onInput={(event) => setKey((event.target as HTMLInputElement).value)}
      />
      <button type="submit" onClick={handleSubmit}>submit</button>
      {message !== "" && <p>message: {message}</p>}
    </>
  );
}
