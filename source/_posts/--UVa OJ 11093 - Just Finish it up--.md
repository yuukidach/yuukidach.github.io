---
title: UVa OJ 11093 - Just Finish it up
date: 2016-09-05
categories: [Programming Exercises, UVa OJ]
tags: [List, C++]
toc: true
---


# **Problem**
Along a circular track, there are N gas stations, which are numbered clockwise from 1 up to N. At station i, there are pi gallons of petrol available. To race from station i to its clockwise neighbor one need qi gallons of petrol. Consider a race where a car will start the race with an empty fuel tank. Your task is to find whether the car can complete the race from any of the stations or not. If it can then mention the smallest possible station i from which the lap can be completed.  

# **Input**
First line of the input contains one integer T the number of test cases. Each test case will start with a line containing one integer N, which denotes the number of gas stations. In the next few lines contain 2 ∗ N integers. First N integers denote the values of pis (petrol available at station i), subsequent N integers denote the value of qis (amount of patrol needed to go to the next station in the clockwise direction).

# **Output**
For each test case, output the case number in the format “Case c:” , where c is the case number starting form 1. Then display whether it is possible to complete a lap by a car with an empty tank or not. If it is not possible to complete the lap then display “Not possible”. If possible, then display “Possible from station X”, where X is the first possible station from which the car can complete the lap.

- T < 25
- N < 100001



# **Sample Input**
```
2
5
1 1 1 1 1
1 1 2 1 1
7
1 1 1 10 1 1 1
2 2 2 2 2 2 2
```
# **Sample Output**
```
Case 1: Not possible
Case 2: Possible from station 4
```

# **Solution**
这道题可以用链表，从第一个开始遍历，如果遇到了燃料条件不足的车站，则下一次遍历从该车站的下一个站点开始。  

不过还有一个小地方要注意一下，我一开始因为没有注意到如果当遍历开始后，遍历的终点比起点的值还小，就能退出循环了，导致TLE了一次，望大家引以为戒。
```C++
#include <iostream>
using namespace std;

const int maxn = 100005;
int n, temp, pos, isOK, noWay;
int p[maxn], q[maxn], dir[maxn];
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);

    int cas, casCnt = 0;
    cin >> cas;
    while (++casCnt <= cas){
        pos = -1;
        cin >> n;
        for (int i = 0; i < n-1; ++i){
            cin >> p[i];
            dir[i] = i + 1;
        }
        cin >> p[n-1];
        dir[n - 1] = 0;
        for (int i = 0; i < n; ++i)
            cin >> q[i];
        for (int i = 0; i < n;){
            isOK = 1, noWay = 0;
            temp = p[i] - q[i];
            if (temp < 0) { ++i; continue;}
            for (int j = dir[i]; j != i; j = dir[j]){
                temp += p[j] - q[j];
                if (temp < 0) {
                    if (i < j) i = j;
                    else noWay = 1;
                    isOK = 0;
                    break;
                }
            }
            if (noWay) break;
            if (isOK){
                pos = i + 1;
                break;
            }
        }
        cout << "Case " << casCnt << ": ";
        if (pos != -1)
            cout << "Possible from station " << pos << '\n';
        else
            cout << "Not possible" << '\n';
    }
    return 0;
}
```
