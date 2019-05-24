import * as vscode from 'vscode';

export class MenuDataProvider implements vscode.TreeDataProvider<MenuModel>{
    
    getTreeItem(element: MenuModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        throw new Error("Method not implemented.");
    }

    getChildren(element?: MenuModel | undefined): vscode.ProviderResult<MenuModel[]> {
        throw new Error("Method not implemented.");
    }


}

class MenuModel extends vscode.TreeItem{

}