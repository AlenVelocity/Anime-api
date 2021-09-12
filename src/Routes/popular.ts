import axios from 'axios'
import cheerio from 'cheerio'
import { Router } from 'express'
import { GOGO_URL } from '../Constants'
import { IMinimalAnime } from '../Types'

export default (): Router => {
    const router = Router()

    router.get('/:page', async (req, res) => {
        const results = new Array<IMinimalAnime>()
        if (isNaN(parseInt(req.params.page))) return void res.status(400).send('Page must be a number')
        try {
            const { data } = await axios.get<string>(GOGO_URL.concat(`/popular?page=${req.params.page}`))
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
