---
title: Makefile for Projects with Subdirectories
date: 2019-08-05
categories: [Makefile]
tags: [C, Makefile]
toc: true
---

## Abstract

In order to manage our project easily, we may tend to `make` for help. Usually, our projects will contians many subdirectories. So writing a makefile which can always compile our projects successfully when our project add, delete or modify some sub-dirs is quite important.

## Background

Take my private projects `kmusb` for example.

It file structure is like:

```tree
.
├── README.md
├── arg_parser
│   ├── arg_parser.c
│   └── arg_parser.h
├── bin
├── data
├── kmusb.c
├── kmusb.h
├── makefile
├── obj
├── semihost
│   ├── usb_semihost.c
│   └── usb_semihost.h
├── virtual_com.c
└── virtual_com.h
```

I know the structure is awful. But let's forget about it first, since our final goal is to write a universal makefile that can compile our project, no matter what file structure they have.

For the above project:  

- `main` function is contianed in `kmsub.c`
- `arg_parser/`, `semihost/`are 2 directories that we write our code in them
- `bin/` contains the output file
- `obj/` contains all `*.obj` files and list them just like `*.c` files in the project.
- `data/` is a folder that we store the data created when the program is running

## Practice

### Practice 1 - Write All Targets Directly

To write a most simple makefile, we can code like:

```makefile
TARGET = kmusb

OUTDIR = ./bin
DATADIR = ./data
DIR_INC = ./semihost
DIR_OBJ = ./obj

CC = gcc

objects = kmusb.o usb_5411x.o

.PHONY: clean

$(TARGET): clean $(objects)
    $(CC) -o $(OUTDIR)/$(TARGET) $(objects)

kmusb.o: kmusb.c ./semihost/usb_semihost.h ./arg_parser/arg_parser.h
    $(CC) -I./semihost -I./arg_paser -c kmusb.c

virtual_com.o: virtual_com.c virutual_com.h
    $(CC) -c virtual_com.c

arg_parser.o: ./arg_parser/arg_parser.c ./arg_parser/arg_parser.h
    $(CC) -c ./arg_parser/arg_parser.c

usb_semihost.o: ./semihost/usb_semihost.c ./semihost/usb_semihost.h
    $(CC) -c ./semihost/usb_semihost.c

clean:
    rm -rf $(OUTDIR)/* $(DATADIR)/* *.o
```

We write all the targets directly.

> `.PHONY`: A phony target is one that is not really the name of a file; rather it is just a name for a recipe to be executed when you make an explicit request.  
>
> There are two reasons to use a phony target: to avoid a conflict with a file of the same name, and to improve performance. [\[1\]](#references)

### Pracetice 2 - Use variables

It's unconvinient to write all the target directly. If we modify our project later, we need to change a lot in the makefile. Just like the variable `CC`, we can also define varibles to store the subfolders.

```makefile
TARGET = kmusb

CC = gcc
CFLAGS = -g

OUTDIR = ./bin
DATADIR = ./data
SUBDIR = semihost stream arg_parser
DIR_OBJ = ./obj

INCS = $(wildcard *.h $(foreach fd, $(SUBDIR), $(fd)/*.h))
SRCS = $(wildcard *.c $(foreach fd, $(SUBDIR), $(fd)/*.c))
NODIR_SRC = $(notdir $(SRCS))
OBJS = $(addprefix $(DIR_OBJ)/, $(SRCS:c=o)) # obj/xxx.o obj/folder/xxx .o
INC_DIRS = $(addprefix -I, $(SUBDIR))

.PHONY: clean echoes

$(TARGET): $(OBJS)
    $(CC) -o $(OUTDIR)/$@ $(OBJS)

$(DIR_OBJ)/%.o: %.c $(INCS)
    mkdir -p $(@D)
    $(CC) -o $@ -c $< $(CFLAGS) $(INC_DIRS)

clean:
    rm -rf $(OUTDIR)/* $(DATADIR)/* $(DIR_OBJ)/*

echoes:
    @echo "INC files: $(INCS)"  
    @echo "SRC files: $(SRCS)"
    @echo "OBJ files: $(OBJS)"
```

> `foreach`: It causes one piece of text to be used repeatedly, each time with a different substitution performed on it. It resembles the for command in the shell sh and the foreach command in the C-shell csh.[\[2\]](#references)  
>
> - Systax: `$(foreach var,list,text)`  
>
> `$(@D)`: *automatic variables.* The directory part of the file name of the target, with the trailing slash removed. If the value of `$@` is `dir/foo.o` then `$(@D)` is `dir`. This value is `.` if `$@` does not contain a slash.

Here we add a variable `SUBDIR` and add our subfolders in it. Then we can use `make` syntax like `wildcard`, `foreach`and so on to get all `*.c` and `*.h` file in the project. As for the `obj/` folder, to better maintain all the `*.obj`, we will create folders with the same name as the subfolders in the projects under `obj/`.

Besides, we add a target `echoes` to help us debug our makefile.

Now, our makefile can compile the projects with subfolders easily. Just change the contents in `SUBDIR`.

### Practice 3 - Complete the makefile

From above actions, we wrote a makefile that can adapt to various of projects. This part just some small modification to make our makefile better to look.

```makefile
TARGET = kmusb

CC = gcc
CFLAGS = -g

OUTDIR = ./bin
DATADIR = ./data
SUBDIR = semihost stream arg_parser
DIR_OBJ = ./obj

INCS = $(wildcard *.h $(foreach fd, $(SUBDIR), $(fd)/*.h))
SRCS = $(wildcard *.c $(foreach fd, $(SUBDIR), $(fd)/*.c))
NODIR_SRC = $(notdir $(SRCS))
OBJS = $(addprefix $(DIR_OBJ)/, $(SRCS:c=o)) # obj/xxx.o obj/folder/xxx .o
INC_DIRS = -I./ $(addprefix -I, $(SUBDIR))
LIBS = -largp
LIB_DIRS = -L/usr/local/Cellar/argp-standalone/1.3/lib

PHONY := $(TARGET)
$(TARGET): $(OBJS)
    $(CC) -o $(OUTDIR)/$@ $(OBJS) $(LIB_DIRS) $(LIBS)

$(DIR_OBJ)/%.o: %.c $(INCS)
    mkdir -p $(@D)
    $(CC) -o $@ $(CFLAGS) -c $< $(INC_DIRS)

PHONY += clean
clean:
    rm -rf $(OUTDIR)/* $(DATADIR)/* $(DIR_OBJ)/*

PHONY += echoes
echoes:
    @echo "INC files: $(INCS)"
    @echo "SRC files: $(SRCS)"
    @echo "OBJ files: $(OBJS)"
    @echo "LIB files: $(LIBS)"
    @echo "INC DIR: $(INC_DIRS)"
    @echo "LIB DIR: $(LIB_DIRS)"

.PHONY = $(PHONY)
```

Let's leave alone the include library I added, since our main goal is to write a makefile to complie projects with subfolders. This makefile is copied from my projects.

You see, I adjust the way to write `.PHONY`.

This is a trick that I got from [busybox](https://github.com/mirror/busybox). We add contents to the `.PHONY` wehen we write a new target is easier to maintain the makefile when it grows bigger and bigger.

## References

1. [Phony Targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html)
2. [The foreach Function](https://www.gnu.org/software/make/manual/html_node/Foreach-Function.html)
3. [Automatic Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
4. [busybox GitHub repo](https://github.com/mirror/busybox)
5. [Automatic Directory Creation in Make](http://ismail.badawi.io/blog/2017/03/28/automatic-directory-creation-in-make/)
