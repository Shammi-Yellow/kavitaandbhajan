(function(){
var L=document.documentElement.lang==='en'?'en':'hi';
var S={hi:{found:' रचनाएँ मिलीं',none:'कोई रचना नहीं मिली। कोई दूसरा शब्द आज़माएँ।',recent:'हाल की रचनाएँ'},
       en:{found:' posts found',none:'No posts found. Try another word.',recent:'Recent posts'}}[L];
var q=document.getElementById('q'),res=document.getElementById('res'),n=document.getElementById('n'),D=null;
var DEV='०१२३४५६७८९';function num(x){return L==='hi'?String(x).replace(/[0-9]/g,function(c){return DEV[c]}):String(x)}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function norm(s){return s.toLowerCase().normalize('NFC')}
function render(){
  if(!D)return;var t=norm(q.value.trim());
  try{history.replaceState(null,'',t?'?q='+encodeURIComponent(q.value.trim()):location.pathname)}catch(e){}
  var words=t.split(/\s+/).filter(Boolean),out=[];
  for(var i=0;i<D.length;i++){var d=D[i];if(words.every(function(w){return d.k.indexOf(w)>-1}))out.push(d);if(out.length>=120)break}
  if(!words.length)out=D.slice(0,24);
  n.textContent=words.length?(out.length?num(out.length)+(out.length>=120?'+':'')+S.found:S.none):S.recent;
  res.innerHTML=out.map(function(d){
    var pic=d.c?'<img src="'+d.c+'" alt="" loading="lazy" width="480" height="600">':'<span class="noimg" lang="hi">'+esc(d.t)+'</span>';
    return '<a class="card" href="'+d.u+'"><span class="mat">'+pic+'</span>'+(d.g?'':'<span class="ct" lang="hi">'+esc(d.t)+'</span>')
      +'<span class="cm"><span class="cs">'+esc(d.s)+'</span><time>'+esc(d.d)+'</time></span></a>'}).join('');
}
fetch('search.json').then(function(r){return r.json()}).then(function(j){D=j;
  var m=/[?&]q=([^&]*)/.exec(location.search);if(m)q.value=decodeURIComponent(m[1]);render()});
q.addEventListener('input',render);
})();
