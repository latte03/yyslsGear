<script lang="ts" setup>
// import { useAssetsImageURL } from '@composables/url-composable'

// import { sha } from '~build/git'
import { getRoutes } from '@/router'
// import { useThemeStore } from '@/store/modules/theme'
import { stats } from '@/utils/constant'
import { usePlayerStatsStore } from '@/store/modules/player-stats'

definePage({
  name: 'IndexPage',
  path: '/',
})

// 获取路由表但是不包含布局路由
console.log(getRoutes())

// const logo = useAssetsImageURL('logo', { extension: '.svg' })
// const themeStore = useThemeStore()

// // 切换深色模式
// function toggleTheme() {
//   themeStore.toggleDarkMode()
// }

// // 设置为深色模式
// function setDark() {
//   themeStore.setDarkMode(true)
// }

// // 设置为浅色模式
// function setLight() {
//   themeStore.setDarkMode(false)
// }

const playerStatsStore = usePlayerStatsStore()

const mode = ref('1')

const playerStats = computed(() => {
  if (mode.value === '1') {
    return playerStatsStore.playerStats
  } else {
    return playerStatsStore.nurturedPlayerStats
  }
})
</script>

<template>
  <div>
    <!-- <div class="mb-4">
      <h3>主题切换</h3>
      <div class="flex gap-2 mt-2">
        <button
          @click="setLight"
          class="px-4 py-2 bg-white text-black border border-gray-300 rounded"
        >
          浅色模式
        </button>
        <button @click="toggleTheme" class="px-4 py-2 bg-gray-500 text-white rounded">
          切换主题
        </button>
        <button @click="setDark" class="px-4 py-2 bg-gray-800 text-white rounded">深色模式</button>
      </div>
    </div> -->

    <!-- <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <h4>主题效果预览</h4>
      <p>这是一段示例文本，用于预览主题效果。</p>
      <p>当前模式: {{ themeStore.isDark ? '深色模式' : '浅色模式' }}</p>
    </div> -->

    <div>
      <t-radio-group v-model="mode" default-value="1" variant="default-filled">
        <t-radio-button value="1">当前</t-radio-button>
        <t-radio-button value="2">培养后</t-radio-button>
      </t-radio-group>
    </div>

    <div class="flex">
      <div class="stats-panel">
        <ul v-for="item in stats" :key="item">
          <li>{{ item }}: {{ playerStats[item] }}</li>
        </ul>
      </div>

      <div class="gears-container ml-4">
        <!-- 分3列，左边一列拆出2列2行四件 右边同理,最后一列一列一行 2件 -->
        <div class="gears-grids grid" style="grid-template-columns: 2fr 2fr 1fr; gap: 16px">
          <!-- 左边第一列：2列2行 -->
          <div class="grid grid-cols-2 grid-rows-2 gap-2" style="grid-column: 1">
            <div class="gear-item">
              <GearCard title="左手武器"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="右手武器"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="环"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="佩"></GearCard>
            </div>
          </div>

          <!-- 中间第二列：2列2行 -->
          <div class="grid grid-cols-2 grid-rows-2 gap-2" style="grid-column: 2">
            <div class="gear-item">
              <GearCard title="头盔"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="甲胄"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="护腿"></GearCard>
            </div>
            <div class="gear-item">
              <GearCard title="护腕"></GearCard>
            </div>
          </div>

          <!-- 右边第三列：1列2行 -->
          <div class="grid grid-cols-1 grid-rows-1 gap-2">
            <div class="gear-item">9</div>
            <div class="gear-item">10</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.gears-container {
  width: 1080px;
}

.stats-panel {
  width: 300px;
}

.gear-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}
</style>
