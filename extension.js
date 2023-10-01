const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.consoleBomb', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const documentContent = document.getText();

            const newContent = documentContent.split('\n').map((line, index) => {
                // Check if it's an even line (0-based index)
                if (index % 2 === 1) {
                    return line + '\nconsole.log();';
                }
                return line;
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
            const newContent = documentContent.replace(/^\s*console\.log\(\);?\s*$/gm, '');
    
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
