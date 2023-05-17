import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const source = new EventSource("/api/demo/sse");
    source.onmessage = function (event) {
      setEvents((oldEvents) => [...oldEvents, event.data]);
      if (event.data.startsWith("5")) {
        source.close();
      }
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Server-Sent Events Demo</h1>
      <h1>
        注意：由于serveless
        function的限制，sse发送的消息只能在end事件后，合并获取到所有内容。
      </h1>
      {events.map((event, index) => (
        <p key={index}>{event}</p>
      ))}
    </div>
  );
}
