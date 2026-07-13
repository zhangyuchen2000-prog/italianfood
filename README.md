# Daily Culinary — Reviewed Italian Library

This is a conservative rebuilt edition of the uploaded 944-card app.

## Reviewed library

Total: **787 cards**

- Sicilian recipes: **61**
- Italian classic recipe notes: **343**
- Ingredient pairing profiles: **320**
- Food culture: **38**
- Food science: **25**

## What was changed

- Removed **88** Sicilian recipe cards containing visibly truncated text.
- Removed **69** classic cards that were truncated, depended on missing page references, or were essays/product notes rather than self-contained recipes.
- Rewrote all **38** culture cards as concise paraphrases. Long quotations, footnote numbers, incomplete sentences and the generic unrelated study note were removed.
- Rewrote all **25** science cards. The aubergine card now explains the porous structure and precooking/salting mechanism instead of attributing the source claim to cool oil or crowding.
- Kept the **320** structured pairing profiles, removed duplicate values, and added a clear warning that a source affinity is not a rule for one finished dish.
- Changed the service worker so a missing legacy image cannot prevent the app from updating.

## Source limits

The uploaded package contained the app extraction, not standalone copies of *Made in Sicily*, *Italian Food* or *The Flavor Bible*. Those three sections were therefore checked for internal completeness and extraction defects, not claimed as a new page-by-page transcription of the books. Incomplete entries were deleted rather than guessed.

The food-science section was rewritten with the available *On Food and Cooking* source in mind. The culture section was rewritten from the extracted passages already present in the uploaded data.

## Upload to GitHub

Upload every file in this folder. Keep your existing `images` folder if you still want the old recipe and culture photographs. The new service worker will no longer fail when an image is absent.
