---
title: Promise
---

# [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

1. [有了 async/await, 我们和 Promise 还能像从前一样两小无猜吗?](https://zhuanlan.zhihu.com/p/22938062?utm_source=pocket_saves)
2. [利用 generator 解决回调地狱](https://zhuanlan.zhihu.com/p/22319621?utm_source=pocket_saves)
3. [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559?utm_source=pocket_saves)
4. [yield 原理篇](https://www.html-js.com/article/Understanding-the-Yield-principle?utm_source=pocket_saves)

### 常见错误

1. 在 class 的 constructor 中使用 await

```js
class A {
	constructor() {
		await get()
		return 123
	}
}
// 错误用法
const b = await new A();
```
