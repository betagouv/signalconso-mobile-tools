import express from 'express'
import cors from 'cors'
import {UnknownRoutesHandler} from './middlewares/unknown.handler.js'
import {ExceptionsHandler} from './middlewares/exceptions.handler.js'
import {Config} from './config/config.js'
import {DGCCRFRSSController} from './controllers/dgccrfrss.controller.js'
import morgan from 'morgan'
import cron from 'node-cron'
import {fetchAndExtractRappelConso} from './services/rappelconso.service.js'

if (Config.oneSignalEnablePush) {
  console.log('Push notifications are enabled')
  // Every day at 9AM UTC
  // Rappel conso is sending new item at 5 in the morning
  cron.schedule('0 9 * * *', fetchAndExtractRappelConso)
} else {
  console.log('Push notifications are disabled, nothing to schedule.')
}

const app = express()
const port = Config.port

app.use(morgan('short'))

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

app.use('/', DGCCRFRSSController)

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
