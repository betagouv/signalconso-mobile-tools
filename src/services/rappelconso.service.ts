import {fetchRappelConso} from '../clients/rappelconso.client.js'
import {pushNotif} from '../clients/onesignal.client.js'
import {RappelConso} from '../models/model.js'

const fetchTodayRappelConso = (): Promise<RappelConso> => {
  const date = new Date().toISOString().split('T')[0]
  return fetchRappelConso(date, 20)
}

export const fetchAndExtractRappelConso = async () => {
  const rappelConsoResult = await fetchTodayRappelConso()

  const count = rappelConsoResult.results.length

  const subCategoryTitles = [...new Set(rappelConsoResult.results.map(item => item.sous_categorie_de_produit))]

  const tags = categoriesRef
    .categories
    .flatMap(category => category.categories)
    .filter(subCategory => subCategoryTitles.includes(subCategory.title))
    .map(subCategory => subCategory.tag)

  if (tags.length === 0) {
    console.log(`No category found today. Nothing to do.`)
    return Promise.resolve()
  } else {
    console.log(`Sub categories found today: ${tags} for ${count} rappels`)
    return pushNotif(tags, count)
  }
}

const categoriesRef = {
  "categories": [
    {
      "category_title": "Alimentation",
      "categories": [
        { "title": "Additifs alimentaires", "tag": "additifs-alimentaires" },
        { "title": "Alcool et vin", "tag": "alcool-et-vin" },
        { "title": "Aliments diététiques et nutrition", "tag": "aliments-dietétiques-et-nutrition" },
        { "title": "Aliments pour animaux domestiques", "tag": "aliments-pour-animaux-domestiques" },
        { "title": "Aliments pour animaux d'élevage", "tag": "aliments-pour-animaux-d-elevage" },
        { "title": "Aliments pour bébés", "tag": "aliments-pour-bebes" },
        { "title": "Beurres d'origine végétale, graisses margarines et huiles", "tag": "beurres-origine-vegetale-graisses-margarines-huiles" },
        { "title": "Boissons non alcoolisées", "tag": "boissons-non-alcoolisees" },
        { "title": "Cacao, café et thé", "tag": "cacao-cafe-et-the" },
        { "title": "Céréales et produits de boulangerie", "tag": "cereales-et-produits-de-boulangerie" },
        { "title": "Eaux", "tag": "eaux" },
        { "title": "Escargots et grenouilles", "tag": "escargots-et-grenouilles" },
        { "title": "Fruits et légumes", "tag": "fruits-et-legumes" },
        { "title": "Herbes et épices", "tag": "herbes-et-epices" },
        { "title": "Lait et produits laitiers", "tag": "lait-et-produits-laitiers" },
        { "title": "Miel et gelée royale", "tag": "miel-et-gelee-royale" },
        { "title": "Noix et graines", "tag": "noix-et-graines" },
        { "title": "Oeufs et produits à base d'oeufs", "tag": "oeufs-et-produits-a-base-d-oeufs" },
        { "title": "Plats préparés et snacks", "tag": "plats-prepares-et-snacks" },
        { "title": "Produits de la pêche et d'aquaculture", "tag": "produits-de-la-peche-et-d-aquaculture" },
        { "title": "Produits sucrés", "tag": "produits-sucres" },
        { "title": "Soupes, sauces et condiments", "tag": "soupes-sauces-et-condiments" },
        { "title": "Viandes", "tag": "viandes" },
        { "title": "Autres", "tag": "autres" }
      ]
    },
    {
      "category_title": "Automobile et moyens de déplacement",
      "categories": [
        { "title": "Automobiles, motos, scooters", "tag": "automobiles-motos-scooters" },
        { "title": "Vélos, bicyclettes, vélos à assistance électrique", "tag": "velos-bicyclettes-velos-a-assistance-electrique" },
        { "title": "Engins de déplacement personnel", "tag": "engins-de-deplacement-personnel" },
        { "title": "Autres moyens de déplacement", "tag": "autres-moyens-de-deplacement" },
        { "title": "Pneus", "tag": "pneus" },
        { "title": "Tous types d'accessoires", "tag": "tous-types-d-accessoires" }
      ]
    },
    {
      "category_title": "Bébés-enfants (hors alimentaire)",
      "categories": [
        { "title": "Articles pour enfants et puériculture", "tag": "articles-pour-enfants-et-puericulture" },
        { "title": "Jouets", "tag": "jouets" },
        { "title": "Matériels scolaires", "tag": "materiels-scolaires" }
      ]
    },
    {
      "category_title": "Hygiène-Beauté",
      "categories": [
        { "title": "Cosmétiques", "tag": "cosmetiques" },
        { "title": "Produits d’hygiène (cotons, intime, papiers)", "tag": "produits-d-hygiene-cotons-intime-papiers" },
        { "title": "Dispositifs médicaux grand public", "tag": "dispositifs-medicaux-grand-public" },
        { "title": "Produits de tatouage", "tag": "produits-de-tatouage" }
      ]
    },
    {
      "category_title": "Vêtements, Mode, EPI",
      "categories": [
        { "title": "Vêtements, textiles, accessoires de mode", "tag": "vetements-textiles-accessoires-de-mode" },
        { "title": "Bijouterie", "tag": "bijouterie" },
        { "title": "Equipements de Protection Individuels", "tag": "equipements-de-protection-individuels" }
      ]
    },
    {
      "category_title": "Sports-loisirs",
      "categories": [
        { "title": "Equipements de sports et de loisirs", "tag": "equipements-de-sports-et-de-loisirs" },
        { "title": "Articles pyrotechniques", "tag": "articles-pyrotechniques" },
        { "title": "Gadgets", "tag": "gadgets" }
      ]
    },
    {
      "category_title": "Maison-Habitat",
      "categories": [
        { "title": "Articles de décoration", "tag": "articles-de-decoration" },
        { "title": "Articles imitant les denrées alimentaires", "tag": "articles-imitant-les-denrees-alimentaires" },
        { "title": "Appareils à gaz", "tag": "appareils-a-gaz" },
        { "title": "Appareils à pression", "tag": "appareils-a-pression" },
        { "title": "Mobilier", "tag": "mobilier" },
        { "title": "Papiers, cartons", "tag": "papiers-cartons" },
        { "title": "Produits chimiques", "tag": "produits-chimiques" },
        { "title": "Produits de construction", "tag": "produits-de-construction" },
        { "title": "Matériel de cuisine (sauf électroménager)", "tag": "materiel-de-cuisine-sauf-electromenager" }
      ]
    },
    {
      "category_title": "Appareils électriques, Outils",
      "categories": [
        { "title": "Appareils électriques, électroménager", "tag": "appareils-electriques-electromenager" },
        { "title": "Machines", "tag": "machines" },
        { "title": "Outils à main", "tag": "outils-a-main" }
      ]
    },
    {
      "category_title": "Equipements de communication",
      "categories": [
        { "title": "Equipements de communication, média", "tag": "equipements-de-communication-media" }
      ]
    },
    {
      "category_title": "Autres",
      "categories": [
        { "title": "Appareils laser", "tag": "appareils-laser" },
        { "title": "Briquets", "tag": "briquets" },
        { "title": "Instruments de mesure", "tag": "instruments-de-mesure" },
        { "title": "Divers", "tag": "divers" }
      ]
    }
  ]
}