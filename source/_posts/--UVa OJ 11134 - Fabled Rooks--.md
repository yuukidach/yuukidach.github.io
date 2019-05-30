---
title: UVa OJ 11134 - Fabled Rooks
date: 2016-08-10
categories: [Programming Exercises, UVa OJ]
tag: [C++, Greedy Algorithm]
toc: true
---
# **Problem**
&emsp;&emsp;在n*n的棋盘上放n（n≤5000）个车，使得任意两个车不相互攻击，且第i个 车在一个给定的矩形Ri之内。用4个整数x<sub>li</sub>, y<sub>li</sub>, x<sub>ri</sub>, y<sub>ri</sub>（1≤x<sub>li</sub>≤x<sub>ri</sub>≤n，1≤y<sub>li</sub>≤y<sub>ri</sub>≤n）描述第i个 矩形，其中(x<sub>li</sub>,y<sub>li</sub>)是左上角坐标，(x<sub>ri</sub>,y<sub>ri</sub>)是右下角坐标，则第i个车的位置(x,y)必须满 足x<sub>li</sub>≤x≤x<sub>ri</sub>，y<sub>li</sub>≤y≤y<sub>ri</sub>。如果无解，输出IMPOSSIBLE；否则输出n行，依次为第1,2,…,n个车 的坐标。

<!-- more -->

# **Input**
The input consists of several test cases. The first line of each of them contains one integer number, n, the side of the board. n lines follow giving the rectangles where the rooks can be placed as described above. The i-th line among them gives x<sub>li</sub>, y<sub>li</sub>, x<sub>ri</sub>, and y<sub>ri</sub>. The input file is terminated with the integer ‘0’ on a line by itself.

# **Output**
Your task is to find such a placing of rooks that the above conditions are satisfied and then output n lines each giving the position of a rook in order in which their rectangles appeared in the input. If there are multiple solutions, any one will do. Output ‘IMPOSSIBLE’ if there is no such placing of the rooks.

# **Sample Input**
```
8
1 1 2 2
5 7 8 8
2 2 5 5
2 2 5 5
6 3 8 6
6 3 8 5
6 3 8 8
3 6 7 8
```

# **Sample Output**
```
1 1
5 8
2 4
4 2
7 3
8 5
6 6
3 7
```

# **Solution**
&emsp;&emsp;这道题用贪心法就能够完成了，可以从整体去考虑，也可以从X和Y轴两个部分去考虑，分别使用贪心法来找到点的坐标。  

&emsp;&emsp;我两个方法都尝试了一下，一开始是自己整块的去考虑，成功AC，然后看了看别人解题的方式，也试着讲X和Y分开来试了下，速度都差不多。但是在用X和Y分开来的时候，出了点状况。就是在希望代码不重复，而对贪心这个步骤进行函数封装的时候，本地测试，使用函数和不实用函数封装，得到的结果都是一样的。但是提交到OJ上的时候，没有函数封装的代码能AC，而封装过的会WA，不管怎么改都是WA。个人比较倾向于可能是在不懂的环境下，传指针的影响会有差别。
不过真正是什么原因，还是有待考究。  

&emsp;&emsp;下面我把AC的代码贴出来。原来利用整块操作的代码不小心被覆盖了，这里就只放出对X和Y分别贪心的做法。  

```C++
#include <cstdio>
#include <algorithm>
#include <cstring>
#include <set>
using namespace std;

const int maxn = 5100;
int n, possi;
set<int> setX, setY;
int idxX[maxn], idxY[maxn]; 

class rect{
public:
	int l, r, id;
	bool operator<(rect &);
} rectX[maxn],rectY[maxn];

bool rect::operator< (rect &rectB){
	return r < rectB.r;
}

inline void inputRect(){
	setX.clear();
	setY.clear();
	for (int i = 1; i <= n; ++i) {
		scanf("%d%d%d%d", &rectX[i].l, &rectY[i].l,
						  &rectX[i].r, &rectY[i].r);
		rectX[i].id = rectY[i].id = i;
		setX.insert(i);
		setY.insert(i);
	}
	setX.insert(maxn);
	setY.insert(maxn);
}

int main(){
	while (scanf("%d", &n) == 1 && n){
		inputRect();
		sort(rectX+1, rectX+n+1);
		sort(rectY+1, rectY+n+1);
		possi = true;
		for (int i = 1; i <= n && possi; ++i) {
			int tempX = *setX.lower_bound(rectX[i].l);
			if (tempX > rectX[i].r) { 
				possi = false;
			}
			idxX[rectX[i].id] = tempX;
			setX.erase(tempX);

			int tempY = *setY.lower_bound(rectY[i].l);
			if (tempY > rectY[i].r) { 
				possi = false;
			}
			idxY[rectY[i].id] = tempY;
			setY.erase(tempY);
		}
		if (possi)
			for (int i = 1; i <= n; ++i)
				printf("%d %d\n", idxX[i], idxY[i]);
		else
			printf("IMPOSSIBLE\n");
	}
	return 0;
}
```
