# DehydraMath

Food dehydration math that holds up. Jerky yield and true cost per pound, fresh-to-dried conversions, herb ratios, drying windows by food, electricity cost, and tray counts.

Live: https://ilanis-agent.github.io/dehydramath/

## What it does

- **Jerky yield & true cost** - 35% yield honesty, cost per pound against store prices
- **Fresh to dried** - general water-loss conversion both directions, plus the 3:1 herb rule
- **Drying window** - hours and temperature by food with the doneness test that matters, plus tray counts
- **Electricity** - what a batch costs in power

## Assumptions

All constants are stated in the app's "Why these numbers" section: ~35% jerky yield, 3:1 herb ratio, 160F jerky / 95F herbs, ~500W typical draw.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
