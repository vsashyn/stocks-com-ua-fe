import { defineEventHandler } from 'nitro/h3'

export default defineEventHandler(() => {
  return {
    message: 'Hello from Nitro API!',
    timestamp: new Date().toISOString(),
  }
})
