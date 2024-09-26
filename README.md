1. 我许下承诺 new Promise
2. 下周一给你还

```js
const p = new Promise(function (履行承诺, 不履行承诺) {
  setTimeout(() => {
    if(没还钱｜还钱不足) {
      不履行承诺();
    } else {
      履行承诺();
    }
  }, 下周一)
});
const p1 = new promise(function (履行承诺, 不履行承诺) {
  setTimeout(() => {
    if(没还钱) {
      不履行承诺(0);
    } else if(还钱不足(100)) {
      不履行承诺(100);
    } else {
      履行承诺();
    }
  }, 明天)
})

p.then(function (count) {
  console.log("请你吃火锅")
})
.catch(function (count) {
  console.log(`起诉你还需要还${1000 - count}`);
})



```
