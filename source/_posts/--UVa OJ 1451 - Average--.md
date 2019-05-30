---
title: UVa OJ 1451 - Average
date: 2016-08-29
categories: [Programming Exercises, UVa OJ]
tags: [C++, 单调队列]
toc: true
---

# **Problem**
给定一个长度为n的01串，选一个长度至少为L的连续子串，使得子串中数字的平均值最 大。如果有多解，子串长度应尽量小；如果仍有多解，起点编号尽量小。序列中的字符编号 为1～n，因此[1,n]就是完整的字符串。1≤n≤100000，1≤L≤1000。  

例如，对于如下长度为17的序列00101011011011010，如果L=7，最大平均值为6/8（子 序列为[7,14]，其长度为8）；如果L=5，子序列[7,11]的平均值最大，为4/5。

# **Input**
Your program is to read from standard input. The input consists of T test cases. The number of test cases T is given in the first line of the input. Each test case starts with a line containing two integers n (1 ≤ n ≤ 100, 000) and L (1 ≤ L ≤ 1, 000) which are the length of a binary sequence and a length lower bound, respectively. In the next line, a string, binary sequence, of length n is given.

# **Output**
Your program is to write to standard output. Print the starting and ending index of the subsequence.

# **Sample Input**
```
2
17 5
00101011011011010
20 4
11100111100111110000
```
# **Sample Output**
```
7 11
6 9
```

# **Solution**
说来惭愧，这道题目我WA了快一面了。一开始看错题目，提交了好多次都错了，自己还没反应过来，一个劲傻傻地改。后来发现的时候，已经没有做下去的兴致了。  

不过最终还是把题目完成了的。总的来说，这道题目还是让我有些收获的。题目的解题思路是通过将数列转化成坐标轴上的图像，平均值这时候也就变成了斜率了。然后一个个点去维护下凸函数的单调数列，找到最优解。  

一开始我的cntAverage()这个函数只有三个参数，使用的是除法，提交之后花了0.1s，自己感觉慢了。于是把除法改成了现在的乘法，时间缩短一半，变成了0.05s。可见乘法和除法在计算的效率上还是相差很多的。

```c++
#include <iostream>
#include <string>
using namespace std;

const int maxn = 100005;
int n, L, start, ending,temp;
double maxd;
int DNA[maxn],cav[maxn];
string str;

inline int cntAverage(int L, int r, int LL, int rr, int DNA[]){
	return (DNA[r]-DNA[L])*(rr-LL) - (DNA[rr]-DNA[LL])*(r-L);
}

inline void changePoint(int pits,int bump){
	double temp;
	temp = cntAverage(pits, bump, start-1, ending, DNA);
	if (temp < 0) return;
	if (temp || (bump-pits) < (ending-start+1)){
		maxd = temp;
		start = pits + 1;
		ending = bump;
	}
}

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);

	int cas;
	cin >> cas;
	while (cas--){
		int find = 0, cor = -1;
		cin >> n >> L; cin.get();
		getline(cin, str);
		for (int i = 1; i <= n; ++i)
			DNA[i] = DNA[i-1] + (str[i-1] == '1');
		maxd = DNA[L] / L, start = 1, ending = L;
		for (int i = L; i <= n; ++i){
			temp = i - L;
			while (find < cor && cntAverage(cav[cor], temp, cav[cor - 1], cav[cor], DNA) <= 0)
				--cor;
			cav[++cor] = temp;
			while (find < cor && cntAverage(cav[find], i, cav[find + 1], i, DNA) <= 0)
				++find;
			changePoint(cav[find],i);
		}
		cout << start << ' ' << ending << '\n';
	}
	return 0;
}
```
