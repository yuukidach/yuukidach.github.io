---
title: UVa OJ 10603 - Fill
date: 2016-08-01
categories: [Programming Exercises, UVa OJ]
tag: [C++, BFS]
toc: true
---


# **Problem**
There are three jugs with a volume of a, b and c liters. (a, b, and c are positive integers not greater than 200). The first and the second jug are initially empty, while the third is completely filled with water. It is allowed to pour water from one jug into another until either the first one is empty or the second one is full. This operation can be performed zero, one or more times. 

You are to write a program that computes the least total amount of water that needs to be poured; so that at least one of the jugs contains exactly d liters of water (d is a positive integer not greater than 200). If it is not possible to measure d liters this way your program should find a smaller amount of water d′ < d which is closest to d and for which d′ liters could be produced. When d′ is found, your program should compute the least total amount of poured water needed to produce d′ liters in at least one of the jugs.
<!-- more -->
# **Input**
The first line of input contains the number of test cases. In the next T lines, T test cases follow. Each test case is given in one line of input containing four space separated integers — a, b, c and d.

# **Output**
The output consists of two integers separated by a single space. The first integer equals the least total amount (the sum of all waters you pour from one jug to another) of poured water. The second integer equals d, if d liters of water could be produced by such transformations, or equals the closest smaller value d′ that your program has found.

# **Sample Input**
```
2
2 3 4 2
96 97 199 62
```

# **Sample Output**

```
2 2
9859 62
```
# **Solution**
这是一个最短路径问题，利用BFS即可以得到答案。 

主要还是需要注意运行时间问题，尽量将循环的范围缩小。同时，使用memset对字节进行操作也能起到提升速度的作用。

这里在做完题目以后恰好看到了[Morris's Blog](http://morris821028.github.io/2014/05/05/oj/uva/uva-10603/)，感觉他的代码格式看起来很舒服，也便于大家理解，因此将代码格式改得和他基本一样了，只做了一点微小的改动。大家可以也去他的Blog逛一逛，还是有很大收获的。
```C++
#include <cstdio>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

#define sf 0x7f
const int maxn = 201;
queue<int> qa,qb,qc,qd;
int vis[maxn][maxn][maxn],water[maxn];
int A, B, C, D;

void Push_Node(int a, int b, int c, int d){
    qa.push(a), qb.push(b), qc.push(c), qd.push(d);
}

void bfs(int a,int b,int c, int d){
    Push_Node(a, b, c, d);

    while (!qa.empty()){
        a = qa.front(), qa.pop();
        b = qb.front(), qb.pop();
        c = qc.front(), qc.pop();
        d = qd.front(), qd.pop();

        if (d >= water[D])      continue;
        if (d >= vis[a][b][c])  continue;
		
        vis[a][b][c] = d;				
		water[a] = min(water[a], d);    
		water[b] = min(water[b], d);
		water[c] = min(water[c], d);

        if (a < B-b) Push_Node(0, b+a, c, d+a);
        else	     Push_Node(a-(B-b), B, c, d+(B-b));
        if (a < C-c) Push_Node(0, b, c+a, d+a);
        else         Push_Node(a-(C-c), b, C, d+(C-c));
        if (b < A-a) Push_Node(a + b, 0, c, d + b);
        else         Push_Node(A, b-(A-a), c, d+(A-a));
        if (b < C-c) Push_Node(a, 0, c+b, d+b);
        else         Push_Node(a, b-(C-c), C, d+(C-c));
        if (c < A-a) Push_Node(a+c, b, 0, d+c);
        else         Push_Node(A, b, c-(A-a), d+(A-a));
        if (c < B-b) Push_Node(a, b+c, 0, d+c);
        else         Push_Node(a, B, c-(B-b), d+(B-b));
    }
}

int main(){
    int cas,a,b,c,d;
    scanf("%d",&cas);
    while (cas--){
        scanf("%d%d%d%d", &A, &B, &C, &D);
        memset(water, sf, sizeof(water));
        for (int i = 0; i <= A; i++)
            for (int j = 0; j <= B; j++)
                for (int k = 0; k <= C; k++)
                    vis[i][j][k] = 0x7ffffff;
        bfs(0, 0, C, 0);
        while (water[D] == 0x7f7f7f7f)	D--;
        printf("%d %d\n", water[D], D);
    }
    return 0;
}
```
