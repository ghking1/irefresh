# irefresh
pull refresh tool based on iscroll5

## 使用情景

1. 下拉刷新
2. 上拉加载

## 特色
1. 接口简洁
2. 使用方便
3. 纯js实现

## 示例展示
1. 将irefresh克隆到本地
2. 打开example/demo.html

![image](https://github.com/ghking1/irefresh/raw/master/example/demo.jpg)


## 快速入门
1. 先引入脚本\<script type="text/javascript" src="../iscroll-probe.js"\>\</script\>
2. 再引入脚本\<script type="text/javascript" src="../irefresh.js"\>\</script\>
3. 设置容器
   ```
   <div id="iscroll">
      <div id="scroller">
        <div id="scroll-top" style="height: 50px">下拉刷新</div>
        <ul>
	       *************实际显示内容******************
        </ul>
        <div id="scroll-bottom" style="height: 50px">上拉加载</div>
      </div>
   </div>
   ```
4. 创建对象
   ```
    myScroll = IRefresh('#iscroll', {
        //if scrollTop exist, then pull-down enabled
        scrollTop: '#scroll-top',
        scrollTopHeight: 50,

        //if scrollBottom exist, then pull-up enabled
        scrollBottom: '#scroll-bottom',
        scrollBottomHeight: 50,
    });

   ```
5. 当然这样设置只是能运行起来了，但是还没有绑定相应的操作，具体操作请看demo或者api详解

## API详解
   ```
    var scrollTop=document.getElementById('scroll-top');
    var scrollBottom=document.getElementById('scroll-bottom');
    myScroll = IRefresh('#iscroll', {
        
        scrollTop: '#scroll-top',                                       //指定下拉时显示的元素，该属性存在且有效时，pull-down操作才会生效
        scrollTopHeight: 50,                                            //下拉元素的高度，需要手工指定,所以对应元素的高度样式也要固定
        scrollTopFlip: function(){scrollTop.innerText='松开刷新'},      //下拉到临界点时的操作，一般是改变内容提示用户松手
        scrollTopRegular: function(){scrollTop.innerText='下拉刷新'},   //从临界点变回常态时的操作，一般是改变提示内容
        scrollTopLoad: function(){                                      //成功触发时的操作，一般是加载内容
            scrollTop.innerText='正在加载...'; 
            pullDownAction()
        },

        scrollBottom: '#scroll-bottom',                                     //指定上拉时显示的元素，该属性存在且有效时，pull-up操作才会生效
        scrollBottomHeight: 50,                                             //上拉元素的高度，需要手工指定,所以对应元素的高度样式也要固定
        scrollBottomFlip: function(){scrollBottom.innerText='松开加载'},    //上拉到临界点时的操作，一般是改变内容提示用户松手
        scrollBottomRegular: function(){scrollBottom.innerText='上拉加载'}, //从临界点变回常态时的操作，一般是改变提示内容
        scrollBottomLoad: function(){                                       //成功触发时的操作，一般是加载内容
            scrollBottom.innerText='正在加载...'; 
            pullUpAction()
        }
    });
   ```



