import type { GearStatsKeys } from "@/utils/constant"

export interface Gear {
  name: string
  isInherit: boolean
  gradeLevel: GradeLevel
  stats: GearStat[]

  baseStats: GearStat[]
}

export interface GearStat {
  statName: GearStatsKeys
  value: number
}
export type GradeLevel = 'purple' | 'gold'


export type GearType = '左手武器'|'右手武器'|'环'|'佩'|'头盔'|'甲胄'|'护腿'|'护腕'
