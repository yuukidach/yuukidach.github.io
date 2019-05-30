---
title: 从零开始的Hexo学习
date: 2016-08-20
categories: [Web Design, Hexo]
tag: [Hexo]
---

>Don’t Dissect the Frog, Build It.

这句话在之前的一篇文章就提到过了。光是看是没有用的，要自己实践之后，才能理解一个东西，从而有所收获。  

最近在一点点完善自己的博客。随着改动地程度不断加大，对于Hexo的理解就显得不够了。因此，在博客开了一个月了才来写这篇文章，也算是一种亡羊补牢吧。

# **layout模板**

>Every templates apply to layout template by default.

Hexo的主题布局都在layout文件夹下，每个模板都是用layout.ejs作为布局。以我这里的文件为例。打开layout.ejs，里面的内容如下：
```JavaScript
<%- partial('_partial/head') %>
<body>
  <div id="container">
    <div id="wrap">
      <%- partial('_partial/header', null, {cache: !config.relative_link}) %>
      <div class="outer">
        <section id="main"><%- body %></section>
        <% if (theme.sidebar && theme.sidebar !== 'bottom'){ %>
          <%- partial('_partial/sidebar', null, {cache: !config.relative_link}) %>
        <% } %>
      </div>
      <%- partial('_partial/footer', null, {cache: !config.relative_link}) %>
    </div>
    <%- partial('_partial/mobile-nav', null, {cache: !config.relative_link}) %>
    <%- partial('_partial/after-footer') %>
  </div>
</body>
</html>
```

这里包含了一个完整的界面，有header, siderbar, footer等。这些都能在layout文件夹下找到对应的文件。  

而其中的<%- body %>部分则是要被对应的index, post, page, archive, category和tag来代替。再打开post.ejs之类的文件，会发现，其实都是利用了partial局部模块。  

现在让我们来详细的看一看这些ejs文件里面的内容吧。以我现在正在更改的archive.ejs为例，贴出部分代码来一起探讨一下。
```JavaScript
<% page.posts.each(function(post){ %>
  <%- partial('article', {post: post, index: true}) %>
<% }) %>
```
这一小段代码是一个循环，作用是将文章全部都列举出来。  

page是Hexo的全局变量，类似的还有site之类的，可以极大的方便我们布置自己的网页。  

至于第二行的partial，则是一个辅助函数。以{post:post}来填充'article'。  

关于更加详细的变量以及辅助函数的信息，大家可以去Hexo的官网找文档，里面有介绍，只是个人感觉介绍的不是很好，并不是很好用。
