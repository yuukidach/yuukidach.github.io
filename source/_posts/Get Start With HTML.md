---
title: Get Start With HTML
date: 2016-08-14
categories: [Web Design, HTML]
tag: [HTML]
toc: true
photo: https://github.com/yuukidach/yuukidach.github.io/blob/master/MarkDown_Images/%E8%80%81%E5%8F%B8%E6%9C%BA%E5%B8%A6%E5%B8%A6%E6%88%91.jpg?raw=true
---

&emsp;&emsp;这些天在鼓捣博客，对界面所做的改动，也都是landscape这个主题的框架下所进行的。虽然说自由度相对于别的博客站点的自由度要高很多，但是自己没有一点网页编程知识的话，也是不能够讲网页完全设计成自己所喜欢的样子。因此在这里开一个类似于笔记本性质的文章吧，也方便我以后进行回忆。

<p>&emsp;&emsp;不过既然是笔记本，那么可能就不会记录的很详细，比如一些细节的实现啊什么的，更多的还是自己不了解，或者说，不是很熟悉的东西吧。</p>

<p>&emsp;&emsp;因为很多东西的代码，比如样式、属性的代码，都是一些英文的缩写，所以为了方便记忆，会尽量去逛一点英文网站，有时候有些东西就直接用英文复制过来了，没有去翻译~~（个人太懒）~~，如果有人看这篇文章的话~~（不过基本是没有人看的了）~~，还请理解一下 :D</p>

<!-- more -->

# **Introduction**

- HTML指的是超文本标记语言 (Hyper Text Markup Language)
- HTML不是一种编程语言，而是一种标记语言 (markup language)
- 标记语言是一套标记标签 (markup tag)
- HTML使用标记标签来描述网页

# **Basic**

<p>和markdown的一些语法很相似。~~(markdown就是为此而生的嘛)~~ 这里就只记录部分了</p>

1. HTML的链接通过&lt;a&gt;来进行定义  
   &lt;a href="url"&gt;link text&lt;/a&gt; 

2. 图像通过&lt;img&gt;
   &lt;img src="link" settings/&gt;  
   在src的后面还能加上alt 表示在图片加载不出来时显示的文字信息，如：&lt;img src="link" alt="text" settings/&gt;

3. Conditional comments defines some HTML tags to be executed by Internet Explorer only.
```
<!--[if IE 8]> 
  .... some HTML here .... 
<![endif]-->
```

4. The &lt;title&gt; element defines the title of the document, and is required in all HTML/XHTML documents.
 - defines a title in the browser tab
 - provides a title for the page when it is added to favorites
 - displays a title for the page in search engine results

5. 页面布局不要用<table>来进行，不然会引起不必要的麻烦，也不便于后续的工作


# **Elements**
**——from start tag to end tag**

1. HTML元素就是开始标签和结束标签之间的东西,大多数可嵌套，推荐使用小写

2. HTML标签可以拥有属性，属性总是以名称/值对的形式出现，并且在HTML元素的开始标签中规定

3. 属性值应该始终被包括在引号内。双引号是最常用的，不过使用单引号也没有问题。在某些个别的情况下，比如属性值本身就含有双引号，那么您必须使用单引号~~（和汉语写别人说的话一样）~~

# **CSS**

**CSS** stands for **C**ascading **S**tyle **S**heets. 

CSS describes **how HTML elements are to be displayed on screen, paper, or in other media**.

CSS can be added to HTML elements in 3 ways:

- **Inline** - by using the style attribute in HTML elements
- **Internal** - by using a &lt;style&gt; element in the <head> section
- **External** - by using an external CSS file

其中最常使用分离的CSS文件

An **internal** CSS is defined in the <head> section of an HTML page, within a &lt;style&gt; element:

```
<head> 
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
```

# **JavaScript**

JavaScript makes HTML pages more dynamic and interactive.

The **&lt;script&gt;** tag is used to define a client-side script (JavaScript).  
<br/>

---
写了这么几十行，其实并没有记录下什么内容，因为感觉和markdown实在是太像了，所以大部分都没有写下来。大家如果也是初学的话可以去w3school看看，有英文版和中文版两种，英文版的界面特别舒服。网址就不贴了，大家Google或者百度一下都能找到的。  

之前看到了一句话，感觉特别好，大概就是说，想要知道一只青蛙的构造，最好的方式不是去解剖青蛙，而是去构造一只青蛙。学习一门新的编程语言也确实是如此。要自己定下一个目标，去实现它，而不是漫无目的地去学。  

另外，右键查看网页源码还是非常有必要的，之前用这个方法把文章封面问题给解决了，还是蛮高兴的。
