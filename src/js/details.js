require(['jquery','zoom'],function($){
    $(function(){

        //1.获取并处理location.search
        //2.拿到guid-id并发送ajax请求拿到数据库对应数据
        //3.拿到数据后渲染到页面上
        
        $('dheader').mheader();
        $('dfooter').mfooter();

        detailsRendering();

        function detailsRendering(){
            // console.log(location.search);
            //获取并处理location.search
            let data = location.search;
            data = data.split('=');
            data = data[1];
            console.log(123);
            //拿到guid-id并发送ajax请求拿到数据库对应数据
            let guid = (data)*1;
            console.log(guid)
            let data2 = {};
            data2['id'] = guid;
            data2['num'] = 5;
            console.log(data2);
            $.ajax({
              type: "GET",
              url: '../api/details.php',
              data:data2,
                success: function(res){
                    console.log(res);
                    let data = $.parseJSON(res);
                    let arr = data[0];
                    // console.log(res);
                    // //拿到数据后渲染到页面上
                    $('.big_img').find('img').attr('src',arr.imgurl);
                    $('.big_img').find('img').attr('data-big',arr.imgurl);
                    $('.big_img').find('img').attr('data-guid',guid);
                    $('.d_goods_name').text(arr.name);
                    $('.d_price').text(arr.price);
                    $('.d_sale').text(arr.sale);
                    $('.img_box ul').html(`
                        <ul>
                            <li><img src=${data[0].imgurl}></li>
                            <li><img src=${data[1].imgurl}></li>
                            <li><img src=${data[2].imgurl}></li>
                            <li><img src=${data[3].imgurl}></li>
                            <li><img src=${data[4].imgurl}></li>
                        </ul>
                    `)
                   
                }
            })
 
        }


        $(".big_img").hiZoom({
          width: 400,
          position: 'right'
        });
        
             //点击获取商品imgurl,sale,price,name,传到后边并且插入购物车列表中
        

        $(".add_car").click(function(){
            //获取数据
            let data = {};
            data['id'] = $('.big_img img').attr('data-guid');
            data['name'] = $('.d_goods_name').text()
            data['imgurl'] = $('.big_img img').attr('src');
            data['price'] = $('.d_price').text();
            data['sale'] = $(".d_sale").text();
            data['qty'] = 1;
            console.log(data);

            $.ajax({
                  type: "GET",
                  url: "../api/car.php",
                  data:data,
                  success: function(res){
                    console.log(res);
                   
                }
            })
        })


        //飞入购物车
        $(".add_car").click(function(){
          //创建一个imgsrc=商品img
          let fly = document.createElement('span');
          fly.classList.add('fly_goods')
          document.body.appendChild(fly);
          // let newimg = img.cloneNode(true);
          $('.fly_goods').css({
            'position':'absolute',
            'display':'block',
            'border-radius':'50%',
            'width':'100px',
            'height':'100px',
            'left':'800px',
            'top':'700px',
            'background':'#ccc',
            'z-index':'100',
            'opacity':'0.6'
          });
          $('.fly_goods').animate({
                left: "1250px",
                top:'400px',
                width:'0',
                height:'0',
                opacity:'0'
          },800)

        });
    })
});