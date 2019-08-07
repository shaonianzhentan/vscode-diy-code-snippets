const vscode = require('vscode');
const fs = require('fs');

function getData(document: any, position: any, flags: string = '') {
  return new Promise((resolve, reject) => {
    // 获取目录
    let dir = document.fileName.substr(0, document.fileName.indexOf('\\src\\')) + '\\src\\@types';
    if (fs.existsSync(dir)) {
      const line = document.lineAt(position);
      const lineText = line.text;
      // 鼠标移动查看
      if (flags === 'hover' && lineText.includes('api.service.')) {
        let m = lineText.match(/api\.service\.([a-zA-Z_]+)\(/);
        if (m && m.length >= 2) {
          const word = document.getText(document.getWordRangeAtPosition(position));
          if (m[1] === word) {
            let serviceName = `${dir}\\api.service.json`;
            if (fs.existsSync(serviceName)) {
              let result = JSON.parse(fs.readFileSync(serviceName, 'utf8'));
              let obj = result.find((ele: any) => ele.name === word);
              if (obj) {
                resolve(obj);
              }
            }
          }
        }
      } else {
        // 只截取到光标位置为止，防止一些特殊情况
        const sublineText = lineText.substring(0, position.character);
        let files = fs.readdirSync(dir);
        files.filter((ele: string) => ele.indexOf('.json') > 0).forEach((name: string) => {
          let reg = new RegExp(name.replace('.json', '.') + '$');
          if (reg.test(sublineText)) {
            let result = JSON.parse(fs.readFileSync(`${dir}\\${name}`, 'utf8'));
            resolve(result);
          }
        });
      }
    }
  });
}


module.exports = function (context: any) {

  /**
   * 只支持单文件夹！
   * @param {*} document 
   * @param {*} position 
   */
  async function provideCompletionItems(document: any, position: { character: number; line: number; }) {
    try {
      let result: any = await getData(document, position);
      if (result) {
        return result.map((ele: any) => {
          var completionItem = new vscode.CompletionItem(ele.name);
          completionItem.kind = vscode.CompletionItemKind[ele.type];
          completionItem.detail = ele.detail;
          if (ele.filterText) {
            completionItem.filterText = ele.filterText;
          }
          if (ele.insertText) {
            completionItem.insertText = new vscode.SnippetString(ele.insertText);
          }
          return completionItem;
        });
      }
    } catch (ex) {

    }
  }

  function resolveCompletionItem(item: any) {
    return item;
  }

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('vue', {
    provideCompletionItems,
    resolveCompletionItem
  }, '.')); // 触发建议的按键



  /**
   * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
   * 自动显示对应包的名称、版本号和许可协议
   * @param {*} document 
   * @param {*} position 
   * @param {*} token 
   */
  async function provideHover(document: any, position: { character: number; line: number; }) {
    try {
      let result: any = await getData(document, position, 'hover');
      if (result) {
        return new vscode.Hover(result.hover || result.detail);
      }
    } catch{

    }
  }

  // 注册鼠标悬停提示
  context.subscriptions.push(vscode.languages.registerHoverProvider('vue', {
    provideHover
  }));
};