import {fetchRappelConso} from '../clients/rappelconso.client.js'

export const fetchAndFilter = async () => {
  const date = new Date().toISOString().split('T')[0]
  return await fetchRappelConso(date, 20)
}
