---
title: 使用 docker-osx 搭建 macos 构建环境
date: 2021-12-20 10:13:12
tags:
    - Docker
---

前提条件：

一台支持 CPU 虚拟化（在 BIOS 中开启），磁盘大于 100 G 的电脑。

步骤：

1.准备一个 centos 7/8 的环境（kernel内核版本超过 4.0）

2.安装 docker 并启动
```shell
# sudo systemctl daemon-reload
sudo systemctl restart docker
```

3.安装 QEMU 和 KVM 环境
```shell
sudo yum install libvirt qemu-kvm
```

4.加载 libvirt 和 KVM 模块
```shell
sudo systemctl enable --now libvirtd
sudo systemctl enable --now virtlogd

echo 1 | sudo tee /sys/module/kvm/parameters/ignore_msrs

sudo modprobe kvm
```

5.拉取已提前安装好的 macOS(Catalina) 镜像
```shell
# 40GB disk space required: 20GB original image 20GB your container.
docker pull sickcodes/docker-osx:auto

# boot directly into a real OS X shell with a visual display [NOT HEADLESS]
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    sickcodes/docker-osx:auto

# username is user
# passsword is alpine
```

6.进入 macOS 系统配置服务，安装 xcode-select/Sketch/Node.js/PM2


7.编写 shell 启动脚本，启动 docker 时加上 OSX_COMMANDS 参数
```shell
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \ # 可视化界面需要
    -e "DISPLAY=${DISPLAY:-:0.0}" \ # 可视化界面需要
    -e "OSX_COMMANDS=/bin/bash -c \"put your commands here\"" \ # 自动执行脚本
    -v "${PWD}/mac_hdd_ng.img:/image" \ # 跑已存在的镜像
    sickcodes/docker-osx:auto
```

此步骤执行 pm2 start 命令时报错，pm2 command not found。在 container 内改为 pm2 startup 系统启动时就启动服务。


8.设置自动登录
```shell
defaults write com.apple.loginwindow autoLoginUser -bool true
defaults write com.apple.loginwindow autoLoginWindow -string "user"
```

9.禁止锁屏
```shell
defaults write com.apple.loginwindow DisableScreenLock -bool true
```

10.在配置的 Container 基础上制作新镜像
```shell
docker ps -all
docker commit <container id> <new image name>

# 跑新的镜像
docker run \
    --device /dev/kvm \
    --device /dev/snd \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    newImageName

```

或：

找到对应的镜像文件进行移植

```
sudo find /var/lib/docker -size +10G | grep mac_hdd_ng.img
```
使用 naked 启动

```
sudo docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -p 8080:8080 \
    -v "${PWD}/mac_hdd_ng.img:/image" \
    -e ADDITIONAL_PORTS='hostfwd=tcp::8080-:8080,' \
    sickcodes/docker-osx:naked
```

或：

通过 contaienr 导出镜像文件
```shell
#首先查看容器 ID
docker ps -a

# 使用 docker export 命令将容器导出成一个文件
docker export <containerid> > yourimage.tar

# 在服务器中使用 docker import 导入镜像
docker import - yourimage < yourimage.tar
```

直接 run 该镜像

```shell
docker run -it \
    --device /dev/kvm \
    -p 50922:10022 \
    -p 8080:8080 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    -e ADDITIONAL_PORTS='hostfwd=tcp::8080-:8080,' \
    yourimage
```



问题：kernel too old

解决：更新 centos kernel 内核 https://cloud.tencent.com/developer/article/1472857

问题：gtk initialization failed

解决：安装 xhost https://github.com/sickcodes/Docker-OSX/issues/7

问题：macOS 安装完成后无法 reboot 

解决：手动重启 docker


