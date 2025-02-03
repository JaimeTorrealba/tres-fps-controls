import type { Camera } from 'three'

export type IStates = 'idle' | 'walking' | 'running' | 'creeping'

export interface INormalKey { name: string; key: string }
export interface IRunCreepKey { name: string; key: string; speed: number }
export interface IMouseActionKey { name: string; action: () => void }
export interface IActionKey { name: string; key: string; action: () => void }
export interface IActionsKey { name: string; actions: IActionKey[] }

export type IControlsKeys = INormalKey | IRunCreepKey | IMouseActionKey | IActionsKey

export interface FpsControlsProps {
  /**
      * Whether to make this the default controls.
      *
      * @default false
      * @type {boolean}
      * @memberof PointerLockControlsProps
      * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
      */
  makeDefault?: boolean
  /**
      * The camera to control.
      *
      * @default false
      * @type {boolean}
      * @memberof PointerLockControlsProps
      * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
      */
  camera?: Camera
  /**
      * The dom element to listen to.
      *
      * @type {HTMLElement}
      * @memberof PointerLockControlsProps
      * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
      */
  domElement?: HTMLElement
  /**
      * The trigger id.
      *
      * @type {string}
      * @memberof PointerLockControlsProps
      * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
      */
  selector?: string
  /**
      * The speed of the movement.
      *
      * @type {number}
      * @memberof PointerLockControlsProps
      */
  moveSpeed?: number
  controlsKeys?: IControlsKeys[]
}