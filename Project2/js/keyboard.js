// Reference
// where:http://www.javascriptkit.com/javatutors/touchevents2.shtml
// what: use this reference to help me implement a function about swiping in different direction  
// why: I tried my self but it doens't work very fast to recognize the swipe and I found this source online which could save my time on swiping algorithm
function swipedetect(el,input1, input2, input3, input4,callback){
    var touchsurface = el,
    i1 = input1,
    i2 = input2,
    i3 = input3,
    i4 = input4,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 12, 
    restraint = 30, 
    allowedTime = 600, 
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = ''
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() 
        e.preventDefault()
    }, false)
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() 
    }, false)
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX 
        distY = touchobj.pageY - startY 
        elapsedTime = new Date().getTime() - startTime 
        if (elapsedTime <= allowedTime){ 
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                if(distX < 0 ){
                    swipedir = i1;
                }
                else{
                    swipedir = i2;
                }
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ 
                if(distY < 0){
                    swipedir = i3;
                }
                else{
                    swipedir = i4;
                }
            }
        }
        else{
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                if(distX < 0 ){
                    swipedir = i1.toUpperCase();
                }
                else{
                    swipedir = i2.toUpperCase();
                }
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ 
                if(distY < 0){
                    swipedir = i3.toUpperCase();
                }
                else{
                    swipedir = i4.toUpperCase();
                }
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
var e1_2 = document.getElementById('K12');
swipedetect(e1_2,'a','b','delete',' ',function(swipedir){
    //e1_2.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    if(swipedir == 'delete'){
        var $out = $("#output");
        var currentvalue = $out.val();
        var newvalue = currentvalue.substring(0, currentvalue.length - 1);
        $out.val(newvalue);

    }
    else{
        var $out = $("#output");
        var currentvalue = $out.val();
        var newvalue = currentvalue + swipedir;
        $out.val(newvalue);
    }
 
});
var e2_1 = document.getElementById('K21');
swipedetect(e2_1,'c','d','e','f',function(swipedir){
    //e2_1.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
var e2_2 = document.getElementById('K22');
swipedetect(e2_2,'g','h','i','j',function(swipedir){
    //e3_2.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
var e2_3 = document.getElementById('K23');
swipedetect(e2_3,'k','l','m','n',function(swipedir){
    //e2_3.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
var e3_1 = document.getElementById('K31');
swipedetect(e3_1,'o','p','q','r',function(swipedir){
    //e3_1.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
var e3_2 = document.getElementById('K32');
swipedetect(e3_2,'s','t','u','v',function(swipedir){
    //e3_2.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
var e3_3 = document.getElementById('K33');
swipedetect(e3_3,'w','x','y','z',function(swipedir){
    //e3_2.innerHTML = '<span style="color:black">' + swipedir +'</span>';
    var $out = $("#output");
    var currentvalue = $out.val();
    var newvalue = currentvalue + swipedir;
    $out.val(newvalue);
});
