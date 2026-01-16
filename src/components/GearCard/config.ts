import type { GearType, GearStat } from '@/types/gear'

export const baseStatsMap: Record<GearType, GearStat[]> = {
  左手武器: [
    { statName: '最大外攻', value: 175 },
    { statName: '最小外攻', value: 75 },
  ],
  右手武器: [
    { statName: '最大外攻', value: 175 },
    { statName: '最小外攻', value: 75 },
  ],
  环: [
    { statName: '最大外攻', value: 0 },
    { statName: '最小外攻', value: 100 },
  ],
  佩: [
    { statName: '最大外攻', value: 150 },
    { statName: '最小外攻', value: 0 },
  ],
  头盔: [],
  甲胄: [],
  护腿: [],
  护腕: [],
}
