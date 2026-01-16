import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

import { store } from '@/store'

/**
 * 主题管理
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  // 切换深色模式
  function toggleDarkMode() {
    isDark.value = !isDark.value
    updateDarkClass()
  }

  // 设置深色模式
  function setDarkMode(dark: boolean) {
    isDark.value = dark
    updateDarkClass()
  }

  // 更新DOM类名
  function updateDarkClass() {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // 保存到localStorage
    localStorage.setItem('theme-dark', String(isDark.value))
  }

  // 初始化主题
  onMounted(() => {
    // 优先从localStorage读取
    const saved = localStorage.getItem('theme-dark')
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      // 否则跟随系统
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDarkClass()
  })

  return { isDark, toggleDarkMode, setDarkMode }
})

export const useThemeStoreWithout = () => {
  return useThemeStore(store)
}
