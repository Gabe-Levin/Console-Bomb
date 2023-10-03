# Console Bomb VSCode Extension

The Console Bomb VSCode extension provides a quirky and enjoyable way to embed `console.log()` statements into your JavaScript code. With a single command, your code is riddled with log statements on alternating lines, creating a so-called "console bomb" to explode your console with messages. Fear not, for a deactivating mechanism (command) is also provided to clean up all the introduced console logs, returning your code to its original state.

## Features

### 🎇 Console Bomb

Add a `console.log("explosion [NUMBER]");` to every alternate line of your code, where `[NUMBER]` increments with each subsequent insertion. The command ensures that the log statement is only added if it doesn't invalidate your JavaScript syntax.

### 🧹 Remove Console Logs

Removes all inserted `console.log("explosion [NUMBER]");` statements, leaving all other `console.log()` entries undisturbed.

## Usage

### Explode Consoles

1. Open a JavaScript file in VSCode.
2. Press `Ctrl+Shift+P` to open the command palette.
3. Type and select `Console Bomb: Explode`.

### Defuse Consoles

1. Ensure you're working within the file that has the console bomb logs.
2. Press `Ctrl+Shift+P` to open the command palette.
3. Type and select `Console Bomb: Defuse`.
