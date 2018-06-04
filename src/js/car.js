require(['jquery'],function($){
    $(function(){
        //1.渲染头尾html
        
        $('cheader').mheader();
        $('cfooter').mfooter();
        //2.渲染购物车在数据库的数据
        
        $.ajax({
            type:"GET",
            url:"../api/carlist.php",
            success:function(res){
                let data = $.parseJSON(res);
                console.log(data)
                let html = `<table>
                                <thead>
                                    <tr>
                                        <th class="car_th_all">
                                            全选:<input type="checkbox" class="goods_all"/>
                                        </th>
                                        <th>商品名称</th>
                                        <th>商品信息</th>
                                        <th>单价(元)</th>
                                        <th>数量</th>
                                        <th>小计(元)</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                `

                html += $.map(data,function(item){
                    return `<tr data-guid=${item.id}>
                                <td class="car_td_checkbox">
                                    <input type="checkbox" class="goods_checked"/>
                                </td>
                                <td class="car_td_name clearfix">
                                    <img src=${item.imgurl}/>
                                    <span>${item.name}</span>
                                </td>
                                <td>
                                    <span>颜色:白</span><br/>
                                    <span>尺码:M</span>
                                </td>
                                <td>
                                    原价:<del>${item.price}</del><br/>
                                    现价:<span>${item.sale}</span>
                                </td>
                                <td class="car_td_num">
                                    <div class="clearfix">
                                        <span class="num_reduce"></span>
                                        <input type="text" value=${item.qty}>
                                        <span class="num_add"></span>
                                    </div>
                                </td>
                                <td class="car_td_total">
                                    <span>${item.qty*item.sale}</span>
                                </td>
                                <td>
                                    <span class="car_td_remove" data-type="remove">删除</span>
                                </td>
                            </tr>`
                }).join("");

                html += `<tr>
                <td colspan="7" class="nbtd clearfix"><div class="car_box clearfix">
                <p>共有<span class="car_num">0</span>件商品,总计</p><span class="car_total">0.00</span><div class="car_pay">去付款</div>
                </div></td></tr></tbody></table>`

                $('.car_goodslist').html(html);
            }
        })
        //3.实现删改数据(未实现)
        $('.car_goodslist').on('click','.car_td_remove',function(){
            // 获取父级元素,移除并删除数据库
            let tr = this.parentNode.parentNode;
            let table = tr.parentNode;
            let type = this.getAttribute('data-type')
            let guid = tr.getAttribute('data-guid')*1;
            table.removeChild(tr);
            let data = {
                id:guid,
                type:type
            }
            console.log(data);
            alert('是否移除该商品?');
            $.ajax({
                type:"GET",
                url:"../api/carfunction.php",
                data:data,
                success:function(){
                    console.log(res);
                }
            })
        })
        let all_target = true;
        $('.car_goodslist').on('click','.goods_all',function(){
            console.log($(this))
            
            $(".car_total").text()
            if(all_target === true){
                $(".goods_checked").attr("checked",all_target);
                all_target = !true;
            }else{
                $(".goods_checked").attr("checked",all_target);
                all_target = true;
            }
            

        })

    })
})