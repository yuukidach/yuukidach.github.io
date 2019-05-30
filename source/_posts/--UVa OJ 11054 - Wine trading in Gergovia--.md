---
title: UVa OJ 11054 - Wine trading in Gergovia
date: 2016-08-14
categories: [Programming Exercises, UVa OJ]
tag: [C++]
toc: true
photo: https://github.com/yuukidach/yuukidach.github.io/blob/master/MarkDown_Images/%E5%86%A0%E5%86%9B.jpg?raw=true
description: 为什么别的关于UVa OJ的文章没有封面图片，而这张有呢？因为——高兴！
---



# Problem 
As you may know from the comic “Asterix and the Chieftain’s Shield”, Gergovia consists of one street, and every inhabitant of the city is a wine salesman. You wonder how this economy works? Simple enough: everyone buys wine from other inhabitants of the city. Every day each inhabitant decides how much wine he wants to buy or sell. Interestingly, demand and supply is always the same, so that each inhabitant gets what he wants.
<br/>
&emsp;&emsp;There is one problem, however: Transporting wine from one house to another results in work. Since all wines are equally good, the inhabitants of Gergovia don’t care which persons they are doing trade with, they are only interested in selling or buying a specific amount of wine. They are clever enough to figure out a way of trading so that the overall amount of work needed for transports is minimized.
<br/>
&emsp;&emsp;In this problem you are asked to reconstruct the trading during one day in Gergovia. For simplicity we will assume that the houses are built along a straight line with equal distance between adjacent houses. Transporting one bottle of wine from one house to an adjacent house results in one unit of work.
<!-- more -->

# Input
The input consists of several test cases. Each test case starts with the number of inhabitants n (2 ≤ n ≤ 100000). The following line contains n integers ai (−1000 ≤ ai ≤ 1000). If ai ≥ 0, it means that the inhabitant living in the i-th house wants to buy ai bottles of wine, otherwise if ai < 0, he wants to sell −ai bottles of wine. You may assume that the numbers ai sum up to 0.
<br/>
&emsp;&emsp;The last test case is followed by a line containing ‘0’.

# Output
For each test case print the minimum amount of work units needed so that every inhabitant has his demand fulfilled. You may assume that this number fits into a signed 64-bit integer (in C/C++ you can use the data type “long long”, in JAVA the data type “long”).

# Sample Input
```
5
5 -4 1 -3 1
6
-1000 -1000 -1000 1000 1000 1000
0
```

# Sample Output
```
9
9000
```

# Solution
这道题目难度并不大，不想去翻译了。但是这道题目却给了我一些意外的收获，相当于大家所说的“奇技淫巧”吧，还有一些其他的感悟。
<br/>
这道题我先试按照传统的方式，利用scanf和printf进行输入输出，运行时间是0.02s，后来看了下别人的运行时间，不出所料，最短的0.00s，接着就是0.01s了。
<br/>
那么问题来了，我的程序，可以说，已经十分的简洁了，为什么还会比最快的慢0.02s呢？于是乎，博主回忆起了过去曾经看到的一个C++程序。在那个程序里，编程者利用了sync_with_stdio对stdio进行了解绑，然后直接利用cin和cout输入输出。
<br/>
接下来，博主就对程序进行了更改和尝试。在不抱太大希望的情况下，提交了程序，最后的看了下运行时间**O.OOs**！，终于把那0.02s给续出去了。过两天可能开一篇短文章，稍微探讨一下个中原因。
<br/>
此外，在用notepad++进行编译的时候发现，MinGW对lld这种写法是不支持的，要写成I64d。abs在C++98也只能重载到long int，在C++11下才能重载到long long int，所以大家在提交的时候一定要看仔细了。
<br/>
下面是我的代码
```C++
#include <iostream>
#include <cmath>
using namespace std;

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	
    int n, a;
    while(cin >> n && n){
        long long total = 0, temp = 0;
        while(n--){
            cin >> a;
            total += abs(temp);
            temp += a;
        }
        cout << total << '\n';
    }
    return 0;
}
```
