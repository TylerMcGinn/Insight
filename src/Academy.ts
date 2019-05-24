import * as vscode from 'vscode';

export class MenuDataProvider implements vscode.TreeDataProvider<MenuModel>{
    
    getTreeItem(element: MenuModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: MenuModel | undefined): MenuModel[] {
        let testObj = [
            {
            label:"Youtube",
            websiteURL:"https://www.youtube.com",
            collapsibleState:vscode.TreeItemCollapsibleState.None
            }
        ];
        let menuItems:MenuModel[] = [];
        if(testObj.length !== 0){
            for(let i = 0; i<testObj.length; i++){
                let label = testObj[i].label;
                let websiteURL = testObj[i].websiteURL;
                let collapsibleState = testObj[i].collapsibleState;

                menuItems[i] = new MenuModel(
                    label, 
                    websiteURL, 
                    collapsibleState, 
                    {
                        command:"Extension.goToSite",
                        title:"",
                        arguments:[websiteURL]
                    });
            }
        }
        return menuItems;    
    }
}

class MenuModel extends vscode.TreeItem{
    websiteURL:string;
    constructor(
        label:string,
        websiteURL:string,
        collapsibleState:vscode.TreeItemCollapsibleState,
        command?:vscode.Command
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.websiteURL = websiteURL;
        this.collapsibleState = collapsibleState;
        this.command = command;
    }
}