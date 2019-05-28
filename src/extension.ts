
import * as vscode from 'vscode';
import {QueryProvider} from './resources';
import {W3SchoolsDataProvider} from './w3schools';

export function activate(content: vscode.ExtensionContext) {

//////////////////////////////////////Resources Menu//////////////////////////////////////

    vscode.commands.registerCommand('Resources.search', 
    (websiteURL,querySyntax, language, query)=>{
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteURL}${querySyntax}${language}${query}`));
    });

vscode.commands.registerCommand('Resources.customSearch',
    (websiteQuery)=>{
        QueryProvider.getUserInput().then((output)=>{
            output = output.replace(" ","+");
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteQuery.websiteURL}${websiteQuery.customQuerySyntax}${output}`));
        });
    });

content.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(QueryProvider.refreshTree));
QueryProvider.refreshTree();

//////////////////////////////////////W3 Schools Menu//////////////////////////////////////

let w3Provider = new W3SchoolsDataProvider();
vscode.window.registerTreeDataProvider('Menu2', w3Provider);
vscode.commands.registerCommand('W3Schools.launch',(websiteURL)=>vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(websiteURL)));

}





