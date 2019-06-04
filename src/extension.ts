import * as vscode from 'vscode';
import { QueryProvider } from "./queryProvider";
import {DocsDataProvider} from './docs';
import {StackOverflowProvider} from "./stackOverflow";
import { url } from 'inspector';

export function activate(content: vscode.ExtensionContext) {

//////////////////////////////////////Resources Menu//////////////////////////////////////

    vscode.commands.registerCommand('Resources.search', 
    (websiteURL,querySyntax, language, query)=>{
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteURL}${querySyntax}${language}${query}`));
    });

vscode.commands.registerCommand('Resources.customSearch',
    (websiteQuery)=>{
        QueryProvider.getUserInput().then((userQuery)=>{
            if(userQuery !== undefined){
                userQuery = encodeURIComponent(userQuery);
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteQuery.websiteURL}${websiteQuery.customQuerySyntax}${userQuery}`));
            }
        });
    });

content.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(QueryProvider.refreshResourcesTree));
QueryProvider.refreshResourcesTree();

//////////////////////////////////////W3 Schools Menu//////////////////////////////////////

let DocsProvider = new DocsDataProvider();
vscode.window.registerTreeDataProvider('Menu3', DocsProvider);
vscode.commands.registerCommand('Docs.launch',(websiteURL)=>vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(websiteURL)));

//////////////////////////////////////stack//////////////////////////////////////

vscode.commands.registerCommand("StackOverflow.seach",
()=>{
    QueryProvider.getUserInput().then((userQuery)=>{
        if(userQuery !== undefined){
            let stackOverflowProvider = new StackOverflowProvider(userQuery);
            vscode.window.registerTreeDataProvider("Menu2", stackOverflowProvider);
        }
    });
});

vscode.commands.registerCommand("StackOverflow.launch",(Url)=>{
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(Url));
});

}





