const vscode = require('vscode');
const acorn = require('acorn');

function isValidJavaScript(content) {
    try {
        acorn.parse(content, { ecmaVersion: 2020 });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.consoleBomb', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const documentContent = document.getText();
            let consoleCounter = 1;
            const newContent = documentContent.split('\n').map((line, index) => {

                if (index % 2 === 1) {
                    const potentialNewLine = line + `\nconsole.log("explosion ${consoleCounter}");`;

                    // Check the whole content with the new line added
                    const potentialNewContent = [
                        ...documentContent.split('\n').slice(0, index),
                        potentialNewLine,
                        ...documentContent.split('\n').slice(index + 1),
                    ].join('\n');

                    // If it's valid, use the new line, otherwise keep the original line
                    if (isValidJavaScript(potentialNewContent)) {
                        consoleCounter++;
                        return potentialNewLine;
                    }
                }
                return line
            }).join('\n');

            const wholeRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(documentContent.length)
            );

            editor.edit((editBuilder) => {
                editBuilder.replace(wholeRange, newContent);
            });
        }
    });

    context.subscriptions.push(disposable);

    // Remove console.log(); command
    let removeDisposable = vscode.commands.registerCommand('extension.removeConsoleLog', function () {
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
            const document = editor.document;
            const documentContent = document.getText();
    
            // Use a regular expression to match lines that only contain 'console.log();'
            const newContent = documentContent.replace(/^\s*console\.log\("explosion on line .*/gm, '');
    
            const wholeRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(documentContent.length)
            );
    
            editor.edit((editBuilder) => {
                editBuilder.replace(wholeRange, newContent);
            });
        }
    });
    
    context.subscriptions.push(removeDisposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
