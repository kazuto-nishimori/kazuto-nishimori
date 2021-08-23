var ABCJS = require('abcjs');
var synth = new ABCJS.synth.CreateSynth();
var abcjsEditor;
var visualObj
let notedur = 2000;
let notes = ['E,','F,','G,','A','B','C','D','E','F','G','a','b','c','d','e','f','g',"a'","b'","c'","d'","e'"]
notes = notes.slice(0,10)
let randomNums = Array.from({length: 1000}, () => Math.floor(Math.random() * notes.length)).join('');
randomNums = randomNums.replace(/(\d)\1+/g,function(m,c){return c}).split('')

function enharmonic(L,A,M,not) {
  document.getElementById('message').innerText = not == 1 ? '' : 'Showing the enharmonic '+L+A+M;
  return [L,A,M]
}
/*
function thisnote(i){
  let note = notes[parseInt(randomNums[i])];
  let accOnNote = ['^','_',''][Math.floor(Math.random()*3)];
  let noteName = note.substring(0,1).toUpperCase();
  let sig = [document.getElementById('key').value,document.getElementById('acc').value,document.getElementById('majmin').value]
  sig = sig.join('') == 'B#maj' ? enharmonic('C', '', 'maj') : // B#maj, E#maj, A#maj, D#maj, G#maj, Dbmin, Gbmin, Cbmin, Fbmin
  sig.join('') == 'E#maj' ? enharmonic('F', 'b', 'maj') :
  sig.join('') == 'A#maj' ? enharmonic('B', 'b', 'maj') :
  sig.join('') == 'D#maj' ? enharmonic('E', 'b', 'maj') :
  sig.join('') == 'G#maj' ? enharmonic('A', 'b', 'maj') :
  sig.join('') == 'Dbmin' ? enharmonic('C', '#', 'min') :
  sig.join('') == 'Gbmin' ? enharmonic('F', '#', 'min') :
  sig.join('') == 'Cbmin' ? enharmonic('B', '', 'min') :
  sig.join('') == 'Fbmin' ? enharmonic('E', '', 'min') : enharmonic(sig[0],sig[1],sig[2],1)

  let accArray = ['F','C','G','D','A','E','B']
  let keyNum = accArray.indexOf(sig[0]) - 1;
  keyNum += sig[1] == '#' ? 7 : sig[1] == 'b' ? -7 : 0;
  keyNum -= sig[2] == 'min' ? 3 : 0

  let alreadyMarked = keyNum > 1 ? accArray.slice(0,keyNum) : accArray.slice(7+keyNum)
  if (alreadyMarked.indexOf(noteName) != -1) {
     note = accOnNote == '^' && keyNum > 1 ? note : accOnNote == '' && keyNum > 1 ? '=' + note : accOnNote == '_' && keyNum > 1 ? '_' + note :
     accOnNote == '_' && keyNum < 1 ? note : accOnNote == '' && keyNum < 1 ? '=' + note : accOnNote == '^' && keyNum < 1 ? '^' + note :
     accOnNote + note
  } else {
    note = accOnNote + note
  }
  let frontEndAcc = accOnNote == '^' ? '#' : accOnNote == '_' ? 'b' : ''
  document.getElementById('note').innerText = noteName + frontEndAcc

  return "X:1\nK:"+sig.join('')+"\nV:V1 clef=bass\n[V:V1]||"+note+",4|\n";
}
*/

function thisnote(i){
  let note = notes[parseInt(randomNums[i])];
  let noteName = note.substring(0,1).toUpperCase();
  var frontEndAcc

  let sig = [document.getElementById('key').value,document.getElementById('acc').value,document.getElementById('majmin').value]
  sig = sig.join('') == 'B#maj' ? enharmonic('C', '', 'maj') : // B#maj, E#maj, A#maj, D#maj, G#maj, Dbmin, Gbmin, Cbmin, Fbmin
  sig.join('') == 'E#maj' ? enharmonic('F', 'b', 'maj') :
  sig.join('') == 'A#maj' ? enharmonic('B', 'b', 'maj') :
  sig.join('') == 'D#maj' ? enharmonic('E', 'b', 'maj') :
  sig.join('') == 'G#maj' ? enharmonic('A', 'b', 'maj') :
  sig.join('') == 'Dbmin' ? enharmonic('C', '#', 'min') :
  sig.join('') == 'Gbmin' ? enharmonic('F', '#', 'min') :
  sig.join('') == 'Cbmin' ? enharmonic('B', '', 'min') :
  sig.join('') == 'Fbmin' ? enharmonic('E', '', 'min') : enharmonic(sig[0],sig[1],sig[2],1)

  let accArray = ['F','C','G','D','A','E','B']
  let keyNum = accArray.indexOf(sig[0]) - 1;
  keyNum += sig[1] == '#' ? 7 : sig[1] == 'b' ? -7 : 0;
  keyNum -= sig[2] == 'min' ? 3 : 0

  let accOnNote = [1,-1,0,0,0,0,0,0][Math.floor(Math.random()*8)];

  let alreadyMarked = keyNum > 0 ? accArray.slice(0,keyNum) : keyNum > 0 ? accArray.slice(7+keyNum) : []
  let sharpOrFlat = alreadyMarked.indexOf(noteName)

  if (sharpOrFlat == -1) { // this note has no sharp or flat
    note = accOnNote == 1 ? '^' + note : accOnNote == -1 ? '_' + note : note
    frontEndAcc = accOnNote == 1 ? '#' : accOnNote == -1 ? 'b' : ''
  } else {
    if (keyNum > 0) { //this key has sharps
      note = accOnNote == -1 ? '=' + note : note
      frontEndAcc = accOnNote == -1 ? ''  : '#'
    } else if (keyNum < 0) {
      note = accOnNote == +1 ? '=' + note : note
      frontEndAcc = accOnNote == +1 ? ''  : 'b'
    }
  }

  document.getElementById('note').innerText = noteName + frontEndAcc

  return "X:1\nK:"+sig.join('')+"\nV:V1 clef=bass\n[V:V1]||"+note+",4|\n";
}

window.onload = function () {
  let i = 1
  document.getElementById('main').addEventListener('click', event => {
    i++
    visualObj = ABCJS.renderAbc("paper", thisnote(i),{scale:5})
    document.getElementById('note').style.visibility = 'hidden'
  });
  visualObj = ABCJS.renderAbc("paper", thisnote(i),{scale:5});
  document.addEventListener('keypress',  playsound);
  document.getElementById('playbutton').addEventListener('click',playsound);
  function playsound() {
    document.getElementById('note').style.visibility = 'visible'
    var myContext = new AudioContext();
    synth.init({
      audioContext: myContext,
      visualObj: visualObj[0],
      millisecondsPerMeasure:notedur,
      options: {
          //soundFontUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/"
      }

    }).then(function (results) {
        console.log('Ready to play. The results are details about what was loaded.')
        synth.prime()
        synth.start()
    }).catch(function (reason) {
        console.log(reason)
    });
  };
};
