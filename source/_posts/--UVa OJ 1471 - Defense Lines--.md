---
title: UVa OJ 1471 - Defense Lines
date: 2016-08-26
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---



# **Problem**
After the last war devastated your country, you - as the king of the land of Ardenia - decided it was high time to improve the defense of your capital city. A part of your fortification is a line of mage towers, starting near the city and continuing to the northern woods. Your advisors determined that the quality of the defense depended only on one factor: the length of a longest contiguous tower sequence of increasing heights. (They gave you a lengthy explanation, but the only thing you understood was that it had something to do with firing energy bolts at enemy forces).  
&emsp;&emsp;After some hard negotiations, it appeared that building new towers is out of question. Mages of Ardenia have agreed to demolish some of their towers, though. You may demolish arbitrary number of towers, but the mages enforced one condition: these towers have to be consecutive.  
&emsp;&emsp;For example, if the heights of towers were, respectively, 5, 3, 4, 9, 2, 8, 6, 7, 1, then by demolishing
towers of heights 9, 2, and 8, the longest increasing sequence of consecutive towers is 3, 4, 6, 7.  

# **Input**
The input contains several test cases. The first line of the input contains a positive integer Z ≤ 25, denoting the number of test cases. Then Z test cases follow, each conforming to the format described below.  
&emsp;&emsp;The input instance consists of two lines. The first one contains one positive integer n ≤ 2 · 10<sup>5</sup> denoting the number of towers. The second line contains n positive integers not larger than 10<sup>9</sup> separated by single spaces being the heights of the towers.

# **Output**
For each test case, your program has to write an output conforming to the format described below.  
&emsp;&emsp;You should output one line containing the length of a longest increasing sequence of consecutive towers, achievable by demolishing some consecutive towers or no tower at all.
  

# **Sample Input**
```
2
9
5 3 4 9 2 8 6 7 1
7
1 2 3 10 4 5 6
```
# **Sample Output**
```
4
6
```

# **Solution**
这道题目可以用O(n)的时间先遍历一遍，把以数列中各个数字作为起始和截止的小区间长度分别表示出来，然后再取一个数组，使着以每个区间长度为下标，以区间所在的最后一个数字为值，不断的去优化这个数组，即可得出结果。
```C++
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

const int maxn = 2*1e5+1;
int n,ans;
int a[maxn],g[maxn],f[maxn],bin[maxn];
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);

	int cas;
	cin >> cas;
	while (cas--){
		cin >> n;
		for (int i = 1; i <= n; ++i){
			cin >> a[i];
			if (a[i]>a[i - 1])
				g[i] = g[i - 1] + 1;
			else g[i] = 1;
		}
		a[n + 1] = 0;
		for (int i = n; i > 0; --i){
			if (a[i] < a[i + 1])
				f[i] = f[i + 1] + 1;
			else f[i] = 1;
		}

		ans = 0;
		memset(bin, 0x7f, sizeof(bin));
		bin[0] = -1;
		for (int i = 1; i <= n; ++i){
			ans = max(ans, int(f[i]+lower_bound(bin, bin+n, a[i])-bin-1));
			bin[g[i]] = min(bin[g[i]], a[i]);
		}

		cout << ans << '\n';
	}
	return 0;
}
```
