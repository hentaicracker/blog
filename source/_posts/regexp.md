---
title: 正则表达式 cheatsheet & 实例
date: 2017-07-17 15:53:57
tags:
    - JavaScript
---

`正则总结 & 速查`.

与其遇到复杂的正则表达式跑去直接搜结果还不如彻彻底底把正则表达式搞明白,搞透.要不然需求稍微一改就 GG 了.

<!-- more -->

### 匹配字符

#### 字符组
只匹配一个字符.

- #### [ - ]

范围表示法, 使用连字符 "-" 来省略和简写.

```javascript
[123456abcdefABCD] 可简写成 [1-6a-fA-D]
```

- #### [^ ]
排除字符组
```javascript
let re = /[^abc]/g;
let str = 'abc abbc abbbc abbbbc';
str.match(re); // [" ", " ", " "]
```

#### 元字符
元字符 | 描述
---|---|---
. | 匹配除换行符、回车符、行分隔符和段分隔符除外以外的任意字符, 等价于 [^\n\r\u2028\u2029]
\d | 匹配一位数字, 等价于 [0-9]
\D | 匹配一位除数字外的任意字符, 等价于 [^0-9]
\w | 匹配字母, 数字, 下划线, 等价于 [0-9a-zA-Z_]
\W | 匹配非(字母, 数字, 下划线)的字符, 等价于 [^0-9a-zA-Z_]
\s | 匹配空白符, 包括空格、水平制表符、垂直制表符、换行符、回车符、换页符, 等价于 [\t\v\n\r\f]
\S | 匹配非空白符, 等价于 [^\t\v\n\r\f]
[\d\D]、[\w\W]、[\s\S]、[^] | 匹配任意字符

#### 量词

- #### {m, n}
横向模糊匹配,表示连续出现最少 m 次,最多 n 次. 属于贪婪匹配, 尽可能多地匹配.

```javascript
let re = /ab{1,3}c/g;
let re1 = /ab{2,}c/g; // 表示至少出现 2 次
let re2 = /ab{2}c/g; // 等价于 {2, 2} , 表示出现 2 次
let str = 'abc abbc abbbc abbbbc';
str.match(re); // ["abc", "abbc", "abbbc"]
str.match(re1); // ["abc", "abbc", "abbbc"]
str.match(re2); // ["abbc"]
```

- #### ?
表示出现或者不出现, 等价于 `{0, 1}`, 惰性匹配.
```javascript
let re = /ab{2,3}?c/g;
let str = 'abc abbc abbbc abbbbc';
str.match(re); // ["ab", "ab", "bc", "ab", "bb", "ab", "bb", "bc"]
```

- #### +
表示至少出现一次, 等价于 `{1,}`.
```javascript
let re = /ab+/g;
let str = 'abc abbc abbbc abbbbc';
str.match(re); // ["ab", "abb", "abbb", "abbbb"]
```

- #### *
表示出现任意次, 有可能会不出现, 等价于 `{0,}`.
```javascript
let re = /ab*c/g;
let str = 'ac abc abbc abbbc abbbbc';
str.match(re); // ["ac", "abc", "abbc", "abbbc", "abbbbc"]
```

#### 多选分支
- #### | (管道符)
可以理解为"或", 具体形式为 (p1|p2|p3) , 表示其中任何之一. 也是惰性匹配, 即前面匹配上了后面就不匹配了.
```javascript
let re = /ab|abc/g;
let str = 'ac abc abbc abbbc abbbbc';
str.match(re); // ["ab", "ab", "ab", "ab"]
```

### 匹配位置

位置是相邻字符之间的位置. 可以理解成 '' 空字符, 如 java 等价于如下形式:
```javascript
'java' == '' + 'j' + '' + 'a' + '' + 'v' + '' + 'a'  + '';
```

- #### ^
匹配开头, 在多行匹配中匹配行开头.
```javascript
'JavaScript'.match(/^/g); // [""]
'JavaScript'.replace(/^/g, 'I love '); // "I love JavaScript"
```

- #### $
匹配结尾, 在多行匹配中匹配行结尾.
```javascript
'JavaScript'.match(/$/g); // [""]
'JavaScript'.replace(/$/g, ' is cool!'); // "JavaScript is cool!"
```

- #### \b 和 \B
`\b` 匹配单词边界, `\w` 和 `\W` 之间的位置, `\w` 和 `^` (开头位置)之间的位置, 以及 `\w` 和 `$` (结尾位置)之间的位置.
`\B` 匹配非 `\b` 的位置.

```javascript
'JavaScript(ES6) TypeScript2.1.4'.replace(/\b/g, '*'); 
// "*JavaScript*(*ES6*) *TypeScript2*.*1*.*4*"

'JavaScript(ES6) TypeScript2.1.4'.replace(/\B/g, '*')
// "J*a*v*a*S*c*r*i*p*t(E*S*6)* T*y*p*e*S*c*r*i*p*t*2.1.4"
```

- #### (?=p) 和 (?!p)
`(?=p)` 匹配 p 前面的位置.
`(?!p)` 匹配 p 后面的位置.

```javascript

'JavaScript'.replace(/(?=a)/g, '*');
// "J*av*aScript"
'JavaScript'.replace(/(?!a)/g, '*');
// "*Ja*va*S*c*r*i*p*t*"
```

### 括号分组