---
title: Ubuntu r8168模块编译错误的解决办法
date: 2016-10-15
categories: [编程学习, Ubuntu]
tag: [Ubuntu]
---

更新了Ubuntu 16.10之后，发现有线连接模块消失了，于是又和以前一样对r8168进行编译安装。具体的方法请参考我的另一篇文章: [Ubuntu以太网已断开的解决办法](https://yuukidach.github.io/2016/09/10/Ubuntu%E4%BB%A5%E5%A4%AA%E7%BD%91%E9%85%8D%E7%BD%AE/)

结果发现在 'make clean modules' 这一步居然出错了。错误信息如下：
```
/home/user/download/r8168-8.042.00/src/r8168_n.c: In function ‘rtl8168_init_one’:
/home/user/download/r8168-8.042.00/src/r8168_n.c:22799:28: error: ‘struct net_device’ has no member named ‘gso_min_segs’; did you mean ‘gso_max_segs’?
                         dev->gso_min_segs = NIC_MIN_PHYS_BUF_COUNT;
                            ^~
/home/yuukidach/下载/r8168-8.042.00/src/r8168_n.c:22807:28: error: ‘struct net_device’ has no member named ‘gso_min_segs’; did you mean ‘gso_max_segs’?
                         dev->gso_min_segs = NIC_MIN_PHYS_BUF_COUNT;
                            ^~
/home/user/download/r8168-8.042.00/src/r8168_n.c: In function ‘rtl8168_start_xmit’:
/home/user/download/r8168-8.042.00/src/r8168_n.c:24969:12: error: ‘struct net_device’ has no member named ‘trans_start’; did you mean ‘mem_start’?
         dev->trans_start = jiffies;
```

其实这个错误是因为r8168的版本和Ubuntu版本不配对导致的，只要去官网下载新的r8168的版本就行了。
