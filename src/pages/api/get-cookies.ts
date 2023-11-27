import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { account_id, balance } = req.cookies;
    res.status(200).send({ account_id, balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

