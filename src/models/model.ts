export interface DGCCRFActuRSSFeed {
  title: string
  link: string
  description: string
  items: DGCCRFActuRssItem[]
}

export interface DGCCRFActuRssItem {
  title?: string
  link?: string
  description?: string
  date?: string
  guid?: string
}
