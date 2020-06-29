# 自定义代码片段

## 使用说明

1. 在项目package.json里写入配置
```json
{
  "name": "开发配置package.json",
  "version": "0.1.0",
  "dev-config": {
    "@types": "node_modules/@zhululu/zhaopin/dev/@types"
  }
}
```

2. 在自定义目录中建立一个json文件（例如：this.api.json）

this.api.json文件内容
```
[
  {
    "name": "test",
    "type": "Method",
    "detail": "描述详情",
    "filterText": "_test",
    "insertText": "test().then(()=>{ \n //这里是一个测试方法 \n})",
    "hover": "鼠标移上去显示的内容（非必填）"
  },
  ...
]
```

this.api.json文件内容字段介绍
```
[
  {
    "name": "字段方法名称",
    "type": "类型【 Module、Method、Field、Class、Function】",
    "detail": "描述详情",
    "filterText": "根据输入字符过滤（非必填）",
    "insertText": "选择方法后插入的文本（非必填）",
    "hover": "鼠标移上去显示的内容（非必填）"
  },
  ...
]
```


当输入this.api的时候，会显示字段方法名称

this.api.字段方法名称

## 注意

目前只在.vue文件里有效

## 扩展设置

此扩展提供以下设置:

* `command`: 执行的命令（后面会带上当前编辑文件的绝对路径）【例如：node .../../dev/swagger.js 这里会自动带上编辑文件的完整路径】

## 已知问题

只有this.api.service里的方法才能鼠标移上去显示提示.


-----------------------------------------------------------------------------------------------------------
