---
title: UVa OJ 12265 - Selling Land
date: 2016-09-21
categories: [Programming Exercises, UVa OJ]
tags: [C++]
toc: true
---

# **Problem**
输入一个n*m(1≤n,m≤1000)矩阵,每个格子可能是空地,也可能是沼泽。对于每个空地格子,求出以它为右下角的空矩形的最大周长,然后统计每个周长出现了多少次。

# **Input**
On the first line a positive integer: the number of test cases, at most 100. After that per test case:
 - One line with two integers n and m (1 ≤ n, m ≤ 1000): the dimensions of Per’s parcel.
 - n lines, each with m characters. Each character is either ‘#’ or ‘.’. The j-th character on the i-th line is a ‘#’ if position (i, j) is a swamp, and ‘.’ if it is grass. The north-west corner of Per’s parcel has coordinates (1, 1), and the south-east corner has coordinates (n, m).

# **Output**
Zero or more lines containing a complete list of how many parcels of each perimeter Per needs to sell in order to maximize his profit. More specifically, if Per should sell p<sub>i</sub> parcels of perimeter i in the optimal solution, output a single line ‘pixi’. The lines should be sorted in increasing order of i. No two lines should have the same value of i, and you should not output lines with p<sub>i</sub> = 0.

# **Sample Input**
```
1
6 5
..#.#
.#...
#..##
...#.
#....
#..#.
```

# **Sample Output**
```
6 x 4
5 x 6
5 x 8
3 x 10
1 x 12
```

# **Solution**
My code is inefficient, it takes about 2s to run. 

The main idea is to handle the problem is creating arrays or whatever to record the length(height) of each blocks. And then caculate the circumference of them.

```C++
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

const int maxn = 1005;
int cas, n, m, maxCircum, minLength;
char land[maxn][maxn];
int landLen[maxn][maxn], idx[maxn << 2];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> cas;
    while(cas--) {
        memset(idx, 0, sizeof(idx));
        maxCircum = 0;
        cin >> n >> m;
        for (int i = 1; i <= n; ++i) cin >> land[i]+1;
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                if (land[i][j] != '#')
                    landLen[i][j] = landLen[i-1][j] + 1;
                else landLen[i][j] = 0;
            }
        }
        for (int i = n; i > 0; --i) {
            for (int j = m; j > 0; --j) {
                if (landLen[i][j]) {
                    int Max = (landLen[i][j]+1) << 1;
                    minLength = landLen[i][j];
                    for (int k = j-1; k > 0 && landLen[i][k]; --k) {
                        minLength = min(minLength, landLen[i][k]);
                        int tmp = j-k+1+minLength << 1;
                        Max = max(Max, tmp);
                    }
                    ++idx[Max];
                    maxCircum = max(Max, maxCircum);
                }
            }
        }
        for (int i = 4; i <= maxCircum; ++i)
            if (idx[i])
                printf("%d x %d\n", idx[i], i);
    }
    return 0;
}
```
