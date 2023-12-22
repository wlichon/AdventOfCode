enum HandStrength{
    High,
    One,
    Two,
    Three,
    Full,
    Four,
    Five
}

type HandInfo = {
   hand : string,
   strength : HandStrength
}

const handStrength = (hand : string, joker : boolean) : HandInfo => {
    let cards = new Map<string, number>();
    for(let card of hand){
        cards.set(card, (cards.get(card) ?? 0) + 1)
    }
    let mask = 0
    for(let count of cards.values()){
        switch(count){
            case 1:
                mask |= 1 << 0
                break;
            case 2:
                mask |= 1 << 1
                break;
            
            case 3:
                mask |= 1 << 2
                break;
            case 4:
                mask |= 1 << 3
                break;
            case 5:
                mask |= 1 << 4
                break;
        }
    } 

    let strength : HandStrength = HandStrength.High

    if(mask & 0b10000){
        
        return {
            hand : hand,
            strength : HandStrength.Five
        }
    }
    if(mask & 0b01000){
        let strength : HandStrength = HandStrength.Four 
        if(joker){
            const jokers = hand.match(/J/g) ?? 0
            if(jokers){
                strength = HandStrength.Five
            }
        }
        return {
            hand : hand,
            strength : strength
        }
    }
    if(mask & 0b00100 && mask & 0b00010){
        let strength : HandStrength = HandStrength.Full 
        if(joker){
            const jokers = hand.match(/J/g) ?? 0
            if(jokers){
                strength = HandStrength.Five
            }
        }
        
        return {
            hand : hand,
            strength : strength
        }
    }
    if(mask & 0b00100){
        let strength : HandStrength = HandStrength.Three 
        if(joker){
            const jokers = hand.match(/J/g) ?? 0
            if(jokers){
                if(jokers.length === 1 || jokers.length === 3)
                    strength = HandStrength.Four
                else{
                    strength = HandStrength.Five
                }
            }
        }

        return {
            hand : hand,
            strength : strength
        }
    }
    if(mask & 0b00010){
        let strength : HandStrength = HandStrength.One 

        let pairs = [...cards.entries()].filter(x => x[1] === 2)

        if(pairs.length === 2){
           strength = HandStrength.Two
           if(joker){
                const jokers = hand.match(/J/g) ?? 0
                if(jokers){
                    if(jokers.length == 1){
                        strength = HandStrength.Full

                    }
                    if(jokers.length == 2){
                        strength = HandStrength.Four
                    }
                }
            }
        }
        else{
            if(joker){
                const jokers = hand.match(/J/g) ?? 0
                if(jokers){
                    strength = HandStrength.Three
                }
             }
        }
       
        return {
            hand : hand,
            strength : strength
        }
        
    }

    if(joker){
        const jokers = hand.match(/J/g) ?? 0
        if(jokers){
            strength = HandStrength.One
        }
    }

    return {
        hand : hand,
        strength : strength
    }
}


import fs from "fs"

function setValue(map : any, key : any, value : any) {
    if (!map.has(key)) {
        map.set(key, [value]);
        return;
    }
    map.get(key).push(value);
}

type HandAndBet = {
    hand : string,
    bet : number
}

function compareHands(a : HandAndBet, b : HandAndBet) : number{
    let order : string = "23456789TJQKA";
    for(let i = 0; i < 5; i++){
        let idxA = order.indexOf(a.hand[i])
        let idxB = order.indexOf(b.hand[i])
        if(idxA < idxB){
            return -1
        }
        if(idxA > idxB){
            return 1
        }
    }
    return 0
}

function compareHandsJoker(a : HandAndBet, b : HandAndBet) : number{
    let order : string = "J23456789TQKA";
    for(let i = 0; i < 5; i++){
        let idxA = order.indexOf(a.hand[i])
        let idxB = order.indexOf(b.hand[i])
        if(idxA < idxB){
            return -1
        }
        if(idxA > idxB){
            return 1
        }
    }
    return 0
}
    
    

const PartOne = (fileName : string) : number => {
    const input = fs.readFileSync(fileName, 'utf8').split('\r\n')
    let hands = new Map<HandStrength, HandAndBet[]>()
    for(let line of input){
        let split = line.split(" ")
        let hnb : HandAndBet = {
            hand : split[0],
            bet : Number(split[1])
        }
       
        let handInfo : HandInfo = handStrength(hnb.hand, false)
        setValue(hands, handInfo.strength, hnb)
    }

    for(const val of hands.values()){
        val.sort(compareHands)
    }

    let winnings : number = 0
    let currentRank : number = 1

    for(let currentStrength = HandStrength.High; currentStrength <= HandStrength.Five; currentStrength++){
        for(const hand of hands.get(currentStrength) ?? []){
            winnings += hand.bet * currentRank
            currentRank++
        }
    }
    return winnings;
}

const PartTwo = (fileName : string) : number => {
    const input = fs.readFileSync(fileName, 'utf8').split('\r\n')
    let hands = new Map<HandStrength, HandAndBet[]>()
    for(let line of input){
        let split = line.split(" ")
        let hnb : HandAndBet = {
            hand : split[0],
            bet : Number(split[1])
        }
       
        let handInfo : HandInfo = handStrength(hnb.hand, true)
        setValue(hands, handInfo.strength, hnb)
    }

    for(const val of hands.values()){
        val.sort(compareHandsJoker)
    }

    let winnings : number = 0
    let currentRank : number = 1
    for(let currentStrength = HandStrength.High; currentStrength <= HandStrength.Five; currentStrength++){
        for(const hand of hands.get(currentStrength) ?? []){
            winnings += hand.bet * currentRank
            currentRank++
        }
    }
    return winnings;
} 

module.exports = {
    handStrength,
    HandStrength : HandStrength,
    PartOne,
    PartTwo
}