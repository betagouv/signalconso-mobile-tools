import {Config} from '../config/config.js'
import {PageNotFoundException} from '../utils/exceptions.js'
import {RappelConso} from '../models/model.js'

export const fetchRappelConso = async (date: string, limit: number): Promise<RappelConso> => {
  const response = await fetch(
    `${Config.rappelConsoUrl}?where=date_de_publication >= '${date}'&order_by=date_de_publication DESC&limit=${limit}`,
  )
  const body = await response.json()

  if (response.status >= 200 && response.status < 400) {
    return body
  } else {
    console.debug(`Request to ${Config.rappelConsoUrl} returned status ${response.status}`)
    return Promise.reject(new PageNotFoundException(Config.rappelConsoUrl))
  }
}
