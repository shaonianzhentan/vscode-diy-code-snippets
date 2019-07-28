# 自定义代码片段



## 使用说明

在项目src里建立一个@type文件夹

然后建立一个json文件（例如：this.api.json）

this.api.json文件内容
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

暂时还没有设置项

例如:

此扩展提供以下设置:

* `diy-code-snippets.dir`: 设置读取配置文件夹名

## 已知问题

只有this.api.service里的方法才能鼠标移上去显示提示.

## 发行说明

### 0.0.1

1.自定义提示信息


-----------------------------------------------------------------------------------------------------------
