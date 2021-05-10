import { useRef, useEffect } from 'react';

import './preview.css';
interface PreviewProps {
  code: string;
  errStatus: string;
}

const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html> 
`;

const Preview: React.FC<PreviewProps> = ({ code, errStatus }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current === null) {
      return;
    }
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current?.contentWindow?.postMessage(code, '*');
    }, 50);
  }, [code]);

  const onResetClick = () => {
    if (iframe.current === null) {
      return;
    }
    iframe.current.srcdoc = html;
  };

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
        title="sandbox frame"
      />
      {errStatus && <div className="preview-error">{errStatus}</div>}
      <button
        className="button button-reset is-primary is-small"
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
};

export default Preview;
