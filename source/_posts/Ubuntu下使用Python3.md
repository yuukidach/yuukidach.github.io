---
title: Ubuntu下使用Python3
date: 2016-09-14
categories: [编程学习, Ubuntu]
tag: [Ubuntu, Python]
---

这篇文章算是给初次在Ubuntu上使用Python编程的人一个提醒吧。  

# **使用方法**

首先我们要知道Ubuntu自带的是Python2，然而有很多人(比如我)在学习Python的时候希望使用Python3  

我们先使用
```
sudo apt install python3
```
老版本Ubuntu请将 'apt' 改为 'apt-get'

安装好了Python3之后，我们想在终端中直接使用Python3，可是当我们输入 'python'之后，却发现还是Python2。这个时候其实很简单，只要在 'python'后面加个 '3' 就好，具体如下:
```
python3 cmd
```
cmd 是你自己的指令。这个时候我们就是使用Python3了

# **Warning！！！**
不过我要说的不只是这些，而是这篇文章：[在Ubuntu中安装Python3](http://www.cnblogs.com/windinsky/archive/2012/09/25/2701851.html)   

**不推荐大家采用文章里的方式**

这篇文章开头写的很好，告诉我们Ubuntu很多底层采用的是Python2，当时后面居然让我们把link文件改掉。这样会导致Ubuntu的系统出现一些错误，比如安装软件失败。所以大家还是直接使用 'python3' 这个命令就好，不要自找麻烦。
