const hair_attributes = require('../data/hair_attributes.json');
const haircuts = require('../data/hair_cuts.json');
const variants = require('../data/variants.json');

let startlist = ["hii", "hello", "hey", "hi", "hei", "heya", "hey there", "yo", "hiya", "start"]
let clientViewsList = ["Yes", "YEAH", "yes"]

let answer = ""
let lastFunc = "None"
const funcList = []
const clientInputs = {
    faceType: "",
    hairLength: "",
    hairStyle: "",
    hairBang: "",
    hairLayers: ""
}

let awaitanswer = false

function randomAnswer(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}



function faceTypefunc(){
    answer = answer + "Here's a list of FaceTypes.\nPlease choose the one which fits you best:"
    answer = answer + hair_attributes.face_shape
    lastFunc = "faceTypefunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function hairLengthfunc(){
    answer = randomAnswer(variants.selHairLength)
    answer = answer + "\nPlease choose your preffered Hair Length:"
    answer = answer + hair_attributes.hair_length
    lastFunc = "hairLengthfunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function hairStylefunc(){
    answer = randomAnswer(variants.selHairStyle)
    answer = answer + "\nHere's differnt Hair Styles for you:"
    answer = answer + hair_attributes.hair_style
    lastFunc = "hairStylefunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function hairBangfunc(){
    answer = randomAnswer(variants.selHairBang)
    answer = answer + "How do you like your hair bang?"
    answer = answer + hair_attributes.hair_bang
    lastFunc = "hairBangfunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function hairLayersfunc(){
    answer = randomAnswer(variants.selHairLayer)
    answer = answer + "Do you prefer hair layers or not?"
    answer = answer + hair_attributes.hair_layers
    lastFunc = "hairLayersfunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function toRecommendHairCut(data, clientInput, start, end) {
    let matchedFace;
    let matchedHairCut;
    let recommendHairCut;
    keysIndata = Object.keys(data);
    for (key in keysIndata){
      if(keysIndata[key] === clientInput.faceType){
        matchedFace = keysIndata[key]
        matchedHairCut = data[matchedFace];
        Object.entries(matchedHairCut).map((val)=>{
          recommendHairCut = Object.keys(val[1]).slice(start, end);
          console.log("Rec", recommendHairCut);
          return recommendHairCut;
        });
      }
    }
    return recommendHairCut;
}

function recommendHairfunc(){
    console.log("Clients Input", clientInputs)
    clientInputs.faceType = clientInputs.faceType ? clientInputs.faceType : randomAnswer(hair_attributes.face_shape);
    answer = "Based on your input We found more than 3 matches for you: " + toRecommendHairCut(haircuts, clientInputs, 0, 2) + " .Would you like to see more?";
    lastFunc = "recommendfunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer;
}


function clientViews(input){
    console.log("FOr client views", input);
    if(input && clientViewsList.includes(input)){
        answer = toRecommendHairCut(haircuts, clientInputs, 3, 5) + " \nThat's it, we hope you found our recommendation helpful. \nType 'start' to try again or 'help' for a quick guide";
    }else {
        answer = "That's it, we hope you found our recommendation helpful. \nType 'start' to try again or 'help' for a quick guide"
    } 
    lastFunc = "clientviewsfunc"
    funcList.push(lastFunc)
    awaitanswer = true
    return answer
}

function rating(input){
    lastFunc = "rating"
    funcList.push(lastFunc)
    awaitanswer = true
    if(input === 'help' || input === 'Help'){
        return help("None")
    }else if(input === 'start' || input === 'Start'){
        console.log("CLEAR CHAT")
        return clearChat()
    }else{
        answer = "Thanks for your time, please recommend 'LOYA Salone' to your friends"
    }

    return answer;
}

function help(func){
    switch (func){
        case "None":
            answer = "Follow and type-in options given from the prompts, \nwe will then keep record of your preferences and \nthereby recommend the best hairstyle. \n ";
            faceTypefunc();
            return answer;

        case "faceTypefunc":
            answer = "\nChoose one of the facetypes that describe your face! \n" + hair_attributes.face_shape
            lastFunc = 'faceTypefunc'
            funcList.push(lastFunc)
            return answer
    
        case "hairLengthfunc":
            answer = "\nHere is a quick Guide for you to help you choose your Hair Length! \n" + hair_attributes.hair_length
            lastFunc = "hairLengthfunc"
            funcList.push(lastFunc)
            return answer;
    
        case "hairStylefunc":
            answer = answer + "\nHere is an easy Guide for different Hair Styles! \n" + hair_attributes.hair_style
            lastFunc = "hairStylefunc"
            funcList.push(lastFunc)
            return answer;
    
        case "hairBangfunc":
            answer = answer + "\nFrom the Different Hair Bangs, do you want one? \n" + hair_attributes.hair_bang
            lastFunc = "hairBangfunc"
            funcList.push(lastFunc)
            return answer;
        
        case "hairLayersfunc":
            answer = "\nThis can be layered or non-layered, select one! \n" + hair_attributes.hair_layers
            lastFunc = "hairLayersfunc"
            funcList.push(lastFunc)
            return answer;
        default:
            break;
    }
    return answer;
}

function generateResponses(input){
    return (!input) ? "No valid input" : getanswer(input);
}

function getanswer(data){
    if (data && startlist.includes(data)){
        answer = randomAnswer(variants.startMsg)
        answer = answer + randomAnswer(variants.selFaceType)
        faceTypefunc();
        return answer;
    }else {
        answer = "I didn't quite understand that! Can you please rephrase it?";
    }

    function checkFromVariant(variant, input, func){
        for(let i=0; i<variant.length; i++){
            if(variant[i].includes(input)){
                switch (func) {
                    case "facetype":
                        faceType = input;
                        clientInputs.faceType = input;
                        break;
                    case "hairlength":
                        hairLength = input;
                        clientInputs.hairLength = input;
                        break;
                    case "hairstyle":
                        hairStyle = input;
                        clientInputs.hairStyle = input;
                        break;

                    case "hairbang":
                        hairBang = input;
                        clientInputs.hairBang = input;
                        break;

                    case "hairlayers":
                        hairLayers = input;
                        clientInputs.hairLayers = input;
                        break;
                
                    case "hairstyle":
                        hairStyle = input;
                        clientInputs.hairLength = input;
                        break;
                    default:
                        break;
                }
                console.log("Clients Input", clientInputs);
                return input;
            }
        }
        return;
    }

    if (awaitanswer){
        switch(lastFunc){
            case "faceTypefunc":
                if(data === 'help'){
                    return help("faceTypefunc")
                }else {
                    let facetypesVariants = [variants.Oval, variants.Heart, variants.Diamond, variants.Round, variants.Square];
                    const facetypeFromVar = checkFromVariant(facetypesVariants, data, "facetype");
                    if(!facetypeFromVar){
                        answer = "I didn't quite understand that! Can you please rephrase it? type 'help' for help";
                        return answer;
                    }
                }
                break;

            case "hairLengthfunc":
                if(data === 'help'){
                    return help("hairLengthfunc")
                }else {
                    let hairlengthVariants = [variants.Long, variants.Mid, variants.Short, variants.Pixie, variants.Square];
                    const hairlengthFromVar = checkFromVariant(hairlengthVariants, data, "hairlength");
                    if(!hairlengthFromVar){
                        answer = "I didn't quite understand that! Can you please rephrase it? type 'help' for help";
                        return answer;
                    }
                }
                break;

            case "hairStylefunc":
                if(data === 'help'){
                    return help("hairStylefunc")
                }else {
                    let hairstyleVariants = [variants.Wavy, variants.Straight, variants.Curly];
                    const hairstyleFromVar = checkFromVariant(hairstyleVariants, data, "hairstyle");
                    if(!hairstyleFromVar){
                        answer = "I didn't quite understand that! Can you please rephrase it? type 'help' for help";
                        return answer;
                    }
                }
                break;

            case "hairBangfunc":
                if(data === 'help'){
                    return help("hairBangfunc")
                }else {
                    let hairbangVariants = [variants.Sideswept, variants.Blunt, variants.Centerswept, variants.Deepswept, variants.None];
                    const hairbangFromVar = checkFromVariant(hairbangVariants, data, "hairbang");
                    if(!hairbangFromVar){
                        answer = "I didn't quite understand that! Can you please rephrase it? type 'help' for help";
                        return answer;
                    }
                }
                break;
            
            case "hairLayersfunc":
                if(data === 'help'){
                    return help("hairLayersfunc")
                }else {
                    let hairlayersVariants = [variants.NonLayered, variants.Layered];
                    const hairlayersFromVar = checkFromVariant(hairlayersVariants, data, "hairlayers");
                    if(!hairlayersFromVar){
                        answer = "I didn't quite understand that! Can you please rephrase it? type 'help' for help";
                        return answer;
                    }
                }
                break;
            default:
                break;
        }
    }

    switch (lastFunc){
        case "faceTypefunc":
            hairLengthfunc();
            return answer;

        case "hairLengthfunc":
            hairStylefunc();
            return answer;

        case "hairStylefunc":
            hairBangfunc();
            return answer;

        case "hairBangfunc":
            hairLayersfunc();
            return answer;
        
        case "hairLayersfunc":
            recommendHairfunc();
            return answer;

        case "recommendfunc":
            clientViews(data);
            return answer;

        case "clientviewsfunc":
            rating(data);
            return answer;
        default:
            answer = "I didn't quite catch you there! Can you please rephrase it?";
            break;
    }
    
    return answer;
}


module.exports = {generateResponses};