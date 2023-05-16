import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const source = new EventSource("/api/demo/sse");

    source.onmessage = function (event) {
      setEvents((oldEvents) => [...oldEvents, event.data]);
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Server-Sent Events Demo</h1>
      {events.map((event, index) => (
        <p key={index}>{event}</p>
      ))}
    </div>
  );
}
