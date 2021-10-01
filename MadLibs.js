var nouns = [];
var verbs = [];
var adjectives = [];
var templates = [];
var userinput = '';
var x = 0;

const prompt = require('prompt-sync')();

function newgame(){
    console.log('Hello! Welcome to the MadLibs generator game by ThinkingEmoji! To get started, please provide some words for the game.')
    getnouns(5);
    console.log(nouns)
}

function getreplacement(type){
    if(type.toUpperCase == 'NOUN'){
        return nouns[Math.floor(Math.random() * nouns.length())];
    } else if(type.toUpperCase == 'VERB'){
        return verbs[Math.floor(Math.random() * nouns.length())];
    } else if(type.toUpperCase == 'ADJECTIVE'){
        return adjectives[Math.floor(Math.random() * nouns.length())];
    }
}

function getnouns(num){
    for(let i = 0; i < num; i++){
        x = i+1;
        userinput = prompt(`Please enter Noun #${x}: `);
        if(!userinput || userinput == '' || userinput.substring(0,1) == ' '){
            console.log('Please enter a valid Noun.')
            i--;
        } else nouns.push(userinput);
    }
}

function getverbs(num){
    for(let i = 0; i < num; i++){
        x = i+1;
        userinput = prompt(`Please enter Verb #${x}: `);
        if(!userinput || userinput == '' || userinput.substring(0,1) == ' '){
            console.log('Please enter a valid Verb.')
            i--;
        } else verbs.push(userinput);
    }
}

function getadjectives(num){
    for(let i = 0; i < num; i++){
        x = i+1;
        userinput = prompt(`Please enter Adjective #${x}: `);
        if(!userinput || userinput == '' || userinput.substring(0,1) == ' '){
            console.log('Please enter a valid Adjective.')
            i--;
        } else adjectives.push(userinput);
    }
}

newgame();