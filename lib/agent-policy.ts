import type { AgentAction } from '@ui-sdk/react/agent'

const navigationLabels = new Set([
  'Harry Thomas Work',
  'Home',
  'My work',
  'My résumé',
  'My GitHub',
  'My LinkedIn',
  'Open app',
  'Source',
])

export function allowAgentAction({
  component,
  label,
  action,
  args,
  confirm,
}: AgentAction) {
  if (confirm !== undefined) return false
  if (component === 'button')
    return (
      action === 'press' &&
      args.length === 0 &&
      navigationLabels.has(label ?? '')
    )
  if (component === 'input' || component === 'textarea') {
    return (
      action === 'setValue' && args.length === 1 && typeof args[0] === 'string'
    )
  }
  if (component !== 'menu' || label !== 'Choose color theme') return false
  if (action === 'setOpen')
    return args.length === 1 && typeof args[0] === 'boolean'
  return (
    action === 'press' &&
    args.length === 1 &&
    typeof args[0] === 'string' &&
    ['Light', 'Dark', 'System'].includes(args[0])
  )
}
