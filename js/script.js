; (function () {
  //定義區

  let wrap = document.querySelector('.wrap');
  let bg01 = document.querySelector('.bg01');
  let bg02 = document.querySelector('.bg02');
  let bgColor = ['', '#cae9aa', '#f0e7b2', '#f6c6cd'];
  let btnColor = ['', '#46a21a', '#756d0b', '#c21c0f']

  let flavourChange = document.querySelector('#flavourChange');
  let changebtn = document.querySelector('.btn-text');
  let text = document.querySelector('.text');

  let drink01 = document.querySelector('.drink01');
  let drink02 = document.querySelector('.drink02');
  let drink03 = document.querySelector('.drink03');

  let circleImg = document.querySelector('.circleImg');

  let drinkWidth = 420; // 瓶子寬+左右margin

  let clickTimes = 0;





  //---------------函式區-------------------

  //--延遲函式 (1)
  function timeout01(target, site, arrNum) {
    setTimeout(function () {
      target.style.transform = `translateX(${drinkWidth * (site)}px)`;
      bg01.style.backgroundColor = arrNum;
    }, 200);
  }

  //--延遲函式 (2)
  function timeout02() {
    setTimeout(function () {
      bg02.style.clipPath = randomSite('5%');
    }, 500);
  }

  //--背景色 & 按鈕色控制
  function changeColor(arrNum) {
    bg02.style.clipPath = randomSite('150%');
    bg02.style.backgroundColor = bgColor[arrNum];
    changebtn.style.borderColor = btnColor[arrNum];
    changebtn.style.color = btnColor[arrNum];
  }

  //---clip-path 的起點隨機
  function randomSite(size) {
    let rand1 = Math.floor(Math.random() * 100);
    let rand2 = Math.floor(Math.random() * 100);
    return `circle(${size} at ${rand1}% ${rand2}%)`
  }



  //---總函式 changeHandler

  function changeHandler() {
    if (clickTimes < 3) {
      clickTimes += 1;
    } else {
      clickTimes = 1;
    }

    switch (true) {
      case (clickTimes == 1):
        drink01.style.transform = `translateX(${drinkWidth * (-1)}px)`;
        drink02.style.transform = `translateX(${drinkWidth * (-1)}px)`;
        drink03.style.transform = `translateX(${drinkWidth * (-1)}px)`;
        drink03.style.opacity = '1'
        drink01.style.opacity = '0'
        circleImg.style.backgroundImage = 'url(../images/mint01-s.jpg)';
        text.innerHTML = innerText01();
        changeColor(1);
        timeout01(drink01, 2, bgColor[1]);
        timeout02();
        break;

      case (clickTimes == 2):
        drink01.style.transform = `translateX(${drinkWidth * (1)}px)`;
        drink02.style.transform = `translateX(${drinkWidth * (-2)}px)`;
        drink03.style.transform = `translateX(${drinkWidth * (-2)}px)`;
        drink01.style.opacity = '1'
        drink02.style.opacity = '0'
        circleImg.style.backgroundImage = 'url(../images/lemon01-s.jpg)';
        text.innerHTML = innerText02();
        changeColor(2);
        timeout01(drink02, 1, bgColor[2]);
        timeout02();
        break;

      case (clickTimes == 3):
        drink01.style.transform = `translateX(${drinkWidth * (0)}px)`;
        drink02.style.transform = `translateX(${drinkWidth * (0)}px)`;
        drink03.style.transform = `translateX(${drinkWidth * (-3)}px)`;
        drink02.style.opacity = '1'
        drink03.style.opacity = '0'
        circleImg.style.backgroundImage = 'url(../images/apple01-s.jpg)';
        text.innerHTML = innerText00();
        changeColor(3);
        timeout01(drink03, 0, bgColor[3]);
        timeout02();
        break;

      default:
        alert(123);
        break;
    }
  }

  //----節流的公式

  function throttle(func, delay) {
    let timer;
    let firstTime = true; // 判斷是否為第一次觸發

    return function () {
      let context = this;
      let args = arguments;

      if (firstTime) {
        func.apply(context, args);
        firstTime = false;
        return;
      }

      if (timer) {
        // console.log('Not Yet');
        return;
      }

      timer = setTimeout(function () {
        // console.log('work');
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };



  //觸發區

  flavourChange.addEventListener('click', throttle(changeHandler, 1000));


})();