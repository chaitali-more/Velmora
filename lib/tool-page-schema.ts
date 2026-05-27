import { getSiteUrl } from '@/lib/seo'

type ToolPageSchema = {
  '@context': 'https://schema.org'
  '@type': 'WebApplication'
  name: string
  description: string
  url: string
  applicationCategory: string[]
  operatingSystem: string
  browserRequirements: string
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    url: string
  }
  featureList: string[]
  publisher: {
    '@id': string
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
}

type ToolPageSchemaConfig = {
  path: string
  name: string
  description: string
  applicationCategory: string[]
  featureList: string[]
}

type FaqPageSchema = {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

type ToolFaqItem = {
  question: string
  answer: string
}

const browserRequirements =
  'Requires a modern web browser with JavaScript enabled. Works on Chrome, Safari, Firefox, Edge, and mobile browsers.'

const toolPageSchemaConfigs: Record<string, ToolPageSchemaConfig> = {
  '/bmi-calculator': {
    path: '/bmi-calculator',
    name: 'BMI Calculator',
    description:
      'Free online BMI calculator to calculate body mass index, understand BMI categories, and review healthy weight guidance for adults using metric or US units.',
    applicationCategory: ['HealthApplication', 'Fitness Calculators', 'Calculator'],
    featureList: [
      'Calculate BMI from height and weight',
      'Supports metric and US units',
      'Shows BMI category and interpretation',
      'Provides a visual BMI result gauge',
      'Works instantly in the browser without signup',
    ],
  },
  '/bmr-calculator': {
    path: '/bmr-calculator',
    name: 'BMR Calculator',
    description:
      'Free BMR calculator to estimate basal metabolic rate, daily resting calorie burn, and maintenance energy needs using personal body details.',
    applicationCategory: ['HealthApplication', 'Fitness Calculators', 'Calculator'],
    featureList: [
      'Estimate basal metabolic rate',
      'Calculate resting calorie needs',
      'Supports multiple measurement units',
      'Useful for weight loss and maintenance planning',
      'Runs directly in the browser on mobile and desktop',
    ],
  },
  '/daily-calorie-needs-calculator': {
    path: '/daily-calorie-needs-calculator',
    name: 'Calorie Calculator',
    description:
      'Free calorie calculator to estimate daily calorie needs for maintenance, weight loss, or weight gain based on age, height, weight, gender, and activity level.',
    applicationCategory: ['HealthApplication', 'Fitness Calculators', 'Calculator'],
    featureList: [
      'Estimate daily calorie requirements',
      'Calculate maintenance calories',
      'Adjusts results by activity level',
      'Supports goals for weight loss and weight gain',
      'Gives instant browser-based results',
    ],
  },
  '/protein-calculator': {
    path: '/protein-calculator',
    name: 'Protein Calculator',
    description:
      'Free protein calculator to estimate daily protein intake targets for muscle gain, fat loss, maintenance, and active lifestyles using body weight and goals.',
    applicationCategory: ['HealthApplication', 'Fitness Calculators', 'Calculator'],
    featureList: [
      'Calculate daily protein needs',
      'Personalize targets by goal and activity',
      'Shows minimum, recommended, and maximum ranges',
      'Estimates protein calories',
      'Designed for fitness, nutrition, and body-composition planning',
    ],
  },
  '/water-intake-calculator': {
    path: '/water-intake-calculator',
    name: 'Water Intake Calculator',
    description:
      'Free water intake calculator to estimate daily hydration needs based on body weight, activity, climate, and lifestyle factors.',
    applicationCategory: ['HealthApplication', 'Fitness Calculators', 'Calculator'],
    featureList: [
      'Estimate daily water intake',
      'Adjust hydration target by activity level',
      'Supports body-weight based calculations',
      'Provides practical daily hydration guidance',
      'Mobile-friendly browser calculator',
    ],
  },
  '/qr-code-generator': {
    path: '/qr-code-generator',
    name: 'QR Code Generator',
    description:
      'Free online QR code generator to create scannable QR codes for links, text, contact details, and everyday sharing without installing software.',
    applicationCategory: ['UtilitiesApplication', 'Digital Tools'],
    featureList: [
      'Generate QR codes online',
      'Create QR codes for URLs and text',
      'Instant browser-based QR preview',
      'Download and use generated QR codes',
      'No signup or software installation required',
    ],
  },
  '/image-compressor': {
    path: '/image-compressor',
    name: 'Image Compressor',
    description:
      'Free online image compressor to reduce image file size, optimize photos for websites, and create lighter images directly in the browser.',
    applicationCategory: ['UtilitiesApplication', 'Image Tools'],
    featureList: [
      'Compress images online',
      'Reduce image file size',
      'Optimize images for websites and sharing',
      'Preview compressed image results',
      'Browser-based image optimization with no signup',
    ],
  },
  '/image-converter': {
    path: '/image-converter',
    name: 'Image Converter',
    description:
      'Free online image converter to convert images between common formats for websites, documents, social sharing, and everyday digital use.',
    applicationCategory: ['UtilitiesApplication', 'Image Tools'],
    featureList: [
      'Convert images online',
      'Change image formats in the browser',
      'Prepare images for web and document use',
      'Fast client-side conversion workflow',
      'Works across desktop, tablet, and mobile browsers',
    ],
  },
}

const toolPageFaqs: Record<string, ToolFaqItem[]> = {
  '/bmi-calculator': [
    {
      question: 'What does the BMI calculator measure?',
      answer:
        'It calculates your Body Mass Index from height and weight to estimate whether you fall in an underweight, healthy, overweight, or obese range.',
    },
    {
      question: 'Can I use the BMI calculator with kg or pounds?',
      answer:
        'Yes, the calculator supports common metric and US units, so you can enter your height and weight in the format you prefer.',
    },
    {
      question: 'Is BMI accurate for everyone?',
      answer:
        'BMI is a useful screening tool, but it does not separate muscle from fat. Athletes, older adults, and some body types may need extra measurements for context.',
    },
    {
      question: 'What is a healthy BMI range?',
      answer:
        'For most adults, a BMI between 18.5 and 24.9 is considered healthy. Some populations may use slightly different risk thresholds.',
    },
  ],
  '/bmr-calculator': [
    {
      question: 'What does the BMR calculator estimate?',
      answer:
        'It estimates how many calories your body burns at rest to support basic functions like breathing, circulation, and cell repair.',
    },
    {
      question: 'How is BMR different from daily calorie needs?',
      answer:
        'BMR is your resting calorie burn, while daily calorie needs include activity and exercise. Use BMR as the foundation for calorie planning.',
    },
    {
      question: 'Can BMR help with weight loss?',
      answer:
        'Yes, BMR helps estimate your calorie baseline. For weight loss, compare it with your activity-adjusted maintenance calories before setting a deficit.',
    },
    {
      question: 'Why does my BMR change over time?',
      answer:
        'BMR changes with body weight, age, muscle mass, and hormones. Recalculate it after major weight or activity changes.',
    },
  ],
  '/daily-calorie-needs-calculator': [
    {
      question: 'What does the calorie calculator show?',
      answer:
        'It estimates your daily calories for maintenance, weight loss, or weight gain based on your body details and activity level.',
    },
    {
      question: 'What are maintenance calories?',
      answer:
        'Maintenance calories are the estimated calories you need each day to keep your current body weight stable.',
    },
    {
      question: 'How many calories should I cut for weight loss?',
      answer:
        'Many people start with a moderate deficit of 250 to 500 calories below maintenance. Adjust based on progress and energy levels.',
    },
    {
      question: 'How often should I recalculate calories?',
      answer:
        'Recalculate when your weight changes, your activity level shifts, or your goal changes. Smaller updates keep your targets more realistic.',
    },
  ],
  '/protein-calculator': [
    {
      question: 'What does the protein calculator estimate?',
      answer:
        'It estimates your daily protein target based on body weight, activity level, and fitness goal.',
    },
    {
      question: 'How much protein do I need per day?',
      answer:
        'Most adults need about 0.8 to 2.2 grams per kilogram of body weight, depending on training level and goals.',
    },
    {
      question: 'Is protein important for weight loss?',
      answer:
        'Yes, higher protein can help preserve muscle and improve fullness during a calorie deficit.',
    },
    {
      question: 'Can vegetarians use this protein calculator?',
      answer:
        'Yes, the target works for any diet. Vegetarians can meet it with foods like dal, paneer, tofu, soy, dairy, nuts, seeds, and legumes.',
    },
  ],
  '/water-intake-calculator': [
    {
      question: 'What does the water intake calculator estimate?',
      answer:
        'It estimates a daily hydration target based on body weight and activity so you can plan water intake more realistically.',
    },
    {
      question: 'Does exercise increase water needs?',
      answer:
        'Yes, exercise and sweating increase fluid loss. More intense or longer activity usually requires more water.',
    },
    {
      question: 'Can food and other drinks count toward hydration?',
      answer:
        'Yes, water-rich foods and drinks contribute to daily fluids. Plain water is still the simplest baseline for hydration.',
    },
    {
      question: 'What are common signs of low hydration?',
      answer:
        'Thirst, dark yellow urine, headache, dry mouth, and fatigue can suggest you need more fluids.',
    },
  ],
  '/qr-code-generator': [
    {
      question: 'What can I create with the QR code generator?',
      answer:
        'You can create QR codes for links, text, contact details, and simple sharing needs directly in your browser.',
    },
    {
      question: 'Do generated QR codes expire?',
      answer:
        'Static QR codes do not expire by themselves. They continue working as long as the encoded content or destination link remains valid.',
    },
    {
      question: 'Can I use the QR code generator on mobile?',
      answer:
        'Yes, the QR generator works on mobile, tablet, and desktop browsers with no app installation required.',
    },
    {
      question: 'Is the QR code generator free?',
      answer:
        'Yes, you can generate QR codes online for free without signup or paid software.',
    },
  ],
  '/image-compressor': [
    {
      question: 'What does the image compressor do?',
      answer:
        'It reduces image file size so photos and graphics load faster and are easier to upload or share.',
    },
    {
      question: 'Will compressing an image reduce quality?',
      answer:
        'Some compression can reduce quality, but the goal is to lower file size while keeping the image visually clear.',
    },
    {
      question: 'Why should I compress images for a website?',
      answer:
        'Smaller images can improve page speed, reduce bandwidth, and create a better mobile browsing experience.',
    },
    {
      question: 'Can I compress images without installing software?',
      answer:
        'Yes, this tool works in the browser, so you can compress images online without installing an app.',
    },
  ],
  '/image-converter': [
    {
      question: 'What does the image converter do?',
      answer:
        'It helps convert images into common formats for websites, documents, uploads, and everyday sharing.',
    },
    {
      question: 'Why would I convert an image format?',
      answer:
        'Different formats are better for different uses, such as smaller web files, transparent graphics, or document compatibility.',
    },
    {
      question: 'Can I convert images on mobile?',
      answer:
        'Yes, the converter is browser-based and works on smartphones, tablets, and desktop devices.',
    },
    {
      question: 'Is the image converter free to use?',
      answer:
        'Yes, you can convert images online for free without signing up or installing extra software.',
    },
  ],
}

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path}`
}

function createToolPageSchema(config: ToolPageSchemaConfig): ToolPageSchema {
  const url = absoluteUrl(config.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.name,
    description: config.description,
    url,
    applicationCategory: config.applicationCategory,
    operatingSystem: 'Any',
    browserRequirements,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
    },
    featureList: config.featureList,
    publisher: {
      '@id': `${getSiteUrl()}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function buildToolPageSchema(pathname: string) {
  const config = toolPageSchemaConfigs[pathname]

  if (!config) {
    return null
  }

  return createToolPageSchema(config)
}

export function buildToolFaqPageSchema(pathname: string): FaqPageSchema | null {
  const faqs = toolPageFaqs[pathname]

  if (!faqs) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 4).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
