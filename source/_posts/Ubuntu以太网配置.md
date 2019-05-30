---
title: Ubuntu以太网已断开的解决办法
date: 2016-09-10
categories: [编程学习, Ubuntu]
tag: [Ubuntu]
---
有部分人在使用Ubuntu的时候可能会遇到和我一样的问题，就是以太网显示已断开，这面原因有很多，但是大多都是驱动问题。网上也有教程，亲测以后发现有些地方并不适用，这里我们就来谈谈这个问题。

我的Ubuntu版本是16.04 LTS， 有线网卡是Realtek的  
装完系统以后以太网显示已断开，但是如果编辑连接的话，可以发现，其实是一直在使用的。真正原因，是网卡驱动不兼容的问题。Ubuntu自带的是r8169，而我需要的是r8168。因此，我们只需要安装上r8168就好了。  

但是网上虽然有比较好的教程，但是有一些瑕疵，不通用，有人会说自己找不到r8169.ko这个文件并删除。实际上，我们应该用find指令去找我们所需要的文件的位置，而不是完全照搬那些解决方法。

下面开始谈谈解决方式：

1. 下载驱动并解压好  

	去Realtek官网下载好r8168的驱动: [下载连接](http://www.realtek.com.tw/downloads/downloadsView.aspx?Langid=1&PNid=13&PFid=5&Level=5&Conn=4&DownTypeID=3&GetDown=false#2)

2. 获取root权限
```
sudo su
```

3. 删除r8169模块
```
rmmod r8169
mv /'-yourFile'/r8169.ko ~/r8169.ko.backup
```
	将'-yourFile'替换成具体的文件路径，也就是存放了r8169.ko这个文件的路径
比如我的是 

	>/lib/modules/`4.4.0-36-generic`/kernel/drivers/net/enthernet/realtek

	具体还是利用find指令自己去找

4. 安装r8168  

	切换到解压完的目录执行以下指令
```
make clean modules
make install
```

5. 添加驱动模块到内核中  

	先让系统知道我们的模块，然后添加到内核中
```
depmod -a
insmod ./src/r8168.ko
```

6. 让模块在启动的时候生效
```
mv /initrd.img ~/initrd.img.backup
mkinitramfs -o /boot/initrd.img-`uname -r` `uname -r`
echo "r8168" >> /etc/modules
```
'uname -r'是内核版本代号，就是4.4.0-36-generic这类，具体还是看自己的文件。之前在找r8169.ko的时候就会看到

最后可以用lspci -v这个指令来看看自己用的是什么驱动

## 参考文章
1. [The pain of an Realtek (RTL8111/RTL8168) ethernet card](https://unixblogger.com/2011/10/18/the-pain-of-an-realtek-rtl8111rtl8168-ethernet-card/)

2. [ubuntu装RTL8111/8168B网卡驱动](http://blog.csdn.net/ldl22847/article/details/8469156) (第二篇参考文章是转载的，原文链接没找到)
