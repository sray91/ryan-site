/**
 * Seed Marketplace V2 data: Solutions, Starter Stacks, Things We Like
 *
 * Run with: node scripts/seed-marketplace-v2.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_MARKETPLACE_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ============================================
// NEW SOLUTIONS DATA
// ============================================

const newSolutions = [
  // Industrial Data Solutions
  {
    slug: 'maestrohub',
    name: 'MaestroHub',
    tagline: 'Manufacturing intelligence platform',
    summary: 'MaestroHub provides a unified manufacturing intelligence platform that connects data across systems for real-time visibility and decision support.',
    whyILikeIt: 'MaestroHub takes a pragmatic approach to unifying manufacturing data. They understand that most plants have a patchwork of systems and work with that reality.',
    website: 'https://maestrohub.com',
    categoryType: 'ot-solution',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['integration-middleware', 'ai-analytics'],
    fundingType: ['venture-backed'],
    valuesLens: ['open-integration', 'no-data-hostage'],
    ryanRating: 4.0,
    ryanComment: 'Solid approach to manufacturing data unification.',
  },
  // Reliability Solutions
  {
    slug: 'augury',
    name: 'Augury',
    tagline: 'Machine health and predictive maintenance',
    summary: 'Augury provides AI-powered machine health monitoring that predicts failures before they happen, using vibration and magnetic field sensors.',
    whyILikeIt: 'Augury has the combination of good hardware, solid AI models, and—critically—a support model that helps you actually act on predictions. Not just another dashboard.',
    website: 'https://augury.com',
    categoryType: 'ot-solution',
    processFocus: ['maintenance-reliability', 'discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['ai-analytics', 'connectivity-iiot'],
    fundingType: ['venture-backed'],
    valuesLens: ['proven-ugly-plants'],
    ryanRating: 4.5,
    ryanComment: 'Best-in-class predictive maintenance. Actually delivers on the promise.',
  },
  {
    slug: 'senseye',
    name: 'Senseye',
    tagline: 'Predictive maintenance at scale',
    summary: 'Senseye delivers AI-based predictive maintenance that works across any asset type, using your existing data sources to forecast failures.',
    whyILikeIt: 'Senseye can work with the data you already have—no new sensors required in many cases. Good for scaling PdM across a large asset base.',
    website: 'https://senseye.io',
    categoryType: 'ot-solution',
    processFocus: ['maintenance-reliability'],
    techCategory: ['ai-analytics'],
    fundingType: ['corporate-backed'],
    valuesLens: ['proven-ugly-plants', 'open-integration'],
    ryanRating: 4.0,
    ryanComment: 'Scale PdM without a sensor project. Uses existing data well.',
  },
  {
    slug: 'upkeep',
    name: 'UpKeep',
    tagline: 'Mobile-first CMMS',
    summary: 'UpKeep is a mobile-first maintenance management system that makes work orders, asset tracking, and preventive maintenance accessible from anywhere.',
    whyILikeIt: 'UpKeep gets that maintenance techs live on their feet, not at desks. Mobile-first design means actual adoption, not another system they ignore.',
    website: 'https://upkeep.com',
    categoryType: 'ot-solution',
    processFocus: ['maintenance-reliability'],
    techCategory: ['cmms-eam'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led', 'fair-pricing', 'punches-above-weight'],
    ryanRating: 4.0,
    ryanComment: 'CMMS that techs actually use. Mobile-first done right.',
  },
  {
    slug: 'maintainx',
    name: 'MaintainX',
    tagline: 'Work order and procedure management',
    summary: 'MaintainX combines work order management with digital procedures, creating a single app for maintenance teams to manage and execute their work.',
    whyILikeIt: 'MaintainX nails the combination of work orders and SOPs. When procedures live with the work, compliance happens naturally.',
    website: 'https://maintainx.com',
    categoryType: 'ot-solution',
    processFocus: ['maintenance-reliability', 'quality-compliance'],
    techCategory: ['cmms-eam', 'digital-work-sops'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led', 'punches-above-weight'],
    ryanRating: 4.0,
    ryanComment: 'Work orders + procedures in one. Great for compliance-heavy environments.',
  },
  // Workforce Solutions
  {
    slug: 'dozuki',
    name: 'Dozuki',
    tagline: 'Connected worker instructions',
    summary: 'Dozuki provides visual, step-by-step work instructions that connect frontline workers to the knowledge they need, when they need it.',
    whyILikeIt: 'Dozuki makes it easy to create and maintain visual instructions. The iFixit DNA shows—they understand how to communicate procedures visually.',
    website: 'https://dozuki.com',
    categoryType: 'ot-solution',
    processFocus: ['discrete-manufacturing', 'quality-compliance', 'safety-training'],
    techCategory: ['digital-work-sops'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led', 'proven-ugly-plants'],
    ryanRating: 4.0,
    ryanComment: 'Visual instructions done right. Great for complex assembly.',
  },
  {
    slug: 'poka',
    name: 'Poka',
    tagline: 'Connected worker platform',
    summary: 'Poka is a connected worker platform that centralizes knowledge, procedures, and communication for manufacturing teams.',
    whyILikeIt: 'Poka creates a knowledge hub for the plant floor. Training, procedures, and tribal knowledge all in one place that workers can actually access.',
    website: 'https://poka.io',
    categoryType: 'ot-solution',
    processFocus: ['discrete-manufacturing', 'safety-training', 'quality-compliance'],
    techCategory: ['digital-work-sops'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led'],
    ryanRating: 4.0,
    ryanComment: 'Knowledge management for the plant floor. Captures tribal knowledge.',
  },
  // Consultants
  {
    slug: 'steam-services-tebbetts',
    name: 'Steam Services (Steve Tebbetts)',
    tagline: 'Steam system optimization consulting',
    summary: 'Steve Tebbetts provides deep expertise in steam system optimization, helping plants reduce energy costs and improve reliability of their steam infrastructure.',
    whyILikeIt: 'Steve knows steam systems better than anyone I\'ve met. If you have a steam problem, he\'ll find the root cause and fix it permanently.',
    website: 'https://linkedin.com/in/stevetebbetts',
    categoryType: 'consultant',
    processFocus: ['energy-utilities', 'process-manufacturing'],
    techCategory: [],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['proven-ugly-plants', 'fair-pricing'],
    ryanRating: 5.0,
    ryanComment: 'The steam whisperer. Deep expertise, practical solutions.',
  },
  {
    slug: 'keystone-consulting',
    name: 'Keystone Consulting',
    tagline: 'Operational excellence consulting',
    summary: 'Keystone Consulting helps manufacturers build sustainable operational excellence programs that drive real performance improvement.',
    whyILikeIt: 'Keystone doesn\'t just hand you a playbook—they build internal capability. Their consultants have actually run plants.',
    website: 'https://keystoneconsulting.com',
    categoryType: 'consultant',
    location: 'Chicago, IL',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: [],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['proven-ugly-plants', 'operator-led'],
    ryanRating: 4.5,
    ryanComment: 'OpEx consulting that builds capability, not dependency.',
  },
  {
    slug: 'axiom-manufacturing',
    name: 'Axiom Manufacturing Systems',
    tagline: 'MES and manufacturing systems consulting',
    summary: 'Axiom provides MES implementation and manufacturing systems consulting, specializing in complex brownfield environments.',
    whyILikeIt: 'Axiom has seen every MES failure mode. They know how to scope projects realistically and avoid the common pitfalls.',
    website: 'https://axiommfg.com',
    categoryType: 'consultant',
    processFocus: ['discrete-manufacturing', 'quality-compliance'],
    techCategory: ['mes'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['proven-ugly-plants', 'fair-pricing'],
    ryanRating: 4.0,
    ryanComment: 'MES implementation without the horror stories.',
  },
  // Systems Integrators
  {
    slug: 'polaris-automation',
    name: 'Polaris Automation',
    tagline: 'Industrial automation and controls integration',
    summary: 'Polaris Automation provides controls engineering and systems integration services, specializing in Ignition and modern SCADA platforms.',
    whyILikeIt: 'Polaris does excellent Ignition work and understands how to integrate modern platforms with legacy systems. They don\'t overcomplicate things.',
    website: 'https://polarisautomation.com',
    categoryType: 'systems-integrator',
    location: 'Columbus, OH',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['scada-hmi', 'connectivity-iiot'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['open-integration', 'proven-ugly-plants'],
    ryanRating: 4.5,
    ryanComment: 'Top-tier Ignition integrator. Clean code, pragmatic approach.',
  },
  {
    slug: 'gray-solutions',
    name: 'Gray Solutions',
    tagline: 'Enterprise manufacturing solutions',
    summary: 'Gray Solutions provides end-to-end manufacturing technology services from automation to MES to enterprise integration.',
    whyILikeIt: 'Gray has the scale to handle enterprise projects but still maintains technical depth. Good balance of capability and practicality.',
    website: 'https://graysolutions.com',
    categoryType: 'systems-integrator',
    processFocus: ['discrete-manufacturing', 'process-manufacturing', 'packaging'],
    techCategory: ['scada-hmi', 'mes', 'integration-middleware'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['proven-ugly-plants'],
    ryanRating: 4.0,
    ryanComment: 'Enterprise-scale integration with technical depth.',
  },
];

// ============================================
// STARTER STACKS DATA
// ============================================

const starterStacks = [
  {
    slug: 'brownfield-mid-market',
    name: 'Brownfield Mid-Market Manufacturer',
    whoItsFor: 'Mid-market manufacturers ($50-500M revenue) with existing equipment and legacy systems who want to modernize without ripping and replacing.',
    problemItSolves: 'You have data trapped in silos, manual reporting, and no real-time visibility. Your legacy PLCs and systems work but don\'t talk to each other.',
    whyThisComboWorks: 'Ignition handles connectivity to anything with a pulse. HighByte contextualizes the data so it actually means something. Evocon gives you immediate OEE visibility while you build out the rest.',
    notAFitIf: [
      'You\'re greenfield with no existing systems',
      'You need deep process analytics (add Seeq)',
      'You have zero internal technical capability',
    ],
    solutions: [
      { slug: 'ignition-inductive-automation', role: 'Core Platform' },
      { slug: 'highbyte', role: 'Data Orchestration' },
      { slug: 'evocon', role: 'OEE & Production Monitoring' },
    ],
    relevantFocusTags: ['brownfield', 'mid-market'],
    order: 1,
  },
  {
    slug: 'reliability-first-asset-heavy',
    name: 'Reliability-First / Asset-Heavy',
    whoItsFor: 'Asset-intensive operations (continuous process, heavy equipment, utilities) where unplanned downtime is catastrophic.',
    problemItSolves: 'Reactive maintenance is killing your uptime and budget. You\'re replacing parts based on time, not condition. Shift handovers lose critical context.',
    whyThisComboWorks: 'Augury catches failures before they happen. UpKeep manages the work that follows. Turnover ensures nothing gets lost between shifts.',
    notAFitIf: [
      'Your assets are mostly simple/commodity equipment',
      'You don\'t have a baseline PM program',
      'Uptime isn\'t a critical driver',
    ],
    solutions: [
      { slug: 'augury', role: 'Predictive Maintenance' },
      { slug: 'upkeep', role: 'CMMS' },
      { slug: 'turnover-application-systems', role: 'Shift Handover' },
    ],
    relevantFocusTags: ['reliability-first', 'asset-heavy'],
    order: 2,
  },
  {
    slug: 'pe-value-creation',
    name: 'PE Value Creation 0-18 Months',
    whoItsFor: 'PE portfolio companies needing to demonstrate operational improvement quickly to support valuation and exit timelines.',
    problemItSolves: 'You need to show measurable improvements fast. Leadership doesn\'t have visibility into operations. The management system is inconsistent or missing.',
    whyThisComboWorks: 'Evocon gives immediate OEE visibility and quick wins. HumbleOps instills management discipline and accountability. Khenda connects daily management to real data.',
    notAFitIf: [
      'The investment thesis isn\'t operations-focused',
      'You have more than 18 months to exit',
      'Leadership doesn\'t buy in',
    ],
    solutions: [
      { slug: 'evocon', role: 'OEE & Production Monitoring' },
      { slug: 'humbleops', role: 'Operations Management' },
      { slug: 'khenda', role: 'Daily Management' },
    ],
    relevantFocusTags: ['pe-value-creation', 'mid-market'],
    order: 3,
  },
  {
    slug: 'operator-enablement',
    name: 'Operator Enablement / Daily Management',
    whoItsFor: 'Plants focusing on frontline engagement, skill building, and structured daily management routines.',
    problemItSolves: 'Operators are disconnected from performance data. Daily meetings are theater. Coaching happens randomly. Problems don\'t get solved sustainably.',
    whyThisComboWorks: 'Khenda puts real data in frontline hands. MurrayMentor builds coaching habits in leaders. Dozuki ensures everyone has access to the right procedures.',
    notAFitIf: [
      'You don\'t have basic data collection in place',
      'Leadership isn\'t committed to daily routines',
      'High turnover makes training ROI questionable',
    ],
    solutions: [
      { slug: 'khenda', role: 'Daily Management' },
      { slug: 'murraymentor', role: 'Coaching Platform' },
      { slug: 'dozuki', role: 'Work Instructions' },
    ],
    relevantFocusTags: ['operator-enablement'],
    order: 4,
  },
  {
    slug: 'data-first-future-proof',
    name: 'Data-First / Future-Proof',
    whoItsFor: 'Organizations building a modern data foundation that can support current needs and future use cases like AI/ML.',
    problemItSolves: 'Every analytics project requires a new integration. Data is spread across databases with no common model. You can\'t answer questions without an IT project.',
    whyThisComboWorks: 'Ignition collects from anywhere. HighByte models and contextualizes. Seeq enables self-service advanced analytics. Litmus handles edge computing needs.',
    notAFitIf: [
      'You just need basic dashboards',
      'You don\'t have data engineering capability',
      'Budget is constrained',
    ],
    solutions: [
      { slug: 'ignition-inductive-automation', role: 'Core Platform' },
      { slug: 'highbyte', role: 'Data Orchestration' },
      { slug: 'seeq', role: 'Advanced Analytics' },
      { slug: 'litmus', role: 'Edge Computing' },
    ],
    relevantFocusTags: ['data-first', 'enterprise'],
    order: 5,
  },
  {
    slug: 'visualization-shared-understanding',
    name: 'Visualization / Shared Understanding',
    whoItsFor: 'Complex facilities where spatial context matters—large plants, multi-building campuses, or operations where location is a key dimension.',
    problemItSolves: 'Dashboards don\'t convey spatial relationships. New employees can\'t navigate the plant. Remote teams can\'t visualize what\'s happening on-site.',
    whyThisComboWorks: 'Twinzo creates the 3D spatial context. Ignition feeds it live data. HighByte ensures data is properly modeled before visualization.',
    notAFitIf: [
      'Your facility is simple/single-line',
      'Spatial context doesn\'t add value',
      'You don\'t have existing 3D models or resources to create them',
    ],
    solutions: [
      { slug: 'twinzo', role: '3D Visualization' },
      { slug: 'ignition-inductive-automation', role: 'Core Platform' },
      { slug: 'highbyte', role: 'Data Orchestration' },
    ],
    relevantFocusTags: ['visualization', 'enterprise'],
    order: 6,
  },
];

// ============================================
// THINGS WE LIKE DATA
// ============================================

const thingsWeLike = [
  // Off-Topic Favorites
  {
    slug: 'leatherique',
    name: 'Leatherique',
    oneLiner: 'The only leather care products worth using',
    categoryType: 'off-topic-favorite',
    whyRyanLikesIt: 'I\'ve tried everything on vintage car leather and boots. Leatherique actually rejuvenates dried-out leather rather than just coating it. The rejuvenator/prestine clean combo is magic.',
    links: [{ label: 'Website', url: 'https://leatherique.com' }],
    order: 1,
  },
  {
    slug: 'filson',
    name: 'Filson',
    oneLiner: 'Heritage workwear that actually lasts',
    categoryType: 'off-topic-favorite',
    whyRyanLikesIt: 'In a world of planned obsolescence, Filson still makes things to last generations. My tin cloth jacket has been through a decade of abuse and looks better for it.',
    links: [{ label: 'Website', url: 'https://filson.com' }],
    order: 2,
  },
  {
    slug: 'red-wing-heritage',
    name: 'Red Wing Heritage',
    oneLiner: 'Boots built for a lifetime',
    categoryType: 'off-topic-favorite',
    whyRyanLikesIt: 'Factory floors, job sites, everyday wear—Red Wings handle it all. Resoleable, repairable, and they get better with age. The Iron Ranger is the perfect all-around boot.',
    links: [{ label: 'Website', url: 'https://redwingshoes.com' }],
    order: 3,
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    oneLiner: 'The best pocket notebooks, period',
    categoryType: 'off-topic-favorite',
    whyRyanLikesIt: 'I always have a Field Notes in my pocket on plant walks. Quick enough to jot observations, durable enough to survive. The limited editions are dangerously collectible.',
    links: [{ label: 'Website', url: 'https://fieldnotesbrand.com' }],
    order: 4,
  },
  // Cool Tools - Electrical
  {
    slug: 'fluke-289',
    name: 'Fluke 289',
    oneLiner: 'Industrial multimeter with logging',
    categoryType: 'cool-tool',
    subCategory: 'electrical',
    whyRyanLikesIt: 'The 289 is what you grab when "it works fine until it doesn\'t." The TrendCapture logging catches intermittent issues that would drive you crazy otherwise.',
    links: [{ label: 'Fluke', url: 'https://fluke.com' }],
    order: 10,
  },
  {
    slug: 'milwaukee-m12-screwdriver',
    name: 'Milwaukee M12 Fuel Screwdriver',
    oneLiner: 'The screwdriver that lives in your pocket',
    categoryType: 'cool-tool',
    subCategory: 'electrical',
    whyRyanLikesIt: 'Small enough to actually carry, powerful enough to be useful. The hex shank means it handles any bit. I use mine constantly for panel work.',
    links: [{ label: 'Milwaukee', url: 'https://milwaukeetool.com' }],
    order: 11,
  },
  // Cool Tools - Networking
  {
    slug: 'fluke-linkiq',
    name: 'Fluke LinkIQ',
    oneLiner: 'Industrial network cable tester',
    categoryType: 'cool-tool',
    subCategory: 'networking',
    whyRyanLikesIt: 'When the network goes down in a plant, you need answers fast. LinkIQ tells you cable length, locates faults, identifies PoE issues—everything for industrial Ethernet troubleshooting.',
    links: [{ label: 'Fluke', url: 'https://fluke.com' }],
    order: 20,
  },
  // Cool Tools - Commissioning
  {
    slug: 'flir-one-pro',
    name: 'FLIR One Pro',
    oneLiner: 'Thermal imaging on your phone',
    categoryType: 'cool-tool',
    subCategory: 'commissioning',
    whyRyanLikesIt: 'Thermal imaging used to require a $10K camera. Now you clip this on your phone and spot hot spots, insulation gaps, electrical issues. Essential for commissioning walks.',
    links: [{ label: 'FLIR', url: 'https://flir.com' }],
    order: 30,
  },
  // Cool Tools - Maintenance
  {
    slug: 'klein-11-in-1',
    name: 'Klein 11-in-1 Screwdriver',
    oneLiner: 'The multi-driver that actually works',
    categoryType: 'cool-tool',
    subCategory: 'maintenance',
    whyRyanLikesIt: 'Most multi-drivers are garbage. The Klein 11-in-1 has real torque, stores bits in the handle, and includes nut drivers. One tool for 90% of plant floor needs.',
    links: [{ label: 'Klein', url: 'https://kleintools.com' }],
    order: 40,
  },
  {
    slug: 'knipex-pliers-wrench',
    name: 'Knipex Pliers Wrench',
    oneLiner: 'Pliers that work like a wrench',
    categoryType: 'cool-tool',
    subCategory: 'maintenance',
    whyRyanLikesIt: 'Flat parallel jaws that grip like a wrench but adjust like pliers. No rounding fasteners. Once you use these, you\'ll wonder why wrenches still exist.',
    links: [{ label: 'Knipex', url: 'https://knipex.com' }],
    order: 41,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

async function getSolutionIdBySlug(slug) {
  const result = await client.fetch(
    `*[_type == "solution" && slug.current == $slug][0]._id`,
    { slug }
  );
  return result;
}

async function updateExistingSolutionsCategoryType() {
  console.log('\n📦 Updating existing solutions with categoryType...\n');

  const existingSolutions = await client.fetch(
    `*[_type == "solution" && !defined(categoryType)]{ _id, name }`
  );

  for (const solution of existingSolutions) {
    console.log(`  Updating ${solution.name}...`);
    try {
      await client.patch(solution._id)
        .set({ categoryType: 'ot-solution' })
        .commit();
      console.log(`    ✅ Set categoryType to ot-solution`);
    } catch (error) {
      console.error(`    ❌ Error: ${error.message}`);
    }
  }
}

async function createSolutions() {
  console.log('\n📦 Creating new solutions...\n');

  for (const solution of newSolutions) {
    console.log(`Creating: ${solution.name}...`);

    try {
      const existing = await client.fetch(
        `*[_type == "solution" && slug.current == $slug][0]`,
        { slug: solution.slug }
      );

      if (existing) {
        console.log(`  ⏭️  Already exists, updating categoryType if needed\n`);
        if (!existing.categoryType) {
          await client.patch(existing._id)
            .set({ categoryType: solution.categoryType })
            .commit();
        }
        continue;
      }

      const doc = {
        _type: 'solution',
        name: solution.name,
        slug: { _type: 'slug', current: solution.slug },
        tagline: solution.tagline,
        summary: solution.summary,
        whyILikeIt: solution.whyILikeIt,
        website: solution.website,
        categoryType: solution.categoryType,
        location: solution.location,
        processFocus: solution.processFocus,
        techCategory: solution.techCategory,
        fundingType: solution.fundingType,
        valuesLens: solution.valuesLens,
        ryanRating: solution.ryanRating,
        ryanComment: solution.ryanComment,
        dateAdded: new Date().toISOString().split('T')[0],
      };

      const result = await client.create(doc);
      console.log(`  ✅ Created with ID: ${result._id}\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
}

async function createStarterStacks() {
  console.log('\n🗂️  Creating starter stacks...\n');

  for (const stack of starterStacks) {
    console.log(`Creating: ${stack.name}...`);

    try {
      const existing = await client.fetch(
        `*[_type == "starterStack" && slug.current == $slug][0]`,
        { slug: stack.slug }
      );

      if (existing) {
        console.log(`  ⏭️  Already exists, skipping\n`);
        continue;
      }

      // Resolve solution references
      const solutionsWithRefs = [];
      for (const sol of stack.solutions) {
        const solutionId = await getSolutionIdBySlug(sol.slug);
        if (solutionId) {
          solutionsWithRefs.push({
            _key: sol.slug,
            role: sol.role,
            solution: { _type: 'reference', _ref: solutionId },
          });
        } else {
          console.log(`  ⚠️  Solution not found: ${sol.slug}`);
        }
      }

      const doc = {
        _type: 'starterStack',
        name: stack.name,
        slug: { _type: 'slug', current: stack.slug },
        whoItsFor: stack.whoItsFor,
        problemItSolves: stack.problemItSolves,
        whyThisComboWorks: stack.whyThisComboWorks,
        notAFitIf: stack.notAFitIf,
        solutions: solutionsWithRefs,
        relevantFocusTags: stack.relevantFocusTags,
        order: stack.order,
      };

      const result = await client.create(doc);
      console.log(`  ✅ Created with ID: ${result._id}\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
}

async function createThingsWeLike() {
  console.log('\n🎁 Creating things we like...\n');

  for (const item of thingsWeLike) {
    console.log(`Creating: ${item.name}...`);

    try {
      const existing = await client.fetch(
        `*[_type == "thingsWeLike" && slug.current == $slug][0]`,
        { slug: item.slug }
      );

      if (existing) {
        console.log(`  ⏭️  Already exists, skipping\n`);
        continue;
      }

      const linksWithKeys = item.links?.map((link, i) => ({
        _key: `link-${i}`,
        label: link.label,
        url: link.url,
      }));

      const doc = {
        _type: 'thingsWeLike',
        name: item.name,
        slug: { _type: 'slug', current: item.slug },
        oneLiner: item.oneLiner,
        categoryType: item.categoryType,
        subCategory: item.subCategory,
        whyRyanLikesIt: item.whyRyanLikesIt,
        links: linksWithKeys,
        order: item.order,
      };

      const result = await client.create(doc);
      console.log(`  ✅ Created with ID: ${result._id}\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
}

async function main() {
  console.log('🚀 Starting Marketplace V2 seed...\n');
  console.log('================================================\n');

  await updateExistingSolutionsCategoryType();
  await createSolutions();
  await createStarterStacks();
  await createThingsWeLike();

  console.log('\n================================================');
  console.log('✅ Marketplace V2 seed complete!');
}

main().catch(console.error);
