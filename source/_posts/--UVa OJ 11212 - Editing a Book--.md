---
title: UVa OJ 11212 - Editing a Book
date: 2016-08-05
categories: [Programming Exercises, UVa OJ]
tags: [C++, IDA*]
toc: true
---


# **Problem**
&emsp;&emsp;你有一篇由n（2≤n≤9）个自然段组成的文章，希望将它们排列成1, 2,…, n。可以用 Ctrl+X（剪切）和Ctrl+V（粘贴）快捷键来完成任务。每次可以剪切一段连续的自然段，粘贴时按照顺序粘贴。注意，剪贴板只有一个，所以不能连续剪切两次，只能剪切和粘贴交替。  

&emsp;&emsp;例如，为了将{2,4,1,5,3,6}变为升序，可以剪切1将其放到2前，然后剪切3将其放到4 前。再如，对于排列{3,4,5,1,2}，只需一次剪切和一次粘贴即可——将{3,4,5}放在{1,2}后， 或者将{1,2}放在{3,4,5}前。
<!--more-->

# **Input**
The input consists of at most 20 test cases. Each case begins with a line containing a single integer n (1 < n < 10), thenumber of paragraphs. The next line contains a permutation of 1, 2, 3, . . . , n. The last case is followed by a single zero, which should not be processed.  

&emsp;&emsp;输入的数据最多有二十种情况。每一种情况以一个整数n开头（1<n<10），代表了段落的数量。下一行则包含了从1到n的无序数列。最后一种情况以0结尾，表示输入结束，不用被执行。

# **Output**
For each test case, print the case number and the minimal number of cut/paste operations.  

输出每一种情况所需要移动的最少步骤。

# **Sample Input**
```
6
2 4 1 5 3 6
5
3 4 5 1 2
0
```

# **Sample Output**

```
Case 1: 2
Case 2: 1
```

# **Solution**
入门级的迭代加深搜索，题目不复杂，代码也不是很长。主要还是注意当前深度和乐观估计函数到底是什么。  

不过虽然是这样说，自己debug的时候也是出了点状况的，比如在进行数据前后的交换时，一开始没注意n的范围，直接把交换的范围取到了9，导致出现莫名其妙的数据错误。orz  

嘛，自己毕竟也是刚起步吧，一点点努力吧。下面就把代码贴出来，效率不高，见笑了。

```C++
#include <cstdio>
#include <cstring>
using namespace std;

int n,maxd;
int para[10];

int geth(int a[]){
    int num = 0;
    for (int i = 1; i < n; ++i)
    if (a[i] + 1 != a[i + 1]) num++;
    return num;
}

void change_para(int i, int j, int k, int a[])
{
    int temp1[10], temp2[10];
    memcpy(temp1, a + i, sizeof(int)*j);
    memcpy(temp2, a + i + j, sizeof(int)*k);
    memcpy(a + i, temp2, sizeof(int)*k);
    memcpy(a + i + k, temp1, sizeof(int)*j);
}

bool isok(int a[]){
    for (int i = 1; i <= n; ++i)
        if (i != a[i]) return false;
    return true;
}

bool dfs(int d, int paras[]){
    if (d == maxd)
    if (isok(paras)) return true;

    int h = geth(paras);
    if (3 * d + h <= 3 * maxd)
        for (int i = 1; i < n; ++i)
        for (int j = 1; j <= n - i; ++j)
        for (int k = 1; k <= n + 1 - i - j; ++k){
            int new_para[10];
            memcpy(new_para, paras, sizeof(int)* 10);
            change_para(i, j, k, new_para);
            if (dfs(d + 1, new_para)) return true;
        }
    return false;
}

int main(){
    int cas = 0;
    while (scanf("%d", &n) == 1 && n){
        for (int i = 1; i <= n; ++i)
            scanf("%d", &para[i]);
        for (maxd = 0; maxd < n; ++maxd)
            if (dfs(0, para)) break;
        printf("Case %d: %d\n", ++cas, maxd);
    }
	return 0;
}
```
