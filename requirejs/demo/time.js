define(function(require,exports,module){
    console.log("time");
    exports.getNowDate = function(){
        var date = new Date();
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
});
