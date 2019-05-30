---
title: UVa OJ 1625 - Color Length
date: 2016-09-27
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**
Here is the [prolem link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4500)

# **Solution**
这道题目要先处理好每个颜色的起止位置，不然会很不方便。用数组d[i][j]表示已经插入了第一个字符串的i个，第二个字符串的j个字母。递推的时候，只要发现还有字母没有用完，就加1

```C++
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

const int maxn = 5002;
char n[maxn], m[maxn];
int cas, l1, l2;
int begs[2][26], endz[2][26], d[maxn][maxn];

void findLetter(char a[], int l, int o) {
    for (int i = 1; i <= l; ++i) {
        if (!endz[o][a[i]-'A']) 
            begs[o][a[i]-'A'] = i;
        endz[o][a[i]-'A'] = i;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> cas;
    while(cas--) {
        cin >> n+1 >> m+1;
        n[0] = m[0] = 0;
        memset(begs, 0x3f, sizeof(begs));
        memset(endz, 0, sizeof(endz));
        l1 = strlen(n+1);
        l2 = strlen(m+1);
        findLetter(n, l1, 0);
        findLetter(m, l2, 1);
        for (int i = 0; i <= l1; ++i) {
            for (int j = 0; j <= l2; ++j) {
                int num = 0, ans = 0x3f3f3f3f;
                for (int k = 0; k < 26; ++k)
                    if ((i >= begs[0][k] || j >= begs[1][k]) &&
                        (i < endz[0][k] || j < endz[1][k]))
                        ++num;
                if (i) ans = min(d[i-1][j], ans);
                if (j) ans = min(ans, d[i][j-1]);
                d[i][j] = (ans==0x3f3f3f3f?0:ans) + num;
            }
        }
        cout << d[l1][l2] << '\n';
    }
    return 0;
}
```
