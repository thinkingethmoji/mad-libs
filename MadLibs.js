var nouns = [];
var verbs = [];
var adjectives = [];
var extrainputs = [];
var userinput = '';
var x = 0;

const prompt = require('prompt-sync')();

function newgame(){
    console.log('Hello! Welcome to the MadLibs generator game by ThinkingEmoji! To get started, please provide some words for the game.')
    decodetext(mltemplate.text);
    getnouns(mltemplate.numnouns);
    getverbs(mltemplate.numverbs);
    getadjectives(mltemplate.numadjectives);
    getextras(mltemplate.extras.length)

    console.log(encodetext(mltemplate.text));
}

const mltemplate = {
    numnouns: 0,
    numverbs: 0,
    numadjectives: 0,
    extras: [],
    text: 'There was once a boy named <EXTRA Name>. He was a <ADJECTIVE> fan of <NOUN> and loved to <VERB> <NOUN>s. One day he decided to go to <EXTRA Location> so that he could <VERB> <NOUN>s. That was a very <ADJECTIVE> day!'
}

function decodetext(txt){
    let eend = 0;
    for(let e = 0; e < txt.length; e++){
        if(txt.substr(e,1) == '<'){
            if(txt.substr(e,6).toUpperCase() == '<NOUN>'){
                mltemplate.numnouns += 1;
            } else if(txt.substr(e,6).toUpperCase() == '<VERB>'){
                mltemplate.numverbs += 1;
            } else if(txt.substr(e,11).toUpperCase() == '<ADJECTIVE>'){
                mltemplate.numadjectives += 1;
            } else if(txt.substr(e,7).toUpperCase() == '<EXTRA '){
                for(eend = e; txt.substr(eend,1) != '>'; eend++){};

                mltemplate.extras.push(txt.substr(e + 7, eend - (e + 7)));
            }
        }
    }
}

function encodetext(txt){
    let eend = 0;
    let noun = 0;
    let verb = 0;
    let adjective = 0;
    let extra = 0;

    for(let e = 0; e < txt.length; e++){
        if(txt.substr(e,1) == '<'){
            if(txt.substr(e,6).toUpperCase() == '<NOUN>'){
                if(noun >= mltemplate.numnouns){
                    console.log('Unexpected Error: Not enough Nouns.')
                } else{
                    txt = txt.substr(0,e).concat(nouns[noun], txt.substr(e+6));
                    noun++;
                }
            } else if(txt.substr(e,6).toUpperCase() == '<VERB>'){
                if(verb >= mltemplate.numverbs){
                    console.log('Unexpected Error: Not enough Verbs.')
                } else{
                    txt = txt.substr(0,e).concat(verbs[verb], txt.substr(e+6));
                    verb++;
                }
            } else if(txt.substr(e,11).toUpperCase() == '<ADJECTIVE>'){
                if(adjective >= mltemplate.numadjectives){
                    console.log('Unexpected Error: Not enough Adjectives.')
                } else{
                    txt = txt.substr(0,e).concat(adjectives[adjective], txt.substr(e+11));
                    adjective++;
                }
            } else if(txt.substr(e,7).toUpperCase() == '<EXTRA '){
                for(eend = e; txt.substr(eend,1) != '>'; eend++){};

                if(extra >= mltemplate.extras.length){
                    console.log('Unexpected Error: Not enough Extra Inputs.')
                } else{
                    txt = txt.substr(0,e).concat(extrainputs[extra], txt.substr(eend + 1));
                    extra++;
                }
            }
        }
    }
    return txt;
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

function getextras(num){
    for(let i = 0; i < num; i++){
        userinput = prompt(`Please enter a ${mltemplate.extras[i]}: `);
        if(!userinput || userinput == '' || userinput.substring(0,1) == ' '){
            console.log(`Please enter a valid ${mltemplate.extras[i]}: `)
            i--;
        } else extrainputs.push(userinput);
    }
}

newgame();