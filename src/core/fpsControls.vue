<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref, shallowRef, toRefs, watchEffect, provide } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import { Vector3 } from 'three'

// COMPONENTS
import { useJump } from '../composables/useJump'
import { useWalk } from '../composables/useWalk'
import { useActions } from '../composables/useActions'
import { useHeadBobbing } from '../composables/useHeadBobbing'
import { STATES, getMovementKey, getActionsKey, isMobile } from '../composables/utils'
import PointerLockControls from '../controls/PointerLockControls.vue'

// TYPES
import type { IStates, FpsControlsProps } from './types'

// JUMP will be removed when rapier is ready

const props = withDefaults(defineProps<FpsControlsProps>(), {
  controlsKeys: () => [
    { name: 'forward', key: 'w' },
    { name: 'backward', key: 's' },
    { name: 'left', key: 'a' },
    { name: 'right', key: 'd' },
    // Optional actions key map
    { name: 'jump', key: 'space' },
    { name: 'run', key: 'Shift' },
    { name: 'creep', key: 'ctrl' },
    // Mouse actions
    { name: 'leftClick', action: () => { } },
    { name: 'rightClick', action: () => { } },
    { name: 'middleClick', action: () => { } },
    { name: 'wheelActionUp', action: () => { } },
    { name: 'wheelActionDown', action: () => { } },
    // Key actions
    {
      name: 'actions', actions:
        [
          { name: 'action', key: 'e', action: () => { } },
          { name: 'action', key: 'q', action: () => { } },
          { name: 'action', key: 'r', action: () => { } },
          { name: 'action', key: 'f', action: () => { } },
        ],
    },
  ],
  moveSpeed: 0.1,
  headBobbing: () => ({
    active: true,
    speed: 5,
    amplitude: 0.25,
  }),
})

const emit = defineEmits(['state', 'isLock', 'change'])

const { controlsKeys,
  moveSpeed,
  headBobbing,
} = toRefs(props)

const { camera: activeCamera } = useTresContext()

// General options
const state: Ref<IStates> = ref(STATES.idle)
const PointerLockControlsRef = shallowRef()
const wrapperRef = shallowRef()
const isLocked = shallowRef()
const initCameraPos = activeCamera?.value?.position?.y ?? 0
const rotationModelGroup = new Vector3()

const [forward, backward, left, right, run, creep, jump] = getMovementKey(controlsKeys)
const [leftClick, rightClick, middleClick, wheelActionUp, wheelActionDown, actions] = getActionsKey(controlsKeys)
const { getJump, isJumping } = useJump(jump, initCameraPos)
const walkSystem = useWalk(moveSpeed.value, { forward, backward, left, right, run, creep })

provide('moveMethods', walkSystem)

const headBobbingMov = useHeadBobbing(headBobbing, initCameraPos)
useActions({ actions, wheelActionUp, wheelActionDown, leftClick, rightClick, middleClick })

watchEffect(() => {
  if (walkSystem.isRunning.value) state.value = STATES.running
  else if (walkSystem.isCreeping.value) state.value = STATES.creeping
  else if (walkSystem.isWalking.value) state.value = STATES.walking
  else if (isJumping.value) state.value = STATES.jumping
  else state.value = STATES.idle

  emit('state', { state: state.value, direction: walkSystem.direction })
})

const onLock = (event: boolean) => {
  isLocked.value = event
  emit('isLock', event)
}
const onChangePointerLock = () => onChangeModel()

const onChangeModel = () => {
  if (!activeCamera.value) return
  wrapperRef.value.rotation.copy(activeCamera.value.rotation)
  wrapperRef.value.position.copy(activeCamera.value.position)
    .add(activeCamera.value.getWorldDirection(rotationModelGroup).multiplyScalar(2.5))
  emit('change', PointerLockControlsRef)
}

defineExpose({
  root: PointerLockControlsRef,
  models: wrapperRef,
  moveMethods: {
    forward: () => walkSystem.moveForward(),
    backward: () => walkSystem.moveBackward(),
    left: () => walkSystem.moveLeft(),
    right: () => walkSystem.moveRight(),
    run: () => walkSystem.applyRun(),
    creep: () => walkSystem.applyCreep(),
    stopCreep: () => walkSystem.stopCreep(),
    stopRun: () => walkSystem.stopRun(),
    stopSideward: () => walkSystem.stopSideward(),
    stopForward: () => walkSystem.stopForward(),
  },
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }: { elapsed: number }) => {
  if (isLocked.value || isMobile) {
    PointerLockControlsRef.value.value.moveForward(walkSystem.forwardMove.value)
    PointerLockControlsRef.value.value.moveRight(walkSystem.sidewardMove.value)
    if (!activeCamera.value) return
    activeCamera.value.position.y = getJump()
    activeCamera.value.position.y += headBobbingMov(elapsed, walkSystem.isWalking.value, state.value)
    if (walkSystem.isWalking.value || isJumping.value) onChangeModel()
  }
})
</script>

<template>
  <PointerLockControls
    ref="PointerLockControlsRef"
    make-default
    :camera="camera"
    :domElement="domElement"
    :selector="selector"
    @change="onChangePointerLock"
    @isLock="e => onLock(e)"
  />
  <TresGroup ref="wrapperRef">
    <slot />
  </TresGroup>
</template>