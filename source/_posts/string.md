---
title: String 踩坑
date: 2017-07-10 10:30:15
tags:
    - JavaScript
---

整理 String 实例方法以及一些需要注意的点.

<!-- more -->

### ES5

- #### toString(): string;

String 对象覆盖了 Object 对象的 toString 方法,该方法返回该对象的字符串形式,和 String.prototype.valueOf() 方法返回值一样.

```javascript
var str = new String('something');
str.toString(); // 'something'
```

- #### charAt(pos: number): string;

charAt 方法返回一个字符串中指定的字符.

```javascript
var str = new String('something');
str.charAt(0); // 's'
```

- #### charCodeAt(index: number): number;

charCodeAt 方法返回给定索引处字符的 UTF-16 代码单元值的数字；如果索引超出范围,则返回 NaN.

```javascript
var str = new String('something');
str.charCodeAt(0); // 115, 's'的 unicode 值.
str.charCodeAt(9); // NaN
```

- #### concat(...strings: string[]): string;

concat 方法将一个或多个字符串与原字符串连接合并，并返回一个新的字符串。concat 方法并不影响原字符串。

```javascript
var str = new String('something');
str.concat(' is', ' wrong'); // 'something is wrong'.
str; // 'something'
```
尽量使用 + 赋值操作符代替 concat 方法以提高性能.

- #### indexOf(searchString: string, position?: number): number;

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
- #### lastIndexOf(searchString: string, position?: number): number;

lastIndexOf 方法返回调用 String 对象中最后一次出现的指定值的索引，从 position 开始**从右向左**进行搜索。行为和 indexOf 方法一致.

- #### localeCompare(that: string): number;

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

- #### match(regexp: string | RegExp): RegExpMatchArray | null;

match 方法检索匹配 regexp 的项,如果 regexp 是一个非正则表达式对象,则会隐式地使用 new RegExp(regexp) 将其转换为一个 RegExp .如果没有匹配项,返回 null .

```javascript
var str = new String('hello world');
str.match(/o/); // ["o", index: 4, input: "hello world"], 没有 g 标志,返回和 RegExp.exec() 相同的结果
str.match('o'); // ["o", index: 4, input: "hello world"]
str.match(/o/g); // ["o", "o"], 有 g 标志,返回一个 Array.
str.match(/oo/); // null
str.match(); // [""]
```

- #### replace(searchValue: string | RegExp, replaceValue: string): string;
- #### replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

replace 方法返回一个由 replaceValue 替换匹配 searchValue 的一些值后的新字符串.

```javascript
var str = new String('Hello World');
str.replace(/world/i, 'Chen'); // 'Hello Chen', i标志,不区分大小写
str; // 'Hello World'
str.replace(); // 'Hello World'
str.replace(/world/,'$$'); // "hello $", $$,特殊变量,插入一个'$'.
str.replace(/world/,'$&'); // "hello world", $&,特殊变量,插入匹配的子串
str.replace(/world/,'$`'); // "hello hello ", $`,特殊变量,插入当前匹配的子串左边的内容
str.replace(/world/,"$'"); // "hello ", $',特殊变量,插入当前匹配的子串右边的内容
str.replace(/(\w+)\s(\w+)/,"$2 $1"); // "world hello", $n,特殊变量,假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串
```

replace 方法还可以指定一个函数作为第二个参数.当匹配执行后,该函数就会执行.(特殊变量不能在函数里使用),如果第一个参数是正则表达式,且为全局匹配(g)模式,那这个方法将多次被调用,每次匹配都会被调用.

```javascript
var str = new String('hello world');
str.replace(/(l)(o)/, function(match, p1,p2,offset,string){
	console.log(match); // 'lo', 匹配项
	console.log(p1); // 'l',正则表达式第一个括号匹配的内容
	console.log(p2); // 'o',正则表达式第二个括号匹配的内容
	console.log(offset); // 3,匹配项在原字符串的偏移量
	console.log(string); // 'hello world',原字符串
}); // 'helundefined world', 函数没有返回值,所以返回 undefined 插入到匹配项.

str.replace(/(l)(o)/, function(match, p1,p2){
	return [p1, p2].join('-');
}); // "hell-o world"

var count = 0;
str.replace(/(lo)|(ld)/g, function(match, p1, p2) {
    console.log(match); 
	if(p1) console.log(p1); 
	if(p2) console.log(p2);
    count++;
    return `${count}`;
}); 
// "lo", match
// "lo", p1
// "ld", match
// "ld", p2
// "hel1 wor2", 全局匹配, replacer 被调用了两次.
```

- #### split(separator: string | RegExp, limit?: number): string[];

split 方法将一个String对象分割成字符串数组，将字符串分成子串.

```javascript
var str = new String('hello world');
str.split(); // ["hello world"]
str.split(''); // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
str.split('', 5); // ["h", "e", "l", "l", "o"]
str.split(' '); // ["hello", "world"]
str.split('l'); // ["he", "", "o wor", "d"], 如果满足分割规则的两个部分紧邻着（即中间没有其他字符），则返回数组之中会有一个空字符串.
str.split(/o/); // ["hell", " w", "rld"]
str.split(/(o)/); // ["hell", "o", " w", "o", "rld"], 存在捕获括号时,匹配结果会包含在返回的数组中.
str; // 'hello world'
```

- #### slice(start?: number, end?: number): string;

slice 方法从一个字符串中**从左向右**提取字符串并返回新的字符串,不会改变原字符串.

```javascript
var str = new String('hello world');
str.slice(); // "hello world"
str.slice(1); // "ello world"
str.slice(-1); // "d"
str.slice(1,4); // "ell"
str.slice(1,-4); // "ello w", 从第二个字符到倒数第五个
str.slice(-6,-4); // " w", 从倒数第七个字符开始到倒数第五个
str.slice(-1,4); // ""
str; // "hello world"
str.slice('a'); // "hello world", start 会强制转换为数字, 这里等同于 str.slice(NaN)
str.slice('5'); // " world"
```

- #### substring(start: number, end?: number): string;

substring 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集.类似 slice 方法,略有不同.

```javascript
var str = new String('hello world');
str.substring(); // "hello world"
str.substring(1); // "ello world"
str.substring(1, 1); // "", 如果 start 等于 end, 返回一个空字符串
str.substring(-1); // "hello world"
str.substring(1,4); // "ell"
str.substring(4,1); // "ell", == str.substring(1, 4)
str.substring(-1, -4); // "", 如果任一参数小于 0 或为 NaN，则被当作 0
str; // "hello world"
```

- #### substr(from: number, length?: number): string;

substr 方法和 slice 方法类似,区别是 substr 第二个参数是指截取的长度.此方法不兼容上古 IE .

```javascript
var str = new String('hello world');
str.substr(); // "hello world"
str.substr(1); // "ello world"
str.substr(1, 1); // "e"
str.substr(0, 6); // "hello "
str.substr(-1, 1); // "d", 从倒数第一个开始,截取长度为1的字符串返回
str.substr(-20, 1); // "h", 如果 from 为负值且 abs(from) 大于字符串的长度，则 substr 使用 0 作为开始提取的索引
str.substr(-20, -1); // "", length 为 0 或 -1 则返回一个空字符串.
str; // "hello world"
```

- #### toLowerCase(): string;
- #### toUpperCase(): string;

toLowerCase 方法转小写, toUpperCase 转大写.

- #### trim(): string;

trim 方法删除一个字符串的两端空白符,返回一个新的字符串,不会影响原字符串.

### ES6

- #### includes(searchString: string, position?: number): boolean;

includes 方法判断 searchString 是否存在于原字符串中.区分大小写.

```javascript
var str = new String('hello world');
str.includes('Hello'); // false, 区分大小写
str.includes('he')；// true
str.includes('he', 1); // false, 从第二个位置开始找
```

- #### startsWith(searchString: string, position?: number): boolean;

startsWith 方法判断 searchString 是否是给定字符串为开头的.

```javascript
var str = new String('hello world');
str.startsWith('Hello'); // false, 区分大小写
str.startsWith('hello')；// true
str.startsWith('world', 6); // true
```

- #### repeat(count: number): string;

repeat 方法返回一个被连接在一起的指定数量(count)的字符串的副本.

```javascript
var str = new String('hello world');
str.repeat(0); // false, 区分大小写
str.repeat(2); // "hello worldhello world"
str.repeat(-1); // RangeError: Invalid count value, count 不能为负数,且必须小于 Infinity,且长度不会大于最长的字符串
str.repeat(3.6); // "hello worldhello worldhello world", count 自动转换成整数
```

参考资料:
 - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
 - [TypeScript Github](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)