function bank(cardNum,PIN,amount,user,operation){
    //client details
    const usersObj=[
        {   'Name':'Ram',
            'AccNum':123456789752,
            'cardNum':4444555566667777,
            'PIN':4433,
            'AccBal':200,
        },
        {   'Name':'Kumar',
            'AccNum':563456899751,
            'cardNum':4444555577773333,
            'PIN':4553,
            'AccBal':2000,
        },
        {   'Name':'Arun',
            'AccNum':883336789760,
            'cardNum':9999222211110000,
            'PIN':1234,
            'AccBal':1120,
        },
        {   'Name':'Nadia',
            'AccNum':123886789751,
            'cardNum':4334555566665577,
            'PIN':4003,
            'AccBal':100,
        },
        {   'Name':'Selli',
            'AccNum':100456789752,
            'cardNum':4444115500667777,
            'PIN':2333,
            'AccBal':2500,
        },
    ]
    //client class
    class Client{
        constructor({Name,AccNum,cardNum,PIN,AccBal}){
            this.Name=Name
            this.AccNum=AccNum
            this.cardNum=cardNum
            this.PIN=PIN
            this.AccBal=AccBal
        }
    }

    //creating and adding user
    let users = []
    const ram =new Client(usersObj[0])
    users.push(ram)
    const kumar =new Client(usersObj[1])
    users.push(kumar)
    const arun =new Client(usersObj[2])
    users.push(arun)
    const nadia =new Client(usersObj[3])
    users.push(nadia)
    const selli =new Client(usersObj[4])
    users.push(selli)

    let clientObj= users.find((ele)=>ele.Name==user)

    function ATM(){
        if(amount<=clientObj.AccBal) {
            clientObj.AccBal=clientObj.AccBal-amount
            console.log(`${clientObj.Name} -  Rupess ${amount} successfully withdrawan`)
            console.log(`${clientObj.Name} - Ruepess ${clientObj.AccBal} is the balance`)
    }
    else console.log(`${clientObj.Name} - Insufficient balance`)
    }

    function CDM(){
        clientObj.AccBal=amount+clientObj.AccBal
        console.log(`${clientObj.Name} - Rupees ${amount} deposited`)
        console.log(`${clientObj.Name} - Ruepess ${clientObj.AccBal} is the balance`)
    }

    if((cardNum==clientObj.cardNum)&&(PIN==clientObj.PIN)){
        if(operation=='withdraw'){
            return ATM();
        }
        
        if(operation=='deposit'){
            return CDM();
        }    
    }
    else console.log('wrong credentials!')
}


bank(9999222211110000,1234,20,'Arun','withdraw')
