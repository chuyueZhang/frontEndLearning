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