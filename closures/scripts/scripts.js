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

class Client{
    constructor({Name,AccNum,cardNum,PIN,AccBal}){
        this.Name=Name
        this.AccNum=AccNum
        this.cardNum=cardNum
        this.PIN=PIN
        this.AccBal=AccBal
    }
}

const ram =new Client(usersObj[0])
const kumar =new Client(usersObj[1])
const arun =new Client(usersObj[2])
const nadia =new Client(usersObj[3])
const selli =new Client(usersObj[4])


function ATM(cardNum,PIN,amount,clientObj){
    if((cardNum==clientObj.cardNum)&&(PIN==clientObj.PIN)){
        function withdrawCash(){
            if(amount<=clientObj.AccBal) {
                clientObj.AccBal=clientObj.AccBal-amount
                console.log(`${clientObj.Name} -  Rupess ${amount} successfully withdrawan`)
                console.log(`${clientObj.Name} - Ruepess ${clientObj.AccBal} is the balance`)
            }
            else console.log(`${user1.Name} - Insufficient balance`)
        }
        return withdrawCash()
    }
    else console.log('wrong credentials!')
}

function CDM(cardNum,PIN,amount,clientObj){
    if((cardNum==clientObj.cardNum)&&(PIN==clientObj.PIN)){
        function depositCash(){
            clientObj.AccBal=amount+clientObj.AccBal
            console.log(`${clientObj.Name} - Rupees ${amount} deposited`)
            console.log(`${clientObj.Name} - Ruepess ${clientObj.AccBal} is the balance`)
        }
        return depositCash()
    }
    else console.log('wrong credentials!')
}


let withdraw = ATM(9999222211110000,1234,100,arun)

let deposit=CDM(4444555566667777,4433,100,ram)

