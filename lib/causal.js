// Verticals and use cases, taken from the stability build (~/projects/stability-by-design).
// Pictures in public/verticals. Regenerate if that build's content changes.
export const verticals = [
 {
  "code": "steel",
  "name": "Steel",
  "core": "Hot, safe & on grade",
  "sub": "No uncontrolled molten metal · every heat on chemistry · every coil traced to its certificate",
  "must": "Power against the peak",
  "color": "#A5551F",
  "conds": [
   "Heats on chemistry & temperature",
   "Safe molten-metal work",
   "Caster running clean",
   "Scrap mix in spec"
  ]
 },
 {
  "code": "chemicals",
  "name": "Chemicals & Polymers",
  "core": "Safe, on grade & in the envelope",
  "sub": "No loss of containment · every lot on grade · every change through MOC",
  "must": "Grade transitions at best demonstrated",
  "color": "#6A3A9E",
  "conds": [
   "IV & colour on grade",
   "Safe operating limits held",
   "SIS & interlocks healthy",
   "Feed & catalyst on ratio"
  ]
 },
 {
  "code": "pharma",
  "name": "Pharmaceuticals",
  "core": "State of control",
  "sub": "Right-first-time batches · released on time · within the registered design space",
  "must": "Release by exception",
  "color": "#2A5D9C",
  "conds": [
   "Consistency across batches & shifts",
   "CQAs within spec",
   "CPPs inside proven ranges",
   "Timely investigation & CAPA"
  ]
 },
 {
  "code": "beverage",
  "name": "Beverage",
  "core": "In spec, in date, on rate",
  "sub": "Every container to formula · coded and traceable · at the filler's rated speed",
  "must": "Fill giveaway, valve by valve",
  "color": "#A33232",
  "conds": [
   "Brix & CO2 in spec",
   "Fill level & net content",
   "Double seams in spec",
   "Treated water in spec"
  ]
 },
 {
  "code": "building",
  "name": "Building Products",
  "core": "Stable, in spec & on rate",
  "sub": "Every bundle to its listed spec · emissions in permit · output matched to storm season",
  "must": "Lots at warranty risk",
  "color": "#5F7A1F",
  "conds": [
   "Asphalt on temp & softening point",
   "Safe hot-asphalt work",
   "Coating weight in spec",
   "Mat splices & web tension"
  ]
 },
 {
  "code": "snack",
  "name": "Snack Food",
  "core": "Safe, on spec & on rate",
  "sub": "Every bag safe, on spec and on weight · shipped the same day",
  "must": "Trace a lot in minutes",
  "color": "#8E6A12",
  "conds": [
   "Fry oil in range",
   "Moisture, oil & salt on target",
   "Foreign-material detection working",
   "Allergen changeover verified"
  ]
 },
 {
  "code": "defense",
  "name": "Aerospace & Defense",
  "core": "Stable & capable",
  "sub": "Conforming hardware · delivered on schedule · built to the contract baseline",
  "must": "First article, every characteristic",
  "color": "#3F3FA0",
  "conds": [
   "Configuration matches baseline",
   "Key characteristics capable",
   "Material traceable & genuine",
   "Timely corrective action"
  ]
 },
 {
  "code": "automotive",
  "name": "Automotive",
  "core": "Capable & in control",
  "sub": "Zero defects shipped · every JIT window met · inside the PPAP-approved process",
  "must": "Stay off controlled shipping",
  "color": "#95306F",
  "conds": [
   "First-pass yield steady",
   "Key characteristics capable",
   "Error-proofing working",
   "Timely 8D & containment"
  ]
 },
 {
  "code": "meddevice",
  "name": "Medical Devices",
  "core": "Validated & in control",
  "sub": "Every lot released against its DHR · sterile · inside the validated process",
  "must": "From complaint back to the process",
  "color": "#1F7A82",
  "conds": [
   "Seal strength in spec",
   "Bond & cure capable",
   "Leak test passing",
   "Timely CAPA & complaints"
  ]
 }
];

export const useCases = [
 {
  "slug": "schedule-optimization",
  "name": "Schedule optimization",
  "tag": "Sequence around the real constraint",
  "what": "Due-date order loses the difference to changeovers. Build the from-to changeover matrix from the floor's own events and sequence inside each due-date bucket.",
  "color": "#0d6c76",
  "good": [
   "Changeover matrix from the floor's own events",
   "Family-wheel sequence inside each due-date bucket",
   "Changeover hours fall",
   "The hours go to late orders"
  ],
  "measures": [
   "Changeover hours per week",
   "Schedule adherence",
   "On time, in full"
  ],
  "bad": [
   "Due-date order",
   "Dark-to-light flavor changes",
   "+3.5 h per change",
   "Line short of hours",
   "Late orders"
  ]
 },
 {
  "slug": "launch-ramp-rca",
  "name": "Launch ramp-up",
  "tag": "Root cause at the speed of the ramp",
  "what": "A new product's first months are lost to a dozen small causes. Tie each loss to the lots, stations and signals that made it, rank them by output lost, and keep each fix's before-and-after.",
  "color": "#6a3a9e",
  "good": [
   "Losses ranked weekly by output lost",
   "Fixes land in order of what they are worth",
   "Each fix checked against the lots after it",
   "Rate reached sooner"
  ],
  "measures": [
   "First-pass yield against the launch curve",
   "Rate against the launch curve",
   "Weeks to rate"
  ],
  "bad": [
   "UV cure dose below window",
   "Weak bonds",
   "34% of lost output",
   "Complaints",
   "Yield under plan"
  ]
 },
 {
  "slug": "asset-reliability",
  "name": "Asset reliability and stability",
  "tag": "Fix it in the planned window",
  "what": "A wearing asset shows up first as instability: more heat to hold temperature, more energy per pound, more load for the same cut. Trend a health index from the tags you already have, against the stability of the process it serves.",
  "color": "#a3302a",
  "good": [
   "Health index trended against the line's stability",
   "Flag weeks before the failure line",
   "Fix booked into a planned window",
   "Process held in band throughout"
  ],
  "measures": [
   "Unplanned hours",
   "Time the process spends near its edges",
   "Planned versus breakdown work"
  ],
  "bad": [
   "Fouling exchanger",
   "Fryer works harder to hold 365°F",
   "Oil temperature recovery slows",
   "Product near its edge",
   "Unplanned clean"
  ]
 },
 {
  "slug": "energy-per-unit",
  "name": "Energy",
  "tag": "Every plant at its own best day",
  "what": "Benchmarks get explained away; a plant's own best day does not. Find each plant's best demonstrated energy per unit and the practices behind it, and make them standard work.",
  "color": "#b5730c",
  "good": [
   "Best day found from the plant's own data",
   "Practices from best days made standard",
   "Average day closes on best",
   "Peak held inside the contract"
  ],
  "measures": [
   "Energy per unit against best day",
   "Billed peak demand",
   "Idle hours of running equipment"
  ],
  "bad": [
   "Part loads at shift change",
   "More restarts",
   "kWh per unit up",
   "Gap to best day"
  ]
 },
 {
  "slug": "supply-disruption",
  "name": "Supply disruption",
  "tag": "Name the orders at risk before the customer does",
  "what": "A supplier slip reaches the plant as an email and the customer as a late order. Join days of cover, the supplier's new date and the schedule, name the orders a shortfall hits, and test each re-plan against them.",
  "color": "#1d4a73",
  "good": [
   "Cover, new dates and schedule joined",
   "Re-plan tested order by order",
   "Only approved alternates offered",
   "Customers told before the miss"
  ],
  "measures": [
   "Orders at risk",
   "Days of cover against lead time",
   "On time, in full"
  ],
  "bad": [
   "Supplier slips 9 days",
   "Cover below lead time",
   "Stock-out on day 7",
   "Five orders miss"
  ]
 },
 {
  "slug": "closed-loop-spc",
  "name": "Closed-loop quality",
  "tag": "Stop the escape at the run rule",
  "what": "Control limits catch a process that has gone wrong; run rules catch one that is going wrong, if someone reads the chart in time. Read every chart continuously and hold what a run-rule hit touched until quality decides.",
  "color": "#2e7d4c",
  "good": [
   "Run rules read continuously",
   "Lots since the drift held",
   "Correction made at the cause",
   "Nothing ships out of spec"
  ],
  "measures": [
   "Run-rule hits closed",
   "Escapes",
   "Giveaway"
  ],
  "bad": [
   "Auger change",
   "Mean shifts up",
   "7 points above center",
   "Drift continues",
   "Short or overfilled bags"
  ]
 }
];
