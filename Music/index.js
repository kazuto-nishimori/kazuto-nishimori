var ABCJS = require('abcjs');
var synth = new ABCJS.synth.CreateSynth();
var abcjsEditor;
var visualObj
let notedur = 1000;

function enharmonic(L,A,M,not) {
  document.getElementById('message').innerText = not == 1 ? '' : 'Showing the enharmonic '+L+A+M;
  return [L,A,M]
}

function thisnote(numberOfNotes){
  let notes = ['E,,','F,,','G,,','A,,','B,,','C,','D,','E,','F,','G,','A,','B,','C','D','E','F','G',"A","B","c","d"]
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

  let notesToPlay = ''
  let notesToShow = ''
  let lownote = parseInt(document.getElementById('lowNote').value)
  notes = notes.slice(lownote,lownote + 8)
  console.log(notes)
  for (let n = 0; n < numberOfNotes; n++) {
    let accOnNote = [1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][Math.floor(Math.random()*8)];
    let note = notes[parseInt(Math.floor(Math.random() * notes.length))];
    let noteName = note.substring(0,1).toUpperCase();
    var frontEndAcc
    let alreadyMarked = keyNum > 0 ? accArray.slice(0,keyNum) : keyNum < 0 ? accArray.slice(7+keyNum) : []
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
        if (keyNum < -1 && note == 'E,,') {
          note = '=E,,'
          frontEndAcc = ''
        }
      }
    }
    notesToPlay = notesToPlay + note + '4|'
    notesToShow = notesToShow + ' ' + noteName + frontEndAcc
  }

  document.getElementById('note').innerText = notesToShow.trim()
  console.log(notesToPlay.trim())

  return "X:1\nK:"+sig.join('')+"\nV:V1 clef=bass\n[V:V1]||"+notesToPlay.trim()+"\n";
}

window.onload = function () {
  let i = 1
  document.getElementById('main').addEventListener('click', event => {
    i++
    visualObj = ABCJS.renderAbc("paper", thisnote(parseInt(document.getElementById('numNotes').value)),{scale:5,add_classes:true})
    document.getElementById('note').style.visibility = 'hidden'
    let bars = document.querySelector("#paper").querySelectorAll(".abcjs-bar")
    for (let i = 1; i < bars.length-1; i++) {
      bars[i].style.opacity = 0.3
    }
  });
  visualObj = ABCJS.renderAbc("paper", thisnote(parseInt(document.getElementById('numNotes').value)),{scale:5,add_classes:true});
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
