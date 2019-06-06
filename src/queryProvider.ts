import { ResourcesDataProvider } from './resources';
import { SelectedTextModel } from "./SelectedTextModel";
import { StackOverflowProvider } from './stackOverflow';
import * as vscode from 'vscode';

export class QueryProvider {

    private static getTextPosition(editor: vscode.TextEditor | undefined): SelectedTextModel {
        let text: any = [];
        if (editor) {
            text = editor.selection;
        }
        return new SelectedTextModel(text);
    }

    static getSelectedText(): string {
        let selection = this.getTextPosition(vscode.window.activeTextEditor);
        let data = vscode.window.activeTextEditor.document.getText(new vscode.Range(new vscode.Position(selection.lineStart, selection.indexStart), new vscode.Position(selection.lineEnd, selection.indexEnd)));
        return data;
    }

    static getLanguage(): string {
        if (this.getSelectedText() === '') {
            return "";
        }
        else {
            return vscode.window.activeTextEditor.document.languageId + "+";
        }
    }

    static getLanguageForDescription(): string {
        if (this.getSelectedText() === '') {
            return "";
        }
        else {
            return vscode.window.activeTextEditor.document.languageId + ': ';
        }
    }

    static getQuerySyntax(syntax: string): string {
        if (this.getSelectedText() === "") {
            return "";
        }
        else {
            return syntax;
        }
    }

    static refreshResourcesTree(): void {
        let resourcesProvider = new ResourcesDataProvider();
        vscode.window.registerTreeDataProvider('Menu1', resourcesProvider);
    }

    static refreshStackOverflowSearchTree(userQuery:string|undefined): void {
        let stackOverflowProvider = new StackOverflowProvider(userQuery);
        vscode.window.registerTreeDataProvider("Menu2", stackOverflowProvider);
    }

    static getUserInput(): Thenable<string> {
        let userQuery = vscode.window.showInputBox({
            prompt: "Enter Search Query!",
            placeHolder: "ex: Python print() function",
            ignoreFocusOut: true
        });
        return userQuery;
    }
    
}
