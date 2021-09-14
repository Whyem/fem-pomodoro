$( document ).ready(function() {

    

    var substracted = false;
    var refreshIntervalId = null;

    //Style variables -----------------------------------------------
    var current_font = "main_kumbh";
    var current_col = "main_red";
    var chosen_font = "main_kumbh";
    var chosen_col = "main_red";
    
    //timer variables -----------------------------------------------
    var pomodoro = $("#pomodoro").val();
    var short_break = $("#short_break").val();
    var long_break = $("#long_break").val();

    //control variables -----------------------------------------------
    var minutes = pomodoro;
    var sec = 0;

    $(this).addClass(current_font + " " + current_col); 
    
    if(minutes<10){
        $("h1").text("0" + minutes.toString() + ":00");
    }

    else{
        $("h1").text( minutes.toString() + ":00");
    }
    

    $(".inner_circle").click(function(){
        if($(".pause_text").text() == "pause" ){
            $(".pause_text").text("start");
            $(".circle_time").css("animation-play-state","paused");
            clearInterval(refreshIntervalId);
        }

        else if($(".pause_text").text() == "start" ){
            $(".pause_text").text("pause")
            if(minutes == pomodoro && sec == 0){
                $(".circle_time").css("animation","countdown " + (60*minutes).toString() +"s linear infinite");
            }
            else {
                if(!substracted){
                    $(".circle_time").css("animation-duration", (60*minutes - sec + 2).toString());
                    $(".circle_time").css("animation-play-state","running");
                }
            }

            refreshIntervalId = setInterval(() => {
                
                substracted = false;
                if(minutes == 0 && sec == 0){
                    $("h1").text("00:00");
                    $(".circle_time").css("animation-play-state","paused");
                    $(".pause_text").text("restart")
                    return false;
                }
                
                if(sec == 0){
                    sec = 60;
                    minutes = minutes - 1;
                }
                
                if(!substracted){
                    sec = sec-1;
                    substracted = true;
                    $(".circle_time").css("animation-play-state","running");
                }
                
                $("h1").text(minutes + ":" + sec);
                
            }, 1000);
        }

        else if($(".pause_text").text() == "restart" ){
            minutes = pomodoro;
            sec = 0;
            $(".circle_time").css("animation-play-state","running");
            $(".pause_text").text("pause");
        }
    });

    $(".input_btn").click(function(){
        var timer_val = parseInt($(this).parent().parent().children(':first-child').val());
        if( $(this).hasClass("add")){
            $(this).parent().parent().children(':first-child').val(timer_val+1);
        }
        else{
            $(this).parent().parent().children(':first-child').val(timer_val-1);
        }
    });

    $(".settings_close").click(function(){
        $(".settings").hide();
    });

    $(".settings_btn").click(function(){
        $(".settings").css("display","inline-block");
    });

    $(".timer_type").click(function(){
        $(".timer_type").each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");

        pomodoro = $("#pomodoro").val();
        short_break = $("#short_break").val();
        long_break = $("#long_break").val();
        
        if($(".pomodoro_timer").hasClass("active")){
            minutes = pomodoro;
            $("h1").text(pomodoro + ":00");
        }

        else if($(".sb_timer").hasClass("active")){
            minutes = short_break;
            $("h1").text(short_break + ":00");
        }

        else if($(".lb_timer").hasClass("active")){
            minutes = long_break;
            $("h1").text(long_break + ":00");
        }

    });

    $(".font_pb").click(function(){
        $(".font_pb").each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");

        if($(this).hasClass("kumbh")){
            chosen_font ="main_kumbh";
        }
        else if ($(this).hasClass("roboto")){
            chosen_font = "main_roboto";
        }
        else{
            chosen_font = "main_space";
        }
    });

    $(".color_pb").click(function(){
        $(".color_pb").each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        
        if($(this).hasClass("red")){
            chosen_col = "main_red";
        }
        else if ($(this).hasClass("cyan")){
            chosen_col = "main_cyan";
        }
        else{
            chosen_col = "main_purple";
        }
    });

    $(".apply_btn").click(function(){
        $(".settings").hide();
        $("body").removeClass();
        
        pomodoro = $("#pomodoro").val();
        short_break = $("#short_break").val();
        long_break = $("#long_break").val();
        
        if($(".pomodoro_timer").hasClass("active")){
            $("h1").text(pomodoro + ":00");
        }

        else if($(".sb_timer").hasClass("active")){
            $("h1").text(short_break + ":00");
        }

        else if($(".lb_timer").hasClass("active")){
            $("h1").text(long_break + ":00");
        }

        current_col = chosen_col;
        current_font = chosen_font;
        $("body").addClass(current_font + " " + current_col);
    });


});