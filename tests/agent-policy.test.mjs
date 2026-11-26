import assert from 'node:assert/strict'
import test from 'node:test'
import { allowAgentAction } from '../lib/agent-policy.ts'

const menu = {
  ref: 'c1',
  component: 'menu',
  label: 'Choose color theme',
  action: 'press',
  args: ['Dark'],
}

test('theme, navigation and ordinary field edits', () => {
  for (const change of [
    {},
    { action: 'setOpen', args: [false] },
    { component: 'button', label: 'Home', args: [] },
    { component: 'input', action: 'setValue', args: ['text'] },
  ]) {
    assert.equal(allowAgentAction({ ...menu, ...change }), true)
  }
})

test('confirmation, submission and unknown actions are denied', () => {
  for (const change of [
    { confirm: 'Ask first' },
    { component: 'button', label: 'Send' },
    { action: 'submit' },
    { args: ['Delete'] },
    { label: 'Manage account' },
    { component: 'input', action: 'press' },
  ]) {
    assert.equal(allowAgentAction({ ...menu, ...change }), false)
  }
})
