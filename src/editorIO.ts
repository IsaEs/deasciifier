// helper functions for working with the VSCode editor
'use strict';
import * as vscode from 'vscode';

export function getSelectedTexts(): string[] {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return [];
    }

    let texts: string[] = [];
    let selections = editor.selections;

    if (selections.length > 1) {
        texts = selections.map(s => editor.document.getText(s));
    } else if (selections.length === 1) {
        let text = editor.document.getText(selections[0]);
        texts = text.split(/\r?\n/);
    }

    return texts;
}

export function replaceSelections(editor: vscode.TextEditor, selections: vscode.Selection[], replacement: string[]): void {
    editor.edit(function (edit: vscode.TextEditorEdit): void {
        selections.forEach((s: vscode.Selection, i: number) => {
            edit.replace(s, replacement[i]);
        });
    });
}
