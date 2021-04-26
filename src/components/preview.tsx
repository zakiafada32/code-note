import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head></head>
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
    const setIframe = async () => {
      if (iframe.current === null) {
        return;
      }
      // iframe.current.srcdoc = html; // todo research iframe reloading
      iframe.current.contentWindow?.postMessage(code, '*');
    };
    setIframe();
  }, [code]);

  return (
    <iframe
      ref={iframe}
      srcDoc={html}
      sandbox="allow-scripts"
      title="sandbox frame"
    />
  );
};

export default Preview;
