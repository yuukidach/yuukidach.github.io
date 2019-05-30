---
title: The Python Challenge Level-7 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, BytesIO, requests, PIL]
date: 2016-09-18
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

这道题目网页源代码里没有什么别的提示，而图片中有个条形码类似物，那么就需要我们对图片进行处理了。先想办法把条形码读出来,并且转换成可读的文字
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-

from PIL import Image
from io import BytesIO
import requests

imgUrl = 'http://www.pythonchallenge.com/pc/def/oxygen.png'
img = Image.open(BytesIO(requests.get(imgUrl).content))
for i in range(img.width):
    midPixel = img.getpixel((i,img.height>>1))
    print(midPixel)
```
得到结果以后我们可以发现，条形码中没一条的宽度是7个像素，所以我们可以再处理一下，把相同的条形码rgb值取一个即可。另外还要注意的是，条形码没有覆盖全部的图片，最后无序的rgb值需要删掉，所以改进一下代码
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

from PIL import Image
from io import BytesIO
import requests

imgUrl = 'http://www.pythonchallenge.com/pc/def/oxygen.png'
img = Image.open(BytesIO(requests.get(imgUrl).content))
midPixel = [img.getpixel((i,img.height>>1)) for i in range(0,img.width,7)]
code = [r for r, g, b ,a in midPixel if r==g==b]
print("".join(map(chr,code)))
```
得到提示
```
smart guy, you made it. the next level is [105, 110, 116, 101, 103, 114, 105, 116, 121]
```
再对给出的数字进行处理，就能得到‘integrity’
