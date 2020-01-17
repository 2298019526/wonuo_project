var alerts = {
    show: showAlerts,
    hide: hideAlerts
}

function showAlerts(options){
    options.type = options.type || "primary";
    options.direction = options.direction || 3000;
    options.title = options.title || "提示";
    options.content = options.content || "这是提示内容！";

    var templete = '<div id="alertsContainer" class="alert-container"><div class="alert alert-'+options.type+'"><div class="alert-title">'+options.title+'</div>'+options.content+'</div></div>';

    $("body").append(templete);
    setTimeout(function(){
        $("#alertsContainer").animate({top:"-200px",opacity: "0"},500,function(){
            $("#alertsContainer").remove();
            if(options.success && typeof options.success == "function"){
                options.success();
            }
        });
    },options.direction)
}

function hideAlerts(){
    $("#alertsContainer").animate({top:"-200px",opacity: "0"},500,function(){
        $("#alertsContainer").remove();
    });
}