 function SnapSwiper(data) {
   data = {
     timer: "",
     autoplay: true,
     ...data
   }

   data.eleSwiperRoot = document.querySelector(data.el);
   data.fragment = document.createDocumentFragment();

   // 创建根元素
   var rootSwiperBox = function () {
     data.eleSwiperBox = document.createElement("div")
     data.eleScrollDots = document.createElement("div")

     data.eleSwiperRoot.classList.add("snap-swiper-index")
     data.eleSwiperBox.classList.add("snap-swiper-box")
     data.eleScrollDots.classList.add("snap-swiper-dots")

     data.fragment.appendChild(data.eleSwiperBox);
     data.fragment.appendChild(data.eleScrollDots);

     SnapSwiper.prototype.data = data
     SnapSwiper.prototype.funSwiperInit()
   }
   rootSwiperBox()
 };

 // 初始化滚动
 SnapSwiper.prototype.funSwiperInit = function () {
   var _this = this
   this.data.imageList.forEach(function (item, index) {
     var eleA = document.createElement("a")
     var eleImg = document.createElement("img")
     var eleDot = document.createElement("i");

     eleA.href = item.href
     eleA.classList.add("snap-swiper-link")

     eleImg.src = item.src
     eleImg.alt = item.alt || ""
     eleImg.classList.add("snap-swiper-image")
     eleImg.loading = "lazy"
     // 图片异常处理
     eleImg.addEventListener("error", function () {
       this.classList.add("error")
     })

     if (index === 0) {
       eleDot.classList.add("active");
     }

     eleA.appendChild(eleImg)

     _this.data.fragment.children[0].appendChild(eleA)
     _this.data.fragment.children[1].appendChild(eleDot)

   })

   this.data.eleSwiperRoot.appendChild(this.data.fragment)

   this.data.eleSwiperBox.addEventListener("touchstart", function () {
     clearInterval(_this.data.timer);
   });
   document.addEventListener("touchend", function () {
     SnapSwiper.prototype.automaticHandler();
   });

   this.data.eleSwiperBox.addEventListener("scroll", function () {

     var index = Math.floor(this.scrollLeft / this.clientWidth);

     var eleTarget = _this.data.eleScrollDots.querySelector("i:nth-child(" + (index + 1) + ")");
     if (eleTarget && eleTarget.classList.contains("active")) {
       return;
     }
     var eleDotActive = _this.data.eleScrollDots.querySelector(".active");
     if (eleDotActive) {
       eleDotActive.classList.remove("active");
     }
     eleTarget.classList.add("active");
   });

   this.data.autoplay ? SnapSwiper.prototype.automaticHandler(this.data.imageList, this.data.eleSwiperBox) : "";
 }

 // polyfill Safari浏览器下的平滑滚动
 SnapSwiper.prototype.setScrollLeft = function (scrollLeft) {
   var _this = this
   if (!CSS.supports("scroll-behavior: smooth")) {
     var step = function () {
       var numScrolDistance = scrollLeft - _this.data.eleSwiperBox.scrollLeft;
       if (Math.abs(numScrolDistance) <= 3) {
         _this.data.eleSwiperBox.scrollLeft = scrollLeft;
       } else {
         _this.data.eleSwiperBox.scrollLeft += numScrolDistance / 4;
         requestAnimationFrame(step);
       }
     };
     step();
   } else {
     _this.data.eleSwiperBox.scrollLeft = scrollLeft;
   }
 }

 // 自动轮播
 SnapSwiper.prototype.automaticHandler = function () {
   var _this = this
   clearInterval(_this.data.timer);
   _this.data.timer = setInterval(function () {
     var clientWidth = _this.data.eleSwiperBox.clientWidth;
     var index = Math.floor(_this.data.eleSwiperBox.scrollLeft / clientWidth) + 1;

     if (index > _this.data.imageList.length - 1) {
       _this.data.eleSwiperBox.style.scrollBehavior = 'auto'
       index = 0;
       _this.data.eleSwiperBox.scrollLeft = clientWidth * index + _this.data.eleSwiperBox.offsetLeft * index;
     } else {
       _this.data.eleSwiperBox.style.scrollBehavior = 'smooth'
       SnapSwiper.prototype.setScrollLeft(clientWidth * index + _this.data.eleSwiperBox.offsetLeft * index);
     }
   }, 3000)
 }

 // 某一个元素被点击 
 SnapSwiper.prototype.clickHandler = function (el, cb) {
   el.addEventListener("click", function () {
     cb()
   });
 }
 //  module.exports = SnapSwiper