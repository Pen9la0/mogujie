require(['jquery'],function($){
    $(function(){
        //渲染插件
        $("gheader").mheader();
        $("gfooter").mfooter();
        $("gsearch").msearch();

        //渲染商品
        goodsRendering();

        let goods_page = document.querySelector('.goods_page')
        //ajax
        function goodsRendering(){
                $('.goods_list_modg').html('');
                $.ajax({
                  type: "GET",
                  url:'../api/goodslist2.php',
                    success: function(res){
                        let arr = $.parseJSON(res);
                        let html = $.map(arr.data,function(item){
                            return `<div class="goods_item" data-guid=${item.id}>
                                <a class="find_goods">找相似
                                </a>
                                <a href=details.html?id=${item.id} >
                                <img src=${item.imgurl}>
                                </a>
                                
                                <a href="#">
                                    <p>${item.name}</p>
                                    <b>${item.sale}</b>
                                    <del>${item.price}</del>
                                </a>     
                            </div>`
                        }).join('');
                        $('.goods_list_modg').html(html);

                        let page_item = document.createElement('ul');
                        //计算页数商品总数除于qty,向上取整为了多出来商品放在剩下的一页中
                        
                        page_item.classList.add('page_item');
                        let page_num = Math.ceil(arr.total/arr.qty);


                        let html2 ='';

                        for(let i=0;i<page_num;i++){
                            html2 += '<li>'+(i+1)+'</li>'
                        }
                        // console.log(ele)
                        page_item.innerHTML = html2;
                        page_item.children[arr.page-1].classList.add('li_color')
                        goods_page.appendChild(page_item);
                       
                    }
                })

        }


        //点击切换页面
        //点击li对象获得page,发送ajax请求获得新的数据
        $(".goods_page").on('click','li',function(event){
            $('.goods_page').html('')
            let data = $(this).text() 
            data = parseInt(data);
            let page = {};

            page['page'] = data;

            // console.log(page);
              $.ajax({
                type:"GET",
                url:'../api/goodslist2.php',
                data:page,
                success:function(res){
                    let arr = $.parseJSON(res);
                        let html = $.map(arr.data,function(item){
                            return `<div class="goods_item" data-guid=${item.id}>
                                <a class="find_goods">找相似
                                </a>
                                <a href=details.html?id=${item.id} >
                                <img src=${item.imgurl}>
                                </a>
                                
                                <a href="#">
                                    <p>${item.name}</p>
                                    <b>${item.sale}</b>
                                    <del>${item.price}</del>
                                </a>     
                            </div>`
                        }).join('');
                        $('.goods_list_modg').html(html);

                        let page_item = document.createElement('ul');
                        //计算页数商品总数除于qty,向上取整为了多出来商品放在剩下的一页中
                        
                        page_item.classList.add('page_item');
                        let page_num = Math.ceil(arr.total/arr.qty);


                        let html2 ='';

                        for(let i=0;i<page_num;i++){
                            html2 += '<li>'+(i+1)+'</li>'
                        }
                        // console.log(ele)
                        page_item.innerHTML = html2;
                        page_item.children[arr.page-1].classList.add('li_color')
                        goods_page.appendChild(page_item);
                }
              })
         });
        


   

    })
});