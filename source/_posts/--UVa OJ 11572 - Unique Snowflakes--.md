---
title: UVa OJ 11572 - Unique Snowflakes
date: 2016-08-25
categories: [Programming Exercises, UVa OJ]
tag: [C++]
toc: true
---

# **Problem**
输入一个长度为n（n≤10<sup>6</sup>）的序列A，找到一个尽量长的连续子序列A<sub>L</sub>～A<sub>R</sub>，使得该序 列中没有相同的元素。

# **Input**
The first line of input contains one integer specifying the number of test cases to follow. Each test case begins with a line containing an integer n, the number of snowflakes processed by the machine. The following n lines each contain an integer (in the range 0 to 109, inclusive) uniquely identifying a snowflake. Two snowflakes are identified by the same integer if and only if they are identical.  
&emsp;&emsp;The input will contain no more than one million total snowflakes.

# **Output**
For each test case output a line containing single integer, the maximum number of unique snowflakes that can be in a package.

# **Sample Input**
```
1
5
1
2
3
2
1
```

# **Sample Output**
```
3
```

# **Solution**
这道题目不是很复杂，只要设定一个指向区间末端，一个指向数组首端的变量，然后随着区间的移动而偏移即可。  

值得一说的是，这道题目可以说是题目中自带了一个bug,就是输入的数字最大值的问题。我一开始是使用set容器来完成这道题目，耗时0.27s，看到快的人都只用0.07s左右，我自然是希望能把效率尽量提升上去的。于是乎，我就试着把set直接替换成一个数组，来存储我所指到过的数字。  

一开始看到最大的数字是10<sup>9</sup>，而数组并不能开到这么大，因此我就随便把数组开小了点，抱着肯定不能通过的心态，还是想提交一次试试，结果竟然过了，而且只用了0.05s。这里我就把我用时最少的代码贴出来，不过投机取巧的方式终究还是不可靠的，大家最好还是按部就班的来吧。
```C++
#include <iostream>
#include <algorithm>
#include <cmath>
#include <cstring>
using namespace std;

int snowflakes[1000000+1];
int idx[1000000 + 1];
int n;
int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);

	int cas;
	cin >> cas;
	while (cas--){
		int maxSnow = 0;
		int l = 0, r = 0;
		memset(idx, 0, sizeof(idx));
		cin >> n;
		for (int i = 0; i < n; ++i){
			cin >> snowflakes[i];
		}

		while (r < n){
			while (r < n && !idx[snowflakes[r]])
				idx[snowflakes[r++]] = 1;
			maxSnow = max(maxSnow, r - l);
			idx[snowflakes[l++]] = 0;
		}
		cout << maxSnow << '\n';
	}
	return 0;
}
```
