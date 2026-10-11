(function(){
var box=document.querySelector('.share'); if(!box) return;
var canon=document.querySelector('link[rel=canonical]');
var url=canon?canon.href:location.href.split('#')[0];
var title=box.dataset.title, lines=box.dataset.lines, by=box.dataset.by;
var text='“'+title+'”\n'+(lines?lines+'\n':'')+'— '+by+'\n\n'+box.dataset.read+': '+url;
var wa=box.querySelector('.wa'), cp=box.querySelector('.cp'), file=null;
wa.href='https://wa.me/?text='+encodeURIComponent(text);
// on phones, get the poem image ready so it can be sent as a picture
if(navigator.canShare&&box.dataset.img){
  fetch(box.dataset.img).then(function(r){return r.blob()}).then(function(b){
    var f=new File([b],'kavita.jpg',{type:'image/jpeg'});
    if(navigator.canShare({files:[f]})) file=f;
  }).catch(function(){});
}
wa.addEventListener('click',function(e){
  if(!file) return;            // desktop and older phones: open WhatsApp with the text and link
  e.preventDefault();
  navigator.share({files:[file],text:text}).catch(function(err){
    if(err&&err.name!=='AbortError') window.open(wa.href,'_blank','noopener');
  });
});
cp.addEventListener('click',function(){
  var label=cp.querySelector('span');
  function done(){label.textContent=box.dataset.copied;setTimeout(function(){label.textContent=box.dataset.copy},2200)}
  function fallback(){var t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();
    try{document.execCommand('copy');done()}catch(e){}document.body.removeChild(t)}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done,fallback)}else{fallback()}
});
})();
