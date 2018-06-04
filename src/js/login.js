require(['jquery','main_block'],function($){
    $(function(){
        $('lfooter').mfooter();

        
        //获取登录部分
        // var $login = $(".login");
        // var $login_title = $(".login_title");
        // var $reg_title = $(".reg_title");
        // 点击事件切换登录注册
        $(".login").on("click","a",function(){
            if($(this).text() === '注册'){
                $(".reg_info").show();
                $(".login_info").hide();
                $(this).css({
                    "border-bottom": "2px solid #ff4066",
                    "color":"#ff4066"
                });
                $(".login_title").css({
                    "border-bottom": "2px solid #ffeceb",
                    "color":"#000"
                });

            }
            else if($(this).text() === '登录'){
                $(".reg_info").hide();
                $(".login_info").show();
                $(this).css({
                    "border-bottom": "2px solid #ff4066",
                    "color":"#ff4066"
                });
                $(".reg_title").css({
                    "border-bottom": "2px solid #ffeceb",
                    "color":"#000"
                });
            }
        })


        //注册登录

        let btn_login = $('.btn_login')
        btn_login.click(function() {
            let username = $('.usernamel').val();
            let password = $('.passwordl').val();
            if(username === "" || password ===""){
                alert('请输入账号密码')
            }
            else{
                $.ajax({
                      type: "POST",
                      url: "../api/user.php",
                      data:{
                        username:username,
                        password:password,
                        type:btn_login.text()
                      },
                        success: function(msg){
                         if(msg == 1){
                            //返回1
                            alert('登录成功');
                            // var date = new Date();
                            // var expiresDays=7;
                            //将date设置为10天以后的时间
                            // date.setTime(date.getTime()+expiresDays*24*3600*1000);
                            //将cookie设置为7天后过期
                            // expires="+date.toGMTString()+";
                            document.cookie="login=233;path=/";
                            location.href = "../index.html";
                         }else{
                            alert('账号密码错误');
                            //清空输入框
                            $('.usernamel').val('');
                            $('.passwordl').val('');
                         }
                    }
                });
            }
        });
        

        //注册事件触发判断数据库是否存在
        let btn_reg = $('.btn_reg')
        btn_reg.click(function() {
            let username = $('.usernamer').val();
            let password = $('.passwordr').val();
            let password2 = $('.passwordr2').val();
            if(password === password2 && username === "" || password ==="" || password2 ===""){
                alert('请输入账号密码')
            }
            else{
                $.ajax({
                      type: "POST",
                      url: "../api/user.php",
                      data:{
                        username:username,
                        password:password,
                        type:btn_reg.text()
                      },
                        success: function(msg){
                        alert(msg);
                        if(msg === '此用户已存在'){
                            $('.usernamer').val('');
                            $('.passwordr').val('');
                            $('.passwordr2').val('');
                        }
                    }
                });
            }
        });

    })
});