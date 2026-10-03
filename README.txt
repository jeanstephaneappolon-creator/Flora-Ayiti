# Flora Ayiti — Website data update

This package keeps the existing Flora Ayiti prototype interface and updates its plant database.

## Database basis
- The uploaded Word document is the primary content source for the plants it contains.
- The existing prototype plants not present in the Word document are retained so prior website content is not erased.
- A small number of requested prototype entries (for example corn) were not present in the Word document; those are explicitly marked in the source field as retained/added outside the Word document.
- Scientific names are kept separate from vernacular names so language switching does not alter the botanical identifier.

## Current inventory
29 records.

## Interface preserved
- Green/nature Flora Ayiti identity
- Multilingual switcher: Kreyòl / Français / English
- Search by names and scientific name
- Family and use filters
- Plant cards and profile modal
- Responsive layout

## Images
Plant photos use Wikimedia Commons redirect URLs. The website loads them remotely. Before public launch, replace or locally host the selected images and retain the applicable attribution/license information.

## Important verification points
The current Word document itself says that local names and uses should continue to be verified with communities as the inventory grows. The website therefore labels records as working records rather than final publications.


Image update notes
- Mango, sweet potato, and cassava now use the photographs from the current Flora Ayiti Word document.
- Tropical almond, yam, pigeon pea, Haitian oak, onion, mahogany, lime, and grapefruit use new real-plant photographs from Wikimedia Commons.
- The hero background now uses a green mountain landscape from Milot, Haiti, matching the earlier nature/mountain look.
- Wikimedia image credits and licenses are recorded in the corresponding plant source fields in plants.json.
