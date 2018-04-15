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
 - 空行： CRLF符
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
 - 空行： CRLF符
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
`Content-Type`|请求体的 多媒体类型 (`MIME type`) （用于POST和PUT请求中）|Content-Type: application/x-www-form-urlencoded
`Date`|发送该消息的日期和时间|Date: Tue, 15 Nov 1994 08:12:31 GMT
`Host`|服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号。如果所请求的端口是对应的服务的标准端口，则端口号可被省略。|Host: hentaicracker.github.io
`If-Match`|仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用是，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情`况下，才更新该资源。|If-Match: "737060cd8c284d8af7ad3082f209582d"
`If-Modified-Since`|允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）|If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT
`If-None-Match`|允许在对应的内容未被修改的情况下返回304未修改（ 304 Not Modified ）|If-None-Match: "737060cd8c284d8af7ad3082f209582d"
`If-Unmodified-Since`|仅当该实体自某个特定时间已来未被修改的情况下，才发送回应。|If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT
`If-Range`|如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体|If-Range: "737060cd8c284d8af7ad3082f209582d"
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
`Cache-Control`|**向从服务器直到客户端在内的所有缓存机制告知，它们是否可以缓存这个对象。其单位为秒。**|Cache-Control: max-age=3600
`Connection`|针对该连接所预期的选项。设置为 `keep-alive` 时就建立了一个可复用的 TCP 连接，直到客户端或服务器主动关闭连接。|Connection: close
`Content-Disposition`|一个可以让客户端下载文件并建议文件名的头部。文件名需要用双引号包裹。|Content-Disposition: attachment; filename="fname.ext"
`Content-Encoding`|在数据上使用的编码类型。值通常是数据的压缩方法： `gzip`, `compress`, `deflate`|Content-Encoding: gzip
`Content-Language`|内容所使用的语言。|Content-Language: da
`Content-Length`|回应消息体的长度，以 字节 （8位为一字节）为单位。|Content-Length: 348
`Content-Location`|所返回的数据的一个候选位置。|Content-Location: /index.htm
`Content-Range`|这条部分消息是属于某条完整消息的哪个部分。|Content-Range: bytes 21010-47021/47022
`Content-Type`|当前内容的MIME类型。|Content-Type: text/html; charset=utf-8
`Date`|**此条消息被发送时的日期和时间。**|Date: Tue, 15 Nov 1994 08:12:31 GMT
`ETag`|**对于某个资源的某个特定版本的一个标识符，通常是一个 消息散列。**|ETag: "737060cd8c284d8af7ad3082f209582d"
`Expires`|**指定一个日期/时间，超过该时间则认为此回应已经过期。**|Expires: Thu, 01 Dec 1994 16:00:00 GMT: 标准
`Last-Modified`|**所请求的对象的最后修改日期。**|Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT
`Location`|**用来 进行重定向，或者在创建了某个新资源时使用。**|Location: http://www.w3.org/pub/WWW/People.html
`Pragma`|与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生多种效果。|Pragma: no-cache
`Proxy-Authenticate`|要求在访问代理时提供身份认证信息。|Proxy-Authenticate: Basic
`Refresh`|用于设定可定时的重定向跳转。右边例子设定了5秒后跳转至“http://www.w3.org/pub/WWW/People.html”。|Refresh: 5; url=http://www.w3.org/pub/WWW/People.html
`Server`|服务器的名字|Server: Apache/2.4.1 (Unix)
`Set-Cookie`|HTTP cookie|Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1: 标准
`Status`|通用网关接口 协议头字段，用来说明当前这个超文本传输协议回应的 状态 。普通的超文本传输协议回应，会使用单独的“状态行”（"Status-Line"）作为替代，这一点是在 `RFC 7230 中定义的。 |Status: 200 OK
`Transfer-Encoding`|用来将实体安全地传输给用户的编码形式。当前定义的方法包括：分块（chunked）、compress、deflate、gzip和identity。|Transfer-Encoding: chunked
`Vary`|告知下游的代理服务器，应当如何对未来的请求协议头进行匹配，以决定是否可使用已缓存的回应内容而不是重新从原始服务器请求新的内容。|Vary: *
`WWW-Authenticate`|表明在请求获取这个实体时应当使用的认证模式。|WWW-Authenticate: Basic

# HTTP 状态码
HTTP 状态码主要分为 5 类。
- **1xx消息**： 请求已被服务器接收，继续处理

- **2xx成功**： 请求已成功被服务器接收、理解并接受

状态码|状态描述|说明
---|---|---
`200`|`OK`|请求成功，请求所希望的请求头和响应体将返回。
`200`|`from cache`|**表示该资源已经被缓存过，并且在有效期内，所以浏览器不再向服务器发出请求，直接使用本地缓存。**
201|created|请求已经被实现，而且有一个新的资源已经依据请求的需要而创建，且其 URI 已经随 Location 头信息返回。
202|Accepted|服务器已接受请求，但尚未处理。正如它可能被拒绝一样，最终该请求可能会也可能不会被执行。
203|Non-Authoritative Information|服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。
`204`|`No Content`|服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。
205|Reset Content|服务器成功处理了请求，且没有返回任何内容。与 204 响应不同，此响应要求请求者重置文档视图。
206|Partial Content|服务器已经成功处理了部分 GET 请求，迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。

- **3xx重定向**： 需要后续操作才能完成这一请求

状态码|状态描述|说明
---|---|---
300|Multiple Choices|被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。
`301`|`Moved Permanently`|被请求的资源已**永久**移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。
`302`|`Found`|请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是**临时**的，客户端应当继续向原有地址发送以后的请求。只有在 `Cache-Control` 或 `Expires` 中进行了指定的情况下，这个响应才是可缓存的。
`303`|`See Other`|对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。
`304`|`Not Modified`|表示浏览器虽然发现了本地有该资源的缓存，但是不确定是否是最新的，于是想服务器询问，若服务器认为浏览器的缓存版本还可用（即还未更新），那么便会返回 `304` ，继续使用本地的缓存。表示资源未被修改，因为请求头指定的版本 `If-Modified-Since` 或 `If-None-Match`。
305|Use Proxy|被请求的资源必须通过指定的代理才能被访问。

- **4xx请求错误**： 请求含有词法错误或者无法被执行

状态码|状态描述|说明
---|---|---
`400`|`Bad Request`|由于明显的客户端错误（例如，格式错误的请求语法，太大的大小，无效的请求消息或欺骗性路由请求），服务器不能或不会处理该请求。一般就是**参数错误**。
`401`|`Unauthorized`|用户未认证，即用户没有必要的凭据。该状态码表示当前请求需要用户验证。该响应必须包含一个适用于被请求资源的 `WWW-Authenticate` 信息头用以询问用户信息。客户端可以重复提交一个包含恰当的 Authorization 头信息的请求。
`403`|`Forbidden`|服务器已经理解请求，但是拒绝执行它。
`404`|`Not Found`|请求失败，请求的资源未在服务器上找到。你懂的。
405|Method Not Allowed|字面意思。该响应必须返回一个 Allow 头信息用以表示出当前资源能够接受的请求方法的列表。
406|Not Acceptable|请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体，该请求不可接受。
408|Request Timeout|请求超时。
412|Precondition Failed|服务器没能满足客户端在获取资源时在请求头字段中设置的先决条件。
413|Request Entity Too Large|表示服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围。
414|Request-URI Too Long|URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务。比如本应使用 POST 方法的表单提交变成了 GET 方法，导致查询字符串过长。
418|I'm a teapot|愚人节笑话。


- **5xx服务器错误**： 服务器在处理某个正确请求时发生错误

状态码|状态描述|说明
---|---|---
`500`|`Internal Server Error`|通用错误消息，服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。没有给出具体错误信息。一般就是后端有 bug 。
501|Not Implemented|服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。
`502`|`Bad Gateway`|作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
503|Service Unavailable|由于临时的服务器维护或者过载，服务器当前无法处理请求。这个状况是暂时的，并且将在一段时间以后恢复。
504|Gateway Timeout|作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（ URI 标识出的服务器，例如 HTTP、FTP、LDAP ）或者辅助服务器（例如 DNS ）收到响应。


# HTTP 缓存

> 缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。

如何定义和使用 HTTP 缓存？用两句话概况就是： 请求响应了资源能不能存？该缓存能不能用？我们通过三种策略来判断。

#### 缓存存储策略

此策略用来**决定 HTTP 响应内容是否可以缓存到客户端**。

HTTP/1.1定义的 `Cache-Control` 头用来区分对缓存机制的支持情况，请求头和响应头都支持这个属性。通过它提供的不同的值来定义缓存策略。

缓存策略|描述|缓存控制
---|---|---
**禁止进行缓存**|缓存中不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容。|Cache-Control: no-store  \r Cache-Control: no-store, no-store, must-revalidate
**强制确认缓存**|每次有请求发出时，缓存会将此请求发到服务器，服务器端会验证请求中所描述的缓存是否过期，若未过期返回 `304` 状态码，则缓存才使用本地缓存副本。|Cache-Control: no-cache（类似 Cache-Control: max-age=0 ）
**公共缓存**|表示该响应可以被任何中间人（译者注：比如`中间代理`、`CDN` 等）缓存|Cache-Control: public
**私有缓存**|表示该响应是专用于某单个用户的，中间人不能缓存此响应，该响应只能应用于浏览器私有缓存中。|Cache-Control: private

缓存如果能存到本地的话，那怎么判断它能不能用呢（因为有可能该资源已经过期）？

#### 缓存过期策略（新鲜度）

此策略**决定客户端是否可以直接从本地缓存数据中加载数据并展示（否则发请求到服务端获取）**。

**Pragma**

Pragma 属于通用首部字段。当该字段值为 `no-cache` 时，客户端则不能缓存，需每次向服务器发一次请求。

在客户端上使用时，常规要求我们需要在 HTML 上加上一段 meta 元标签。

```html
<meta http-equiv="Pragma" content="no-cache">
```

不过这种做法只有 IE 才能识别这段 meta 标签含义，其它主流浏览器仅能识别 `Cache-Control: no-store` 的 meta 标签。

该字段于 HTTP 1.0 提出。

**Expires**

`Expires` 指明了缓存数据有效的绝对时间，告诉客户端到了这个时间点后本地缓存就作废了，在这个时间点内客户端可以认为缓存数据有效，可直接从缓存中加载展示。

该字段于 HTTP 1.0 提出。

**Cache-Control: max-age=<seconds>**

`max-age=<seconds>` 表示资源能够被缓存（保持新鲜）的最大时间。也就相当于：
```
Cache-Control: public/private
Expires: 当前客户端时间 + maxAge
```

Cache-Control 优先级高于 Expires，它们同时存在的时候，后者会被忽略掉。

该字段于 HTTP 1.1 提出。

**注意**：

**在没有提供任何浏览器缓存过期策略的情况下，客户端计算响应头中 2 个时间字段（`Date` 和 `Last-Modified`）之间的时间差值（秒），取该值的 10% 作为缓存过期周期。**

#### 缓存对比策略

缓存对比是将缓存在客户端的数据标识发往服务端，服务端通过标识来判断客户端缓存的数据是否有效，进而决定是否要重发数据。

客户端检测到数据过期或浏览器刷新后，往往会重新发起一个 HTTP 请求到服务器，服务器此时先判断请求头有没有带标识（ `If-Modified-Since`、`If-None-Match` ）过来，如果判断了标识仍有效，则返回 `304` 告诉客户端直接拿缓存来用即可（这里须在首次响应的时候输出相应的头信息（ `Last-Modified`、`ETag` ）到客户端）。

**Last-Modified**

像之前说的，服务器将资源传递给客户端时，会将资源最后更改的时间以 `Last-Modified: GMT` 的形式加在响应首部一起返回给客户端。

客户端会在资源标记上该信息，下次再请求时会把该信息附带在请求报文中一并带给服务器去做检查，若传递的时间值与服务器上该资源最终修改的时间是一致的则说明该资源没被修改过，直接返回`304`状态码，内容为空，这样就节省了传输数据量。不一致则返回该资源(`200`)。

浏览器标记最终修改时间的请求报文首部有两个字段：

 1. `If-Modified-Since: Last-Modified-value(GMT)`

该首部告诉服务器如果客户端传来的最后修改时间与服务器一致，则返回 304 和响应头即可。

 2. `If-Unmodified-Since: Last-Modified-value(GMT)`

该首部告诉服务器若 `Last-Modified` 没匹配上（资源更改了），则返回 `412` 给客户端。

Last-Modified 存在一定问题：

如果服务器某个资源被修改了，但其实际内容根本没发生改变，会因为 Last-Modified 时间匹配不上而返回整个实体给客户端。

**ETag**

为了解决 Last-Modified 可能存在的不准确的问题，HTTP 1.1 推出了 ETag 实体首部字段。服务器通过某种算法给资源算出一个唯一标识符（如 md5 ），将该“ `Etag: 标识符` ”放在响应头中返回客户端。

客户端会保留该 ETag 字段，在下一次请求的时候将其一并带过去。服务器只需比较传来的 ETag 跟自己服务器上该资源的 Etag 是否一致就能判断资源相对客户端是否被修改过了。

客户端通过两个请求头字段标记 ETag 传给服务器：

 1. `If-None-Match: ETag-value`

这个字段告诉服务器如果 ETag 没匹配上需重发资源数据，否则返回 `304` 。

 2. `If-Match: ETag-value`

这个字段告诉服务器如果没有匹配到 ETag ，或者收到了 “*” 值而当前并没有该资源实体则返回 `412` 。否则服务器直接忽略该字段（直接 `200 OK` 返回资源）。

#### 制定缓存策略

一般我们为了提高网站性能都会做客户端缓存，但是如果我们想更新或废弃缓存的响应需要怎么做呢？

![缓存策略](/img/http-cache-hierarchy.png)

我们来解读一下上面的示例：
- HTML 被标记为 `no-cache` ，这说明浏览器每次请求时都始终会重新验证文档，并在内容变化时获取最新版本。

- 将静态资源文件如 CSS、JS 文件设置 1 年后到期，当文件名的版本 ( md5 ) 的值变化时则重新下载 CSS 或 JS。JS 标记为 private，可能是因为它包含的某些用户私人数据是 CDN 不应缓存的。

- 图像缓存时不包含版本号，并设置为 1 天后到期。

 
# HTTP Cookies

> HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

每个 Cookie 所存放的数据不能超过 `4kb` 。如果 Cookie 字符串的长度超过 4kb ，则该属性将返回空字符串。

Cookie 主要用于三个方面：

- 回话状态管理（如用户登录状态、购物车或其他需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

#### 创建 Cookie

**Set-Cookie**

> Set-Cookie: <cookie名>=<cookie值>

服务器通过该头部告知客户端保存 Cookie 信息。

通过指定过期时间（Expires）或有效期（Max-Age）来设置`持久性 Cookie`。不设置则为`会话期 Cookie`，关闭浏览器便失效。

**Secure 和 HttpOnly**

标记为 `Secure` 的 Cookie 只能通过被 HTTPS 协议加密过的请求发送给服务端。不过敏感信息不应该通过 Cookie 传输。

通过 JavaScript 的 `Document.cookie` API 无法访问带有 `HttpOnly` 标记的 Cookie，它们只应该发送给服务端。 如果包含服务端 Session 信息的 Cookie 不想被客户端 JavaScript 脚本调用，那么就应该为其设置 `HttpOnly` 标记。**这样可以避免跨域脚本（XSS）攻击**。

示例：

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

**Domain 和 Path**

`Domain`和`Path`标识定义了 Cookie 的作用域：既 Cookie 应该发送给哪些 URL。
Domain 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了 Domain ，则一般包含子域名。

例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如 developer.mozilla.org）。

Path 标识指定了主机下的哪些路径可以接受 Cookie（该URL路径必须存在于请求URL中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。

**SameSite**

`SameSite` Cookie允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前 SameSite Cookie 还处于实验阶段，并不是所有浏览器都支持。

#### 客户端 JavaScript 操作 Cookie

通过`Document.cookie`属性可创建新的 Cookie ，也可通过该属性访问非`HttpOnly`标记的 Cookie 。

```javascript
document.cookie = "name=chen";
document.cookie = "age=24";
console.log(document.cookie);
// logs "name=chen; age=24" 中间通过“;”和一个空格分开
```

**写 Cookie**

```javascript
function setCookie(name, value, expDays) {
    var exp = new Date();
    exp.setDate(exp.getDate() + expDays);
    document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${exp.toGMTString()}`
}
```

**读取 Cookie**

```javascript
function getCookie(name){
    var arr, re = new RegExp(`(^|)${name}=([^;]*)(;|$)`);
    if(arr = document.cookie.match(re)) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}
```

**删除 Cookie**
```javascript
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var val = getCookie(name);
    if(val !== null) {
        document.cookie = `${name}=${val}; Expires=${exp.toGMTString()}`
    }
}
```

# URI

`URI`，Uniform Resource Identifier，统一资源标识符。URI 分为 `统一资源定位符 URL` 和 `统一资源名称 URN`。

#### URL

scheme 协议|host 主机名|port 端口|path 路径|search 查询参数|hash 片段
---|---|---|---|---|---
http://|hentaicracker.github.io|:8080|/index.html|?name=chen&age=24|#URL

**URL 编码**

URL 编码一般是为了处理请求参数中容易引起解析错误的情况。比如 querystring 中某个字段的值里包含了 ‘&’ 或 ‘=’ 字符。在这种情况下需要对其进行编码。

**encodeURI()**

encodeURI() 是对整个 URL 进行编码。不会对 **ASCII字母、数字、~ ! @ # $ & * ( ) = : , ; ? + '** 进行编码。

```javascript
encodeURI("http://hentaicracker.github.io/HTTP 协议");

// "http://hentaicracker.github.io/HTTP%20%E5%8D%8F%E8%AE%AE"

encodeURI("~!@#$&*()=:/,;?+'");
// "~!@#$&*()=:/,;?+'"
```

**encodeURIComponent()**

如果请求参数中带了另一个 URL，就不能使用 encodeURI 来为其编码了，因为 encodeURI 不会对 **: 和 /** 进行编码，就会出现服务器解析有歧义的情况。这个时候就需要使用 encodeURIComponent()。

它的作用是对 URL 中的**参数**进行编码，它仅仅不会对 **ASCII字母、数字、~ ! * ( ) '** 进行编码。

```javascript
var param = 'http://www.abc.com?t=123&a=456';
url = 'http://www.d.com?foo=' + encodeURIComponent(param);
// "http://www.d.com?foo=http%3A%2F%2Fwww.abc.com%3Ft%3D123%26a%3D456"
```

**解码**

`decodeURI()` 对应 `encodeURI()`；

`decodeURIComponent()` 对应 `encodeURIComponent()`。

两个方法不能用混，一一对应。

# HTTP 异步请求


# HTTP 跨域


# HTTP 小知识

- 使用 TCP 时，HTTP 服务器默认端口号是 `80` 。

- HTTP 每次连接只处理一个请求。

- HTTP 是无状态的协议。

# 参考资料
[超文本传输协议 - wikipedia](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)

[HTTP缓存 - Google Web Fundamentals](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn)

[HTTP缓存 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)

[彻底弄懂 http 缓存机制 - 腾讯 Bugly](https://zhuanlan.zhihu.com/p/24467558)