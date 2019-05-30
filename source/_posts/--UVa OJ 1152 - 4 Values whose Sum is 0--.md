---
title: UVa OJ 1152 - 4 Values whose Sum is 0
date: 2016-08-08
categories: [Programming Exercises, UVa OJ]
tags: [C++, Hash]
toc: true
---



# **Problem**
给定4个n（1≤n≤4000）元素集合A, B, C, D，要求分别从中选取一个元素a, b, c, d，使得 a+b+c+d=0。问：有多少种选法？  


<!-- more -->

# **Input**
The input begins with a single positive integer on a line by itself indicating the number of the cases following, each of them as described below. This line is followed by a blank line, and there is also a blank line between two consecutive inputs.  

&emsp;&emsp;The first line of the input file contains the size of the lists n (this value can be as large as 4000). We then have n lines containing four integer values (with absolute value as large as 2^{28}) that belong respectively to A, B, C and D.  

# **Output**
For each test case, your program has to write the number quadruplets whose sum is zero.
The outputs of two consecutive cases will be separated by a blank line.  

# **Sample Input**
```
1

6
-45 22 42 -16
-41 -27 56 30
-36 53 -37 77
-36 30 -75 -46
26 -38 -10 62
-32 -54 -6 45
```
# **Sample Output**
```
5
```
**Sample Explanation**: Indeed, the sum of the five following quadruplets is zero: (-45, -27, 42, 30),
(26, 30, -10, -46), (-32, 22, 56, -46), (-32, 30, -75, 77), (-32, -54, 56, 30).

# **Solution**
&emsp;&emsp;这道题目思路大家都有，做倒是都能做得出来。但是写代码，不能光考虑答案，还要考虑代码的效率。高效的代码不仅让我们更有成就感，更多的，是对我们能力的锻炼和提升。  

&emsp;&emsp;做这道题目的时候，我第一反应使用哈希表来做，应为哈希表能将搜寻的时间复杂程度降到O(1)。但是真实写起来，倒是遇到了一些麻烦。为了能够尽量的压缩时间，我把测试了一些数据，也和二分查找法进行了比较。RE, CE, TLE的情况都遇到了。下面就稍微具体的说下测试过程吧  

&emsp;&emsp;因为对于哈希表，选择了不同的哈希函数，哈希表的效率也不一样。我最开始是使用斐波那契散列，但是出现了TLE的情况，限于能力有限，没能有效改善代码效率。于是我换成了除法散列。除法散列不同的除数能带来不同的效果，也有会TLE的，但是好好选取的话时间能压缩到很短。我给出的代码里，是我随便选取的一个数字，不是最优的情况，感兴趣的话，可以在这基础上自己改善。  

&emsp;&emsp;测试完了哈希表，我也用了简单直接的二分法来解决这个问题，虽然编写简单，但是效率还是没有哈希表来的要高。  

&emsp;&emsp;额外补充一下，对于abs这个函数，大家在用的时候记得强制装换一下，不然会出现Compilation Error的情况 T^T  

&emsp;&emsp;说了这么多，我还是上代码吧。网上基本没看到用哈希表做这个题目的，希望能给大家一点帮助吧。
```C++
#include <cstdio>
#include <cstring>
#include <cmath>
using namespace std;

class hashTab{
public:
	int v, next = 0, num = 0;
} hashNode[16000001];

int menu[33554433], d;

void creatHash(int x){
	int idx = (int)(abs(x)) % 33554432;
	int cur, pre = 0;
	cur = menu[idx];
	while (cur != 0){
		if (hashNode[cur].v == x){
			hashNode[cur].num++;
			return;
		}
		else {
			pre = cur;
			cur = hashNode[cur].next;
		}
	}
	++d;
	if (!pre)
		menu[idx] = d;
	else
		hashNode[pre].next = d;

	hashNode[d].v = x;
	hashNode[d].num = 1;
	hashNode[d].next = 0;
}

int getCnt(int x){
	int idx = (int)(abs(x)) % 33554432;
	int cur, pre = 0;
	cur = menu[idx];
	while (cur != 0){
		if (hashNode[cur].v == x)
			return hashNode[cur].num;
		else{
			pre = cur;
			cur = hashNode[cur].next;
		}
	}
	return 0;
}

int main(){
	int cas,n,ans;
	int A[4000], B[4000], C[4000], D[4000];
	scanf("%d", &cas);
	while (cas--){
		ans = d = 0;
		memset(menu, 0, sizeof(menu));
		scanf("%d", &n);
		for (int i = 0; i < n; ++i)
			scanf("%d%d%d%d", &A[i], &B[i], &C[i], &D[i]);
		for (int i = 0; i < n; ++i)
		for (int j = 0; j < n; ++j)
			creatHash(A[i] + B[j]);
		
		for (int i = 0; i < n; ++i)
		for (int j = 0; j < n; ++j)
			ans += getCnt(- C[i] - D[j]);
		printf("%d\n", ans);

		if (cas) putchar('\n');
	}
	return 0;
}
```
