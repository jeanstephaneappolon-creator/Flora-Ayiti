FLORA AYITI — FINISHED STARTER WEBSITE
=======================================

This version is intended as the first publishable starter version of Flora Ayiti.

Included
--------
- Green/nature visual identity
- English / Kreyòl / Français interface
- 20 starter demonstration plant records
- Search by local, English, French and scientific names
- Family and use filters
- Plant/family counters
- Individual plant profiles
- Local names, scientific names, uses, regions and descriptions
- Verification notice for demonstration records
- Responsive desktop/mobile layout
- No database/server required for this first static version

IMPORTANT
---------
The 20 records are starter demonstration content. Before presenting Flora Ayiti
as an authoritative botanical database, verify taxonomy, local names, distribution,
uses and sources with reliable botanical references and qualified local contributors.

HOW TO MODIFY
-------------
1. Open script.js in a code editor.
2. Plant records are inside: const plants=[ ... ].
3. Add a new record following the same structure.
4. To change text/design, edit index.html or style.css.
5. Save the files and republish them.

PUBLISHING
----------
The simplest free route is GitHub Pages. Upload the website files to a public
GitHub repository and enable Pages. GitHub gives you a URL such as:
https://YOUR-USERNAME.github.io/flora-ayiti/

A custom domain is optional. You only need to buy one if you want an address
such as floraayiti.org instead of the free GitHub Pages address.


DATABASE STRUCTURE — IMPORTANT
==============================
The plant records now live in `plants.json`, separate from the website code.

To add a plant:
1. Open plants.json.
2. Copy an existing plant object.
3. Change its name, scientific name, family, local names, region, uses, icon and description.
4. Save the file.
5. Upload/commit the changed plants.json to GitHub.
6. GitHub Pages will serve the updated database.

The website reads plants.json automatically. You no longer need to edit script.js
just to add or remove plant records.

GITHUB PAGES
============
This folder is ready to publish as a static GitHub Pages site. It contains
index.html at the top level, plus style.css, script.js and plants.json.
