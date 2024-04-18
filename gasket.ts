// @ts-nocheck
import { makeGasket } from '@gasket/core';
import pluginExpress from "@gasket/plugin-express";
import pluginHttps from "@gasket/plugin-https";
import pluginWinston from "@gasket/plugin-winston";
import pluginLogger from "@gasket/plugin-logger";
import expressRoutes from './routes.ts';

export default makeGasket({
  plugins: [
    pluginExpress,
    pluginHttps,
    pluginWinston,
    pluginLogger
  ],
  express: {
    routes: expressRoutes,
  },
  environments: {
    local: {
      http: 8000,
    }
  }
});

