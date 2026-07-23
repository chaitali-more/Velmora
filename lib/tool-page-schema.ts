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
  '/tools/word-counter': {
    path: '/tools/word-counter',
    name: 'Word Counter & Character Counter',
    description:
      'Free online word counter and character counter tool. Instantly count words, characters, sentences, and paragraphs. Get reading time estimates.',
    applicationCategory: ['UtilitiesApplication', 'Text Tools', 'Productivity'],
    featureList: [
      'Real-time word and character counting',
      'Count with and without spaces',
      'Sentence and paragraph counting',
      'Reading and speaking time estimates',
      '100% private browser-based tool',
    ],
  },
  '/tools/text-case-converter': {
    path: '/tools/text-case-converter',
    name: 'Text Case Converter',
    description:
      'Free online text case converter tool. Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, alternating case, and inverse case.',
    applicationCategory: ['UtilitiesApplication', 'Text Tools', 'Productivity'],
    featureList: [
      'Instant case conversion',
      'Supports UPPERCASE, lowercase, Title Case, and Sentence case',
      'Fun aLtErNaTiNg cAsE and InVeRsE CaSe options',
      'Real-time word and character count stats',
      '100% private browser-based tool',
    ],
  },
  '/tools/password-generator': {
    path: '/tools/password-generator',
    name: 'Password Generator',
    description:
      'Free online secure random password generator. Create strong, customizable passwords with letters, numbers, and symbols. 100% private.',
    applicationCategory: ['UtilitiesApplication', 'Security', 'Productivity'],
    featureList: [
      'Cryptographically secure random password generation',
      'Customizable password length from 4 to 64 characters',
      'Toggle uppercase, lowercase, numbers, and special symbols',
      'Option to exclude ambiguous characters (0, O, 1, l, I)',
      'Real-time password strength score meter',
      '100% browser-based private generation with no server logging',
    ],
  },
  '/tools/percentage-calculator': {
    path: '/tools/percentage-calculator',
    name: 'Percentage Calculator',
    description:
      'Free online percentage calculator. Calculate percentages, percentage increase/decrease, and percentage change instantly.',
    applicationCategory: ['UtilitiesApplication', 'FinanceApplication', 'MathTools'],
    featureList: [
      'What is X% of Y calculation',
      'X is what percent of Y calculation',
      'Percentage increase and decrease calculation',
      'X% increase or decrease of a starting number',
      'Real-time keystroke instant updates',
      'Numeric inputMode for mobile keypads',
      '100% private browser-based tool',
    ],
  },
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
