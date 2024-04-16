import { useTresContext } from '@tresjs/core'
import { onKeyDown, useEventListener } from '@vueuse/core'
import type { IActionKey, IControlsKeys } from '../core/types'

export const useActions = (keys: IControlsKeys) => {

  const { renderer } = useTresContext()
  const { wheelActionUp, wheelActionDown, actions, leftClick, rightClick, middleClick } = keys

  // eslint-disable-next-line array-callback-return
  actions.actions.map((action: IActionKey) => {
    onKeyDown(action.key, () => {
      action.action()
    })
  })

  useEventListener(renderer.value.domElement, 'click', (evt) => {
    if (evt.button === 0) leftClick?.action()
    else if (evt.button === 1) middleClick?.action()
    else if (evt.button === 2) rightClick?.action()
  })

  renderer.value.domElement.onwheel = (event) => {
    if (event.deltaY > 0) {
      wheelActionDown.action()
    }
    else {
      wheelActionUp.action()
    }
  }
}
