# altyazi-katalog

Cleanup altyazı aracının şablon kataloğu önizleme betikleri (CSS + "Try Cleanup now"ın pazar dilindeki örnek metni + şablon adları). Şirket verisi, ham video ya da anahtar içermez.
Claude Code sohbet widget'ı pazarın betiğini jsDelivr üzerinden yükler (KOD = iş kodunun pazarı: ARSA, TR, JA, ESMX…):

```html
<div id="altyazi-katalog" data-is="KOD · SAAT">Katalog yükleniyor…</div>
<script src="https://cdn.jsdelivr.net/gh/YunusCan1907/altyazi-katalog@v2.13/katalog_ARSA.js"></script>
```

v2.12 (2026-11-04): her pazar kodu için `katalog_<KOD>.js` — o dilin cümlesi, aracın o dilde basacağı font, sağdan sola yazıda yön ve karaoke dolumu; 12 şablonun hepsi her dilde. `katalog.js` = EN.

v2.13 (2026-11-04): 10 pazarın önizleme cümlesi Gemini 3.1 Pro + 3.8 Flash kontrolüyle düzeltildi (DE, KY, BEN, FR, IT, PL, RU, UA, AZ, HUN).
