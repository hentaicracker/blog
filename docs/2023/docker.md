---
title: 使用 Docker 搭建开发环境
date: 2023-01-19 10:13:12
tags:
    - Docker
---

最近在工作中遇到了一些麻烦的环境问题：在安装 [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs) 这个 `npm` 包时老是安装不成功，主要问题是该包依赖 `OpenCV` 这个基于 `C++` 的图像处理库，并且 `OpenCV` 依赖了一些更底层的 `C` 相关的编译库，另外安装这个包时还要编译 `Node.js addon`，如果当前系统里有相应工具链版本不支持的情况就会失败。

谷歌了很多解决办法，最后依旧无效，在弹尽粮绝之时，索性换了一种思路来解决这个问题：使用 `Docker` 跑该服务。`Docker` 天然就是为了抹平环境差异而生的，并且可以模拟生产环境，用它来跑开发环境是一个非常不错的选择。

## 场景分析

当前的业务开发场景是：通过 `opencv4nodejs` 借助 `OpenCV` 的能力输出一个图像处理的 `Node.js` 服务。需要考虑的几个问题有：
 
  1. docker 起的服务需要暴露端口给到本地应用访问；
  2. 本地源文件实时修改能映射到 docker 容器中去并重启服务；

也就是需要让 docker 将端口以及某个工作目录映射到本地工作目录。

## 镜像构建

首先构建 opencv4nodejs docker 镜像，这里参考原作者做的 [docker 镜像](https://github.com/justadudewhohacks/opencv4nodejs-docker-images/blob/master/opencv-nodejs/Dockerfile)：

首先构建一个基础镜像，基于 ubuntu 16.04 安装 OpenCV、Node.js 以及 opencv4nodejs、pm2 全局依赖，基础镜像 Dockerfile：
```Dockerfile
FROM ubuntu:16.04

ARG OPENCV_VERSION
ARG NODEJS_MAJOR_VERSION
ARG WITH_CONTRIB

ENV OPENCV4NODEJS_DISABLE_AUTOBUILD=1

# 设置国内源
RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get clean

RUN apt-get update && \
  apt-get install -y build-essential curl && \
  apt-get install -y --no-install-recommends wget unzip git python cmake && \
  curl -sL https://deb.nodesource.com/setup_${NODEJS_MAJOR_VERSION}.x | bash && \
  apt-get install -y nodejs --allow-unauthenticated && node -v && npm -v && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir opencv && \
  cd opencv && \
  wget https://github.com/Itseez/opencv/archive/${OPENCV_VERSION}.zip --no-check-certificate -O opencv-${OPENCV_VERSION}.zip && \
  unzip opencv-${OPENCV_VERSION}.zip && \
  if [ -n "$WITH_CONTRIB" ]; then \
  wget https://github.com/Itseez/opencv_contrib/archive/${OPENCV_VERSION}.zip --no-check-certificate -O opencv_contrib-${OPENCV_VERSION}.zip; \
  unzip opencv_contrib-${OPENCV_VERSION}.zip; \
  fi && \
  mkdir opencv-${OPENCV_VERSION}/build && \
  cd opencv-${OPENCV_VERSION}/build && \
  cmake_flags="-D CMAKE_BUILD_TYPE=RELEASE \
  -D BUILD_EXAMPLES=OFF \
  -D BUILD_DOCS=OFF \
  -D BUILD_TESTS=OFF \
  -D BUILD_PERF_TESTS=OFF \
  -D BUILD_JAVA=OFF \
  -D BUILD_opencv_apps=OFF \
  -D BUILD_opencv_aruco=OFF \
  -D BUILD_opencv_bgsegm=OFF \
  -D BUILD_opencv_bioinspired=OFF \
  -D BUILD_opencv_ccalib=OFF \
  -D BUILD_opencv_datasets=OFF \
  -D BUILD_opencv_dnn_objdetect=OFF \
  -D BUILD_opencv_dpm=OFF \
  -D BUILD_opencv_fuzzy=OFF \
  -D BUILD_opencv_hfs=OFF \
  -D BUILD_opencv_java_bindings_generator=OFF \
  -D BUILD_opencv_js=OFF \
  -D BUILD_opencv_img_hash=OFF \
  -D BUILD_opencv_line_descriptor=OFF \
  -D BUILD_opencv_optflow=OFF \
  -D BUILD_opencv_phase_unwrapping=OFF \
  -D BUILD_opencv_python3=OFF \
  -D BUILD_opencv_python_bindings_generator=OFF \
  -D BUILD_opencv_reg=OFF \
  -D BUILD_opencv_rgbd=OFF \
  -D BUILD_opencv_saliency=OFF \
  -D BUILD_opencv_shape=OFF \
  -D BUILD_opencv_stereo=OFF \
  -D BUILD_opencv_stitching=OFF \
  -D BUILD_opencv_structured_light=OFF \
  -D BUILD_opencv_superres=OFF \
  -D BUILD_opencv_surface_matching=OFF \
  -D BUILD_opencv_ts=OFF \
  -D BUILD_opencv_xobjdetect=OFF \
  -D BUILD_opencv_xphoto=OFF \
  -D CMAKE_INSTALL_PREFIX=/usr/local" && \
  if [ -n "$WITH_CONTRIB" ]; then \
  cmake_flags="$cmake_flags -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-${OPENCV_VERSION}/modules"; \
  fi && \
  curl https://raw.githubusercontent.com/opencv/opencv_3rdparty/34e4206aef44d50e6bbcd0ab06354b52e7466d26/boostdesc_bgm.i > ../../opencv_contrib-${OPENCV_VERSION}/modules/xfeatures2d/src/boostdesc_bgm.i && \
  echo $cmake_flags && \
  cmake $cmake_flags .. && \
  make -j $(nproc) && \
  make install && \
  sh -c 'echo "/usr/local/lib" > /etc/ld.so.conf.d/opencv.conf' && \
  ldconfig && \
  cd ../../../ && \
  rm -rf opencv && \
  npm install -g opencv4nodejs pm2 --unsafe-perm
```

在基础镜像 Dockerfile 同级目录执行：
```
docker build -t ubuntu16.04-opencv3.4.1-node14 --build-arg OPENCV_VERSION=3.4.1 --build-arg WITH_CONTRIB=1 --build-arg NODEJS_MAJOR_VERSION=14 .
```

至此，等待几分钟便制作好了基础的 `ubuntu16.04-opencv3.4.1-node14` 镜像，接下来构建服务镜像。

构建服务镜像 Dockerfile：
```Dockerfile
FROM ubuntu16.04-opencv3.4.1-node14

RUN npm config set unsafe-perm=true --global

WORKDIR /app

COPY . .

ENV NODE_PATH=/usr/lib/node_modules

# 设置 npm 私服
RUN npm config set registry="http://registry.m.jd.com/"
RUN npm i --production

# 工作目录，映射卷
VOLUME [ "/app/build" ]

ENTRYPOINT npm run start && \
  sleep 9999999d
```

在服务镜像 Dockerfile 同级目录执行：

```
docker build -t cv-service .
```

至此，便得到了最终的服务镜像。

## 跑服务

镜像制作好了，开始跑服务，这里需要将服务端口映射到本地端口，同时映射工作目录到本地目录：

```
docker run -p 8080:8080 cv-service --mount type=bind,source=/Users/chenjunsheng/Documents/projects/sem/image-cropper/packages/server/build,target=/app/build
```

服务启动之后，发现端口映射没问题，不过本地文件修改后，服务没有生效。

那只能跑到镜像里查看一下问题的所在，先查看一下当前跑的 docker container:

```
docker ps

>

CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS                    NAMES
0e7c44db4548   cv-service   "/bin/sh -c 'npm run…"   7 seconds ago   Up 6 seconds   0.0.0.0:8080->8080/tcp   CV
```

拿到当前跑的 CONTAINER ID ，进入 container 内部查看日志：

```
docker exec -it 0e7c44db4548 bash
```

进入 container 内部后，查看 pm2 输出的日志:

```
pm2 logs
```

然后本地目录修改代码，查看服务日志，最后发现是服务没有监听到文件变化，需要修改 pm2 配置：
```json
{
  "apps": [
    {
      "name": "xxx",
      "script": "build/index.js",
      "cwd": "./",
      "log": "/export/xxx.log",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error": "/export/xxx-err.log",
      "output": "/export/xxx-out.log",
      "max_memory_restart": "1536M",
      "watch": true, // 设置监听
      "autorestart": true, // 设置自动重启
      "node_args": [],
      "env": {
        "PORT": "8080"
      }
    }
  ]
}
```

修改后重启 pm2 服务即生效。

### 使用 docker-compose

同时也可以使用 docker-compose 进行端口映射和数据卷映射，`docker-compose.yml` 配置如下:

```yml
version: '3.0'
services:
  cv:
    container_name: CV
    image: cv-service
    ports:
      - '8080:8080'
    volumes:
      - './packages/server/build:/app/build/'
```

至此，opencv4nodejs 安装不成功的问题便解决了，唯一不足的是，不能实时 debug 代码，只能在服务中打日志来测试。（开个脑洞：能否通过开个 debug 端口映射到本地编辑器呢，猜测可以。

## docker 常用操作

拉取镜像：
```
docker pull <镜像名称>:<版本>
```

构建镜像：
```
docker build -t <镜像名> --build-arg <参数key>=<参数value> .
```

本地镜像列表：
```
docker images
```

删除镜像：
```
docker image rm <镜像ID>

# 强制删除
docker rmi -f <镜像ID>
```

启动容器：
```
# 将主机 3000 端口映射到容器内 8080 端口
# 将本地目录挂载到容器目录
docker run -p 3000:8080 cv-service --mount type=bind,source=/Users/chenjunsheng/Documents/projects/smartcode/opencv-service/build,target=/app/build

# 启动一个容器 bash
docker run -i -t centos7 /bin/bash
```

查看容器列表：
```
docker container ls

docker ps
```

停止容器：
```
docker container stop <容器ID>

docker stop <容器ID>
```

重启容器：
```
docker container restart <容器ID>
```

进入容器内：
```
docker exec -it <容器ID> bash
```

复制容器内文档：
```
# 从本地复制到容器
docker cp <本地文件路径> <容器ID>:<容器路径>

# 从容器复制到本地
docker cp <容器ID>:<容器路径> <本地文件路径>
```

### docker-compose

启动服务：

```
# -d 表示在后台运行
docker-compose up -d
```

停止服务：
```
docker-compose down
```

