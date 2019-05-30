---
title: UVa OJ 12186 - Another Crisis
date: 2016-09-29
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**
A couple of years ago, a new world wide crisis started, leaving many people with economical problems.  Some workers of a particular company are trying to ask for an increase in their salaries.

The company has a strict hierarchy, in which each employee has exactly one direct boss, with the exception of the owner of the company that has no boss. Employees that are not bosses of any other employee are called workers. The rest of the employees and the owner are called bosses.  To ask for a salary increase, a worker should file a petition to his direct boss. Of course, each boss is encouraged to try to make their subordinates happy with their current income, making the company’s profit as high as possible. However, when at least T percent of its direct subordinates have filed a petition, that boss will be pressured and have no choice but to file a petition himself to his own direct boss. Each boss files at most 1 petition to his own direct boss, regardless on how many of his subordinates filed him a petition. A boss only accounts his direct subordinates (the ones that filed him a petition and the ones that didn’t) to calculate the pressure percentage.

Note that a boss can have both workers and bosses as direct subordinates at the same time. Such a boss may receive petitions from both kinds of employees, and each direct subordinate, regardless of its kind, will be accounted as 1 when checking the pressure percentage.

When a petition file gets all the way up to the owner of the company, all salaries are increased. The workers’ union is desperately trying to make that happen, so they need to convince many workers to file a petition to their direct boss.

Given the company’s hierarchy and the parameter T, you have to find out the minimum number of workers that have to file a petition in order to make the owner receive a petition.

# **Input**
There are several test cases. The input for each test case is given in exactly two lines. The first line contains two integers N and T (1 ≤ N ≤ 105 , 1 ≤ T ≤ 100), separated by a single space. N indicates the number of employees of the company (not counting the owner) and T is the parameter described above. Each of the employees is identified by an integer between 1 and N. The owner is identified by the number 0. The second line contains a list of integers separated by single spaces. The integer Bi , at position i on this list (starting from 1), indicates the identification of the direct boss of employee i (0 ≤ Bi ≤ i − 1).

The last test case is followed by a line containing two zeros separated by a single space.

# **Output**
For each test case output a single line containing a single integer with the minimum number of workers that need to file a petition in order to get the owner of the company to receive a petition.

# **Sample Input**
```
3 100
0 0 0
3 50
0 0 0
14 60
0 0 1 1 2 2 2 5 7 5 7 5 7 5 0 0
```
# **Sample Output**
```
3
2
5
```

# **Solution**
从老板开始，先询问第一层的员工每个人如果要签字，需要各自多少员工签字，然后第二层，第三层……直到最后一层

接着排序，把需要最少的排前面，相加即可
```C++
#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

const int maxn = 1e5+2;
int n,t;
vector<int> b[maxn];

int dp(int x) {
    if (b[x].empty()) return 1;
    vector<int> son;
    int len = b[x].size();
    for (int i = 0; i < len; ++i) son.push_back(dp(b[x][i]));
    sort(son.begin(), son.end());
    int ans = 0, bor = (len*t-1)/100+1;
    for (int i = 0; i < bor; ++i) ans += son[i];
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while (cin >> n >> t && n) {
        int tmp;
        for (int i = 1; i <= n; ++i) {
            cin >> tmp;
            b[tmp].push_back(i);
        }
        cout << dp(0) << '\n';
        for (int i = 0; i <= n; ++i) b[i].clear();
    }
    return 0;
}
```
