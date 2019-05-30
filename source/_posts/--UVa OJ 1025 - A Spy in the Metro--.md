---
title: UVa OJ 714 - Copying Books
date: 2016-09-22
categories: [Programming Exercises, UVa OJ]
tags: [DP, C++]
toc: true
---


# **Problem**
Here is the [Problem Link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3466)

# **Solution**
在车站有三种选择：1.等；2.向右走 3.向左走

我们从约定的地点和约定的时间倒回来考虑，如果能够在0（初始时刻）回到车站1,就表示能够完成。
```C++
#include <iostream>
#include <cstring>
#include <cstdio>
using namespace std;

int n, T, m1, m2, cas;;
int t[55], d[255], e[255];
int fromRight[205][55], fromLeft[205][55], takeTime[205][55];

void init() {
    memset(fromLeft,  0, sizeof(fromLeft ));
    memset(fromRight, 0, sizeof(fromRight));
    cin >> T;
    for (int i = 1; i < n  ; ++i) cin >> t[i];
    cin >> m1;
    for (int i = 1; i <= m1; ++i) {
        cin >> d[i];
        int tmp = d[i];
        fromLeft[tmp][1] = 1;
        for (int j = 1; j < n; ++j) {
            tmp += t[j];
            if (tmp <= T) fromLeft[tmp][j+1] = 1;
            else break;
        }
    }
    cin >> m2;
    for (int i = 1; i <= m2; ++i) {
        cin >> e[i];
        int tmp = e[i];
        fromRight[tmp][n] = 1;
        for (int j = n-1; j > 1; --j) {
            tmp += t[j];
            if (tmp <= T) fromRight[tmp][j] = 1;
            else break;
        }
    }
    memset(takeTime, 0x3f, sizeof(takeTime));
    takeTime[T][n] = 0;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while(cin >> n && n) {
        init();
        for (int i = T-1; i >= 0; --i) {
            for (int j = 1; j <= n; ++j) {
                takeTime[i][j] = takeTime[i+1][j]+1;
                if (j > 1 && fromRight[i][j] && i+t[j-1] <= T)
                    takeTime[i][j] = min(takeTime[i][j], takeTime[i+t[j-1]][j-1]);
                if (j < n && fromLeft[i][j] && i+t[j] <=T)
                    takeTime[i][j] = min(takeTime[i][j], takeTime[i+t[j]][j+1]);
            }
        }
        cout << "Case Number " << ++cas << ": ";
        if(takeTime[0][1] >= 0x3f3f3f3f) cout << "impossible\n";
        else cout << takeTime[0][1] << '\n';
    }
    return 0;
}
```
