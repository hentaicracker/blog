---
title: JavaScript Tips
date: 2017-03-17 11:14:39
tags:
    - JavaScript
---

总结一下在工作中经常遇到的一些js处理方法。

<!-- more -->

### 数组去重

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

### 多维数组扁平化

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

### 数组平均值&&中位数
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

### JS监听document是否加载完成
```javascript
if (document.readyState === 'complete') {
     // 页面已完全加载
}
```
使用document.readyState === 'interactive'监听DOM是否加载完成。

### 判断数据元素是否重复
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

### 生成随机数
```javascript
function randombetween(min, max) {
     return min + (Math.random() * (max - min + 1));
}
```

### javascript对象浅拷贝&深拷贝
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

### 判断变量是否为数组
```javascript
// es5方法 Array.prototype.isArray();

// 通用判断类型方法
function isArray(arr) {
     return Object.prototype.toString.call(arr) === '[object Array]';
     // [[NativeBrand]]内部属性的值一共有十几种.分别是:"Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String","JSON","Arguments". // es6: "Map","Set","Symbol"
}
```

### 生成随机数
```javascript
function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]';
}
function rank(arr) {
  if(!isArray(arr)) return;
  return arr.sort(() => 0.5 - Math.random());
}
rank([1,2,3,4,5]);
```