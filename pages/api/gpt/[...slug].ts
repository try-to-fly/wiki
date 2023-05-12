import { NextApiRequest, NextApiResponse } from "next";
import got, { Method } from "got";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.status(200).end();
    return;
  }
  const { slug } = req.query;
  const url = `https://oai.hconeai.com/${(slug as string[]).join("/")}`;
  const headers = {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    Authorization: req.headers.authorization,
  };
  console.log(url, headers, req.body);
  try {
    const proxyRes = await got(url, {
      method: req.method as Method,
      headers,
      body: JSON.stringify(req.body),
      responseType: "json",
      resolveBodyOnly: false,
    });
    console.log(proxyRes.body);
    // 如果请求参数中有 {stream: true}，则使用 stream 返回数据
    if (req.body.stream) {
      proxyRes.pipe(res);
    } else {
      res.status(proxyRes.statusCode).json(proxyRes.body);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}
