---
title: UVa OJ 116 - Unidirectional TSP
date: 2016-09-24
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**

Here is the: [problem link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=52)

# **Solutions**

这道题目不难，但是要注意一下输出的格式，我因为输出格式的问题反复提交了好几次

我们用dp[i][j]来表示(i,j)距离最后一列的距离。为了节省时间，用了一个Next[]数组来保存向右走的路径，避免反复取余造成的时间上的浪费。

还有，记得不要用next和end，是关键字 =_=

```C++
#include <iostream>
#include <cstring>
#include <cstdio>
using namespace std;

int r, c, start, End;
int Next[12];
int block[12][102], idx[12][102];
long dp[12][102];
int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while(cin >> r >> c) {
        memset(idx, 0, sizeof(idx));
        memset(dp, 0, sizeof(dp));
        for (int i = 1; i <= r; ++i) Next[i] = i;
        Next[r+1] = 1; Next[0] = r;
        for (int i = 1; i <= r; ++i)
            for (int j = 1; j <= c; ++j)
                cin >> block[i][j];
        for (int j = c; j > 0; --j) {
            for (int i = 1; i <= r; ++i) {
                long tmp = 0x3f3f3f3f3f3f;
                for (int k = -1; k < 2; ++k) {
                    long a = dp[Next[i+k]][j+1]+block[i][j];
                    if (a < tmp) {
                        tmp = dp[i][j] = a;
                        idx[i][j] = Next[i+k];
                    } else if (a == tmp) 
                        idx[i][j] = min(idx[i][j], Next[i+k]);
                }
            }
        }
        start = 1;
        long tmp, minh = dp[1][1];
        for (int i = 2; i <= r; ++i) {
            tmp = dp[i][1];
            if (tmp < minh) {
                start = i;
                minh = tmp;
            }
        }
        End = start;
        for(int j = 1; j < c; ++j) {
            cout << End << ' ';
            End = idx[End][j];
        }
        cout << End << '\n' << dp[start][1] << '\n';
    }
    return 0;
}
```
