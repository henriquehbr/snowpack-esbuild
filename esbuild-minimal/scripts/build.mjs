import esbuild from 'esbuild'
import { config } from '../config.js'

await esbuild.build(config)
