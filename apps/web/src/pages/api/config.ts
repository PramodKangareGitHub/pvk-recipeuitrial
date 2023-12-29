import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from 'database'
const client = new PrismaClient();
type Data = {
    id: string
    key: string
    value: any
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        try {
            let { key, value } = req.body;
            value = JSON.stringify(value);
            const config = await client.config.upsert({
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
            });
            config.value = JSON.parse(config.value);
            return res.status(200).json({ config: config })
        } catch (e: any) {
            return res.status(500).json({ message: 'Config : Insert/Update Failed', error: e });
        }

    }  else if (req.method == 'DELETE') {
        const { key } = req.body;
        try {
            const response = await client.config.delete({
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
            let config = await client.config.findFirstOrThrow({
                where: {
                    key: {
                        in: key,
                    },
                },
            });
            config.value = JSON.parse(config.value);
            return res.status(200).json({ config: config.value })
        } catch (e: any) {
            return res.status(500).json({ message: 'Config : Fetch Failed', error: e });
        }
    }
}
