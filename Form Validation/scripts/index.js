const validationObj ={
    fName:{
        'emptyField':'First Name is required',
        'missMatch':'First Name is not valid',
        'regex':/^[a-zA-Z]{1,30}$/,
        'isValid':true
    },
    lName:{
        'emptyField':'Last Name is required',
        'missMatch':'Last Name is not valid',
        'regex':/^[a-zA-Z]{1,30}$/,
        'isValid':true
    },
    email:{
        'emptyField':'Email Address is required',
        'missMatch':'Email Address is not valid',
        // 'regex':/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]{1,50}$/
        'regex':/^[a-zA-Z][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
        'isValid':true
    },
    contact:{
        'emptyField':'Contact Number is required',
        'missMatch':'Contact Number is not valid',
        'regex':/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
        'isValid':true
    },
    zip:{
        'emptyField':'PIN Code is required',
        'missMatch':'PIN Code is not valid',
        'regex':/^[6]{1}[0-9]{5}$/,
        'isValid':true
    },
    cardNum:{
        'emptyField':'Card Number is required',
        'missMatch':'Card Number is not valid',
        'regex':/^\d{16}$/,
        'isValid':true
    },
    expYear:{
        'emptyField':'Card Expiry is required',
        'missMatch':'Card Expiry is not valid',
        'regex':/^20[2-3][3-9]/,
        'isValid':true

    },
    cvv:{
        'emptyField':'CVV is required',
        'missMatch':'CVV is not valid',
        'regex':/^[0-9]{3,4}$/,
        'isValid':true
    },
}
const form =document.getElementById('payment') 
const input= document.querySelectorAll('input')
const pElement=document.querySelectorAll('p')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    for(let idx=0;idx<input.length-1;idx++){
        let idName = input[idx].getAttribute('id')
        let pattern =validationObj[idName].regex;
        //displying error if the field is empty
        if (input[idx].value == '') {
            input[idx].setAttribute('class','warn-box')
            pElement[idx].textContent=validationObj[idName].emptyField
            validationObj[idName].isValid=false
        }
        //displying error if the field is miss matched
        else if(!(pattern.test(input[idx].value))){
            input[idx].setAttribute('class','warn-box')
            pElement[idx].textContent=validationObj[idName].missMatch
            validationObj[idName].isValid=false
        } 
        //reverting to normal style
        else {
            input[idx].setAttribute('class','')
            pElement[idx].textContent=''
            validationObj[idName].isValid=true
        }
    }

    let arr = Object.values(validationObj)
    if(arr.every(element =>  element.isValid === true) === true) form.submit()
})
