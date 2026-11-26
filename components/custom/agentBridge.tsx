'use client'

import { useEffect } from 'react'
import { createAgent, registerTools } from '@ui-sdk/react/agent'
import { allowAgentAction as allow } from '@/lib/agent-policy'

const agent = typeof window === 'undefined' ? undefined : createAgent({ allow })

export function AgentBridge() {
  useEffect(() => {
    if (agent) return registerTools(agent, { allow })
  }, [])
  return null
}
