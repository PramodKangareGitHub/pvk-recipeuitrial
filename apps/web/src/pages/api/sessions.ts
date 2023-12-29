import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from 'database'
const client = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const { sessions } = req.body;
        try {
            const response = await client.sessions.upsert({
                where: {
                    key: "Sessions",
                },
                update: {
                    value: sessions,
                },
                create: {
                    key: "Sessions",
                    value: sessions,
                },
            })
            return res.status(200).json({ message: "Sessions : Insert/Update Success" });
        } catch (e: any) {
            return res.status(500).json({ message: "Sessions : Insert/Update Failed", error: e });
        }

    } else {
        try {
            const session = await client.sessions.findFirst({where: {key: "Sessions"}});
            return res.status(200).json({ sessions: session?.value });
        } catch (e: any) {
            return res.status(500).json({ message: "Sessions : Fetch failed", error: e });
        }
    }
}
