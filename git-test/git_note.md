参考资料——<https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192>

## git commit

文件可以从最近的一个commit恢复。

## git log

git log 可以看到提交日志。

参考资料——https://juejin.im/post/5b3f05cae51d4519115cd04a

### 1.查看合并记录

```
git log --graph --pretty=oneline --abbrev-commit
```

#### git版本号

`f2daec61b3f65db8e369fcfa74ba0b68b0085d6e`

git的`commit id` 不是1,2,3,.....递增的数字，而是而是一个`SHA1`计算出来的一个非常大的数字，用十六进制表示。

为什么git不用递增的数字表示？

因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了。

#### git版本

`HEAD` 表示当前版本，也就是最新提交的。上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`。如果是往上100个版本，写成`HEAD~100`

### 2.回退到上一个版本

```
git reset --hard HEAD^
```

当我们还原了文件，能不能再回到现在的版本呢？

如果回退了以后，还想回到最先的版本，先确定版本号，然后

```
git reset --hard 1094a
```

切换版本的原理——

Git内部有指向当前版本的`HEAD`指针，切换版本的时候，仅仅是改变了HEAD的指针指向。

### 3.查找版本号

```
git reflog
```

### 4.撤销修改

`git checkout -- readme.txt`

把`readme.txt` 文件在工作区的修改全部撤销，总之就是让这个文件回到最近一次`git commit` 或 `git add` 的状态。

## 创建与合并分支

版本回退里面，每次提交，Git把他们串成一条时间线，这条时间线就是一个分支。

最开始的时候，master分支是一条线，Git用master指向最新的提交，再用 `HEAD` 指向mater，就能确定当前分支，以及分支的提交点。

每次提交，master分支都会向前移动一步，随着不断提交，master分支的线越来越长。

### 1.创建新分支

创建新分支的时候，Git新建了一个指针 `dev`，指向master相同的提交。然后，把 `HEAD ` 指向 `dev`，就表示当前分支在 `dev` 上。

于是，现在开始对工作区的修改和提交就是针对`dev`分支了。对于工作区的修改，新提交一次以后，`dev` 指针往前一步，master指针不变。

### 2.合并主干

把 `dev` 合到master分支上，就是把master指向 `dev`当前的提交。

### 3.保存分支信息

在commit的时候加上参数 `--no--ff`，删除分支的时候，仍然会保留原来的分支信息。

```
git merge --no-ff -m "merge with no-ff" dev
```

### 4.暂存代码

```
git stash
```

先把工作区的代码储存起来，此时可以切换到另一个分支。

查看暂存列表

```
git stash list
```

恢复stash

```
git stash pop
```

### 5.删除分支

```
git branch -d + 分支名
```

强行删除没有合并过的分支

```
git branch -D + 分支名
```

### 6. 整理提交历史 `git rebase`

```
git rebase -i [startpoint] [endpoint]
```

参考资料 —— <https://juejin.im/entry/5ae9706d51882567327809d0>

### 7.合并主干

```
git rebase origin/master
```

### 8.提交代码

```
git push --force-with-lease origin feature 
```

