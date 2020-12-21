const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.login(config.token)
client.once('ready', () => {
	console.log('Ready!');
});



client.on('message', message =>{
    const messageOutput = new Discord.MessageEmbed();
    if(message.content.charAt(0) === '!'){
        let currentMessage = message.content.toLowerCase();
        if(currentMessage.includes("roll")){
        
        //if the input string is invalid, the server wont break, if the second part is incorrect, it goes through with NaN 
        try{
            determineDice(currentMessage, 0);
           let getRoll = Roll(determineDice(currentMessage,1), determineDice(currentMessage, 0), currentMessage);
            message.react(determineReact(getRoll.output,determineDice(currentMessage,1)));
            messageOutput.addFields(
            { name: 'Your total:' , value: getRoll.addedUp },
            { name: 'Individually:', value: getRoll.output},
        )
            messageOutput.setTitle("Your roll " + "@" + message.author.tag.toString());
            message.channel.send(messageOutput);
        }catch(e){
            messageOutput.setColor('#FF0000');
            messageOutput.setTitle("Roll like this: /Roll 1D6");
            message.channel.send(messageOutput);
        }
        
        
    }
    if(currentMessage.includes("info")){
        messageOutput.setColor('Green');
        messageOutput.setTitle("Info");
        messageOutput.addFields(
        { name: 'Én vagyok az új robot' , value: "Beep, boop" }
        )
        message.channel.send(messageOutput);
    }
}
});

// if the player rolls the highest possible number, they get the happy emoji 
function determineReact(numbers, maxType){
    let returnArray;
 if(numbers.indexOf(maxType) != -1){
     return '😊' ;
 }else{
     return '🤐'
 }
}
function determineDice(message, searchType){
    let diceType;
    let whatDice = message.indexOf('d')+1;
    // if 1, we search for dice tpye
    if(searchType === 1){
        for (let index = whatDice; index <= message.length; index++) {
        
            diceType += message.charAt(index)
            
        }
    }
    // if its zero, we search for how many rolls
    else if(searchType === 0){
        whatDice = message.indexOf('d');
        for (let index = 5; index < whatDice; index++) {
            diceType += message.charAt(index);
           
            
        }
    }
    
    diceType = parseInt(diceType.replace("undefined", ""));
    return diceType;

};
function Roll(diceType, howManyTimes, currentMessage) {
    let output = "";
    let addedUp = 0;
    let returnArray;
    let bonusPoint = "";
    // if theres a positive multiplier
    if(currentMessage.indexOf('+') > 0){
        for (let index = currentMessage.indexOf('+')+1; index < currentMessage.length; index++){
            bonusPoint += currentMessage[index];
           
        }
    // if there is a negative multiplier
    }else if(currentMessage.indexOf('-') > 0){
        for (let index = currentMessage.indexOf('+')+1; index < currentMessage.length; index++){
            bonusPoint +=  currentMessage[index];
           
        }
    }
    if(bonusPoint === ""){
        bonusPoint = parseInt(0);
    }else{
        bonusPoint = parseInt(bonusPoint);
    }
    //calculating the rolls
    for (let index = 0; index < howManyTimes; index++) {
     let whatDidWeRoll = Math.floor(Math.random()*diceType) +1;
     output +=whatDidWeRoll+" ";
     addedUp += whatDidWeRoll;
    }
    addedUp += bonusPoint;
    returnArray = {output, addedUp, bonusPoint};
    return returnArray;
    

};