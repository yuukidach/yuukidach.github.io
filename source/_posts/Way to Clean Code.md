---
title: Way to Clean Code
date: 2016-08-10
categories: [Chitchat]
photo: http://7xread.com1.z0.glb.clouddn.com/c9783b5c-e2fe-451f-8e62-1822b9532eb1
---
 ——Code, without tests, is not clean. No matter how elegant it is, no matter how readable and accessible, if it hath not tests, it be unclean.   
 
——没有测试的代码不干净。不管它有多优雅，不管有多可读、多易理解，微乎测试，其不洁亦可知也。  

<!-- more -->

&emsp;&emsp;这两天看了下*Clean Code*这本书，感觉还是有一些收获。同时也对之前自己在学习STM32所使用的库函数，有了一个更加深入的了解。嘛，下面就把看到的一些东西做个笔记吧，时不时可能会加上一点。  

**Basic Principles**  

- Runs all the tests

- Contains no duplication

- Expresses all the design ideas that are in the system

- Minimizes the number of entities such as classes, methods, functions, and the like

---


**Use Meaningful Names**  

- Use intention-revealing names

- Avoid disinformation

- Make meaningful distinctions

- Use pronounceable names

- Use searchable names

- Avoid encodings


**做有意义的命名**  

- 用揭示目的的名称

- 避免误导

- 做有意义的区分

- 使用可以读出来的名称

- 使用可搜索的名称

- 避免使用编码

&emsp;&emsp;这个“避免使用编码”还是让我感觉有点意外啊。一直感觉前缀什么的是挺好的一个习惯。之前在看51单片机的一本书的时候，也有推荐加上前缀的，看来以后的代码习惯还是要好好改改啊。包括在调用STM32库函数的时候，现在都形成了不同单词间加上下划线的习惯了。嘛，不过感觉加下划线还不是什么不可取的事情，毕竟不同公司会有不同的规定吧。ST公司给的库函数加上下划线也让函数变得更易读了。
