function IRefresh(scroll, options){
    var enableScrollTop = options.scrollTop ? true : false;
    var enableScrollBottom = options.scrollBottom ? true : false;
    var scrollTop = (enableScrollTop ? document.querySelector(options.scrollTop) : null);
    var scrollBottom =(enableScrollBottom ? document.querySelector(options.scrollBottom) : null);
    var is_scrolling=false;
    var is_loadding=false;

    var iscroll=new IScroll(scroll, {
        bounce: true,
        bounceTime: 200,
        probeType: 1,
        mouseWheel: true,
        preventDefault: false,
        startY: -options.scrollTopHeight
    });

    iscroll.on('scrollStart', function(){
        if(enableScrollTop && this.y==this.options.startY){
            is_scrolling=true;
        }

        if(enableScrollBottom && this.y==this.maxScrollY+options.scrollBottomHeight) {
            is_scrolling=true;
        }
    });

    iscroll.on('scroll', function(){
        if(enableScrollTop){
            if(this.y>=30 && scrollTop.state!='flip'){
                scrollTop.state='flip';
                options.scrollTopFlip && options.scrollTopFlip();
            }
            else if(this.y<30 && scrollTop.state=='flip'){
                scrollTop.state='';
                options.scrollTopRegular && options.scrollTopRegular();
            }
        }
        
        if(enableScrollBottom){
            if(this.y<=this.maxScrollY-20 && scrollBottom.state!='flip'){
                scrollBottom.state='flip';
                options.scrollBottomFlip && options.scrollBottomFlip();
            }
            else if(this.y>this.maxScrollY-20 && scrollBottom.state=='flip'){
                scrollBottom.state='';
                options.scrollBottomRegular && options.scrollBottomRegular();
            }
        }
    });

    iscroll.on('scrollEnd', function(){
        if(enableScrollTop){
            if(this.y>this.options.startY && scrollTop.state!='flip'){
                this.scrollTo(0, this.options.startY, 300);
            }
            else if(scrollTop.state=='flip'){
                scrollTop.state='load';
                if(is_scrolling && !is_loadding){
                    is_loadding=true;
                    options.scrollTopLoad && options.scrollTopLoad();
                }
            }
        }
        
        if(enableScrollBottom){
            if(this.y<this.maxScrollY+options.scrollBottomHeight && scrollBottom.state!='flip'){
                this.scrollTo(0, this.maxScrollY+options.scrollBottomHeight, 300);
            }
            else if(scrollBottom.state=='flip'){
                scrollBottom.state='load';
                if(is_scrolling && !is_loadding){
                    is_loadding=true;
                    options.scrollBottomLoad && options.scrollBottomLoad();
                }
            }
        }

        is_scrolling=false;
    });

    iscroll.on('refresh', function(){
        if(enableScrollTop){
            if(scrollTop.state=='load' || this.y>this.options.startY){
                scrollTop.state='';
                this.scrollTo(0, this.options.startY, 0);
                options.scrollTopRegular && options.scrollTopRegular();
            }
        }
        
        if(enableScrollBottom){
            if(scrollBottom.state=='load' || this.y<this.maxScrollY+options.scrollBottomHeight){
                scrollBottom.state='';
                this.scrollTo(0, this.maxScrollY+options.scrollBottomHeight, 0);
                options.scrollBottomRegular && options.scrollBottomRegular();
            }
        }
        
        is_loadding=false;
    });

    return iscroll;
}