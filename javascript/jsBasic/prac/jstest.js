//if语句编程练习
//题目1：
var score = prompt("请输入成绩：");
if(score == 100){
    console.log("奖励BMW");
}else if(score >80 && score <=99){
    console.log("奖励iphone");
}else if(score >=60 && score <=80){
    console.log("奖励参考书");
}else{
    console.log("不奖励");
}
//题目2
var height = prompt("请输入身高(cm)：");
var money = prompt("请输入财富(W)：");
var handsome = prompt("请输入帅气值：");
if(height > 180 && money > 1000 && handsome > 500){
    console.log("嫁给他");
}else if(height > 180 || money > 1000 || handsome > 500){
    console.log("还行");
}else{
    console.log("不嫁");
}
//题目3
var num1 = prompt("请输入数字1：");
var num2 = prompt("请输入数字2：");
var num3 = prompt("请输入数字3：");
if(num1 >= num2){
    if(num1 >= num3){
        console.log(num1);
        if(num3 >= num2){
            console.log(num3);
            console.log(num2);
        }else{
            console.log(num2);
            console.log(num3);
        }
    }else{
        console.log(num3);
        console.log(num1);
        console.log(num2);
    }
}else if(num2 >= num3){
    console.log(num2);
    if(num3 >= num1){
        console.log(num3);
        console.log(num1);
    }else{
        console.log(num1);
        console.log(num3);
    }
}else{
    console.log(num3);
    console.log(num2);
    console.log(num1);
}
//switch练习
//题目1
var score = +prompt("请输入成绩");

switch(score > 60){
    case true:
        console.log("合格");
        break;
    default:
        console.log("不合格");
        break;
}
//题目2
var week = +prompt("请输入星期");

switch(week){
    case 1:
        console.log("星期一");
        break;
    case 2:
        console.log("星期二");
        break;
    case 3:
        console.log("星期三");
        break;
    case 4:
        console.log("星期四");
        break;
    case 5:
        console.log("星期五");
        break;
    case 6:
        console.log("星期六");
        break;
    case 7:
        console.log("星期七");
        break;
    default:
        console.log("非法数字");
        break;

}
//while语句练习
//题目1
var totalMoney = 1000;
var i = 0;
do{
    totalMoney *= 1.05;
    i++;
}
while(totalMoney <= 5000)
console.log(i);
//for语句练习
//题目1
for(var i = 0, sum = 0; i <= 100; i++){
    if(i % 7 == 0){
        console.log(i);
        sum += i;
    }
}
console.log("总和为：" + sum);
//题目2 水仙花数
for(var i = 100; i <= 999 ; i++){
    if(i == (parseInt(i / 100) * parseInt(i / 100) * parseInt(i / 100) + parseInt((i % 100) / 10) * parseInt((i % 100) / 10) * parseInt((i % 100) / 10) + parseInt(i % 10) * parseInt(i % 10) * parseInt(i % 10))){
        console.log(i);
    }
}
//题目3 质数
var num = prompt("输入一个数字：");

if(num <= 1){
    console.log("非法数字");
}else{
    var flag = true;
    for(var i = 2; i < num; i++){
        if(num % i == 0){
            flag = false;
        }
    }
    if(flag){
        console.log("质数");
    }else{
        console.log("不是质数");
    }
}
//嵌套for循环练习
//题目1 99乘法表
for(var i=1; i<10; i++){
    for(var j=1; j < i+1; j++){
        document.write(j + "*" + i + "=" + i*j + "&nbsp;&nbsp;&nbsp;");
    }
    document.write("<br />")
}

//题目2 1-100的质数
console.time("a");
var arr = [2];
for(var i = 3; i<1000000; i+=2){
    var flag = true;
    for(var j = 0; arr[j]<Math.sqrt(i); j++){
        if(i % arr[j] == 0){
            flag = false;
            break;
        }
    }
    if(flag){
        // console.log(i);
        arr.push(i);
    }
}
console.timeEnd("a");
//埃氏筛法
console.time("a");
var n = 10000;
var half = parseInt(n/2) - 1;
var arr = new Array(half);
for(var i=3; i < n; i+=2){
    arr[parseInt(i/2) - 1] = i;
}
var end=arr[half - 1];
for(var j=0; Math.pow(arr[j], 2)<end ; j++){
    for(var k=j + 1; k < half - 1; k++){
        if(arr[k] % arr[j] == 0){
        arr[k]=0;
        }
    }
}
var cnt=0;
for (var i=0;i<half;i++) {
    if (arr[i]!=0) {
        cnt++;   
    }
}
console.log(cnt);
console.timeEnd("a");
//数组练习
//题目1
function Person(name, age){
    this.name = name;
    this.age = age;
}
var per1 = new Person("aa",16);
var per2 = new Person("bb",6);
var per3 = new Person("cc",19);
var per4 = new Person("dd",25);
var per5 = new Person("ee",34);
var arr = [per1,per2,per3,per4,per5];
function getAdult(arr){
    var adultArr = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i].age >= 18){
            adultArr.push(arr[i]);
        }
    }
    return adultArr;
}
var adult = getAdult(arr);
console.log(adult);
//题目2  数组去重练习
var arr = [5,3,5,3,5,7,9,65,4,6,4];
for(var i = 1; i < arr.length; i++){
    for(var j = 0; j < i; j++){
        if(arr[i] == arr[j]){
            arr.splice(i, 1);
            i--;
        }
    }
}
console.log(arr);
//对象练习
//题目1     定义一个Person类，类中包含name,age两个属性，修改toString方法使其可以输出对象的信息，以Person[name = "a", age = 1]为例
function Person(name, age, h){
    this.name = name;
    this.age = age;
}
Person.prototype.toString = function(){
    return "[name = " + this.name + ", age = " + this.age + "]";
}
//题目2     创建一个数组，向其中添加三个对象，使用题1的构造函数
var per1 = new Person("a", 1,56);
var per2 = new Person("b", 2,65);
var per3 = new Person("c", 3,65);
var arr = [per1, per2, per3];
//题目3     遍历题2中的数组
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
//题目4     列举向数组最前和最后添加和删除元素的4个方法
arr.push(1);
arr.pop();
arr.unshift(2);
arr.shift();
//题目5     编写代码，去除以下数组中重复的元素[1,2,3,3,4,5,2,2,2,6,7]
var arr = [1,2,3,3,4,5,2,2,2,6,7];
for(var i = 1; i < arr.length; i++){
    for(var j = 0; j < i; j++){
        if(arr[j] == arr[i]){
            arr.splice(i, 1);
            i--;
        }
    }
}
console.log(arr);
//题目6     写出以下代码的输出值
function test(){
    console.log("a");
    return 100;
}
console.time("a");
for(var i=0; i < test(); i++){

}
console.timeEnd("a");
///
function test(){
    console.log("a");
    return 100;
}
console.time("a");
var a = test();
for(var i=0; i < a; i++){

}
console.timeEnd("a");
//parseInt
function parseInt(str){
    var result = str.match(/^\d{1,}/g);
    return  result ? Number(result.join("")) : NaN;
}