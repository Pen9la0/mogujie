//mainblock区块插件
require(['jquery'],function($){
    jQuery.fn.extend({
        //区块框生成方法
        mainblock: function(src,color,goodstype,arr) {
            return this.each(function() {
                //html
                $.ajax({
                    type: "get",
                    url: "html/main_block.html",
                    async:false,
                    success: function(data) {
                        $(this).html(data);
                        $(this).find('.gb_img_l > a >img').attr('src',src);
                        $(this).find('.color_block').css('background-color',color)
                        $(this).find('.type_name').text(goodstype);
               
                        $(this).find('.type_list')
                        for(let i=0;i<arr.length;i++){
                            $(this).find('.type_list a:nth-child('+i+')').text(arr[i]);
                        }
                    }.bind(this)
                });
            });
        },
        // 头部生成方法
        mheader: function() {
            return this.each(function() {
                //html
                $.ajax({
                    type: "get",
                    url: "mheader.html",
                    async:false,
                    success: function(data) {
                        $(this).html(data);
                        console.log(123)
                    }.bind(this)
                });
            });
        },
        mfooter: function() {
            return this.each(function() {
                //html
                $.ajax({
                    type: "get",
                    url: "mfooter.html",
                    async:false,
                    success: function(data) {
                        $(this).html(data);
                    }.bind(this)
                });
            });
        },
        msearch: function() {
            return this.each(function() {
                //html
                $.ajax({
                    type: "get",
                    url: "msearch.html",
                    async:false,
                    success: function(data) {
                        $(this).html(data);
                    }.bind(this)
                });
            });
        },
        changegoods:function(data){
            return this.each(function() {
                $.ajax({
                    type: "GET",
                    url: '../src/api/details.php',
                    data:data,
                    success: function(res){
                        let arr = $.parseJSON(res);

                        let html = $.map(arr,function(item){
                            return `<a class="hotsale_block" data-guid=${item.id} href=html/details.html?id=${item.id}> <img src=${item.imgurl}>
                                <p>${item.name}</p>
                                <b>${item.sale}</b>
                                </a>`
                        }).join('');

                        $(this).html(html);
                    }.bind(this)
                });
            })
        },
        mainBanner:function(data){
            return this.each(function() {
                $.ajax({
                    type: "GET",
                    url: '../src/api/details.php',
                    data:data,
                    success: function(res){
                        let arr = $.parseJSON(res);

                        let html = $.map(arr,function(item){
                            return `<a class="banner_block" data-guid=${item.id} href=html/details.html?id=${item.id}> <img src=${item.imgurl}>
                                <p>${item.name}</p>
                                <b>${item.sale}</b>
                                </a>`
                        }).join('');

                        $(this).html(html);
                    }.bind(this)
                });
            })
        }
    });

    
});
