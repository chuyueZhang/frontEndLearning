# 算法练习纪录
## 两数之和
### 问题描述
>给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
* 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
### 示例
>给定 nums = [2, 7, 11, 15], target = 9
>
>因为 nums[0] + nums[1] = 2 + 7 = 9
>所以返回 [0, 1]
### 思路
1. 使用哈希表保存数组中的值与索引的映射关系
2. 在数组里的映射关系插入哈希表前就可以判断哈希表中是否存在对应映射能够完成题目要求
3. 如果存在就找了对应关系，否则继续插入哈希表
### 实现
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function sum(nums, target){
    const map = new Map()
    for(let i = 0; i < nums.length; i++){
        const right = map.get(target-nums[i])
        map.set(nums[i], i)
        if(right !== undefined){
            return [right, map.get(nums[i])]
        }
    }
}
```
## 升序数组中的两数之和
### 问题描述
>给定一个已按照升序排列的有序数组，找到两个数使得它们相加之和等于目标数。函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
* 说明:
  * 返回的下标值（index1 和 index2）不是从零开始的。
  * 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素
### 示例
>给定 nums = [2, 7, 11, 15], target = 9
>
>因为 nums[0] + nums[1] = 2 + 7 = 9
>所以返回 [0, 1]
### 思路
1. 可以利用数组的有序特性
2. 使用两个指针指向数组的开头与结尾
3. 计算两值之和
4. 如果两值之和就是目标值则满足要求
5. 否则当两值之和大于目标值时可以向左移动右指针，否则移动左指针
6. 当两值之和小于目标值时可以向右移动左指针
7. 重复步骤3-6
### 实现
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 function sum(nums, target){
    let left = 0
    let right = numbers.length-1
    while(true){
        let sum = numbers[left] + numbers[right]
        if(left === right) return []
        if(sum === target){
            return [left+1,right+1]
        }
        if(sum > target){
            right--
        }else{
            left++
        }
    }
}
```
## 对称二叉树
### 问题描述
>给定一个二叉树，检查它是否是镜像对称的
### 示例
```
    1                   
   / \
  2   2
 / \ / \
3  4 4  3 true
```
```
    1
   / \
  2   2
   \   \
   3    3 false
```
### 思路
1. 如果两个树的顶点值是相同的则说明两个树可能是对称的，执行后面步骤，否则返回false
2. 递归判断第一个树的左子树与第二个树的右子树满不满足步骤1
3. 递归判断第一个树的右子树与第二个树的左子树满不满足步骤1
4. 步骤3和步骤4都不返回false才返回true
### 实现
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetric = function(root) {
     function symmetric(left, right){
         if(left===null&&right===null) return true
         if(left!==null&&right!==null){
             if(left.val !== right.val)else return false
             return symmetric(left.left, right.right)&&symmetric(left.right, right.left)
         }else{
             return false
         }
     }
     if(root === null) return true
     symmetric(root.left, root.right)
 }
```
## 合并二叉树
### 问题描述
>给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。
### 示例
* 输入
```
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7           
```
* 输出
```
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7
```
### 根本思路
* 本质是遍历
* 将T1变成新生成的树结构，最后返回T1
### 思路
1. 递归判断T1的左子树与T2的左子树
2. 递归判断T1的右子树与T2的右子树
   1. 在递归中如果T1为null直接返回T2
   2. 在递归中如果T2为null直接返回T1
   3. 如果T1的左子树或右子树为null则将T2的左子树或右子树直接赋值给T1同时自己置为null(由于这一步存在,在递归中T1不可能为null)
   4. 返回T1
### 实现
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    function preTraversal(t1,t2){
        if(t1 === null){
            return t2
        }
        if(t2 === null){
            return t1
        }
        t1.val += t2.val
        if(t1.left === null){
            t1.left = t2.left
            t2.left = null
        }
        if(t1.right === null){
            t1.right = t2.right
            t2.right = null
        }
        preTraversal(t1.left,t2.left)
        preTraversal(t1.right,t2.right)
        return t1
    }
    return preTraversal(t1, t2)
};
```
## 汉明距离
### 问题描述
>两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。

给出两个整数 x 和 y，计算它们之间的汉明距离。
### 示例
* 输入
```
x = 1, y = 4   
```
* 输出
```
2
```
* 解释
```
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
```
### 思路
1. 对两个数字进行位异或操作，这个值的二进制位值为1则说明x,y的同一位置二进制值不同
2. 除以2取余数，当余数为1时说明当前二进制值为1, 将这个数等于自身除以2
3. 将余数为1的次数统计起来就是最终结果
### 实现
```javascript
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let length = x^y
    let counter = 0
    while(length > 0){
        if((length%2) === 1) counter++
        length = Math.floor(length/2)
    }
    return counter
};
```
## 翻转二叉树
### 问题描述
>翻转一棵二叉树。
### 示例
* 输入
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
* 输出
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
### 思路
1. 如果当前节点为null直接返回当前节点
2. 声明临时变量保存左子树
3. 将左子树的指针指向右子树
4. 将右子树的指针指向临时变量
5. 以当前节点的左子树为参数进行递归
6. 以当前节点的右子树为参数进行递归
7. 返回当前节点
### 实现
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root === null) return root
    const temp = root.left
    root.left = root.right
    root.right = temp
    invertTree(root.left)
    invertTree(root.right)
    return root
};
```
## 二叉树的最大深度
### 问题描述
>给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。
### 示例
* 输入
```
    3
   / \
  9  20
    /  \
   15   7
```
* 输出
```
3
```
### 思路
1. 判断当前节点root是不是null，是则直接返回
2. 将root与当前深度deep当做参数开始递归
   1. 如果当前节点不是null，深度deep++，否则直接返回deep
   2. 分别保存递归左子树与递归右子树返回的值
   3. 返回两者之间较大的值
3. 返回递归函数最终的返回值
### 实现
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    function find(root, deep){
        if(root!==null){
            deep++
            const v1 = find(root.left, deep)
            const v2 = find(root.right, deep)
            if(v1 > v2) return v1
            return v2
        }else{
            return deep
        }
    }
    let deep = 0
    if(root === null) return deep
    return find(root, deep)
};
```
## 反转链表
### 问题描述
>反转一个单链表。
### 示例
* 输入
```
1->2->3->4->5->NULL
```
* 输出
```
5->4->3->2->1->NULL
```
### 递归
#### 思路
1. 反转链表需要从最深处的节点开始，因此要先递归再操作
2. 假设链表中某个节点Kn之后的节点都反转完成，从kn开始反转要进行以下操作
   1. 如果当前节点是空直接返回反转链表头
   2. 如果当前节点的下一个节点是空也返回反转链表头
   3. 将kn-1.next.next = kn-1 将kn指向前一个节点
   4. kn-1 = null   将kn前一个节点的next置为null，防止在最终反转的链表的最后一个节点会产生小循环
   5. 将保存好的反转链表的链表头返回
#### 实现
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head === null || head.next === null) return head
    const p = reverseList(head.next)
    head.next.next = head
    head.next = null
    return p
};
```
### 迭代
#### 思路
1. 单向链表末尾一定指向null因此先用now保存head的next再让head的next指向null
2. 进入循环直到now的值为null时退出循环
   1. 使用next保存now的next
   2. 让now的next指向head
   3. 使head变成现在的now
   4. now变成变成现在的next
3. 返回head
#### 实现
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head === null) return head
    let now = head.next
    head.next = null
    while(now !== null){
            let next = now.next
            now.next = head
            head = now
            now = next 
    }
    return head
};
```
## 合并两个有序链表
### 问题描述
>将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
### 示例
* 输入
```
1->2->4, 1->3->4
```
* 输出
```
1->1->2->3->4->4
```
### 递归
#### 思路
1. 将一个递归函数认为是一次正确的合并
2. 如果l1的值小于l2的值则将l1的下一个节点与l2合并
3. 否则将l2的下一个节点与l1合并
4. 当l1是null时直接返回当前l2指向的那个节点
5. 当l2是null时直接返回当前l1指向的那个节点
#### 实现
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
        if(l1 === null){
            return l2
        }
        if(l2 === null){
            return l1
        }
        if(l1.val <= l2.val){
            l1.next = mergeTwoLists(l1.next, l2)
            return l1
        }else{
            l2.next = mergeTwoLists(l1, l2.next)
            return l2
        }
};
```
### 迭代
#### 思路
1. 创建一个新的节点prehead方便保存最终链表的头部，val可以任意
2. 声明prev来保存当前迭代将要插入在后面的前一个节点，初始值是prehead
3. 比较l1与l2
   1. l1值大则将l1插入prev的后面，让prev指向当前l1，l1赋值为l1的next那个节点
   2. l2值大则将l2插入到prev的后面，让prev指向当前l2，l2赋值为l2的next那个节点
4. 当l1为空则将剩余l2全部插入到prev后面
5. 当l2为空则将剩余l1全部插入到prev后面
6. 返回prehead的下一个节点，因为原prehead指向的节点是自己创建的，没有意义
#### 实现
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1)
    let prev = prehead
    while(true){
        if(l1 === null){
            prev.next = l2
            break
        }
        if(l2 === null){
            prev.next = l1
            break
        }
        if(l1.val <= l2.val){
            prev.next = l1
            l1 = l1.next
            prev = prev.next
        }else{
            prev.next = l2
            l2 = l2.next
            prev = prev.next
        }
    }
    return prehead.next
};
```