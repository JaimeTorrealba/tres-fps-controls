export const STATES = Object.freeze({
  idle: 'idle',
  walking: 'walking',
  running: 'running',
  creeping: 'creeping',
})

const defaultMovementKeys = Object.freeze({
  forward: 'w',
  backward: 's',
  left: 'a',
  right: 'd',
})

export const getMovementKey = (keys) => {
  const movementKeys = ['forward', 'backward', 'left', 'right']
  const result: (boolean | { name: string; key: string })[] = [] // Change the type of 'result' array
  movementKeys.forEach((key) => {
    const [filteredKey] = keys.value.filter(k => k.name === key)
    if (filteredKey) result.push(filteredKey)
    else result.push({ name: key, key: defaultMovementKeys[key] })
  })
  const extraKeys = ['run', 'creep']
  extraKeys.forEach((key) => {
    const [filteredKey] = keys.value.filter(k => k.name === key)
    if (filteredKey) result.push(filteredKey)
    else result.push(false)
  })
  return result
}

export const getActionsKey = (keys) => {
  const actionsKeys = [
    'leftClick',
    'rightClick',
    'middleClick',
    'wheelActionUp',
    'wheelActionDown',
    'actions',
  ]
  const result: (boolean | { name: string; key: string })[] = [] // Change the type of 'result' array
  actionsKeys.forEach((key) => {
    const [filteredKey] = keys.value.filter(k => k.name === key)
    if (filteredKey) result.push(filteredKey)
    else result.push(false)
  })
  return result
}

export const isMobile = 'ontouchstart' in window
