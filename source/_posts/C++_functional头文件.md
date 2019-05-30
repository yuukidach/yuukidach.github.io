---
title: C++函数对象，Lambda，function，bind相关知识
date: 2016-09-04
categories: [编程学习, C/C++]
tage: C++
toc: true
---

昨天做题时无意间得知了&lt;functional&gt;这个头文件，之后自己也稍微地了解了一下相关的一些知识。  

内容比较多，叙述方面可能不是很详尽，大家如果看完还有不是很理解的地方，建议进文末的链接看看。

# **&lt;functional&gt;头文件**
关于这个头文件，在*cppreference.com*中是这样定义的:

>This header is part of the function objects library and provides the standard hash function.

这个头文件定义了许多函数对象类型和支持函数对象的功能。

# **函数对象**
关于函数对象这里就来比较详细的讲一下，也为后面的内容做一个铺垫。  

先来看看*cplusplus.com*中关于函数对象（Function object）的定义：

>Function objects are objects specifically designed to be used with a syntax similar to that of functions. In C++, this is achieved by defining member function operator() in their class.

简单的说，函数对象是通过重载operator()这个操作符，利用和函数相类似的句法，实现了函数的功能。来看一个例子：
```C++
class myFunctionClass{
public:
    int operator()(int x){
        return x;
    }
}test;

int a = test(6);
```
这个程序中，如果我们输出a，就会发现，a的值是6，十分简单易懂。

## **函数指针**
提到了函数对象，就不得不提一下函数指针了。在我学C语言的时候，谭浩强的那本《C语言程序设计》就讲解了一下函数指针。类似于我们普通的变量指针的运用，如：
```C++
int add(int a, int b){
    return a+b;
}

typedef int(*addNumFunc)(int a, int b);

addNumFunc add2Num = &add;

int a = add2Num(4, 7);
```
函数指针可以简化我们的代码，但是函数对象与之相比有更大的优势。*维基百科*上是这样解说这些优势的：

>函数对象与函数指针相比，有两个优点：第一是编译器可以内联执行函数对象的调用；第二是函数对象内部可以保持状态。

第一个不用多说，那么第二个是什么意思呢？就是将数据保存在成员变量中，以实现携带我们说需要的数据

# **std::lambda**

lambda(/'læmdə/) 表达式是用于创建匿名函数的，这是C++的一个新的特性。
我们从例子当中来看lambda的语法和其优势。
```C++
 std::sort(x,
           x + n,
           [](int a, int b) { return std::abs(a) < std::abs(b); });
```
sort函数的第三行就是我们的lambda表达式。它以[]为开始，没有函数名称，接受两个int类型的参数，返回值是bool类型，也就是a&lt;b的真假。其中返回值是自动推定的，而且只有在一个return的情况下，才能自动推定。  

如果我们需要自己定义返回值类型的话，我们可以用如下的方式
```
[ capture-list ] ( params ) -> ret { body }
```
比如：
```C++
std::cout << [](float f) -> int { return std::abs(f); } (-2.22);
```
这里的返回值就是int类型，而且我们在定义了函数之后直接调用该函数。  

另外关于lambda表达式开始的这对[]，其实也是有其作用的。

1. []&emsp;&emsp;表示不捕获任何外部变量
2. [=]&ensp;&emsp;表示以传值的方式捕获
3. [&]&ensp;&emsp;表示以引用的方式捕获

当然也可以[&,a]这样，表示a用值传递，而其余的则是使用引用的方式了。其余的一次类推，this指针也是可以用的。  

lambda表达式的有优点就是让代码清晰易懂，同时也避免了和别人所写的一些代码的冲突，防止了误操作等。

## **闭包类型**
关于lambda，在*cplusplus.com*有这样一句话。

>Constructs a closure: an unnamed function object capable of capturing variables in scope.

所谓闭包类型(ClosureType)，就是lambda表达式执行后由编译器生成自动生成的函数对象有不同的类型名字，并且只有编译器知道这个类型名字，可以认为它是一个未命名类型。  

下面来看几个应用：
```C++
[]{ std::cout << "Yuuki_Dach's Blog.(The MADAO)" << std::endl; }();
//这里直接输出,而且没有参数传入，所以最后是()

std::string lambdaReturn = [](const std::string &str)->std::string{
    return "hello " + str; }("hahaya");
std::cout << lambdaReturn << std::endl;
//这里则是用lambdaReturn这个变量储存了其结果

auto addFunc = [](int val){std::cout << val + 2 << std::endl; };
    std::for_each(a.begin(), a.end(), addFunc);
//这里产生了一个匿名对象，保存在func中
```

# **std::function**
看了前面的auto这个例子的话，就可以讲一讲std::function了  

类模版std::function是一种通用、多态的函数封装。std::function的实例可以对任何可以调用的目标实体进行存储、复制、和调用操作，这些目标实体包括普通函数、Lambda表达式、函数指针、以及其它函数对象等。std::function对象是对C++中现有的可调用实体的一种类型安全的包裹。  

比如前面的例子中auto部分也能这样写：
```C++
std::funtion<void(int)> addFunc = [](int val){std::cout << val + 2 << std::endl; };
    std::for_each(a.begin(), a.end(), addFunc);
```

# **std::bind**
std::bind可用于绑定函数、成员函数、函数对象、成员变量，如：
```C++
int testFunc(int a, char c, float f){
    cout << a << endl;
    cout << c << endl;
    cout << f << endl;

    return a;
}

auto bindFunc = std::bind(testFunc, std::placeholders::_2, std::placeholders::_1, 100.1);
    bindFunc('B', 10);
```
后面的bindFunc部分相当于执行了testFunc(10, 'B', 100.1)。  

std::placeholders::_1是占位符，表示对应参数的位置和函数的第一个参数相匹配，以此类推。  

关于std::bind，再提两点比较重要的部分

- bind预先绑定的参数需要传具体的变量或值进去，对于预先绑定的参数，是pass-by-value的；
- 对于不事先绑定的参数，需要传std::placeholders进去，从_1开始，依次递增。placeholder是pass-by-reference的。  

---

基本就是这些内容了，有错误的地方还请指正。大家也可以看看参考文章，还是很有帮助的(*^_^*)

# **参考文章**
1. [C++11 新特性：Lambda 表达式](https://www.devbean.net/2012/05/cpp11-lambda/)
2. [函数对象、lambda、function、bind学习](http://hahaya.github.io/function-object/)
3. [C++11中的std::function](http://www.jellythink.com/archives/771)
4. [C++ 新特性学习（四） — Bind和Function](https://www.owent.net/2012/02/c-%E6%96%B0%E7%89%B9%E6%80%A7%E5%AD%A6%E4%B9%A0%EF%BC%88%E5%9B%9B%EF%BC%89-bind%E5%92%8Cfunction.html)
5. [C++11中的std::bind](http://www.jellythink.com/archives/773)
