---
title: UVa OJ 1605 - Building for UN
date: 2016-08-07
categories: [Programming Exercises, UVa OJ]
tags: [C++]
toc: true
---


# **Problem**
&emsp;&emsp;你的任务是设计一个包含若干层的联合国大楼，其中每层都是一个等大的网格。有若干 国家需要在联合国大楼里办公，你需要把每个格子分配给一个国家，使得任意两个不同的国 家都有一对相邻的格子（要么是同层中有公共边的格子，要么是相邻层的同一个格子）。你设计的大厦最多不能超过1000000个格子。  



<!-- more -->
# **Input**
&emsp;&emsp;输入国家的个数n（n≤50）。  

# **Output**
&emsp;&emsp;输出大楼的层数H、每层楼的行数W和列数L，然后是每层 楼的平面图.不同的国家用不同的大小写字母表示。  

# **Sample Input**
```
4
```
# **Sample Output**
```
2 2 2
AB
CC  

zz
zz
```

# **Solution**
&emsp;&emsp;这个题目没有给定楼层限制，也没有给定国家占地的限制，那么就显得很简单了。因为只需要保证每一个国家和另外一个国家的办公室都有邻边。那么我们可以直接把第一层的每个行分给不同的国家，然后第二层的每个列也分给不同的国家，问题就解决了。下面是简单而粗糙的代码
```C++
#include <cstdio>
using namespace std;

int main(){
	int n,contry[55];
	while (scanf("%d", &n) == 1){
		printf("%d %d %d\n", 2, n, n);
		for (int i = 0; i < n; ++i){
			for (int j = 0; j < n; ++j)
				printf("%c", i < 26 ? 'a' + i : 'A' + i - 26);
			putchar('\n');
		}
		putchar('\n');
		for (int i = 0; i < n; ++i){
			for (int j = 0; j < n; ++j)
				printf("%c", j < 26 ? 'a' + j : 'A' + j - 26);
			putchar('\n');
		}
	}
	return 0;
}
```
