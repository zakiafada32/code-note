# Jschalk an interactive javascript playground environment

### An interactive javascript playground environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.

### Quick start:

```bash
npx jschalk serve notebook.js
```

or

```bash
npm install -g jschalk
jschalk serve notebook.js
```

### CLI:

```bash
npx jschalk serve <filename>.js
```

example

```bash
npx jschalk serve notebook.js
```

- Creates a `notebook.js` file where your content will be stored, you can also share this file with others (the file path is the same as the path when running CLI).

```bash
npx jschalk serve notebook.js -p 300
```

- Manually choose the port to serve the app

### Features:

- Click cells to edit
- The code in each editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell.
- `show` is special function to show any React component, string, number, or anything else in preview window. This is a function built into this environment. Call `show` multiple times to show multiple values.
- Re-order or delete cells using the buttons on the top right.
- Add new cells by hovering on the divider between each cell.

### Cloning and Running the App in Local

Clone the project in localhost

```bash
git clone https://github.com/zakiafada32/code-note.git
```

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
lerna bootstrap
```

In order to run the application Type the following command

```bash
lerna run start
```
