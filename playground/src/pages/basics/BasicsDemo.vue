<script setup>
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Sky, Stats } from '@tresjs/cientos'
import { fpsControls } from 'fpsControls'

const shooter = shallowRef(false)

watch(shooter, (value) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ watch ~ value:', value)
})
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
      ref="shooter"
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
