# mars-flexible [![NPM version][npm-image]][npm-url]

移动端自适应库，执行这个 js 后，会在 html（也就是document.documentElement）上增加一个 data-dpr 属性，以及 font-size 样式。之后页面中的元素，都可以用 rem 单位来设置。html 上的 font-size 就是 rem 的基准像素。

该库主要做了两件事

- 给<html>元素添加 `font-size` 属性，并且动态改写 `font-size` 的值
- 给<html>元素添加 `data-dpr` 属性，并且动态改写 `data-dpr` 的值
- 对支持0.5px border 的添加 `hairlines` 类名

建议将该库直接做内联处理

## Install

```bash
$ npm install mars-flexible --save
```

## Usage
```
import 'mars-flexible';
```

## 参考
- [淘宝移动端适配方案](https://github.com/amfe/article/issues/17)

[npm-image]: https://badge.fury.io/js/generator-vapp.svg
[npm-url]: https://npmjs.org/package/mars-flexible

