---
title: The Python Challenge Level 0-1 Solutions
date: 2016-09-17
categories: [Programming Exercises, The Python Challenge]
tag: [Python]
toc: true
---
前两天听说了有The Python Chanllenge这么一个游戏，于是自己也想来尝试一下。感觉还是一个挺有意思的。

附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

# **Challenge 0**
第0关只是一个让你大概清楚怎么玩的一个关卡，只要按照图片上的意思，计算2的38次方即可。这个就无所谓是用Python还是别的什么方式来计算了，能够得到结果就行，所以代码就不贴出来了。

算出结果之后，将结果复制到网页的url栏,将.html前面的单词替换掉就好

# **Challenge 1**
根据图片给的提示我们可以发现，从K到M，O到Q，以及E到G，都是把单词给推后了两个。所以，我们只需要把他底下给我们的一大串字符串给统一推后两个字母就行了。另外要注意y要对应a,z则对应b。下面是我的初版代码:
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-

code = ("g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dm"
        "p. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq "
        "qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc"
        " spj.")
addr = ""

for alpha in code:
    if alpha!=' ' and alpha!='.' and alpha!='\'' and alpha!='(' and alpha!=')':
        if alpha == 'y':
            alpha = 'a'
        elif alpha == 'z':
            alpha = 'b'
        else:
            alpha = chr(ord(alpha)+2)
    addr += alpha 

print(addr)
```
还是比较简单直接的。提取到的结果如下：
> i hope you didnt translate it by hand. thats what computers are for. doing it in by hand is inefficient and that's why this text is so long. using string.maketrans() is recommended. now apply on the url.

这里提示我们可以用string.maketrans()来提高效率。所以，我们再码一遍代码，利用maketrans（）使代码变得更加简洁和美观。
```Python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-

code = ("g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dm"
        "p. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq "
        "qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc"
        " spj.")

intab = "abcdefghijklmnopqrstuvwxyz"
outtab = "cdefghijklmnopqrstuvwxyzab"
transtab = "".maketrans(intab,outtab)

print(code.translate(transtab))
```

需要注意的是，maketrans()到了python3中就直接包含在str类的方法中了,如果是Python2的话记得import对应的模块。

最后只要按照提示，把关卡1url里的‘map’也对应向后推两个字母，变成'ocr'就好了
