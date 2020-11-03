# 简易版轮播组件
## 背景
实现一个很简单的自动轮播的效果

思考： 传统的 `swiper` 太重了，里面封装了很多我们不需要的功能，一个简单的功能没必要那么中的文件。那就自己实现吧

实现方式有千千万万，那么如何才用最少的代码最优雅的实现呢？是否可以推翻传统的实现，使用 `css` 的某些特效实现呢？

肯定可以的呀，我觉得我这个方式就是最好的实现方法，没有比这个更好的实现了。我有[css大佬坐镇指点](https://www.zhangxinxu.com/)，你们没有。哈哈

## 怎么使用

1. 本地下载 `js/css` 使用引入使用

```
<script src="./snap-swiper.js"></script>
<script>
  var imageList = []
  SnapSwiper(imageList, '.snap-swiper-index')
</script>
```

[本地下载js使用Demo](https://yux.yuewen.com/jsbin/qaf/edit?html,css,js,output)

2. 可以 `npm` 安装使用

`npm i snap-swiper`

```
import "snap-swiper/snap-swiper.css";
const snapSwiper = require("snap-swiper");
const imageList = [];
snapSwiper(imageList, ".snap-swiper-index");
```

[npm 下载使用demo](https://codesandbox.io/s/gifted-ives-zco4l?file=/index.html)

## 实现思路

1. 使用 `css` 自带的滚动相关的属性，实现左右滚动的时候回弹，平稳滚动的效果

2. `js` 模拟手动滚动的效果 

3. 代码实现 `ele.scrollLeft = scrollLeft;` // 核心代码

## 有哪些优点

1. 全部原生 `js` 实现，简单轻量，没有框架限制

2. 图片有懒加载 => [浏览器IMG图片原生懒加载loading=”lazy”实践指南](https://www.zhangxinxu.com/wordpress/2019/09/native-img-loading-lazy/)

3. 有图片失败的异常处理 => [图片加载失败后CSS样式处理最佳实践](https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/)

4. 不支持 `scroll-behavior` 有兼容处理

5. 可以 `npm` 安装使用

## 用哪些 `css` 属性实现

[scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior): 让页面平滑的滚动，滚动效果又湿又滑，用户体验会很不错

[scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type): 滚动到了一个临界点，是回到最初的原点还是滚到终点

[scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align): 上面那个属性的临界点是在具体的哪一个点？

[caniuse](https://caniuse.com/):可以查看这些属性的兼容性

如果有某一个属性不兼容怎么办？自己 `js` 打补丁呗 比如组件里面实现的：`scroll-behavior`

讲真这些 `css` 属性我还是首次知道并使用，真香，脱离网上的哪些定位实现方式，用了 `css`，整体代码清晰易懂

## 遇到哪些问题

除了最后一张图片，每一张图片到右边有个 `padding` 的值，这个是避免两张相邻的图片挨在一起。在计算滚动距离的时候要考虑这个情况左右两边的距离，否则就会出现滚动卡住的情况

`npm` 发包的时候遇到了包引用的问题，询问之后才知道：一般自己写前端代码的时候都是 `es module` 的，然后打包成 `CMD` 发布到 `npm` 上。`npm` 全称是 `node_modules` 是给 `node.js` 使用的，所以要遵守 `node` 的规范。最好的导出方式就是使用 `module.exports = xxx `

## 实现之后

简单的事情也可以变得很有意义，功能虽然简单，但是里面涉及很多很基础的概念。对于准备从学前端的同学而言这是一个很好的选择。既可以学着怎么涉及一个组件，学一下基础知识，又能顺便学一下 `npm`

简单的事做到了极致会变得特别有意义了。`css` 一行代码就能极大效率的解决很多 `js` 的问题，那为啥不试试用 `css` 解决呢










