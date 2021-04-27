import { useRef, useEffect } from 'react';

import './preview.css';
interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html> 
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current === null) {
      return;
    }

    iframe.current.contentWindow?.postMessage(code, '*');
  }, [code]);

  const onResetClick = () => {
    if (iframe.current === null) {
      return;
    }
  };

  return (
    <div className="preview-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onResetClick}
      >
        Reset
      </button>
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        title="sandbox frame"
      />
    </div>
  );
};

export default Preview;
