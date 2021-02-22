---
title: 面向前端工程师的 Python 快速入门（30min）
date: 2020-01-23 10:13:12
tags:
    - Python
---

> Python is an easy to learn, powerful programming language. (Python 是一门非常简单且强大的编程语言) —— The Python Tutorial

这是一份面向前端工程师的一份 `Python(3)` 快速入门介绍，帮助你快速开始 `Python` 开发。

`Python` 是一门非常实用并且简单的编程语言，它也是目前最流行的编程语言之一。`Python` 由于拥有大量的开源库，可用于载入数据、数据可视化、统计、图像处理和自然语言处理等，所以它既可以用来编写 web 程序，也成为了数据科学、机器学习常用的语言，可以说是一门性价比极高的语言。据说目前已经有地区的中小学开始将 `Python` 作为编程学习的首要语言。

## 1 快速开始

### 1.1 如何安装

1. `Mac OS` 用户可以直接使用 `Homebrew` 安装：

```shell
$ brew install python3
$ brew link python3
```

2. `GNU/Linux` 用户使用系统内置包管理器，如 Ubuntu/Debian：

```shell
$ sudo apt-get update
$ sudo apt-get install python3
```

3. `Windows` 用户推荐使用 `PowerShell` 下的 `choco` 安装：

```shell
$ choco install -y python3
```

4. 通过机器学习套件 Anaconda 安装，下载地址在[这里](https://www.anaconda.com/products/individual)。

### 1.2 查看 Python 版本

```shell
$ python -V
Python 3.8.5
```

### 1.3 使用 Python

可以通过以下命令进入 `Python REPL` 环境体验基础特性：

```shell
$ python
Python 3.8.5 (default, Sep  4 2020, 02:22:02)
[Clang 10.0.0 ] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

输入 `exit()` 即可退出 `REPL` 环境。

此外，Python 可以直接执行以 `xxx.py` 结尾的文件：

```shell
$ python main.py
```

## 2 基本数据类型

### 2.1 基本数据类型

```Python
# Number （单行注释）

1 + 1       # 2
1 - 1       # 0
1 * 1       # 1
4 / 2       # 2.0
9 // 2      # 4 （除法并取整）
9.0 // 2.0  # 4.0 （除法并取整，浮点数同样有效）
7 % 3       # 1  (取余)
2 ** 3      # 8 （2 的 3 次方）

# Boolean

True       # True
False      # False
not True   # False
not False  # True

True and False # False
True or False  # True

True + True  # 2
True + False # 1

0 == False # True
1 == True  # True
2 == True  # False

bool(-6)  # True
bool(0)   # False
bool("")  # False
bool([])  # False
bool({})  # False
bool(())  # False

# String

"string" # 'string'
'string' # 'string'

"Hello " + "world!"  # 'Hello world!'
"Hello " "world!"    # 'Hello world!'
"Hello world!"[0]    # 'H'
len("string")        # 6 （字符串长度）

name = "o2"   # 变量
f"{name} lab" # o2 lab （这里类似 ES6 里的模板字符串）

# None 

None # None
"etc" is None  # False
None is None   # True

```

### 2.2 List (列表)

`List` (列表) 是 `Python` 内置的一种数据类型。它是一种有序的集合，可以随时添加和删除其中的元素。它类似于 `JavaScript` 里的基础数据类型**数组**。

```Python
name = ['aotu', 'lab', 'hello', 'kitty']

# 通过索引来访问列表中的数据
print(name[1]) # lab

# 截取数据
print(name[0:2]) # ['aotu', 'lab']

# 通过索引更新数据
name[1] = 'newbee'
print(name) # ['aotu', 'newbee', 'hello', 'kitty']

# 使用 append() 来添加列表项
name.append('world')
print(name) # ['aotu', 'newbee', 'hello', 'kitty', 'world']

# 使用 del 语句删除列表内的元素
del name[2]
print(name) # ['aotu', 'newbee', 'kitty', 'world']

```

`List` 方法：

|函数&方法|描述|
|----|----|
|len(list)|列表元素个数|
|max(list)|返回列表元素最大值|
|min(list)|返回列表元素最小值|
|list(seq)|将元组转换为列表|
|list.append(obj)|在列表末尾添加新的对象|
|list.count(obj)|统计某个元素在列表中出现的次数|
|list.extend(seq)|在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）|
|list.index(obj)|从列表中找出某个值第一个匹配项的索引位置|
|list.insert(index, obj)|将对象插入列表|
|list.pop(obj=list[-1])|移除列表中的一个元素（默认最后一个元素），并且返回该元素的值|
|list.remove(obj)|移除列表中的一个元素（参数是列表中元素），并且不返回任何值|
|list.reverse()|反向列表中元素|
|list.sort([func])|对原列表进行排序|

### 2.3 Tuple (元祖)

Tuple 和 List 非常相似，但 Tuple 一旦初始化就不能修改。它是不可变的（指的是元祖里的元素的值或引用，引用可能指向某个 List，该引用的值是可变的）。它和 TypeScript 里的 Tuple 相似，区别在于 TypeScript 里的元祖的值类型一般为 String 或 Number。

```Python
# 创建元祖
tuple1 = (1, 2, 3)

# 创建空元祖
tuple2 = ()

# 元祖只有一个元素时，需在后面添加逗号，否则会创建一个值为 1 的变量
tuple3 = (1,)

# 访问元祖的元素
print(tuple1[0]) # 1

# 元祖内的元素不能删除，但可以删除整个元祖
del tuple2
```

|方法|描述|
|----|----|
|len(tuple)|元祖元素个数|
|max(tuple)|返回元祖元素最大值|
|min(tuple)|返回元祖元素最小值|
|tuple(seq)|将列表转换为元祖|


### 2.4 Dict（字典）

Dict（字典）类似于 JavaScript 里的 object 。

```Python
empty_dict = {}
filled_dict = {"one": 1, "two": 2, "three": 3}
```

方法有些细微的差别：

|方法和函数|描述|
|----|----|
|len(dict)|计算字典元素个数|
|str(dict)|输出字典可打印的字符串表示|
|type(variable)|返回输入的变量类型，如果变量是字典就返回字典类型|
|dict.clear()|删除字典内所有元素|
|dict.copy()|返回一个字典的浅拷贝|
|dict.values()|以列表返回字典中的所有值|
|popitem()|随机返回并删除字典中的一对键和值|
|dict.items()	|以列表返回可遍历的(键, 值)元组数组|

### 2.5 Set

和其他语言类似，Set 是一个无序不重复的元素集合。

```Python
# 创建 set
set1 = set([1, 2, 3])
set2 = set([2, 3, 4, 5])

# 交集
set3 = set1 & set2 # {2, 3}

# 并集
set4 = set1 | set2 # {1, 2, 3, 4, 5}

# 差集
set5 = set1 - set2 # {1}

2 in set2 # True
```

|方法|描述|
|----|----|
|set.add(key)|添加元素到 set 中|
|set.remove(key)|从 set 中删除元素，如果元素不存在则会引发 KeyError|
|set.discard(key)|如果元素存在集合中则将其删除|
|set.pop()|从集合中移除并返回任意一个元素，如果集合为空则会引发 KeyError|
|set.clear()|从集合中移除所有元素|
|set.copy()|返回一个 set 的浅拷贝|

## 3 条件语句与循环语句

### 3.1 条件语句

Python 中，if 语句基本形式如下：

```Python
if 判断条件:
    执行语句
else:
    执行语句
```

```Python
if 判断条件1:
    执行语句
elif 判断条件2:
    执行语句
elif 判断条件3:
    执行语句
else:
    执行语句
```

> 其中，冒号 `:` 后下一行内容一定要缩进，不缩进则会报错。冒号和缩进是一种语法，它会帮助 Python 区分代码之间的层次，理解条件执行的逻辑及先后顺序。

例：

```Python
some_var = 5

if some_var > 5:
    print("some_var 大于 5")
elif < 5:
    print("some_var 小于 5")
else:
    print("some_var 等于 5")
```

### 3.2 循环语句

循环语句有两种，一种是 `for ... in ...` 的形式：

```Python
for 元素 in 范围:
    执行语句
```
例：

```Python
# 遍历数字
# range(x) 函数，可以生成一个从 0 到 x-1 的整数序列
# range(a, b) 函数，可以生成一个从 a 到 b-1 的左闭右开整数序列
# range(a, b, g) 函数，可以生成一个从 a 到 b-1 的左闭右开整数序列，每次间隔为 g，例：range(0, 10, 2)，意为从 0 到 10（不取10），每次间隔为 2
for i in range(3):
    print(i)

""" （多行注释）
0
1
2
"""

# 遍历字典
dict = {"a": "A", "b": "B", "c": "C"}
for i in dict:
    print(i)
  
""" 
a
b
c
"""

# 遍历元祖
for i in (3, 4):
    print(i)
  
""" 
3
4
"""

# 遍历列表
for i, value in enumerate(["hello", "world"]):
    print(i, value)
  
""" 
0 hello
1 world
"""

```

`while` 语句：

```Python
x = 0

while x < 4:
    print(x)
    x += 1

""" 
0 
1 
2
3
"""
```

## 3 函数

函数的概念不多做解释，下面是 Python 的函数写法：

```Python
def 函数名(参数1, 参数2...参数n):
    函数体
    return 语句
```

例：

```Python
# 参数可以设置默认值
def sum(x, y = 1):
    s = x + y
    return s

sum(2)    # 3
sum(2, 3) # 5


# 使用 *args 表示不定长参数，类似 JavaScript 里的 ...rest 参数，区别是 args 的类型是一个元祖，而 rest 是一个数组。
def varargs(*args):
    return args

varargs(1, 2, 3) # (1, 2, 3)


# 一般约定函数名使用下划线命名法
# 使用 **keyargs 表示可变长参数
def keyword_args(**keyargs):
    return keyargs
  
keyword_args(a = 3, b = 4) # {"a": 3, "b": 4}


# 返回多个参数
def swap(x, y)
    return y, x

a = 1
b = 2
b, a = swap(a, b)
```

在 Python 中也可以写匿名函数：

```Python
(lambda x: x > 2)(3)                 # True
(lambda x, y: x ** 2 + y ** 2)(2, 1) # 5

# 内置高阶函数
list(map(max, [1, 2, 3], [4, 2, 1])) # [4, 2, 3]
list(filter(lambda x: x > 5, [3, 4, 8, 9])) # [8, 9]
```

## 4 类

### 4.1 类的定义和调用

类是一系列变量和方法的集合包，Python 中的类写法如下：

```Python
# 一般约定类名首字母大写，且使用驼峰式命名
class Human:

    # 静态属性
    species = "newbee"

    # 构造函数，self类似 JavaScript 里的 this
    def __init__(self, name):
        self.name = name

        # 初始化属性
        self._age = 0

    # 析构函数，当实例被销毁时调用
    def __del__(self):
        print("实例被销毁了")

    # 类的实例方法，第一个参数为 this 上下文（JS语境下）
    def say(self, msg):
        print("{name}: {message}".format(name=self.name, message=msg))

    # 类的实例方法，第一个参数为类本身
    @classmethod
    def get_species(cls):
        return cls.species

    # 类的静态方法
    @staticmethod
    def grunt():
        return "grunt"

    # 类似 getter 的属性定义
    @property
    def age(self):
        return self._age

    # 属性的 setter 方法
    @age.setter
    def age(self, age):
        self._age = age

    # 设置 deleter 允许该属性被删除
    @age.deleter
    def age(self):
        del self._age

# 此处 __name__ 是一个系统变量，可以用来检查一个模块是否为主程序模块
if __name__ == "__main__":
    # 实例化 Human 类
    i = Human(name = "chen")
    j = Human("liu")
    i.say("hi")         # "chen: hi"
    j.say("hi")         # "liu: hi"

    # 调用类实例方法
    i.say(i.get_species()) # "chen: newbee"

    Human.species = "big newbee"

    i.say(i.get_species()) # "chen: big newbee"

    # 调用静态方法
    print(Human.grunt()) # "grunt"
    # 实例也可以调用静态方法
    print(i.grunt()) # "grunt"

    # 修改属性
    i.age = 26
    i.say(i.age) # "chen: 26"
    j.say(j.age) # "liu: 0"

    # 删除属性
    del i.age
```

> 注：Python 中的类没有实质上的访问控制（也就是不存在私有属性、保护属性等），一般由程序开发者自行通过书写规范或者其他方式来控制。

### 4.2 类的继承

`Python` 中所有的类都是继承自 `object` 类，所以上面例子中的 `Human` 类也可以写成下面的写法：

```Python
class Human(object):
    ...
```

继承 `Human` 类：

```Python
class Man(Human):

    # 子类可以覆盖父类的属性
    species = "Man"

    def __init__(self, name, age):

        self._age = age

        # 调用父类的构造函数
        super().__init__(name)

    # 覆盖父类的 say 方法
    def say(self):
        print("I am a man!")

    # 自定义子类的方法
    def code(self):
        print("I am coding!")

```

`Python` 支持多继承，方法在父类中未找到时，从左至右查找父类中是否包含方法。

```Python
class Woman(Human):
    species = "Woman"

    def __init__(self, name, age):
        self._age = age
        super().__init__(name)

    def birth(self):
        print("new child()")

# 多继承
class Ladyman(Man, Woman):
    species = "Ladyman"

    def __init__(self, name, age):
        self._age = age
        super().__init__(name)

    def birth(self):
        print("sos")
```

### 4.3 类型判断

使用 `isinstance()` 方法判断子类类型：

```Python
if __name__ == "__main__":
    person1 = Human("God")
    person2 = Man("Adam")
    person3 = Woman("Eve")

    print(isinstance(person1, Human)) # True
    print(isinstance(person2, Human)) # True
    print(isinstance(person1, Man))   # True
    print(isinstance(person1, Woman)) # False
    
    # isinstance() 也可用于判断基本类型
    print(isinstance("000", str)) # True
    print(isinstance(121, int))   # True
    print(isinstance(121, str))   # False
    
```


## 5 模块与标准库

### 5.1 模块

在 `Python` 中，一个 `.py` 文件就称之为一个模块（module）。

使用 `import` 关键字导入模块，如：

```Python
# 导入 math 标准库
import math

print(math.pi) # 3.141592653589793
```

`import` 默认导入该模块下所有属性和方法，类似 `JavaScript` 中：

```javascript
import math from 'math.js'
```

我们知道在 `JavaScript` 中可以导入部分方法，在 `Python` 中同样可以：

```Python
from math import ceil, floor

print(ceil(3.7))  # 4.0
print(floor(3.7)) # 3.0
```

修改模块别名：

```Python
import math as m

math.sqrt(16) == m.sqrt(16) # True
```

### 5.2 标准库

`Python` 标准库非常庞大，它包含了多个内置模块（C编写），可以依靠它们来实现系统级功能，例如文件 I/O，此外还有大量用 Python 编写的模块，提供了日常编程中许多问题的标准解决方案，例如 JSON 数据处理模块。

详细的标准库文档见[官方文档](https://docs.python.org/zh-cn/3/library/)。

> 注：如果定义了一个和标准库相同名称的模块，自定义模块将取代内置模块被 Python 加载。



## 6 参考

https://www.python.org/

https://docs.python.org/zh-cn/3/library/

https://www.readwithu.com/

https://python-guide.gitbooks.io/python-style-guide/content/style-guide/variables.html
