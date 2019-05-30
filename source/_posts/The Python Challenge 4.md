---
title: The Python Challenge Level-4 Solution
categories: [Programming Exercises, The Python Challenge]
tag: [Python, 正则表达式, urllib]
date: 2016-09-17
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

依然是先查看网页源代码。发现有个链接'...nothing=12345'

点进去之后发现又给我们一个数字，引导我们去下一个链接，于是可以知道，只要链接爬到了终点，那么就会出现别的提示信息

果然，爬到终点之后，提示我们除以二，继续爬，所以只要把代码改个数字就好，我的代码如下：
```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = 'Yuuki_Dach'

from urllib import request
import re

mainUrl = 'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing='
subUrl = '8022' # first try is '12345'
subUrl2 = '' 
i = 400
while subUrl != subUrl2:
    subUrl2 = subUrl
    pyUrl = mainUrl + subUrl
    req = request.Request(pyUrl)
    resp = request.urlopen(req)
    urlContent = resp.read()
    pattern = re.compile(b'\d+', re.S)
    contents = re.findall(pattern, urlContent)
    for content in contents:
        subUrl = content.decode("ascii")
    print(subUrl)
```
最后得到'peak'。只不过注意后缀要改回'.html'就行了
