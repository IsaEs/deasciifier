'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as convert from './convert';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Deasciifier" is now active!');
    let commands =
        [
            {
                'name': 'extension.convertToTurkish',
                'callback': convert.convertToTurkish
            },
            {
                'name': 'extension.turkishToAscii',
                'callback': convert.turkishToAscii
            },
        ];

    // register all commands
    commands.map(command => {
        let subscription = vscode.commands.registerCommand(command.name, command.callback);
        context.subscriptions.push(subscription);
    });
}

// this method is called when your extension is deactivated
export function deactivate(): void {
    return;
}
