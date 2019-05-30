---
title: The Python Challenge Level 9-10 Solutions
categories: [Programming Exercises, The Python Challenge]
tag: [Python, re, PIL]
date: 2016-09-19
toc: true
---
先附上我在Github上存放的代码仓库: [The Python Challenge](https://github.com/yuukidach/The-Python-Challenge)

# **Level 9**
第九关树的图片其实是一个提示，就是要我把点一个个的连起来，而这个点是由网页源代码里注释的first和second部分给出的，我直接把两个部分的坐标提取到一起，能够得到一个牛的图片
```Python
import requests
import re
from PIL import Image, ImageDraw

webUrl = 'http://www.pythonchallenge.com/pc/return/good.html'
webContent = requests.get(webUrl, auth=('huge','file')).text
print(webContent)
pattern = re.compile(r"(\d{2,3})")
nums = re.findall(pattern, webContent)
nums = list(map(int,nums))
nums.remove(nums[0])
nums.remove(nums[0])
print(nums)
img = Image.new('RGB', (800,800))
draw = ImageDraw.Draw(img)
draw.polygon(nums, 'white')
img.show()
```
这里最先发应的是'cow'这个单词，输入后提示我们是公的。于是再输入'ox'，结果还是不对。输入'bull'就对了

# **Level 10**
这一关简单明了，就是找规律（然而渣渣的我还是找了很久）

可以发现，后一个数实际上是前一个数的读法，比如
```
a[0] = 1
a[1] = 1个1 # 11
a[2] = 2个1 # 21
# 以此类推
```
```Python
a, sub = '1', ''
for i in range(30):
    j = k = 0
    while j < len(a):
        while k < len(a) and a[k] == a[j]: 
            k += 1
        sub += str(k-j) + a[j]
        j = k
    a, sub = sub, ''
print(len(a))
```
最后结果是5808
