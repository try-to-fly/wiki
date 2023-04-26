---
title: Next.js
---

### 用法

1. 初始化

```bash
npm i -g @nestjs/cli
nest new project-name
```

2. 新增 API:/ai

```bash
nest generate module ai
nest generate controller ai
```

3. Post、Get 方法

```typescript
import { Controller, Get, Post } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Get()
  catsGet(): string {
    return "This action returns all cats";
  }

  @Post()
  catsPost(): string {
    return "This action returns all cats";
  }
}
```

### 注意

1. nestjs 好像不支持 esmodule，使用 got、delay 的时候需要安装低版本的 commonjs 版本才可以生效
   - 解决方法: https://github.com/nestjs/nest/issues/11046#issuecomment-1416983059

### 文章

- [为什么说 Nest.js 提供了 Express 没有的架构能力？](https://mp.weixin.qq.com/s/JOxWt9gtYnNcGzsvjsf0Vw)
- [精读 《Nestjs 文档》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/20.%E7%B2%BE%E8%AF%BB%E3%80%8ANestjs%E3%80%8B%E6%96%87%E6%A1%A3.md)
