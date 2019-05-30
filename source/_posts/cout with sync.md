---
title: std::ios_base::sync_with_stdio()
date: 2016-9-22
categories: [编程学习, C/C++]
tag: [C/C++, io]
---
# **std::ios_base::sync_with_stdio()**
今天在做OJ的时候意外地发现printf和cout的输出顺序和代码顺序不一样，如下
```C++
printf("Case Number %d: ", ++cas);
if(takeTime[0][1] >= 0x3f3f3f3f) cout << "impossible\n";
else cout << takeTime[0][1] << '\n';
```
得到的输出却是
```
impossible
impossible
impossible
Case Number 1: Case Number 2: Case Number 3: 
```
后来仔细地看了看，才发现问题是出在ios_base::sync_with_stdio()这个函数上。

这个函数当我们填入false的值时，相当于把C和C++的输入输出流解绑了，那么cout就能够拥有自己的缓冲区。如果我们去掉解绑的话，那么我们就会看到结果变得和我们预想的是一样了。
```
Case Number 1: impossible
Case Number 2: impossible
Case Number 3: impossible
```
所以将C++和C的输入输出流同步，是一种比较安全的方式，不要滥用ios_base::sync_with_stdio()

# **cin.tie()**
还有一个值得一提的就是cin.tie().

和sync_with_sdtio类似，cin.tie()也是为了让输入输出变得比较安全的方式。当我们填入NULL或者0解绑之后，对于
```C++
cout << "Enter name:";
cin >> name;
```
就会发现，是先输入，再输出'Enter name:'

这是因为解绑了输入输出之后cout需要在缓冲区写入之后才能执行

# 参考
1. [Significance of ios_base::sync_with_stdio(false); cin.tie(NULL)](http://stackoverflow.com/questions/31162367/significance-of-ios-basesync-with-stdiofalse-cin-tienull)

