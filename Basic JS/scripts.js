//-----------section1------------------
console.log(1 + 2)
console.log(1 + '2')
console.log('1' + 2)
console.log('apple' + 'orange')
console.log(1 + 2 + "apple")
console.log("apple" + 1 + 2)
console.log(1 + true)
console.log(0 == false)
console.log(1 === true)
console.log(2 === '2')
console.log(2 == '2')

//-----------section2------------------
let playingEleven = ["Rohit Sharma", "Kl Rahul", "Rishab Pant", "Shreyas Iyer", "Virat Kholi", "Hardik Pandya", "Jadeja", "Buvi", "Bumrah", "Ashwin", "Shami"]

//removing player
playingEleven.shift()
console.log(playingEleven)

//adding player
playingEleven.push("Gill")

//Sorting the Players
console.log("Sorted order", playingEleven.sort())


//adding random jersy number
// for (let player in playing_eleven) {
//     console.log(playing_eleven[player] + "-" + Math.floor(Math.random() * 100))
// }

//store the jersey number and sort the players based on the number
//the jersey number rage: 1 to 99

// let playersJerseyNum=[];
// for (let player in playing_eleven) {
//     playersJerseyNum.push(playing_eleven[player] + "-" + Math.floor(Math.random() * 100))
// }

// player: {jerseyNumber, name}
// jerseyNum={}
// for (let player in playing_eleven) {
//     let randomNum = Math.floor((Math.random() * 98) + 1)
//     jerseyNum[randomNum]=playing_eleven[player];
// }
// Object.keys(jerseyNum).sort((a,b)=> a-b)
// console.log(jerseyNum)

// players = [{jerseyNumber: 9, name: 'Ashwin'}, {jerseyNumber: 8, name: 'Gilli'}]
playingElevenNew=[]
for(let x =0;x<playingEleven.length;x++){
    let num = Math.floor((Math.random() * 98) + 1)
    player={
        'jerseyNumber':num,
        'name':playingEleven[x]
    }
    playingElevenNew.push(player)
}
// console.log(playingElevenNew,'before')



console.log(playingElevenNew.sort((a,b)=>{
    return a.jerseyNumber - b.jerseyNumber
}))

// Object.keys(playingElevenNew[0]).sort((a,b)=> a-b)
// console.log(playingElevenNew,'after')






// playersJerseyNum.sort((a,b)=> Math.abs(parseInt(a.slice(-2,))) - Math.abs(parseInt(b.slice(-2,))))
// console.log(playersJerseyNum+' '+"<-- sorted array based on jersey num" )
//Storing players in uppercase
// let playing_11_backup = playing_eleven.map((player) => player.toUpperCase());
// console.log("old array:", playing_eleven)
// console.log("new array:", playing_11_backup)

//-----------section3------------------

//Displaying num from 1 to 100
numDisplay = (start, limit) => {
    a = 1
    while (a <= limit)
        console.log(a++)
}
numDisplay()

a = function (x) {
    return x + 1
}

b = (x) => {
    return x + 1
}

//regular function vs arrow function

//display date
dateDisplay = () => {
    let obj = new Date()
    console.log(`${obj.getDate()} / ${obj.getMonth()} / ${obj.getFullYear()} `) //check a different solution without + for concatenation
}
dateDisplay()

//Celcius to Fhrenheit
tempConversion = (celcius) => {
    return celcius * 1.8 + 32

}
console.log(tempConversion(38), "F")

//Avg 
//what if this arr is null
average = (arr) => arr.reduce((sum,val)=>sum+val)/arr.length

//find max

let arr = [10, 20, 30, 40]
// console.log(arr.reduce(max))

// const max = (max,val) => {
//     if (max>val) return max
//     else return val
// };

// const max2 = function(max,val) {
//     if (max>val) return max
//     else return val
// };

console.log(average(arr) + " is the Average")

//String reverse

stringReverse = (name) => {
    let revName = ""
    let len = name.length - 1
    while (len > -1) {
        revName = revName + name[len--]
    }
    return revName
}

console.log(stringReverse("vishnu") + " <-reversed string")

