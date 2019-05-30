---
title: UVa OJ 1607 - Gates
date: 2016-09-06
categories: [Programming Exercises, UVa OJ]
tags: [Binary Search, C++]
toc: true
---

# **Problem**
描述起来很麻烦，大家还是直接去OJ站看吧。我之后也会解释一下题目的意思  

题目链接： [1607 - Gates](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4482)

# **Input**
The first line of the input contains exactly one positive integer d equal to the number of data sets, 1 ≤ d ≤ 20. The data sets follow.  
&emsp;&emsp;Each data set consists of two consecutive lines. The rst of those lines contains exactly two positive integers n and m separated by single space, 1 ≤ n ≤ 100.000, 1 ≤ m ≤ 200.000. Integer n is the number of the net inputs and integer m is the number of the gates in the net.
&emsp;&emsp;The second of those lines contains exactly 2m nonzero integers, separated by single spaces. The numbers on positions 2j - 1 and 2j describe the signal sources for the inputs to gate j. The positive number s means the output of gate s. The negative number s means the (-s)-th input to the net. The gates and the net inputs are numbered starting from one. The input of each gate is connected to an input of the net or to an output of a gate whose description occurred earlier in the sequence. Each net input is connected to at least one gate input. Each gate output is connected to at least one gate input except the output of the last gate that is connected to the output of the net.

# **Output**
The output should consist of exactly d lines, one line for each data set. The line number i should contain the answer to the i-th data set.  
&emsp;&emsp;The answer to one data set should consist of a sequence of exactly k characters terminated by the end of line (with no spaces in between). Each of those characters should be 0  or 1 or x. The i-th symbol of the sequence denotes the assignment to the i-th input of the net.  
&emsp;&emsp;If there are more than one optimal assignment then your program should output any of them (but only one).

# **Sample Input**
```
1
3 6
-1 -3 -1 -2 1 2 1 2 4 3 5 5
```

# **Sample Output**
```
10x
```

# **Solution**
对于该题，我理解题目意思的时间是长于解题时间的

一般AC之后我会习惯性的看一下题目数据，方便我知道程序效率的提升空间，对程序作出改进。在看这道题目时，发现提交的人很少，60人左右，但是能提交基本都过了，没过的只有三四人。所以可以发现，题目难点其实主要还是读题。

输入和输出很好理解，那么这道题目到底要我们干嘛。我稍微说一下。题目的意思其实是给我们n根线，这n根线可以给低电平，也可以给高电平。现在需要我们设计一种电路，完成一项固定的任务。比如永远都是输出0，永远都是输出1，或者永远和我们输入的x相反(例如我们给x以1，则输出0)，和x相同。理解了这个之后，我们就好做题了。

我们线全部给电路0，再全部给电路1，如果两者相同，电路的输出就永远是0或1，这样我们可以不要x，全部指定输入的电平，比如全0。如果两者不同，把第一个0变1，还是不同则再试第二个0变成1，直到找到x的位置，可以让电路发挥其和x的关系作用。这里用二分法可以提高查找速度。

```C++
#include<iostream>    
using namespace std;

#define LL gate[i].in1
#define RR gate[i].in2

class gateClass {
public:
    int in1, in2, out;
} gate[200005];
int n, m, all0, all1;

int getOutput(int pos) {
    for (int i = 1; i <= m; i++) {
        int x = LL>0 ? gate[LL].out:-LL<=pos;
        int y = RR>0 ? gate[RR].out:-RR<=pos;
        gate[i].out = !(x && y);
    }
    return gate[m].out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int cas , mid;
    cin >> cas;
    while (cas--) {
        cin >> n >> m;
        for (int i = 1; i <= m; i++)
            cin >> gate[i].in1 >> gate[i].in2;
        int all0 = getOutput(0);
        int all1 = getOutput(n);
        if (all0 == all1) {
            for (int i = 1; i <= n; i++) cout << '0';
        } else {
            int lef = 1, rit = n;
            while (lef < rit) {
                mid = lef + rit >> 1;
                if (getOutput(mid) == all1) rit = mid;
                else lef = mid + 1;
            }
            for (int i = 1; i < rit; i++) cout << '1';
            cout << 'x';
            for (int i = rit + 1; i <= n; i++) cout << '0';
        }
        cout << '\n';
    }
    return 0;
}
```
