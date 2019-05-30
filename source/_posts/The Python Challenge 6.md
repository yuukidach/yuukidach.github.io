---
title: The Python Challenge Level-6 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python , zipfile]
date: 2016-09-17
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

这道题目开始让人很迷茫了（至少我是这样），先点开网页源码，没发现什么有价值等东西，然后又看看图片，发现右上角有个箭头，指着几个数字3，于是照着填进去了，发现没有链接，于是又跑去看源码，终于在开头发现了这个：
```
<!-- <-- zip -->
```
于是将'.html'替换成'.zip'，居然下载下来了一个压缩包，点开之后会发现有一个readme.txt，再继续点开，内容如下：
```
welcome to my zipped list.

hint1: start from 90052
hint2: answer is inside the zip
```
很明显，和前几题一样，就是按照90052这个数字找下去了，不过这次找的不是网页，而是文件。这里我们用zipfile这个模块来完成我们的需求
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

import zipfile
import re

zipFileName= 'channel.zip'
zipBag = zipfile.ZipFile(zipFileName)
num = '90052'
while True:
    zipContent = zipBag.read(num+".txt").decode("utf-8")
    print(zipContent)
    content = re.search("(\d+)", zipContent)
    if content == None:
        break
    num = content.group()
```
运行代码，会发现有以下信息：
```
Collect the comments.
```
恰好室友前几天提到zip压缩包的一些相关事项，再配合上一题，于是我将代码稍作更改，把文件里等注释等内容全部读出来
```
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

import zipfile
import re

zipFileName= 'channel.zip'
zipBag = zipfile.ZipFile(zipFileName)
num = '90052'
comment = ''
while True:
    zipContent = zipBag.read(num+'.txt').decode('utf-8')
    print(zipContent)
    comment += zipBag.getinfo(num+'.txt').comment.decode('utf-8')
    content = re.search("(\d+)", zipContent)
    if content == None:
        break
    num = content.group()
print(comment)
```
```
****************************************************************
****************************************************************
**                                                            **
**   OO    OO    XX      YYYY    GG    GG  EEEEEE NN      NN  **
**   OO    OO  XXXXXX   YYYYYY   GG   GG   EEEEEE  NN    NN   **
**   OO    OO XXX  XXX YYY   YY  GG GG     EE       NN  NN    **
**   OOOOOOOO XX    XX YY        GGG       EEEEE     NNNN     **
**   OOOOOOOO XX    XX YY        GGG       EEEEE      NN      **
**   OO    OO XXX  XXX YYY   YY  GG GG     EE         NN      **
**   OO    OO  XXXXXX   YYYYYY   GG   GG   EEEEEE     NN      **
**   OO    OO    XX      YYYY    GG    GG  EEEEEE     NN      **
**                                                            **
****************************************************************
 **************************************************************
```
再将hockey输入，居然还有一个猜谜！
```
it's in the air. look at the letters.
```
这里不难想到'oxygen'，输入即可
