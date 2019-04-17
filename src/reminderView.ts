'use strict';
import * as vscode from 'vscode';
// import * as path from 'path';
import { Utility } from './utility';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext) {
        if (this.panel) {
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("ycy", "MAYDAY", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });

            // const imagePath = vscode.Uri.file(path.join(context.extensionPath, 'images', 'ycy0.png'))
            //     .with({ scheme: 'vscode-resource' });
            const name=Utility.getConfiguration().get<string>('nickName')
            const imgUrls=Utility.getConfiguration().get<(string)[]>('photos')
            const len=imgUrls&&imgUrls.length||0
            const index= Math.floor(Math.random()*(len))
            const imgUrl= imgUrls&&imgUrls[index]
            console.log(imgUrls,index)
            this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAYDAY</title>
</head>
<body>
    <div><h1>${name}~ 代码写久了，该休息啦~</h1></div>
    <div><img src="${imgUrl}"></div>
</body>
</html>`;

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }
}