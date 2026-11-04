(function(){
var R=document.getElementById('altyazi-adim');
if(!R)return;
var IS=R.getAttribute('data-is')||'';
var PZ=(R.getAttribute('data-pazar')||IS.split('_')[0]||'').toUpperCase();
var HARFSIZ=['AR','ARSA','AREG','ARLEV','URD','HE','TH','JA','KO','KR','CN','CNSMP','CNTW','CNHK','IN','MRIN','BEN'];
var RENK={'Beyaz':'#FFFFFF','Siyah':'#000000','Sarı':'#FFDD00'};
var OT='Other';
var A=[
 {k:'Harf',q:'Büyük harf nasıl olsun?',o:[['TT','HEPSİ BÜYÜK'],['Tt','Her Kelime Büyük'],['tt','hepsi küçük'],['Standart','Yalnız cümlenin ilk harfi büyük']]},
 {k:'Kart',q:'Kart tipi?',o:[['Cümle'],['Kısa öbek'],['Kelime kelime']]},
 {k:'Kutu',q:'Arka plan kutusu?',o:[['Yok'],['Beyaz'],['Siyah'],['Sarı']],r:1},
 {k:'Renk',q:'Yazı rengi?',o:[['Siyah'],['Beyaz'],['Sarı']],r:1},
 {k:'Kontur',q:'Kontur?',o:[['Yok'],['Siyah'],['Beyaz'],['Sarı']],r:1},
 {k:'Animasyon',q:'Animasyon? (birden fazla seçebilirsin)',o:[['Animasyonsuz'],['Pop-up'],['Fade'],['Karaoke']],m:1},
 {k:'Dolum',q:'Karaoke nasıl dolsun?',o:[['Akarak (önerilen)'],['Kelime kelime']],kar:1},
 {k:'Alt renk',q:'Söylenmemiş yazı rengi?',o:[['Beyaz'],['Sarı'],['Siyah']],kar:1,r:1}
];
if(HARFSIZ.indexOf(PZ)>=0)A.shift();
var CSS=":host{display:block;color:var(--text-primary)}\n.hd{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 12px}\n.is{font-size:13px;color:var(--text-secondary);padding-top:3px}\n.sk{display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end}\n.sk button{font:inherit;font-size:12px;padding:3px 9px;border:.5px solid var(--border);border-radius:var(--radius,8px);background:transparent;color:var(--text-secondary);cursor:pointer}\n.sk button.ok{color:var(--text-primary);border-color:var(--border-strong)}\n.sk button.on{color:var(--text-primary);border:1.5px solid var(--border-accent);padding:2px 8.5px}\n.q{font-size:16px;font-weight:500;margin:0 0 10px;color:var(--text-primary)}\n.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}\n.t{display:flex;align-items:center;gap:8px;min-height:44px;background:var(--surface-2);border:.5px solid var(--border);border-radius:12px;padding:10px 12px;cursor:pointer;user-select:none;-webkit-user-select:none;font-size:14px;color:var(--text-primary)}\n.t:hover{border-color:var(--border-strong)}.t.on{border:2px solid var(--border-accent);padding:8.5px 10.5px}\n.sw{width:16px;height:16px;border-radius:50%;border:.5px solid var(--border-strong);flex:none}\n.al{display:block;font-size:12px;color:var(--text-secondary)}\n.ot{margin-top:10px;width:100%;box-sizing:border-box;font:inherit;font-size:14px;height:36px;padding:0 10px;border:.5px solid var(--border-strong);border-radius:var(--radius,8px);background:var(--surface-2);color:var(--text-primary)}\n.ft{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:12px}.ft .m{flex:1;text-align:center;font-size:13px;color:var(--text-secondary)}\n.ft button{font:inherit;font-size:14px;padding:6px 14px;border:.5px solid var(--border-strong);border-radius:var(--radius,8px);background:transparent;color:var(--text-primary);cursor:pointer}\n.ft button:hover{background:var(--surface-1)}.ft button:active{transform:scale(.98)}.ft button:disabled{color:var(--text-secondary);cursor:default;background:transparent}";
R.removeAttribute('style');
var H=R.shadowRoot||(R.attachShadow?R.attachShadow({mode:'open'}):null);
if(!H){H=R;var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);}
H.innerHTML=(H===R?'':'<style>'+CSS+'</style>')+'<div class=hd><span class=is>Altyazı adım adım · '+IS+'</span><div class=sk id=aak></div></div><p class=q id=aaq></p><div class=g id=aag></div><div id=aao></div><div class=ft><button type=button id=aag2>Geri git</button><span class=m id=aan></span><button type=button id=aad>Devam et</button></div>';
var S={},O={},i=0,yazildi=false,bekle=false;
var sk=H.querySelector('#aak'),q=H.querySelector('#aaq'),g=H.querySelector('#aag'),oa=H.querySelector('#aao'),n=H.querySelector('#aan'),gr=H.querySelector('#aag2'),dv=H.querySelector('#aad');
function gorunen(){var kar=(S.Animasyon||[]).indexOf('Karaoke')>=0;return A.filter(function(a){return !a.kar||kar;});}
function yazi(a){return (O[a.k]||'').trim();}
function secili(a){var v=S[a.k];if(a.m){return !!(v&&v.length)&&(v.indexOf(OT)<0||!!yazi(a));}return !!v&&(v!==OT||!!yazi(a));}
function deger(a){var v=S[a.k];if(a.m){return v.map(function(x){return x===OT?yazi(a):x;}).join(' + ');}return v===OT?yazi(a):v.replace(' (önerilen)','');}
function parca(d){if(d==='geri')return 'Geri: ilk ekran';return gorunen().map(function(a){return a.k+': '+deger(a);}).join(' · ');}
function goster(){dv.disabled=bekle;gr.disabled=bekle;}
function sekmeler(G){sk.innerHTML=G.map(function(a,j){return '<button type=button class="'+(j===i?'on':(secili(a)?'ok':''))+'" data-j="'+j+'">'+a.k+'</button>';}).join('');
sk.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){i=+b.getAttribute('data-j');n.textContent='';ciz();});});}
function ciz(odak){var G=gorunen();if(i>=G.length)i=G.length-1;var a=G[i];sekmeler(G);q.textContent=a.q;
var sec=function(x){return a.m?(S[a.k]||[]).indexOf(x)>=0:S[a.k]===x;};
g.innerHTML=a.o.concat([[OT]]).map(function(o,j){var sw=a.r&&RENK[o[0]]?'<span class=sw style="background:'+RENK[o[0]]+'"></span>':'';
return '<div class="t'+(sec(o[0])?' on':'')+'" data-j="'+j+'">'+sw+'<span>'+o[0]+(o[1]?'<span class=al>'+o[1]+'</span>':'')+'</span></div>';}).join('');
g.querySelectorAll('.t').forEach(function(t){t.addEventListener('click',function(){var j=+t.getAttribute('data-j');sec_(a,j<a.o.length?a.o[j][0]:OT);});});
if(sec(OT)){oa.innerHTML='<input class=ot id=aai type=text autocomplete=off>';var inp=oa.querySelector('#aai');inp.value=O[a.k]||'';
inp.addEventListener('input',function(){O[a.k]=inp.value;n.textContent='';sekmeler(gorunen());});
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();if(i<gorunen().length-1)dv.click();}});
if(odak){try{inp.focus();}catch(e){}}}else{oa.innerHTML='';}}
function gonder(d){if(bekle)return;var metin=yazildi?' → '+parca(d):'Altyazı adım adım · '+IS+' — '+parca(d);
var ok=function(r){bekle=false;if(r&&r.isError){n.textContent='Yazı kutusu almadı, yeniden bas.';}else{yazildi=true;n.textContent='Enter ile gönder.';}goster();};
if(window.app&&typeof app.sendRequest==='function'){bekle=true;goster();var p;try{p=app.sendRequest({method:'ui/message',params:{role:'user',content:[{type:'text',text:metin}]}});}catch(e){p=null;}
if(p&&p.then){p.then(ok,function(){ok({isError:true});});}else{ok({isError:true});}}
else if(typeof sendPrompt==='function'){sendPrompt(metin);ok({});}else{n.textContent='Sohbete yaz: '+parca(d);}}
function ileri(){var G=gorunen();if(i<G.length-1){i++;n.textContent='';ciz(true);return;}
var eksik=G.findIndex(function(a){return !secili(a);});
if(eksik>=0){i=eksik;ciz(true);n.textContent='Önce '+G[eksik].k+' sayfasını seç.';return;}
gonder('secim');}
function sec_(a,v){n.textContent='';if(a.m){var l=(S[a.k]||[]).slice(),x=l.indexOf(v);if(x>=0){l.splice(x,1);}else if(v==='Animasyonsuz'){l=['Animasyonsuz'];}else{l=l.filter(function(y){return y!=='Animasyonsuz';});l.push(v);}
var sira=a.o.map(function(o){return o[0];}).concat([OT]);l.sort(function(p,r){return sira.indexOf(p)-sira.indexOf(r);});S[a.k]=l;ciz(v===OT);return;}
S[a.k]=v;if(v===OT){ciz(true);return;}ciz();ileri();}
gr.addEventListener('click',function(){if(i===0){gonder('geri');}else{i--;n.textContent='';ciz();}});
dv.addEventListener('click',function(){var a=gorunen()[i];if(!secili(a)){n.textContent=(S[a.k]===OT||(a.m&&(S[a.k]||[]).indexOf(OT)>=0))?'Other için bir şey yaz.':'Önce bir seçenek işaretle.';return;}ileri();});
ciz();
})();
