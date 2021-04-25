import MonacoEditor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: OnMount = (monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(monacoEditor.getValue());
    });
  };

  return (
    <MonacoEditor
      onMount={onEditorDidMount}
      defaultValue={initialValue}
      theme="vs-dark"
      language="javascript"
      height="500px"
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
  );
};

export default CodeEditor;
