import * as vscode from 'vscode';
import * as path from 'path';


export class MenuDataProvider implements vscode.TreeDataProvider<MenuModel>{

    getTreeItem(element: MenuModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren():MenuModel[] {
        let items = [
            {
                label:"Google",
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
                querySyntax:QueryProvider.getQuerySyntax("/results?search_query="),
                websiteURL:"https://www.youtube.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"youtube.jpg",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None,
            },
            {
                label:"StackOverflow",
                querySyntax:QueryProvider.getQuerySyntax("/search?q=") ,
                websiteURL:"https://stackoverflow.com",
                language: QueryProvider.getLanguage(),
                query:QueryProvider.getSelectedText(),
                icon:"stack.png",
                description:QueryProvider.getLanguageForDescription() + QueryProvider.getSelectedText(),
                collapsibleState:vscode.TreeItemCollapsibleState.None

            }
            
        ];
        let menuItems:MenuModel[] = [];
        if(items.length !== 0){
            for(let i = 0; i<items.length;i++){
                let label = items[i].label;
                let querySyntax = items[i].querySyntax;
                let websiteURL = items[i].websiteURL;
                let language = items[i].language;
                let query = items[i].query;
                let icon = items[i].icon;
                let description = items[i].description;
                let collapsibleState = items[i].collapsibleState;
                menuItems[i] = new MenuModel(
                    label, 
                    querySyntax, 
                    websiteURL,
                    language,
                    query, 
                    icon, 
                    description, 
                    collapsibleState,
                    {
                        command:"Extension.search",
                        title:'',
                        arguments:[websiteURL,querySyntax, language, query]
                    });
            }
            return menuItems;
        }
    }
}


/////////////////////////////////////////////////Data Provider and Model classes///////////////////////////////////////////////////////////////////



class MenuModel extends vscode.TreeItem{
    
    icon:string;
    querySyntax:string;
    websiteURL:string;
    language:string;
    query:string;

    constructor(label:string, querySyntax:string, websiteURL:string, language:string, query:string, icon:string, description:string, collapsibleState:vscode.TreeItemCollapsibleState, command:vscode.Command) {
        super(label, collapsibleState);
        this.label = label;
        this.querySyntax = querySyntax;
        this.websiteURL = websiteURL;
        this.language = language;
        this.query = query;
        this.icon = icon;
        this.description = description;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            dark: path.join(__filename,'..', '..','Icons',this.icon) ,
            light: path.join(__filename,'..', '..','Icons',this.icon)
        };
    }
    contextValue = "MenuItem";
}



class SelectedTextModel{
    lineStart:number;
    lineEnd:number;
    indexStart:number;
    indexEnd:number;
    
    constructor(Obj:object) {
        this.lineStart = Obj['start']['line'];
        this.lineEnd = Obj['end']['line'];
        this.indexStart = Obj['start']['character'];
        this.indexEnd = Obj['end']['character'];  
    }
}



export class QueryProvider{

    private static getTextPosition(editor:vscode.TextEditor|undefined):SelectedTextModel{
        let text:any = [];
        if(editor){
            text = editor.selection;
        }
        return new SelectedTextModel(text);
    }
    
    static getSelectedText():string{
        let selection = this.getTextPosition(vscode.window.activeTextEditor);
        let data =  vscode.window.activeTextEditor.document.getText(
            new vscode.Range(
                new vscode.Position(selection.lineStart, selection.indexStart), 
                new vscode.Position(selection.lineEnd, selection.indexEnd)
            )
        );
        return data;
    }

    static getLanguage():string{
        if(this.getSelectedText() === ''){
            return "";
        }
        else{
            return vscode.window.activeTextEditor.document.languageId + "+";
        }
    }

    static getLanguageForDescription():string{
        if(this.getSelectedText() === ''){
            return "";
        }
        else{
            return vscode.window.activeTextEditor.document.languageId + ': ';
        }
    }

    static getQuerySyntax(syntax:string):string{
        if(this.getSelectedText() === ""){
            return "";
        }
        else{
            return syntax;
        }
    }

    static refreshTree(){
        let selectedText = new MenuDataProvider();
        vscode.window.registerTreeDataProvider('Menu', selectedText);
    }

    static getUserInput():Thenable<string>{
        let userQuery = vscode.window.showInputBox({
            prompt:"Enter Search Query!",
            placeHolder:"ex: function Python print()",
            ignoreFocusOut:true
        });
        return userQuery;
    }
}