---
title: UVa OJ 1609 - Foul Play
date: 2016-09-15
categories: [Programming Exercises, UVa OJ]
tag: [C++, 迭代]
toc: true
---

# **Problem**
n支队伍(2≤n≤1024,且n是2的整数幂)打淘汰赛,每轮都是两两配对,胜者进入下一轮。每支队伍的实力固定,并且已知每两支队伍之间的一场比赛结果。你喜欢1号队。虽然它不一定是最强的,但是它可以直接打败其他队伍中的至少一半,并且对于每支1号队不能直接打败的队伍t,总是存在一支1号队能直接打败的队伍t'使得t'能直接打败t。问:是否存在一种比赛安排,使得1号队夺冠?

# **Input**
For each test case, the input is as follows:

- One line containing the number of teams n, where n is a power of two and 2 ≤ n ≤ 1024. Teams are numbered from 1 to n, where team 1 is your favourite team.

- n lines, each containing a string of n binary digits.
The k-th digit on the j-th line is ‘1’ if team j would certainly win from team k, otherwise it is ‘0’. A team cannot play against itself, therefore the j-th digit on the j-th line is ‘0’. If j!=k, the k-th digit on the j-th line is different from the j-th digit on the k-th line.

# **Output**
For each test case, print n − 1 lines of output, specifying a tournament schedule that ensures victory for team 1.
&emsp;&emsp;The first n/2 lines describe the first round of the tournament. The next n/4 lines describe the second round, if any, etc. The last line describes the final match.
&emsp;&emsp;Each line contains two integers x and y, indicating that team x plays a match against team y.
&emsp;&emsp;If there are multiple tournament schedules where team 1 wins, any one of those tournament schedules will be accepted as a correct answer.

# **Sample Input**
```
4
0110
0011
0000
1010
8
00111010
10101111
00010010
01000101
00110010
10101011
00010000
10101010
```

# **Sample Output**
```
1 3
2 4
1 2
1 5
3 7
4 8
2 6
1 3
4 2
1 4
```

# **Solution**
先把1队能打败的和不能打败的队伍全部区分开来，然后让不能打败的队伍和能被打败的队伍先互相匹配。接着对1匹配能打败的队伍。再让不能打败的队伍相互之间互相匹配，剩下的就随便匹配。每一次能减少一半的队伍，循环几次即可
```C++
#include <iostream>
#include <cstdio>
#include <vector>
using namespace std;

const int maxn = 1025;
char team[maxn][maxn];
int n;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    //freopen("input.txt" , "r", stdin );
    //freopen("output.txt", "w", stdout);
    while(cin >> n){
        for(int i = 1; i <= n; ++i) {
            cin >> team[i]+1;
        }
        vector<int> win, lose;
        for(int i = 2; i <= n; ++i) {
            if(team[1][i] == '1')
                win.push_back(i);
            else lose.push_back(i);
        }
        int leftTeam = n;
        while (leftTeam > 1) {
            vector<int> winSub, loseSub, round3;
            for(int i = 0; i < lose.size(); ++i) {
                bool matched = false;
                for(int j = 0; j < win.size(); ++j){
                    if(win[j] && team[win[j]][lose[i]] == '1'){
                        cout << win[j] << ' ' <<lose[i] << '\n';
                        matched = true;
                        winSub.push_back(win[j]);
                        win[j] = 0;
                        break;
                    }
                }
                if(!matched) round3.push_back(lose[i]);
            }

            bool isOK = false;
            for(int i = 0; i < win.size(); ++i) {
                if(win[i]) {
                    if(!isOK){
                        cout << "1 " << win[i] << '\n';
                        isOK = true;
                    } else {
                        round3.push_back(win[i]);
                    }
                }
            }

            for(int i = 0; i < round3.size(); i += 2) {
                cout << round3[i] << ' ' << round3[i+1] << '\n';
                int tmp = round3[i+1];
                if(team[round3[i]][tmp] == '1')
                    tmp = round3[i];
                if(team[1][tmp] == '1') winSub.push_back(tmp);
                else loseSub.push_back(tmp);
            }

            win = winSub;
            lose = loseSub;
            leftTeam >>= 1;
        }            
    }
    return 0;
}
```
