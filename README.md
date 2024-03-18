# FPS controls

> First person shooter controls to easily create 3D experiences of shooters (or other first person experiences)

- 💡 Works out of the box
- ⚡️ Powered by [Tresjs](https://tresjs.org/)
- 🦾 Fully configurable

## Installation

```bash
pnpm i fpsControls
```

## Demos

<!-- - [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs) -->

## How to use

To get started you can simply import the main component and use it.

```vue{15}
<script setup>
import { TresCanvas } from '@tresjs/core'
import { fpsControls } from 'fpsControls'
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
    <fpsControls />
  </TresCanvas>
</template>
```

Just by that you're going to have a shooter controller. Move using WASD keys and using your mouse to point eyes.

:::info
All the examples can be found in: TODO.
:::
:::info
This package use [PointerLockControls](https://cientos.tresjs.org/guide/controls/pointer-lock-controls.html) from [cientos](https://cientos.tresjs.org/).
:::

### ControlsKey

We can provide and `controlsKeys` prop to change, add or remove some of the basic functionalities

```
  controlsKeys: {
    type: Array,
    default: () => [
      { name: 'forward', key: 'w' },
      { name: 'backward', key: 's' },
      { name: 'leftward', key: 'a' },
      { name: 'rightward', key: 'd' },

      // Optionals

      { name: 'jump', key: 'space' },
      { name: 'run', key: 'Shift', speed: moveSpeed * 2 }, // run affect headbobbing, make it faster
      { name: 'creep', key: 'ctrl', speed: moveSpeed * 0.25 }, // creep affect headbobbing, make it slower

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
                      { name: 'action', key: 'e', action: () => {} },
                      { name: 'action', key: 'q', action: () => {} },
                      { name: 'action', key: 'r', action: () => {} },
                      { name: 'action', key: 'f', action: () => {} },
                    ],
      },
    ],
  },
```

Under the hood we use [useMagicKeys](https://vueuse.org/core/useMagicKeys/#usemagickeys). Check out [all the possible keycodes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values).

As you can see we can provide different actions, including an array of actions using the keyboard.

```
<script setup>
import { TresCanvas } from '@tresjs/core'
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
    <fpsControls
      :controlsKeys="keyboardMap"
    />
  </TresCanvas>
</template>
```

### Other props

| Prop            | Description                                                                               | Type              | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------------- | ----------- |
| **moveSpeed**   | Accept an id element as string, if it is set, the new element will be used as the trigger | Number            | `0.1`       |
| **headBobbing** | Accept an id element as string, if it is set, the new element will be used as the trigger | IHeadBobbing      |             |
| **camera**      | The camera to control.                                                                    | Camera            | `undefined` |
| **domElement**  | The dom element to listen to.                                                             | HTMLCanvasElement | `undefined` |
| **selector**    | Accept an id element as string, if it is set, the new element will be used as the trigger | String            | `undefined` |

```
interface IHeadBobbing {
    active: boolean // default true
    speed: number // default 5
    amplitude: number // default 0.25
}
```

### Add Weapons (models)

TODO

### Expose Methods

TODO

### Events

TODO (emits)

## Mobile (in progress)

TODO

## Contributing

We are open to contributions, please read the [contributing guide](https://github.com/Tresjs/tres/blob/main/CONTRIBUTING.md).

## License

[MIT](/LICENSE)

## Sponsors

<!-- Be the first to support this project [here](https://github.com/sponsors/tresjs) ☺️ -->
