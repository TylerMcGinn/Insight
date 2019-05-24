import * as vscode from 'vscode';
import {MenuDataProvider} from './Academy';

export function activate(context: vscode.ExtensionContext) {
let provider = new MenuDataProvider;
vscode.window.registerTreeDataProvider('AcademyMenu', provider);
vscode.commands.registerCommand('Extension.goToSite',(websitUrl)=>vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(websitUrl)));

}

