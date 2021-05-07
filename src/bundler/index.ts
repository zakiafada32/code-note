import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service = false; // to check already initialize or not

export const bundle = async (rawCode: string) => {
  if (!service) {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: '/esbuild.wasm', // todo grab esbuild.wasm from unpkg
      });
      service = true;
    } catch (error) {
      // workaround because esbuild throw an error
      // cannot call "initalize" more than once
      console.log('esbuild initialized');
    }
  }

  if (!service) {
    return {
      code: '',
      err: '',
    };
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });

    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
      return {
        code: '',
        err: err.message,
      };
    }
    return {
      code: '',
      err: 'something weird happen',
    };
  }
};
