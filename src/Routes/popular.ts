import axios from 'axios'
import cheerio from 'cheerio'
import { Router } from 'express'
import { IMinimalAnime } from '../Types'
import { getURL } from '../utils'

export default (): Router => {
    const router = Router()

    router.get('/:page', async (req, res) => {
        const results = new Array<IMinimalAnime>()
        const { page } = req.params
        if (isNaN(parseInt(page))) return void res.status(400).send('Page must be a number')
        try {
            const { data } = await axios.get<string>(getURL({ page }, '/popular'))
            const $ = cheerio.load(data)
            $('.img').each(function () {
                const title = $(this).children('a').attr().title
                const id = $(this).children('a').attr().href.slice(10)
                const image = $(this).children('a').children('img').attr().src
                results.push({ title, id, image })
            })
            res.json(results)
        } catch (error) {
            res.status(500).send({
                error: 'Something Went Wrong'
            })
            console.log(error)
        }
    })

    return router
}
