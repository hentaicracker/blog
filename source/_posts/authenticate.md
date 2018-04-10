---
title: 用户认证流程梳理
date: 2018-03-02 21:33:59
tags:
    - 网络
---

最近基于 `Kong` 使用 `Koa` 搭建了一个 `Oauth2` 服务。

[Kong](https://getkong.org) 是一个网关控制程序，它可以控制请求转发，并且在这个基础上做一系列权限验证的操作。

Oauth2 权限验证是目前最有效的授权验证方式。

在搭建这一授权服务的时候会有一个认证的过程。通过授权服务器拿到用户授权之后，前端 app 需要将这个用户的用户信息保存下来，然后设置一个过期时间，当在这个过期时间之内用户再次访问就不需要去授权了，直接从服务器缓存里拿用户信息。

<!-- more -->

这里的具体流程是：
 1.设置一个密匙，使用用户 id 和密匙生成一个 token 。
 2.将该 token 以及用户信息和过期时间保存在 redis 中。
 3.设置一个 cookie ，值为 token ，将该 cookie 返回客户端。

当用户再次访问系统时，浏览器 HTTP 请求会自动将该 cookie 带过来。

这个时候会先设置该 context 下的请求是未登录认证的：

```javascript
context.state.isAuthenticated = false;
```

服务器拿到 cookie 值，也就是之前保存的 token ，使用该 token 去 redis 中查询用户信息。如果当前时间在过期时间范围之内，redis 会返回用户信息。这个时候会在该 context 下设置用户信息和认证状态：

```javascript
context.state.user = user;
context.state.isAuthenticated = true;
```

如果当前时间已经超过了过期时间，则没有用户信息返回，前端 app 没有拿到用户信息，则重新去授权服务器拿授权。