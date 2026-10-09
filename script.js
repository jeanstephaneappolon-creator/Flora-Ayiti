let plants = [];
let lang = "ht";
let activeProfileIndex = null;

const T={
en:{tagline:"Haiti's plant diversity",navInventory:"Inventory",navAbout:"About",pill:"HAITI PLANT INVENTORY",heroTitle:"Discover the plants of Haiti.",heroText:"A growing multilingual inventory connecting local knowledge with scientific names and botanical information.",searchPlaceholder:"Search by local, English, French or scientific name…",statPlants:"plants",statFamilies:"families",statLanguages:"languages",eyebrow:"Explore",inventoryTitle:"Plant inventory",allFamilies:"All families",allUses:"All uses",aboutEyebrow:"The idea",aboutTitle:"Local names. Scientific knowledge. Haiti.",aboutText:"Flora Ayiti is designed to document Haiti's plant diversity while preserving the names and knowledge used by local communities. The inventory can grow gradually and each record can be checked and improved over time.",footer:"Flora Ayiti — working inventory. Records should be verified and enriched before formal publication.",view:"View profile",found:"plants found",family:"Family",local:"Local names",region:"Region",uses:"Uses",description:"Description",verification:"Verification note",verificationText:"Working record — verify botanical and local information before formal publication.",source:"Source",noData:"Plant data could not be loaded."},
ht:{tagline:"Divèsite plant Ayiti",navInventory:"Envantè",navAbout:"Sou pwojè a",pill:"ENVANTÈ PLANT AYITI",heroTitle:"Dekouvri plant Ayiti yo.",heroText:"Yon envantè plizyè lang k ap konekte konesans lokal ak non syantifik ak enfòmasyon botanik.",searchPlaceholder:"Chèche non lokal, kreyòl, franse, angle oswa syantifik…",statPlants:"plant",statFamilies:"fanmi",statLanguages:"lang",eyebrow:"Eksplore",inventoryTitle:"Envantè plant",allFamilies:"Tout fanmi",allUses:"Tout itilizasyon",aboutEyebrow:"Lide a",aboutTitle:"Non lokal. Konesans syantifik. Ayiti.",aboutText:"Flora Ayiti fèt pou dokimante divèsite plant Ayiti pandan l ap konsève non ak konesans kominote lokal yo itilize.",footer:"Flora Ayiti — envantè k ap devlope. Verifye epi amelyore fich yo anvan piblikasyon ofisyèl.",view:"Gade pwofil",found:"plant jwenn",family:"Fanmi",local:"Non lokal",region:"Rejyon",uses:"Itilizasyon",description:"Deskripsyon",verification:"Nòt verifikasyon",verificationText:"Fich k ap devlope — verifye enfòmasyon botanik ak enfòmasyon lokal yo anvan piblikasyon ofisyèl.",source:"Sous",noData:"Nou pa t kapab chaje done plant yo."},
fr:{tagline:"La diversité végétale d'Haïti",navInventory:"Inventaire",navAbout:"À propos",pill:"INVENTAIRE DES PLANTES D'HAÏTI",heroTitle:"Découvrez les plantes d'Haïti.",heroText:"Un inventaire multilingue en croissance reliant les connaissances locales aux noms scientifiques et aux informations botaniques.",searchPlaceholder:"Rechercher par nom local, anglais, français ou scientifique…",statPlants:"plantes",statFamilies:"familles",statLanguages:"langues",eyebrow:"Explorer",inventoryTitle:"Inventaire des plantes",allFamilies:"Toutes les familles",allUses:"Tous les usages",aboutEyebrow:"L'idée",aboutTitle:"Noms locaux. Connaissances scientifiques. Haïti.",aboutText:"Flora Ayiti vise à documenter la diversité végétale d'Haïti tout en préservant les noms et connaissances utilisés par les communautés locales.",footer:"Flora Ayiti — inventaire en développement. Vérifier et enrichir les fiches avant publication officielle.",view:"Voir la fiche",found:"plantes trouvées",family:"Famille",local:"Noms locaux",region:"Région",uses:"Usages",description:"Description",verification:"Note de vérification",verificationText:"Fiche en développement — vérifier les informations botaniques et locales avant publication officielle.",source:"Source",noData:"Impossible de charger les données des plantes."}
};

const $ = id => document.getElementById(id);
function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().trim();
}
function textFor(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.en ?? obj.ht ?? obj.fr ?? "";
}
function arrayFor(obj) {
  const value = textFor(obj);
  return Array.isArray(value) ? value : (value ? [value] : []);
}
function allNames(p) {
  return [...Object.values(p.name || {}), p.scientific, ...(p.local || [])].map(normalize).join(" ");
}
function visual(p) {
  if (!p.image) return `<div aria-label="${p.name?.[lang] || p.name?.en || p.scientific}">🌿</div>`;
  return `<img src="${p.image}" alt="${p.name?.[lang] || p.name?.en || p.scientific}" loading="lazy" onerror="this.parentElement.innerHTML='<div aria-label=&quot;Plant photo unavailable&quot;>🌿</div>'">`;
}

/* Display labels are translated, while filter matching uses the original data value. */
const USE_LABELS = {
  en: {"Food":"Food","Juice":"Juice","Processing":"Processing","Medicinal":"Medicinal","Medicine":"Medicine","Ornamental":"Ornamental","Timber":"Timber","Construction":"Construction","Fuel":"Fuel","Shade":"Shade","Animal feed":"Animal feed","Fodder":"Fodder","Fiber":"Fiber","Oil":"Oil","Spice":"Spice","Drink":"Drink","Beverage":"Beverage","Cosmetic":"Cosmetic","Cultural":"Cultural","Environmental":"Environmental","Agriculture":"Agriculture","Craft":"Craft","Dye":"Dye","Hedge":"Hedge","Erosion control":"Erosion control"},
  ht: {"Food":"Manje","Juice":"Ji","Processing":"Transfòmasyon","Medicinal":"Medisinal","Medicine":"Medikaman","Ornamental":"Dekoratif","Timber":"Bwa","Construction":"Konstriksyon","Fuel":"Konbistib","Shade":"Lonbraj","Animal feed":"Manje bèt","Fodder":"Fouraj","Fiber":"Fib","Oil":"Lwil","Spice":"Epis","Drink":"Bwason","Beverage":"Bwason","Cosmetic":"Kosmetik","Cultural":"Kiltirèl","Environmental":"Anviwònman","Agriculture":"Agrikilti","Craft":"Atizana","Dye":"Koloran","Hedge":"Lizyè","Erosion control":"Kontwòl ewozyon"},
  fr: {"Food":"Alimentation","Juice":"Jus","Processing":"Transformation","Medicinal":"Médicinal","Medicine":"Médicament","Ornamental":"Ornemental","Timber":"Bois","Construction":"Construction","Fuel":"Combustible","Shade":"Ombre","Animal feed":"Alimentation animale","Fodder":"Fourrage","Fiber":"Fibre","Oil":"Huile","Spice":"Épice","Drink":"Boisson","Beverage":"Boisson","Cosmetic":"Cosmétique","Cultural":"Culturel","Environmental":"Environnemental","Agriculture":"Agriculture","Craft":"Artisanat","Dye":"Colorant","Hedge":"Haie","Erosion control":"Lutte contre l’érosion"}
};
function useLabel(value) {
  return (USE_LABELS[lang] && USE_LABELS[lang][value]) || value;
}
function plantUses(p) {
  return arrayFor(p.uses);
}

function populateFilters() {
  const families = [...new Set(plants.map(p => p.family).filter(Boolean))].sort();
  const familyFilter = $("familyFilter");
  const useFilter = $("useFilter");
  const oldFamily = familyFilter.value;
  const oldUse = useFilter.value;

  familyFilter.innerHTML = `<option value="">${T[lang].allFamilies}</option>`;
  families.forEach(family => familyFilter.insertAdjacentHTML("beforeend", `<option value="${family}">${family}</option>`));
  if (families.includes(oldFamily)) familyFilter.value = oldFamily;

  const allUses = [...new Set(plants.flatMap(p => Object.values(p.uses || {}).flat()).filter(Boolean))].sort();
  useFilter.innerHTML = `<option value="">${T[lang].allUses}</option>`;
  allUses.forEach(use => useFilter.insertAdjacentHTML("beforeend", `<option value="${use}">${useLabel(use)}</option>`));
  if (allUses.includes(oldUse)) useFilter.value = oldUse;
}

function render() {
  const q = normalize($("search").value);
  const family = $("familyFilter").value;
  const use = $("useFilter").value;
  const shown = plants.filter(p =>
    (!q || allNames(p).includes(q)) &&
    (!family || p.family === family) &&
    (!use || Object.values(p.uses || {}).flat().includes(use))
  );

  $("resultText").textContent = `${shown.length} ${T[lang].found}`;
  $("plants").innerHTML = shown.map(p => `<article class="card">
    <div class="photo">${visual(p)}</div>
    <div class="body">
      <h3>${p.name?.[lang] || p.name?.en || p.scientific}</h3>
      <div class="scientific">${p.scientific}</div>
      <div class="tags"><span class="tag">${p.family}</span><span class="tag">${textFor(p.region)}</span></div>
      <button class="view" onclick="openProfile(${plants.indexOf(p)})">${T[lang].view}</button>
    </div>
  </article>`).join("");

  $("plantCount").textContent = shown.length;
  $("familyCount").textContent = new Set(plants.map(p => p.family)).size;
}

function openProfile(index) {
  activeProfileIndex = index;
  const p = plants[index];
  if (!p) return;
  $("profile").innerHTML = `<div class="profile">
    <div class="profile-photo">${visual(p)}</div>
    <h2>${p.name?.[lang] || p.name?.en || p.scientific}</h2>
    <div class="scientific">${p.scientific}</div>
    <p>${textFor(p.description)}</p>
    <dl>
      <dt>${T[lang].family}</dt><dd>${p.family || "—"}</dd>
      <dt>${T[lang].local}</dt><dd>${(p.local || []).join(", ") || "—"}</dd>
      <dt>${T[lang].region}</dt><dd>${textFor(p.region) || "—"}</dd>
      <dt>${T[lang].uses}</dt><dd>${plantUses(p).map(useLabel).join(", ") || "—"}</dd>
    </dl>
    <div class="source-note"><b>${T[lang].source}</b><br>${p.source || "Working Flora Ayiti record"}</div>
    <div class="verify"><b>${T[lang].verification}</b><br>${T[lang].verificationText}</div>
  </div>`;
  $("modal").classList.remove("hidden");
}

function apply() {
  document.documentElement.lang = lang === "ht" ? "ht" : lang;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (T[lang][key] != null) element.textContent = T[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    if (T[lang][key] != null) element.placeholder = T[lang][key];
  });
  populateFilters();
  render();
  if (activeProfileIndex !== null && !$("modal").classList.contains("hidden")) {
    openProfile(activeProfileIndex);
  }
}

async function loadPlants() {
  try {
    const response = await fetch("plants.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    plants = await response.json();
    if (!Array.isArray(plants)) throw new Error("plants.json must contain an array");
    apply();
  } catch (error) {
    console.error("Could not load plant data:", error);
    $("plants").innerHTML = `<p>${T[lang].noData || "Plant data could not be loaded."}</p>`;
  }
}

$("language").value = lang;
$("language").addEventListener("change", event => {
  lang = event.target.value;
  apply();
});
$("search").addEventListener("input", render);
$("familyFilter").addEventListener("change", render);
$("useFilter").addEventListener("change", render);
$("clear").addEventListener("click", () => {
  $("search").value = "";
  render();
  $("search").focus();
});
$("close").addEventListener("click", () => {
  $("modal").classList.add("hidden");
  activeProfileIndex = null;
});
$("modal").addEventListener("click", event => {
  if (event.target.id === "modal") {
    $("modal").classList.add("hidden");
    activeProfileIndex = null;
  }
});
loadPlants();
