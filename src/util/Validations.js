

export function isMinLength(text,length) {
    if(text == '' || text == null) {
       return false 
    } else if(text.length<length) {
        return false
    } else {
        return true
    }
}

export function isFieldEmpty(text) {
    if(text == null || text == ''){
        return true
    } else {
        return false
    }
}

export function isAnyFieldEmpty(fieldsArray) {
    console.log(fieldsArray)
    for(let i=0;i<fieldsArray.length;i++) {
        if(!fieldsArray[i]) {
            console.log(fieldsArray[i])
            return true
        } 
    }
    return false
}

export function validateEmail(text) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}

export function validatePassword(text) {
    // var rg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,15})$/
    var rg = /(?!^[a-zA-Z]$)^([a-zA-Z0-9]{6,15})$/
    return rg.test(text)
}

export function getCartType(number) {
    var visa = /^4/
    var master = /^5[1-5]/
    var amex = /^3[47]/
    if(visa.test(number)) {
        return 1
    } else if (master.test(number)) {
        return 2
    } else if(amex.test(number)) {
        return 
    } else {
        return 0
    }
}

