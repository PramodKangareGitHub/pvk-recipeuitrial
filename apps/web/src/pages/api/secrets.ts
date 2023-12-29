import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from 'database'
const client = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const { key, value } = req.body;
        try {
            const response = await client.secrets.upsert({
                where: {
                    key: key,
                },
                update: {
                    value: value,
                },
                create: {
                    key: key,
                    value: value,
                },
            })
            return res.status(200).json({ message: "Secrets : Insert/Update success" });
        } catch (e: any) {
            return res.status(500).json({ message: "Secrets : Insert/Update Failed", error: e });
        }

    } else if (req.method == 'DELETE') {
        const { key, value } = req.body;
        try {
            const response = await client.secrets.delete({
                where: {
                    key: key,
                }
            })
            return res.status(200).json({ message: "Secrets : Delete success" });
        } catch (e: any) {
            return res.status(500).json({ message: "Secrets : Delete Failed", error: e });
        }

    } else {
        try {
            const { key } = req.query;
            const secrets = await client.secrets.findFirst({
                where: {
                    key: {
                        in: key,
                    },
                }
            });
            return res.status(200).json({ secrets: secrets })
        } catch (e) {
            return res.status(500).json({ message: "Secrets : Fetch failed", error: e });
        }
    }
}
