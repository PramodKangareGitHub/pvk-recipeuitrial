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
            const response = await client.parameters.upsert({
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
            return res.status(200).json({ message: "Parameters : Insert/Update Success" });
        } catch (e: any) {
            return res.status(500).json({ message: 'Parameters : Insert/Update Failed', error: e });
        }

    } else if (req.method == 'DELETE') {
        const { key } = req.body;
        try {
            const response = await client.parameters.delete({
                where: {
                    key: key,
                }
            });
            return res.status(200).json({ message: "Parameters : Delete Success" });
        } catch (e: any) {
            return res.status(500).json({ message: 'Parameters : Delete Failed', error: e });
        }
    } else {
        try {
            
            const { key } = req.query;
            const parameter = await client.parameters.findFirstOrThrow({
                where: {
                    key: {
                        in: key,
                    },
                }
            });
            return res.status(200).json({ parameter: parameter })
        } catch (e) {
            return res.status(500).json({ message: 'Parameters : Fetch Failed', error: e });
        }

    }
}
