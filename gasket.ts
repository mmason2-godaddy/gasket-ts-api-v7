// @ts-nocheck
import 'dotenv/config';
import { makeGasket } from '@gasket/core';
import pluginExpress from '@gasket/plugin-express';
import pluginHttps from '@gasket/plugin-https';
import pluginWinston from '@gasket/plugin-winston';
import pluginLogger from '@gasket/plugin-logger';
import pluginHowdyMiddleware from './plugins/howdy-middleware.ts';
import expressRoutes from './routes/index.ts';
import { readFileSync } from 'fs';

export default makeGasket({
  plugins: [
    pluginExpress,
    pluginHttps,
    pluginWinston,
    pluginLogger,
    pluginHowdyMiddleware
  ],
  express: {
    routes: expressRoutes
  },
  environments: {
    local: {
      hostname: 'localhost',
      http: 3000,
      winston: {
        level: 'debug'
      }
    },
    production: {
      hostname: 'local.gasket.dev-godaddy.com',
      https: {
        port: 9443,
        key: process.env.CERT_KEY_PATH ? readFileSync(process.env.CERT_KEY_PATH) : '',
        cert: process.env.CERT_CRT_PATH ? readFileSync(process.env.CERT_CRT_PATH) : ''
      }
    }
  }
});

