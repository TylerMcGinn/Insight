import * as vscode from 'vscode';
import * as path from 'path';

export class W3SchoolsDataProvider implements vscode.TreeDataProvider<W3SchoolsModel>{

    getTreeItem(element: W3SchoolsModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(): W3SchoolsModel[] {
        let items = [
            {
                label:"Javascript",
                websiteURL:"https://www.w3schools.com/jsref/default.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"HTML",
                websiteURL:"https://www.w3schools.com/tags/default.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"CSS",
                websiteURL:"https://www.w3schools.com/cssref/default.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"JQuery",
                websiteURL:"https://www.w3schools.com/jquery/jquery_ref_overview.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"Python",
                websiteURL:"https://www.w3schools.com/python/python_reference.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"PHP",
                websiteURL:"https://www.w3schools.com/php7/php7_ref_overview.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"SQL",
                websiteURL:"https://www.w3schools.com/sql/sql_ref_keywords.asp",
                icon:"w3.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            
        ];
        let MenuItems:W3SchoolsModel[] = [];
        if(items.length !== 0){
            for(let i = 0; i < items.length; i++){
                let label = items[i].label;
                let websiteURL = items[i].websiteURL;
                let icon = items[i].icon;
                let collapsibleState = items[i].collapsibleState;
                MenuItems[i] = new W3SchoolsModel(
                    label, 
                    websiteURL, 
                    icon, 
                    collapsibleState,
                    {
                        "command":"W3Schools.launch",
                        "title":'',
                        "arguments":[websiteURL]
                    });
            }
        }
        return MenuItems;
    }

}

class W3SchoolsModel extends vscode.TreeItem{
    
    websiteURL:string;
    icon:string;
    
    constructor(label:string, websiteURL:string, icon:string, collapsibleState:vscode.TreeItemCollapsibleState, command:vscode.Command) {
        super(label, collapsibleState);
        this.websiteURL = websiteURL;
        this.icon = icon;
        this.command = command;
        this.iconPath = {
            dark:path.join(__filename,'..','..','Icons', 'Dark', this.icon),
            light:path.join(__filename,'..','..','Icons', 'Light', this.icon)
        };
    }

}