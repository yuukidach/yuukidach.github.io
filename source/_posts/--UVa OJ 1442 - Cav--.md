---
title: UVa OJ 1442 - Cav
date: 2016-09-20
categories: [Programming Exercises, UVa OJ]
tags: [C++, Greedy Algorithm]
toc: true
---

# **Problem**
Link: [1442 - Cav](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4188)

# **Solution**
Use greedy algorithm to deal with this problem.

Adjust the height of ceiling to fit the requirements. 

Here is the code:
```C++
#include <iostream>
#include <cstdio>
using namespace std;

const int maxn = 1e6+5;
int cas, n, cnt;
int ceiling[maxn], floor[maxn];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> cas;
    while(cas--) {
        cnt = 0;
        cin >> n;
        for (int i = 0; i < n; ++i) cin >> floor[i];
        for (int i = 0; i < n; ++i) cin >> ceiling[i];
        int tmp = maxn;
        for (int i = 0; i < n; ++i) {
            tmp = min(tmp, ceiling[i]);
            tmp = max(tmp, floor[i]);
            ceiling[i] = tmp;
        }
        tmp = maxn;
        for (int i = n-1; i > -1; --i) {
            tmp = min(tmp, ceiling[i]);
            tmp = max(tmp, floor[i]);
            ceiling[i] = tmp;
            cnt += ceiling[i] - floor[i];
        }
        cout << cnt << '\n';
    }
    return 0;
}
```
