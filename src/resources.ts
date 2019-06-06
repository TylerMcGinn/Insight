import * as vscode from 'vscode';
import * as path from 'path';
import { QueryProvider } from './queryProvider';

export class ResourcesDataProvider implements vscode.TreeDataProvider<ResourcesModel>{

    getTreeItem(element: ResourcesModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren():ResourcesModel[] {
        let websiteList = [
            {
                label:"Google",
                customQuerySyntax:"/search?q=",
                querySyntax:QueryProvider.getQuerySyntax("/search?q=") ,
                websiteURL:"https://www.google.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"google.png",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label: "Youtube",
                customQuerySyntax:"/results?search_query=",
                querySyntax:QueryProvider.getQuerySyntax("/results?search_query="),
                websiteURL:"https://www.youtube.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"youtube.png",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None,
            },
            {
                label:"StackOverflow",
                customQuerySyntax:"/search?q=",
                querySyntax:QueryProvider.getQuerySyntax("/search?q="),
                websiteURL:"https://stackoverflow.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"stackoverflow.png",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None
            },
            {
                label:"MSDN",
                customQuerySyntax:"/search/en-US?query=",
                querySyntax:QueryProvider.getQuerySyntax("/search/en-US?query="),
                websiteURL:"https://social.msdn.microsoft.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"microsoft.png",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None
            }
        ];
        let menuItems:ResourcesModel[] = [];
        if(websiteList.length !== 0){
            for(let i = 0; i<websiteList.length;i++){
                let label = websiteList[i].label;
                let customQuerySyntax = websiteList[i].customQuerySyntax;
                let querySyntax = websiteList[i].querySyntax;
                let websiteURL = websiteList[i].websiteURL;
                let language = websiteList[i].language;
                let query = websiteList[i].query;
                let icon = websiteList[i].icon;
                let description = websiteList[i].description;
                let collapsibleState = websiteList[i].collapsibleState;
                menuItems.push( new ResourcesModel(
                    label, 
                    customQuerySyntax,
                    querySyntax, 
                    websiteURL,
                    language,
                    query, 
                    icon, 
                    description, 
                    collapsibleState,
                    {
                        command:"Resources.search",
                        title:'',
                        arguments:[websiteURL,querySyntax, language, query]
                    }));
            }
        }
        return menuItems;
    }
}


class ResourcesModel extends vscode.TreeItem{
    
    icon:string;
    customQuerySyntax:string;
    querySyntax:string;
    websiteURL:string;
    language:string;
    query:string;

    constructor(label:string, customQuerySyntax:string, querySyntax:string, websiteURL:string, language:string, query:string, icon:string, description:string, collapsibleState:vscode.TreeItemCollapsibleState, command:vscode.Command) {
        super(label, collapsibleState);
        this.label = label;
        this.customQuerySyntax = customQuerySyntax;
        this.querySyntax = querySyntax;
        this.websiteURL = websiteURL;
        this.language = language;
        this.query = query;
        this.icon = icon;
        this.description = description;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            dark: path.join(__filename,'..', '..','Icons','Dark',this.icon) ,
            light: path.join(__filename,'..', '..','Icons','Light',this.icon)
        };
    }
    contextValue = "MenuItem";
}




