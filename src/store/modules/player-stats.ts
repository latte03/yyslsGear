import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { store } from '@/store'
import { defaultStatsMap, type statKeys } from '@/utils/constant'
import type { Gear } from '@/types/gear'

import { round } from 'es-toolkit'
// 属性上限配置
const statsUpperLimit = {
  // 调律各属性满值
  tune: {
    单字属性: 57.4,
    最大外攻: 90.6,
    最小外攻: 90.6,
    精准率: 9.4,
    会心率: 10.4,
    会意率: 5.2,
    最大属攻: 51.4,
    最小属攻: 51.4,
    本武增伤: 7.4,
    全武增伤: 3.6,
    首领增伤: 3.8,
    玩家增效: 3.8,
    单体奇术增伤: 11.4,
    群体奇术增伤: 11.4,
  },
  // 承音各属性上限
  chengyin: {
    单字属性: 54,
    最大外攻: 85.2,
    最小外攻: 85.2,
    精准率: 8.8,
    会心率: 9.8,
    会意率: 4.9,
    最大属攻: 48.3,
    最小属攻: 48.3,
    本武增伤: 7,
    全武增伤: 3.4,
    首领增伤: 3.6,
    玩家增效: 3.6,
    单体奇术增伤: 10.7,
    群体奇术增伤: 10.7,
  },
}
// 调律各属性满值：
// 单字属性57.4、大小外攻90.6、精准9.4%、会心10.4%、会意5.2%、大小属攻51.4、本武7.4%、全武3.6%、首领3.8%、玩家增效3.8%、单体/群体奇术11.4%

// 承音各属性上限：
// 单字属性54、大小外攻85.2、精准8.8%、会心9.8%、会意4.9%、大小属攻48.3、本武7%、全武3.4%、首领3.6%、玩家增效3.6%、单体/群体奇术10.7%

// 单字属性的比例:
// 1劲=1.36最大攻+0.225最小攻、1敏=0.9最小攻+0.076%会心、1势=0.9最大攻+0.038%会意
export const usePlayerStatsStore = defineStore('playerStats', () => {
  const playerGears = ref<Record<string, Gear>>({})

  const playerStats = computed(() => {
    return genPlayerStats(playerGears.value, defaultStatsMap)
  })
  // 计算承音培养后装备的属性值
  const nurturedGears = computed(() => {
    return Object.entries(playerGears.value).reduce(
      (nurturedGears, [gearKey, gear]) => {
        // 深拷贝装备对象，避免修改原数据
        const nurturedGear = JSON.parse(JSON.stringify(gear)) as Gear
        if (nurturedGear.stats && nurturedGear.isInherit) {
          nurturedGear.stats = nurturedGear.stats.map(stat => {
            const { statName, value } = stat
            let nurturedValue = value

            // 应用承音属性上限
            switch (statName) {
              case '势':
              case '劲':
              case '敏':
                // 单字属性上限54
                nurturedValue = Math.max(value, statsUpperLimit.chengyin['单字属性'])
                break
              case '最大外攻':
              case '最小外攻':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin[statName])
                break
              case '精准率':
              case '会心率':
              case '会意率':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin[statName])
                break
              case '最大无相攻击':
              case '最小无相攻击':
              case '最大鸣金攻击':
              case '最小鸣金攻击':
              case '最大裂石攻击':
              case '最小裂石攻击':
              case '最大破竹攻击':
              case '最小破竹攻击':
              case '最大牵丝攻击':
              case '最小牵丝攻击':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin['最大属攻'])
                break
              case '左手本武增伤':
              case '右手本武增伤':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin['本武增伤'])
                break
              case '全武增伤':
              case '首领增伤':
              case '玩家增效':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin['全武增伤'])
                break
              case '单体奇术增伤':
              case '群体奇术增伤':
                nurturedValue = Math.max(value, statsUpperLimit.chengyin['单体奇术增伤'])
                break
            }

            // 保留两位小数
            nurturedValue = round(nurturedValue, 2)

            return {
              statName,
              value: nurturedValue,
            }
          })
        }
        nurturedGears[gearKey] = nurturedGear
        return nurturedGears
      },
      {} as Record<string, Gear>
    )
  })
  // 计算继承后的玩家属性
  const nurturedPlayerStats = computed<Record<string, number>>(() => {
    return genPlayerStats(nurturedGears.value, defaultStatsMap)
  })

  // 获取继承装备列表
  const nurturedGear = computed(() => {
    return Object.values(playerGears.value).filter(gear => gear.isInherit)
  })

  return {
    playerStats,
    playerGears,
    nurturedPlayerStats,
    nurturedGear,
    nurturedGears,
    statsUpperLimit,
  }
})

export const usePlayerStatsStoreWithout = () => {
  return usePlayerStatsStore(store)
}

function genPlayerStats(gears: Record<string, Gear>, defaultStatsMap: Record<statKeys, number>) {
  const stats = Object.values(gears).reduce(
    (stats, gear) => {
      gear.baseStats.forEach(stat => {
        const { statName, value } = stat
        if (statName == '最大外攻' || statName == '最小外攻') {
          stats[statName] = round((stats[statName] ?? 0) + value, 2)
        }
      })
      if (gear.stats) {
        gear.stats.forEach(stat => {
          const { statName, value } = stat

          switch (statName) {
            case '势':
              stats['最大外攻'] = round(value * 0.9 + stats['最大外攻'], 2)
              stats['会意率'] = round(value * 0.038 + stats['会意率'], 2)
              break
            case '劲':
              stats['最大外攻'] = round(value * 1.36 + stats['最大外攻'], 2)
              stats['最小外攻'] = round(value * 0.225 + stats['最小外攻'], 2)
              break
            case '敏':
              stats['会心率'] = round(value * 0.076 + stats['会心率'], 2)
              stats['最小外攻'] = round(value * 0.9 + stats['最小外攻'], 2)
              break
            default:
              stats[statName] = round((stats[statName] ?? 0) + value, 2)
          }
        })
      }
      return stats
    },
    { ...defaultStatsMap }
  )

  return stats
}
