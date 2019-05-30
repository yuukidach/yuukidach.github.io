---
title: 关于博客Read More按钮的改进
date: 2016-08-24
categories: [Web Design, jQuery]
tag: [jQuery]
---

先说一点题外话  

最近一段时间临近开学，要处理的事情很多，更新博客的速度也慢了下来，开学以后也大概就是这个速度了吧。  

关于这个博客的建立过程，我还是想稍微再提一下。从一开始的landscape到icarus主题，再回到默认的landscape，中间还是发生了许多事情。主要的一个原因还是landscape给我们展示文章的空间更大一些，方便阅读。而且自己修改起来也比较方便。  

至于主色调。因为自己经常长时间看着屏幕，所以希望能看到比较缓和一点的颜色，没有那么刺眼。因此选中了黑色。在自己改变了几处地方之后，意外的发现和 [Morris's Blog](http://morris821028.github.io/) 很相似。鉴于自己在网页设计这方面基础近乎为0，后来的一些更新，或多或少都有借鉴他的一些东西，包括这里要提到的文章栏里Read More这个按钮。  

---
下面还是快点进入正题吧。  

这个按钮是我学习jQuery的一个开端，或者说，是起因。

那么<font color=lightgreen>**什么是jQuery**</font>呢？

>jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

简单的说，jQuery就是一个JavaScript的库，和我们C++中使用"Algorithm"这个头文件是差不多的意思，是方便我们进行开发用的。利用它，我们可以用很短的代码，写出需要的结果。  

我这里的Read More按钮，在写它的js文件之前，先对CSS进行了一定的更改，包括改变了首页文章评论和分享按钮的位置；给文章预览页面添加上文字渐隐的效果。  

其中，文字渐隐的效果是通过图片叠加在文字上的方式，不过这里的图片，是利用 **background-image** 这个值来完成。比起用链接类型的图片，在效率上好了许多。  

在准备工作都完成之后，就是对按钮进行js文件的编写了。一开始，我使用了一个独立的js文件来完成，完成方式是使用两个类，然后addClass和removeClass来进行。先利用id选中文章，点击按钮后就移除div中的相应类，使得文章的高度不受限制，展开文章。再次单击按钮，则在div部分加上相应的类，文章就被收起来了。  

但是这个方法有一点问题，就是因为是通过id来选择，会使得只有第一篇文章具有这种效果，而之后的文章，单击按钮就没有效果了。  

后来换成了通过选择类的方式，而不是id的方式，解决了这个问题。  

另外，在使用.prev()的时候，要注意一下，不能有JavaScript插在this元素的前面，否则.prev()不能选取到我们需要的元素。  

因为是很多文件关联在一起，可以直接去我的github: [Yuuki_Dach's GitHub](https://github.com/yuukidach) 上看代码，这里就不一一贴出来了。
