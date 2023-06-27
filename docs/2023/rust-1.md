---
title: 《Rust 程序设计语言》读书笔记
date: 2023-03-21 10:13:12
tags:
    - Rust
---

《Rust 程序设计语言》看到哪里记哪里

很多人利用 Rust 学习了操作系统开发等内容，可以更深入到操作系统底层知识，我想这就是我学习 Rust 的原因吧。

#### 编译和运行是彼此独立的步骤

rustc 是 Rust 语言编译器，在运行 Rust 程序之前，必须先使用 Rust 编译器编译它：

```shell
$ rustc main.rs
```

编译成功后，在 Linux、macOS 上，Rust 会输出一个二进制的可执行文件：

```shell
$ ls
main main.rs
```

`main` 是一个可执行文件，在 Windows 下是 `main.exe`，执行后就会打印出程序中的 `hello world!`。

```shell
$ ./main
hello world!
```

#### cargo

cargo 是 Rust 的包管理工具，也是一个用于编译打包的工具。

新建项目：

```shell
$ cargo new
```

构建项目：

```shell
$ cargo build
```

构建并运行项目：

```shell
$ cargo run
```

快速检查代码确保其可以编译，不产生可执行文件：

```shell
$ cargo check
```

优化编译项目，生成发布版本：

```shell
$ cargo build --release
```

#### 在 Rust 中，变量默认是不可变的

```rust
let apples = 5; // 不可变
let mut apples = 5; // 可变
const THREE_HOURS_IN_SECONDS: u32 =  60 * 60 * 3; // 常量
```

#### 在 Rust 中，每一个值都属于某一个数据类型

** scalar 标量**

- 整型 i8/i16/i32/i64/i128/isize(有符号) u8/u16/u32/u64/u128/usize(无符号)
- 浮点型 f32/f64
- 布尔型 bool
- 字符类型 char

** compound 复合类型**

- 元组

```rust
let x: (i32, f64, u8) = (500, 6.4, 1);

let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;
```

- 数组

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5]; // 类型为 i32 长度为 5 的数组
```

#### 参数（parameters: 形参，arguments: 实参）

函数中给一个变量赋值必须是表达式（Expressions），而不是语句（Statements）。

```rust
fn plus_one(x: i32) -> i32 {
    x + 1; // 加了分号是语句，不加分号是表达式，此处会报错
}
```
上面的例子返回单位类型`()`，与 i32 不匹配，从而出现一个报错。去掉分号则可修复这个错误。

#### 循环返回值

使用 break 关键字返回值，通过分号结束赋值给 result 语句。

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    }; // 分号

    println!("The result is {result}");
}
```

#### 循环标签

如果存在嵌套循环，`break` 和 `continue` 应用于此时最内层的循环。指定一个循环标签，将标签与 break 或 continue 一起使用，可应用于已标记的循环。

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up; // 结束外层标记的循环
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

#### 所有权规则

1. Rust 中每一个值都有一个所有者（owner）
2. 值在任一时刻有且只有一个所有者
3. 当所有者（变量）离开作用域，这个值将被丢弃

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership 将返回值
                                        // 转移给 s1

    let s2 = String::from("hello");     // s2 进入作用域

    let s3 = takes_and_gives_back(s2);  // s2 被移动到
                                        // takes_and_gives_back 中，
                                        // 它也将返回值移给 s3
} // 这里，s3 移出作用域并被丢弃。s2 也移出作用域，但已被移走，
  // 所以什么也不会发生。s1 离开作用域并被丢弃

fn gives_ownership() -> String {             // gives_ownership 会将
                                             // 返回值移动给
                                             // 调用它的函数

    let some_string = String::from("yours"); // some_string 进入作用域。

    some_string                              // 返回 some_string 
                                             // 并移出给调用的函数
                                             // 
}

// takes_and_gives_back 将传入字符串并返回该值
fn takes_and_gives_back(a_string: String) -> String { // a_string 进入作用域
                                                      // 

    a_string  // 返回 a_string 并移出给调用的函数
}
```

变量的所有权总是遵循相同的模式：将值赋给另一个变量时移动它。当持有堆中数据值的变量离开作用域时，其值将通过 drop 被清理掉，除非数据被移动为另一个变量所有。

#### 通过 引用 访问存储于该地址的属于其他变量的数据

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {// s 是 String 的引用
    s.len()
} // 这里，s 离开了作用域。但因为它并不拥有引用值的所有权，
  // 所以什么也不会发生
```

这些 & 符号就是 引用，它们允许你使用值但不获取其所有权。

> 与引用对应的是解引用运算符（*）

正如变量默认是不可变的，引用也一样。（默认）不允许修改引用的值。

#### 通过 可变引用 修改一个借用的值

```rust
fn main() {
  let mut s = String::from("hello");

  change(&mut s); // 可变引用
}

fn change(some_string: &mut String) {
  some_string.push_str(", world");
}
```

在任意给定时间，要么 只能有一个可变引用，要么 只能有多个不可变引用。

#### 方法在结构体的上下文中定义，第一个参数总是 self，代表调用该方法的结构体实例

```rust
#[derive(Debug)]
struct Rect {
  width: u32,
  height: u32,
}

impl Rect {
  // 关联函数，类似 static 函数
  fn square(size: u32) -> Self {
    Self {
      width: size,
      height: size,
    }
  }

  // 方法
  fn area(&self) -> u32 {
    self.width * self.height
  }

  fn can_hold(&self, other: &Rect) -> bool {
    self.width > other.width && self.height > other.height
  }
}

fn main() {
  let rect1 = Rect {
    width: 30,
    height: 50,
  };

  let rect2 = Rect {
    width: 10,
    height: 40,
  };

  let rect3 = Rect::square(3);

  if rect1.can_hold(&rect2) {
    println!(
      "The area of the rectangle is {} square pixels",
      rect1.area()
    );
  }
}
```

#### 枚举

```rust
enum IpAddr {
  V4(String),
  V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));

enum Message {
  Quit,
  Move { x: i32, y: i32 },
  Write(String),
  ChangeColor(i32, i32, i32),
}

impl Message {
  fn call(&self) {
    // 枚举方法体
  }

  let m = Message::Write(String::from("hello"));
  m.call();
}
```

#### Option枚举

> 我未能抵抗住引入一个空引用的诱惑，仅仅是因为它是这么的容易实现。这引发了无数错误、漏洞和系统崩溃，在之后的四十多年中造成了数十亿美元的苦痛和伤害。 ————Tony Hoare，null 发明者

Option 枚举定义于标准库中：
```rust
enum Option<T> {
  None,
  Some(T),
}

let some_number = Some(5);
let some_char = Some('e');

let absent_number = Option<i32> = None;

assert_eq!(some_number.is_none(), false);
```
具体使用方法：https://doc.rust-lang.org/std/option/enum.Option.html


####  match 分支匹配（类似 js 中的 switch）

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
  match x {
    None => None,
    Some(i) => Some(i + 1),
  }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

分支匹配必须满足穷举性要求

```rust
let dice_roll = 9;
match dice_roll {
  3 => add_fancy_hat(),
  7 => remove_fancy_hat(),
  _ => (), // _ 替代了 other，在与前面模式不匹配的情况下不运行任何代码
}

fn add_fancy_hat() {}
fn remove_fancy_hat() {}
```

```rust
let mut count = 0;
match coin {
  Coin::Quarter(state) => println!("State quarter from {:?}!", state),
  _ => count + 1,
}

// ==== 转成 if let 简洁语法，可以认为 if let 是 match 的一个语法糖，它当值匹配某一模式时执行代码而忽略所有其他值。 ====
let mut count = 0;
if let Coin::Quarter(state) = coin {
  println!("State quarter from {:?}!", max);
} else {
  count += 1;
}
```



