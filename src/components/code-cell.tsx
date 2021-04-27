import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { bundle } from '../bundler';

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} errStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
