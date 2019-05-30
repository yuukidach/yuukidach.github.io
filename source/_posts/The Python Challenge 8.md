---
title: The Python Challenge Level-8 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, bz2]
date: 2016-09-18
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

这道题目消耗了我相当长的一段时间，让我对str和byte也有了一个新的认识。

首先还是老样子，进入网页源代码，看看里面有什么

首先引入眼帘的是一大串坐标代码，加上第七题的做法，很容易让人产生误会。我也试着去把他门转换了一下，发现并没有什么用处，然后就把目光集中在了里面的链接上，点了一下，需要用户名和密码，随便输入了123,并没有什么效果

再看看源代码底部有'un'和'pw'，刚好两个，而且和'user name' 'password'相对应。
但是这两串字符又有什么意义呢？

我查了一下，发现这实际上是经bz2压缩后的信息，于是开始编写程序解码
```
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

import bz2

un = b"BZh91AY&SYA\xaf\x82\r\x00\x00\x01\x01\x80\x02\xc0\x02\x00 \x00!\x9ah3M\x07<]\xc9\x14\xe1BA\x06\xbe\x084"
pw = b"BZh91AY&SY\x94$|\x0e\x00\x00\x00\x81\x00\x03$ \x00!\x9ah3M\x13<]\xc9\x14\xe1BBP\x91\xf08"
print(bz2.decompress(un))
print(bz2.decompress(pw))
```
得到用户名和密码就能进入下一关了
