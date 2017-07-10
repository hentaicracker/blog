---
title: String 踩坑
date: 2017-07-10 10:30:15
tags:
    - JavaScript
---

整理 String 实例方法以及一些需要注意的点.

<!-- more -->

### ES5

#### toString(): string;

String 对象覆盖了 Object 对象的 toString 方法,该方法返回该对象的字符串形式,和 String.prototype.valueOf() 方法返回值一样.

```javascript
var str = new String('something');
str.toString(); // 'something'
```

#### charAt(pos: number): string;

charAt 方法返回一个字符串中指定的字符.

```javascript
var str = new String('something');
str.charAt(0); // 's'
```

#### charCodeAt(index: number): number;

charCodeAt 方法返回给定索引处字符的 UTF-16 代码单元值的数字；如果索引超出范围,则返回 NaN.

```javascript
var str = new String('something');
str.charCodeAt(0); // 115, 's'的 unicode 值.
str.charCodeAt(9); // NaN
```

#### concat(...strings: string[]): string;

concat 方法将一个或多个字符串与原字符串连接合并，并返回一个新的字符串。concat 方法并不影响原字符串。

```javascript
var str = new String('something');
str.concat(' is', ' wrong'); // 'something is wrong'.
str; // 'something'
```
尽量使用 + 赋值操作符代替 concat 方法以提高性能.

#### indexOf(searchString: string, position?: number): number;

indexOf 方法返回调用 String 对象中第一次出现的指定值的索引，从 position 开始**从左向右**进行搜索。

如果未找到该值，则返回-1。

```javascript
var str = new String('something');
str.indexOf('some'); // 0
str.indexOf('Some'); // -1, 区分大小写
str.indexOf('me', 0); // 2
str.indexOf('me', 5); // -1
str.indexOf('me', -1); // 2, 如果 position < 0 则查找整个字符串（如同传进了 0）
str.indexOf('', 8); // 8
str.indexOf('', 9); // 9, 如果 position >= str.length,且被查找的字符串是一个空字符串，此时返回 str.length
str.indexOf('', 10); // 9
```
#### lastIndexOf(searchString: string, position?: number): number;

lastIndexOf 方法返回调用 String 对象中最后一次出现的指定值的索引，从 position 开始**从右向左**进行搜索。行为和 indexOf 方法一致.

#### localeCompare(that: string): number;

localeCompare 方法返回一个数字表示是否 引用字符串 在排序中位于 比较字符串 的前面，后面，或者二者相同。

- 当 引用字符串 在 比较字符串 前面时返回 -1

- 当 引用字符串 在 比较字符串 后面时返回 1

- 相同位置时返回 0

```javascript
var str = new String('something');
str.localeCompare('a'); // 2 or 1, 不同浏览器可能返回不同的值.
str.localeCompare('yes'); // -2 or -1
str.localeCompare('something'); // 0
```

#### match(regexp: string | RegExp): RegExpMatchArray | null;

match 方法

