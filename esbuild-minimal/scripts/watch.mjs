import esbuild from 'esbuild'
import chokidar from 'chokidar'
import { config } from '../config.mjs'

const service = await esbuild.startService()

const chokidarEventHandler = async event => {
  const msg = !event
    ? 'chokidar has started'
    : `chokidar has detected change on ${event}`
  console.log(msg)
  await service.build({ ...config, incremental: true })
}

chokidar.watch('./src/**/*').on('ready', chokidarEventHandler).on('change', chokidarEventHandler)
