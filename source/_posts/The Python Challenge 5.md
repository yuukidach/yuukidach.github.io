
---
title: The Python Challenge Level-5 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, 正则表达式, urllib]
date: 2016-09-17
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

先看提示:
```
pronounce it 
```
再看看网页源码，'peak hell'能代表什么？

我一开始以为是'pick'什么东西，点开'banner.p'之后没发现什么规律，于是先google了一下'peak hell'，发现了Python有pickle这么一个模块，那么就必然和这个有关系了。

pickle这个模块是python用来保存数据的，主要是loads和dumps方法的运用（这两个是对内存进行操作，如果要对硬盘进行操作，形成文件等形式，就是用load和dump），一个是读，一个是写，这里因为是直接从网页中获取数据，所以只要读就行了。

读完能发现这实际上是一个list组，再仔细点观察的话，就会注意到每一个[]中，把' '和'#'后跟着的数字加起来，恰好是95。于是可以估计，这应该是利用点阵的方式来进行显示，而点阵的一行，有95个字符。这样就有了如下代码：
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

from urllib import request
import pickle

pyUrl = 'http://www.pythonchallenge.com/pc/def/banner.p'
req = request.Request(pyUrl)
resp = request.urlopen(req)
urlContent = resp.read()
code = []
pic = pickle.loads(urlContent)
for line in pic:
    for letter, num in line:
        code.append(num*letter)
    code.append('\n')
print("".join(code))
```
运行之后得到的点阵图是
```

                                                                                               
              #####                                                                      ##### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
      ###      ####   ###         ###       #####   ###    #####   ###          ###       #### 
   ###   ##    #### #######     ##  ###      #### #######   #### #######     ###  ###     #### 
  ###     ###  #####    ####   ###   ####    #####    ####  #####    ####   ###     ###   #### 
 ###           ####     ####   ###    ###    ####     ####  ####     ####  ###      ####  #### 
 ###           ####     ####          ###    ####     ####  ####     ####  ###       ###  #### 
####           ####     ####     ##   ###    ####     ####  ####     #### ####       ###  #### 
####           ####     ####   ##########    ####     ####  ####     #### ##############  #### 
####           ####     ####  ###    ####    ####     ####  ####     #### ####            #### 
####           ####     #### ####     ###    ####     ####  ####     #### ####            #### 
 ###           ####     #### ####     ###    ####     ####  ####     ####  ###            #### 
  ###      ##  ####     ####  ###    ####    ####     ####  ####     ####   ###      ##   #### 
   ###    ##   ####     ####   ###########   ####     ####  ####     ####    ###    ##    #### 
      ###     ######    #####    ##    #### ######    ###########    #####      ###      ######
                                                                                               

```
大家请把终端的宽度拉大一点，不然会和我一开始一样，读不出什么东西来，并且怀疑是不是程序写错了 =_=

接下来就是把channel输入到url中了
