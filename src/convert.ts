import * as vscode from 'vscode';
import * as editorIO from './editorIO';
import { Deasciifier, Asciifier } from "./deascii/deasciifier";
import PATTERN_LIST from "./gen_patterns/gen_patterns_v2"
import { TextProcessingOptions } from './deascii/common';


const deasciifier = new Deasciifier()
deasciifier.init(PATTERN_LIST)

export function convertToTurkish(): void {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor => do nothing
    }

    let selections = editor.selections;
    let selectedText = selections.map(s => editor.document.getText(s));
    console.log("Selected text", selectedText)
    function replace(): void {
        let options = new TextProcessingOptions(true)
        let replacements = selectedText.map(t => deasciifier.process(t, options).text);
        editorIO.replaceSelections(editor, selections, replacements);
    }

    replace();
}


export function turkishToAscii(): void {
    const asciifier = new Asciifier()
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor => do nothing
    }

    let selections = editor.selections;
    let selectedText = selections.map(s => editor.document.getText(s));
    console.log("Selected text", selectedText)
    function replace(): void {
        let options = new TextProcessingOptions(true)
        let replacements = selectedText.map(t => asciifier.process(t, options).text);
        editorIO.replaceSelections(editor, selections, replacements);
    }

    replace();
}