---
title: The Python Challenge Level-11 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, PIL]
date: 2016-09-20
toc: true
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

这个题目感觉就很玄乎了，就只给我们一张图片，网页源码里空空如也

这里实际上是把一张图片拆分成两张来看。

我尝试了不同的奇偶拆分方式，最终还是选定了X轴和Y轴相加的方式来判断奇偶

```Python
from io import BytesIO
from PIL import Image
__author__ = 'Yuuki_Dach'

img = Image.open('cave.jpg')
width, height = img.size
even = Image.new('RGB', (width >> 1, height >> 1))
odd = Image.new('RGB', (width >> 1, height >> 1))
for i in range(width):
    for j in range(height):
        imgPixel = img.getpixel((i, j))
        if (i + j) & 1 == 1:
            odd.putpixel((i >> 1, j >> 1), imgPixel)
        else:
            even.putpixel((i >> 1, j >> 1), imgPixel)
even.show()
odd.show()
```
