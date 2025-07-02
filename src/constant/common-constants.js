// 适配器 适配器 api 参数说明
export const ADAPTOR_API_STRUCT = `{
  url: string; // 当前接口地址
  method: 'get' | 'post' | 'put' | 'delete';
  data?: Object; // 请求体
  headers?: Object; // 请求头
  ...
}`;

// 适配器 response 参数说明
export const ADAPTOR_RESPONSE_STRUCT = `{
  data: Object; // 接口返回数据,
  request: XMLHttpRequest;
  headers?: Object; // 请求头
  status: number; // 状态码 200, 404, 500..
  statusText: string; // 状态信息
  ...
}`;

// 接收适配器 示例代码
export const ADAPTOR_DEFAULT_CODE = `// API响应或自定义处理后需要符合以下格式
return {
    status: 0, // 0 表示请求成功，否则按错误处理
    msg: '请求成功',
    data: {
        text: 'world',
        items: [
            {label: '张三', value: 1}
        ]
    }
}`;
