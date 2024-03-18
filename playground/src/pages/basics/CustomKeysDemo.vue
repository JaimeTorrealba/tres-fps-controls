<script setup>
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Sky, Stats } from '@tresjs/cientos'
import { fpsControls } from 'fpsControls'

const keyboardMap = [
  { name: 'jump', key: 'Space' },
  { name: 'run', key: 'q', speed: 0.5 },
  { name: 'creep', key: 'e' },
  { name: 'leftClick', action: () => animationSword() },
  {
    name: 'actions',
    actions: [
      { name: 'action2', key: 'f', action: () => console.log('F press') },
      { name: 'action4', key: 'r', action: () => console.log('R press') },
    ],
  },
  { name: 'wheelActionUp', action: () => console.log('up') },
  { name: 'wheelActionDown', action: () => console.log('down') },
]
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera
      :position="[0, 0, 3]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <Stats />
    <fpsControls
      :controlsKeys="keyboardMap"
    />
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
