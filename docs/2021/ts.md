---
title: TypeScript 类型编程
date: 2020-01-22 17:13:12
tags:
    - TypeScript
---

TypeScript 是 JavaScript 的超集，它比 JavaScript 多的地方在于：它有自己的静态类型系统。TypeScript 静态类型系统非常强大，并且可以对类型编程，本文主要介绍 TypeScript 的基础类型、相关的关键字的基本用法，并且介绍了 TypeScript 中内置的高阶类型以及它们的实现方式。

## 基础类型

### any

any 可以代表所有类型，它是 TypeScript 给你提供的后门，使用它会把类型检查关闭，如果你觉得写 any 不好看，你可以自定义一个 type TSFixMe = any 😇。

### object

它是 TS 2.3 版本中加入的，用来描述一种非基础类型，所以一般用在类型校验上，比如作为参数类型。

```tsx
declare function create(o: object): void

create({ prop: 0 }); // work
create(() => {}); // work
create([]); // work
create(new Map()); // work
create(new Set()); // work

create(Symbol()); // error
create(null); // error
create(42); // error
create("string"); // error
create(false); // error
create(undefined); // error
create(undefined); // error
```

### void

使用 :void 来表示一个函数没有返回值。

### unknown

unknown 类型是一个类型安全的 any 。TS 3.0 版本加入。

```tsx
let vAny: any = 10
let vUnknown: unknown = 10

let s1: string = vAny      // any 可以被赋值给任何类型的变量
let s2: string = vUnknown  // Error: unknown 不能被赋值给其他类型的变量

vAny.method()     // work
vUnknown.method() // Error
```

### never

never 类型是 TypeScript 中的底层类型。类型为 never 的字段将会被移除出类型，因为它代表是一个永远不会发生的类型。比如：

- 一个永远不会有返回值的函数（如：函数中包含有 while(true) {} ）
- 一个总是会抛错的函数（如：function foo () { throw new Error('error') }，）

### enum

enum(枚举)是组织收集有关变量的一种方式。它默认会同时生成数字类型枚举和字符串类型枚举。

```tsx
// 编译前
enum DesignMode {
	design, // 0，默认情况下，第一个枚举值为 0，然后依次递增 1
	code, // 1
}

// 编译后
var DesignMode;
(function(DesignMode) {
  DesignMode[(DesignMode['design'] = 0)] = 'design';
  DesignMode[(DesignMode['code'] = 1)] = 'code';
})(DesignMode || (DesignMod = {}));

console.log(DesignMode['design']) // 0
console.log(DesignMode[0]) // 'design'
console.log(DesignMode[DesignMode.design]) // 'design' becuase `Tristate.design == 0`
```

## 基础关键字

### type

创建一个类型别名。

```tsx
type StringOrNumber = string | number

let a: StringOrNumber = true // Error :(
```

### interface

接口（或者叫做类型约束），它可以合并多个类型声明至一个类型声明里。

```tsx
interface Point {
	x: number
	y: number
}

interface Shape {
	area(): number
}

interface Perimeter {
	perimeter(): number
}
```

### 使用 type 与 interface 的注意点

```tsx
// 1.class 不能 implements 有联合类型的 type
type RecShape = Shape | Perimeter
class Rec implements RecShape {} // error :(

// 2.不能 extends 有联合类型的 type
interface Rec extends RecShape {}

// 3.type 不能实现声明合并
type Box = {
	height: number
	width: number
}
type Box = {
	scale: number
}
const box: Box = {
	height: 5,
	width: 5,
	scale: 10, // error :(
}

/**
两者使用原则：
1.当你在写一个库或者第三方类型声明时使用 interface ，保证用户可以 extends 相关 interface ，并且可以声明合并。
2.使用 type 来写 react 的 props 和 state.
参考：https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
*/
```

![https://img12.360buyimg.com/img/s1152x1190_jfs/t1/163725/4/3841/407541/600aa283E5e661842/48d174995174db2a.png](https://img12.360buyimg.com/img/s1152x1190_jfs/t1/163725/4/3841/407541/600aa283E5e661842/48d174995174db2a.png)

### extends

使用 extends 来扩展接口或者类型。

```tsx
interface ThreeDPoint extends Point {
	z: number
}
```

### implements

使用 implements 来规范类的定义。

```tsx
class MyPoint implements Point {
	x: number
	y: number
}
```

### declare

你可以通过 declare 关键字来告诉 TypeScript ，你正在试图表述一个其他地方已经存在的代码。

```tsx
declare var foo: any
foo = 'bar' // work :)
```

```tsx
foo = 'bar' // Error: 'foo' is not defined
```

### as

类型断言。TypeScript 允许你覆盖它的推断，并且以你任何想要的方式分析它。

❗谨慎使用类型断言

```tsx
const foo = {} as Point
foo.x = 1
foo.y = 2

// 还有一种方式是 <Point> 形式，不过会与 jsx 冲突
const bar: any
const foo = <Point>bar // 现在bar的类型是 'Point'

// v3.4 新增 const 类型断言
// Type '10'
let x = 10 as const;

// Type 'readonly [10, 20]'
let y = [10, 20] as const;

// Type '{ readonly text: "hello" }'
let z = { text: "hello" } as const;

export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

### is

函数返回值的类型守卫

```tsx
function isString(arg: any): arg is string {
  return typeof arg === "string"
}

// 使用
function invoker(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log("Aha, This is a string!")
    console.log(numOrStr.length)
  }
}
```

isString 函数即是一个类型守卫，它的作用即是判断 arg 是否是 string 类型，并根据判断的结果返回  true/false，在调用类型守卫进行判断时，它能够将待判断的参数类型范围确定到 string 。如果我们将 arg is string 替换为 boolean，会发现在 invoker 中 numOrStr.length 会报错，因为缺少了 is关键字的情况下，isString 无法精确的判断出参数的类型。

### readonly

使用 readonly 来标记属性只可读不可写。你可以用在 type 和 interface 里。

```tsx
type Foo = {
	readonly bar: number
	readonly bas: number
}

const foo: Foo = { bar: 1, bas: 2 }
foo.bar = 3 // Error: foo.bar 为只读属性

// 你也能指定一个类的属性为只读，然后在声明时或者构造函数中初始化它们
class Foo {
  readonly bar = 1 // OK
  readonly baz: string
  constructor() {
    this.baz = 'hello' // OK
  }
}
```

### keyof

通过 keyof 拿到对象 key 的类型。

```tsx
interface Person {
  name: string
  age: number
}

type T1 = keyof Person // "name" | "age"
```

### infer

infer 用来声明一个类型变量来承载被TS推断的类型。

```tsx
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```

这里的 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

```tsx
// 例1：
type Unpacked<T> = T extends (infer U)[]
	? U
	: T extends (...args: any[]) => infer U
	? U
	: T extends Promise<infer U>
	? U
	: T

type T0 = Unpacked<string>
//   ^ = type T0 = string
type T1 = Unpacked<string[]>
//   ^ = type T1 = string
type T2 = Unpacked<() => string>
//   ^ = type T2 = string
type T3 = Unpacked<Promise<string>>
//   ^ = type T3 = string
type T4 = Unpacked<Promise<string>[]>
//   ^ = type T4 = Promise
type T5 = Unpacked<Unpacked<Promise<string>[]>>
//   ^ = type T5 = string

// 例2：
type Foo<T> = T extends { a: infer U, b: infer U } ? U : never

type T1 = Foo<{ a: string; b: string }>
//   ^ = type T1 = string
type T2 = Foo<{ a: string; b: number }>
//   ^ = type T2 = string | number

// 例3：
import { AxiosPromise } from 'axios'
type AxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer R> ? R : any
```

## 高级类型

### 联合类型

联合类型使用 |  作为标记，如 string | number ，它代表对应的属性可以为多种类型。

### 交叉类型

交叉类型使用 & 作为标记，如 <T & U> ，它会创建一个新对象，拥有两个对象所有的功能。

```tsx
type Props = OwnProps & InjectedProps & StoreProps

// 同样等价于
interface Props extends OwnProps, InjectedProps, StoreProps {}
```

### 元祖类型（Tuple）

使用诸如 :[string, number] 来表示元祖类型。

```tsx
let a: [string, number]

a = ['hello kitty', 2333] // work :)
a = ['hello', 'kitty'] // Error :(
```

### 可调用的类型

可以使用类型别名或接口来表示一个可被调用的类型注解。

```tsx
interface ReturnString {
	(): string
}

const foo: ReturnString
const bar = foo() // bar 被推断为一个字符串。

// 或者用箭头函数来表示

const bar: () => string = foo()

// 实例化使用 new 做前缀
interface CallMePlease {
	new (): string
}

declare const foo: CallMePlease
const bar = new Foo()
```

也可以用来表示函数重载。

```tsx
interface Overloaded {
	(foo: string): string
	(foo: number): number
}

function stringOrNumber(foo: number): number
function stringOrNumber(foo: string): string
function stringOrNumber(foo: any): any {
	if (typeof foo === 'number') {
    return foo * foo;
  } else if (typeof foo === 'string') {
    return `hello ${foo}`;
  }
}

const overloaded: Overloaded = stringOrNumber;

// 使用
const str = overloaded(''); // str 被推断为 'string'
const num = overloaded(123); // num 被推断为 'number'
```

### 字面量类型

```tsx
let foo: 'Hello'
foo = 'Kitty' // Error: 'Kitty' 不能赋值给 'Hello'

// 一般用在联合类型中组合创建一个新的类型
type Balls = 'football' | 'basketball'

const a: Balls = 'football' // work :)
const b: Balls = 'my ball' // Error :(
```

### 索引类型

索引类型能使编译器检查使用了动态属性名的代码：

```tsx
// 使用keyof关键字，它是索引类型查询操作符，它能够获得任何类型T上已知的公共属性名的联合。
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
let obj = {
    name: 'LL',
    age: 18,
    male: true
}
let x1 = getProperty(obj, 'name') // work，x1的类型为string
let x2 = getProperty(obj, 'age') // work，x2的类型为number
let x3 = getProperty(obj, 'male') // work，x3的类型为boolean
let x4 = getProperty(obj, 'hobby') // error：Argument of type '"hobby"' is not assignable to parameter of type '"name" | "age" | "male"'.
```

### 条件类型

```tsx
T extends U ? X : Y
```

如果 T 和 U 兼容（T 包含 U 有的所有属性，T 可以被赋值给 U），这个类型就是 X，否则就是 Y。

```tsx
function process<T extends string | null>(
	text: T
): T extends string ? string : null {
	// ...
}

process("foo").toUpperCase() // work :)
process().toUpperCase() // error :(
```

### Mapped types（映射类型）

**Readonly**: 将传入的属性变为只读

```tsx
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
}
type ReactComponentState = Readonly<ComponentState>
```

**Mutable**：将传入的属性变为可写（非标准库）

```tsx
type Mutable<T> = {
	-readonly [P in keyof T]: T[P]
}
```

**Partial**：将传入的属性变为可选项

```tsx
type Partial<T> = {
	[P in keyof T]?: T[P]
}

type DeepPartial<T> = {}
```

**Required**：将传入的属性变为必须项

```tsx
type Required<T> = {
	[P in keyof T]-?: T[P]
}
```

**Pick**：从 T 中选择属性类型为 K 组成一个新的对象类型

```tsx
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}
```

**Record**：将为 K 的属性赋值为 T 类型

```tsx
type Record<K extends keyof any, T> = {
	[P in K]: T
}
// 例：
interface PageInfo {
  title: string;
}
type Page = "home" | "about" | "contact"
const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
}
```

**Exclude**：从T中剔除可以继承自U的类型

```tsx
type Exclude<T, U> = T extends U ? never : T
// 例：
type T0 = Exclude<"a" | "b" | "c", "a">
//    ^ = type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">
//    ^ = type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>
//    ^ = type T2 = string | number
```

**Extract**：提取T中可以继承自U的类型（联合类型取交集）

```tsx
type Extract<T, U> = T extends U ? T : never
// 例：
type T0 = Extract<"a" | "b" | "c", "a" | "f">
//    ^ = type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>
//    ^ = type T1 = () => void
```

**Intersection**：获取两个类型的交集（非标准库）

```tsx
type Intersection<T extends object, U extends object> = Pick<
	T,
	Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>
```

**Omit**：从T中剔除属于K的索引类型

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

**NonNullable**：从T中剔除null和undefined

```tsx
type NonNullable<T> = T extends null | undefined ? never : T
// 例：
type T0 = NonNullable<string | number | undefined>
//    ^ = type T0 = string | number
type T1 = NonNullable<string[] | number | undefined | null>
//    ^ = type T1 = string[] | number
```

**Nullable**：将 T 中所有属性变为与 null 的联合类型（非标准库）

```tsx
type Nullable<T> = {
	[P in keyof T]: T[P] | null
}
```

**ReturnType**: 获取函数返回值类型

```tsx
// 这里的 infer R 就是声明一个变量来承载传入函数签名的返回值类型, 简单说就是用它取到函数返回值的类型方便之后使用。
type ReturnType = T extends (...args: any[]) => infer R ? R : any
// 例：
type T0 = ReturnType<() => string>
//    ^ = type T0 = string
type T1 = ReturnType<(s: string) => void>
//    ^ = type T1 = void
type T2 = ReturnType<<T>() => T>
//    ^ = type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>
//    ^ = type T3 = number[]
type T4 = ReturnType<typeof f1>
//    ^ = type T4 = {
    a: number;
    b: string;
}
type T5 = ReturnType<any>
//    ^ = type T5 = any
type T6 = ReturnType<never>
//    ^ = type T6 = never
```

**Parameters**:  获取函数参数类型

```tsx
type Parameters<T extends (...args: any[]) => any> =
	T extends (...args: infer P) => any
		? P
		: never
```

**ConstructorParameters**:  获取构造器参数类型

```tsx
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any
  ? P
  : never
```

**InstanceType**:  获取构造函数类型的实例类型

```tsx
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
// 例：
class TestClass {
	constructor (public name: string, public age: number) {}
}
type Params = ConstructorParameters<typeof TestClass> // [string, number]
type Instance = InstaceType<typof TestClass> // TestClass
```

## 参考

[https://www.typescriptlang.org/docs/handbook/compiler-options.html](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

[https://zhuanlan.zhihu.com/p/39620591](https://zhuanlan.zhihu.com/p/39620591)

[https://zhuanlan.zhihu.com/p/64423022](https://zhuanlan.zhihu.com/p/64423022)

[http://zxc0328.github.io/diary/2019/10/2019-10-05.html](http://zxc0328.github.io/diary/2019/10/2019-10-05.html)

[https://www.tslang.cn/docs/handbook/advanced-types.html](https://www.tslang.cn/docs/handbook/advanced-types.html)

[https://zhuanlan.zhihu.com/p/40311981](https://zhuanlan.zhihu.com/p/40311981)

[https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)

[https://jkchao.github.io/typescript-book-chinese/tips/infer.html#内置类型](https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E5%86%85%E7%BD%AE%E7%B1%BB%E5%9E%8B)

[https://github.com/typescript-cheatsheets/react](https://github.com/typescript-cheatsheets/react)

[https://github.com/piotrwitek/utility-types](https://github.com/piotrwitek/utility-types)
