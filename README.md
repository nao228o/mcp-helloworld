# MCP Hello World

Model Context Protocol (MCP) のHello Worldサンプル実装です。

## 機能

- `hello`ツール：指定された名前に対して挨拶を返します

## 使用方法

```bash
# インストール
npm install

# 実行
npm start
```

## ツール仕様

### hello

入力：
```json
{
  "name": "string"
}
```

出力：
```json
{
  "content": [
    {
      "type": "text",
      "text": "Hello, {name}!"
    }
  ]
}
```