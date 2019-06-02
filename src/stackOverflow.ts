import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as zlib from 'zlib';

export class StackOverflowProvider implements vscode.TreeDataProvider<StackOverflowModel>{

    getTreeItem(element: StackOverflowModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(): Thenable<StackOverflowModel[]> {
        return new Promise((resolve, reject)=>{
            https.get("https://api.stackexchange.com/2.2/search?page=1&pagesize=2&order=desc&sort=relevance&intitle=javascript&site=stackoverflow", (res)=>{
                let raw = '';
                let gunzip = zlib.createGunzip();
                res.pipe(gunzip);
                gunzip.on('data',(data)=>{
                    raw += data;
                })
                .on('end',()=>{
                    let {items} = JSON.parse(raw);
                    let menuArray:StackOverflowModel[] = [];
                    for(let arrIndex in items){
                        menuArray.push(new StackOverflowModel(items[arrIndex]["title"], items[arrIndex]["link"], vscode.TreeItemCollapsibleState.None));
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

class StackOverflowModel extends vscode.TreeItem{
    url:string;
    constructor(label:string, url:string, collapsibleState:vscode.TreeItemCollapsibleState) {
        super(label,collapsibleState);
        this.url = url;
    }
    contextValue = "searchResultItem";
}

// class StackOverflowModel{
//     label:string;
//     Url:string;
    
//     constructor(label:string, Url:string) {
//         this.label = label;
//         this.Url = Url;
//     }
// }

// export class Test{

//     static testJsonData(){
        
//         // function questionList(url){
//             return new Promise((resolve, reject)=>{
//                 https.get("https://api.stackexchange.com/2.2/search?page=1&pagesize=2&order=desc&sort=relevance&intitle=javascript&site=stackoverflow", (res)=>{
//                     let raw = '';
//                     let gunzip = zlib.createGunzip();
//                     res.pipe(gunzip);
//                     gunzip.on('data',(data)=>{
//                         raw += data;
//                     })
//                     .on('end',()=>{
//                         let {items} = JSON.parse(raw);
//                         let menuArray:StackOverflowModel[] = [];
//                         for(let arrIndex in items){
//                             menuArray.push(new StackOverflowModel(items[arrIndex]["title"], items[arrIndex]["link"]));
//                         }
//                         resolve(menuArray);
//                     })
//                     .on('error',(err)=>{
//                         reject(err);
//                     });
//                 });
//             });
            
//         // }
//         // questionList("https://api.stackexchange.com/2.2/search?page=1&pagesize=2&order=desc&sort=relevance&intitle=javascript&site=stackoverflow")
//         // .then((val)=>console.log(val))
//         // .catch((err)=>console.log(err));
//     }
// }