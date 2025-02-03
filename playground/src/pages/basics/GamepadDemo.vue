<!-- eslint-disable no-console -->
<script setup>
import { shallowRef, computed, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Sky, Stats } from '@tresjs/cientos'
import { useGamepad, mapGamepadToXbox360Controller } from '@vueuse/core'
import { fpsControls } from 'fpsControls'
import GamePadComponent from '../../components/GamePadComponent.vue'

const { isSupported, gamepads, onConnected } = useGamepad()
const gamepad = computed(() => gamepads.value.find(g => g.mapping === 'standard'))
const controller = mapGamepadToXbox360Controller(gamepad)
const cameraRef = shallowRef(null)

const zAxis = computed(() => {
  if (controller.value) {
    if (controller.value.dpad.up.pressed || controller.value.stick.left.vertical < -0.5) {
      shooter.value.moveMethods.forward()
    }
    else if (
      controller.value.dpad.down.pressed
      || controller.value.stick.left.vertical > 0.5
    ) {
      shooter.value.moveMethods.backward()
    }
    else {
      shooter.value.moveMethods.stopForward()
    }
  }
  return false
})

const xAxis = computed(() => {
  if (controller.value) {
    if (
      controller.value.dpad.left.pressed
      || controller.value.stick.left.horizontal < -0.5
    ) {
      shooter.value.moveMethods.left()
    }
    else if (
      controller.value.dpad.right.pressed
      || controller.value.stick.left.horizontal > 0.5
    ) {
      shooter.value.moveMethods.right()
    }
    else {
      shooter.value.moveMethods.stopSideward()
    }
  }
  return false
})

const buttons = computed(() => {
  if (controller.value) {
    if (controller.value.buttons.b.pressed) {
      shooter.value.moveMethods.run()
    }
    else if (controller.value.buttons.x.pressed) {
      shooter.value.moveMethods.creep()
    }
    else if (controller.value.buttons.y.pressed) {
      console.log('Jump!')
    }
    else if (controller.value.buttons.a.pressed) {
      console.log('Shoot!')
    }
  }
  return false
})

let x = 0
let y = 0
//move camera
const moveCamera = computed(() => {
  if (controller.value) {
    if (controller.value.stick.right.vertical < -0.5) {
      y += 0.05
      cameraRef.value.lookAt(x, y, 0)
    }
    else if (controller.value.stick.right.vertical > 0.5) {
      y -= 0.05
      cameraRef.value.lookAt(x, y, 0)
    }
    else if (controller.value.stick.right.horizontal < -0.5) {
      x -= 0.05
      cameraRef.value.lookAt(x, y, 0)
    }
    else if (controller.value.stick.right.horizontal > 0.5) {
      x += 0.05
      cameraRef.value.lookAt(x, y, 0)
    }
  }
  return false
})

watch([zAxis, xAxis, buttons, moveCamera], () => {
  console.log('Gamepad')
})

const shooter = shallowRef(false)

watch(shooter, (value) => {
  console.log('jaime ~ watch ~ value:', value)
})
</script>

<template>
  <GamePadComponent class="control" />
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
    <fpsControls ref="shooter" />
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

<style scoped>
.control {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 25%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  z-index: 100;
}
</style>
