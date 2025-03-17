import { useState } from "preact/hooks";

export function Submit() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    if (response.ok) {
      setKey(data.key);
    }
  };

  return (
    <>
      <h1 class="font-lg font-semibold">set</h1>
      <input
        type="text"
        value={message}
        onInput={(event) =>
          setMessage((event.target as HTMLInputElement).value)}
      />
      <button type="submit" onClick={handleSubmit}>submit</button>
      {key !== "" && <p>key: {key}</p>}
    </>
  );
}
