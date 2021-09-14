$( document ).ready(function() {

    //Style variables -----------------------------------------------
    var current_font = "main_space";
    var current_col = "main_purple";
    var chosen_font = "";
    var chosen_col = "";

    //Timers --------------------------------------------------------
    var pomodoro = $("#pomodoro").val();
    var short_break = $("#short_break").val();
    var long_break = $("#long_break").val();

    var remaining_minutes = [pomodoro, short_break, long_break];
    var remaining_seconds = [0, 0, 0];
    var current_timer = "pomodoro_timer";
    
    $("body").addClass(current_font + " " + current_col);
    
    var timer_pomodoro = {
        minutes: pomodoro,
        seconds: 0,
        currentInterval:null,
        start : function() {
            
            this.currentInterval = setInterval(() => {

                $(".circle_time.pomodoro.hide-for-desktop").eq(0).css("animation-play-state","running");
                $(".circle_time.pomodoro.hide-for-mobile").eq(0).css("animation-play-state","running");
                
                if( this.minutes == 0 && this.seconds == 0){
                    $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                    $(".pause_text").text("restart");
                    this.stop();
                    return false
                }

                if(this.minutes == pomodoro && this.seconds == 0){
                    $(".circle_time.pomodoro.hide-for-desktop").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                    $(".circle_time.pomodoro.hide-for-mobile").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                }

                if(this.seconds == 0){
                    this.seconds = 60;
                    this.minutes = this.minutes - 1;
                }
                
                this.seconds = this.seconds-1;
                
                remaining_minutes[0] = this.minutes;
                remaining_seconds[0] = this.seconds;
                
                $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                
            }, 1000);
        },

        stop: function() {
            $(".circle_time.pomodoro.hide-for-desktop").eq(0).css("animation-play-state","paused");
            $(".circle_time.pomodoro.hide-for-mobile").eq(0).css("animation-play-state","paused");
            clearInterval(this.currentInterval)
        }
 
    };


    var timer_sb = {
        minutes: short_break,
        seconds: 0,
        currentInterval:null,
        start : function() {

            this.currentInterval = setInterval(() => {

                $(".circle_time.short_break.hide-for-desktop").eq(0).css("animation-play-state","running");
                $(".circle_time.short_break.hide-for-mobile").eq(0).css("animation-play-state","running");
                
                if( this.minutes == 0 && this.seconds == 0){
                    $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                    $(".pause_text").text("restart");
                    this.stop();
                    return false
                }

                if(this.minutes == short_break && this.seconds == 0){
                    $(".circle_time.short_break.hide-for-desktop").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                    $(".circle_time.short_break.hide-for-mobile").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                }

                if(this.seconds == 0){
                    this.seconds = 60;
                    this.minutes = this.minutes - 1;
                }
                
                this.seconds = this.seconds-1;
                
                remaining_minutes[1] = this.minutes;
                remaining_seconds[1] = this.seconds;
                
                $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                
            }, 1000);
        },

        stop: function() {
            $(".circle_time.short_break.hide-for-desktop").eq(0).css("animation-play-state","paused");
            $(".circle_time.short_break.hide-for-mobile").eq(0).css("animation-play-state","paused");
            clearInterval(this.currentInterval)
        }
 
    };


    var timer_lb = {
        minutes: long_break,
        seconds: 0,
        currentInterval:null,
        start : function() {
            
            this.currentInterval = setInterval(() => {

                $(".circle_time.long_break.hide-for-desktop").eq(0).css("animation-play-state","running");
                $(".circle_time.long_break.hide-for-mobile").eq(0).css("animation-play-state","running");
                
                if( this.minutes == 0 && this.seconds == 0){
                    $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                    $(".pause_text").text("restart");
                    this.stop();
                    return false
                }

                if(this.minutes == long_break && this.seconds == 0){
                    $(".circle_time.long_break.hide-for-desktop").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                    $(".circle_time.long_break.hide-for-mobile").eq(0).css("animation", "countdown " + (60*this.minutes + this.seconds).toString() +"s linear forwards");
                }

                if(this.seconds == 0){
                    this.seconds = 60;
                    this.minutes = this.minutes - 1;
                }
                
                this.seconds = this.seconds-1;
                
                remaining_minutes[2] = this.minutes;
                remaining_seconds[2] = this.seconds;
                
                $("h1").text(twoDigits(this.minutes) + ":" + twoDigits(this.seconds));
                
            }, 1000);
        },

        stop: function() {
            $(".circle_time.long_break.hide-for-desktop").eq(0).css("animation-play-state","paused");
            $(".circle_time.long_break.hide-for-mobile").eq(0).css("animation-play-state","paused");
            clearInterval(this.currentInterval)
        }
 
    };

    if(current_timer === "pomodoro_timer"){
        $("h1").text(twoDigits(timer_pomodoro.minutes) + ":" + twoDigits(timer_pomodoro.seconds));
    }
    else if (current_timer === "sb_timer"){
        $("h1").text(twoDigits(timer_sb.minutes) + ":" + twoDigits(timer_sb.seconds));
    }
    else{
        $("h1").text(twoDigits(timer_lb.minutes) + ":" + twoDigits(timer_lb.seconds));
    }

    

    $(".inner_circle").click( function() {
        if($(".pause_text").text() === "start"){
            $(".pause_text").text("pause");
            if(current_timer === "pomodoro_timer"){
                timer_pomodoro.start();
            }
            else if (current_timer === "sb_timer"){
                timer_sb.start();
            }
            else{
                timer_lb.start();
            }
        }
        else if($(".pause_text").text() === "pause"){
            $(".pause_text").text("start")
            if(current_timer === "pomodoro_timer"){
                timer_pomodoro.stop();
            }
            else if (current_timer === "sb_timer"){
                timer_sb.stop();
            }
            else{
                timer_lb.stop();
            }
        }
        else{
            $(".pause_text").text("pause");
            
            if(current_timer === "pomodoro_timer"){
                remaining_minutes[0] = pomodoro;
                remaining_seconds[0] = 0;
                timer_pomodoro.minutes = pomodoro;
                timer_pomodoro.seconds = 0;
                $(".original_circles").append($( ".circle_time.pomodoro.hide-for-mobile" ).eq(1).clone());
                $( ".circle_time.pomodoro.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.pomodoro.hide-for-mobile" ).eq(1));
                $(".original_circles").append($( ".circle_time.pomodoro.hide-for-desktop" ).eq(1).clone());
                $( ".circle_time.pomodoro.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.pomodoro.hide-for-desktop" ).eq(1));
                $("h1").text(twoDigits(timer_pomodoro.minutes) + ":" + twoDigits(timer_pomodoro.seconds));
                timer_pomodoro.start();
            }
            else if(current_timer === "sb_timer"){
                remaining_minutes[1] = short_break;
                remaining_seconds[1] = 0;
                timer_sb.minutes = short_break;
                timer_sb.seconds = 0;
                $(".original_circles").append($( ".circle_time.short_break.hide-for-mobile" ).eq(1).clone());
                $( ".circle_time.short_break.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.short_break.hide-for-mobile" ).eq(1));
                $(".original_circles").append($( ".circle_time.short_break.hide-for-desktop" ).eq(1).clone());
                $( ".circle_time.short_break.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.short_break.hide-for-desktop" ).eq(1));
                $("h1").text(twoDigits(timer_sb.minutes) + ":" + twoDigits(timer_sb.seconds));
                timer_sb.start();
            }
            else{
                remaining_minutes[2] = long_break;
                remaining_seconds[2] = 0;
                timer_lb.minutes = long_break;
                timer_lb.seconds = 0;
                $(".original_circles").append($( ".circle_time.long_break.hide-for-mobile" ).eq(1).clone());
                $( ".circle_time.long_break.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.long_break.hide-for-mobile" ).eq(1));
                $(".original_circles").append($( ".circle_time.long_break.hide-for-desktop" ).eq(1).clone());
                $( ".circle_time.long_break.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.long_break.hide-for-desktop" ).eq(1));
                $("h1").text(twoDigits(timer_lb.minutes) + ":" + twoDigits(timer_lb.seconds));
                timer_lb.start(); 
            } 

        }
    });


    $(".timer_type").click(function(){
        $(".timer_type").each(function(){
            $(this).removeClass("active");
        });

        $(this).addClass("active");

        

        if(!$(this).attr("class").includes(current_timer)){

            if(current_timer === "pomodoro_timer"){
                timer_pomodoro.stop();
            }
            else if (current_timer === "sb_timer"){
                timer_sb.stop();
            }
            else{
                timer_lb.stop();
            }
            
            if($(".pomodoro_timer").hasClass("active")){
                $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
                $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
                $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
                $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));

                $( ".timer_type.pomodoro_timer" ).eq(0).addClass("active");
                
                //Play transition animation --------------------------------------------------------------------------------
                if(current_timer == "sb_timer"){
                    $(".pomodoro_timer").eq(0).addClass("toleft_p");
                    $(".pomodoro_timer").eq(0).addClass("nodelay");
                    $(".sb_timer").eq(0).addClass("toleft_lb");
                }
                
                else if(current_timer == "lb_timer"){
                    $(".pomodoro_timer").eq(0).addClass("toleft_p");
                    $(".sb_timer").eq(0).addClass("toleft_sb");
                    $(".lb_timer").eq(0).addClass("toleft_lb");
                }
                
                current_timer = "pomodoro_timer";
                if(remaining_minutes[0] == 0 && remaining_seconds[0] == 0){
                    $(".pause_text").text("restart")
                }
                else{
                    $(".pause_text").text("start")
                }
                timer_pomodoro.minutes = remaining_minutes[0];
                timer_pomodoro.seconds = remaining_seconds[0];
                $(".circle_time").each(function(){
                    if($(this).hasClass("pomodoro")){
                        $(this).css("opacity","1");
                    }
                    else{
                        $(this).css("opacity","0");
                    }
                });  
                $("h1").text(twoDigits(timer_pomodoro.minutes) + ":" + twoDigits(timer_pomodoro.seconds));  
            }

            else if($(".sb_timer").hasClass("active")){
                $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
                $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
                $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
                $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));

                $( ".timer_type.sb_timer" ).eq(0).addClass("active");

                //Play transition animation --------------------------------------------------------------------------------
                if(current_timer === "pomodoro_timer"){
                    $(".pomodoro_timer").eq(0).addClass("nodelay");
                    $(".pomodoro_timer").eq(0).addClass("toleft_p"); 
                    $(".pomodoro_timer").eq(0).addClass("reverse"); 
                    $(".sb_timer").eq(0).addClass("toright_sb");
                }

                else if(current_timer === "lb_timer"){
                    $(".lb_timer").eq(0).addClass("toleft_lb");
                    $(".sb_timer").eq(0).addClass("toleft_p");
                    $(".sb_timer").eq(0).addClass("nodelay");
                }

                current_timer = "sb_timer";
                if(remaining_minutes[1] == 0 && remaining_seconds[1] == 0){
                    $(".pause_text").text("restart")
                }
                else{
                    $(".pause_text").text("start")
                }
                timer_sb.minutes = remaining_minutes[1];
                timer_sb.seconds = remaining_seconds[1];
    
                $(".circle_time").each(function(){
                    if($(this).hasClass("short_break")){
                        $(this).css("opacity","1");
                    }
                    else{
                        $(this).css("opacity","0");
                    }
                });  
                $("h1").text(twoDigits(timer_sb.minutes) + ":" + twoDigits(timer_sb.seconds));  
            }

            else if($(".lb_timer").hasClass("active")){

                $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
                $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
                $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

                $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
                $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));

                $( ".timer_type.lb_timer" ).eq(0).addClass("active");

                //Play transition animation --------------------------------------------------------------------------------
                if(current_timer == "pomodoro_timer"){
                    $(".pomodoro_timer").eq(0).addClass("toleft_p");
                    $(".pomodoro_timer").eq(0).addClass("nodelay");
                    $(".pomodoro_timer").eq(0).addClass("reverse");
                    
                    $(".sb_timer").eq(0).addClass("toleft_sb");
                    $(".sb_timer").eq(0).addClass("reverse");

                    $(".lb_timer").eq(0).addClass("toleft_lb");
                    $(".lb_timer").eq(0).addClass("reverse");
                    $(".lb_timer").eq(0).addClass("delay");
                }
                else if(current_timer == "sb_timer"){
                    $(".sb_timer").eq(0).addClass("toleft_p");
                    $(".sb_timer").eq(0).addClass("nodelay");
                    $(".sb_timer").eq(0).addClass("reverse");
                    $(".lb_timer").eq(0).addClass("toleft_lb");
                    $(".lb_timer").eq(0).addClass("reverse");
                }

                current_timer = "lb_timer";
                if(remaining_minutes[2] == 0 && remaining_seconds[2] == 0){
                    $(".pause_text").text("restart");
                }
                else{
                    $(".pause_text").text("start");
                }
                timer_lb.minutes = remaining_minutes[2];
                timer_lb.seconds = remaining_seconds[2];
                $(".circle_time").each(function(){
                    if($(this).hasClass("long_break")){
                        $(this).css("opacity","1");
                    }
                    else{
                        $(this).css("opacity","0");
                    }
                });  
                $("h1").text(twoDigits(timer_lb.minutes) + ":" + twoDigits(timer_lb.seconds));  
            }
            
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
        
        $(".color_pb").each(function(){
            $(this).removeClass("active");
        });
        if(current_col == "main_red"){
            $(".color_pb.red").addClass("active");
        }
        else if(current_col == "main_cyan"){
            $(".color_pb.cyan").addClass("active");
        }
        else{
            $(".color_pb.purple").addClass("active");
        }

        $(".font_pb").each(function(){
            $(this).removeClass("active");
        });
        if(current_font == "main_kumbh"){
            $(".font_pb.kumbh").addClass("active");
        }
        else if(current_font == "main_roboto"){
            $(".font_pb.roboto").addClass("active");
        }
        else{
            $(".font_pb.space").addClass("active");
        }

        $(".settings").css("display","inline-block");
    });

    $(".apply_btn").click(function(){
        $(".settings").hide();
        $("body").removeClass();
        
        pomodoro = $("#pomodoro").val();
        short_break = $("#short_break").val();
        long_break = $("#long_break").val();

        remaining_minutes = [pomodoro,short_break,long_break];
        remaining_seconds = [0,0,0];

        timer_pomodoro.minutes = pomodoro;
        timer_pomodoro.seconds = 0;
        
        timer_sb.minutes = short_break;
        timer_sb.seconds = 0;
        
        timer_lb.minutes = long_break;
        timer_lb.seconds = 0;

        $(".pause_text").text("start");

        $(".original_circles").append($( ".circle_time.pomodoro.hide-for-desktop" ).eq(1).clone());
        $(".original_circles").append($( ".circle_time.short_break.hide-for-desktop" ).eq(1).clone());
        $(".original_circles").append($( ".circle_time.long_break.hide-for-desktop" ).eq(1).clone());
        $(".original_circles").append($( ".circle_time.pomodoro.hide-for-mobile" ).eq(1).clone());
        $(".original_circles").append($( ".circle_time.short_break.hide-for-mobile" ).eq(1).clone());
        $(".original_circles").append($( ".circle_time.long_break.hide-for-mobile" ).eq(1).clone());


        $( ".circle_time.pomodoro.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.pomodoro.hide-for-desktop" ).eq(1));
        $( ".circle_time.short_break.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.short_break.hide-for-desktop" ).eq(1));
        $( ".circle_time.long_break.hide-for-desktop" ).eq(0).replaceWith($( ".circle_time.long_break.hide-for-desktop" ).eq(1));
        $( ".circle_time.pomodoro.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.pomodoro.hide-for-mobile" ).eq(1));
        $( ".circle_time.short_break.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.short_break.hide-for-mobile" ).eq(1));
        $( ".circle_time.long_break.hide-for-mobile" ).eq(0).replaceWith($( ".circle_time.long_break.hide-for-mobile" ).eq(1));

        
        
        
        if($(".pomodoro_timer").hasClass("active")){
            $("h1").text(twoDigits(pomodoro) + ":00");
            timer_pomodoro.stop();
            $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
            $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
            $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
            $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));
            $
            (".pomodoro_timer").eq(0).addClass("active initial");
        }

        else if($(".sb_timer").hasClass("active")){
            $("h1").text(twoDigits(short_break) + ":00");
            timer_sb.stop();

            $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
            $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
            $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
            $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));
            $
            (".sb_timer").eq(0).addClass("active initial");
            
        }

        else if($(".lb_timer").hasClass("active")){
            $("h1").text(twoDigits(long_break) + ":00"); 
            timer_lb.stop();
            $(".original_buttons").append($( ".timer_type.pomodoro_timer" ).eq(1).clone(true));
            $( ".timer_type.pomodoro_timer" ).eq(0).replaceWith($( ".timer_type.pomodoro_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.sb_timer" ).eq(1).clone(true));
            $( ".timer_type.sb_timer" ).eq(0).replaceWith($( ".timer_type.sb_timer" ).eq(1));

            $(".original_buttons").append($( ".timer_type.lb_timer" ).eq(1).clone(true));
            $( ".timer_type.lb_timer" ).eq(0).replaceWith($( ".timer_type.lb_timer" ).eq(1));
            $
            (".lb_timer").eq(0).addClass("active initial");
        }

        current_col = chosen_col;
        
        current_font = chosen_font;

        $("body").addClass(current_font + " " + current_col);
    });

});

function twoDigits(s){
    if(s<10){
        return "0" + s.toString();
    }

    return s.toString();
}
