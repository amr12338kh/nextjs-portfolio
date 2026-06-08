import { loadEnvConfig } from '@next/env'
const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(process.cwd(), dev)

import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: './**/*.{ts,tsx,js,jsx}',
    schema: './sanity/schema.json',
    generates: './sanity/types.ts',
  },
})