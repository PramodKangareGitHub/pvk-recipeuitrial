import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from 'database'
const client = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const { sessionfolders } = req.body;
        try {
            const response = await client.sessionFolders.upsert({
                where: {
                    key: "sessionFolders",
                },
                update: {
                    value: sessionfolders,
                },
                create: {
                    key: "sessionFolders",
                    value: sessionfolders,
                },
            });
            return res.status(200).json({ sessionFolders: response?.value});
        }catch (e: any) {
            return res.status(500).json({ message: "sessionFolders : Insert/Update Failed", error: e });
        }
        
    } else {
        try {
            const response = await client.sessionFolders.findFirst();
            return res.status(200).json({ sessionFolders: response?.value })
        }
        catch (e: any) {
            return res.status(500).json({ message: "sessionFolders : Fetch failed", error: e });
        }
    }
}
