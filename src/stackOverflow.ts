import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as zlib from 'zlib';

// export class StackOverflowProvider implements vscode.TreeDataProvider<StackOverflowModel>{

//     getTreeItem(element: StackOverflowModel): vscode.TreeItem | Thenable<vscode.TreeItem> {
//         return element;
//     }

//     getChildren(): Thenable<StackOverflowModel[]> {
//      async function questionList(url, callback){
//            let data = await https.get(url, (res)=>{
//                 let raw = '';
//                 let gunzip = zlib.createGunzip();
//                 res.pipe(gunzip);
//                 gunzip.on('data',(data)=>{
//                     raw += data;
//                 })
//                 .on('end',()=>{
//                     let jsonData = JSON.parse(raw);
//                     return callback(null, jsonData);
//                 })
//                 .on('error',(err)=>{
//                      callback(err, null);
//                 });
//             });
//             return data;
//         }
        
//        return Promise.resolve( 
//         questionList("https://api.stackexchange.com/2.2/search?page=1&pagesize=2&order=desc&sort=relevance&intitle=javascript&site=stackoverflow", function callback(err,data):StackOverflowModel[]{
//             let menuItems:StackOverflowModel[] = [];    
//         if(err !== null){
//                 console.log(err);
//             }
//             data["items"].forEach((element)=>{
//                 menuItems.push(new StackOverflowModel(element["title"], element["link"], vscode.TreeItemCollapsibleState.None)); 
//             });
//             return menuItems;
//         }));
        
        
//     }
// }

// class StackOverflowModel extends vscode.TreeItem{
//     url:string;
//     constructor(label:string, url:string, collapsibleState:vscode.TreeItemCollapsibleState) {
//         super(label,collapsibleState);
//         this.url = url;
//     }
// }

class StackOverflowModel{
    label:string;
    Url:string;
    
    constructor(label:string, Url:string) {
        this.label = label;
        this.Url = Url;
    }
}

export class Test{

    static testJsonData(){
        
        function questionList(url){
            return new Promise((resolve, reject)=>{
                https.get(url, (res)=>{
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
                            menuArray.push(new StackOverflowModel(items[arrIndex]["title"], items[arrIndex]["link"]));
                        }
                        resolve(menuArray);
                    })
                    .on('error',(err)=>{
                        reject(err);
                    });
                });
            });
            
        }
        questionList("https://api.stackexchange.com/2.2/search?page=1&pagesize=2&order=desc&sort=relevance&intitle=javascript&site=stackoverflow")
        .then((val)=>console.log(val))
        .catch((err)=>console.log(err));
    }
}