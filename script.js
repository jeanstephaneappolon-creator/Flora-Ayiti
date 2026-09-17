let plants=[];
let lang="en";

const T={
en:{tagline:"Haiti's plant diversity",navInventory:"Inventory",navAbout:"About",pill:"HAITI PLANT INVENTORY",heroTitle:"Discover the plants of Haiti.",heroText:"A growing multilingual inventory connecting local knowledge with scientific names and botanical information.",searchPlaceholder:"Search by local, English, French or scientific name…",statPlants:"plants",statFamilies:"families",statLanguages:"languages",eyebrow:"Explore",inventoryTitle:"Plant inventory",allFamilies:"All families",allUses:"All uses",aboutEyebrow:"The idea",aboutTitle:"Local names. Scientific knowledge. Haiti.",aboutText:"Flora Ayiti is designed to document Haiti's plant diversity while preserving the names and knowledge used by local communities. The inventory can grow gradually and each record can be checked and improved over time.",footer:"Prototype — demonstration information should be verified before publication.",view:"View profile",found:"plants found",family:"Family",local:"Local names",region:"Region",uses:"Uses",description:"Description",verification:"Verification note",verificationText:"Demonstration record — verify botanical and local information before publication."},
ht:{tagline:"Divèsite plant Ayiti",navInventory:"Envantè",navAbout:"Sou pwojè a",pill:"ENVANTÈ PLANT AYITI",heroTitle:"Dekouvri plant Ayiti yo.",heroText:"Yon envantè plizyè lang k ap konekte konesans lokal ak non syantifik ak enfòmasyon botanik.",searchPlaceholder:"Chèche non lokal, kreyòl, franse, angle oswa syantifik…",statPlants:"plant",statFamilies:"fanmi",statLanguages:"lang",eyebrow:"Eksplore",inventoryTitle:"Envantè plant",allFamilies:"Tout fanmi",allUses:"Tout itilizasyon",aboutEyebrow:"Lide a",aboutTitle:"Non lokal. Konesans syantifik. Ayiti.",aboutText:"Flora Ayiti fèt pou dokimante divèsite plant Ayiti pandan l ap konsève non ak konesans kominote lokal yo itilize. Envantè a ka grandi piti piti epi chak fich ka verifye ak amelyore sou tan.",footer:"Pwototip — enfòmasyon demonstrasyon yo dwe verifye anvan piblikasyon.",view:"Gade pwofil",found:"plant jwenn",family:"Fanmi",local:"Non lokal",region:"Rejyon",uses:"Itilizasyon",description:"Deskripsyon",verification:"Nòt verifikasyon",verificationText:"Fich demonstrasyon — verifye enfòmasyon botanik ak enfòmasyon lokal yo anvan piblikasyon."},
fr:{tagline:"La diversité végétale d'Haïti",navInventory:"Inventaire",navAbout:"À prscript.jsopos",pill:"INVENTAIRE DES PLANTES D'HAÏTI",heroTitle:"Découvrez les plantes d'Haïti.",heroText:"Un inventaire multilingue en croissance reliant les connaissances locales aux noms scientifiques et aux informations botaniques.",searchPlaceholder:"Rechercher par nom local, anglais, français ou scientifique…",statPlants:"plantes",statFamilies:"familles",statLanguages:"langues",eyebrow:"Explorer",inventoryTitle:"Inventaire des plantes",allFamilies:"Toutes les familles",allUses:"Tous les usages",aboutEyebrow:"L'idée",aboutTitle:"Noms locaux. Connaissances scientifiques. Haïti.",aboutText:"Flora Ayiti vise à documenter la diversité végétale d'Haïti tout en préservant les noms et connaissances utilisés par les communautés locales. L'inventaire pourra grandir progressivement et chaque fiche pourra être vérifiée et améliorée.",footer:"Prototype — les informations de démonstration doivent être vérifiées avant publication.",view:"Voir la fiche",found:"plantes trouvées",family:"Famille",local:"Noms locaux",region:"Région",uses:"Usages",description:"Description",verification:"Note de vérification",verificationText:"Fiche de démonstration — vérifier les informations botaniques et locales avant publication."}
};let plants=[];
let lang="en";

const T={
en:{tagline:"Haiti's plant diversity",navInventory:"Inventory",navAbout:"About",pill:"HAITI PLANT INVENTORY",heroTitle:"Discover the plants of Haiti.",heroText:"A growing multilingual inventory connecting local knowledge with scientific names and botanical information.",searchPlaceholder:"Search by local, English, French or scientific name…",statPlants:"plants",statFamilies:"families",statLanguages:"languages",eyebrow:"Explore",inventoryTitle:"Plant inventory",allFamilies:"All families",allUses:"All uses",aboutEyebrow:"The idea",aboutTitle:"Local names. Scientific knowledge. Haiti.",aboutText:"Flora Ayiti is designed to document Haiti's plant diversity while preserving the names and knowledge used by local communities. The inventory can grow gradually and each record can be checked and improved over time.",footer:"Prototype — demonstration information should be verified before publication.",view:"View profile",found:"plants found",family:"Family",local:"Local names",region:"Region",uses:"Uses",description:"Description",verification:"Verification note",verificationText:"Demonstration record — verify botanical and local information before publication."},
ht:{tagline:"Divèsite plant Ayiti",navInventory:"Envantè",navAbout:"Sou pwojè a",pill:"ENVANTÈ PLANT AYITI",heroTitle:"Dekouvri plant Ayiti yo.",heroText:"Yon envantè plizyè lang k ap konekte konesans lokal ak non syantifik ak enfòmasyon botanik.",searchPlaceholder:"Chèche non lokal, kreyòl, franse, angle oswa syantifik…",statPlants:"plant",statFamilies:"fanmi",statLanguages:"lang",eyebrow:"Eksplore",inventoryTitle:"Envantè plant",allFamilies:"Tout fanmi",allUses:"Tout itilizasyon",aboutEyebrow:"Lide a",aboutTitle:"Non lokal. Konesans syantifik. Ayiti.",aboutText:"Flora Ayiti fèt pou dokimante divèsite plant Ayiti pandan l ap konsève non ak konesans kominote lokal yo itilize. Envantè a ka grandi piti piti epi chak fich ka verifye ak amelyore sou tan.",footer:"Pwototip — enfòmasyon demonstrasyon yo dwe verifye anvan piblikasyon.",view:"Gade pwofil",found:"plant jwenn",family:"Fanmi",local:"Non lokal",region:"Rejyon",uses:"Itilizasyon",description:"Deskripsyon",verification:"Nòt verifikasyon",verificationText:"Fich demonstrasyon — verifye enfòmasyon botanik ak enfòmasyon lokal yo anvan piblikasyon."},
fr:{tagline:"La diversité végétale d'Haïti",navInventory:"Inventaire",navAbout:"À propos",pill:"INVENTAIRE DES PLANTES D'HAÏTI",heroTitle:"Découvrez les plantes d'Haïti.",heroText:"Un inventaire multilingue en croissance reliant les connaissances locales aux noms scientifiques et aux informations botaniques.",searchPlaceholder:"Rechercher par nom local, anglais, français ou scientifique…",statPlants:"plantes",statFamilies:"familles",statLanguages:"langues",eyebrow:"Explorer",inventoryTitle:"Inventaire des plantes",allFamilies:"Toutes les familles",allUses:"Tous les usages",aboutEyebrow:"L'idée",aboutTitle:"Noms locaux. Connaissances scientifiques. Haïti.",aboutText:"Flora Ayiti vise à documenter la diversité végétale d'Haïti tout en préservant les noms et connaissances utilisés par les communautés locales. L'inventaire pourra grandir progressivement et chaque fiche pourra être vérifiée et améliorée.",footer:"Prototype — les informations de démonstration doivent être vérifiées avant publication.",view:"Voir la fiche",found:"plantes trouvées",family:"Famille",local:"Noms locaux",region:"Région",uses:"Usages",description:"Description",verification:"Note de vérification",verificationText:"Fiche de démonstration — vérifier les informations botaniques et locales avant publication."}
};
const $=x=>document.getElementById(x);
function normalize(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
function allNames(p){return [...Object.values(p.name),p.scientific,...p.local].map(normalize).join(" ")} 
function visual(p,profile=false){
  if(p.scientific==="Theobroma cacao") return `<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Theobroma_cacao_fruit.jpg?width=900" alt="Theobroma cacao fruit" loading="lazy">`;
  return p.icon;
}
function populateFilters(){
 const fs=[...new Set(plants.map(p=>p.family))].sort(), us=[...new Set(plants.flatMap(p=>Object.values(p.uses).flat()))].sort();
 fs.forEach(x=>$("familyFilter").insertAdjacentHTML("beforeend",`<option value="${x}">${x}</option>`));
 us.forEach(x=>$("useFilter").insertAdjacentHTML("beforeend",`<option value="${x}">${x}</option>`));
}
function render(){
 const q=normalize($("search").value), f=$("familyFilter").value,u=$("useFilter").value;
 const shown=plants.filter(p=>(!q||allNames(p).includes(q))&&(!f||p.family===f)&&(!u||Object.values(p.uses).flat().includes(u)));
 $("resultText").textContent=`${shown.length} ${T[lang].found}`;
 $("plants").innerHTML=shown.map(p=>`<article class="card"><div class="photo">${visual(p)}</div><div class="body"><h3>${p.name[lang]}</h3><div class="scientific">${p.scientific}</div><div class="tags"><span class="tag">${p.family}</span><span class="tag">${p.region[lang]}</span></div><button class="view" onclick="openProfile(${plants.indexOf(p)})">${T[lang].view}</button></div></article>`).join("");
 $("plantCount").textContent=shown.length===plants.length?plants.length:shown.length;
 $("familyCount").textContent=new Set(plants.map(p=>p.family)).size;
}
function openProfile(i){const p=plants[i];$("profile").innerHTML=`<div class="profile"><div class="profile-photo">${visual(p,true)}</div><h2>${p.name[lang]}</h2><div class="scientific">${p.scientific}</div><p>${p.description[lang]}</p><dl><dt>${T[lang].family}</dt><dd>${p.family}</dd><dt>${T[lang].local}</dt><dd>${p.local.join(", ")}</dd><dt>${T[lang].region}</dt><dd>${p.region[lang]}</dd><dt>${T[lang].uses}</dt><dd>${p.uses[lang].join(", ")}</dd></dl><div class="verify"><b>${T[lang].verification}</b><br>${T[lang].verificationText}</div></div>`;$("modal").classList.remove("hidden")}
function apply(){document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[lang][e.dataset.i18n]);document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=T[lang][e.dataset.i18nPlaceholder]);render()}
async function loadPlants(){
  try{
    const response=await fetch("plants.json");
    plants=await response.json();
    populateFilters();
    apply();
  }catch(error){
    console.error("Could not load plant data:",error);
    document.getElementById("plants").innerHTML="<p>Plant data could not be loaded.</p>";
  }
}
$("language").addEventListener("change",e=>{lang=e.target.value;apply()});
$("search").addEventListener("input",render);
$("search").addEventListener("keyup",render);
$("familyFilter").addEventListener("change",render);
$("useFilter").addEventListener("change",render);
$("clear").addEventListener("click",()=>{$("search").value="";render();$("search").focus()});
$("close").addEventListener("click",()=>$("modal").classList.add("hidden"));
$("modal").addEventListener("click",e=>{if(e.target.id==="modal")$("modal").classList.add("hidden")});
loadPlants();

const $=x=>document.getElementById(x);
function allNames(p){return [...Object.values(p.name),p.scientific,...p.local].join(" ").toLowerCase()}
function populateFilters(){
 const fs=[...new Set(plants.map(p=>p.family))].sort(), us=[...new Set(plants.flatMap(p=>Object.values(p.uses).flat()))].sort();
 fs.forEach(x=>$("familyFilter").insertAdjacentHTML("beforeend",`<option value="${x}">${x}</option>`));
 us.forEach(x=>$("useFilter").insertAdjacentHTML("beforeend",`<option value="${x}">${x}</option>`));
}
function render(){
 const q=$("search").value.toLowerCase().trim(), f=$("familyFilter").value,u=$("useFilter").value;
 const shown=plants.filter(p=>(!q||allNames(p).includes(q))&&(!f||p.family===f)&&(!u||Object.values(p.uses).flat().includes(u)));
 $("resultText").textContent=`${shown.length} ${T[lang].found}`;
 $("plants").innerHTML=shown.map(p=>`<article class="card"><div class="photo">${p.icon}</div><div class="body"><h3>${p.name[lang]}</h3><div class="scientific">${p.scientific}</div><div class="tags"><span class="tag">${p.family}</span><span class="tag">${p.region[lang]}</span></div><button class="view" onclick="openProfile(${plants.indexOf(p)})">${T[lang].view}</button></div></article>`).join("");
 $("plantCount").textContent=shown.length===plants.length?plants.length:shown.length;
 $("familyCount").textContent=new Set(plants.map(p=>p.family)).size;
}
function openProfile(i){const p=plants[i];$("profile").innerHTML=`<div class="profile"><div class="profile-photo">${p.icon}</div><h2>${p.name[lang]}</h2><div class="scientific">${p.scientific}</div><p>${p.description[lang]}</p><dl><dt>${T[lang].family}</dt><dd>${p.family}</dd><dt>${T[lang].local}</dt><dd>${p.local.join(", ")}</dd><dt>${T[lang].region}</dt><dd>${p.region[lang]}</dd><dt>${T[lang].uses}</dt><dd>${p.uses[lang].join(", ")}</dd></dl><div class="verify"><b>${T[lang].verification}</b><br>${T[lang].verificationText}</div></div>`;$("modal").classList.remove("hidden")}
function apply(){document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[lang][e.dataset.i18n]);document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=T[lang][e.dataset.i18nPlaceholder]);render()}
async function loadPlants(){
  try{
    const response=await fetch("plants.json");
    plants=await response.json();
    populateFilters();
    apply();
  }catch(error){
    console.error("Could not load plant data:",error);
    document.getElementById("plants").innerHTML="<p>Plant data could not be loaded.</p>";
  }
}
$("language").onchange=e=>{lang=e.target.value;apply()};
loadPlants();$("search").oninput=render;$("familyFilter").onchange=render;$("useFilter").onchange=render;$("clear").onclick=()=>{$("search").value="";render()};$("close").onclick=()=>$("modal").classList.add("hidden");$("modal").onclick=e=>{if(e.target.id==="modal")$("modal").classList.add("hidden")};apply();
