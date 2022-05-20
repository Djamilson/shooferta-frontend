import { NextApiRequest, NextApiResponse } from 'next'
import { GePriceFreightService } from '../../_services/GePriceFreightService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('=>> banckend: ', req.method)
        if (req.method === 'POST') {
            console.log(req.body.zipCode)
            const s = await GePriceFreightService({
                zipCode: String(req.body.zipCode)
            })

            return res.status(200).json(s)
        } else {
            res.setHeader('Allow', 'POST')
            res.status(405).end('Method not allowed')
        }
    } catch (e) {
        console.log(e)
        res.send('Error')
    }
}
