---
title: UVa OJ 11584 - Partitioning by Palindromes
date: 2016-09-25
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**
Here is the: [link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2631)

# **Solution**
先对字符串进行预处理，把回文字符串的长度全部记录下来，然后用DP对回文字符串的个数进行处理。最小个数=min(之前已经处理过的长度所含回文字符串的最小值+未处理的长度所含回文字符数的最小值)
```C++
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

const int maxn = 1005;
char s[maxn];
int d[maxn], idx[maxn][maxn], cas;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> cas;
    while(cas--) {
        cin >> s+1;
        int n = strlen(s+1);
        memset(d, 0x3f, sizeof(d));
        d[0] = 0;
        for (int i = 1; i <= n; ++i) {
            idx[i][i] = 1;
            for (int j = i+1; j <= n; ++j) { 
                bool isOK = false;
                for (int k = 0; k < (j-i+1>>1); ++k)
                    if (s[i+k] != s[j-k]) {
                        idx[i][j] = j-i+1;
                        isOK = true;
                        break;
                    }
                if (isOK) continue;
                idx[i][j] = 1;
            }
        }
        for (int i = 1; i <=n; ++i) {
            for (int j = 0; j <=i; ++j) {
                d[i] = min(d[i], d[j]+idx[j+1][i]);
            } 
        }
        cout << d[n] << '\n';
    }
    return 0;
}
```
