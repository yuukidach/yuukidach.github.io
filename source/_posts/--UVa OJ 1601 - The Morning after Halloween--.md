---
title: UVa OJ 1601 - The Morning after Halloween
date: 2016-08-04
categories: [Programming Exercises, UVa OJ]
tag: [C++, BFS]
toc: true
---



# **Problem**
You are working for an amusement park as an operator of an obakeyashiki, or a haunted house, in which guests walk through narrow and dark corridors. The house is proud of their lively ghosts, which are actually robots remotely controlled by the operator, hiding here and there in the corridors. One morning, you found that the ghosts are not in the positions where they are supposed to be. Ah, yesterday was Halloween. Believe or not, paranormal spirits have moved them around the corridors in the night. You have to move them into their right positions before guests come. Your manager is eager to know how long it takes to restore the ghosts.  

&emsp;&emsp;In this problem, you are asked to write a program that, given a floor map of a house, finds the smallest number of steps to move all ghosts to the positions where they are supposed to be.  

&emsp;&emsp;A floor consists of a matrix of square cells. A cell is either a wall cell where ghosts cannot move into or a corridor cell where they can.  

&emsp;&emsp;At each step, you can move any number of ghosts simultaneously. Every ghost can either stay in the current cell, or move to one of the corridor cells in its 4-neighborhood (i.e. immediately left, right, up or down), if the ghosts satisfy the following conditions:  
&emsp;&emsp;1. No more than one ghost occupies one position at the end of the step.  

&emsp;&emsp;2. No pair of ghosts exchange their positions one another in the step.  
<!-- more -->

# **Input**
The input consists of at most 10 datasets, each of which represents a floor map of a house. w, h and n in the first line are integers, separated by a space. w and h are the floor width and height of the house, respectively. n is the number of ghosts. They satisfy the following constraints.
<center>4 ≤ w ≤ 16, 4 ≤ h ≤ 16, 1 ≤ n ≤ 3</center>

&emsp;&emsp;Subsequent h lines of w characters are the floor map. Each of cij is either:
&emsp;&emsp;• a ‘#’ representing a wall cell,
&emsp;&emsp;• a lowercase letter representing a corridor cell which is the initial position of a ghost,
&emsp;&emsp;• an uppercase letter representing a corridor cell which is the position where the ghost corresponding
to its lowercase letter is supposed to be, or
&emsp;&emsp;• a space representing a corridor cell that is none of the above.

&emsp;&emsp;In each map, each of the first n letters from a and the first n letters from A appears once and only once. Outermost cells of a map are walls; i.e. all characters of the first and last lines are sharps; and the first and last characters on each line are also sharps. All corridor cells in a map are connected; i.e. given a corridor cell, you can reach any other corridor cell by following corridor cells in the 4-neighborhoods. Similarly, all wall cells are connected. Any 2 × 2 area on any map has at least one sharp. You can assume that every map has a sequence of moves of ghosts that restores all ghosts to the positions where they are supposed to be.
&emsp;&emsp;The last dataset is followed by a line containing three zeros separated by a space.


# **Output**
For each dataset in the input, one line containing the smallest number of steps to restore ghosts intothe positions where they are supposed to be should be output. An output line should not contain extra characters such as spaces.

# **Sample Input**
```
5 5 2
#####
#A#B#
#   #
#b#a#
#####
16 4 3
################
## ########## ##
#    ABCcba    #
################
16 16 3
################
### ##    #   ##
##  #  ##   # c#
#  ## ########b#
# ##  # #   #  #
#  # ##   # # ##
##  a#  # # #  #
### ## #### ## #
##   #   #  #  #
#  ##### # ## ##
####   #B# #   #
##  C#   #   ###
#  # # ####### #
# ######  A##  #
#        #    ##
################
```

# **Sample Output**

```
7
36
77
```
# **Solution**
&emsp;&emsp;依旧是一道最短路径的题目。题目本身并不复杂，也没有太多的技巧性。和以往做过的最短路径题目的区别，无非是多了几个点，无形之中增加了程序的运行时间，但总体上的思路还是一样的。这里为了提高运行效率，利用了双向BFS。  

&emsp;&emsp;题目给的时间上限是12s，这里所贴出的我的代码，运行时间是0.72s，还是比较可观的。在运用双向BFS的基础上，主要是利用了数组和建立空格图块的方法，来减少代码的运行时间。由于一开始看错题目，不想大改，所以代码显得略为冗长，但是便于理解。感兴趣的话，可以试着把代码段压缩一下，效率也会有所提升。  

&emsp;&emsp;需要注意的地方是，用来存储队列的数组，尽量开大一些，避免还没找到重点，BFS就结束了。这道题我提交了三次，前两次都是queue_fro和queue_back开的太小，导致了WA。其余的无非就是注意一下在变量太多且名字相近的情况下，不要打错变量名字就行了。  

&emsp;&emsp;P.S:最近在处理很多别的东西，昨晚又捣鼓了半天系统，更新可能会慢一点吧。~~不过我知道，其实并没有什么人来看我博客啊！   T^T~~
```C++
#include <cstdio>
#include <cstring>
#include <cctype>
using namespace std;

#define pos_now link[i][j]
#define pos_next link[i+next[0][k]][j+next[1][k]]
#define pos_a conn[queue_fro[fro_fro].a][i]
#define pos_b conn[queue_fro[fro_fro].b][j]
#define pos_c conn[queue_fro[fro_fro].c][k]
#define pos_A conn[queue_back[back_fro].a][i]
#define pos_B conn[queue_back[back_fro].b][j]
#define pos_C conn[queue_back[back_fro].c][k]

class Node{
public:
	int a; int b; int c;
};

const int next[2][4] = { { 0, 1, 0, -1 },
                         { 1, 0, -1, 0 } };
int w, h, n, num;
int link[20][20], conn[305][7], vis[305][305][305];
int beg[3], end[3];
int step_fro, step_back,
	back_fro, back_rear,
	 fro_fro,  fro_rear;
Node queue_fro[4000000], queue_back[4000000];
char map[20][20];

void bfs(){
    int fro_cnt = 1, back_cnt = 1;
    vis[beg[0]][beg[1]][beg[2]] = ++step_fro;
    vis[end[0]][end[1]][end[2]] = ++step_back;
    fro_fro  = back_fro  = 0;
    fro_rear = back_rear = 1;
    queue_fro[0].a  = beg[0],queue_fro[0].b  = beg[1],queue_fro[0].c  = beg[2];
    queue_back[0].a = end[0],queue_back[0].b = end[1],queue_back[0].c = end[2];

    while (fro_fro < fro_rear){
        ++step_fro;
        while (fro_cnt--){
            for (int i = 0; pos_a != 0; ++i)
            for (int j = 0; pos_b != 0; ++j)
            for (int k = 0; pos_c != 0; ++k){
                if (beg[2] != 303){
                    if (pos_a == queue_fro[fro_fro].b && pos_b == queue_fro[fro_fro].a) continue;
                    if (pos_a == queue_fro[fro_fro].c && pos_c == queue_fro[fro_fro].a) continue;
                    if (pos_b == queue_fro[fro_fro].c && pos_c == queue_fro[fro_fro].b) continue;
                    if (pos_a == pos_b || pos_a == pos_c || pos_b == pos_c) continue;
                }
                else if (beg[1] != 303){
                    if (pos_a == queue_fro[fro_fro].b && pos_b == queue_fro[fro_fro].a) continue;
                    if (pos_a == pos_b) continue;
				}

                if (vis[pos_a][pos_b][pos_c] > 1000) return;
                if (vis[pos_a][pos_b][pos_c] > 0)  continue;

                vis[pos_a][pos_b][pos_c] = step_fro;
                queue_fro[fro_rear].a = pos_a;
                queue_fro[fro_rear].b = pos_b;
                queue_fro[fro_rear].c = pos_c;
                ++fro_rear;
            }
            ++fro_fro;
        }
        fro_cnt = fro_rear - fro_fro;

        ++step_back;
        while (back_cnt--){
            for (int i = 0; pos_A != 0; ++i)
            for (int j = 0; pos_B != 0; ++j)
            for (int k = 0; pos_C != 0; ++k){
                if (beg[2] != 303){
                    if (pos_A == queue_back[back_fro].b && pos_B == queue_back[back_fro].a) continue;
                    if (pos_A == queue_back[back_fro].c && pos_C == queue_back[back_fro].a) continue;
                    if (pos_B == queue_back[back_fro].c && pos_C == queue_back[back_fro].b) continue;
                    if (pos_A == pos_B || pos_A == pos_C || pos_B == pos_C) continue;
				}
                else if (beg[1] != 303){
                    if (pos_A == queue_back[back_fro].b && pos_B == queue_back[back_fro].a) continue;
                    if (pos_A == pos_B) continue;
                }

                if (vis[pos_A][pos_B][pos_C] > 1000) continue;
                if (vis[pos_A][pos_B][pos_C] > 0) return;

                vis[pos_A][pos_B][pos_C] = step_back;
                queue_back[back_rear].a = pos_A;
                queue_back[back_rear].b = pos_B;
                queue_back[back_rear].c = pos_C;
                ++back_rear;
            }
            ++back_fro;
        }
        back_cnt = back_rear - back_fro;
    }
}

int main(){
    while (scanf("%d%d%d", &w, &h, &n)==3 && n){
        getchar();
        //初始化
        memset(map,  0, sizeof(map));
        memset(vis,  0, sizeof(vis));
        memset(link, 0, sizeof(link));
        memset(conn, 0, sizeof(conn));
        num = step_fro = 0;
        step_back = 1000;
		
        //对图进行输入并处理，建立可移动区域的图
        for (int i = 0; i < h; ++i)
            gets(map[i]);

        for (int i = 0; i < h; ++i)
        for (int j = 0; j < w; ++j)
            if (map[i][j] != '#')  link[i][j] = ++num;
        for (int i =0; i < h;++i)
        for (int j = 0; j < w; ++j){
            if (link[i][j]){
                for (int k = 0; k < 4; ++k){
                    if (pos_next)
                        conn[pos_now][++conn[pos_now][0]] = pos_next;
				}
                conn[pos_now][0] = pos_now;
            }
        }

        beg[0] = beg[1] = beg[2] = end[0] = end[1] = end[2] = 303;
        conn[303][0] = 303;
        for (int i = 0; i < h; ++i)
        for (int j = 0; j < w; ++j){
            if (islower(map[i][j]))
                beg[map[i][j] - 'a'] = pos_now;
            else if (isupper(map[i][j]))
                end[map[i][j] - 'A'] = pos_now;
        }
        bfs();
        printf("%d\n", step_fro + step_back - 1002);
    }
    return 0;
}
```




