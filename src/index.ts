import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema 
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// MCPサーバーをインスタンス化
const server = new Server(
  {
    name: "hello-world",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// ツールのリストを提供するハンドラーを登録
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: "hello",
      description: "挨拶を返すシンプルなツール",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" }
        },
        required: ["name"]
      }
    }]
  };
});

// ツールを呼び出すハンドラーを登録
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "hello") {
    const name = request.params.arguments?.name || "World";
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}!`
        }
      ]
    };
  }
  
  throw new Error("Unknown tool");
});

// サーバーを起動
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("Hello World MCP Server started");