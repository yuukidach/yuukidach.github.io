---
title: UVa OJ 1606 - Amphiphilic Carbon Molecules
categories: [Programming Exercises, UVa OJ]
tag: [C++]
toc: true
date: 2016-08-16
---


# **Problem**
平面上有n（n≤1000）个点，每个点为白点或者黑点。现在需放置一条隔板，使得隔板一侧的白点数加上另一侧的黑点数总数最大。隔板上的点可以看作是在任意一侧。

# **Input**
不超过10个测试情况。每种情况以一个整数N开始，代表点的个数，接着输入N行x,y,r，分别表示坐标点的x坐标，y坐标和点的颜色，其中1是黑色。输入以0结束。

<!-- more -->

# **Output**
For each test case, output a line containing a single integer, which is the maximum number of dots we count.

# **Sample Input**
```
3
0 0 0
0 1 0
2 2 1
4
0 0 0
0 4 0
4 0 0
1 2 1
7
-1 0 0
1 2 1
2 3 0
2 1 1
0 3 1
1 4 0
-1 2 0
0
```
# **Sample Output**
```
3
3
6
```
# **Solution**
扫描问题。只需要以一个点为基准点，然后做线，统计两边的点的数量就行。
<br/>
在做这道题的时候，只是一个小小等式的区别，导致我TLE了好多次。后来也是测试了好久，才发现了这个问题。究其原因，还是取模太耗费时间，于是我就把取模的部分做了点修改，最终成功通过。
<br/>
这里我利用先排序的方式，选好基准点之后，对每个点关于基准点的角度进行排序，然后才开始真正的扫描。
```C++
#include<iostream>
#include<algorithm>
#include<cmath>
using namespace std;

const int N=1001;

class Point{
public:
    int x,y,color;
    double rad;
    bool operator<(const Point &rhs)const{
        return rad<rhs.rad;
    }
}dot[N],tempDot[N];

int n, num;

bool isInArea(Point A,Point B){
    return A.x*B.y-A.y*B.x>=0;
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);

    while(cin>>n && n){
        for(int i=0;i<(n);i++)
            cin >> dot[i].x >> dot[i].y >> dot[i].color;
        if(n<=2) return 2;
        int ans=0;

        for(int i=0;i<n;i++){
            num=0;
            for(int j=0;j<n;j++){
                if(j == i) continue;
                tempDot[num].x=dot[j].x-dot[i].x;
                tempDot[num].y=dot[j].y-dot[i].y;
                if(dot[j].color){
                    tempDot[num].x=-tempDot[num].x;
                    tempDot[num].y=-tempDot[num].y;
                }
                tempDot[num].rad=atan2(tempDot[num].y,tempDot[num].x);
                num++;
            }
            sort(tempDot,tempDot+num);

            int divi=0,scani=0,cnt=2;
            while(divi<num){
            if(scani==divi){
                scani=scani+1;
                if(scani >= num) scani = scani-num;
                cnt++;
            }
            while(scani!=divi && isInArea(tempDot[divi],tempDot[scani])){
                scani=scani+1;
                if(scani >= num) scani = scani-num;
                cnt++;
            }
            cnt--;
            divi++;
            ans=max(ans,cnt);
            }
        }
        cout << ans << '\n';
    }
    return 0;
}

```
