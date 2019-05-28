
import * as vscode from 'vscode';
import {QueryProvider} from './Insight';
 

export function activate(content: vscode.ExtensionContext) {

vscode.commands.registerCommand('Extension.search', 
    (websiteURL,querySyntax, language, query)=>{
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteURL}${querySyntax}${language}${query}`));
    });

vscode.commands.registerCommand('Extension.customSearch',
    (websiteQuery)=>{
        console.log(websiteQuery);
        QueryProvider.getUserInput().then((output)=>{
            output = output.replace(" ","+");
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteQuery.websiteURL}${websiteQuery.customQuerySyntax}${output}`));
        });
    });

content.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(QueryProvider.refreshTree));
QueryProvider.refreshTree();
}





