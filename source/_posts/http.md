---
title: HTTP 详细
date: 2018-02-26 22:03:05
tags:
    - 网络
---

`HTTP` ，英文名： HyperText Transfer Protocol，中文名：超文本传输协议。

> HTTP 是一个客户端终端（用户）和服务器端（网站）请求和应答的标准。

维基百科如是说。也就是说我们现在客户端和服务器端的这种 `C/S` 架构基本都是用 HTTP 来传输数据。网页，app，桌面程序等基本都是使用的 HTTP 。

废话不多说，直接刚。

<!-- more -->

# 请求方法

方法名|概述|常用情景
---|---|---
**GET**|向指定资源发出“**显示**”请求。该方法应该只用在读取数据，而不应被用于产生“**副作用**”的操作中。通俗说就是不能对服务器资源有所更改。属于“`安全方法`”。|1.访问网页信息 2.查询数据
**POST**|向指定资源提交数据，请求服务器进行处理。数据被包含在请求本文（`body`）中。这个请求可能会创建新的资源或修改现有资源。可以理解为`新增`。|form 表单提交
**PUT**|向指定资源位置上传其最新内容。可以理解为`更新`。| form 表单提交
**DELETE**|请求服务器删除 Request-URI 所标识的资源。可以理解为`删除`。|删除数据
**HEAD**|与 GET 方法一样，只是不返回资源的本文部分，可以使用这个方法来获取该资源的信息。属于“`安全方法`”。|
**TRACE**|回显服务器收到的请求，主要用于测试或诊断。|
**OPTIONS**|返回该资源所支持的所有 HTTP 请求方法。|
**CONNECT**|HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接（经由非加密的HTTP代理服务器）。|
**PATCH**|用于将局部修改应用到资源。|

### 幂等
如果不考虑错误或者过期等情况下，若干次请求的副作用与单次请求相同或根本无副作用，那这些请求方法就能被视作为“`幂等`”的。GET、HEAD、PUT、DELETE 都是幂等的。

# 请求信息（request）

先看看一个 HTTP 请求长什么样：

```
GET / HTTP/1.1
Host: hentaicracker.github.io
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: _ga=GA1.3.1913906008.1521622451; _gid=GA1.3.2115623724.1523262503; _gat=1
If-Modified-Since: Mon, 12 Mar 2018 13:59:47 GMT
```

大体结构：
 - 请求行： 请求方法（空格）请求路径（空格）协议（空格）CRLF换行符
 - 请求头： 各种请求头
 - 空行： CRLF换行符
 - 其他消息体： 请求参数(query string)

# 响应信息（response）

```
HTTP/1.1 200 OK
Server: GitHub.com
Content-Type: text/html; charset=utf-8
Last-Modified: Mon, 12 Mar 2018 13:59:47 GMT
Access-Control-Allow-Origin: *
Expires: Tue, 10 Apr 2018 09:14:27 GMT
Cache-Control: max-age=600
Content-Encoding: gzip
X-GitHub-Request-Id: F98E:1FE4:13E2B37:15A1269:5ACC7E1A
Content-Length: 5282
Accept-Ranges: bytes
Date: Tue, 10 Apr 2018 09:04:27 GMT
Via: 1.1 varnish
Age: 0
Connection: keep-alive
X-Served-By: cache-hnd18728-HND
X-Cache: MISS
X-Cache-Hits: 0
X-Timer: S1523351067.433531,VS0,VE120
Vary: Accept-Encoding
X-Fastly-Request-ID: f2f59b005beb9f08d02a6a82d56551c325488636
```
大体结构：
 - 响应行： 协议（空格）状态码（空格）状态描述
 - 响应头： 各种响应头
 - 空行： CRLF换行符
 - 响应实体： 数据

# HTTP 头
HTTP 头字段分为 4 种类型：
 - 通用头字段
 - 请求头字段
 - 响应头字段
 - 实体头字段

### 请求字段
字段名|说明|示例
---|---|---
`Accept`|能够接受的回应内容类型（Content-Types）。|Accept: text/plain
`Accept-Charset`|能够接受的字符集|Accept-Charset: utf-8
`Accept-Encoding`|能够接受的编码方式列表。|Accept-Encoding: gzip, deflate
`Accept-Language`|能够接受的回应内容的自然语言列表。|Accept-Language: en-US
`Accept-Datetime`|能够接受的按照时间来表示的版本|Accept-Datetime: Thu, 31 May 2007 20:35:00 GMT
`Authorization`|用于超文本传输协议的认证的认证信息|Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
`Cache-Control`|用来指定在这次的请求/响应链中的所有缓存机制**都必须**遵守的指令|Cache-Control: no-cache
`Connection`|该浏览器想要优先使用的连接类型|Connection: keep-alive
`Cookie`|之前由服务器通过 Set- Cookie 发送的一个 超文本传输协议 Cookie |Cookie: _ga=GA1.3.1913906008.1521622451; _gat=1
`Content-Length`|以 八位字节数组 （8位的字节）表示的请求体的长度|Content-Length: 348
`Content-Type`|请求体的 多媒体类型 （用于POST和PUT请求中）|Content-Type: application/x-www-form-urlencoded
`Date`|发送该消息的日期和时间|Date: Tue, 15 Nov 1994 08:12:31 GMT
`Host`|服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号。如果所请求的端口是对应的服务的标准端口，则端口号可被省略。|Host: hentaicracker.github.io
`If-Match`|仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用时，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情`况下，才更新该资源。|If-Match: "737060cd8c284d8af7ad3082f209582d"
`If-Modified-Since`|允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）|If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT
`If-None-Match`|允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）|If-None-Match: "737060cd8c284d8af7ad3082f209582d"
`If-Range`|如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体|If-Range: "737060cd8c284d8af7ad3082f209582d"
`If-Unmodified-Since`|仅当该实体自某个特定时间已来未被修改的情况下，才发送回应。|If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT
`Origin`|发起一个针对 跨来源资源共享 的请求（要求服务器在回应中加入一个‘访问控制-允许来源’（'Access-Control-Allow-Origin'）字段）。|Origin: http://www.example.com
`Pragma`|与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生多种效果。|Pragma: no-cache
`Proxy-Authorization`|用来向代理进行认证的认证信息。|Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
`Range`|仅请求某个实体的一部分。字节偏移以0开始。|Range: bytes=500-999
`Referer`|表示浏览器所访问的前一个页面，正是那个页面上的某个链接将浏览器带到了当前所请求的这个页面。|Referer: http://hentaicracker.github.io/?index=2
`User-Agent`|浏览器的浏览器身份标识字符串|User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36
`X-Csrf-Token`|用于防止 跨站请求伪造。 辅助用的头部有 X-CSRFToken 或 X-XSRF-TOKEN|X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql

### 响应字段
字段名|说明|示例
---|---|---
`Access-Control-Allow-Origin`|指定哪些网站可参与到跨来源资源共享过程中|Access-Control-Allow-Origin: *	
`Accept-Patch`|指定服务器支持的文件格式类型。|Accept-Patch: text/example;charset=utf-8
`Accept-Ranges`|这个服务器支持哪些种类的部分内容范围。|Accept-Ranges: bytes
`Age`|这个对象在代理缓存中存在的时间，以秒为单位。|Age: 12
`Allow`|对于特定资源有效的动作。针对HTTP/405这一错误代码而使用。|Allow: GET, HEAD
`Cache-Control`|向从服务器直到客户端在内的所有缓存机制告知，它们是否可以缓存这个对象。其单位为秒。|Cache-Control: max-age=3600
`Connection`|针对该连接所预期的选项。|Connection: close
`Content-Disposition`|一个可以让客户端下载文件并建议文件名的头部。文件名需要用双引号包裹。|Content-Disposition: attachment; filename="fname.ext"
`Content-Encoding`|在数据上使用的编码类型。参考 超文本传输协议压缩 。|Content-Encoding: gzip
`Content-Language`|内容所使用的语言。|Content-Language: da
`Content-Length`|回应消息体的长度，以 字节 （8位为一字节）为单位。|Content-Length: 348
`Content-Location`|所返回的数据的一个候选位置。|Content-Location: /index.htm
`Content-Range`|这条部分消息是属于某条完整消息的哪个部分。|Content-Range: bytes 21010-47021/47022
`Content-Type`|当前内容的MIME类型。|Content-Type: text/html; charset=utf-8
`Date`|此条消息被发送时的日期和时间(按照 RFC 7231 中定义的“超文本传输协议日期”格式来表示)。|Date: Tue, 15 Nov 1994 08:12:31 GMT
`ETag`|对于某个资源的某个特定版本的一个标识符，通常是一个 消息散列。|ETag: "737060cd8c284d8af7ad3082f209582d"
`Expires`|指定一个日期/时间，超过该时间则认为此回应已经过期。|Expires: Thu, 01 Dec 1994 16:00:00 GMT: 标准
`Last-Modified`|所请求的对象的最后修改日期(按照 RFC 7231 中定义的“超文本传输协议日期”格式来表示)。|Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT
`Location`|用来 进行重定向，或者在创建了某个新资源时使用。|Location: http://www.w3.org/pub/WWW/People.html
`Pragma`|与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生多种效果。|Pragma: no-cache
`Proxy-Authenticate`|要求在访问代理时提供身份认证信息。|Proxy-Authenticate: Basic
`Refresh`|用于设定可定时的重定向跳转。右边例子设定了5秒后跳转至“http://www.w3.org/pub/WWW/People.html”。|Refresh: 5; url=http://www.w3.org/pub/WWW/People.html
`Server`|服务器的名字|Server: Apache/2.4.1 (Unix)
`Set-Cookie`|HTTP cookie|Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1: 标准
`Status`|通用网关接口 协议头字段，用来说明当前这个超文本传输协议回应的 状态 。普通的超文本传输协议回应，会使用单独的“状态行”（"Status-Line"）作为替代，这一点是在 `RFC 7230 中定义的。 |Status: 200 OK
`Transfer-Encoding`|用来将实体安全地传输给用户的编码形式。当前定义的方法包括：分块（chunked）、compress、deflate、gzip和identity。|Transfer-Encoding: chunked
`WWW-Authenticate`|表明在请求获取这个实体时应当使用的认证模式。|WWW-Authenticate: Basic

# HTTP 状态码
HTTP 状态码主要分为 5 类。
- **1xx消息**： 请求已被服务器接收，继续处理
- **2xx成功**： 请求已成功被服务器接收、理解并接受
- **3xx重定向**： 需要后续操作才能完成这一请求
- **4xx请求错误**： 请求含有词法错误或者无法被执行
- **5xx服务器错误**： 服务器在处理某个正确请求时发生错误

# HTTP 缓存

# 参考资料
[超文本传输协议 - wikipedia](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)