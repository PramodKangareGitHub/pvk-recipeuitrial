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
            const output = await client.output.upsert({
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
            return res.status(200).json({ message: 'Output : Insert/Update Success' })
        } catch (e: any) {
            return res.status(500).json({ message: 'Output : Insert/Update Failed', error: e });
        }

    } else if (req.method == 'DELETE') {
        const { key } = req.body;
        try {
            const existingOut = await client.output.findFirst({ where: { key: key, } });
            if(existingOut){
                const response = await client.output.delete({
                    where: {
                        key: key,
                    }
                });
                return res.status(200).json({ message: "Output : Delete Success" });
            }
            return res.status(200).json({ message: "Output : No record found for this session key : "+key });
          
        } catch (e: any) {
            return res.status(500).json({ message: 'Output : Delete Failed', error: e });
        }
    } {
        try {
            const { key } = req.query;
            const output = await client.output.findFirst({
                where: {
                    key: {
                        in: key,
                    },
                }
            });
            return res.status(200).json({ outputs: output?.value });
        } catch (e: any) {
            return res.status(500).json({ message: 'Output : Fetch Failed', error: e });
        }
    }
}
