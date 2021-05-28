var size = 450;
var trans = 0.6;
var file = txttoarray(readFile("vocab.csv"));
var listsz = String(size/15*2) +'px';
var boxsz = String(size) +'px';
var words = document.getElementsByClassName('word');
var boxelements = document.getElementsByClassName('boxelements');
var boxstate = [];
var filtermode = 0;
var filters = [];
var menu = document.getElementById('popupmenue');

for (var l=0; l<file.length; l++){
    var word = document.createElement("DIV");
    var classes = 'word';
    var identifier = file[l][file[l].length-1].split(' ');
    var searchid = '';
    word.id = "word" + String(l);
    word.setAttribute('onclick', "changeview('"+String(l)+"')");
    for (var i=0; i<file[l].length-1; i++){
        var element = document.createElement("DIV");
        element.innerHTML = file[l][i];    
        if (i > 0) element.className = "boxelements";
        if (i == 0 || i == 3) searchid+=file[l][i].toLowerCase();
        word.appendChild(element);                               
    }
    for (var i=0; i<identifier.length; i++){
        if (identifier[i] == 'SM') classes += ' SocialMedia';
        else if (identifier[i] == 'B') classes += ' Behaviour';
        else if (identifier[i] == 'I') classes += ' Important';
        else if (identifier[i] == 'E') classes += ' Economy';
        else if (identifier[i] == 'S') classes += ' Society';
        else if (identifier[i] == 'T') classes += ' Technology';
        else if (identifier[i] == 'C') classes += ' Connector';
        else if (identifier[i] == 'A') classes += ' Adjective';
        else if (identifier[i] == 'M') classes += ' Misc';
        else if (identifier[i] == 'N') classes += ' Nouns';
        else if (identifier[i] == 'EV') classes += ' Environment';
        else classes += ' Action';
    }
    word.className = classes;
    word.setAttribute('searchid', searchid);
    boxstate.push(0);
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


function updateview(){
    document.documentElement.style.setProperty('--size',String(size) +'px');
    document.documentElement.style.setProperty('--fsize',String(size/10) +'px');
    document.documentElement.style.setProperty('--trans',String(trans));
    
    listsz = String(size/15*2) +'px';
    boxsz = String(size) +'px';

    for (var i=0; i < words.length; i++){
        if (boxstate[i] == 0) words[i].style.height = boxsz;
        else words[i].style.height = listsz;
    }
}

function changeview(id){
    word = document.getElementById("word" + id);
    style = getComputedStyle(word);
    wordboxelements = word.getElementsByClassName('boxelements');
    
    if (style.height == boxsz){
        boxstate[parseInt(id)] = 1;
        word.style.height = listsz;
        for (var i=0; i < wordboxelements.length; i++) wordboxelements[i].style.display = 'none';
    }else{
        boxstate[parseInt(id)] = 0;
        word.style.height = boxsz;
        for (var i=0; i < wordboxelements.length; i++) wordboxelements[i].style.display = 'block';
    }
}

function mode(){
    if (document.getElementById('mode').innerHTML == 'Mode: Box'){
        for (var i=0; i < boxelements.length; i++) boxelements[i].style.display = 'none';
        document.getElementById('mode').innerHTML = 'Mode: List';
        boxstate = new Array(boxstate.length).fill(1);
    }else{
        for (var i=0; i < boxelements.length; i++) boxelements[i].style.display = 'block';
        document.getElementById('mode').innerHTML = 'Mode: Box';
        boxstate = new Array(boxstate.length).fill(0);
    }
    updateview();
}

document.getElementById('zoom').onchange = function() {
    size = this.value;
    updateview();
}

document.getElementById('trans').onchange = function() {
    trans = this.value / 100;
    updateview();
}

document.getElementById('searchbar').onchange = updatesearch;

function showmenu(){
    menu.style.display = 'block';
}

window.onclick = function(event){
    var clicked = document.getElementById(event.target.id);
    if(clicked == menu) menu.style.display = 'none';
    else if (clicked.className == 'filters'){
        if (window.getComputedStyle(clicked).backgroundColor == 'rgb(128, 128, 128)'){
            filters = filters.filter(e => e !== clicked.id);
            clicked.style.backgroundColor = 'rgb(255, 255, 255)';
        }else{
            filters.push(clicked.id);
            clicked.style.backgroundColor = 'rgb(128, 128, 128)';
            console.log(window.getComputedStyle(clicked).backgroundColor);
        }
        updatesearch()
    }
}

document.getElementById('SocialMedia').style.backgroundColor


function changefiltermode(){
    if (document.getElementById('filtermode').innerHTML == 'Filter by All'){
        document.getElementById('filtermode').innerHTML = 'Filter by Any';
        filtermode = 1;
    }else{
        document.getElementById('filtermode').innerHTML = 'Filter by All';
        filtermode = 0;
    }
    updatesearch();
}

function updatesearch(){
    var search = document.getElementById('searchbar').value.toLowerCase();

    for (var i=0; i < words.length; i++) words[i].style.display = 'block';
    if (search != ''){
        for (var i=0; i < words.length; i++){
            if (!words[i].getAttribute('searchid').includes(search)) words[i].style.display = 'none';
            else words[i].style.display = 'block';
        }
    }
    if (filters.length != 0){
        if (filtermode == 0){
            for (var f=0; f < filters.length; f++){
                for (var i=0; i < words.length; i++){
                    if (!words[i].classList.contains(filters[f])) words[i].style.display = 'none';
                }
            }
        }else{
            for (var i=0; i < words.length; i++){
                words[i].style.display = 'none';
                for (var f=0; f < filters.length; f++){
                    if (words[i].classList.contains(filters[f])) words[i].style.display = 'block';
                }
            }
        }
    }
}