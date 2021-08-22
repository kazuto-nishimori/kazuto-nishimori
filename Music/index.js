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
  if (not == 1) {
    document.getElementById('message').innerText = '';
    //console.log(L+A+M)
    return [L,A,M]
  } else {
    document.getElementById('message').innerText = 'Showing the enharmonic '+L+A+M;
    //console.log('Showing the enharmonic '+L+A+M)
    return [L,A,M]
  }
}

function keysig(note,accOnNote){
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

  return [sig.join(''), note]
}

function thisnote(i) {
  let note = notes[parseInt(randomNums[i])];
  let accidental = ['^','_','','','','','',''][Math.floor(Math.random()*8)];
  let modified = keysig(note,accidental)
  let abc = "X:1\nK:"+modified[0]+"\nV:V1 clef=bass\n[V:V1]||"+modified[1]+",4|\n";
  //let abc = "X:1\nK:"+"BbMaj"+"\nV:V1 clef=bass\n[V:V1]||"+"B,=C=D_E=F=G=A^B"+"4|\n"; //_a_b_c_d_e_f_g^a^b^c^d^e^f^g=a=b=c=d=e=f=g
  return abc
}

window.onload = function () {
  let i = 1
  document.getElementById('main').addEventListener('click', event => {
    i++
    visualObj = ABCJS.renderAbc("paper", thisnote(i),{scale:5})
  });
  visualObj = ABCJS.renderAbc("paper", thisnote(i),{scale:5});
  document.addEventListener('keypress',  playsound);
  function playsound() {
    var myContext = new AudioContext();
    synth.init({
      audioContext: myContext,
      visualObj: visualObj[0],
      millisecondsPerMeasure:notedur,
      options: {
          soundFontUrl: "bass.sf2"
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
