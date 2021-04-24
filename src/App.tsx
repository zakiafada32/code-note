import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<boolean>(false);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState<string>('');
  // const [code, setCode] = useState('');

  const startService = async () => {
    await esbuild.initialize({
      worker: false,
      wasmURL: '/esbuild.wasm', // todo grab esbuild.wasm from unpkg
    });
    ref.current = true;
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    // console.log('result: ', result);
    // setCode(result.outputFiles[0].text);
    if (
      iframe === null ||
      iframe.current === null ||
      iframe.current.contentWindow === null
    ) {
      return;
    }
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
              console.log(event.data);
              eval(event.data);
            }, false)
          </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <iframe
        srcDoc={html}
        frameBorder="1"
        title="sandbox frame"
        sandbox="allow-scripts"
        ref={iframe}
      ></iframe>
    </div>
  );
};

export default App;
