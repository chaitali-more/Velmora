// lib/posts.ts

export type ListItem =
  | string
  | {
      text: string
      href: string
      label?: string
    }

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: ListItem[] }
  | { type: 'numbered_list'; items: string[] }
  | { type: 'divider' }
  | { type: 'tip'; text: string }
  | { type: 'note'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  // 🔥 CTA TYPES
  | {
      type: 'cta_banner'
      title: string
      description: string
      buttonText: string
      link: string
      image: string
    }
  | {
      type: 'cta_simple'
      text: string
      link: string
    }
  | {
      type: 'cta_card'
      title: string
      description: string
      buttonText: string
      link: string
    }
  | {
      type: 'cta_inline'
      text: string
      link: string
    }
    | {
    type: 'image_content'
    image: { src: string; alt?: string; caption?: string }
    badge?: string
    title?: string
    description?: string
    points?: string[]
    link?: { href: string; label: string }
    reverse?: boolean
  }

export interface Post {
  slug: string
  title: string
  browserTitle?: string
  date: string
  image: string
  alt:string
  category: string
  excerpt: string
  content: ContentBlock[]
}

export const posts: Post[] = [

//   // ── POST 1 ──────────────────────────────────────────────────────────────
//   {
//     slug: 'welcome-to-velmora',
//     title: 'Welcome to Velmora',
//     date: '2026-04-01',
//     image:
//       'https://plus.unsplash.com/premium_photo-1699577272867-b1431f24d420?q=80&w=1169&auto=format&fit=crop',
//     category: 'Lifestyle',
//     alt:'ssss',
//     excerpt:
//       'This is the beginning of something great. Welcome to my corner of the internet.',
//     content: [
//       { type: 'heading', text: 'Welcome 👋' },
//       {
//         type: 'paragraph',
//         text: 'Velmora is a place where I explore ideas, technology, and life lessons.',
//       },
//       {
//         type: 'paragraph',
//         text: 'Consistency is the most underrated skill for success.',
//       },
//       {
//         type: 'cta_inline',
//         text: '👉 This tool helped me stay consistent daily',
//         link: 'https://your-affiliate-link.com',
//       },
//       {
//         type: 'paragraph',
//         text: 'Most people rely on motivation, but systems are what actually work.',
//       },
//       {
//         type: 'cta_card',
//         title: 'Best Productivity Tool',
//         description: 'I personally use this every day to stay focused.',
//         buttonText: 'Try it now',
//         link: 'https://your-affiliate-link.com',
//       },
//       {
//         type: 'paragraph',
//         text: 'If you remove friction, consistency becomes automatic.',
//       },
//       {
//         type: 'cta_banner',
//         title: 'Level Up Your Focus',
//         description: 'This tool completely changed how I work daily.',
//         buttonText: 'Get Started',
//         link: 'https://your-affiliate-link.com',
//         image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
//       },
//       {
//         type: 'cta_simple',
//         text: 'Check full details here',
//         link: 'https://your-affiliate-link.com',
//       },
//       {
//         type: 'paragraph',
//         text: 'This blog has no single theme — just curiosity and growth.',
//       },
//       {
//         type: 'list',
//         items: ['Tech insights', 'Life lessons', 'Productivity tips'],
//       },
//       {
//   type: 'image_content',
//   image: {
//     src: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
//     alt: 'Vegetable Poha bowl',
//     caption: 'Ready in 15 min',        // ← shows as bottom overlay on image
//   },
//   badge: '🌿 Low Calorie',             // ← pill tag at top
//   title: 'Vegetable Poha',
//   description: 'Light, fluffy, and packed with veggies...',
//   points: ['200–250 kcal', 'High fibre', 'Budget-friendly'],
//   link: { href: '/blog/poha', label: 'Full recipe' },
//   reverse: false,                       // ← true = image on RIGHT
// }
//     ],
//   },

  // ── POST 1 ──────────────────────────────────────────────────────────────
  {
    slug: 'healthy-breakfast-ideas-indian-veg-weight-loss',
    title: '7 Easy Healthy Breakfast Ideas (Indian Veg) for Weight Loss',
    browserTitle: 'Healthy Breakfast Ideas for Weight Loss ',
    date: '2026-04-05',
    alt:'Healthy breakfast ideas Indian veg for weight loss with easy low calorie recipes by Velmora',
    image:
      '/images/healthy-breakfast-ideas-indian-veg-weight-loss.png',
    category: 'Healthy Eating',
    excerpt:
      'Discover 7 easy healthy breakfast ideas for weight loss — all Indian veg, low calorie & budget-friendly. Start your morning right with simple home recipes!',
    content: [

      // ── Intro ────────────────────────────────────────────────────────
      {
        type: 'paragraph',
        text: "We've all been there — it's 7:30 AM, you're half awake, the chai is boiling, someone's yelling from the other room, and you're already late. In the middle of all that beautiful chaos, breakfast either gets skipped entirely or turns into two biscuits dunked in tea.",
      },
      {
        type: 'paragraph',
        text: 'Sound familiar?',
      },
      {
        type: 'paragraph',
        text: "Here's the thing though — breakfast really is the meal that sets the tone for your entire day. Especially if you're trying to lose weight or just eat a little healthier. A good weight loss breakfast in India doesn't need to be fancy, expensive, or time-consuming. In fact, most of the best options are already sitting in your kitchen.",
      },
      {
        type: 'paragraph',
        text: "In this post, we're covering 7 easy healthy breakfast ideas (Indian veg) that are budget-friendly, genuinely filling, and won't make you feel like you're \"dieting.\" These are real foods that real Indian families eat — just made a little smarter.",
      },

      { type: 'divider' },

      // ── Why Breakfast Matters ────────────────────────────────────────
      {
        type: 'heading',
        text: 'Why Breakfast Matters (Especially for Weight Loss)',
      },
      {
        type: 'paragraph',
        text: 'Before we jump to the food, just a quick word on why this matters.',
      },
      {
        type: 'paragraph',
        text: 'When you eat a balanced breakfast, you\'re essentially telling your body: "Hey, fuel is coming. You don\'t need to hold on to every calorie." Skipping breakfast, on the other hand, often leads to overeating later in the day — usually at lunch or during that 4 PM snack attack.',
      },
      {
        type: 'paragraph',
        text: "A good low calorie Indian breakfast that's high in protein and fibre keeps you full longer, stabilises blood sugar, and gives you steady energy instead of that post-meal crash. No gym required for that kind of win.",
      },

      { type: 'divider' },

      // ── 1. Vegetable Poha ────────────────────────────────────────────
      {
        type: 'heading',
        text: '1. Vegetable Poha',
      },
      {
        type: 'paragraph',
        text: "Poha (flattened rice) cooked with mustard seeds, curry leaves, onions, and your choice of veggies — peas, carrots, capsicum. It's light, fluffy, and incredibly comforting.",
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: 'Poha is easy to digest, low in calories, and when packed with vegetables, it delivers a solid mix of fibre and micronutrients. The carbs in poha are complex, meaning they release energy slowly and keep hunger at bay.',
      },
      {
        type: 'note',
        text: 'Approx. calories: 200–250 kcal per serving. Ideal portion: 1 medium bowl (about 1.5 cups cooked).',
      },
      {
        type: 'paragraph',
        text: 'Rinse the poha until soft, temper mustard seeds and curry leaves in a teaspoon of oil, add onions, veggies, turmeric, and salt. Toss in the poha, mix well, and top with lime juice and fresh coriander. Done in 15 minutes.',
      },
      {
        type: 'tip',
        text: 'Add a handful of roasted peanuts or sprouts on top to increase the protein content. Use as little oil as possible — one teaspoon is enough.',
      },

      { type: 'divider' },

      // ── 2. Oats Upma ─────────────────────────────────────────────────
      {
        type: 'heading',
        text: '2. Oats Upma',
      },
      {
        type: 'paragraph',
        text: 'A savoury twist on regular upma, made with rolled oats instead of semolina (rava). It looks and feels like upma but is far more nutritious.',
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: "Oats are loaded with beta-glucan, a soluble fibre that's been shown to reduce appetite and lower cholesterol. Oats upma is filling without being heavy — a great option for a healthy breakfast for weight loss in India.",
      },
      {
        type: 'note',
        text: 'Approx. calories: 220–270 kcal per serving. Ideal portion: 1 medium bowl (roughly 1.5 cups cooked).',
      },
      {
        type: 'paragraph',
        text: 'Dry roast rolled oats for a few minutes. In a pan, temper mustard seeds, add onions, green chilli, ginger, mixed vegetables, and cook until soft. Add water, salt, and the roasted oats. Stir well and cook for 3–4 minutes. Finish with lemon juice.',
      },
      {
        type: 'tip',
        text: 'Use quick-cooking rolled oats (not instant oats with flavouring). Adding a small portion of paneer or boiled egg alongside will make this a proper high-protein meal.',
      },
      {
        type: 'cta_inline',
        text: '🛒 Check best-selling rolled oats on Amazon India',
        link: 'https://www.amazon.in/s?k=rolled+oats',
      },

      { type: 'divider' },

      // ── 3. Besan Chilla ──────────────────────────────────────────────
      {
        type: 'heading',
        text: '3. Besan Chilla',
      },
      {
        type: 'paragraph',
        text: "A thin, savoury pancake made from besan (gram flour), spices, and veggies. Think of it as India's answer to a protein crepe. It's crispy on the edges and soft in the middle — honestly delicious.",
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: "Besan is rich in plant-based protein and fibre, which means it fills you up quickly. It's also low on the glycemic index, so there are no sudden blood sugar spikes. Besan chilla is one of the best healthy Indian veg breakfast ideas for people who want something filling and nutritious.",
      },
      {
        type: 'note',
        text: 'Approx. calories: 180–230 kcal for 2 chillas. Ideal portion: 2 medium chillas.',
      },
      {
        type: 'paragraph',
        text: 'Mix besan with water to form a batter (like dosa batter consistency). Add finely chopped onions, tomatoes, green chillies, cumin, salt, and turmeric. Pour onto a lightly oiled non-stick pan and cook on both sides until golden. Serve with green chutney.',
      },
      {
        type: 'tip',
        text: 'Add grated paneer or a spoonful of hung curd into the batter before cooking for an extra protein punch. Keep oil to a minimum by using a non-stick pan.',
      },

      { type: 'divider' },

      // ── 4. Sprouts Salad ─────────────────────────────────────────────
      {
        type: 'heading',
        text: '4. Sprouts Salad',
      },
      {
        type: 'paragraph',
        text: "A simple no-cook bowl of moong sprouts (or mixed sprouts) tossed with onion, tomato, cucumber, lemon juice, and a pinch of chaat masala. It's crunchy, refreshing, and takes zero cooking.",
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: "Sprouts are nutritional powerhouses. When you sprout a lentil, the protein and enzyme content increases significantly while the calories remain low. They're also high in fibre and water content, which keeps you full. This is probably the most underrated low calorie Indian breakfast option out there.",
      },
      {
        type: 'note',
        text: 'Approx. calories: 120–160 kcal per bowl. Ideal portion: 1 large bowl (about 1.5 cups of sprouts).',
      },
      {
        type: 'paragraph',
        text: 'Soak moong dal overnight, drain, and keep covered in a damp cloth for 8–12 hours until sprouts appear. Toss with chopped veggies, lemon juice, salt, and chaat masala. You can also lightly steam the sprouts if you prefer them less raw.',
      },
      {
        type: 'tip',
        text: 'Prepare sprouts in bulk at the start of the week — they stay fresh in the fridge for 3–4 days. Add a few pomegranate seeds for taste and antioxidants.',
      },

      { type: 'divider' },

      // ── 5. Overnight Oats ────────────────────────────────────────────
      {
        type: 'heading',
        text: '5. Overnight Oats',
      },
      {
        type: 'paragraph',
        text: "Rolled oats soaked overnight in milk (or plant milk) and refrigerated. By morning, they're thick, creamy, and ready to eat straight from the jar — no cooking needed.",
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: "Overnight oats are incredibly convenient and satisfying. They're high in fibre, provide sustained energy, and are easy to customise. The resistant starch that forms during refrigeration actually acts as a prebiotic, supporting gut health. A brilliant option for busy mornings.",
      },
      {
        type: 'note',
        text: 'Approx. calories: 250–300 kcal per jar. Ideal portion: 1 jar or bowl (about 1–1.5 cups).',
      },
      {
        type: 'paragraph',
        text: 'In a jar or container, mix rolled oats with milk (dairy or plant-based), a teaspoon of chia seeds, a drizzle of honey or jaggery, and any fruit you like. Stir, cover, and refrigerate overnight. In the morning, top with banana slices, berries, or a spoonful of peanut butter.',
      },
      {
        type: 'tip',
        text: 'Add chia seeds for extra fibre and omega-3s. Use low-fat milk or unsweetened almond milk to keep calories lower. Avoid flavoured yogurts with added sugar.',
      },

      { type: 'divider' },

      // ── 6. Vegetable Upma ────────────────────────────────────────────
      {
        type: 'heading',
        text: '6. Vegetable Upma',
      },
      {
        type: 'paragraph',
        text: 'The classic South Indian breakfast — semolina (rava/suji) cooked with mustard seeds, curry leaves, onions, and plenty of vegetables. Warm, savoury, and deeply satisfying.',
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: "When made with the right ratio of veggies to rava and minimal oil, upma is actually quite nutritious. The vegetables add fibre and volume, making the meal filling without being calorie-dense. It's also quick to make and very affordable.",
      },
      {
        type: 'note',
        text: 'Approx. calories: 230–280 kcal per serving. Ideal portion: 1 medium bowl.',
      },
      {
        type: 'paragraph',
        text: 'Dry roast rava until it turns slightly golden and aromatic. In a pan, temper mustard seeds, urad dal, curry leaves, green chillies, and onion. Add chopped veggies and cook for a few minutes. Add water (about double the rava quantity), bring to a boil, then slowly add the roasted rava while stirring continuously. Cook until the mixture comes together.',
      },
      {
        type: 'tip',
        text: 'Use rava in a smaller quantity and load up on vegetables instead. Serve with sambar or coconut chutney (in small amounts) rather than heavy chutneys.',
      },

      { type: 'divider' },

      // ── 7. Banana Oats Smoothie ──────────────────────────────────────
      {
        type: 'heading',
        text: '7. Banana Oats Smoothie',
      },
      {
        type: 'paragraph',
        text: "A thick, creamy blend of banana, rolled oats, milk, and maybe a spoonful of peanut butter or honey. It's quick, portable, and actually keeps you full — unlike most smoothies that leave you hungry an hour later.",
      },
      { type: 'subheading', text: "Why it's great for weight loss" },
      {
        type: 'paragraph',
        text: 'Bananas provide natural sweetness, potassium, and quick energy. Oats add fibre and slow digestion. Together, they create a meal that feels indulgent but is genuinely healthy. Perfect for mornings when you literally have no time to cook.',
      },
      {
        type: 'note',
        text: 'Approx. calories: 280–320 kcal per glass. Ideal portion: 1 large glass (about 350–400 ml).',
      },
      {
        type: 'paragraph',
        text: 'Blend 1 ripe banana, 3 tablespoons of rolled oats, 1 cup of milk (or plant milk), a small spoonful of peanut butter (optional), and a pinch of cinnamon. Blend until smooth. Drink immediately for best taste.',
      },
      {
        type: 'tip',
        text: 'Use a frozen banana for a thicker, colder smoothie. Add a scoop of plain protein powder or a tablespoon of chia seeds to increase the protein content.',
      },

      { type: 'divider' },

      // ── Comparison Table ─────────────────────────────────────────────
      {
        type: 'heading',
        text: 'Quick Comparison: All 7 Breakfasts at a Glance',
      },
      {
        type: 'table',
        headers: ['Breakfast', 'Approx. Calories', 'Protein Level', 'Best For'],
        rows: [
          ['Vegetable Poha',       '200–250 kcal', 'Low–Medium', 'Quick meal, light stomach'],
          ['Oats Upma',            '220–270 kcal', 'Medium',     'Weight loss, fibre boost'],
          ['Besan Chilla',         '180–230 kcal', 'High',       'Protein-rich, filling'],
          ['Sprouts Salad',        '120–160 kcal', 'High',       'Low calorie, detox'],
          ['Overnight Oats',       '250–300 kcal', 'Medium',     'Busy mornings, meal prep'],
          ['Vegetable Upma',       '230–280 kcal', 'Low–Medium', 'Energy, classic comfort'],
          ['Banana Oats Smoothie', '280–320 kcal', 'Medium',     'On-the-go, quick energy'],
        ],
      },
      {
        type: 'note',
        text: 'Calorie values are approximate and will vary based on portion size, oil used, and add-ons.',
      },

      { type: 'divider' },

      // ── Affiliate Section ────────────────────────────────────────────
      {
        type: 'heading',
        text: '🛒 Recommended Healthy Breakfast Essentials (Budget Picks)',
      },
      {
        type: 'paragraph',
        text: "You don't need any fancy equipment or expensive ingredients to make these breakfasts. But having a few basics in your kitchen makes everything much easier.",
      },
      {
        type: 'list',
        items: [
          {
            text: '🌾 Rolled Oats — The base for Oats Upma, Overnight Oats, and the Smoothie. Go for plain rolled oats, not the flavoured instant kind. Brands like Quaker or Saffola are widely available.',
            href: 'https://www.amazon.in/s?k=rolled+oats',
            label: 'Shop rolled oats on Amazon India',
          },
          {
            text: '🌱 Chia Seeds — A small bag goes a long way. Add to overnight oats or smoothies for extra fibre, omega-3s, and a little protein boost.',
            href: 'https://www.amazon.in/s?k=chia+seeds',
            label: 'Shop chia seeds on Amazon India',
          },
          {
            text: '🔁 A Good Blender — A basic mixer-grinder works fine, but a personal blender makes things quicker and easier to clean. Very affordable options under ₹1500 on Amazon India.',
            href: 'https://www.amazon.in/s?k=personal+blender',
            label: 'Shop personal blenders on Amazon India',
          },
          {
            text: '🍳 A Non-Stick Pan — Besan chilla and poha are so much easier (and lower in oil) with a good non-stick surface. A basic Prestige or Hawkins pan works perfectly.',
            href: 'https://www.amazon.in/s?k=non+stick+pan',
            label: 'Shop non-stick pans on Amazon India',
          },
        ],
      },
      {
        type: 'cta_card',
        title: 'Shop Budget Breakfast Essentials',
        description: 'Rolled oats, chia seeds, blender, non-stick pan — check affordable options on Amazon India. One-time buys that make healthy cooking genuinely easier every day.',
        buttonText: 'View on Amazon India',
        link: 'https://www.amazon.in',
      },

      { type: 'divider' },

     

      // ── Conclusion ───────────────────────────────────────────────────
      {
        type: 'heading',
        text: 'Wrapping Up: Small Changes, Big Results',
      },
      {
        type: 'paragraph',
        text: "Here's something important to remember: you don't have to be perfect. You don't need to overhaul your entire diet overnight or give up everything you love. Real, lasting weight loss happens through small, consistent choices — and choosing a healthy breakfast is one of the easiest wins you can give yourself.",
      },
      {
        type: 'paragraph',
        text: 'Pick two or three from this list that sound good to you and start rotating them through your week. Besan chilla on Monday, overnight oats ready by Tuesday morning, sprouts salad mid-week when you need something light. Over time, it stops feeling like a "diet" and just becomes how you eat.',
      },
      {
        type: 'paragraph',
        text: "The best healthy breakfast for weight loss in India is the one you'll actually make and eat. Keep it simple, keep it real, and be kind to yourself on the days it doesn't go perfectly.",
      },
      {
        type: 'paragraph',
        text: "You've got this. 🌿",
      },
      {
        type: 'cta_simple',
        text: 'Did you find this helpful? Share it with someone who needs a healthy start 💚',
        link: 'https://your-share-link.com',
      },
    ],
  },
  // ── POST 2 ──────────────────────────────────────────────────────────────
// ── POST: Best Oats in India for Weight Loss ─────────────────────────────
{
  slug: 'best-oats-in-india-for-weight-loss-2026-guide',
  title: 'Best Oats in India for Weight Loss (2026 Guide + Budget Picks)',
  browserTitle: 'Best Oats in India for Weight Loss ',
  date: '2026-04-05',
  alt: 'Best oats in India for weight loss 2026 guide with healthy breakfast tips by Velmora',
  image: '/images/best-oats-in-india-for-weight-loss.png',
  category: 'Healthy Eating',
  excerpt:
    'Confused about which oats to buy in India for weight loss? Our 2026 guide covers the best oats brands, types, calories, budget picks, and easy Indian recipes.',
  content: [

    // ── Intro ──────────────────────────────────────────────────────────
    {
      type: 'paragraph',
      text: "Let's be honest — weight loss in India is confusing. One day someone says \"eat salad,\" the next day it's \"try keto,\" and now everyone on Instagram is talking about oats. But which oats? There are so many options on the shelf — rolled, instant, steel-cut, flavored, unflavored — and most of them look the same to a beginner.",
    },
    {
      type: 'paragraph',
      text: "If you've ever stood in the grocery aisle staring at oats packets wondering \"yaar, kaunsa loon?\" — this guide is for you.",
    },
    {
      type: 'paragraph',
      text: "The good news? Oats are genuinely one of the best foods for weight loss, especially for Indians. They're filling, affordable, easy to cook, and they actually keep you full until lunch — which means fewer random snacks and better calorie control throughout the day.",
    },
    {
      type: 'paragraph',
      text: "In this guide, we'll walk you through everything: the types of oats, the best oats brands available in India (including budget picks under ₹200), how much to eat, and easy Indian-style ways to make oats that don't taste like cardboard.",
    },

    { type: 'divider' },

    // ── Types of Oats ──────────────────────────────────────────────────
    {
      type: 'heading',
      text: 'Types of Oats — Whats the Difference and Which One Should You Buy?',
    },
    {
      type: 'paragraph',
      text: "Before jumping to brands, you need to understand the three main types of oats available in India. This one section can save you from buying the wrong thing and wondering why results aren't coming.",
    },

    // ── Rolled Oats ───────────────────────────────────────────────────
    {
      type: 'subheading',
      text: '1. Rolled Oats (The Sweet Spot)',
    },
    {
      type: 'paragraph',
      text: "Rolled oats are whole oat groats that have been steamed and then flattened with large rollers. They look like flat, oval flakes and are the most common type you'll find in Indian stores.",
    },
    {
      type: 'list',
      items: [
        { text: 'High in beta-glucan fiber — slows digestion and keeps you full longer' ,href:''},
        { text: 'Moderate glycemic index — does not spike blood sugar quickly' ,href:''},
        { text: 'Versatile — works great for overnight oats, porridge, smoothies, and chillas',href:'' },
        { text: 'Cooks in about 5 minutes',href:'' },
       
      ],
    },
    {
      type: 'paragraph',
      text: "Best for weight loss? Absolutely yes. Rolled oats are the #1 recommendation for anyone trying to lose weight. The fiber content is high, the processing is minimal, and they digest slowly — keeping hunger away for hours.",
    },
    {
      type: 'tip',
      text: 'Who should use it: Anyone who wants a proper, healthy breakfast and has 5–10 minutes to cook. The best starting point for beginners.',
    },

    { type: 'divider' },

    // ── Steel-Cut Oats ────────────────────────────────────────────────
    {
      type: 'subheading',
      text: '2. Steel-Cut Oats (The Purest Form)',
    },
    {
      type: 'paragraph',
      text: "Steel-cut oats are whole oat groats that are simply cut into 2–3 pieces using a steel blade. No flattening, no steaming. They look like tiny rice grains and are the least processed form of oats you can buy.",
    },
    {
      type: 'list',
      items: [
        { text: 'Least processed form — closest to whole grain' ,href:''},
        { text: 'Highest fiber content among all oat types',href:'' },
        { text: 'Very low glycemic index — excellent for blood sugar control',href:'' },
        { text: 'Extremely filling even in smaller portions' ,href:''},
      ],
    },
    {
      type: 'paragraph',
      text: "Best for weight loss? Probably the best of all three — but they take 20–30 minutes to cook, which is a dealbreaker for many people on busy mornings.",
    },
    {
      type: 'tip',
      text: 'Who should use it: People who have time to cook in the morning, or those who meal-prep their breakfast the night before. Also excellent for diabetics or people managing insulin resistance.',
    },

    { type: 'divider' },

    // ── Instant Oats ──────────────────────────────────────────────────
    {
      type: 'subheading',
      text: '3. Instant Oats (Convenient but Tricky)',
    },
    {
      type: 'paragraph',
      text: "Instant oats are rolled oats that are cut thinner and pre-cooked so they dissolve in hot water within 1–2 minutes. The most convenient option — but also the one you have to be most careful about.",
    },
    {
      type: 'list',
      items: [
        { text: 'Super convenient — ready in 2 minutes flat',href:'' },
        { text: 'Good option when you are genuinely in a rush' ,href:''},
        { text: 'Available everywhere in India in many flavors',href:'' },
      ],
    },
    {
      type: 'paragraph',
      text: "Best for weight loss? It depends. Plain instant oats are fine. But the flavored instant oats packets — Masala Oats, Sweet Strawberry, etc. — are often loaded with salt, sugar, and artificial additives that will slow down your progress significantly.",
    },
    {
      type: 'tip',
      text: 'Who should use it: Office-goers or students with zero time in the morning. Just stick to plain, unflavored instant oats and add your own fresh toppings.',
    },

    { type: 'divider' },

    // ── Oats Type Comparison Table ────────────────────────────────────
    {
      type: 'heading',
      text: 'Quick Comparison: Which Oats Type is Best?',
    },
    {
      type: 'table',
      headers: ['Type', 'Best For', 'Cook Time', 'Weight Loss Rating'],
      rows: [
        ['Rolled Oats',           'Most people',          '5 min',    '⭐⭐⭐⭐⭐'],
        ['Steel-Cut Oats',        'Serious health goals',  '20–30 min','⭐⭐⭐⭐⭐'],
        ['Instant Oats (plain)',  'Busy schedules',        '2 min',    '⭐⭐⭐'],
        ['Instant Oats (flavored)','Taste only',           '2 min',    '⭐'],
      ],
    },

    { type: 'divider' },

    // ── Best Oats Brands ───────────────────────────────────────────────
    {
      type: 'heading',
      text: 'Best Oats in India for Weight Loss — 2026 Picks (Budget + Popular)',
    },
    {
      type: 'paragraph',
      text: "Here are the top oats brands you can actually find in India, tried and trusted by thousands of health-conscious Indians. There's a mix of budget-friendly and premium options so there's something for every wallet.",
    },

    // ── Product 1: Quaker ─────────────────────────────────────────────
    {
      type: 'subheading',
      text: '1. Quaker Oats (Plain Rolled Oats) — The Classic Choice',
    },
    {
      type: 'paragraph',
      text: "Quaker is probably the most recognizable oats brand in India, and for good reason. Their plain rolled oats are simple, clean, and effective — no additives, no drama. One of the most recommended healthy breakfast oats in India by nutritionists.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: High in soluble beta-glucan fiber — keeps you full for 3–4 hours and helps reduce overall daily calorie intake naturally.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ Widely available — Big Bazaar, Amazon, local grocery stores',href:'' },
        { text: '✅ Very affordable and great value for money',href:'' },
        { text: '✅ Cooks in about 5 minutes' ,href:''},
        { text: '✅ Neutral taste — easy to customize any way you like',href:'' },
        { text: '❌ Texture can be a little mushy if overcooked' ,href:''},
        { text: '❌ Flavor is bland without toppings — needs some creativity' ,href:''},
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹180–₹220 for 1 kg',
    },
    {
      type: 'tip',
      text: 'Who should buy it: Absolute beginners, people on a tight budget, and anyone just starting their oats journey. This is the "start here" pick.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check the latest Quaker Oats price on Amazon India',
      link: 'https://www.amazon.in/s?k=quaker+oats',
    },

    { type: 'divider' },

    // ── Product 2: Saffola ────────────────────────────────────────────
    {
      type: 'subheading',
      text: '2. Saffola Oats — Best Indian Brand Option',
    },
    {
      type: 'paragraph',
      text: "Saffola Oats are made from 100% whole grain oats and come in both plain and masala variants. The plain version is excellent for weight loss, and the brand has done a great job making oats feel more Indian — which makes it easier for people to build the habit.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: Good fiber profile, heart-healthy credentials, and a texture that works especially well for savory oats recipes like upma.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ Indian brand — easier to find in tier 2 and tier 3 cities' ,href:''},
        { text: '✅ Good quality at a very affordable price point',href:'' },
        { text: '✅ Works well for savory oats upma style cooking',href:'' },
        { text: '✅ Nice texture — not too mushy',href:'' },
        { text: '❌ The masala variants have too much sodium — avoid those for weight loss',href:'' },
        { text: '❌ Slightly less fiber than Quaker in some variants',href:'' },
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹170–₹200 for 1 kg',
    },
    {
      type: 'tip',
      text: 'Who should buy it: Indians who want an affordable, locally available brand that works well for both sweet and savory oats recipes.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check the latest Saffola Oats price on Amazon India',
      link: 'https://www.amazon.in/s?k=saffola+oats',
    },

    { type: 'divider' },

    // ── Product 3: True Elements ──────────────────────────────────────
    {
      type: 'subheading',
      text: '3. True Elements Rolled Oats — Best Clean Label Option',
    },
    {
      type: 'paragraph',
      text: "True Elements is an Indian health food brand offering 100% whole grain rolled oats with zero additives, zero artificial flavors, and zero added sugar. Just pure oats. If you are someone who reads ingredient labels carefully, you will love this one.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: Completely clean — no hidden sugars, no palm oil. The slightly thicker flakes mean slower digestion and longer-lasting fullness.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ Clean label — no additives of any kind',href:'' },
        { text: '✅ Thicker flakes — keeps you full longer than thinner rolled oats',href:'' },
        { text: '✅ Great for overnight oats and smoothie bowls',href:'' },
        { text: '✅ Comes in resealable packaging' ,href:''},
        { text: '❌ Slightly more expensive than Quaker or Saffola',href:'' },
        { text: '❌ Not available in all local stores — mostly online' ,href:''},
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹250–₹350 for 1 kg',
    },
    {
      type: 'tip',
      text: 'Who should buy it: Health-conscious buyers who want the cleanest possible oats without paying a true premium price.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check the latest True Elements Oats price on Amazon India',
      link: 'https://www.amazon.in/s?k=true+elements+rolled+oats',
    },

    { type: 'divider' },

    // ── Product 4: Yoga Bar ───────────────────────────────────────────
    {
      type: 'subheading',
      text: '4. Yoga Bar Oats — Best for People Who Get Bored Easily',
    },
    {
      type: 'paragraph',
      text: "Yoga Bar's oats-based products combine rolled oats with seeds, nuts, and minimal natural sweeteners. Not a pure oats product, but a very healthy oats-based option for people who find plain oats too boring to stick with long-term.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: The combination of oats and protein-rich seeds like flax and sunflower makes this a more balanced breakfast. Helps people stay consistent — which matters more than perfection.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ More nutritious than plain oats — seeds and nuts included' ,href:''},
        { text: '✅ Better taste — easier to eat daily without getting bored',href:'' },
        { text: '✅ Good protein content per serving',href:'' },
        { text: '❌ More expensive per serving than basic oats' ,href:''},
        { text: '❌ Contains some added sugar (though minimal)' ,href:''},
        { text: '❌ Not ideal for very strict calorie counting' ,href:''},
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹300–₹450 for 400g',
    },
    {
      type: 'tip',
      text: 'Who should buy it: People who have tried plain oats, found it boring, and given up. This is a great bridge option to stay consistent with healthy eating.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check the latest Yoga Bar Oats price on Amazon India',
      link: 'https://www.amazon.in/s?k=yoga+bar+oats',
    },

    { type: 'divider' },

    // ── Product 5: Disano ─────────────────────────────────────────────
    {
      type: 'subheading',
      text: '5. Disano Oats — Best Budget Pick Under ₹150',
    },
    {
      type: 'paragraph',
      text: "Disano is an underrated brand that offers good quality rolled oats at a very competitive price. Not as well-known as Quaker or Saffola, but the quality is solid and it is one of the best oats in India for anyone on a very tight budget.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: Good fiber content, clean ingredient list, and decent texture. Delivers the core weight loss benefits of oats without the premium price tag.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ Very affordable — best price-per-gram ratio of any brand listed',href:'' },
        { text: '✅ Decent quality for the price point',href:'' },
        { text: '✅ Available on Amazon and most online grocery platforms' ,href:''},
        { text: '❌ Less widely available offline in physical stores',href:'' },
        { text: '❌ Packaging is basic — no resealable option',href:'' },
        { text: '❌ Flakes are slightly thinner than premium brands',href:'' },
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹120–₹160 for 1 kg',
    },
    {
      type: 'tip',
      text: 'Who should buy it: Students, people on a very tight budget, or anyone who wants to test oats before committing to a more expensive brand.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check the latest Disano Oats price on Amazon India',
      link: 'https://www.amazon.in/s?k=disano+oats',
    },

    { type: 'divider' },

    // ── Product 6: Bagrry's ───────────────────────────────────────────
    {
      type: 'subheading',
      text: "6. Bagrry's White Oats — Best for a Heartier Texture",
    },
    {
      type: 'paragraph',
      text: "Bagrry's is a well-established Indian health food brand offering minimally processed white oats that are thicker and chewier than most. A very filling option that works beautifully as a morning porridge.",
    },
    {
      type: 'note',
      text: "Why it is good for weight loss: The hearty texture slows down eating naturally — which triggers fullness hormones earlier and helps with portion control without you even trying.",
    },
    {
      type: 'list',
      items: [
        { text: '✅ Thick, hearty texture — very filling per serving' ,href:''},
        { text: '✅ Good quality control and consistent product' ,href:''},
        { text: '✅ Available in most Indian supermarkets and online',href:'' },
        { text: '✅ Works great as a classic morning porridge',href:'' },
        { text: '❌ Takes slightly longer to cook than Quaker',href:'' },
        { text: '❌ Chewier texture — some people may not enjoy it' ,href:''},
      ],
    },
    {
      type: 'paragraph',
      text: "Approx. price: ₹200–₹280 for 1 kg",
    },
    {
      type: 'tip',
      text: "Who should buy it: People who want something heartier than regular rolled oats, and those who prefer buying from a brand with good offline availability across India.",
    },
    {
      type: 'cta_inline',
      text: "🛒 Check the latest Bagrry's Oats price on Amazon India",
      link: 'https://www.amazon.in/s?k=bagrrys+oats',
    },

    { type: 'divider' },

    // ── Product 7: Urban Platter ──────────────────────────────────────
    {
      type: 'subheading',
      text: '7. Urban Platter Gluten-Free Rolled Oats — Best for Sensitive Stomachs',
    },
    {
      type: 'paragraph',
      text: "If you have gluten sensitivity or regularly feel bloated after eating regular oats, Urban Platter's certified gluten-free rolled oats are the answer. Processed in a separate facility to avoid cross-contamination.",
    },
    {
      type: 'note',
      text: 'Why it is good for weight loss: All the weight loss benefits of regular oats — high fiber, low GI, filling — but without the digestive discomfort that stops many people from sticking to the oats habit.',
    },
    {
      type: 'list',
      items: [
        { text: '✅ Certified gluten-free — safe for celiac and gluten-sensitive individuals' ,href:''},
        { text: '✅ Great for people with IBS or wheat sensitivity' ,href:''},
        { text: '✅ Clean, minimal ingredients',href:'' },
        { text: '❌ More expensive than regular oats',href:'' },
        { text: '❌ Comes in smaller pack sizes',href:'' },
        { text: '❌ Mostly available online only',href:'' },
      ],
    },
    {
      type: 'paragraph',
      text: 'Approx. price: ₹350–₹450 for 500g',
    },
    {
      type: 'tip',
      text: 'Who should buy it: Anyone with gluten sensitivity, celiac disease, or anyone who regularly feels bloated after eating regular oats.',
    },
    {
      type: 'cta_inline',
      text: '🛒 Check Urban Platter Gluten-Free Oats on Amazon India',
      link: 'https://www.amazon.in/s?k=urban+platter+gluten+free+oats',
    },

    { type: 'divider' },

    // ── Calories & Portion Guide ───────────────────────────────────────
    {
      type: 'heading',
      text: 'Calories & Portion Guide — How Much Oats Should You Actually Eat?',
    },
    {
      type: 'paragraph',
      text: "This is where most people go wrong. They either eat too little and feel hungry by 9 AM, or too much and wonder why the weight is not moving. Here is the simple rule: 30–50 grams of dry oats per meal is the sweet spot for weight loss.",
    },
    {
      type: 'list',
      items: [
        { text: '30g gives you roughly 110-115 calories' ,href:''},
        { text: '40g gives you roughly 145-155 calories',href:'' },
        { text: '50g gives you roughly 180–190 calories',href:'' },
      ],
    },
    {
      type: 'paragraph',
      text: "For most adults trying to lose weight, 40g of dry oats cooked in water or low-fat milk, topped with fruits or a boiled egg, makes a complete and satisfying breakfast. Best time to eat oats for weight loss? Breakfast, always. Eating oats first thing in the morning stabilises blood sugar, prevents mid-morning cravings, and sets a healthy tone for the rest of the day.",
    },
    {
      type: 'note',
      text: 'Calorie values are for dry oats only. They will increase when you add milk, fruits, nuts, or honey — factor that into your daily count.',
    },
    {
      type: 'table',
      headers: ['Oats Type', 'Portion Size', 'Calories (approx.)', 'Best Use'],
      rows: [
        ['Rolled Oats',            '40g dry', '~148 kcal',     'Porridge, overnight oats, upma'],
        ['Steel-Cut Oats',         '40g dry', '~150 kcal',     'Slow-cooked porridge, meal prep'],
        ['Instant Oats (plain)',   '30g dry', '~110 kcal',     'Quick breakfast, travel days'],
        ['Instant Oats (flavored)','40g pack', '~160–200 kcal','Avoid for weight loss'],
      ],
    },

    { type: 'divider' },

    // ── How to Eat Oats ────────────────────────────────────────────────
    {
      type: 'heading',
      text: 'How to Eat Oats for Weight Loss — 5 Easy Indian Ideas',
    },
    {
      type: 'paragraph',
      text: "Plain boiled oats every day sounds miserable — and honestly, it is. Here is how to make it actually enjoyable so you stick with it for more than a week.",
    },

    {
      type: 'subheading',
      text: '1. Overnight Oats (Zero Cooking Required)',
    },
    {
      type: 'paragraph',
      text: "The easiest method. Before going to bed, mix 40g rolled oats with half a cup of curd or low-fat milk, add chia seeds, and refrigerate. In the morning, top with banana or berries. Done in 3 minutes the night before.",
    },
    {
      type: 'tip',
      text: 'Perfect for people who are rushed in the morning or dislike cooking. Prepare 2–3 jars in advance and store in the fridge.',
    },

    {
      type: 'subheading',
      text: '2. Oats Upma (Savory Oats — Very Indian)',
    },
    {
      type: 'paragraph',
      text: "Heat a pan, add mustard seeds, curry leaves, chopped onion, tomato, and green chili. Add 40g rolled oats and a cup of water. Cook for 5 minutes. Season with salt and lemon. Tastes like proper Indian breakfast — not diet food at all.",
    },
    {
      type: 'tip',
      text: 'Use rolled oats, not instant. Dry roasting the oats for 2 minutes before cooking gives a much better texture and nutty flavor.',
    },

    {
      type: 'subheading',
      text: '3. Oats Smoothie (For Busy Mornings)',
    },
    {
      type: 'paragraph',
      text: "Blend 30g rolled oats with 1 banana, 1 cup milk, 1 scoop protein powder (optional), and a handful of ice. High in fiber, keeps you full for hours, and genuinely tastes good — even to non-oats people.",
    },
    {
      type: 'tip',
      text: 'Use a frozen banana for a thicker, colder smoothie. Add a tablespoon of peanut butter for healthy fats and extra staying power.',
    },

    {
      type: 'subheading',
      text: '4. Oats Chilla (Healthy Pancake)',
    },
    {
      type: 'paragraph',
      text: "Blend rolled oats into a coarse powder. Mix with besan, grated vegetables, salt, and spices to make a batter. Pour thin pancakes on a non-stick pan with minimal oil. Serve with green chutney. One of the most satisfying options on this list.",
    },
    {
      type: 'tip',
      text: 'Make the oats powder fresh each time by blending a small batch in your mixer. Do not over-blend — a little texture is good.',
    },

    {
      type: 'subheading',
      text: '5. Classic Oats Porridge with a Twist',
    },
    {
      type: 'paragraph',
      text: "Cook 40g oats in water, add a pinch of cinnamon, top with sliced apple or pomegranate, and drizzle half a teaspoon of honey. Way more satisfying than plain oats — and still perfectly on track for weight loss.",
    },
    {
      type: 'tip',
      text: 'Cinnamon is not just for flavor — it helps regulate blood sugar, which supports weight loss. Add it regularly.',
    },

    { type: 'divider' },

    // ── Mistakes to Avoid ──────────────────────────────────────────────
    {
      type: 'heading',
      text: 'Mistakes to Avoid When Eating Oats for Weight Loss',
    },
    {
      type: 'paragraph',
      text: "People often start eating oats with the best intentions and then wonder why the scale is not moving. Here is usually why:",
    },
    {
      type: 'list',
      items: [
        { text: "Adding too much sugar: Two teaspoons of sugar in your oats bowl adds 30–40 extra calories and spikes insulin — exactly what you don't want. Use fruits for natural sweetness instead." ,href:''},
        { text: "Buying flavored instant oats packets: Masala Oats, mixed berry oats, and similar products are loaded with sodium, sugar, and preservatives. They're snacks disguised as health food. Avoid them for weight loss.",href:'' },
        { text: "Eating too large a portion: 100g of oats is nearly 380 calories — just from oats alone. Most people unknowingly eat this much. Measure your portions, at least at the start.",href:'' },
        { text: "Using too much milk or ghee: Cooking oats in full-fat milk and adding butter makes it calorie-dense quickly. Use water or low-fat milk, and add a few nuts for healthy fats instead." ,href:''},
        { text: "Eating oats without any protein: Oats alone is not a complete meal. Add a boiled egg, some paneer, curd, or a handful of nuts to make it balanced and keep you fuller until lunch." ,href:''},
      ],
    },

    { type: 'divider' },

    // ── Internal Link ──────────────────────────────────────────────────
    {
      type: 'note',
      text: "Want more ideas to fix your mornings? Check our full guide on 7 Easy Healthy Breakfast Ideas (Indian Veg) for Weight Loss — it pairs perfectly with everything you've read here.",
    },
    {
      type: 'cta_inline',
      text: '👉 Read: 7 Easy Healthy Breakfast Ideas (Indian Veg) for Weight Loss',
      link: '/blog/healthy-breakfast-ideas-indian-veg-weight-loss',
    },

    { type: 'divider' },

    // ── Conclusion ─────────────────────────────────────────────────────
    {
      type: 'heading',
      text: 'Wrapping Up — Start Simple, Stay Consistent',
    },
    {
      type: 'paragraph',
      text: "You don't need an expensive gym membership, a complicated diet plan, or fancy superfoods to start losing weight. Sometimes it is as simple as fixing breakfast.",
    },
    {
      type: 'paragraph',
      text: "Oats — the right kind, in the right amount, eaten the right way — can genuinely change how your day goes. You feel fuller, eat less junk, have more energy, and over weeks and months, the results show up on the scale.",
    },
    {
      type: 'paragraph',
      text: "If you are just starting out, go with Quaker Rolled Oats or Saffola Oats. They are affordable, easy to find, and simple to cook. Make overnight oats tonight for tomorrow morning — it takes 3 minutes. That is literally the only thing you need to do today.",
    },
    {
      type: 'paragraph',
      text: "The best diet is the one you can actually stick to. And oats, done the Indian way, is something most of us can genuinely live with — one bowl at a time. 🥣",
    },
    {
      type: 'cta_simple',
      text: 'Found this helpful? Share it with a friend who is also trying to eat healthier 💚',
      link: 'https://your-share-link.com',
    },

  ],
},

]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}


