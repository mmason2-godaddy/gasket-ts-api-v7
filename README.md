# Gasket Typescript v7 API POC

This is a proof of concept for a Gasket API written in Typescript. Currently it's using the `next` dist tag package releases for `v7`.

## Getting Started

To get started, clone this repository and run the following commands:

```bash
cd gasket-ts-api-v7
npm install
```

## Configuration

The `start` script is configured to run over `https` and expects a `.env` file in the root of the project with the following variables:

```bash
CERT_KEY_PATH=/some/path/to/your/cert.key
CERT_CRT_PATH=/some/path/to/your/cert.crt
```

The certs are not needed for the `local` script. You can change the `hostname` in the `gasket.ts` to align with your certs.

```diff
export default makeGasket({
  plugins: [],
  express: {},
  environments: {
    local: {
      hostname: 'localhost',
      http: 3000
    },
    production: {
-      hostname: 'local.gasket.dev-godaddy.com',
+      hostname: 'my-matching-cert-host.com',
      https: {
        port: 9443,
        key: readFileSync(process.env.CERT_KEY_PATH),
        cert: readFileSync(process.env.CERT_CRT_PATH)
      }
    }
  }
});

```

## Scripts

- `npm run local` - Start a development server on port `3000` with `nodemon` and `ts-node` for hot reloading. This server is configured to be `http`.
- `npm run build` - Build the Typescript files with `tsc` and a temporary utility to transform file extensions.
- `npm run start` - Builds the files, sets the `GASKET_ENV` to `production`, and starts the server with `node` over `https`.

## App-level Typescript Plugin

It is possible to add a `plugins` directory in app and define Gasket plugins in Typescript. There is an example plugin that hooks the `middleware` lifecycle and logs in the `debug` level. It also hooks the `express` lifecycle to add a route to express and define some data. This plugin is a non-sensical example but it demonstrates the ability to define plugins in Typescript with Gasket.

## ESM & Typescript

This POC is rough implementation of a Gasket API using Typescript and `v7`. Hopefully it's obvious that the emphasis isn't around strict type-checking but rather the tooling required to provide Typescript support overall. There's a lot to still be discovered/determined around the implementation in a `type: module` Gasket app. Our goal is to have generated Gasket apps in `v7` be `type: module` but if that's feasible or not is to be determined. The ecosystem as a whole is still evolving around this. The complications arise when extensions are included in `.ts` files(A requirement of ESM). Typescript will throw an error:

```bash
An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.
```

Setting `allowImportingTsExtensions` to `true` in the `tsconfig.json` results in:

```bash
Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.
```

The end result is that `tsc` does not emit files to a build directory. To get around this for the POC, `@ts-nocheck`(s) have been added to the `.ts` files that have imports with extensions.

We'll likely need to have additional tooling and leverage the `moduleResolution: bundler` option in the `tsconfig.json` to get around this. This is still a work in progress.

The ending `tsconfig.json` will likely look something like this:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    // ... more stuff
  }
}
```

## Tooling Options

There's few reliable resources on this topic at the moment. The following are some options that are being considered:

- `swc` - initial investigations are not promising.
- `webpack` - to be explored.
- `rollup` - there are articles around this topic but it's not clear if it's a viable solution yet.
