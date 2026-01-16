export const TOKEN = 'TOKEN'

export const isProd = import.meta.env.PROD
export const isDev = import.meta.env.DEV

export const baseURL = String(import.meta.env.VITE_BASE_URL)

export const stats = [
  '最大外攻',
  '最小外攻',
  '精准率',
  '会心率',
  '会意率',
  // '精准率黄字(%)',
  // '会心率黄字(%)',
  // '会意率黄字(%)',
  '最大无相攻击',
  '最小无相攻击',
  '最大鸣金攻击',
  '最小鸣金攻击',
  '最大裂石攻击',
  '最小裂石攻击',
  '最大破竹攻击',
  '最小破竹攻击',
  '最大牵丝攻击',
  '最小牵丝攻击',
  '左手本武增伤',
  '右手本武增伤',
  '全武增伤',
  '首领增伤',
  '单体奇术增伤',
  '群体奇术增伤',
  '玩家增效',
] as const

export const fiveGearDimStats = ['敏', '劲', '势'] as const
export const gearStats = [
  ...fiveGearDimStats,
  ...stats,
] as const

export const gearStatsOptions = gearStats.map(item => ({
  label: item,
  value: item,
}))
export type statKeys = (typeof stats)[number]
export type GearStatsKeys = (typeof gearStats)[number]
export const defaultStatsMap:Record<statKeys,number> = {
  最大外攻: 0,
  最小外攻: 0,
  精准率: 0,
  会心率: 0,
  会意率: 0,
  // '精准率黄字(%)',
  // '会心率黄字(%)',
  // '会意率黄字(%)',
  最大无相攻击: 0,
  最小无相攻击: 0,
  最大鸣金攻击: 0,
  最小鸣金攻击: 0,
  最大裂石攻击: 0,
  最小裂石攻击: 0,
  最大破竹攻击: 0,
  最小破竹攻击: 0,
  最大牵丝攻击: 0,
  最小牵丝攻击: 0,
  '左手本武增伤': 0,
  '右手本武增伤': 0,
  '全武增伤': 0,
  '首领增伤': 0,
  '单体奇术增伤': 0,
  '群体奇术增伤': 0,
  '玩家增效': 0,
}
