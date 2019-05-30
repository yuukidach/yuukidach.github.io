---
title: UVa OJ 12563 - Jin Ge Jin Qu hao
date: 2016-09-24
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**
Here is the: [link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4008)

# **Solution**
这道题目一开始用时间作为一个大循环去进行递推，但是发现并不是很好判断歌曲是否有唱过，所以后来还是采用歌曲作为大循环，再以时间为小循环。不过记得要留出1s来给《劲歌金曲》
```C++
#include <iostream>
#include <cstdio>
#include <cstring>
using namespace std;

int T, n, t, cas, ans;
int song[51], dp[9001];
long long lis[9001];
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    cin >> T;
    while(T--) {
        cin >> n >> t;
        memset(dp, 0x8f, sizeof(dp));
        dp[0] = 0;
        ans = t-1;
        for (int i = 0; i < n; ++i) cin >> song[i];
        for (int i = 0; i < n; ++i) 
            for (int j = t-1; j >= song[i]; --j) 
                dp[j] = max(dp[j], dp[j-song[i]]+1);
        for (int i = t-1; i >=0; --i)
            ans = dp[i]>dp[ans] ? i : ans;
        cout << "Case " << ++cas << ": "
             << dp[ans]+1 << ' ' << ans+678 << '\n';
    }
    return 0;
}
```
