<script setup>
import { useLoader, useTresContext } from '@tresjs/core'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const { scene } = useTresContext()

const texture = await useLoader(RGBELoader, '/fake_doom_demo/kloofendal_overcast_puresky_2k.hdr')

scene.value.environment = texture
scene.value.background = texture
</script>

<template>
  <TresGroup />
</template>