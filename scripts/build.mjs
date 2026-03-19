import { rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const workspaceRoot = resolve(__dirname, '..')
const nextDir = resolve(workspaceRoot, '.next')

async function sleep(ms) {
  await new Promise((resolvePromise) => setTimeout(resolvePromise, ms))
}

async function removeNextArtifacts() {
  const retries = 5

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await rm(nextDir, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 200,
      })
      return
    } catch (error) {
      if (attempt === retries) {
        throw error
      }

      const delay = attempt * 400
      console.warn(`Failed to clean .next on attempt ${attempt}/${retries}. Retrying in ${delay}ms...`)
      await sleep(delay)
    }
  }
}

async function run() {
  await removeNextArtifacts()

  const nextBin = require.resolve('next/dist/bin/next')

  const child = spawn(process.execPath, [nextBin, 'build'], {
    cwd: workspaceRoot,
    stdio: 'inherit',
    env: process.env,
  })

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }

    process.exit(code ?? 1)
  })

  child.on('error', (error) => {
    console.error(error)
    process.exit(1)
  })
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})