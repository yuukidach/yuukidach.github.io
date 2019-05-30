---
title: UVa OJ 1347 - Tour
date: 2016-09-23
categories: [Programming Exercises, UVa OJ]
tags: [C++, DP]
toc: true
---

# **Problem**

John Doe, a skilled pilot, enjoys traveling. While on vacation, he rents a small plane and starts visiting beautiful places. To save money, John must determine the shortest closed tour that connects his destinations. Each destination is represented by a point in the plane pi = < xi, yi > . John uses the following strategy: he starts from the leftmost point, then he goes strictly left to right to the rightmost point, and then he goes strictly right back to the starting point. It is known that the points have distinct x -coordinates.

Write a program that, given a set of n points in the plane, computes the shortest closed tour that connects the points according to John's strategy.

# **Input**
The program input is from a text file. Each data set in the file stands for a particular set of points. For each set of points the data set contains the number of points, and the point coordinates in ascending order of the x coordinate. White spaces can occur freely in input. The input data are correct.

# **Output**
For each set of data, your program should print the result to the standard output from the beginning of a line. The tour length, a floating-point number with two fractional digits, represents the result.

Note: An input/output sample is in the table below. Here there are two data sets. The first one contains 3 points specified by their x and y coordinates. The second point, for example, has the x coordinate 2, and the y coordinate 3. The result for each data set is the tour length, (6.47 for the first data set in the given example).

# **Sample Input**
```
3 
1 1
2 3
3 1
4 
1 1 
2 3
3 1
4 2
```

# **Sample Output**
```
6.47
7.89
```

# **Solution**
Another DP problem.

len[i][j] represents the sum of the distance between destination and x[i],x[j].

'std::setprecision()' can help us set the decimal precision to be used to format floating-point values on out put operations. And 'std::cout.setf(ios::fixed)' makes cout display floating-point values in fixed point notation.
```C++
#include <iostream>
#include <cstdio>
#include <iomanip>
#include <cmath>
using namespace std;

const int maxn = 61;
int n;
double x[maxn], y[maxn];
double dist[maxn][maxn], len[maxn][maxn];
int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while(cin >> n) {
        for (int i = 0; i < n; ++i)
            cin >> x[i] >> y[i];
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                dist[i][j] = sqrt((x[i]-x[j])*(x[i]-x[j]) + 
                                  (y[i]-y[j])*(y[i]-y[j]));
        for (int i = n-2; i > 0; --i) {
            for (int j = 0; j < i; ++j) {
                if ( i == n-2) 
                    len[i][j] = dist[i][n-1] + dist[j][n-1];
                else
                    len[i][j] = min(len[i+1][j]+dist[i+1][i], 
                                    len[i+1][i]+dist[i+1][j]);
            }
        }
        double ans = dist[1][0] + len[1][0];
        cout.setf(ios::fixed);
        cout << setprecision(2) << ans << '\n';
    }
    return 0;
}
```
