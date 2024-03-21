<script setup>
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Sky, Stats, GLTFModel, useEnvironment } from '@tresjs/cientos'
import { fpsControls } from 'fpsControls'
import HangarSky from '../../components/HangarSky.vue'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera
      :position="[0, 0, -600]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <Suspense>
      <HangarSky />
    </Suspense>
    <Suspense>
      <GLTFModel
        path="/fake_doom_demo/doom_e1m1_hangar_-_map.glb"
        :scale="0.2"
        :position="[0, -5, 0]"
      />
    </Suspense>
    <fpsControls :moveSpeed="0.3">
      <Suspense>
        <GLTFModel
          path="/fake_doom_demo/doom_2016_pistol.glb"
          :scale="0.1"
          :position="[1, -1.75, -2]"
          :rotation="[0, -3, 0]"
        />
      </Suspense>
    </fpsControls>
    <TresAmbientLight />
  </TresCanvas>
</template>
