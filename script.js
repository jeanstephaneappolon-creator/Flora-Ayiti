let plants=[];
let lang="en";
let activeProfileIndex=null;

const T={
en:{tagline:"Haiti's plant diversity",navInventory:"Inventory",navAbout:"About",pill:"HAITI PLANT INVENTORY",heroTitle:"Discover the plants of Haiti.",heroText:"A growing multilingual inventory connecting local knowledge with scientific names and botanical information.",searchPlaceholder:"Search by local, English, French or scientific name…",statPlants:"plants",statFamilies:"families",statLanguages:"languages",eyebrow:"Explore",inventoryTitle:"Plant inventory",allFamilies:"All families",allUses:"All uses",aboutEyebrow:"The idea",aboutTitle:"Local names. Scientific knowledge. Haiti.",aboutText:"Flora Ayiti is designed to document Haiti's plant diversity while preserving the names and knowledge used by local communities. The inventory can grow gradually and each record can be checked and improved over time.",footer:"Flora Ayiti — working inventory. Records should be verified and enriched before formal publication.",view:"View profile",found:"plants found",family:"Family",local:"Local names",region:"Region",uses:"Uses",description:"Description",verification:"Verification note",verificationText:"Working record — verify botanical and local information before formal publication.",source:"Source"},
ht:{tagline:"Divèsite plant Ayiti",navInventory:"Envantè",navAbout:"Sou pwojè a",pill:"ENVANTÈ PLANT AYITI",heroTitle:"Dekouvri plant Ayiti yo.",heroText:"Yon envantè plizyè lang k ap konekte konesans lokal ak non syantifik ak enfòmasyon botanik.",searchPlaceholder:"Chèche non lokal, kreyòl, franse, angle oswa syantifik…",statPlants:"plant",statFamilies:"fanmi",statLanguages:"lang",eyebrow:"Eksplore",inventoryTitle:"Envantè plant",allFamilies:"Tout fanmi",allUses:"Tout itilizasyon",aboutEyebrow:"Lide a",aboutTitle:"Non lokal. Konesans syantifik. Ayiti.",aboutText:"Flora Ayiti fèt pou dokimante divèsite plant Ayiti pandan l ap konsève non ak konesans kominote lokal yo itilize.",footer:"Flora Ayiti — envantè k ap devlope. Verifye epi amelyore fich yo anvan piblikasyon ofisyèl.",view:"Gade pwofil",found:"plant jwenn",family:"Fanmi",local:"Non lokal",region:"Rejyon",uses:"Itilizasyon",description:"Deskripsyon",verification:"Nòt verifikasyon",verificationText:"Fich k ap devlope — verifye enfòmasyon botanik ak enfòmasyon lokal yo anvan piblikasyon ofisyèl.",source:"Sous"},
fr:{tagline:"La diversité végétale d'Haïti",navInventory:"Inventaire",navAbout:"À propos",pill:"INVENTAIRE DES PLANTES D'HAÏTI",heroTitle:"Découvrez les plantes d'Haïti.",heroText:"Un inventaire multilingue en croissance reliant les connaissances locales aux noms scientifiques et aux informations botaniques.",searchPlaceholder:"Rechercher par nom local, anglais, français ou scientifique…",statPlants:"plantes",statFamilies:"familles",statLanguages:"langues",eyebrow:"Explorer",inventoryTitle:"Inventaire des plantes",allFamilies:"Toutes les familles",allUses:"Tous les usages",aboutEyebrow:"L'idée",aboutTitle:"Noms locaux. Connaissances scientifiques. Haïti.",aboutText:"Flora Ayiti vise à documenter la diversité végétale d'Haïti tout en préservant les noms et connaissances utilisés par les communautés locales.",footer:"Flora Ayiti — inventaire en développement. Vérifier et enrichir les fiches avant publication officielle.",view:"Voir la fiche",found:"plantes trouvées",family:"Famille",local:"Noms locaux",region:"Région",uses:"Usages",description:"Description",verification:"Note de vérification",verificationText:"Fiche en développement — vérifier les informations botaniques et locales avant publication officielle.",source:"Source"}
};

const $=x=>document.getElementById(x);
function normalize(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
function allNames(p){return [...Object.values(p.name||{}),p.scientific,...(p.local||[]),...Object.values(p.localNames||{}).flat()].map(normalize).join(" ")}
function textFor(obj){return obj?.[lang] || obj?.en || ""}

const USE_LABELS = {
  en: {
    "Food":"Food", "Juice":"Juice", "Processing":"Processing",
    "Crop":"Crop", "Cassava bread":"Cassava bread", "Flour":"Flour",
    "Markets":"Markets", "Coconut water":"Coconut water",
    "Coconut milk":"Coconut milk", "Oil":"Oil", "Crafts":"Crafts",
    "Traditional knowledge":"Traditional knowledge",
    "Traditional/local knowledge":"Traditional/local knowledge",
    "Timber":"Timber", "Soil fertility":"Soil fertility",
    "Seasoning":"Seasoning", "Tree":"Tree",
    "Coastal environments":"Coastal environments",
    "Landscape":"Landscape", "Cultural value":"Cultural value",
    "Forest":"Forest", "Drinks":"Drinks", "Beverage":"Beverage",
    "Fruit":"Fruit", "Ornamental":"Ornamental", "Sugar":"Sugar",
    "Medicinal":"Medicinal", "Medicine":"Medicine",
    "Construction":"Construction", "Fuel":"Fuel", "Shade":"Shade",
    "Animal feed":"Animal feed", "Fodder":"Fodder", "Fiber":"Fiber",
    "Spice":"Spice", "Drink":"Drink", "Cosmetic":"Cosmetic",
    "Cultural":"Cultural", "Environmental":"Environmental",
    "Agriculture":"Agriculture", "Dye":"Dye", "Hedge":"Hedge",
    "Erosion control":"Erosion control"
  },
  ht: {
    "Food":"Manje", "Juice":"Ji", "Processing":"Transfòmasyon",
    "Crop":"Rekòt", "Cassava bread":"Kasav", "Flour":"Farin",
    "Markets":"Mache", "Coconut water":"Dlo kokoye",
    "Coconut milk":"Lèt kokoye", "Oil":"Lwil", "Crafts":"Atizana",
    "Traditional knowledge":"Konesans tradisyonèl",
    "Traditional/local knowledge":"Konesans lokal ak tradisyonèl",
    "Timber":"Bwa", "Soil fertility":"Fètilite tè",
    "Seasoning":"Epis", "Tree":"Pyebwa",
    "Coastal environments":"Anviwònman kotyè",
    "Landscape":"Peyizaj", "Cultural value":"Valè kiltirèl",
    "Forest":"Forè", "Drinks":"Bwason", "Beverage":"Bwason",
    "Fruit":"Fwi", "Ornamental":"Dekoratif", "Sugar":"Sik",
    "Medicinal":"Medisinal", "Medicine":"Medikaman",
    "Construction":"Konstriksyon", "Fuel":"Konbistib", "Shade":"Lonbraj",
    "Animal feed":"Manje bèt", "Fodder":"Fouraj", "Fiber":"Fib",
    "Spice":"Epis", "Drink":"Bwason", "Cosmetic":"Kosmetik",
    "Cultural":"Kiltirèl", "Environmental":"Anviwònman",
    "Agriculture":"Agrikilti", "Dye":"Koloran", "Hedge":"Lizyè",
    "Erosion control":"Kontwòl ewozyon"
  },
  fr: {
    "Food":"Alimentation", "Juice":"Jus", "Processing":"Transformation",
    "Crop":"Culture", "Cassava bread":"Cassave", "Flour":"Farine",
    "Markets":"Marchés", "Coconut water":"Eau de coco",
    "Coconut milk":"Lait de coco", "Oil":"Huile", "Crafts":"Artisanat",
    "Traditional knowledge":"Savoirs traditionnels",
    "Traditional/local knowledge":"Savoirs locaux et traditionnels",
    "Timber":"Bois d’œuvre", "Soil fertility":"Fertilité des sols",
    "Seasoning":"Assaisonnement", "Tree":"Arbre",
    "Coastal environments":"Environnements côtiers",
    "Landscape":"Aménagement paysager", "Cultural value":"Valeur culturelle",
    "Forest":"Forêt", "Drinks":"Boissons", "Beverage":"Boisson",
    "Fruit":"Fruit", "Ornamental":"Ornemental", "Sugar":"Sucre",
    "Medicinal":"Médicinal", "Medicine":"Médicament",
    "Construction":"Construction", "Fuel":"Combustible", "Shade":"Ombre",
    "Animal feed":"Alimentation animale", "Fodder":"Fourrage",
    "Fiber":"Fibre", "Spice":"Épice", "Drink":"Boisson",
    "Cosmetic":"Cosmétique", "Cultural":"Culturel",
    "Environmental":"Environnemental", "Agriculture":"Agriculture",
    "Dye":"Colorant", "Hedge":"Haie", "Erosion control":"Lutte contre l’érosion"
  }
};




function visual(p){
  if(!p.image) return `<div aria-label="${p.name?.en||''}">🌿</div>`;
  return `<img src="${p.image}" alt="${p.name?.en||p.scientific}" loading="lazy" onerror="this.parentElement.innerHTML='<div aria-label=&quot;Plant photo unavailable&quot;>🌿</div>'">`;
}


```js
function populateFilters() {
  const fs = [...new Set(plants.map(p => p.family))].sort();
  const us = [...new Set(plants.flatMap(p => p.uses?.en || []))].sort();
  const ff = $("familyFilter");
  const uf = $("useFilter");

  ff.querySelectorAll("option:not(:first-child)").forEach(x => x.remove());
  uf.querySelectorAll("option:not(:first-child)").forEach(x => x.remove());

  fs.forEach(x =>
    ff.insertAdjacentHTML("beforeend", `<option value="${x}">${x}</option>`)
  );

  const seenLabels = new Set();

  us.forEach(x => {
    const label = (USE_LABELS[lang] && USE_LABELS[lang][x]) || x;
    if (seenLabels.has(label)) return;
    seenLabels.add(label);

    uf.insertAdjacentHTML(
      "beforeend",
      `<option value="${x}">${label}</option>`
    );
  });
}
```


function render(){
 const q=normalize($("search").value), f=$("familyFilter").value,u=$("useFilter").value;

const shown = plants.filter(p =>
  (!q || allNames(p).includes(q)) &&
  (!f || p.family === f) &&
  (!u || (p.uses?.en || []).some(use => useLabel(use) === u))
);

 $("resultText").textContent=`${shown.length} ${T[lang].found}`;
 $("plants").innerHTML=shown.map(p=>`<article class="card">
   <div class="photo">${visual(p)}</div>
   <div class="body">
     <h3>${p.name?.[lang]||p.name?.en||p.scientific}</h3>
     <div class="scientific">${p.scientific}</div>
     <div class="tags"><span class="tag">${p.family}</span><span class="tag">${textFor(p.region)}</span></div>
     <button class="view" onclick="openProfile(${plants.indexOf(p)})">${T[lang].view}</button>
   </div>
 </article>`).join("");
 $("plantCount").textContent=shown.length;
 $("familyCount").textContent=new Set(plants.map(p=>p.family)).size;
}

function openProfile(i){
 activeProfileIndex=i;
 const p=plants[i];
 $("profile").innerHTML=`<div class="profile">
   <div class="profile-photo">${visual(p)}</div>
   <h2>${p.name?.[lang]||p.name?.en||p.scientific}</h2>
   <div class="scientific">${p.scientific}</div>
   <p>${textFor(p.description)}</p>
   <dl>
    <dt>${T[lang].family}</dt><dd>${p.family}</dd>
    <dt>${T[lang].local}</dt><dd>${((p.localNames&&p.localNames[lang]) || p.local || []).join(", ")}</dd>
    <dt>${T[lang].region}</dt><dd>${textFor(p.region)}</dd>
    <dt>${T[lang].uses}</dt><dd>${(p.uses?.[lang]||p.uses?.en||[]).join(", ")}</dd>
   </dl>
   <div class="source-note"><b>${T[lang].source}</b><br>${p.source||"Working Flora Ayiti record"}</div>
   <div class="verify"><b>${T[lang].verification}</b><br>${T[lang].verificationText}</div>
 </div>`;
 $("modal").classList.remove("hidden");
}

function apply(){
 const oldFamily=$("familyFilter").value, oldUse=$("useFilter").value;
 populateFilters();
 if([...$("familyFilter").options].some(o=>o.value===oldFamily)) $("familyFilter").value=oldFamily;
 if([...$("useFilter").options].some(o=>o.value===oldUse)) $("useFilter").value=oldUse;
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[lang][e.dataset.i18n]);
 document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=T[lang][e.dataset.i18nPlaceholder]);
 render();
 if(activeProfileIndex!==null && !$("modal").classList.contains("hidden")) openProfile(activeProfileIndex);
}

async function loadPlants(){
 try{
   const response=await fetch("plants.json");
   plants=await response.json();
   populateFilters();
   apply();
 }catch(error){
   console.error("Could not load plant data:",error);
   $("plants").innerHTML="<p>Plant data could not be loaded.</p>";
 }
}

$("language").addEventListener("change",e=>{lang=e.target.value;apply()});
$("search").addEventListener("input",render);
$("familyFilter").addEventListener("change",render);
$("useFilter").addEventListener("change",render);
$("clear").addEventListener("click",()=>{$("search").value="";render();$("search").focus()});
$("close").addEventListener("click",()=>{$("modal").classList.add("hidden");activeProfileIndex=null});
$("modal").addEventListener("click",e=>{if(e.target.id==="modal"){$("modal").classList.add("hidden");activeProfileIndex=null}});
loadPlants();
