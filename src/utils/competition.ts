import type { EventType, EventResults, FinalRanking } from '@/types/competition'
import type { Superhero } from '@/types/superhero'

/**
 * Calculates the score for a specific event and hero
 */
export const calculateEventScore = (
  event: EventType,
  hero: Superhero,
  currentRanking: number,
  selectedHeroes: string[],
  getHeroById: (id: string) => Superhero | undefined,
  previousWinner?: string
): number => {
  switch (event) {
    case 'wallClimbing':
      return hero.attributes.strength * 4 - hero.attributes.weight * 2
    case 'jokeTelling':
      const othersCharisma = selectedHeroes
        .filter((id) => id !== hero.id)
        .reduce((sum, id) => sum + (getHeroById(id)?.attributes.charisma || 0), 0)
      return Math.pow(hero.attributes.charisma, 2) - othersCharisma
    case 'villainShot':
      return hero.attributes.agility + hero.attributes.strength + (currentRanking === 2 ? 5 : 0)
    case 'race':
      return (
        hero.attributes.agility * 4 +
        hero.attributes.endurance * 2 +
        (previousWinner === hero.id ? 10 : -1)
      )
    case 'catRescue':
      return hero.attributes.agility * 2
  }
}

/**
 * Calculates the final rankings based on event results
 */
export const calculateFinalRankings = (
  eventResults: EventResults,
  selectedHeroes: string[]
): FinalRanking[] => {
  const pointsMap = new Map<string, number>()

  selectedHeroes.forEach((heroId) => {
    const totalPoints = Object.values(eventResults).reduce((sum, results) => {
      const result = results.find((r) => r.superheroId === heroId)
      return sum + (result?.points || 0)
    }, 0)
    pointsMap.set(heroId, totalPoints)
  })

  return Array.from(pointsMap.entries())
    .map(([superheroId, totalPoints]) => ({ superheroId, totalPoints }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
}
