import * as vscode from 'vscode';
import * as path from 'path';

export class DocsDataProvider implements vscode.TreeDataProvider<DocsModel>{

    getTreeItem(element: DocsModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(): DocsModel[] {
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
            {
                label:"NodeJs",
                websiteURL:"https://nodejs.org/dist/latest-v10.x/docs/api/",
                icon:"nodejs.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"C#",
                websiteURL:"https://docs.microsoft.com/en-gb/dotnet/csharp/language-reference/",
                icon:"microsoft.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:".NET",
                websiteURL:"https://docs.microsoft.com/en-us/dotnet/api/?view=netframework-4.8",
                icon:"microsoft.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:".NET CORE",
                websiteURL:"https://docs.microsoft.com/en-us/dotnet/api/?view=netcore-2.2",
                icon:"microsoft.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"Python",
                websiteURL:"https://docs.python.org/3/reference/index.html",
                icon:"python.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"Python Standard Lib",
                websiteURL:"https://docs.python.org/3/library/index.html",
                icon:"python.png",
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            
        ];
        let MenuItems:DocsModel[] = [];
        if(items.length !== 0){
            for(let i = 0; i < items.length; i++){
                let label = items[i].label;
                let websiteURL = items[i].websiteURL;
                let icon = items[i].icon;
                let collapsibleState = items[i].collapsibleState;
                MenuItems.push(new DocsModel(
                    label, 
                    websiteURL, 
                    icon, 
                    collapsibleState,
                    {
                        "command":"Docs.launch",
                        "title":'',
                        "arguments":[websiteURL]
                    }));
            }
        }
        return MenuItems;
    }

}



class DocsModel extends vscode.TreeItem{
    
    websiteURL:string;
    icon:string;
    
    constructor(label:string, websiteURL:string, icon:string, collapsibleState:vscode.TreeItemCollapsibleState, command:vscode.Command){
        super(label, collapsibleState);
        this.websiteURL = websiteURL;
        this.icon = icon;
        this.command = command;
        this.iconPath = {
            dark:path.join(__filename,'..','..','Media', 'Dark', this.icon),
            light:path.join(__filename,'..','..','Media', 'Light', this.icon)
        };
    }

}