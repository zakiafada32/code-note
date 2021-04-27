import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';

import './code-editor.css';
import './syntax.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(); // todo update type

  const onEditorDidMount: OnMount = (monacoEditor, _monaco) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(monacoEditor.getValue());
    });

    // Minimal Babel setup for React JSX parsing:
    const babelParse = (code: string) =>
      parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
      });

    // Instantiate the highlighter
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco, // todo research for better solution
      babelParse,
      traverse,
      monacoEditor
    );
    // Activate highlighting (debounceTime default: 100ms)
    monacoJSXHighlighter.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    );
    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand();
    // Done =)
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        defaultValue={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
