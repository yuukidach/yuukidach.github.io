---
title: UVa OJ 120 - Stacks of Flapjacks
date: 2016-08-06
categories: [Programming Exercises, UVa OJ]
tags: [C++]
toc: true
---



# **Problem**
&emsp;&emsp;有一叠煎饼正在锅里。煎饼共有n（n≤30）张，每张都有一个数字，代表它的大小，如 图8-11所示。厨师每次可以选择一个数k，把从锅底开始数第k张上面的煎饼全部翻过来，即 原来在上面的煎饼现在到了下面。  

&emsp;&emsp;设计一种方法使得所有煎饼按照从小到大排序（最上面的煎饼最小）。输入时，各个煎 饼按照从上到下的顺序给出。  

# **Input**
The input consists of a sequence of stacks of pancakes. Each stack will consist of between 1 and 30 pancakes and each pancake will have an integer diameter between 1 and 100. The input is terminated by end-of-file. Each stack is given as a single line of input with the top pancake on a stack appearing first on a line, the bottom pancake appearing last, and all pancakes separated by a space.  

输入是一串薄饼的数据。每一串数据能有2到29个薄饼，并且每个薄饼的直径在1到100之间。输入以EOF结束。每串数据中，第一个数据时在最上面的饼，最后一个数据则是最下面的饼，所有的数据用空格间隔开来。  

# **Output**
For each stack of pancakes, the output should echo the original stack on one line, followed by some sequence of flips that results in the stack of pancakes being sorted so that the largest diameter pancake is on the bottom and the smallest on top. For each stack the sequence of flips should be terminated by a 0 (indicating no more flips necessary). Once a stack is sorted, no more flips should be made.  

把你每一次翻薄饼的层数输出来，最后补充一个0，每个数据中间还是用空格隔开。  

# **Sample Input**
```
1 2 3 4 5
5 4 3 2 1
5 1 2 3 4
```
# **Sample Output**
```
1 2 3 4 5
0
5 4 3 2 1
1 0
5 1 2 3 4
1 2 0
```

# **Solution**
这道题目基本需要多加考虑，按照题目意思翻薄饼就行了。不过我从这题中还是有点收获，就是自己的代码格式太不好看了，而且不够简洁。还是花点时间看*Clean Code*吧  

下面是我的丑陋代码
```C++
#include <cstdio>
#include <iostream>
#include <string>
#include <sstream>
#include <cstring>
using namespace std;

int pancake[105], n, cnt;
int flip[105], temp[105];

int main(){
	string  getcake;
	while (getline(cin, getcake)){
		stringstream pan(getcake);
		memset(pancake, 0, sizeof(pancake));
		memset(flip, 0, sizeof(flip));
		n = cnt = 0;
		while (pan >> pancake[n++]);
		--n;

		for (int i = 0; i < n; ++i)
			printf("%d ", pancake[i]);
		putchar('\n');

		for (int i = n-1; i >= 0; --i){
			int maxn = i - 1, idx = 0;
			for (int j = 0; j <= i; ++j){
				if (maxn < pancake[j]){
					maxn = pancake[j];
					idx = j;
				}
			}
			if (idx == i)
				continue;
			if (idx == 0){
				flip[cnt++] = n-i;
				memcpy(temp, pancake, sizeof(int)*(i + 1));
				for (int k = i; k >= 0; --k)
					pancake[i - k] = temp[k];
				continue;
			}
			flip[cnt++] = n - idx;
			memcpy(temp, pancake, sizeof(int)*(idx + 1));
			for (int k = idx; k >= 0; --k)
				pancake[idx - k] = temp[k];
			flip[cnt++] = n - i;
			memcpy(temp, pancake, sizeof(int)*(i + 1));
			for (int k = i; k >= 0; --k)
				pancake[i - k] = temp[k];
		}

		for (int i = 0; i < cnt; ++i)
			printf("%d ", flip[i]);
		printf("0\n");
	}
	return 0;
}
```
