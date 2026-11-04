(function(){
var R=document.getElementById('altyazi-adim');
if(!R)return;
var IS=R.getAttribute('data-is')||'';
var PZ=(R.getAttribute('data-pazar')||IS.split('_')[0]||'').toUpperCase();
var HARFSIZ=['AR','ARSA','AREG','ARLEV','URD','HE','TH','JA','KO','KR','CN','CNSMP','CNTW','CNHK','IN','MRIN','BEN'];
var RENK={'Beyaz':'#FFFFFF','Siyah':'#000000','Sarı':'#FFDD00'};
var A=[
 {k:'Harf',q:'Büyük harf nasıl olsun?',o:[['TT','HEPSİ BÜYÜK'],['Tt','Her Kelime Büyük'],['tt','hepsi küçük']]},
 {k:'Kart',q:'Kart tipi?',o:[['Cümle'],['Kısa öbek'],['Kelime kelime']]},
 {k:'Kutu',q:'Arka plan kutusu?',o:[['Yok'],['Beyaz'],['Siyah'],['Sarı']]},
 {k:'Renk',q:'Yazı rengi?',o:[['Siyah'],['Beyaz'],['Sarı']]},
 {k:'Kontur',q:'Kontur?',o:[['Yok'],['Siyah'],['Beyaz'],['Sarı']]},
 {k:'Animasyon',q:'Animasyon? (birden fazla seçebilirsin)',o:[['Animasyonsuz'],['Pop-up'],['Fade'],['Karaoke']],m:1},
 {k:'Dolum',q:'Karaoke nasıl dolsun?',o:[['Akarak (önerilen)'],['Kelime kelime']]}
];
if(HARFSIZ.indexOf(PZ)>=0)A.shift();
var CSS=":host{display:block;color:var(--text-primary)}\n.hd{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--text-secondary);margin:0 0 10px}\n.q{font-size:16px;font-weight:500;margin:0 0 10px;color:var(--text-primary)}\n.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}\n.t{display:flex;align-items:center;gap:8px;min-height:44px;background:var(--surface-2);border:.5px solid var(--border);border-radius:12px;padding:10px 12px;cursor:pointer;user-select:none;-webkit-user-select:none;font-size:14px;color:var(--text-primary)}\n.t:hover{border-color:var(--border-strong)}.t.on{border:2px solid var(--border-accent);padding:8.5px 10.5px}\n.sw{width:16px;height:16px;border-radius:50%;border:.5px solid var(--border-strong);flex:none}\n.al{display:block;font-size:12px;color:var(--text-secondary)}\n.ft{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:12px}.ft .m{flex:1;text-align:center;font-size:13px;color:var(--text-secondary)}\n.ft button{font:inherit;font-size:14px;padding:6px 14px;border:.5px solid var(--border-strong);border-radius:var(--radius,8px);background:transparent;color:var(--text-primary);cursor:pointer}\n.ft button:hover{background:var(--surface-1)}.ft button:active{transform:scale(.98)}.ft button:disabled{color:var(--text-secondary);cursor:default;background:transparent}";
R.removeAttribute('style');
var H=R.shadowRoot||(R.attachShadow?R.attachShadow({mode:'open'}):null);
if(!H){H=R;var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);}
H.innerHTML=(H===R?'':'<style>'+CSS+'</style>')+'<div class=hd><span>Altyazı adım adım · '+IS+'</span><span id=aas></span></div><p class=q id=aaq></p><div class=g id=aag></div><div class=ft><button type=button id=aag2>Geri git</button><span class=m id=aan></span><button type=button id=aad>Devam et</button></div>';
var S={},i=0,yazildi=false,bekle=false;
var q=H.querySelector('#aaq'),g=H.querySelector('#aag'),s=H.querySelector('#aas'),n=H.querySelector('#aan'),gr=H.querySelector('#aag2'),dv=H.querySelector('#aad');
function gorunen(){return A.filter(function(a){return a.k!=='Dolum'||(S.Animasyon||[]).indexOf('Karaoke')>=0;});}
function secili(a){var v=S[a.k];return a.m?!!(v&&v.length):!!v;}
function deger(a){var v=S[a.k];return a.m?v.join(' + '):v.replace(' (önerilen)','');}
function parca(d){if(d==='geri')return 'Geri: ilk ekran';return gorunen().map(function(a){return a.k+': '+deger(a);}).join(' · ');}
function goster(){dv.disabled=bekle;gr.disabled=bekle;}
function ciz(){var G=gorunen();if(i>=G.length)i=G.length-1;var a=G[i];s.textContent=(i+1)+' / '+G.length;q.textContent=a.q;
g.innerHTML=a.o.map(function(o,j){var on=a.m?(S[a.k]||[]).indexOf(o[0])>=0:S[a.k]===o[0];var sw=RENK[o[0]]&&a.k!=='Harf'?'<span class=sw style="background:'+RENK[o[0]]+'"></span>':'';
return '<div class="t'+(on?' on':'')+'" data-j="'+j+'">'+sw+'<span>'+o[0]+(o[1]?'<span class=al>'+o[1]+'</span>':'')+'</span></div>';}).join('');
g.querySelectorAll('.t').forEach(function(t){t.addEventListener('click',function(){sec(a,a.o[+t.getAttribute('data-j')][0]);});});}
function gonder(d){if(bekle)return;var metin=yazildi?' → '+parca(d):'Altyazı adım adım · '+IS+' — '+parca(d);
var ok=function(r){bekle=false;if(r&&r.isError){n.textContent='Yazı kutusu almadı, yeniden bas.';}else{yazildi=true;n.textContent='Enter ile gönder.';}goster();};
if(window.app&&typeof app.sendRequest==='function'){bekle=true;goster();var p;try{p=app.sendRequest({method:'ui/message',params:{role:'user',content:[{type:'text',text:metin}]}});}catch(e){p=null;}
if(p&&p.then){p.then(ok,function(){ok({isError:true});});}else{ok({isError:true});}}
else if(typeof sendPrompt==='function'){sendPrompt(metin);ok({});}else{n.textContent='Sohbete yaz: '+parca(d);}}
function ileri(){var G=gorunen();if(i===G.length-1){gonder('secim');}else{i++;n.textContent='';ciz();}}
function sec(a,v){if(a.m){var l=(S[a.k]||[]).slice(),x=l.indexOf(v);if(x>=0){l.splice(x,1);}else if(v==='Animasyonsuz'){l=['Animasyonsuz'];}else{l=l.filter(function(y){return y!=='Animasyonsuz';});l.push(v);}
var sira=a.o.map(function(o){return o[0];});l.sort(function(p,r){return sira.indexOf(p)-sira.indexOf(r);});S[a.k]=l;n.textContent='';ciz();return;}
S[a.k]=v;ciz();ileri();}
gr.addEventListener('click',function(){if(i===0){gonder('geri');}else{i--;n.textContent='';ciz();}});
dv.addEventListener('click',function(){var a=gorunen()[i];if(!secili(a)){n.textContent='Önce bir seçenek işaretle.';return;}ileri();});
ciz();
})();
