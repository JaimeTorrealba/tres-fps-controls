<!-- eslint-disable no-console -->
<script setup>
import { shallowRef, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Sky, Stats } from '@tresjs/cientos'
import { fpsControls } from 'fpsControls'

const isJumping = ref(false)
const initJumpTime = ref(0)
const jumpDistance = ref(0)
const cameraRef = shallowRef(false)
const gravity = 9.8
const initCameraPos = 0

const jump = () => {
  if (!isJumping.value) initJumpTime.value = Date.now()
  isJumping.value = true
}

const getJumpTime = () => ((Date.now() - initJumpTime.value) / 1000) * 3
const getJumpDistance = jumpTime => initCameraPos + 6 * jumpTime - 0.5 * gravity * jumpTime ** 2

const getJump = () => {
  if (isJumping.value) {
    jumpDistance.value = getJumpDistance(getJumpTime())
    if (jumpDistance.value <= initCameraPos) isJumping.value = false
    return jumpDistance.value
  }
  return initCameraPos
}

const keyboardMap = [
  { name: 'run', key: 'q', speed: 0.5 },
  { name: 'creep', key: 'e' },
  //{ name: 'leftClick', action: () => animationSword() },
  {
    name: 'actions',
    actions: [
      { name: 'jump', key: 'g', action: () => jump() },
      { name: 'action2', key: 'f', action: () => console.log('F press') },
      { name: 'action4', key: 'r', action: () => console.log('R press') },
    ],
  },
  { name: 'wheelActionUp', action: () => console.log('up') },
  { name: 'wheelActionDown', action: () => console.log('down') },
]

function animation() {
  requestAnimationFrame(animation)
  if (!cameraRef.value) return
  cameraRef.value.position.y = getJump()
}
animation()
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[0, 0, 3]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <Stats />
    <fpsControls :controlsKeys="keyboardMap" />
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshBasicMaterial
        :color="0x00ff00"
        wireframe
      />
    </TresMesh>
    <Sky />
    <TresGridHelper
      :args="[100, 100]"
      :position-y="-2"
    />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
