import Elysia, { t } from 'elysia'
import { Queues } from 'twisted/dist/constants'

import { lol } from '~/services/lol'
import { getRegion } from '~/utils'

export const getTop = new Elysia().get(
  '/lol/top1/:username/:region/',
  async ({ params }) => {
    const { username } = params
    const region = getRegion(params.region)

    const {
      response: { id },
    } = await lol.Summoner.getByName(decodeURI(username), region)

    const { response: summonerLeague } = await lol.League.bySummoner(id, region)

    const summoner = summonerLeague.find(
      (summoner) => summoner.queueType === Queues.RANKED_SOLO_5x5,
    )

    if (!summoner) {
      return `${username} não jogou partidas ranqueadas`
    }

    const {
      response: { entries: challengers },
    } = await lol.League.getChallengerLeaguesByQueue(
      Queues.RANKED_SOLO_5x5,
      region,
    )

    const players = challengers.sort((a, b) => b.leaguePoints - a.leaguePoints)

    const { leaguePoints } = players[0] // top1

    return leaguePoints - summoner.leaguePoints
  },
  {
    params: t.Object({
      username: t.String(),
      region: t.String(),
    }),
  },
)
