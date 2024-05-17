function noTrailingSlash(str: string) {
  return str.replace(/\/$/, '')
}

export const Config = {
  port: process.env.MOBILE_HELPERS_PORT,
  dgccrfRSSUrl: noTrailingSlash(process.env.DGCCRF_RSS_URL ?? ''),
  fetchTimeout: parseInt(process.env.SIRET_EXTRACTOR_FETCH_TIMEOUT ?? '5000'),
}
