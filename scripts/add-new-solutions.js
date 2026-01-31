/**
 * Add new solutions and set up common pairings
 *
 * Run with: node scripts/add-new-solutions.js
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

// Old solutions to remove (from the original placeholder list)
const slugsToRemove = [
  'tulip-interfaces',
  'fictiv',
  'augmentir',
  'sight-machine',
  'hexagon-eam',
  'plex-smart-manufacturing',
  'limble-cmms',
];

// New solutions to add
const newSolutions = [
  {
    slug: 'highbyte',
    name: 'HighByte',
    tagline: 'Industrial DataOps platform',
    summary: 'HighByte provides industrial DataOps software that models, contextualizes, and delivers production-ready data to any application, cloud, or system.',
    whyILikeIt: 'HighByte solves the data context problem that kills most analytics initiatives. They understand that raw OT data is useless without structure and meaning attached.',
    website: 'https://highbyte.com',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['integration-middleware', 'historian-data-platform'],
    fundingType: ['venture-backed'],
    valuesLens: ['open-integration', 'no-data-hostage'],
    ryanRating: 4.5,
    ryanComment: 'Best-in-class for data contextualization. Essential middleware between OT and cloud.',
  },
  {
    slug: 'litmus',
    name: 'Litmus',
    tagline: 'Edge-to-cloud industrial data platform',
    summary: 'Litmus provides an edge computing platform that collects, normalizes, and analyzes industrial data from any machine or sensor.',
    whyILikeIt: 'Litmus handles the messy reality of industrial connectivity at the edge. Their driver library is extensive, and the edge-first architecture makes sense for latency-sensitive use cases.',
    website: 'https://litmus.io',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['connectivity-iiot', 'integration-middleware'],
    fundingType: ['venture-backed'],
    valuesLens: ['open-integration'],
    ryanRating: 4.0,
    ryanComment: 'Strong edge platform. Good for brownfield connectivity challenges.',
  },
  {
    slug: 'seeq',
    name: 'Seeq',
    tagline: 'Advanced analytics for process manufacturing',
    summary: 'Seeq enables engineers and scientists to rapidly analyze, predict, collaborate, and share insights from process manufacturing data.',
    whyILikeIt: 'Seeq is what engineers actually want to use for analysis. Not a dashboard tool—a real investigation and root cause analysis platform that respects time-series data.',
    website: 'https://seeq.com',
    processFocus: ['process-manufacturing', 'quality-compliance', 'maintenance-reliability'],
    techCategory: ['ai-analytics', 'historian-data-platform'],
    fundingType: ['venture-backed'],
    valuesLens: ['proven-ugly-plants', 'operator-led'],
    ryanRating: 4.5,
    ryanComment: 'The analytics tool engineers actually love. Perfect for deep process analysis.',
  },
  {
    slug: 'twinzo',
    name: 'Twinzo',
    tagline: '3D digital twin visualization',
    summary: 'Twinzo creates 3D digital twin environments that overlay real-time operational data onto spatial models of your facility.',
    whyILikeIt: 'Twinzo adds spatial context that spreadsheets and dashboards can\'t. When you need shared understanding across shifts and teams, 3D context accelerates everything.',
    website: 'https://twinzo.eu',
    processFocus: ['discrete-manufacturing', 'warehouse-intralogistics'],
    techCategory: ['scada-hmi', 'ai-analytics'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led', 'open-integration'],
    ryanRating: 4.0,
    ryanComment: 'Compelling 3D visualization. Best for complex spatial environments.',
  },
  {
    slug: 'picomse',
    name: 'PicoMES',
    tagline: 'Lightweight manufacturing execution system',
    summary: 'PicoMES is a modern, lightweight MES designed for fast deployment and real results without the complexity of traditional enterprise MES.',
    whyILikeIt: 'PicoMES proves you don\'t need a massive MES project to get execution tracking right. Focused, fast to deploy, and respects the reality of plant floor adoption.',
    website: 'https://picomse.com',
    processFocus: ['discrete-manufacturing', 'quality-compliance'],
    techCategory: ['mes'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['punches-above-weight', 'fair-pricing', 'operator-led'],
    ryanRating: 4.5,
    ryanComment: 'MES without the bloat. Fast time-to-value for production tracking.',
  },
  {
    slug: 'evocon',
    name: 'Evocon',
    tagline: 'Production monitoring and OEE',
    summary: 'Evocon provides real-time production monitoring and OEE tracking that connects directly to machines for accurate, automated data collection.',
    whyILikeIt: 'Evocon gets you from zero to OEE visibility fast. No months of configuration—plug in and start seeing where you\'re losing time.',
    website: 'https://evocon.com',
    processFocus: ['discrete-manufacturing', 'packaging'],
    techCategory: ['mes', 'connectivity-iiot'],
    fundingType: ['venture-backed'],
    valuesLens: ['punches-above-weight', 'fair-pricing', 'operator-led'],
    ryanRating: 4.0,
    ryanComment: 'Fast OEE wins. Great entry point for production visibility.',
  },
  {
    slug: 'turnover-application-systems',
    name: 'Turnover Application Systems',
    tagline: 'Shift handover and execution management',
    summary: 'Turnover provides digital shift handover and execution management tools that ensure nothing falls through the cracks between shifts.',
    whyILikeIt: 'Shift handover is where context dies. Turnover digitizes the handoff so critical information doesn\'t walk out the door with every shift change.',
    website: 'https://inturnover.com',
    processFocus: ['process-manufacturing', 'maintenance-reliability', 'safety-training'],
    techCategory: ['digital-work-sops'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['proven-ugly-plants', 'operator-led'],
    ryanRating: 4.5,
    ryanComment: 'Solves the shift handover problem that plagues continuous operations.',
  },
  {
    slug: 'khenda',
    name: 'Khenda',
    tagline: 'Daily management system',
    summary: 'Khenda provides digital daily management tools that connect frontline teams to real-time operational data and structured problem-solving.',
    whyILikeIt: 'Khenda understands that daily management fails when it\'s disconnected from reality. They tie the morning meeting to actual live data.',
    website: 'https://khenda.com',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['digital-work-sops', 'ai-analytics'],
    fundingType: ['venture-backed'],
    valuesLens: ['operator-led', 'proven-ugly-plants'],
    ryanRating: 4.0,
    ryanComment: 'Daily management grounded in real data. Not just another whiteboard app.',
  },
  {
    slug: 'murraymentor',
    name: 'MurrayMentor',
    tagline: 'Operations coaching platform',
    summary: 'MurrayMentor provides structured coaching and development programs for operations leaders, building sustainable improvement capability.',
    whyILikeIt: 'Tools fail without behaviors. MurrayMentor focuses on building the coaching habits that make all the other investments actually stick.',
    website: 'https://murraymentor.com',
    processFocus: ['discrete-manufacturing', 'process-manufacturing', 'safety-training'],
    techCategory: ['digital-work-sops'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['operator-led', 'proven-ugly-plants'],
    ryanRating: 4.0,
    ryanComment: 'Coaching that reinforces daily habits. The human side of ops excellence.',
  },
  {
    slug: 'humbleops',
    name: 'HumbleOps',
    tagline: 'Operations management platform',
    summary: 'HumbleOps provides operations management software that connects strategy to daily execution with structured routines and accountability.',
    whyILikeIt: 'HumbleOps gets that ops management isn\'t about dashboards—it\'s about routines, accountability, and closing loops. Software that respects management systems.',
    website: 'https://humbleops.com',
    processFocus: ['discrete-manufacturing', 'process-manufacturing'],
    techCategory: ['digital-work-sops', 'ai-analytics'],
    fundingType: ['bootstrap-independent'],
    valuesLens: ['operator-led', 'fair-pricing'],
    ryanRating: 4.0,
    ryanComment: 'Ops management with teeth. Accountability built in.',
  },
];

// Pairings to set up (bidirectional)
const pairings = [
  ['ignition-inductive-automation', 'highbyte'],
  ['ignition-inductive-automation', 'litmus'],
  ['litmus', 'highbyte'],
  ['highbyte', 'seeq'],
  ['ignition-inductive-automation', 'seeq'],
  ['ignition-inductive-automation', 'twinzo'],
  ['ignition-inductive-automation', 'picomse'],
  ['evocon', 'ignition-inductive-automation'],
  ['picomse', 'highbyte'],
  ['turnover-application-systems', 'ignition-inductive-automation'],
  ['turnover-application-systems', 'seeq'],
  ['turnover-application-systems', 'highbyte'],
  ['khenda', 'ignition-inductive-automation'],
  ['murraymentor', 'khenda'],
  ['humbleops', 'ignition-inductive-automation'],
];

async function createSolutions() {
  console.log('Creating new solutions...\n');

  for (const solution of newSolutions) {
    console.log(`Creating: ${solution.name}...`);

    try {
      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "solution" && slug.current == $slug][0]`,
        { slug: solution.slug }
      );

      if (existing) {
        console.log(`  ⏭️  Already exists, skipping\n`);
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

async function setupPairings() {
  console.log('\nSetting up common pairings...\n');

  // Get all solutions with their IDs
  const allSolutions = await client.fetch(
    `*[_type == "solution"] { _id, "slug": slug.current }`
  );

  const slugToId = {};
  for (const s of allSolutions) {
    slugToId[s.slug] = s._id;
  }

  // Build pairing map (bidirectional)
  const pairingMap = {};
  for (const [a, b] of pairings) {
    if (!pairingMap[a]) pairingMap[a] = new Set();
    if (!pairingMap[b]) pairingMap[b] = new Set();
    pairingMap[a].add(b);
    pairingMap[b].add(a);
  }

  // Update each solution with its pairings
  for (const [slug, partnerSlugs] of Object.entries(pairingMap)) {
    const solutionId = slugToId[slug];
    if (!solutionId) {
      console.log(`⚠️  Solution not found: ${slug}`);
      continue;
    }

    const pairingRefs = [];
    for (const partnerSlug of partnerSlugs) {
      const partnerId = slugToId[partnerSlug];
      if (partnerId) {
        pairingRefs.push({ _type: 'reference', _ref: partnerId, _key: partnerId });
      } else {
        console.log(`⚠️  Partner not found: ${partnerSlug}`);
      }
    }

    if (pairingRefs.length > 0) {
      console.log(`Updating ${slug} with ${pairingRefs.length} pairings...`);
      try {
        await client.patch(solutionId)
          .set({ commonPairings: pairingRefs })
          .commit();
        console.log(`  ✅ Updated\n`);
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}\n`);
      }
    }
  }
}

async function removeOldSolutions() {
  console.log('Removing old placeholder solutions...\n');

  for (const slug of slugsToRemove) {
    console.log(`Deleting: ${slug}...`);
    try {
      const existing = await client.fetch(
        `*[_type == "solution" && slug.current == $slug][0]._id`,
        { slug }
      );

      if (!existing) {
        console.log(`  ⏭️  Not found, skipping\n`);
        continue;
      }

      await client.delete(existing);
      console.log(`  ✅ Deleted\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
}

async function main() {
  await removeOldSolutions();
  await createSolutions();
  await setupPairings();
  console.log('✅ Done!');
}

main().catch(console.error);
