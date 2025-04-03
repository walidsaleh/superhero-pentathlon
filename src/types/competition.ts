export type EventType = 'wallClimbing' | 'jokeTelling' | 'villainShot' | 'race' | 'catRescue'

export interface EventResult {
  superheroId: string
  score: number
  points: number
}

export interface FinalRanking {
  superheroId: string
  totalPoints: number
}

export type EventResults = Record<EventType, EventResult[]>
