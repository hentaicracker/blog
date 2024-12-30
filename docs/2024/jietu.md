---
title: 长截图生成实践
date: 2024-11-24 10:13:12
tags:
    - python、opencv
---

如何把 App 截图合成一张长截图？

简单思路介绍：
长截图不能将几张截图简单的拼凑起来，需要通过找到各个截图中的相同部分合并下一个截图，不断重复，最终合成一张长图。这里合并两张图时需要根据相同区域的高度去进行图片的位移，然后让两张图的相同区域刚好重叠在一起，这样便完成了图片合并的操作。

## 有效区域
在对 App 截屏时会发现滚动到一些中间楼层时，一般情况下「顶部导航栏」与「底部导航栏」都是固定不变的内容，以及一些浮动的元素，会跟着用户的滑动而滑动，如图：

![图 1](https://img12.360buyimg.com/img/jfs/t1/257506/23/5752/138634/67729388Fa4cfb890/9976cfdf089aa602.png)

这是某电商 App 上的一张截图，可以看到「顶部导航栏」与「底部导航栏」都是固定的，同时还有一些「会场浮层」固定在右下角的位置。

这些区域是每张截图不变的内容，合并的过程需要将它们都忽略掉，于是乎有效区域就只有中间的绿色区域。我们可以把绿色区域抽象理解成一个 App 视口，在对图片进行拼接的时候，只需要截取视口内容里的部分。

## 滚动截屏

由于视口高度（有效区域高度）限制，每次滚动的高度必须要小于视口高度，不然无法找到各个截图的相同部分，也就无法合并截图。当我们确定了视口高度以及相同区域的高度，也就确定了滚动高度，如图：
![图 2](https://img20.360buyimg.com/img/jfs/t1/258815/24/5760/65988/677293b0Fa0b00e15/a47e21f747233185.png)

这里从某电商 App 上截取了四张手机截图，尝试将它们合成一张图：

![图 3](https://img11.360buyimg.com/img/jfs/t1/257223/23/5513/253361/677293c8Fbb4b3dff/560b9fdaa97688bb.png)

## 裁剪图片

裁剪图片主要是将截图的有效区域裁剪出来，用于图片拼接，这里只需要根据视口的位置和高度进行裁剪即可，需要注意的是第一张图需要保留有效区域以上的区域，最后一张图保留有效区域以下的区域。

![图 4](https://img13.360buyimg.com/img/jfs/t1/255989/23/6716/159104/677293ddF4f5bef2f/ea98875226fbbe3b.png)


## 特征匹配

前面提到拼合图片需要找到两张图片的相同区域，根据相同区域匹配并计算出两张图片重合区域的高度，拿到重合区域高度就可以通过平移位置将图片重叠在一起。

如何查找图像的相同区域？这里使用了**特征匹配**。特征匹配是一种在计算机视觉和图像处理领域中常用的技术，旨在识别和匹配不同图像中的相似特征。常用的算法有**SIFT**、**SURF**、**ORB**。在这里我们使用**SIFT**（Scale-Invariant Feature Transform）算法，它的特点是匹配精度高，非常适合我们这个场景。

```python
sift = cv2.SIFT_create()
keypoints1, descriptors1 = sift.detectAndCompute(gray1, gray1_mask)
keypoints2, descriptors2 = sift.detectAndCompute(gray2, gray2_mask)
```

在这里，对两个图像进行 SIFT 特征点检测，`gray1`和`gray2`分别对应前后两张图（灰度图），得到`descriptors1`和`descriptors2`两张图片的描述符。同时，可以通过传入`gray1_mask`和`gray2_mask`（也就是 gray1 和 gray2 的 mask） 缩小检测范围，提高检测效率：
![图 5](https://img13.360buyimg.com/img/jfs/t1/253546/29/6760/165369/677293f0F37384f72/db19d499b290a2d4.png)

接着进行特征点匹配：

```python
# 使用 BFMatcher（暴力匹配器） 进行特征匹配
bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
matches = bf.match(descriptors1, descriptors2)
```

![图 6](https://img14.360buyimg.com/img/jfs/t1/258763/3/5754/387664/6772942eF7b736e4e/e0aa80639c79a55c.png)

## 图像变换

通过特征匹配得到了精确的匹配点，那要后如何计算重叠区域的高度呢？这里我们可以根据两张图的匹配点估计出一个平移变换矩阵，通过矩阵直接进行平移变换。

```python
# 估计平移矩阵
H, mask = cv2.estimateAffinePartial2D(points2, points1)
```

得到矩阵`H`，应用到图 2 中：

```python
# 应用平移变换
height, width = image1.shape[:2]
result = cv2.warpAffine(image2, H, (width, height + image2.shape[0]))
```

最后将图 1 拼合到矩阵变换后的图 2 中：

```python
result[0:height, 0:width] = image1
```

![图 7](https://img12.360buyimg.com/img/jfs/t1/268454/6/5608/98848/6772944fF26819426/2804522beb4ce72c.png)

最后，便得到了一张拼接好的图，此时只要将图片底部的黑边去掉即得到最后的拼接图。

## 最终结果

完成以上图片拼接流程后，将上一次拼接好的图和下一张截图继续按照以上流程拼合，拼合到最后一张底部图即完成该页面的长截图生成。

![图 8](https://img14.360buyimg.com/img/jfs/t1/256249/2/6820/633108/67729464F758718f6/c0144cb45c2c8b9e.png)

