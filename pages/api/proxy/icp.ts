import { NextApiRequest, NextApiResponse } from "next";
import got from "got";

export default async function Icp(req: NextApiRequest, res: NextApiResponse) {
  const { domain } = req.query;

  const url = `https://phehmt.laf.run/icp?token=637e79b77fd9b2915dfb7e6c&url=${domain}&whois=1&dns=1&icp=1`;

  console.log("icp proxy url");
  console.log(url);

  const data = await got(url).json();

  res.status(200).json(data);
}
