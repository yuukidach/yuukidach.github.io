---
title: UVa OJ 12627 - Erratic Expansion
date: 2016-09-04
categories: [Programming Exercises, UVa OJ]
tags: [C++]
toc: true
---


# **Problem**
这个问题要带图才能方便理解题意，这里为了节省时间，大家自己去网站看题目就好。~~我真是太懒了~~ :p  

# **Input**
The first line of input is an integer T (T < 1000) that indicates the number of test cases. Each case contains 3 integers K, A and B. The meanings of these variables are mentioned above. K will be in the range [0, 30] and 1 ≤ A ≤ B ≤ 2<sup>K</sup>.

# **Output**
For each case, output the case number followed by the total number of red balloons in rows [A, B] after K-th hour.

# **Sample Input**
```
3
0 1 1
3 1 8
3 3 7
```
# **Sample Output**
```
Case 1: 1
Case 2: 27
Case 3: 14
```

# **Solution**
这道题目递归求解即可。  

用solve(k,i)表示i行及其以上的红球数量，然后根据i大于2<sup>K-1</sup>的一半与否，求出k-1时对应的状态，直到递推边界。  

这里用了一个节省了一点时间的办法，就是用idx数组将需要预先知道的3的倍数储存了起来，方便之后的搜索。（这是我AC之后在网上看到的方法）
```C++
#include <iostream>
using namespace std;

long long k, a, b, tot;
long long idx[31] = {1};

long long solve(long long k, long long i){
    if (!i) return 0;
    if (!k) return 1;
    if (i > (1LL << k-1))
        return (solve(k-1, i-(1LL << k-1)) + 2 * idx[k-1]);
    return 2 * solve(k-1, i);
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);

    int cas, n = 0;
    cin >> cas;
    for (int i = 1; i < 30; ++i)
        idx[i] = 3 * idx[i-1];
    while (++n <= cas){
        cin >> k >> a >> b;
        tot = solve(k, b) - solve(k, a-1);
        cout << "Case " << n  << ": "<< tot << '\n';
    }
    return 0;
}
```
