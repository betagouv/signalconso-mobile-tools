import {Config} from '../config/config.js'

export const pushNotif = async (subCategories: string[], count: number) => {
  const filters = subCategories
    .flatMap(category => {
      return [{field: 'tag', key: category, relation: 'exists'}, {operator: 'OR'}]
    })
    .slice(0, -1)

  console.log('Generated one signal filters', filters)

  const frContent =
    count > 1 ? `${count} nouveaux produits rappelés` : `Un nouveau produit a été rappelé dans la catégorie ${subCategories[0]}`
  const enContent = ""


  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${Config.oneSignaleApiKey}`,
    },
    body: JSON.stringify({
      app_id: Config.oneSignalAppId,
      contents: {
        fr: frContent,
        en: enContent,
      },
      headings: {
        fr: '📢 Nouvelle alerte de produit dangereux',
        en: '📢 Dangerous product alert',
      },
      target_channel: 'push',
      filters: filters,
    }),
  }

  const pushResponse = await fetch(Config.oneSignalUrl, fetchOptions)

  const body = await pushResponse.json()

  console.log(`Push response status : ${pushResponse.status} with body`, body)

  return pushResponse
}
