---
title: UVa OJ 1608 - Non-boring sequences
date: 2016-09-10
categories: [Programming Exercises, UVa OJ]
tags: [C++, Divide and conquer]
toc: true
---

# **Problem**
A sequence is called non-boring if its every connected subsequence contains a unique element, i.e. an element such that no other element of that subsequence has the same value.  
&emsp;&emsp;Given a sequence of integers, decide whether it is non-boring.


# **Input**
The first line of the input contains the number of test cases T. The descriptions of the test cases follow:   
&emsp;&emsp;Each test case starts with an integer n (1 ≤ n ≤ 200000) denoting the length of the sequence. In the next line the n elements of the sequence follow, separated with single spaces. The elements are non-negative integers less than 10<sup>9</sup>.


# **Output**
Print the answers to the test cases in the order in which they appear in the input. For each test case print a single line containing the word ‘non-boring’ or ‘boring’.


# **Sample Input**
```
4
5
1 2 3 4 5
5
1 1 1 1 1
5
1 2 3 2 1
5
1 1 2 1 1
```
# **Sample Output**
```
non-boring
boring
non-boring
boring
```

# **Solution**
先找出每个点离它最近的相同点，然后递归，利用分治法从两边向中间搜索，如果有区间的点都能在该区间内找到重复点，那么就表示这个序列是无聊的。

```c++
#include <iostream>
#include <map>
using namespace std;

const int maxn = 200001;
int cas, n;
int x[maxn], l[maxn], r[maxn];

bool ite(int ll, int rr) {
    if (ll >= rr) return true;
    for (int i=ll, j=rr; i<=j; ++i,--j) {
        if (l[i] < ll && r[i] > rr)
            return (ite(ll, i-1) && ite(i+1, rr));
        if (l[j] < ll && r[j] > rr)
            return (ite(ll, j-1) && ite(j+1, rr));
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> cas;
    while (cas--){
        cin >> n;
        for (int i = 0; i < n; ++i)
            cin >> x[i];
        map<int, int> m;
        for (int i = 0; i < n; ++i) {
            if (!m.count(x[i])) l[i] = -1;
            else l[i] = m[x[i]];
            m[x[i]] = i;
        }
        m.clear();
        for (int i = n - 1; i > -1; --i) {
            if (!m.count(x[i])) r[i] = n;
            else r[i] = m[x[i]];
            m[x[i]] = i;
        }
        if (ite(0, n - 1)) cout << "non-boring";
        else cout << "boring";
        cout << '\n';
    }
    return 0;
}
```
