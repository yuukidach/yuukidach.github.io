---
title: The Python Challenge Level-2 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python]
date: 2016-09-17
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

The Python Challenge第二关给了我们一张书的图片，但是十分模糊的，什么都看不清，这个时候，我们看看它给我们的文字提示是

> MAYBE they are in the page source.

这个时候我们点击鼠标右键，查看网页的源代码，会发现，果然有一大长条乱七八糟的符号。不难猜到，我们所需要的下一关的url就藏在这堆符号里。于是我们用简单的爬虫爬取网页代码，然后利用正则表达式来捕捉我们需要的字母。
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

from urllib import request
import re

pyUrl = "http://www.pythonchallenge.com/pc/def/ocr.html"
req = request.Request(pyUrl)
resq = request.urlopen(req)
content = resq.read()
book = re.compile(b"<!--(.*?)-->", re.S)
bookContents = re.findall(book, content)
wordsCmpl = re.compile(b"([ a-zA-Z])", re.S)
for bookContent in bookContents: 
    words = re.findall(wordsCmpl, bookContent)
    code = ""
    for word in words:
        code += word.decode("ascii")
    print(code)
```

这里只要注意一下编码的方式就好。

运行代码，我们可以得到如下信息
```
find rare characters in the mess below
equality
```
将equality输入到url就能进入下一关了
