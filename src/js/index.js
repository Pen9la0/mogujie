/*
    require的方法
        * 配置参数：requirejs.config/require.config
        * 加载模块：requirejs/require
        * 定义模块：define
            *
 */
//require.js 为异步加载
require.config({
    //设置虚拟路径(你需要的js文件,以对象的模式写在paths中,例如jq)
    paths:{
        'jquery':'../lib/jquery-3.3.1.min',
        'main_block':'main_goodstype_block',
        'index':'index',
        'login':'login',
        'goodslist':'goodslist',
        'details':'details',
        'zoom':'../lib/hizoom/hizoom',
        'car':'car'
    }
})

require(['jquery','main_block','login','goodslist','details','zoom','car'],function($){
    //安全使用$
    //这里的代码会在所需代码加载完之后才执行
    $(function(){
        // 倒计时部分
        // 获取时分秒元素
        let hours = $('.hours');
        let min = $('.min');
        let sec = $('.sec');

        let saletime = setInterval(function(){
            //获取时间与时分秒
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            //补0操作
            h = h<10 ? "0" + h : h;
            m = m<10 ? "0" + m : m;
            s = s<10 ? "0" + s : s; 

            //写入页面
            hours.text(h);
            min.text(m);
            sec.text(s);
            // console.log(h,m,s)
        },1000);

        //引入模块
        // define(['jquery'],function(){
        //     return{
        //         mainRendering:mainRendering,
        //         ajaxRequest:ajaxRequest
        //     }
        // })
        //限时抢购轮播图
        // ts_goodslist生成列表
        /*
            1.利用ajax拿到数据库数据并写入页面
            2.轮播图效果移入移出,点击上下一张
         */
        
        // 封装ajax请求返回一个数组
        
        function rendering(ele,data){
                $.ajax({
                    type: "GET",
                    url: '../src/api/goodslist.php',
                    data:data,
                    success: function(res){
                        let arr = $.parseJSON(res);
                        let html = arr.map(function(item){
                        return `<div class="item_box" data-guid=${item.id}>
                        <a href=html/details.html?id=${item.id}>
                            <img src=${item.imgurl}>
                        </a>
                            <div class="item_details clearfix">
                            <p class="nz_p">${item.name}</p>
                            <span class="item_sale fl">${item.sale}</span><del class="item_price fr">${item.sale}</del>  
                            </div>
                        </div>`
                    }).join('');
                        ele.html(html);

                        let item_box = $('.item_box');
                        let width = item_box.innerWidth()*item_box.length;
                        let left = -(item_box.innerWidth()*4)
                        // console.log(width)
                        ele.css({
                            width:width,
                            left:left
                        })

                    }
                })
        }
        // 封装完成
        


        //渲染
        let ts_goodslist = $('.ts_goodslist');
        rendering(ts_goodslist,{idx:0,num:20})

        let nz_banner = $('.nz_banner');

        rendering(nz_banner,{idx:0,num:20})
       


        //轮播图动画
        let index = 0;
        let timer = setInterval(show,4000)
        
        function lunbotu(){
            // console.log(123);
            if(index>4){
                index = 0;  
                ts_goodslist.css({
                    left:0
                })
            }else if(index<=0){
                
                ts_goodslist.css({
                    left:-3680
                })
                index =4; 
            }
            ts_goodslist.animate({
               left:-920*index
             }, 800);
        }
        function show(){
            index++;
            // console.log(index);
            lunbotu();
        }
        $('.ts_banner').on('mouseover',function(){
            clearInterval(timer);
        })

        $('.ts_banner').on('mouseout',function(){
            clearInterval(timer);
            timer = setInterval(show,4000)
        })


        $(".timesale_t").on('click',function(event){
            clearInterval(timer);
            let target = event.target;
            // console.log(target);
            if(target.className === 'ts_next_btn'){
                index++;
                lunbotu();
            }
            if(target.className === 'ts_pre_btn'){
                index--;
                lunbotu();
            }
        })

        // console.log($('.mainblock'));


        // 首页商品类型分区
        // mainblock整体区块框架部分html生成方法
        // changegoods热销商品部分html生成方法搭配下方点击事件切换商品
        // mainBanner轮播图部分html生成方法
        // 女鞋&包包
        $($(".mainblock")[0]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_4cki65bidl5hbi40jg9529j2dkfb9_690x1665.jpg_750x9999.v1c7E.80.webp','#FFA1B8','女鞋&包包',['焕新凉鞋','打底裤','爆款套装','连帽卫衣','设计师衬衫']);

        $($('.hotsale_list')[0]).changegoods({id:parseInt(Math.random()*90),num:4});

        $($('.outside_box')[0]).mainBanner({id:1,num:34});





        //男友&运动
        $($(".mainblock")[1]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_3i1dg5282hd9jgg99c3ajhl25kijb_690x1665.jpg_750x9999.v1c7E.80.webp','#8FABFF','男友&运动',['潮男T恤','卫衣','潮鞋','休闲裤','万能衬衫']);

        $($('.hotsale_list')[1]).changegoods({id:parseInt(Math.random()*90),num:4});

        $($('.outside_box')[1]).mainBanner({id:50,num:30});





        //美妆&个护
        $($(".mainblock")[2]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_7g0i35e2e6bj3lc22efalkc868b75_690x1665.jpg_750x9999.v1c7E.80.webp','#FF5777','美妆&个护',['补水面膜','保湿套装','遮瑕粉底','斩男口红','爆款眼影']);
        $($('.hotsale_list')[2]).changegoods({id:parseInt(Math.random()*90),num:4});

        $($('.outside_box')[2]).mainBanner({id:61,num:30});




        //内衣配饰
        $($(".mainblock")[3]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_336h47acjdckia1bc1g224i5a0fbl_690x1665.jpg_750x9999.v1c7E.80.webp','#FF5777','内衣&配饰',['睡衣','短袜','内衣套装','棒球帽','手表']);
        $($('.hotsale_list')[3]).changegoods({id:parseInt(Math.random()*90),num:4});
        $($('.outside_box')[3]).mainBanner({id:20,num:30});




        //家具&电器
        $($(".mainblock")[4]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_461f25degce3905lb5cc4b756e99b_690x1665.jpg_750x9999.v1c7E.80.webp','#ECCE8F','家居&电器',['家纺好货','收纳宝盒','手机壳','美发神器','充电宝']);
        $($('.hotsale_list')[4]).changegoods({id:parseInt(Math.random()*90),num:4});
        $($('.outside_box')[4]).mainBanner({id:51,num:30});




        //母婴&视频
        $($(".mainblock")[5]).mainblock('http://s10.mogucdn.com/mlcdn/c45406/180516_0867e1a2188f932d3iikdf39f1h9l_690x1665.jpg_750x9999.v1c7E.80.webp','#ECA68F','母婴&食品',['儿童套装','妈咪套装','玩具用品','零食大礼包','进口零食']);
        $($('.hotsale_list')[5]).changegoods({id:parseInt(Math.random()*90),num:4});
        $($('.outside_box')[5]).mainBanner({id:40,num:30});


        //商品类型区块点击切换商品(换一批)
        $('.gb_hotsale_r').click('next_hotsale',function(){
          $(this).find('.hotsale_list').changegoods({id:parseInt(Math.random()*90),num:4});
            
        })


        let mainIndex = 0;

        function mainShow(ele){
            mainIndex++;
            // console.log(44444);
            mainMove($($('.outside_box')[0]));
            mainMove($($('.outside_box')[1]));
            mainMove($($('.outside_box')[2]));
            mainMove($($('.outside_box')[3]));
            mainMove($($('.outside_box')[4]));
            mainMove($($('.outside_box')[5]));
            
        }


        function mainMove(ele){
            if(mainIndex>4){
                mainIndex = 0;  
                ele.css({
                    left:0
                })
            }
            ele.animate({
               left:-609*mainIndex
             }, 800);
        }

        //main轮播图部分
        let maintimer1 = setInterval(mainShow,5000)












        //猜你喜欢生成方法
        function mainRendering(ele,data){
            $.ajax({
                type: "GET",
                url: '../src/api/goodslist.php',
                data:data,
                    success: function(res){
                        let arr = $.parseJSON(res);
                        let html = arr.map(function(item){
                            return `<div class="goods_item" data-guid=${item.id}>
                                <a class="find_goods">找相似
                                </a>
                                <a href=html/details.html?id=${item.id} >
                                <img src=${item.imgurl}>
                                </a>
                                
                                <a href="#">
                                    <p>${item.name}</p>
                                    <b>${item.sale}</b>
                                    <del>${item.price}</del>
                                </a>     
                            </div>`
                        }).join('');

                    ele.html(html);
                }
            })
        }

        let goods_list_mod = $('.goods_list_mod');
        //猜你喜欢生成
        
        mainRendering(goods_list_mod,{num:100});

        // console.log(document.cookie);

        //登录成功
       
       //吸顶菜单
        window.onscroll = function() {
          // console.log('你滚')
          if(window.scrollY > 700){
            $(".m_topbar").show();
          }
          else{
            $(".m_topbar").hide();
          }
        };


        //购物车
        $.ajax({
            type:"GET",
            url:"../src/api/carlist.php",
            success:function(res){
                console.log(res);
                let data = $.parseJSON(res);
                let html = `<ul>`
                html += $.map(data,function(item){
                    return `
                        <li class="h_car_list clearfix">
                            <img src=${item.imgurl}>
                            <span class="h_car_name">${item.name}</span>
                            <span class="h_car_sale">￥${item.sale}</span>
                            <span>颜色:图片色 尺码:M</span>
                        </li>
                    `
                }).join('');

                html += `</ul><div class="go_car">
                    <a href="html/car.html">查看购物车</a>
                </div>`
                $(".header_car").html(html);
                $(".header_car_num span").text(data.length + '件');
            }
        })


        //登录显示
        getCookie()
        function getCookie(){
            let cookie = document.cookie;
            if(cookie){
                $(".online").text('欢迎您,xxx用户')
                $(".online").css('color','red');

            }
        }
    })
})