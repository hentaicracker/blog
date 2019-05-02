---
title: 使用 React Hooks + Context 打造简版 Redux
date: 2019-04-04 11:58:39
tags:
    - JavaScript
    - React
---

`React Hooks` 在 React@16.8 版本正式发布。我最近在一两个公司的内部项目中也开始用起来尝尝鲜。

初看文档的时候觉得这东西也就一个新的 API 嘛，为了写 Functional Component 造轮子嘛，我写 HOC / Render Props 照样起飞好嘛？不过在用了接近快三周之后，我表示真香。

不了解 `Hooks` 的同学先撸一遍[文档](https://reactjs.org/docs/hooks-intro.html)。本文不对 `Hooks` 做详细介绍，只阐述一种使用 `Hooks` 的思路。

一般我们写 `React` 如果不是特别大的应用，前后端数据交互逻辑不复杂，这样我们直接按照正常流程写组件就能满足简单的业务场景。随着业务场景的深入渐渐地我们组件变大变多，组件与组件之间的数据通讯（也就是状态管理，不过我更愿意称之为数据通讯）变得越来越复杂。所以我们引入了 `Redux` 来维护我们日趋复杂的数据通讯。

### 思路

秉承着这种思路，我在开发应用的时候是没有一开始就引入 `Redux` ，因为一开始我觉得就是个小项目。随着深入项目的开发，其实并没有这么简单。

但是也没有太复杂，这时我把眼光放到了 `Context` 身上。`Context` 本意是上下文，它提供一个 `Provider` 和一个 `Consumer`，这里和 `Angular` 里的 `Provider` 有点类似，也就是生产者/消费者模式，在某个顶层提供一个 `Provider` ，下面的子元素通过 `Consumer` 来消费 `Provider` 里的数据和方法。

通过这个概念，我们把不同层级里的组件共享同一个顶层 `Provider`，并且组件内部使用 `Consumer` 来消费共享数据。

当我们能共享数据后，还剩一个问题就是如何更改 `Provider` 里的数据呢？答案是：`useReducer`。

好，有了思路，我们来实现一下。

### 实例

假设我们在某一个层级有个需要共享状态的父级元素，我们称它为 Parent，在 Parent 下面不同层级之间有两个 Child。这里为了简单举例假设两个Child内都是共同的逻辑。

```javascript
import React from "react"

function Parent() {
  const colors = ['red', 'blue']
  return (
    <>
      <Child1 color={colors[0]} />
      <Child2 color={colors[1]} />
    </>
  )
}

function Child1(props) {
  return (
    <div style={{ background: props.color }}>I am {props.color}</div>
  )
}

function Child2(props) {
  return (
    <div style={{ background: props.color }}>I am {props.color}</div>
  )
}

```

我们现在已经构造出了这样的一个上下级结构，目前通过给子组件传递属性，可以实现父组件的状态共享。但是这里如果层级加深，我们传递属性的层级也要跟着加深。这样显然不是我们想要的。

现在我们来引入 `Context`。

首先通过 `createContext` 方法初始化我们需要的 `Context`。


```javascript
import React, { createContext } from "react"

const Context = createContext({
  colors: ['red', 'blue']
})

```

然后我们在 Parent 和 Child 里引入刚才的 **Context**，并且使用 `useContext` 拿到共享的数据:

```javascript
import React, { useContext, createContext } from "react"

const Context = createContext({
  colors: []
})

function Parent() {
  const initState = {
    colors: ["red", "blue"]
  }

  return (
    <Context.Provider value={{ colors: initState.colors }}>
      <>
        {/* 假装这些地方有着不同的层级 */}
        <Child1 />
        <Child2 />
      </>
    </Context.Provider>
  )
}

function Child1(props) {
  const { colors } = useContext(Context);

  return (
    <div style={{ background: colors[0] }}>
      I am {colors[0]}
    </div>
  )
}

// 省略 Child2 代码，同 Child1 一致
```

现在只是拿到了数据并且进行渲染，再进一步，通过点击元素，修改颜色。在这里我们就需要用 `useReducer` 来模拟触发改变。

首先我们需要一个 **reducer** 来处理触发的改变。

```javascript

function reducer(state, action) {
  const { colors } = action
  if (action.type === "CHANGE_COLOR") {
    return { colors: colors }
  } else {
    throw new Error()
  }
}

```

这里我简化了 **action** 的处理，当然你也可以进行扩展。

现在，我们给 `Provider` 加上提供改变的方法 **dispatch**。

```javascript
import React, { useContext, createContext } from "react"

const Context = createContext({
  colors: []
})

function Parent() {
  const initState = {
    colors: ["red", "blue"]
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={{ colors: state.colors, dispatch: dispatch }}>
      <>
        {/* 假装这些地方有着不同的层级 */}
        <Child1 />
        <Child2 />
      </>
    </Context.Provider>
  )
}

```

然后子组件触发改变：

```javascript

function Child1(props) {
  const { colors, dispatch } = useContext(Context)

  return (
    <div
      style={{ background: colors[0] }}
      onClick={() =>
        dispatch({
          type: "CHANGE_COLOR",
          colors: ["yellow", "blue"]
        })
      }
    >
      I am {colors[0]}
    </div>
  )
}

// 省略 Child2 代码，同 Child1 一致
```

至此，这个小型的状态共享便完成了。这便是我们摆脱 `Redux` 之后实现的状态共享思路的雏形。完整的代码及例子见 [tiny redux](https://codesandbox.io/s/6v9qnylm7n)。

### 进阶

在实际的应用中，我们的业务场景会更复杂，比如我们的数据是动态获取的。

这种情况下你可以把 `Provider` 抽出来，当 Parent 数据回来之后再初始化 **Context**。

```javascript

function Provider (props) {
  const { colors } = props
  const initState = {
    colors,
  }
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={{ colors: state.colors, dispatch: dispatch }}>
      {props.children}
    </Context.Provider>
  )
}

```

然后我们在 Parent 中做异步操作，并把动态数据传给 **Provider** :

```javascript

import React, { useState, useEffect } from "react"

function Parent (props) {
  const [data, setData] = useState()
  const [url, setUrl] = useState('https://example.com')

  useEffect(() => {
    fetch(url).then(res => setData(data))
  }, [url])

  if (!data) return <div>Loading ...</div>

  return (
    <Provider colors={data}>
      <>
        {/* 假装这些地方有着不同的层级 */}
        <Child1 />
        <Child2 />
      </>
    </Provider>
  )
}

```

### 结语

这样小型的状态管理机制你甚至可以放在某个组件里，而不用放到如 `Redux` 全局的环境中去。这样使得我们写的应用更加灵活，而不是一味的往 `store` 里丢状态。当然你也可以写一个 **AppProvider** 来管理全局的状态，`React Hooks` + `Context` 给了我们这样的便利。

**Hooks 真香！**
