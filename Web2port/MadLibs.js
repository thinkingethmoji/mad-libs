// MadLibs generator by ThinkingEmoji

// Format <NOUN> <VERB> <ADJECTIVE> <EXTRA xyz> decoded and replaced as respective inputs.
var gametext = ['There was once a boy named <EXTRA Name>. He was a <ADJECTIVE> fan of <NOUN> and loved to <VERB> <NOUN>s. One day he decided to go to <EXTRA Location> so that he could <VERB> <NOUN>s. That was a very <ADJECTIVE> day!',
'So I was going 60mph on a <EXTRA Vehicle> when a <NOUN> fell off. So how many <ADJECTIVE> <NOUN>s does it take to fill a <EXTRA Animal> house? <ADJECTIVE>, because I <VERB> my <NOUN> to <EXTRA Location> today!',
`<EXTRA Name> was a clever thief. He robbed the rich and gave all to the <ADJECTIVE> and the <ADJECTIVE>. The other thieves were jealous of him. They planned to get rid of him. They challenged him to steal the King’s <NOUN>.<br><br>

He charted out a plan to steal from the King. He prepared himself mentally to carry out this plan.<br><br>

At the King’s Palace. He found the King <VERB>ing. He opened a bottle of <ADJECTIVE> <EXTRA Insect> on the bed. The King was badly bitten and cried for help! The servants rushed in. In the confusion Deven removed the King’s <EXTRA Kingly object> and escaped. Other thieves were dumbfounded!`,
`What are YOU doing here, <EXTRA Name>? You think I don't see you there, <VERB>ing like its your last day on this <ADJECTIVE> forsaken world?<br><br>

You cannot fool us. We have the <EXTRA Amazing object>. We are guarded by <ADJECTIVE> <NOUN>s who are not afraid to <VERB>. This is your last chance to <VERB>. If you refuse, we are going to put a <NOUN> in your <EXTRA A Containter> and leave you to your fate.`];
var gameselect = -1;

var mltemplate = {
    numnouns: 0,
    numverbs: 0,
    numadjectives: 0,
    extras: [],
    text: ''
}

// Load default game mode
mltemplate.text = gametext[0];

// Input flag instructs function what stage of the game to increment.
function newgame(inpf){
    if(inpf == 0){ // Initialize new game. Function is recursive, so values must be reset.
        var nouns = [];
        var verbs = [];
        var adjectives = [];
        var extrainputs = [];
        var inputarray = [];

        mltemplate.numnouns = 0;
        mltemplate.numverbs = 0;
        mltemplate.numadjectives = 0;
        mltemplate.extras = [];

        gameselect = parseInt(document.getElementById('setscript').value, 10);
        if(gameselect >= 0 && gameselect < gametext.length){
            mltemplate.text = gametext[gameselect];
        }

        document.getElementById('touser').innerHTML = 'Hello! Welcome to the MadLibs generator game by ThinkingEmoji! To get started, please provide some words for the game.';
        decodetext(mltemplate.text);
        getnouns(mltemplate.numnouns);
    } else if(inpf == 1){
        getverbs(mltemplate.numverbs);
    } else if(inpf == 2){
        getadjectives(mltemplate.numadjectives);
    } else if(inpf == 3){
        getextras(mltemplate.extras.length)
    } else if(inpf == 4){
        document.getElementById('touser').innerHTML = 'Thanks for playing! Here is your result:';
        document.getElementById('replace').innerHTML = encodetext(mltemplate.text);
    } else if(inpf == -1){
        mltemplate.text = gametext[0];
        newgame(0);
    } else{ document.getElementById('touser').innerHTML = 'Unknown error: input flag out of range.';}
}

function newscript(){
    document.getElementById('touser').innerHTML = 'You can enter a custom script here!<br><br>Keywords will be replace and encoded: Noun, Verb, Adjective and Extra xyz.<br><br>You can see how your script will be encoded by entering it into the left box and then clicking outside!';
    document.getElementById('replace').innerHTML = `<table><tr><td>Your script here:<br><textarea name="message" id="inputscript" rows="10" cols="30" onchange="savescript('demooutput')">Enter MadLibs script here</textarea></td>
    <td>>>></td><td>Game encoded output:<br><textarea name="Output" id="demooutput" rows="10" cols="30">Demo Output</textarea></td></tr><tr><td colspan="3"><input type="submit" id="sub" onclick="savescript()"></td></tr></table>`;
}

function savescript(demotarget){ // Format script for decodetext() function.
    var temp = document.getElementById('inputscript').value;
    var regex = /noun/ig;
    temp = temp.replaceAll(regex, '<NOUN>');
    regex = /verb/ig;
    temp = temp.replaceAll(regex, '<VERB>');
    regex = /adjective/ig;
    temp = temp.replaceAll(regex, '<ADJECTIVE>');
    regex = /extra/ig;
    temp = temp.replaceAll(regex, '<EXTRA');
    var x = 0;
    while(temp.indexOf('<EXTRA', x) != -1){
        x = temp.indexOf('<EXTRA', x) + 6;
        if(temp[x] != ' '){
            document.getElementById('touser').innerHTML = 'Unexpected Error: Script extra syntaxt mismatch.';
            break;
        }
        x++;
        regex = /\s|\W/i;
        temp = temp.slice(0,x-1).concat(' ', temp.slice(x).replace(regex, '>$&'));
    }
    if(demotarget === undefined && arguments.length == 0){
        mltemplate.text = temp;
        newgame(0);
    } else{
        document.getElementById(demotarget).value = temp;
    }
}

function getinput(numinputs, inputtype){
    inputarray = [];
    var tmp = '';
    for(c = 0; c < numinputs; c++){
        tmp = `inputtext${c}`;
        inputarray[c] = document.getElementById(tmp).value;
    }
    if(inputtype == 'nouns'){
        nouns = inputarray;
        newgame(1);
    } else if(inputtype == 'verbs'){
        verbs = inputarray;
        newgame(2);
    } else if(inputtype == 'adjectives'){
        adjectives = inputarray;
        newgame(3);
    } else if(inputtype == 'extrainputs'){
        extrainputs = inputarray;
        newgame(4);
    }
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
                    document.getElementById('touser').innerHTML = 'Unexpected Error: Not enough Nouns.';
                } else{
                    txt = txt.substr(0,e).concat(nouns[noun], txt.substr(e+6));
                    noun++;
                }
            } else if(txt.substr(e,6).toUpperCase() == '<VERB>'){
                if(verb >= mltemplate.numverbs){
                    document.getElementById('touser').innerHTML = 'Unexpected Error: Not enough Verbs.';
                } else{
                    txt = txt.substr(0,e).concat(verbs[verb], txt.substr(e+6));
                    verb++;
                }
            } else if(txt.substr(e,11).toUpperCase() == '<ADJECTIVE>'){
                if(adjective >= mltemplate.numadjectives){
                    document.getElementById('touser').innerHTML = 'Unexpected Error: Not enough Adjectives.';
                } else{
                    txt = txt.substr(0,e).concat(adjectives[adjective], txt.substr(e+11));
                    adjective++;
                }
            } else if(txt.substr(e,7).toUpperCase() == '<EXTRA '){
                for(eend = e; txt.substr(eend,1) != '>'; eend++){};

                if(extra >= mltemplate.extras.length){
                    document.getElementById('touser').innerHTML = 'Unexpected Error: Not enough Extra Inputs.';
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
    if(num > 0){
        if(num == 1){document.getElementById('touser').innerHTML = `Please enter ${num} Noun. `;}
        else document.getElementById('touser').innerHTML = `Please enter ${num} Nouns. `;
        var tempstr = '';

        for(let i = 0; i < num; i++){
            tempstr = tempstr.concat('',`<input type="text" id="inputtext${i}"><br>`);
        }
        tempstr = tempstr.concat('',`<input type="submit" id="sub" onclick="getinput(${num}, 'nouns')">`);
        document.getElementById('replace').innerHTML = tempstr;
    } else newgame(1);
}

function getverbs(num){
    if(num > 0){
        if(num == 1){document.getElementById('touser').innerHTML = `Please enter ${num} Verb. `;}
        else document.getElementById('touser').innerHTML = `Please enter ${num} Verbs. `;
        var tempstr = '';

        for(let i = 0; i < num; i++){
            tempstr = tempstr.concat('',`<input type="text" id="inputtext${i}"><br>`);
        }
        tempstr = tempstr.concat('',`<input type="submit" id="sub" onclick="getinput(${num}, 'verbs')">`);
        document.getElementById('replace').innerHTML = tempstr;
    } else newgame(2);
}

function getadjectives(num){
    if(num > 0){
        if(num == 1){document.getElementById('touser').innerHTML = `Please enter ${num} Adjective. `;}
        else document.getElementById('touser').innerHTML = `Please enter ${num} Adjectives. `;
        var tempstr = '';

        for(let i = 0; i < num; i++){
            tempstr = tempstr.concat('',`<input type="text" id="inputtext${i}"><br>`);
        }
        tempstr = tempstr.concat('',`<input type="submit" id="sub" onclick="getinput(${num}, 'adjectives')">`);
        document.getElementById('replace').innerHTML = tempstr;
    } else newgame(3);
}

function getextras(num){
    if(num > 0){
        document.getElementById('touser').innerHTML = `Please enter the following: `;
        var tempstr = '';

        for(let i = 0; i < num; i++){
           tempstr = tempstr.concat('',`${mltemplate.extras[i]} <input type="text" id="inputtext${i}"><br>`);
        }
        tempstr = tempstr.concat('',`<input type="submit" id="sub" onclick="getinput(${num}, 'extrainputs')">`);
        document.getElementById('replace').innerHTML = tempstr;
    } else newgame(4);
}