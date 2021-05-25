var size = 450;
var trans = 0.6;
var file = txttoarray(readFile("vocab.csv"));

for (var l=0; l<file.length; l++){
    var word = document.createElement("DIV");
    word.className = "word";
    word.id = "word" + String(l);
    word.onclick = "changeview('"+word.id+"')";
    for (var i=0; i<file[l].length; i++){
        var element = document.createElement("DIV");
        element.innerHTML = file[l][i];    
        if (i>0) element.className = "boxelements"                
        word.appendChild(element);                               
    }
    document.getElementById("list").appendChild(word);
}

function txttoarray(txt){
    var temp = '';
    var line = [];
    var result = [];
    var chr = '';
    for (var i=0; i<txt.length; i++){
        chr = txt.charAt(i);
        if (chr == ','){
            line.push(temp);
            temp = '';
        }else if (chr == '\n'){
            line.push(temp);
            temp = '';
            result.push(line);
            line = [];
        }else{
            temp += chr;
        }
    }
    line.push(temp);
    result.push(line);
    return result;
}

function readFile(file){
    var f = new XMLHttpRequest();
    var res = '';
    f.open("GET", file, false);
    f.onload = function (){
        res=f.responseText;
    }
    f.send(null);
    return res;
}

function display(){
    
}

function updateview(){
    document.documentElement.style.setProperty('--size',String(size) +'px');
    document.documentElement.style.setProperty('--fsize',String(size/10) +'px');
    document.documentElement.style.setProperty('--trans',String(trans));
    
    if (document.getElementById('mode').innerHTML == 'Mode: List'){
        document.documentElement.style.setProperty('--boxorline',String(size/15*2) +'px');
    }else{
        document.documentElement.style.setProperty('--boxorline',String(size) +'px');
    }
}

function changeview(id){
    word = document.getElementById(id);

}

document.getElementById('mode').onclick = function(){
    if (document.getElementById('mode').innerHTML == 'Mode: Box'){
        document.getElementsByClassName('')
        document.getElementById('mode').innerHTML = 'Mode: List';
    }else{
        document.documentElement.style.setProperty('--boxorlineele','block');
        document.getElementById('mode').innerHTML = 'Mode: Box';
    }
    updateview()
}

document.getElementById('volume').onchange = function() {
    size = this.value;
    updateview()
}

document.getElementById('trans').onchange = function() {
    trans = this.value / 100;
    updateview()
}