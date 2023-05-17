import { NextApiRequest, NextApiResponse } from "next";

const maxEvent = 5;
// pages/api/events.js
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置HTTP头以启用SSE
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("Content-Encoding", "none");
  res.setHeader("Connection", "keep-alive");
  let i = 0;
  // 每秒发送一个新的事件
  const timer = setInterval(() => {
    i++;
    if (i > maxEvent) {
      clearInterval(timer);
      res.write("event: end\n");
      res.end();
      return;
    }
    res.write(`data: ${i} => ${new Date().toUTCString()}\n\n`); // 注意这里的格式，必须是"data: "开头，"\n\n"结尾
  }, 1000);
}
