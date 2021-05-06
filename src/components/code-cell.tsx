import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBunlde } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  console.log(cell.id, bundle);

  useEffect(() => {
    if (!bundle) {
      createBunlde(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBunlde(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBunlde]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} errStatus={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
