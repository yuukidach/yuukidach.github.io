---
title: UVa OJ 11400 - Lighting System Design
date: 2016-09-25
categories: [Programming Exercises, UVa OJ]
tag: [C++, DP]
toc: true
---

# **Problem**
You are given the task to design a lighting system for a huge conference hall. After doing a lot of calculation and sketching, you have figured out the requirements for an energy-efficient design that can properly illuminate the entire hall. According to your design, you need lamps of n different power ratings. For some strange current regulation method, all the lamps need to be fed with the same amount of current. So, each category of lamp has a corresponding voltage rating. Now, you know the number of lamps and cost of every single unit of lamp for each category. But the problem is, you are to buy equivalent voltage sources for all the lamp categories. You can buy a single voltage source for each category (Each source is capable of supplying to infinite number of lamps of its voltage rating.) and complete the design. But the accounts section of your company soon figures out that they might be able to reduce the total system cost by eliminating some of the voltage sources and replacing the lamps of that category with higher rating lamps. Certainly you can never replace a lamp by a lower rating lamp as some portion of the hall might not be illuminated then. You are more concerned about money-saving than energy-saving. Find the minimum possible cost to design the system.

# **Input**
Each case in the input begins with n (1 ≤ n ≤ 1000), denoting the number of categories. Each of the following n lines describes a category. A category is described by 4 integers - V (1 ≤ V ≤ 132000), the voltage rating, K (1 ≤ K ≤ 1000), the cost of a voltage source of this rating, C (1 ≤ C ≤ 10), the cost of a lamp of this rating and L (1 ≤ L ≤ 100), the number of lamps required in this category. The input terminates with a test case where n = 0. This case should not be processed.

# **Output**
For each test case, print the minimum possible cost to design the system.

# **Sample Input**
```
3
100 500 10 20
120 600 8 16
220 400 7 18
0
```

# **Sample Output**
```
778
```

# **Solution**
这道题目一开始其实并没有看懂，不知道他到底要多少瓦灯泡去点亮大厅。后来发现灯泡数量其实是不变的，只要去更换不同的灯泡就行了。

这里没用结构体或者类，而是直接用o[]来记录每种灯泡的排序，d[i]表示到i种灯泡为止，总共要花多少钱

```C++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <functional>
#include <algorithm>
using namespace std;

const int maxn = 1001;
int n;
int v[maxn], k[maxn], l[maxn], a[maxn];
int d[maxn], o[maxn], s[maxn];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while (cin >> n && n) {
        for (int i = 1; i <= n; ++i) {
            cin >> v[i] >> k[i] >> l[i] >> a[i];
            o[i] = i;
        }
        sort(o+1, o+n+1, [](int a, int b){return v[a]<v[b];});
        memset(d, 0x3f, sizeof(d));
        d[0] = 0;
        for (int i = 1; i <= n; ++i) {
            s[i] = s[i-1] + a[o[i]];
            for (int j = 0; j <= i; ++j) {
                d[i] = min(d[i], d[j]+(s[i]-s[j])*l[o[i]]+k[o[i]]);
            }
        }
        cout << d[n] << '\n';
    } 
    return 0;
}
```
