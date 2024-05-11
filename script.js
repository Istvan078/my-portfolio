/////////////////// SELECTED ELEMENTS ////////////////////////
const navUl = document.querySelector(".nav-items");
const navItems = document.querySelectorAll(".nav-items li");
const meImg = document.querySelector(".me-img");
const contentContainer = document.getElementById("content-container");
const contentContainers = document.querySelectorAll(".content-container");

//////////////// MARKUPS ///////////////////////////////////////////
const markup1 = `
<div data-content="1">
<h2 class="h-title">Üdvözöllek az oldalamon!</h2>
<p class="p-text-shadow">
  Kalmár István vagyok, front-end fejlesztő. Küldetésemnek érzem, hogy
  olyan felhasználói élményt nyújtsak a felhasználók számára,
  ami minden szempontból elégedettséggel tölti el őket és egy olyan
  élményt ad, amire azt mondja, hogy igen, érdemes volt ezt az oldalt
  meglátogatni, mert megfelelő stílussal, funkciókkal és tartalmakkal
  rendelkezett, olyanokkal, amire pont szükségem volt, hogy a napomat
  szebbé és egyszerűbbé varázsolja és egyszerűen, könnyedén elintéztem,
  amit szerettem volna.
</p>
<p class="p-text-shadow">
  Munkáim a lehető legnagyobb odafigyeléssel és precizítással készültek,
  Junior Front-End fejlesztői szinten,
  figyelembe véve a mai felhasználói igényeket és a modern technika
  használatával, Angular keretrendszer használatával, egyedi és
  stíluskeretrendszereket használva, mint a Bootstrap és az Angular
  Material. Kattints a Munkáim menüpontra a megtekintésükhöz.
</p>
<p class="p-text-shadow">
  Tanulmányaim során megtanultam a HTML, CSS, SCSS, Javascript,
  Bootstrap, Angular-keretrendszer precíz használatát. A Végzettségeim
  menüpontra kattintva ezeket megtekintheted.
</p>
<div class="img-container t-center">
  <img
  src="${meImg.getAttribute("src")}" 
  alt="me-1" />
</div>
</div>
`;

const markup2 = `
<div data-content="2">
<h2 class="h-title">Munkáim</h2>
<p class="p-text-shadow-1">
 Munkáim körébe tartozik egy <b>Chat alkalmazás</b>, ami az alábbi tartalmakkal rendelkezik:
 <ul>
  <li>
    Ismerősnek jelölés, törlés
  </li>
  <li>
    Privát üzenet küldése, fájlok csatolásával akár
  </li>
  <li>
    Üzenőfal
  </li>
  <li>
    Privát bejegyegzés, nyilvános bejegyzés létrehozása
  </li>
  <li>
    Ismerős profiljának megtekintése,
    feltöltött fényképeinek megtekintése
  </li>
  <li>
    Böngészői értesítés küldése új üzenet esetén Service 
    Worker segítségével
  </li>
  <li>
    Értesítések adatlapmegtekintés és új üzenet esetén
</li>
</ul>
</p>
<div class="bold">
<p class="p-text-shadow-1">Ezen a linken megtekinthed és kipróbálhatod: <a href="https://project0781.web.app">Flame Chat</a> </p>
<p class="p-text-shadow-1">Forráskódja: <a class="gitlink d-block t-center w-95 overflow-hidden" href="https://github.com/Istvan078/flame-chat">https://github.com/Istvan078/flame-chat</a></p>
</div>

<p class="p-text-shadow-1">
A másik projektem egy <b>Webshop</b>, aminek a következő tartalmai vannak:
<ul>
  <li>
    Termékek megtekintése, kiemelt, akciós termékek
  </li>
  <li>
    Termékek kosárba helyezése, megrendelése
  </li>
  <li>
    Regisztráció, bejelentkezés
  </li>
  <li>
    Rendelés megtekintése
  </li>
  <li>
    Admin felület rendelések feldolgozásához
  </li>
  <li>
    Felhasználói jogosultságok beállítása
  </li>
</ul>
</p>
<div class="bold">
<p class="p-text-shadow-1">Ezen a linken megtekinthed és kipróbálhatod: <a class="mb-sm"  href="https://webshop0781.web.app">Webshop</a></p>
<p class="p-text-shadow-1">Forráskódja: <a class="gitlink d-block t-center w-95 overflow-hidden" href="https://github.com/Istvan078/webshop">https://github.com/Istvan078/webshop</a></p> 
</div>
</div>
`;

const markup3 = `
<div data-content="3">
<h2 class="h-title">Végzettségeim</h2>
<ul>
<li>2023 - 2024 - Front-End fejlesztő - Soterline Kft. </li>
<li>2021 - 2022 - Pénzügyi és számviteli ügyintéző - EFEB Kft.</li>
<li>2013 - 2014 - Marketing és reklám ügyintéző</li>
<li>2012 - 2013 - Ápolási Asszisztens</li>
</ul>
</div>
`;

///////////// FUNCTIONS ////////////////

const renderMarkup = function (markup) {
  return markup;
};

////////////// EVENT LISTENERS ///////////////////

document.addEventListener("DOMContentLoaded", () => {
  contentContainer.style.transform = "translateY(50px)";
  navUl.classList.add("onload-nav");
  meImg.classList.remove("me-img");
  meImg.classList.add("onload-img");
  navItems[0].style.color = "white";
  navItems[0].style.transform = "translateX(30px)";
});

const renderContentHandler = () => {
  navUl.addEventListener("click", (e) => {
    navItems[+e.target.dataset.content - 1].style.transform =
      "translateX(30px)";
    navItems.forEach((navI, i) => {
      if (+e.target.dataset.content - 1 !== i) {
        navI.style.transform = "translateX(0px)";
        navI.style.color = "black";
      }
      if (+e.target.dataset.content - 1 === i) {
        navI.style.color = "white";
      }
    });
    if (+e.target.dataset.content === 1) {
      contentContainer.innerHTML = renderMarkup(markup1);
    }
    if (+e.target.dataset.content === 2)
      contentContainer.innerHTML = renderMarkup(markup2);
    if (+e.target.dataset.content === 3)
      contentContainer.innerHTML = renderMarkup(markup3);
  });
};
renderContentHandler();
