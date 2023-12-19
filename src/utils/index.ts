import { Regions } from 'twisted/dist/constants'

const regionMapping: Record<string, Regions> = {
  br: Regions.BRAZIL,
  eune: Regions.EU_EAST,
  euw: Regions.EU_WEST,
  kr: Regions.KOREA,
  lan: Regions.LAT_NORTH,
  las: Regions.LAT_SOUTH,
  na: Regions.AMERICA_NORTH,
  oce: Regions.OCEANIA,
  tr: Regions.TURKEY,
  ru: Regions.RUSSIA,
  jp: Regions.JAPAN,
  pbe: Regions.PBE,
}

export const getRegion = (region: string) => regionMapping[region.toLowerCase()]
