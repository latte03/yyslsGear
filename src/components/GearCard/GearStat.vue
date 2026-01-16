<script setup lang="ts">
import type { GearStat } from '@/types/gear'
import { stats, gearStatsOptions } from '@/utils/constant'
import { useToggle } from '@vueuse/core'

defineOptions({
  name: 'GearStat',
})

const statRef = defineModel<GearStat[]>('stats', {
  default: () => [
    { statName: stats[0], value: 100 },
    { statName: stats[0], value: 100 },
    { statName: stats[0], value: 100 },
    { statName: stats[0], value: 100 },
  ],
})

const [isEdit, setIsEdit] = useToggle(false)
function onClick() {
  setIsEdit(true)
  console.log('编辑')
}

defineExpose({
  setEdit() {
    setIsEdit(true)
  },
})
</script>
<template>
  <div class="gear-stat w-full">
    <div class="mb-4">
      <t-button v-if="!isEdit" @click="onClick">编辑</t-button>
      <t-button v-else @click="() => setIsEdit(false)">确定</t-button>
    </div>
    <div class="w-full stat-entry" v-for="stat in statRef" :key="stat.statName">
      <div class="mb-2 flex justify-between" v-if="!isEdit">
        <span>
          {{ stat.statName }}
        </span>
        <span>
          {{ stat.value }}
        </span>
      </div>
      <div v-else class="flex w-full mb-2 flex-gap-2">
        <t-select
          class="flex-grow-1"
          type="number"
          v-model="stat.statName"
          :options="gearStatsOptions"
          style="width: calc(100% - 100px)"
        />
        <t-input-number
          align="right"
          borderless
          style="width: 80px"
          theme="column"
          v-model="stat.value"
          :min="0"
          :step="0.1"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.gear-stat {
  // width: 320px;
}
</style>
