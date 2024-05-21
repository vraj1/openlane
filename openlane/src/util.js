export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //check local storage
    // const accounts = JSON.parse(localStorage.getItem('registeredAccounts'));
    
    
    // if(accounts){
    //     const emailExists = accounts.some(account => account.email === email)
    //     if(emailExists){
    //         return 'USER_EXISTS'
    //     }
    //     console.log('email', emailRegex.test(email))
    //     return emailRegex.test(email)
    // }
    // console.log('email', emailRegex.test(email))
    return  emailRegex.test(email)
    
}
export function checkUserDoesNotExist(email){
    const accounts = JSON.parse(localStorage.getItem('registeredAccounts'));
    
    if(accounts){
        const emailExists = accounts.some(account => account.email === email)
        if(emailExists){
            return false
        }
    return true

}
}

export function validateName(name){
    return name.length >= 3

}

export function validatePassword(password) {
    const validLength = password.length >= 10 && password.length <= 32;
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;
    const specialCharacterCount = (password.match(/[^A-Za-z0-9]/g) || []).length;

    return validLength && uppercaseCount >= 2 && numberCount >= 2 && specialCharacterCount >= 1;
    
}

export function validatePhoneNumber(number){
    //console.log('phone', number)
    if(!number){
        return true
    }
    const validNumber = /^\+?[1-9]\d{0,2}\d{10}$/;
   
    return validNumber.test(number.replace(/[^\d+]/g, ''))
}

export function validateColour(colour){
    if(!colour || colour.length === 0){
      
        return false
    }
    console.log(colour)
    return true
}