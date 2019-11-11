window['计算表达式'] = [];

const 运算符列表 = ['+', '-', '*', '/', '%', '√'];

function 功能(类型){
    try{
        let operation = document.querySelector(".operation");

        if(类型 === '取反'){
            window['计算表达式'].unshift('-');//追加取反运算符
        }

        if(类型 === '清空'){
            operation.value = '';
            window['计算表达式'] = [];
        }

        if(类型 === '回退'){
            //解决当一个符号后面是数字时，数字全部删除完成后，数组元素未删除的情况
            if(window['计算表达式'][window['计算表达式'].length-1] === ""){
                window['计算表达式'].pop();
            }

            let 倒数第一个元素索引 = window['计算表达式'].length-1;
            元素值 = window['计算表达式'][倒数第一个元素索引];

            if(isNaN(元素值)){
                window['计算表达式'].pop();
            }else{
                window['计算表达式'][倒数第一个元素索引] = 元素值.substring(0, 元素值.length-1);
            }

            document.querySelector(".operation").value = window['计算表达式'].join('');
        }
    }catch (e) {
        return alert('[请刷新页面]表达式出现错误或该 计算/操作 方式暂未实现，请不要为难我。');
    }

}

function 计算(类型='') {
    try{
        if(计算表达式.length-1 < 0) return alert("式子不正确，请检查！");

        let 最后一个元素值 = 计算表达式[计算表达式.length-1];

        if(inArray(运算符列表, 最后一个元素值)) return alert("不能以运算符结尾！");

        if(inArray(window['计算表达式'], '=')) return alert("无法继续运算，请回退或清空！");

        if(计算表达式.length === 1 && 计算表达式[0] === '²') return alert("不能以单个²结尾！");

        let 计算表达式长度 = window['计算表达式'].length;

        for(let i=0; i<计算表达式长度; i++){
            if(i+1 > 计算表达式长度) break;

            if(计算表达式[i] === '²'){
                计算表达式[i-1] = 'Math.pow('+计算表达式[i-1]+', 2)';
                计算表达式[i] = '';
                continue;
            }

            if(计算表达式[i] === '√'){
                计算表达式[i] = 'Math.sqrt('+计算表达式[i+1]+')';
                计算表达式[i+1] = '';
            }
        }

        let operation = document.querySelector(".operation");
        let history = document.querySelector('.history');


        operation.value += '='+eval(window['计算表达式'].join(''));
        history.innerHTML += "<p>"+operation.value+"</p>";

        history.scrollTop = history.scrollHeight;

        计算表达式追加('=');
    }catch (e) {
        console.log(e);
        return alert('[请刷新页面]表达式出现错误或该 计算/操作 方式暂未实现，请不要为难我。');
    }
}

function 表达式追加(表达式值){
    try{
        let 禁止追加的运算符 = ['+', '-', '*', '/', '%'];

        if(计算表达式.length-1 < 0 && 表达式值 === '²'){
            return alert("平方号必须在一个数字的后面！");
        }

        if(inArray(window['计算表达式'], '=')) return alert("无法继续运算，请回退或清空！");

        if(计算表达式.length > 0){
            let 最后一个数组元素下标 = 计算表达式.length-1,
                最后一个数组元素值 = 计算表达式[最后一个数组元素下标];

            if(Number(表达式值) > -1 && Number(表达式值) < 10) {
                if (检查字符串是否为数字(最后一个数组元素值)) {
                    window.计算表达式[最后一个数组元素下标] = 删除字符串前面的零(最后一个数组元素值) + 表达式值;
                    document.querySelector(".operation").value = window.计算表达式.join('');
                    return true;
                }
            }

            if(inArray(禁止追加的运算符, 最后一个数组元素值)){
                if (inArray(禁止追加的运算符, 表达式值)) return false;
            }

        }

        document.querySelector(".operation").value += 表达式值;
        return 计算表达式追加(表达式值);
    }catch (e) {
        return alert('[请刷新页面]表达式出现错误或该 计算/操作 方式暂未实现，请不要为难我。');
    }
}

function 删除字符串前面的零(字符串) {
    return 字符串.replace(/\b(0+)/gi,"");
}

function 替换特殊表达式(下标值, 新值) {
    let 元素值 = window['计算表达式'][下标值];
    window['计算表达式'][下标值] = 元素值.replace("#替换#", 表达式值);

    return true;
}

function 检查字符串是否为数字(str){
    let 数组 = str.split('');

    for(let 值 in 数组){
        if(isNaN(parseInt(数组[值]))) return false;
    }

    return true;
}

function 计算表达式追加(str) {
    window['计算表达式'].push(str);
    return true;
}

function inArray(haystack, needle) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
}

function hasString(str, check) {
    return str.indexOf(check) > -1;
}
