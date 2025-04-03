export type SuperheroAttribute = 'agility' | 'strength' | 'weight' | 'endurance' | 'charisma'

// Interface for superhero attributes
export type SuperheroAttributes = {
  [key in SuperheroAttribute]: number
}

// Main superhero interface with metadata and grouped attributes
export interface Superhero {
  id: string
  name: string
  image: string
  attributes: SuperheroAttributes
}

export const DEFAULT_STATS = {
  STRENGTH: 0,
  AGILITY: 0,
  WEIGHT: 0,
  ENDURANCE: 0,
  CHARISMA: 0
} as const

// Default values for superhero attributes
export const DEFAULT_ATTRIBUTES: SuperheroAttributes = {
  strength: 0,
  agility: 0,
  weight: 0,
  endurance: 0,
  charisma: 0
}

export const STAT_LIMITS = {
  MIN: 0,
  MAX: 10,
  MIN_WEIGHT: 1
} as const
