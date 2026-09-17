let plants=[];
let lang="ht";
let activeCategory="all";
const imageCache=new Map();

const T={
 en:{tagline:"Haiti's plant diversity",navHome:"Home",navInventory:"Plants",navAbout:"About",pill:"HAITI PLANT INVENTORY",heroTitle:"Discover the plants of Haiti.",heroText:"Explore plants, local names and scientific knowledge from Haiti in one growing inventory.",searchPlaceholder:"Search by local, French, English or scientific name...",catAll:"All",catTree:"Trees",catCrop:"Crops",catMedicinal:"Medicinal",catOther:"Other",statPlants:"plants",statFamilies:"families",statLanguages:"languages",eyebrow:"Explore",inventoryTitle:"Plant inventory",inventorySubtitle:"Real plant photographs, local names and scientific names.",allFamilies:"All families",allUses:"All uses",imageNote:"Photos are loaded from Wikimedia/Wikipedia.",aboutEyebrow:"The idea",aboutTitle:"Local names. Scientific knowledge. Haiti.",aboutText:"Flora Ayiti is designed to document Haiti's plant diversity while preserving the names and knowledge used by local communities. The inventory can grow gradually and each record can be checked and improved over time.",point1:"Grow gradually",point2:"Keep scientific names",point3:"Preserve local knowledge",footer:"Prototype — demonstration information should be verified before publication.",view:"View profile",found:"plants found",family:"Family",local:"Local names",region:"Region",uses:"Uses",verification:"Verification note",verificationText:"Demonstration record — verify botanical and local information before publication."},
 ht:{tagline:"Divèsite plant Ayiti",navHome:"Akèy",navInventory:"Plant yo",navAbout:"Sou nou",pill:"ENVANTÈ PLANT AYITI",heroTitle:"Dekouvri plant Ayiti yo.",heroText:"Eksplore plant yo, non lokal yo ak konesans syantifik sou Ayiti nan yon sèl envantè k ap grandi.",searchPlaceholder:"Chèche selon non lokal, franse, angle oswa non syantifik...",catAll:"Tout",catTree:"Pye bwa",catCrop:"Rekòt",catMedicinal:"Plant medsin",catOther:"Lòt",statPlants:"plant",statFamilies:"fanmi",statLanguages:"lang",eyebrow:"Eksplore",inventoryTitle:"Envantè plant",inventorySubtitle:"Vrè foto plant, non lokal ak non syantifik.",allFamilies:"Tout fanmi",allUses:"Tout itilizasyon",imageNote:"Foto yo soti nan Wikimedia/Wikipedia.",aboutEyebrow:"Lide a",aboutTitle:"Non lokal. Konesans syantifik. Ayiti.",aboutText:"Flora Ayiti fèt pou dokimante divèsite plant Ayiti pandan l ap konsève non ak konesans kominote lokal yo itilize. Envantè a ka grandi piti piti epi chak fich ka verifye ak amelyore sou tan.",point1:"Grandi piti piti",point2:"Kenbe non syantifik yo",point3:"Prezève konesans lokal",footer:"Pwototip — enfòmasyon demonstrasyon yo dwe verifye anvan piblikasyon.",view:"Gade pwofil",found:"plant jwenn",family:"Fanmi",local:"Non lokal",region:"Rejyon",uses:"Itilizasyon",verification:"Nòt verifikasyon",verificationText:"Fich demonstrasyon — verifye enfòmasyon botanik ak enfòmasyon lokal yo anvan piblikasyon."},
 fr:{tagline:"La diversité végétale d'Haïti",navHome:"Accueil",navInventory:"Plantes",navAbout:"À propos",pill:"INVENTAIRE DES PLANTES D'HAÏTI",heroTitle:"Découvrez les plantes d'Haïti.",heroText:"Explorez les plantes, les noms locaux et les connaissances scientifiques d'Haïti dans un inventaire en croissance.",searchPlaceholder:"Rechercher par nom local, français, anglais ou scientifique...",catAll:"Tout",catTree:"Arbres",catCrop:"Cultures",catMedicinal:"Médicinales",catOther:"Autres",statPlants:"plantes",statFamilies:"familles",statLanguages:"langues",eyebrow:"Explorer",inventoryTitle:"Inventaire des plantes",inventorySubtitle:"De vraies photos, noms locaux et noms scientifiques.",allFamilies:"Toutes les familles",allUses:"Tous les usages",imageNote:"Les photos proviennent de Wikimedia/Wikipedia.",aboutEyebrow:"L'idée",aboutTitle:"Noms locaux. Connaissances scientifiques. Haïti.",aboutText:"Flora Ayiti vise à documenter la diversité végétale d'Haïti tout en préservant les noms et connaissances utilisés par les communautés locales. L'inventaire pourra grandir progressivement et chaque fiche pourra être vérifiée et améliorée.",point1:"Grandir progressivement",point2:"Garder les noms scientifiques",point3:"Préserver les connaissances locales",footer:"Prototype — les informations de démonstration doivent être vérifiées avant publication.",view:"Voir la fiche",found:"plantes trouvées",family:"Famille",local:"Noms locaux",region:"Région",uses:"Usages",verification:"Note de vérification",verificationText:"Fiche de démonstration — vérifier les informations botaniques et locales avant publication."}
};

const $=id=>document.getElementById(id);
function normalize(v){return String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
function allNames(p){return [...Object.values(p.name||{}),p.scientific,...(p.local||[]),p.family,...Object.values(p.uses||{}).flat()].map(normalize).join(" ")}
function categoryOf(p){
 const s=normalize(p.scientific);
 const medicinal=["moringa oleifera","azadirachta indica","aloe vera","hibiscus rosa-sinensis"];
 const trees=["mangifera indica","cocos nucifera","persea americana","artocarpus altilis","carica papaya","theobroma cacao","coffea arabica","psidium guajava","tamarindus indica","moringa oleifera","azadirachta indica"];
 const crops=["manihot esculenta","musa × paradisiaca","saccharum officinarum","zea mays","phaseolus vulgaris","ipomoea batatas","ananas comosus","theobroma cacao","coffea arabica"];
 if(medicinal.includes(s)) return "medicinal";
 if(crops.includes(s)) return "crop";
 if(trees.includes(s)) return "tree";
 return "other";
}
function emoji(p){return p.icon||"🌿"}

async function wikiImage(scientific){
 if(imageCache.has(scientific)) return imageCache.get(scientific);
 try{
  const url=`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(scientific)}&gsrnamespace=0&prop=pageimages&piprop=thumbnail&pithumbsize=900&format=json&origin=*`;
  const r=await fetch(url);
  if(!r.ok) throw new Error("image request failed");
  const data=await r.json();
  const pages=Object.values(data.query?.pages||{});
  const src=pages.find(x=>x.thumbnail?.source)?.thumbnail?.source||null;
  imageCache.set(scientific,src);
  return src;
 }catch(e){
  imageCache.set(scientific,null);
  return null;
 }
}

function imageBox(p,profile=false){
 const safe=normalize(p.scientific).replace(/[^a-z0-9]+/g,"-");
 return `<div class="${profile?"profile-photo":"photo"}" data-image-for="${safe}"><span class="placeholder">${emoji(p)}</span></div>`;
}

async function hydrateImages(list){
 await Promise.all(list.map(async p=>{
  const safe=normalize(p.scientific).replace(/[^a-z0-9]+/g,"-");
  const nodes=document.querySelectorAll(`[data-image-for="${safe}"]`);
  if(!nodes.length)return;
  const src=await wikiImage(p.scientific);
  if(!src)return;
  nodes.forEach(node=>{
   node.innerHTML=`<img src="${src}" alt="${(p.name?.en||p.scientific).replace(/"/g,"&quot;")}" loading="lazy">`;
   const img=node.querySelector("img");
   img.addEventListener("load",()=>img.classList.add("loaded"),{once:true});
  });
 }));
}

function populateFilters(){
 const currentFamily=$("familyFilter").value,currentUse=$("useFilter").value;
 const families=[...new Set(plants.map(p=>p.family).filter(Boolean))].sort();
 const uses=[...new Set(plants.flatMap(p=>Object.values(p.uses||{}).flat()))].sort();
 $("familyFilter").innerHTML=`<option value="">${T[lang].allFamilies}</option>`+families.map(x=>`<option value="${x}">${x}</option>`).join("");
 $("useFilter").innerHTML=`<option value="">${T[lang].allUses}</option>`+uses.map(x=>`<option value="${x}">${x}</option>`).join("");
 if(families.includes(currentFamily))$("familyFilter").value=currentFamily;
 if(uses.includes(currentUse))$("useFilter").value=currentUse;
}

function filteredPlants(){
 const q=normalize($("search").value),f=$("familyFilter").value,u=$("useFilter").value;
 return plants.filter(p=>{
  const search=!q||allNames(p).includes(q);
  const family=!f||p.family===f;
  const use=!u||Object.values(p.uses||{}).flat().includes(u);
  const category=activeCategory==="all"||categoryOf(p)===activeCategory;
  return search&&family&&use&&category;
 });
}

function render(){
 const shown=filteredPlants();
 $("resultText").textContent=`${shown.length} ${T[lang].found}`;
 $("plantCount").textContent=shown.length;
 $("familyCount").textContent=new Set(plants.map(p=>p.family)).size;
 if(!shown.length){$("plants").innerHTML=`<div class="empty">${lang==="ht"?"Pa jwenn okenn plant.":lang==="fr"?"Aucune plante trouvée.":"No plants found."}</div>`;return;}
 $("plants").innerHTML=shown.map(p=>{
  const c=categoryOf(p);
  return `<article class="card">${imageBox(p)}<div class="card-body"><h3>${p.name?.[lang]||p.name?.en||""}</h3><div class="scientific">${p.scientific}</div><div class="tags"><span class="tag ${c}">${T[lang][c==="tree"?"catTree":c==="crop"?"catCrop":c==="medicinal"?"catMedicinal":"catOther"]}</span><span class="tag">${p.family}</span></div><button class="view" data-index="${plants.indexOf(p)}">${T[lang].view} →</button></div></article>`;
 }).join("");
 document.querySelectorAll(".view").forEach(btn=>btn.addEventListener("click",()=>openProfile(Number(btn.dataset.index))));
 hydrateImages(shown);
}

function openProfile(i){
 const p=plants[i];
 $("profile").innerHTML=`<div class="profile">${imageBox(p,true)}<h2>${p.name?.[lang]||p.name?.en||""}</h2><div class="scientific">${p.scientific}</div><p>${p.description?.[lang]||p.description?.en||""}</p><dl><dt>${T[lang].family}</dt><dd>${p.family}</dd><dt>${T[lang].local}</dt><dd>${(p.local||[]).join(", ")}</dd><dt>${T[lang].region}</dt><dd>${p.region?.[lang]||p.region?.en||""}</dd><dt>${T[lang].uses}</dt><dd>${(p.uses?.[lang]||p.uses?.en||[]).join(", ")}</dd></dl><div class="verify"><b>${T[lang].verification}</b><br>${T[lang].verificationText}</div></div>`;
 $("modal").classList.remove("hidden");
 $("modal").setAttribute("aria-hidden","false");
 hydrateImages([p]);
}

function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(T[lang][key])el.textContent=T[lang][key]});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const key=el.dataset.i18nPlaceholder;if(T[lang][key])el.placeholder=T[lang][key]});
 populateFilters();
 render();
}

async function loadPlants(){
 try{
  const r=await fetch("plants.json");
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  plants=await r.json();
  populateFilters();
  applyLanguage();
 }catch(e){
  console.error(e);
  $("plants").innerHTML=`<div class="empty">Unable to load the plant inventory.</div>`;
 }
}

document.addEventListener("DOMContentLoaded",()=>{
 $("language").addEventListener("change",e=>{lang=e.target.value;applyLanguage()});
 $("search").addEventListener("input",render);
 $("familyFilter").addEventListener("change",render);
 $("useFilter").addEventListener("change",render);
 $("clear").addEventListener("click",()=>{$("search").value="";render();$("search").focus()});
 document.querySelectorAll(".quick").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;document.querySelectorAll(".quick").forEach(x=>x.classList.remove("active"));btn.classList.add("active");render()}));
 document.querySelectorAll(".view-mode").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".view-mode").forEach(x=>x.classList.remove("active"));btn.classList.add("active");$("plants").classList.toggle("list",btn.dataset.view==="list")}));
 $("close").addEventListener("click",()=>{$("modal").classList.add("hidden");$("modal").setAttribute("aria-hidden","true")});
 $("modal").addEventListener("click",e=>{if(e.target===$("modal")){$("modal").classList.add("hidden");$("modal").setAttribute("aria-hidden","true")}});
 loadPlants();
});
