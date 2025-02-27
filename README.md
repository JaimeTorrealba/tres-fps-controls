# Tres FPS controls

> First person shooter controls to easily create 3D shooter experiences (or other first person experiences).

- 💡 Works out of the box
- ⚡️ Powered by [Tresjs](https://tresjs.org/), [VueJs](https://vuejs.org/) + [ThreeJs](https://threejs.org/)
- 🦾 Fully configurable

## Installation

```bash
pnpm i @jaimebboyjt/tres-fps-controls
```

## Demos

![Alt text](/public/Fake_Doom_demo.gif)

All the examples can be found in: [Examples](https://github.com/JaimeTorrealba/fps-controls/tree/main/playground/src/pages).

# How to use it

To get started you can simply import the main component and use it.

```html
<script setup>
  import { TresCanvas } from "@tresjs/core";
  import { fpsControls } from "@jaimebboyjt/tres-fps-controls";
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

That's it. Now you're going to have a shooter controller. The WASD keys allow you to move and the mouse pointer changes where you look.

> [!NOTE]
> This package uses [PointerLockControls](https://cientos.tresjs.org/guide/controls/pointer-lock-controls.html) from [cientos](https://cientos.tresjs.org/).

## ControlsKey

We can provide a `controlsKeys` prop to change, add or remove some of the basic functionalities.

```js
export default {
  props: {
    controlsKeys: {
      type: Array,
      default: () => [
        { name: 'forward', key: 'w' },
        { name: 'backward', key: 's' },
        { name: 'left', key: 'a' },
        { name: 'right', key: 'd' },
  
        // Optionals

        { name: 'run', key: 'Shift', speed: moveSpeed * 2 },
        { name: 'creep', key: 'ctrl', speed: moveSpeed * 0.25 },
  
        // Mouse actions
  
        { name: 'leftClick', action: () => { } },
        { name: 'rightClick', action: () => { } },
        { name: 'middleClick', action: () => { } },
        { name: 'wheelActionUp', action: () => { } },
        { name: 'wheelActionDown', action: () => { } },
  
        // Key actions
  
        {
          name: 'actions', actions: // You can have as many events as you want 🥳
                        [
                          { name: 'action', key: 'e', action: () => {} },
                          { name: 'action', key: 'q', action: () => {} },
                          { name: 'action', key: 'r', action: () => {} },
                          { name: 'action', key: 'f', action: () => {} },
                        ],
        },
      ],
    },
  }
}
```

> [!TIP]
> Under the hood we use [useMagicKeys](https://vueuse.org/core/useMagicKeys/#usemagickeys). Check out [all the possible keycodes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values).

As you can see we can provide different actions, including an array of actions using the keyboard.

```html
<script setup>
  import { TresCanvas } from "@tresjs/core";
  import { fpsControls } from "@jaimebboyjt/tres-fps-controls";

  const keyboardMap = [
    { name: "run", key: "q", speed: 0.5 },
    { name: "creep", key: "e" },
    { name: "leftClick", action: () => animationSword() },
    {
      name: "actions",
      actions: [
        { name: "action2", key: "f", action: () => console.log("F press") },
        { name: "action4", key: "r", action: () => console.log("R press") },
      ],
    },
    { name: "wheelActionUp", action: () => console.log("up") },
    { name: "wheelActionDown", action: () => console.log("down") },
  ];
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
    <fpsControls :controlsKeys="keyboardMap" />
  </TresCanvas>
</template>
```

### Other props

| Prop            | Description                                                                               | Type              | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------------- | ----------- |
| **moveSpeed**   | Move speed                                                                                | Number            | `0.1`       |
| **camera**      | The camera to control                                                                     | Camera            | `undefined` |
| **domElement**  | The dom element to listen to                                                              | HTMLCanvasElement | `undefined` |
| **selector**    | Accept an id element as string, if it is set, the new element will be used as the trigger | String            | `undefined` |


## Add weapons (models)

Do you want to add a weapon? Like a pistol, that is always with your character? It couldn't be easier:

Just add your desired model as a slot (learn how to load models here). For example:

```html
...
<fpsControls>
  <Suspense>
    <GLTFModel path="/PixelArt Medieval Sword.glb" :scale="0.4"
    :position="[-4.5, -3, -5]" // Don't forget set the z axis :rotation="[0, 1,
    0]" />
  </Suspense>
</fpsControls>
...
```

This will make your model update its position each time you move.

> [!IMPORTANT]
> Normally you would set up the z axis, so the model is in front of you camera.

### Expose methods

Do you still need more configurations?

We provide all the methods for you, **exposed** by the component, so you can use them as you like.

```js
const exposeMethods = {
  root: PointerLockControlsRef,
  models: wrapperRef,
  moveMethods: {
    forward: () => walkSystem.moveForward(),
    backward: () => walkSystem.moveBackward(),
    left: () => walkSystem.moveLeft(),
    right: () => walkSystem.moveRight(),
    run: () => walkSystem.applyRun(),
    creep: () => walkSystem.applyCreep(),
    stopCreep: () => walkSystem.stopCreep(),
    stopRun: () => walkSystem.stopRun(),
    stopSideward: () => walkSystem.stopSideward(),
    stopForward: () => walkSystem.stopForward(),
  }
}
```

For granular control each method comes with its `stop` method.

You can access all these methods using [Template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs), as you normally would do with your TresJs components.

### Events

We also provide some reactive events. Ej:

```html
<script>
import { fpsControls } from 'fpsControls'

const handleState = (e) => console.log(e)
const handleLock = (e) => console.log(e)
const onChange = (e) => console.log(e)
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
    <fpsControls @state="handleState" @isLock="handleLock" @change="onChange"  />

  </TresCanvas>
</template>
```

| Event      | Description                                                 |
| :--------- | :---------------------------------------------------------- |
| **state**  | trigger when the state changes.                             |
| **isLock** | trigger whether the pointer is locked.                      |
| **change** | trigger when the character makes a move (moves the camera). |

Posible states:

```js
const states = {
  idle: 'idle',
  walking: 'walking',
  running: 'running',
  creeping: 'creeping',
}
```

## Gamepad

[Check example](/playground/src/pages/basics/GamepadDemo.vue) inside playground on how to use the a gamepad with this repo :D                                                                          |

## Contributing

I appreciate your interest in this project! If you have any feedback, suggestions, or resources related to the controller, please feel free to share.

## License

[MIT](/LICENSE)

## Sponsors

If you like this package you can support my work [here](https://github.com/sponsors/JaimeTorrealba ☺️. A github star or just some words of appreciation are incredible.
