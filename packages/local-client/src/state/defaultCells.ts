import { Cell } from './cell';

export const defaultCells: Cell[] = [
  {
    id: 'default_cell_01',
    content:
      '# JChalk\n\nThis is an interactive Javascript playground environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it.\n- The code in each editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell.\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values.\n- Re-order or delete cells using the buttons on the top right.\n- Add new cells by hovering on the divider between each cell.\n\n\nAll of your changes get saved to the file you opened JBook with. So if you ran `npx jschalk serve test.js`, all of the text and code you write will be saved to the `test.js` file.\n\nNote: \n- If no file was provided when serving, then a default `notebook.js` will be created instead.\n- You can share these generated files so other people can import your jschalk content.',
    type: 'text',
  },
  {
    id: 'default_cell_02',
    content: `import {useState} from 'react'
      const Counter = () => {
        const [count, setCount] = useState(0);
        return (
          <div>
            <button onClick={() => setCount(count + 1)}>Click to add</button>
            <h1>Count: {count}</h1>
          </div>
        )
      }

      show(<Counter />)
    `,
    type: 'code',
  },
  {
    id: 'default_cell_03',
    content: `const App = () => {
        return (
          <div>
            <h1>Hello</h1>
            <h3>Counter component will be rendered below</h3>
            <hr />
            {/*
              Counter was declared in an earlier cell 
              we can reference it here!
            */}
            <Counter />
          </div>
        )
      }

      show(<App />)
    `,
    type: 'code',
  },
];
