---
title: UVa OJ 10954 - Add All
date: 2016-09-03
categories: [Programming Exercises, UVa OJ]
tags: [Priority Queue, C++]
toc: true
---


# **Problem**
有n（n≤5000）个数的集合S，每次可以从S中删除两个数，然后把它们的和放回集合， 直到剩下一个数。每次操作的开销等于删除的两个数之和，求最小总开销。所有数均小于 10<sup>5</sup>。  

# **Input**
Each test case will start with a positive number, N (2 ≤ N ≤ 5000) followed by N positive integers (all are less than 100000). Input is terminated by a case where the value of N is zero. This case should not be processed.

# **Output**
For each case print the minimum total cost of addition in a single line.

# **Sample Input**
```
3
1 2 3
4
1 2 3 4
0
```
# **Sample Output**
```
9
19
```

# **Solution**
题目很简单，就是最小的两个数相加，用优先队列只要几行代码就能完成。但是我为什么还要发一篇文章呢？因为通过这道题目，我知道了一个新的头文件 &lt;functional&gt; . 这里面包含了C++11的一些新特性，用于帮助构造“函数对象”（也称为函子）及其绑定程序。

```C++
#include <iostream>
#include <queue>
#include <functional>
using namespace std;

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);

	int n, ans, temp, a, b;
    priority_queue<int, vector<int>, greater<int>> num;
	while (cin >> n && n){
		ans = 0;
		for (int i = 0; i < n; ++i){
			cin >> temp;
			num.push(temp);
		}
		for (int i = 0; i < n - 1; ++i){
            a = num.top(); num.pop();
            b = num.top(); num.pop();
			num.push(a+b);
            ans += a + b;
		}
		cout << ans << '\n';
        num.pop();
	}
	return 0;
}
```
