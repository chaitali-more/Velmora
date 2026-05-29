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
