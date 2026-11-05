# altyazi-katalog

Cleanup altyazı aracının şablon kataloğu önizleme betikleri (CSS + "Try Cleanup now"ın pazar dilindeki örnek metni + şablon adları). Şirket verisi, ham video ya da anahtar içermez.
Claude Code sohbet widget'ı pazarın betiğini jsDelivr üzerinden yükler (KOD = iş kodunun pazarı: ARSA, TR, JA, ESMX…):

```html
<div id="altyazi-katalog" data-is="KOD · SAAT">Katalog yükleniyor…</div>
<script src="https://cdn.jsdelivr.net/gh/YunusCan1907/altyazi-katalog@v2.14/katalog_ARSA.js"></script>
```

v2.12 (2026-11-04): her pazar kodu için `katalog_<KOD>.js` — o dilin cümlesi, aracın o dilde basacağı font, sağdan sola yazıda yön ve karaoke dolumu; 12 şablonun hepsi her dilde. `katalog.js` = EN.

v2.13 (2026-11-04): 10 pazarın önizleme cümlesi Gemini 3.1 Pro + 3.8 Flash kontrolüyle düzeltildi (DE, KY, BEN, FR, IT, PL, RU, UA, AZ, HUN).
v2.14 (2026-11-04): kutulu şablonlarda (9, 11) kutu aracın kutusuyla aynı — dilin en yüksek/derin harfine göre (Arapça, Tayca, Vietnamca, Hint, Bengal, Türkçe İ/Ş…), tarayıcıda fonta göre iç pay.
v2.15 (2026-11-04): `adim.js` — "Adım adım özelleştir" tek widget'ta slayt slayt (harf, kart, kutu, yazı rengi, kontur, animasyon, karaoke dolumu); tıklayınca ilerler, sol altta Geri git, seçim yalnız son slaytta tek satır olarak yazı kutusuna düşer. Büyük/küçük harfi olmayan yazıda harf slaytı yok.

```html
<div id="altyazi-adim" data-is="KOD · SAAT">Yükleniyor…</div>
<script src="https://cdn.jsdelivr.net/gh/YunusCan1907/altyazi-katalog@v2.15/adim.js"></script>
```

v2.16 (2026-11-05): `adim.js` yeniden — sağ üstte sayfa sekmeleri (tıklayınca atlar), sol altta Geri git, sağ altta Devam et; her sayfada Other (yazı alanı); harf TT / Tt / tt / Standart; karaoke seçilince Dolum + Alt renk sayfaları. Seçim yalnız son sayfada tek satır olarak yazı kutusuna düşer. Adres `@v2.16/adim.js`.

v2.17 (2026-11-05): kişisel favoriler — katalogda `data-fav` özniteliği varsa sağ üstte "Şablonlar | Favoriler" sekmesi, favori kutuları seçimden çizilir (pazarın cümlesi ve fontu), her birinde Sil; özniteliği yoksa katalog eskisi gibi. Adım adım widget'ının son sayfasında "Favorilere kaydet ve devam et" / "Kaydetmeden devam et". Favori verisi bu depoda değil: her kullanıcının kendi makinesinde durur, widget'a Claude koyar. Adres `@v2.17/katalog_<PAZAR>.js`, `@v2.17/adim.js`.
