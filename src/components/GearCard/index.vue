<template>
  <!--  装备卡片 -->

  <div class="gear-card h-full w-full flex items-center justify-center">
    <template v-if="playerGears[props.title]">
      <div class="p-2 w-full">
        <div>
          {{ title }}
        </div>
        <div>
          是否是承音装备：
          <t-switch v-model="playerGears[props.title]!.isInherit"></t-switch>
        </div>
        <div>
          装备品阶
          <t-radio-group
            v-model="playerGears[props.title]!.gradeLevel"
            default-value="gold"
            variant="default-filled"
          >
            <t-radio-button value="purple">紫色</t-radio-button>
            <t-radio-button value="gold">金色</t-radio-button>
          </t-radio-group>
        </div>

        <GearStat ref="gearStatRef" v-model:stats="playerGears[props.title]!.stats"></GearStat>
      </div>
    </template>
    <template v-else>
      <t-button @click="onAddClick">添加 {{ title }}</t-button>
    </template>
  </div>
</template>
<script setup lang="ts">
import { usePlayerStatsStore } from '@/store/modules/player-stats'
import { stats } from '@/utils/constant'
import { storeToRefs } from 'pinia'
import { baseStatsMap } from './config'
import type { GearType } from '@/types/gear'

defineOptions({
  name: 'GearCard',
})

const props = defineProps<{
  title: GearType
}>()

const gearStatRef = useTemplateRef('gearStatRef')
const playerStatsStore = usePlayerStatsStore()
const { playerGears } = storeToRefs(playerStatsStore)

async function onAddClick() {
  playerGears.value[props.title] = {
    name: props.title,
    isInherit: true,
    gradeLevel: 'gold',
    baseStats: baseStatsMap[props.title],
    stats: [
      { statName: stats[0], value: 0 },
      { statName: stats[0], value: 0 },
      { statName: stats[0], value: 0 },
      { statName: stats[0], value: 0 },
    ],
  }
  await nextTick()
  gearStatRef.value?.setEdit()
}
</script>
<style lang="less">
.gear-card {
  background: #171928;
}
</style>
