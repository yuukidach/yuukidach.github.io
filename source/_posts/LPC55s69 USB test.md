---
title: LPC55S69 USB 高速模式测试（一）
categories: [MCU, USB]
tag: [USB]
date: 2019-5-23
toc: true
---
# 测试目标
配置LPC55S69 EVK所带的高速USB作为功能设备，测试其最快速率能达到多少，用于验证后续的开发。

# LPC55S69配置
LPC55S69是一款基于ARM内核的双核MCU， 由两个Cortex-M33构成。其最高运行频率为100MHz。

![LPC55S69 EVK](/markdown_img/lpc55s69 USB test/lpc55s69 overview.jpg)  

整个工程的准备工作如下：
1. 选用CPU0作为默认的控制核心
2. 配置MAIN_CLK为96MHz（为了使用高速USB口，CPU时钟频率不得低于60MHz）
3. 给USB HS PHY上电
4. USB功能设备配置
   - 配置功能设备，需要先使能host controller的时钟，以便进行USB配置
   - DEV_ENABLE置1，让一个端口表现为USB设备
   - 清除USB1_HOST位，关闭host controller，降低能耗
5. USB时钟配置
   - USB PHY配置48MHz时钟
   - USB PHY以及对应SRAM时钟使能

# 传输测试
连接方式：LPC55S69 EVK <-------USB 2.0 HS --------> MacBook

Corex-M33 freq: 100MHz

使用官方提供的SKD（v2.5.1），利用块传输（bulk transfer）。循环发送
```
while (1) {
    USB_DeviceCdcAcmSend(s_cdcVcom.cdcAcmHandle, USB_CDC_VCOM_BULK_IN_ENDPOINT, tmp_buf, buf_len);
}
```

tmp_buf为buffer地址，buf_len是需要传送的数据长度

使用上述方式发送数据，buf_len越长，发送USB发送速率越快，最快能到8MB/s左右，无传输错误发生。

8MB/s的速率对于HS USB来说是明显偏低的。通过调整整个工程的优化等级，可以提高速率。将优化等级调整至-O1或者以上，USB的速率可以达到21MB/s，无传输错误发生。

![测试结果](/markdown_img/lpc55s69 USB test/SDK test.png)

此外，如果MCU的时钟频率降低，USB的传输速率也会相应降低，通过USB分析仪观察后，可以发现是NAK的数量变多。

# 结果分析
虽然最后通过增长buf_len，以及调整优化等级，可以使得高速USB口的速率在21MB/s左右。但是对于最高速率480Mbps的Hi-Speed USB来说，速率上还是有所欠缺。

采用USB分析仪进行抓包分析
![抓包分析](/markdown_img/lpc55s69 USB test/packet1.png)

可以发现在进行数据传输的时候，USB发送了过多的NAK。测试中的USB传输，其发送NAK与发送有效数据的时间基本相同，可以做如下简单计算：  

由于一次有效的数据传输不光包含了数据本身，还包含了令牌包和握手包，因此有效数据在一次事务传输中的占比可以考虑为512/518。计算480Mbps下的理论传输速率为  
<center>480 / 8 / 2 / 518 * 512 = 29.6525 MB/s</center>

考虑到实际的损耗，21MB/s看起来就是一个可以接受的数据了。

值得注意的是，由于MCU的时钟频率降低，NAK的数量会变多。而NAK的数量变多不外乎两种原因：
- USB device没有数据需要发送
- USB device正忙，无法相应host的请求

MCU的时钟频率降低会导致NAK增多，也就说尽管整个测试工程只执行了USB搬运，但是MCU还是有大量的操作需要处理。结合优化后的USB速率会变高这一情况来看，USB工作在21MB/s的速率，极有可能是MCU的数据搬运不及时，没有搬运到USB发送数据的缓存当中。

可以从软件上考虑对USB速率的优化。

# 参考
1. LPCXpresso55S69 Development Board (Rev. 1.2 — 25 April 2019)
2. LPC55S6x User manual (Rev. 1.2 — 3 May 2019)
