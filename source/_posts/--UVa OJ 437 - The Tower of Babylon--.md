---
title: UVa OJ 437 - The Tower of Babylon
date: 2016-09-22
categories: [Programming Exercises, UVa OJ]
tags: [C++, DAG, DP]
toc: true
---

# **Problem**
The babylonians had n types of blocks, and an unlimited supply of blocks of each type. Each type-i block was a rectangular solid with linear dimensions (xi, yi, zi). A block could be reoriented so that any two of its three dimensions determined the dimensions of the base and the other dimension was the height.

They wanted to construct the tallest tower possible by stacking blocks. The problem was that, in building a tower, one block could only be placed on top of another block as long as the two base dimensions of the upper block were both strictly smaller than the corresponding base dimensions of the lower block. This meant, for example, that blocks oriented to have equal-sized bases couldn’t be stacked.

Your job is to write a program that determines the height of the tallest tower the babylonians can build with a given set of blocks.

# **Input**
The input file will contain one or more test cases. The first line of each test case contains an integer n, representing the number of different blocks in the following data set. The maximum value for n is 30.

Each of the next n lines contains three integers representing the values xi , yi and zi.

Input is terminated by a value of zero (0) for n.

# **Output**
‘Case case: maximum height = height’

# **Sample Input**
```
1
10 20 30
2
6 8 10
5 5 5
7
1 1 1
2 2 2
3 3 3
4 4 4
5 5 5
6 6 6
7 7 7
5
31 41 59
26 53 58
97 93 23
84 62 64
33 83 27
0
```

# **Sample Output**
```
Case 1: maximum height = 40
Case 2: maximum height = 21
Case 3: maximum height = 28
Case 4: maximum height = 342
```

# **Solution**
Use DP to solve this problem.

First, save the height, length and width of each blocks in idx[][]. For Example, when we use idx[1][2], it means we choose No.2 block and its thrid line to be be height of the tower.

After dealing with the statistics, we are coming to do the most important work of the programming -- listing the equation.

In my code, I use 'the height of the block1 = max(the height of the block2 +length of block1)' as the equation.

```C++
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int n, maxh, cas;
int idx[31][3], idxh[31][3];

bool canBPiled(int x, int y, int i, int j) {
    int a[2], b[2], cnt1 = 0, cnt2 = 0;
    for (int m = 0; m <3; ++m) {
        if (m != y) a[cnt1++] = idx[x][m];
        if (m != j) b[cnt2++] = idx[i][m];
    }
    if (max(a[0],a[1])>max(b[0], b[1]) && 
        min(a[0],a[1])>min(b[0], b[1]))
        return true;
    return false;
}

int dp(int x, int y) {
    int& ans = idxh[x][y];
    if (ans) return ans;
    ans = idx[x][y];
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < 3; ++j) {
            if (canBPiled (x, y, i, j))
                ans = max(ans, dp(i,j)+idx[x][y]);
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while (cin >> n && n) {
        maxh = 0;
        memset(idxh, 0, sizeof(idxh));
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < 3; ++j)
                cin >> idx[i][j];
        for (int i = 0; i < n; ++i) 
            for (int j = 0; j < 3; ++j) 
                maxh = max(maxh, dp(i, j));
        cout << "Case " << ++cas 
             << ": maximum height = " << maxh << '\n';
    }
    return 0;
}
```
