---
title: UVa OJ 1220 - Party at Hali-Bula
date: 2016-09-30
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**

Here is the: [problem link](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3661)

# **Solution**
这道题目一开始没有用f[][]来标记是否重复，导致WA了一次，后来就加上去了。另外，在处理人名时，虽然实例输入里，上司和下属名字出现是有先后的，但是提交之后，系统的测试数据貌似不一定是这样，所以要先判断是否出现，没出现就用cnt加1再赋值

递归的思路还是不难的，选了上司，那么直属员工就不选，用d[][0]表示不选;没选的话就可以选直属员工，也可以不选，分别是d[][1]和d[][0]

```C++
#include <iostream>
#include <cstdio>
#include <map>
#include <vector>
#include <cstring>
using namespace std;

#define G sons[b][i]
const int maxn = 205;
int n, res, yn, d[maxn][2], f[maxn][2];  
char c1[maxn], c2[maxn];
map<string, int> p;  
vector<int> sons[maxn];  

int dp(int b,int y) {  
    int& ans = d[b][y];
    if (ans != -1) return ans;  
    int k = sons[b].size();  
    if(!k) {f[b][y] = 1; return ans = y;}  
    int mark = 1;
    if(y) {   
        for(int i = 0; i < k; ++i) {  
            ans += dp(G,0);  
            if(!f[G][0]) mark = 0;  
        }  
    } else {  
        for(int i = 0; i < k; ++i) {  
            if(dp(G, 0) == dp(G, 1)) {mark = 0; ans += d[G][0];}  
            else if(d[G][0] > d[G][1]) {
                if(!f[G][0]) mark = 0; 
                ans += d[G][0]; 
            } else {
                if(!f[G][1]) mark = 0; 
                ans += d[G][1]; 
            }  
        }  
    }  
    f[b][y] = mark;
    return ans += y+1;
}  

int main() {  
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while(cin >> n && n) {  
        p.clear();  
        memset(d, 0xff, sizeof(d)); 
        for(int i = 0;i < n; ++i) sons[i].clear();
        cin >> c2;  
        p[c2] = 0;  
        int cnt = 0;
        for(int i = 1;i < n; ++i) {  
            cin >> c1 >> c2;  
            if(!p.count(c1)) p[c1] = ++cnt;  
            if(!p.count(c2)) p[c2] = ++cnt; 
            sons[p[c2]].push_back(p[c1]);  
        }  
        if(dp(0,0) > dp(0,1)) {res = d[0][0]; yn = f[0][0];}  
        else if(d[0][0] == d[0][1]) {res = d[0][0]; yn = 0;}  
        else {res = d[0][1]; yn = f[0][1];}  
        cout << res;
        if(yn) cout << " Yes\n";  
        else cout << " No\n";  
    }  
    return 0;  
}
```
