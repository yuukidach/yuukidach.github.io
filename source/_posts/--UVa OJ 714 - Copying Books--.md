---
title: UVa OJ 714 - Copying Books
date: 2016-09-01
categories: [Programming Exercises, UVa OJ]
tags: [Binary Search, Greedy Algorithm, C++]
toc: true
---


# **Problem**
把一个包含m个正整数的序列划分成k个（1≤k≤m≤500）非空的连续子序列，使得每个正 整数恰好属于一个序列。设第i个序列的各数之和为S(i)，你的任务是让所有S(i)的最大值尽 量小。例如，序列1 2 3 2 5 4划分成3个序列的最优方案为1 2 3 | 2 5 | 4，其中S(1)、S(2)、S(3) 分别为6、7、4，最大值为7；如果划分成1 2 | 3 2 | 5 4，则最大值为9，不如刚才的好。每个 整数不超过107。如果有多解，S(1)应尽量小。如果仍然有多解，S(2)应尽量小，依此类推  

# **Input**
The input consists of N cases. The first line of the input contains only positive integer N. Then follow the cases. Each case consists of exactly two lines. At the first line, there are two integers m and k, 1 ≤ k ≤ m ≤ 500. At the second line, there are integers p1, p2, . . . , pm separated by spaces. All these values are positive and less than 10000000.

# **Output**
For each case, print exactly one line. The line must contain the input succession p1, p2, . . . pm divided
into exactly k parts such that the maximum sum of a single part should be as small as possible. Use
the slash character (‘/’) to separate the parts. There must be exactly one space character between any
two successive numbers and between the number and the slash.  
&emsp;&emsp;If there is more than one solution, print the one that minimizes the work assigned to the first scriber,
then to the second scriber etc. But each scriber must be assigned at least one book.

# **Sample Input**
```
2
9 3
100 200 300 400 500 600 700 800 900
5 4
100 100 100 100 100
```
# **Sample Output**
```
100 200 300 400 500 / 600 700 / 800 900
100 / 100 / 100 / 100 100
```

# **Solution**
这道题目基本就是二分加贪心，先确定二分的最值，然后从右往左一步步贪心求范围。不过要记得题目有限制必须是K个区域。
```C++
#include <iostream>
#include <cstring>
using namespace std;

const int maxn = 505;
long long num[maxn], sum[maxn];
char idx[maxn],a[maxn];
long long leftt,rightt,mid;
int m,k,n;

inline bool binSearch(){
    long long val = 0; int cnt = 0;
    memset(idx, 0, sizeof(idx));
    for(int i = m; i >= 1; --i){
        if(val+num[i] <= mid && i >= k-cnt)
            val += num[i];
        else{
            cnt++;
            val = num[i];
            idx[i] = 1;
        }
    }
    if(cnt == k-1){
        memcpy(a, idx ,sizeof(idx));
        return true;
    }
    return false;
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);

    int cas;
    cin >> cas;
    while(cas--){
        rightt = leftt = 0;
        cin >> m >> k;
        for(int i = 1; i <= m; ++i){
            cin >> num[i];
            rightt += num[i];
            leftt = num[i]>leftt ? num[i]:leftt;
        }
        while(rightt >= leftt){
            mid = (leftt+rightt) >> 1;
            if(binSearch()) rightt = mid -1;
            else leftt = mid+1;
        }
        for(int i = 1; i < m; ++i){
            cout << num[i] << ' ';
            if (a[i] == 1) cout << '/' << ' ';
        }
        cout << num[m] << '\n';
    }
    return 0;
}

```
