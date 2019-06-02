import * as vscode from 'vscode';
import { QueryProvider } from "./queryProvider";
import {DocsDataProvider} from './docs';
import {StackOverflowProvider} from "./stackOverflow";

export function activate(content: vscode.ExtensionContext) {

//////////////////////////////////////Resources Menu//////////////////////////////////////

    vscode.commands.registerCommand('Resources.search', 
    (websiteURL,querySyntax, language, query)=>{
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteURL}${querySyntax}${language}${query}`));
    });

vscode.commands.registerCommand('Resources.customSearch',
    (websiteQuery)=>{
        QueryProvider.getUserInput().then((userQuery)=>{
            userQuery = encodeURIComponent(userQuery);
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${websiteQuery.websiteURL}${websiteQuery.customQuerySyntax}${userQuery}`));
        });
    });

content.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(QueryProvider.refreshTree));
QueryProvider.refreshTree();

//////////////////////////////////////W3 Schools Menu//////////////////////////////////////

let DocsProvider = new DocsDataProvider();
vscode.window.registerTreeDataProvider('Menu2', DocsProvider);
vscode.commands.registerCommand('Docs.launch',(websiteURL)=>vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(websiteURL)));

//////////////////////////////////////stack//////////////////////////////////////
let stackOverflowProvider = new StackOverflowProvider();
vscode.window.registerTreeDataProvider("Menu3", stackOverflowProvider);
// vscode.commands.registerCommand('stack', ()=>{Test.testJsonData();});
// vscode.commands.registerCommand('stack', ()=>vscode.commands.executeCommand('vscode.open', vscode.Uri.parse("https://api.stackexchange.com/2.2/search?page=1&pagesize=10&order=desc&sort=relevance&intitle=javascript%2Bfilter&site=stackoverflow")));
}





