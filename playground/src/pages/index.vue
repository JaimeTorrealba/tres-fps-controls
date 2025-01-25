<script setup lang="ts">
import { basicsRoutes, intermediateRoutes } from '../router/routes'

const sections = [
  { icon: '📦', title: 'Basics', routes: basicsRoutes }, 
  { icon: '🔥', title: 'Intermediate', routes: intermediateRoutes },
]
</script>

<template>
  <div
    class="container mx-auto max-w-3xl font-sans text-xs color-gray bg-white"
  >
    <div class="mx-4">
      <div
        class="mt-24 mb-12 text-center align-baseline items-center gap-6 sm:mt-16 sm:mb-6 sm:text-left sm:flex sm:flex-row-reverse"
      >
        <div class="sm:w-2/3">
          <h1
            class="w-auto max-w-75 mx-auto text-5xl text-zinc-700 mb-3 sm:mx-none sm:w-1/2 sm:max-w-72"
          >
            <span class="text-cientos-blue">FPS-Controls 🔫</span>Playground
          </h1>
          <p class="text-lg">
            Demos for the <strong>fps-controls</strong> library.
          </p>
        </div>
      </div>
      <div
        class="text-center sm:text-left sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        <div
          v-for="{ title, routes, icon } in sections"
          :key="title"
          class="p-4 my-4 leading-normal size-m weight-600 bg-zinc-50 rounded sm:my-0"
        >
          <div
            class="inline-block p-2 p-x-3 m-b-3 text-2xl bg-zinc-200 rounded"
          >
            {{ icon }}
          </div>
          <h2 class="text-sm p-0 m-0 mb-1.5 font-semibold text-zinc-600">
            {{ title }}
          </h2>
          <div
            v-for="route in routes"
            :key="route.name"
            class="link-wrapper"
          >
            <Suspense>
              <router-link
                class="no-underline text-zinc-700 visited:text-zinc-400 hover:text-cientos-blue"
                :to="route.path"
              >
                <span>{{ route.name }} </span>
              </router-link>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
