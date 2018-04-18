---
title: JavaScript Tips
date: 2017-03-17 11:14:39
tags:
    - JavaScript
---

总结一下在工作中经常遇到的一些js处理方法。

<!-- more -->

## 数组去重

```javascript
var deduped = [ 1, 1, 'a','a' ].filter(function (el, i, arr) {
     return arr.indexOf(el) === i;
});

console.log(deduped); // [ 1, 'a']
```

#### es6
```javascript
var deduped = [ 1, 1, 'a','a' ].filter( (el, i, arr) => arr.indexOf(el) ===i );
```
#### Objects
当元素为对象(Object)时，我们就不能用这种办法了， 因为对象存储的是引用而原始变量存储的是值。

```javascript
{ a: 1 } === { a: 1 } // false
```

```javascript
function dedup(arr) {
     var hashTable = {};
     return arr. filter(function(el) {
          var key = JSON.stringify(el);
          var match = Boolean(hashTable[key]);
          return (match ? false : hashTable[key] = true);
     });
}

var deduped = dedup([
        { a: 1 },
        { a: 1 },
        [ 1, 2 ],
        [ 1, 2 ]
]);

console.log(deduped); // [ {a: 1}, [1, 2] ]
```

## 多维数组扁平化

```javascript
var myArray = [[1, 2],[3, 4, 5], [6, 7, 8, 9]];
// 期望值[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### 使用concat()和apply()
```javascript
var newArray = [].concat.apply([], myArray);
```

#### 使用reduce()
```javascript
var newArray = myArray.reduce(function (prev, curr) {
     return prev.concat(curr);
};
```

#### for循环
```javascript
var newArray = [];
for (var i = 0; i < myArray.length; ++i) {
     for (var j = 0; j < myArray.length; ++j) {
          newArray.push(myArray[i][j]);
     }
}
```

#### ES6展开符
```javascript
var newArray = [].concat(...myArray);
```

#### 扁平多维数组

```javascript
function flattern(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? next : flattern(next)); 
  }, [])
}
```

## 数组平均值&&中位数

#### 平均值
```javascript
let values = [2, 56, 3, 41, 0, 4, 100, 23];
let sum = values.reduce((prev, curr) => curr += prev);
let avg = sum / values.length;
// avg = 28
```
#### 中位数
```javascript
let values = [2, 56, 3, 41, 0, 4, 100, 23];
values.sort((a, b) => a - b);
let lowMiddle = Math.floor((values.length - 1) / 2);
let highMiddle = Math.ceil((values.length - 1) / 2);
let median = (values[lowMiddle] + values[highMiddle]) / 2;
// median = 13.5
```
如果是对象的话，JavaScript将引用按值传递。

## JS监听document是否加载完成
```javascript
if (document.readyState === 'complete') {
     // 页面已完全加载
}
```
使用document.readyState === 'interactive'监听DOM是否加载完成。

## 判断数据元素是否重复
```javascript
var isRepeat = function(arr){
     var hash = {};
     for(var i in arr) {
          if(hash[arr[i]]) return true;
          hash[arr[i]] = true;
     }
     return false;
}
```

## 生成随机数
```javascript
function randombetween(min, max) {
     return min + (Math.random() * (max - min + 1));
}
```

## javascript对象浅拷贝&深拷贝
```javascript
;(function(){
    var obj = { a: 1, b: { c: 2} };
    var copy = Object.assign({}, obj);  // 拷贝源对象自身的并且可枚举的属性
    console.log(copy);      // { a: 1, b: { c: 2} }
    var deepCopy = JSON.parse(JSON.stringify(obj));
    copy.a = 2;
    copy.b.c = 3;
    console.log(obj);       // { a: 1, b: { c: 3} }
    console.log(copy);      // { a: 2, b: { c: 3} }
    console.log(deepCopy);  // { a: 1, b: { c: 2} }
    deepCopy.a = 4;
    deepCopy.b.c = 5;
    console.log(obj);       // { a: 1, b: { c: 3} }
    console.log(copy);      // { a: 2, b: { c: 3} }
    console.log(deepCopy);  // { a: 4, b: { c: 5} }
}());
```

```javascript
function deepCopy(obj) {
  if(typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for(let k in obj) {
    if(obj.hasOwnProperty(k)) {
      newObj[k] = typeof obj[k] === 'object' ? deepCopy(obj[k]) : obj[k];
    }
  }
}
```

## 判断变量是否为数组
```javascript
// es5方法 Array.prototype.isArray();

// 通用判断类型方法
function isArray(arr) {
     return Object.prototype.toString.call(arr) === '[object Array]';
     // [[NativeBrand]]内部属性的值一共有十几种.分别是:"Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String","JSON","Arguments". // es6: "Map","Set","Symbol"
}
```

## 打乱数租

#### 方法一
```javascript
function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]';
}
/**
 * sort方法在 arr.length < 10 的情况下是采用插入排序，超过10的情况下使用快速排序和插入排序的混合排序。所以并不是真正所有概率相同的乱序。
 */
function shuffle(arr) {
  if(!isArray(arr)) return;
  return arr.sort(() => 0.5 - Math.random());
}
shuffle([1,2,3,4,5]);
```

#### 方法二

```javascript
function shuffle(arr) {
  for(let i = arr.length;i;i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}
```

## 判断 NaN 和 NaN 为相等
```javascript
function eq(a, b) {
  if(a !== a) return b !== b;
}
eq(NaN, NaN); // true
```

## 判断 0 和 -0 不等
```javascript
0 === -0; // true

function eq(a, b) {
  if(a === b) return a !== 0 || 1 / a === 1 / b;
  return false;
}
eq(0, 0); // true
eq(0, -0); // false
```

## 防抖

```javascript
/**
 * 持续触发事件，在事件触发 delay ms 后才执行，如果在一个事件触发的 delay ms 内又触发了这个事件，那就以新的事件的时间为准， delay ms 后才执行。
 * @param fun 要执行的函数
 * @param delay 延迟时间
 */
function debounce(fun, delay) {
  var timeout, context, args;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fun.apply(context, args);
    }, delay);
  }
}
```

## 节流

```javascript
/**
 * 持续触发事件，每隔一段时间，只执行一次事件。
 * @param fun 要执行的函数
 * @param delay 延迟时间
 * @param time 在 time 时间内必须执行一次
 */
function throttle(fun, delay, time) {
  var context, args;
  var timeout;
  var previous = +new Date();
  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    clearTimeout(timeout);
    if(now - previous >= time) {
      fun.apply(context, args);
      previous = now;
    } else {
      timeout = setTimeout(fun, delay);
    }
  }
}
```

## polyfill


#### call

```javascript
Function.prototype.call2 = (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
}
```

#### apply

```javascript
Function.prototype.apply2 = (context, arr) {
  var context = context || window;
  context.fn = this;
  var result;
  if(!arr) {
    result = context.fn();
  } else {
    var args = [];
    for(var i = 1, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
}
```

#### bind

```javascript
Function.prototype.bind2 = (context) {
  if(typeof this !== 'function') {
    throw new Error('what is trying to be bound is not callable');
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```

#### new

```javascript
function new2() {
  var obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}
```

#### Object.create()
```javascript
function create(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}
```
