import * as vscode from 'vscode';
import * as https from 'https';
import * as path from "path";
import * as zlib from 'zlib';

export class StackOverflowProvider implements vscode.TreeDataProvider<StackOverflowModel>{

    userQuery:string;
    
    constructor(userQuery:string) {
        this.userQuery = userQuery ;
    }

    getTreeItem(element: StackOverflowModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(): Thenable<StackOverflowModel[]> {
        let menuArray:StackOverflowModel[] = [];
        if(this.userQuery === ''|| this.userQuery === undefined){
            menuArray.push(this.returnNoResultsFound());
            return Promise.resolve(menuArray);
        }
        else{
            return new Promise((resolve, reject)=>{
                let query = encodeURIComponent(this.userQuery);
                let config = vscode.workspace.getConfiguration("Insight",vscode.window.activeTextEditor.document.uri);
                let numDisplayResults = config.get('StackOverflowNumberOfDisplayedResults',15);
                https.get(`https://api.stackexchange.com/2.2/search?page=1&pagesize=${numDisplayResults}&order=desc&sort=relevance&intitle=${query}&site=stackoverflow`, (res)=>{
                    let raw = '';
                    let gunzip = zlib.createGunzip();
                    res.pipe(gunzip);
                    gunzip.on('data',(data)=>{
                        raw += data;
                    })
                    .on('end',()=>{
                        let {items} = JSON.parse(raw);
                        if(items.length !== 0){
                            for(let arrIndex in items){
                                menuArray.push(new StackOverflowModel(
                                    items[arrIndex]["title"], 
                                    "stackoverflow.png", 
                                    vscode.TreeItemCollapsibleState.None,
                                    items[arrIndex]["link"],
                                    {
                                        "command":"StackOverflow.launch",
                                        "title":'',
                                        "arguments":[items[arrIndex]["link"]]
                                    }));
                            }
                        }
                        else{
                            menuArray.push(this.returnNoResultsFound());
                        }
                        resolve(menuArray);
                    })
                    .on('error',(err)=>{
                        reject(err);
                    });
                });
            });
        }
        
    }

    returnNoResultsFound():StackOverflowModel{
        return new StackOverflowModel("No results found!", "stackoverflow.png", vscode.TreeItemCollapsibleState.None);
    }
}

class StackOverflowModel extends vscode.TreeItem{
    url?:string;
    icon:string;
    constructor(label:string, icon:string, collapsibleState:vscode.TreeItemCollapsibleState, url?:string, command?:vscode.Command) {
        super(label,collapsibleState);
        this.label = label;
        this.icon = icon;
        this.url = url;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            dark:path.join(__filename,'..', '..','Media','Dark',this.icon),
            light:path.join(__filename,'..', '..','Media','Light',this.icon)
        };
    }
    contextValue = "searchResultItem";
}

