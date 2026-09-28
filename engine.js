/* DryMath engine - honest food dehydration math. Pure functions, no DOM. */
var DryEngine = (function () {
  function r2(x) { return Math.round(x * 100) / 100; }
  function r1(x) { return Math.round(x * 10) / 10; }

  /* weight math: dried weight = fresh x (1 - water loss) */
  function driedWeightLb(freshLb, lossPct) {
    return r2(freshLb * (1 - lossPct / 100));
  }
  function freshNeededLb(driedTargetLb, lossPct) {
    if (lossPct >= 100) return null;
    return r2(driedTargetLb / (1 - lossPct / 100));
  }

  /* jerky: 60-70% loss is the working range; ~35% yield typical */
  var JERKY_YIELD = 35; /* percent of fresh meat weight you keep */
  function jerkyYieldLb(freshMeatLb) { return r2(freshMeatLb * JERKY_YIELD / 100); }
  function costPerLbJerky(meatPricePerLb, yieldPct) {
    if (yieldPct <= 0) return null;
    return r2(meatPricePerLb / (yieldPct / 100));
  }
  function yieldVerdict(yieldPct) {
    if (yieldPct < 25) return 'dried hard - under 25% yield is brittle territory; snacking fine, jaw workout';
    if (yieldPct <= 40) return 'typical - 25-40% yield is where good jerky lives';
    return 'soft - over 40% yield is moister; tastier fresh, but refrigerate, it will not shelf-store';
  }

  /* herbs: 3 parts fresh make about 1 part dried */
  var HERB_RATIO = 3;
  function herbDriedTbsp(freshTbsp) { return r1(freshTbsp / HERB_RATIO); }
  function herbFreshTbsp(driedTbsp) { return r1(driedTbsp * HERB_RATIO); }

  /* drying windows: [lowHours, highHours, tempF] */
  var DRYING = {
    jerky:    { low: 4, high: 8, tempF: 160, note: 'Bend test: it should crack, not snap. Snap means overdone.' },
    apple:    { low: 6, high: 12, tempF: 135, note: 'Leathery and pliable, no moisture when torn.' },
    banana:   { low: 6, high: 10, tempF: 135, note: 'Chewy, not crisp - crisp banana chips are fried, not dried.' },
    herbs:    { low: 1, high: 4, tempF: 95, note: 'Low and slow; herbs lose their oils to heat fast.' },
    tomatoes: { low: 6, high: 12, tempF: 135, note: 'Leathery to crisp, your call; condition before jarring.' },
    mango:    { low: 8, high: 12, tempF: 135, note: 'Pliable leather, no wet spots in the middle.' }
  };
  function dryingWindow(food) { return DRYING[food] || null; }

  /* electricity */
  function electricityCost(watts, hours, ratePerKwh) {
    return r2(watts * hours / 1000 * ratePerKwh);
  }

  /* trays */
  function traysNeeded(pieces, piecesPerTray) {
    if (piecesPerTray <= 0) return null;
    return Math.ceil(pieces / piecesPerTray);
  }

  return {
    JERKY_YIELD: JERKY_YIELD, HERB_RATIO: HERB_RATIO, DRYING: DRYING,
    driedWeightLb: driedWeightLb, freshNeededLb: freshNeededLb,
    jerkyYieldLb: jerkyYieldLb, costPerLbJerky: costPerLbJerky, yieldVerdict: yieldVerdict,
    herbDriedTbsp: herbDriedTbsp, herbFreshTbsp: herbFreshTbsp,
    dryingWindow: dryingWindow, electricityCost: electricityCost, traysNeeded: traysNeeded
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = DryEngine;
