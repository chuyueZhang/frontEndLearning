import '../css/iconfont.css';
import '../less/main.less';

const func = (a, b) => a + b;

console.log(func(2, 3));

const promise = new Promise((resovle) => {
  setTimeout(() => {
    console.log(promise);
    resovle('complete');
  }, 3000);
});

promise.then((val) => {
  console.log(val);
});
