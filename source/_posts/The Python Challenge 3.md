---
title: The Python Challenge Level-3 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, 正则表达式, urllib]
date: 2016-09-17
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

这里按照题目意思，利用正则匹配，找到恰好分别被三个大写字母包在左右的小写字母就好
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

from urllib import request
import re

pyUrl = 'http://www.pythonchallenge.com/pc/def/equality.html'
req = request.Request(pyUrl)
resp = request.urlopen(req)
urlContent = resp.read()
pattern = re.compile(b'[^A-Z][A-Z]{3}([a-z])[A-Z]{3}[^A-Z]', re.S)
contents = re.findall(pattern, urlContent)
code = ''
for content in contents:
    code += content.decode("ascii")
print(code)
```
得到linkedlist，输入到url中，得到提示
```
linkedlist.php
```
把'.html'的后缀改成'.php'就通关了
