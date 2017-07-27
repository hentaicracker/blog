---
title: 正则表达式 cheatsheet & 实例
date: 2017-07-17 15:53:57
tags:
    - JavaScript
---

正则总结 & 速查.

与其遇到复杂的正则表达式跑去直接搜结果还不如彻彻底底把正则表达式搞明白,搞透.要不然需求稍微一改就 GG 了.

<!-- more -->

### 匹配字符

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