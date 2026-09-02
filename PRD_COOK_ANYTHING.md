# PRD: Cook Anything, With Aanya as a Helpful Suggestion

## Goal

Make it obvious that every compatible recipe is available to cook at any time. Aanya recommends a useful option, but never creates a gate or requires users to choose a daily quest.

## User problems

1. The persistent Veg, Egg, and Non-veg control consumes scarce phone space and looks tied to the player title.
2. Diet-incompatible recipes and skills can still appear in Collections and Skills.
3. Dishes reads as a completed-only collection, so users can infer that the Aanya recommendation is the only cookable option.
4. The current card language makes swiping feel like accepting or rejecting a daily commitment.
5. Swipe instructions sit outside the thing that users need to swipe.
6. The mission heading includes an unnecessary safety-action sentence.

## Product decisions

1. Move diet preference into Settings. It remains editable, but never occupies the top bar.
2. Apply the diet preference to recipe browsing, Roadmap, Aanya suggestions, Skills, and recipe-linked Collections.
3. Rename My dishes to Dishes. Show a completed-dishes shelf first, then a searchable library of every compatible recipe.
4. Replace daily quests with Aanya's suggestion deck. Right swipe means “Cook this” and opens the recipe. Left swipe means “Show another idea.” Cooking any recipe earns its normal XP, skills, streak, badges, and collection progress.
5. Put swipe guidance inside the draggable recommendation card. Use plain, directional feedback: “COOK THIS” and “ANOTHER IDEA.”
6. Add an always-visible “Browse all dishes” action on Home.
7. Remove “Do the action. Then tap when your hands are safe.” from the recipe mission heading.

## Acceptance criteria

1. A phone user sees no diet selector in the app header.
2. Diet can be changed in Settings and all eligible page content refreshes.
3. Veg users do not see Egg or Non-veg recipes in the Dishes library, Roadmap, or recipe-linked Collections; Skills only show skills trained by at least one compatible recipe.
4. Dishes has a “Made by you” section and a searchable “Browse all dishes” section.
5. Home clearly states that Aanya is suggesting a dish, not assigning a daily quest.
6. Both swipe directions have distinct visual feedback and understandable outcomes.
7. Every recipe can still be opened and completed directly from Dishes or Roadmap.
