<script setup lang="ts">
import { ref } from 'vue'

import { getJoysticks, JoystickArea } from '@manapotion/vue'

import type { Joystick } from '@manapotion/vue'

const props = defineProps<{ mode: 'follow' | 'origin' }>()

const joystickCurrent = ref<HTMLDivElement | null>(null)
const joystickOrigin = ref<HTMLDivElement | null>(null)
const joystickFollow = ref<HTMLDivElement | null>(null)

const handleStart = (joystick: Joystick) => {
  joystickCurrent.value!.style.transform = `translate(${joystick.current.x}px, ${-joystick
    .current.y!}px)`
  joystickOrigin.value!.style.transform = `translate(${joystick.origin.x}px, ${-joystick
    .origin.y!}px)`
  joystickFollow.value!.style.transform = `translate(${joystick.follow.x}px, ${-joystick
    .follow.y!}px)`
  joystickCurrent.value!.style.opacity = '1'
  props.mode === 'follow' && (joystickFollow.value!.style.opacity = '1')
  joystickOrigin.value!.style.opacity = '1'
}

const handleEnd = () => {
  joystickCurrent.value!.style.opacity = '0'
  joystickFollow.value!.style.opacity = '0'
  joystickOrigin.value!.style.opacity = '0'
}

const handleMove = (joystick: Joystick) => {
  joystickCurrent.value!.style.transform = `translate(${joystick.current.x}px, ${-joystick
    .current.y!}px)`
  joystickOrigin.value!.style.transform = `translate(${joystick.origin.x}px, ${-joystick
    .origin.y!}px)`
  joystickFollow.value!.style.transform = `translate(${joystick.follow.x}px, ${-joystick
    .follow.y!}px)`
}
</script>

<template>
  <JoystickArea
    :joystick="getJoysticks().movement"
    :mode="props.mode"
    :container-props="{
      class: `joystick-area`,
    }"
    @start="handleStart"
    @move="handleMove"
    @end="handleEnd"
  >
    <div
      ref="joystickCurrent"
      class="current"
    />
    <div
      ref="joystickOrigin"
      class="origin"
    />
    <div
      ref="joystickFollow"
      class="follow"
    />
  </JoystickArea>
</template>

<style scoped>
.joystick-area {
  position: relative;
  z-index: 990;
  border-radius: 0.375rem;
  border-width: 1px;
  width: 16rem;
  height: 12rem;
}
.current {
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  border-radius: 9999px;
  background-color: #ef4444;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  pointer-events: none;
  opacity: 0;
  z-index: 999;
}

.origin {
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  border-radius: 9999px;
  background-color: #3b82f6;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  pointer-events: none;
  opacity: 0;
  z-index: 999;
}

.follow {
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  border-radius: 9999px;
  background-color: #10b981;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  pointer-events: none;
  opacity: 0;
  z-index: 999;
}
</style>
