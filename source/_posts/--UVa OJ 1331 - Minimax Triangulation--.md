---
title: UVa OJ 1331 - Minimax Triangulation
date: 2016-09-29
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**

Here is the: [problem link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4077)

# **Solution**
这道题目一开始用递归做，但是时间比较长，于是花了比较长的时间去想应该怎么才能转化成递推

这道题目用d[i][j]来表示从i点切割到j点中所含的面积最大的三角形中，最小的那个

这里用了三个循环，第一层是确定分割时跨越的点数，第二层是起点，第三层就是起点和终点中任意取一点分割。同时还要注意分割时会不会有点卡在中间导致实际上不能被分割的情况

```C++
#include <iostream>
#include <cstdio>
#include <cmath>
#include <iomanip>
using namespace std;

const int maxn = 55;
int n, cas;
double x[maxn], y[maxn], d[maxn][maxn];

double cntArea(int a, int b, int c) {
    return fabs((x[b]-x[a])*(y[c]-y[a])-(y[b]-y[a])*(x[c]-x[a]))/2;
}

bool isOK(int x,int y, int z) {
    double s = cntArea(x, y, z);
    for (int i = 0; i < n; ++i) {
        if (i == x || i == y || i ==z) continue;
        double tmp = cntArea(x,y,i)+cntArea(x,z,i)+cntArea(y,z,i);
        if (fabs(s-tmp) < 1e-6) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> cas;
    while(cas--) {
        cin >> n;
        double ans = 0x3f3f3f3f;
        for (int i = 0; i < n; ++i) cin >> x[i] >> y[i];
        for (int i = 2; i < n; ++i) {
            for(int j = 0; j < n; ++j) {
                int a = (i+j) % n;
                d[j][a] = 0x3f3f3f3f;
                for (int k = (j+1)%n; k != a; k = (k+1)%n) {
                    if (!isOK(j,k,a)) continue;
                    d[j][a] = min(d[j][a], max(max(d[j][k],d[k][a]),cntArea(j,k,a)));
                }
                if (i == n-1)
                    ans = min(ans, d[j][a]);
            }
        }
        cout.setf(ios::fixed);
        cout << setprecision(1) << ans << '\n';
    }
    return 0;
}
```
