import { inject, defineComponent, reactive, onUnmounted, onDeactivated } from 'vue'
import { useEventListener } from '@vueuse/core'
import { startTouch } from '../composables/utilsMobile'

// todo define props
// todo try others styles
// more test mobile

export const MobileJoystick = defineComponent({
  name: 'MobileJoystick',
  props: {
    containerStyles: {
      type: String,
      default: 'position:absolute; bottom:35px; width:160px; height:160px; background:rgba(126, 126, 126, 0.5); border:#fff solid medium; border-radius:50%; left:20%; transform:translateX(-50%);z-index:9999;',
    },
    joystickStyles: {
      type: String,
      default: 'position: absolute; left: 50px; top: 50px; width: 60px; height: 60px; border-radius: 50%; background: #fff;',
    },
    maxRadius: {
      type: Number,
      default: 60,
    },
  },

  setup(props) {
    const moveMethods = inject('moveMethods')
    
    const body = document.body
    body.style.cssText = 'overscroll-behavior-y: contain;'

    // joystick DOM element
    const container = document.createElement('div')
    container.style.cssText
      = props.containerStyles
    const domElement = document.createElement('div')
    domElement.style.cssText
      = props.joystickStyles
    container.appendChild(domElement)
    body.appendChild(container)

    // VARIABLES
    const offset = reactive({ x: 0, y: 0 })
    const maxRadius = props.maxRadius
    const origin = { left: domElement.offsetLeft, top: domElement.offsetTop }

    if (domElement !== undefined) {
      if ('ontouchstart' in window) {
        useEventListener(domElement, 'touchstart', (evt) => {
          startTouch(moveMethods, evt, offset, domElement, maxRadius, origin)
        })
      }
      // else {
      //   useEventListener(domElement, 'mousedown', (evt) => {
      //     startTouch(moveMethods, evt, offset, domElement, maxRadius, origin)
      //   })
      // }
    }

    onUnmounted(() => {
      body.removeChild(container)
    })
    onDeactivated(() => {
      body.removeChild(container)
    })
  },
})
