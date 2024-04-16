import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IHeadBobbing, IStates } from '../core/types'
import { STATES } from './utils'

export const useHeadBobbing = (headBobbingOptions: Ref<IHeadBobbing>, initCameraPos: number) => {
  const { active, speed, amplitude } = headBobbingOptions.value
  const HB = ref(initCameraPos)

  const _speed = (state: IStates) => {
    if (state === STATES.running) {
      return speed * 3
    }
    else if (state === STATES.creeping) {
      return speed * 0.1
    }
    return speed
  }
  const _amplitude = (state: IStates) => {
    if (state === STATES.creeping) {
      return amplitude * 0.25
    }
    return amplitude
  }
  const headBobbingMov = (elapsedTime: number, isWalking: boolean, state: IStates) => {
    if (isWalking && active) {
      HB.value = Math.sin(elapsedTime * _speed(state)) * _amplitude(state)
    }
    else {
      if (HB.value > initCameraPos + 0.01 || HB.value < -0.01 - initCameraPos) {
        HB.value += (initCameraPos - HB.value) * 0.1
      }
    }
    return HB.value
  }
  return headBobbingMov
}
