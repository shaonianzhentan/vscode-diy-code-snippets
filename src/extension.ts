
import * as vscode from 'vscode';
const fs = require('fs');
const path = require('path');
const tips = require('./tips');

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "diy-code-snippets" is now active!');

	tips(context);

	let disposable = vscode.commands.registerTextEditorCommand('extension.exec', (textEditor, edit) => {
		// 获取当前文件路径
		const textURI = textEditor.document.uri.fsPath;
		const workspaceConfig = vscode.workspace.getConfiguration();
		let command = workspaceConfig.get('command');
		// 如果执行文件配置了，则进行处理
		if (command) {
			// 绝对定位
			// let execFilePath = args[1];
			// if (path.isAbsolute(execFilePath) === false) {
			// 	if (String(execFilePath).indexOf('..') === 0) {
			// 		execFilePath = '../' + execFilePath;
			// 	}
			// 	execFilePath = path.resolve(textURI, execFilePath);
			// }
			// console.log(textURI);
			// console.log(execFilePath);
			// console.log('您正在执行编辑器命令！');
			// console.log(command);
			let cmdText = `${command} ${textURI}`;
			let terminal = vscode.window.createTerminal({ name: "自定义代码片段" });
			terminal.show(true);
			terminal.sendText(cmdText);
			terminal.sendText('echo 10秒后关闭窗口');
			terminal.sendText('ping localhost -n 10 > nul');
			terminal.sendText('exit');
			vscode.window.showInformationMessage('【自定义代码片段】执行命令成功！');
		}
		//console.log(textEditor, edit);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
