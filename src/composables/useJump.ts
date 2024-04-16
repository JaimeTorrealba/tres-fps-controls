import { ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import type { IJumpKey } from '../core/types'

export const useJump = (jumpKey: IJumpKey, initCameraPos = 0) => {
  const isJumping = ref(false)
  const jumpDistance = ref(0)
  const initJumpTime = ref(0)
  const gravity = jumpKey.gravity ?? 9.8

  const keysDetector = useMagicKeys()
  const jumpDetector = keysDetector[jumpKey.key]

  watch(jumpDetector, (v) => {
    if (v) {
      if (!isJumping.value) initJumpTime.value = Date.now()
      isJumping.value = true
    }
  })

  const getJumpTime = (): number => ((Date.now() - initJumpTime.value) / 1000) * 3
  const getJumpDistance = (jumpTime: number) => initCameraPos + 6 * jumpTime - 0.5 * gravity * jumpTime ** 2

  const getJump = () => {
    if (isJumping.value) {
      jumpDistance.value = getJumpDistance(getJumpTime())
      if (jumpDistance.value <= initCameraPos) isJumping.value = false
      return jumpDistance.value
    }
    return initCameraPos
  }

  return { getJump, isJumping }
}
