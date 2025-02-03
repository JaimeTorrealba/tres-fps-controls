<script setup>
import { shallowRef } from 'vue'
import { TresCanvas, useTexture } from '@tresjs/core'
import { Sky, Stats, GLTFModel, Plane } from '@tresjs/cientos'
import { fpsControls } from 'fpsControls'
import { Float32BufferAttribute, RepeatWrapping, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'

const floorRef = shallowRef()
const gravesRef = shallowRef()
const floorTexture = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/normal.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/roughness.jpg',
  aoMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/ambientOcclusion.jpg',
})

for (const key in floorTexture) {
  if (floorTexture[key]) {
    floorTexture[key].repeat.set(8, 8)
    floorTexture[key].wrapS = RepeatWrapping
    floorTexture[key].wrapT = RepeatWrapping
  }
}

const floorOptions = {
  color: '#82DBC5',
  roughness: 0.5,
  metalness: 0.5,
  map: floorTexture.map,
  normalMap: floorTexture.normalMap,
  roughnessMap: floorTexture.roughnessMap,
  aoMap: floorTexture.aoMap,
}
watch(floorRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})
const graveGeometry = new BoxGeometry(0.6, 0.8, 0.1)
const graveMaterial = new MeshStandardMaterial({ color: '#727272' })
const graves = []

for (let i = 0; i < 150; i++) {
  const angle = Math.random() * Math.PI * 2 // Random angle
  const radius = 3 + Math.random() * 30 // Random radius
  const x = Math.cos(angle) * radius // Get the x position using cosinus
  const z = Math.sin(angle) * radius // Get the z position using sinus

  // Create the mesh
  const grave = new Mesh(graveGeometry, graveMaterial)
  grave.castShadow = true
  // Position
  grave.position.set(x, 0.3, z)

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  graves.push(grave)
}
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera
      :position="[3, 4, 3]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <Stats />
    <fpsControls>
      <Suspense>
        <GLTFModel
          path="/PixelArt Medieval Sword.glb"
          :scale="0.4"
          :position="[-1, -1, 0]"
          :rotation="[0, 1, 0]"
        />
      </Suspense>
    </fpsControls>
    <TresAxesHelper :size="5" />
    <Sky />
    <TresMesh
      ref="floorRef"
      receive-shadow
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, 0, 0]"
    >
      <TresPlaneGeometry :args="[150, 150]" />
      <TresMeshStandardMaterial v-bind="floorOptions" />
    </TresMesh>
    <TresGroup ref="gravesRef">
      <TresMesh
        v-for="({ position, scale, rotation }, index) in graves"
        :key="index"
        :position="position"
        :scale="scale"
        :rotation="rotation"
        :material="graveMaterial"
        :geometry="graveGeometry"
      />
    </TresGroup>
    <TresDirectionalLight
      :position="[0, 2, -4]"
      :intensity="0.5"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
