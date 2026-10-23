import { DemoSample, ExtensionContact } from '../types';

export const SINDH_DISTRICTS = [
  'Sanghar (سانگھڙ)',
  'Hyderabad (حيدرآباد)',
  'Larkana (لاڙڪاڻو)',
  'Sukkur (سکر)',
  'Mirpurkhas (ميرپورخاص)',
  'Shaheed Benazirabad / Nawabshah (نوابشاهه)',
  'Khairpur (خيرپور)',
  'Badin (بدين)',
  'Thatta (ٺٽو)',
  'Ghotki (گهوٽڪي)',
  'Dadu (دادو)',
  'Jacobabad (يعقوب آباد)',
  'Tando Allahyar (ٽنڊو الهيار)',
  'Tando Muhammad Khan (ٽنڊو محمد خان)',
  'Naushahro Feroze (نوشهرو فيروز)',
  'Sujawal (سجاول)',
  'Umerkot (عمرڪوٽ)',
  'Shikarpur (شڪارپور)',
  'Jamshoro (ڄامشورو)',
  'Kashmore (ڪشمور)'
];

export const SINDH_CROPS = [
  { id: 'cotton', name: 'Cotton (کپاس / ڦٽيون)', season: 'Kharif', region: 'Sanghar, Nawabshah, Hyderabad' },
  { id: 'rice', name: 'Rice / IRRI & Basmati (چاول / ساريون)', season: 'Kharif', region: 'Larkana, Jacobabad, Badin' },
  { id: 'wheat', name: 'Wheat (گندم / ڪڻڪ)', season: 'Rabi', region: 'Khairpur, Sukkur, Ghotki' },
  { id: 'mango', name: 'Mango / Sindhri (آم / سنڌڙي انب)', season: 'Summer', region: 'Mirpurkhas, Hyderabad, Tando Allahyar' },
  { id: 'sugarcane', name: 'Sugarcane (کماد / ڪمند)', season: 'Annual', region: 'Badin, Thatta, Nawabshah' },
  { id: 'chili', name: 'Red Chili (سرخ مرچ / ڳاڙهي مرچ)', season: 'Kharif/Rabi', region: 'Kunri, Umerkot, Mirpurkhas' },
  { id: 'dates', name: 'Dates / Aseel (کھجور / اصيل کجين)', season: 'Summer', region: 'Khairpur Mirs' },
  { id: 'banana', name: 'Banana / Basrai (کیلا / ڪيلو)', season: 'Perennial', region: 'Thatta, Hyderabad' },
  { id: 'tomato', name: 'Tomato (ٹماٹر / ٽماٽر)', season: 'Winter/Rabi', region: 'Badin, Thatta, Karachi outskirts' },
  { id: 'onion', name: 'Onion (پیاز / بصر)', season: 'Rabi', region: 'Hyderabad, Mirpurkhas' }
];

export const CROP_STAGES = [
  'Seedling / Emergence (شروعاتي واڌ)',
  'Vegetative Growth (سبز پتن واري حالت)',
  'Flowering / Booting (گلن نڪرڻ جو مرحلو)',
  'Fruit / Boll / Grain Filling (ميوو يا داڻا ٺهڻ)',
  'Maturity / Pre-Harvest (پچڻ جو مرحلو)'
];

// Helper to generate self-contained realistic SVG plant disease imagery
function createSvgDataUrl(svgContent: string): string {
  const encoded = encodeURIComponent(svgContent.trim());
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'demo-cotton-clcud',
    title: 'Cotton Leaf Curl Virus & Whitefly Damage',
    titleUrdu: 'کپاس میں پتہ مروڑ وائرس اور سفید مکھی',
    titleSindhi: 'ڦٽين ۾ پن مروڙ وائرس ۽ اڇي مکي',
    crop: 'Cotton (کپاس / ڦٽيون)',
    cropUrdu: 'کپاس',
    district: 'Sanghar (سانگھڙ)',
    stage: 'Vegetative to Flowering (پتن واري واڌ)',
    symptoms: 'Upward curling of upper leaves, thickened leaf veins with enations underneath, stunted growth, and small white flies fluttering beneath leaves.',
    badge: 'Kharif Staple Alert',
    description: 'Widespread in Sanghar and Matiari belt. Often triggered by Bemisia tabaci whitefly vector and uncertified seed varieties.',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
        <defs>
          <linearGradient id="cottonBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a5d3c" />
            <stop offset="100%" stop-color="#2d3a24" />
          </linearGradient>
          <filter id="crinkle">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <!-- Background field soil -->
        <rect width="600" height="450" fill="url(#cottonBg)" />
        <path d="M 0,380 Q 300,320 600,380 L 600,450 L 0,450 Z" fill="#38281a" opacity="0.6" />
        
        <!-- Cotton Plant Stems -->
        <path d="M 300,450 Q 300,280 280,180 Q 260,100 240,60" stroke="#5c6f44" stroke-width="12" fill="none" stroke-linecap="round" />
        <path d="M 280,260 Q 200,220 140,190" stroke="#5c6f44" stroke-width="8" fill="none" stroke-linecap="round" />
        <path d="M 285,210 Q 380,160 460,140" stroke="#5c6f44" stroke-width="8" fill="none" stroke-linecap="round" />

        <!-- Distorted Curled Leaf 1 (Left) -->
        <g transform="translate(140, 190) rotate(-25)">
          <path d="M 0,0 C -60,-40 -120,20 -100,80 C -80,130 10,120 0,0" fill="#6c8f38" stroke="#3d541e" stroke-width="3" filter="url(#crinkle)" />
          <!-- Thickened veins -->
          <path d="M 0,0 C -40,30 -70,60 -60,95" stroke="#a3c462" stroke-width="4" fill="none" />
          <path d="M -25,20 C -60,25 -80,45 -90,60" stroke="#a3c462" stroke-width="3" fill="none" />
          <!-- Curling cup effect -->
          <path d="M -100,50 Q -70,10 -20,20 Q -60,50 -90,75 Z" fill="#58792a" opacity="0.7" />
        </g>

        <!-- Severely Curled Central Leaf with Enation -->
        <g transform="translate(240, 60) rotate(15)">
          <path d="M 0,0 C -40,-60 60,-80 80,-20 C 95,25 20,40 0,0" fill="#759c3a" stroke="#486821" stroke-width="3" filter="url(#crinkle)" />
          <path d="M 0,0 Q 30,-30 50,-40" stroke="#b4d873" stroke-width="5" fill="none" />
          <!-- Upward curl cupping edge -->
          <path d="M 70,-40 C 90,-10 60,20 30,10 Q 60,-15 70,-40 Z" fill="#4d6c23" />
        </g>

        <!-- Right Leaf showing chlorosis & curled margins -->
        <g transform="translate(460, 140) rotate(35)">
          <path d="M 0,0 C 60,-30 110,30 80,90 C 50,140 -20,80 0,0" fill="#7e9e3e" stroke="#466020" stroke-width="3" filter="url(#crinkle)" />
          <circle cx="50" cy="50" r="18" fill="#d4db48" opacity="0.6" />
          <circle cx="30" cy="70" r="12" fill="#d4db48" opacity="0.5" />
          <path d="M 0,0 Q 40,40 60,85" stroke="#b8d966" stroke-width="4" fill="none" />
        </g>

        <!-- Whitefly Nymphs / Insects (magnified visual evidence) -->
        <g fill="#ffffff" stroke="#c0c0c0" stroke-width="0.5">
          <ellipse cx="260" cy="90" rx="3" ry="1.5" />
          <ellipse cx="270" cy="95" rx="3" ry="1.5" transform="rotate(20 270 95)" />
          <ellipse cx="255" cy="105" rx="3.5" ry="1.5" />
          <ellipse cx="160" cy="210" rx="3" ry="1.5" />
          <ellipse cx="170" cy="225" rx="3" ry="1.5" />
        </g>

        <!-- Overlay Tag -->
        <rect x="20" y="20" width="220" height="42" rx="8" fill="#133E2B" opacity="0.9" />
        <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a7f3d0">Cotton Leaf Curl &amp; Whitefly</text>
        <text x="20" y="420" font-family="sans-serif" font-size="13" fill="#e2e8f0" opacity="0.85">Sample Specimen • Sanghar District, Sindh</text>
      </svg>
    `)
  },
  {
    id: 'demo-rice-blast',
    title: 'Rice Blast & Brown Spot Lesions',
    titleUrdu: 'دھان کا بلاسٹ اور بھورا دھبہ مرض',
    titleSindhi: 'سارين جو بلاست ۽ ناسي چٽن واري بيماري',
    crop: 'Rice / IRRI & Basmati (چاول / ساريون)',
    cropUrdu: 'چاول',
    district: 'Larkana (لاڙڪاڻو)',
    stage: 'Tillering to Panicle Initiation (فصل نڪرڻ جو مرحلو)',
    symptoms: 'Spindle-shaped elliptical lesions with grey/ash-colored centers and dark reddish-brown margins on rice leaves. Tip drying and leaf necrosis.',
    badge: 'Upper Sindh Rice Belt',
    description: 'Common in humid post-irrigation conditions along Larkana, Shikarpur, and Jacobabad canal distributaries (Rice Canal / Dadu Canal).',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
        <defs>
          <linearGradient id="riceBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a4228" />
            <stop offset="100%" stop-color="#192b18" />
          </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#riceBg)" />
        
        <!-- Long Slender Rice Blades -->
        <path d="M 220,450 C 240,280 270,140 330,30" stroke="#588137" stroke-width="26" fill="none" stroke-linecap="round" />
        <path d="M 290,450 C 310,310 330,190 440,60" stroke="#689640" stroke-width="24" fill="none" stroke-linecap="round" />
        <path d="M 170,450 C 180,320 180,210 120,90" stroke="#4a702d" stroke-width="22" fill="none" stroke-linecap="round" />

        <!-- Classic Diamond / Eye-shaped Rice Blast Lesions on blade 1 -->
        <!-- Lesion 1 -->
        <g transform="translate(285, 220) rotate(-18)">
          <ellipse cx="0" cy="0" rx="35" ry="12" fill="#844520" />
          <ellipse cx="0" cy="0" rx="28" ry="8" fill="#dcdad5" stroke="#592b10" stroke-width="2" />
          <ellipse cx="0" cy="0" rx="14" ry="4" fill="#a8a39d" />
        </g>
        <!-- Lesion 2 -->
        <g transform="translate(305, 140) rotate(-15)">
          <ellipse cx="0" cy="0" rx="25" ry="9" fill="#844520" />
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#e2dfd9" stroke="#613113" stroke-width="1.5" />
        </g>
        <!-- Lesion 3 (Coalescing / Blighting) -->
        <g transform="translate(320, 80) rotate(-12)">
          <ellipse cx="0" cy="0" rx="30" ry="10" fill="#693315" />
          <path d="M -15,0 L 25, -20 L 15, 10 Z" fill="#9e7b4b" opacity="0.8" />
        </g>

        <!-- Lesions on Blade 2 -->
        <g transform="translate(365, 230) rotate(25)">
          <ellipse cx="0" cy="0" rx="22" ry="8" fill="#753d1a" />
          <ellipse cx="0" cy="0" rx="15" ry="5" fill="#d9d5ce" />
        </g>
        <g transform="translate(405, 130) rotate(35)">
          <ellipse cx="0" cy="0" rx="28" ry="9" fill="#753d1a" />
          <ellipse cx="0" cy="0" rx="20" ry="6" fill="#d9d5ce" />
        </g>

        <!-- Drying necrotic leaf tip -->
        <path d="M 320,45 L 330,30 L 338,40 Z" fill="#b08d57" />

        <!-- Overlay Tag -->
        <rect x="20" y="20" width="220" height="42" rx="8" fill="#133E2B" opacity="0.9" />
        <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a7f3d0">Rice Blast (Magnaporthe)</text>
        <text x="20" y="420" font-family="sans-serif" font-size="13" fill="#e2e8f0" opacity="0.85">Sample Specimen • Larkana Rice Zone, Sindh</text>
      </svg>
    `)
  },
  {
    id: 'demo-mango-anthracnose',
    title: 'Mango Anthracnose & Blossom Blight',
    titleUrdu: 'آم کا اینتھراکنوز اور پھولوں کا جھلسائو',
    titleSindhi: 'انب جو ائنٿراڪنوز ۽ ٻور سڙڻ واري بيماري',
    crop: 'Mango / Sindhri (آم / سنڌڙي انب)',
    cropUrdu: 'آم',
    district: 'Mirpurkhas (ميرپورخاص)',
    stage: 'Flowering / Fruit Set (ميوو لڳڻ جو وقت)',
    symptoms: 'Dark brown to black irregular necrotic spots on foliage, blossom panicles turning black and dropping, small tear-stain markings on young fruit skins.',
    badge: 'Sindhri Mango Zone',
    description: 'High occurrence during humid mornings and canal inundation in Mirpurkhas, Tando Allahyar, and Hyderabad orchards.',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
        <defs>
          <linearGradient id="mangoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3c4c34" />
            <stop offset="100%" stop-color="#243020" />
          </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#mangoBg)" />

        <!-- Mango Branch -->
        <path d="M 50,400 Q 200,320 380,240 Q 480,190 550,150" stroke="#5d4037" stroke-width="14" fill="none" stroke-linecap="round" />

        <!-- Large Mango Leaf 1 -->
        <g transform="translate(250, 260) rotate(-35)">
          <path d="M 0,0 C -50,-80 -60,-220 0,-300 C 60,-220 50,-80 0,0" fill="#3b6e22" stroke="#254a14" stroke-width="3" />
          <line x1="0" y1="0" x2="0" y2="-290" stroke="#7cb342" stroke-width="4" />
          <!-- Anthracnose black necrotic spots -->
          <circle cx="-15" cy="-120" r="16" fill="#1f1813" stroke="#4e342e" stroke-width="2" />
          <circle cx="12" cy="-180" r="22" fill="#211712" stroke="#5d4037" stroke-width="3" />
          <circle cx="-20" cy="-210" r="12" fill="#1b140f" />
          <circle cx="20" cy="-90" r="14" fill="#271b14" />
          <!-- Shot hole tear in necrotic tissue -->
          <ellipse cx="12" cy="-180" rx="8" ry="6" fill="#3c4c34" />
        </g>

        <!-- Young Mango Fruit with tear stain symptoms -->
        <g transform="translate(420, 260)">
          <path d="M 0,0 C -30,40 -40,90 -20,130 C 0,165 45,160 55,120 C 65,80 40,30 0,0" fill="#a4c639" stroke="#558b2f" stroke-width="3" />
          <!-- Anthracnose tear staining streak -->
          <path d="M -5,40 Q -10,75 -2,120" stroke="#3e2723" stroke-width="4" stroke-linecap="round" fill="none" />
          <circle cx="5" cy="85" r="5" fill="#3e2723" />
          <circle cx="25" cy="95" r="4" fill="#3e2723" />
        </g>

        <!-- Overlay Tag -->
        <rect x="20" y="20" width="220" height="42" rx="8" fill="#133E2B" opacity="0.9" />
        <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a7f3d0">Mango Anthracnose</text>
        <text x="20" y="420" font-family="sans-serif" font-size="13" fill="#e2e8f0" opacity="0.85">Sample Specimen • Mirpurkhas Mango Belt, Sindh</text>
      </svg>
    `)
  },
  {
    id: 'demo-wheat-rust',
    title: 'Wheat Yellow Stripe Rust (Puccinia striiformis)',
    titleUrdu: 'گندم کی زرد کنگی / رسٹ',
    titleSindhi: 'ڪڻڪ جي پيلي ڪنگي واري بيماري',
    crop: 'Wheat (گندم / ڪڻڪ)',
    cropUrdu: 'گندم',
    district: 'Khairpur (خيرپور)',
    stage: 'Booting to Grain Filling (سٽا نڪرڻ جو وقت)',
    symptoms: 'Parallel linear stripes of bright yellow-orange powdery pustules along leaf veins. When touched, yellow rust powder rubs off on farmer fingers.',
    badge: 'Rabi Staple Threat',
    description: 'Prevalent during cool, dewy mornings in northern and central Sindh wheat plains when winter temperatures stay below 20°C.',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
        <defs>
          <linearGradient id="wheatBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#364531" />
            <stop offset="100%" stop-color="#1e261a" />
          </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#wheatBg)" />

        <!-- Wheat Leaf 1 -->
        <path d="M 180,450 Q 240,240 310,40" stroke="#668b44" stroke-width="40" fill="none" stroke-linecap="round" />
        <path d="M 280,450 Q 340,260 440,70" stroke="#7a9f4e" stroke-width="36" fill="none" stroke-linecap="round" />

        <!-- Linear Stripes of Yellow Rust Pustules on Leaf 1 -->
        <!-- Stripe A -->
        <g stroke="#ff9800" stroke-width="4" stroke-dasharray="8 6" fill="none">
          <path d="M 205,420 Q 255,240 315,60" />
          <path d="M 215,410 Q 265,230 325,50" stroke="#ffb74d" stroke-width="5" />
          <path d="M 195,430 Q 245,250 305,70" stroke="#f57c00" stroke-width="4" />
        </g>

        <!-- Stripe B (Heavy infection) -->
        <g stroke="#ffa726" stroke-width="5" stroke-dasharray="6 4" fill="none">
          <path d="M 305,420 Q 355,250 445,90" />
          <path d="M 315,410 Q 365,240 455,80" stroke="#ff9100" stroke-width="6" />
        </g>

        <!-- Pustules dots -->
        <g fill="#ffab00">
          <circle cx="250" cy="250" r="3" />
          <circle cx="252" cy="240" r="3.5" />
          <circle cx="255" cy="230" r="3" />
          <circle cx="260" cy="220" r="4" />
          <circle cx="264" cy="210" r="3.5" />
        </g>

        <!-- Overlay Tag -->
        <rect x="20" y="20" width="220" height="42" rx="8" fill="#133E2B" opacity="0.9" />
        <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a7f3d0">Wheat Yellow Stripe Rust</text>
        <text x="20" y="420" font-family="sans-serif" font-size="13" fill="#e2e8f0" opacity="0.85">Sample Specimen • Khairpur District, Sindh</text>
      </svg>
    `)
  },
  {
    id: 'demo-tomato-blight',
    title: 'Tomato Early Blight (Alternaria solani)',
    titleUrdu: 'ٹماٹر کا اگیتا جھلسائو مرض',
    titleSindhi: 'ٽماٽر جي اڳواٽ سڙڻ واري بيماري',
    crop: 'Tomato (ٹماٹر / ٽماٽر)',
    cropUrdu: 'ٹماٹر',
    district: 'Badin (بدين)',
    stage: 'Vegetative to Fruiting (فروٽ لڳڻ جي حالت)',
    symptoms: 'Dark brown concentric target-like rings on lower older leaves, surrounded by yellow chlorotic halos. Lower foliage drying prematurely.',
    badge: 'Lower Sindh Vegetable Belt',
    description: 'Frequent in Badin, Thatta, and Malir vegetable farms due to coastal humidity and overhead furrow splashing.',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
        <defs>
          <linearGradient id="tomBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2c3a28" />
            <stop offset="100%" stop-color="#192316" />
          </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#tomBg)" />

        <!-- Tomato Stem and Serrated Foliage -->
        <path d="M 300,450 Q 280,260 250,90" stroke="#4c7333" stroke-width="12" fill="none" stroke-linecap="round" />
        
        <!-- Leaf Group Left -->
        <g transform="translate(180, 240)">
          <!-- Leaf blade -->
          <path d="M 0,0 C -60,-20 -90,40 -60,80 C -30,110 20,80 0,0" fill="#58853b" stroke="#335220" stroke-width="2" />
          <!-- Concentric target spot -->
          <circle cx="-45" cy="50" r="26" fill="#fbc02d" opacity="0.4" />
          <circle cx="-45" cy="50" r="18" fill="#4e342e" stroke="#2e1c14" stroke-width="2" />
          <circle cx="-45" cy="50" r="12" fill="#3e2723" />
          <circle cx="-45" cy="50" r="6" fill="#1b0000" />
        </g>

        <!-- Leaf Group Right -->
        <g transform="translate(380, 200)">
          <path d="M 0,0 C 70,-30 110,30 70,80 C 40,110 -10,70 0,0" fill="#548037" stroke="#335220" stroke-width="2" />
          <!-- Concentric spot 2 -->
          <circle cx="50" cy="40" r="24" fill="#fbc02d" opacity="0.45" />
          <circle cx="50" cy="40" r="17" fill="#4e342e" stroke="#2e1c14" stroke-width="2" />
          <circle cx="50" cy="40" r="10" fill="#3e2723" />
          <circle cx="50" cy="40" r="4" fill="#1b0000" />
        </g>

        <!-- Overlay Tag -->
        <rect x="20" y="20" width="220" height="42" rx="8" fill="#133E2B" opacity="0.9" />
        <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#a7f3d0">Tomato Early Blight</text>
        <text x="20" y="420" font-family="sans-serif" font-size="13" fill="#e2e8f0" opacity="0.85">Sample Specimen • Badin Coastal Belt, Sindh</text>
      </svg>
    `)
  }
];

export const SINDH_EXTENSION_CONTACTS: ExtensionContact[] = [
  {
    institution: 'Directorate General Agricultural Extension Sindh',
    institutionUrdu: 'ڈائریکٹوریٹ جنرل زرعی توسیع سندھ (حیدرآباد)',
    city: 'Hyderabad',
    role: 'Central Farmer Advisory & Field Pest Scouting',
    phone: '+92-22-9200057 / 9200058',
    scope: 'Province-wide field extension officers, plant protection alerts & subsidy verification'
  },
  {
    institution: 'Sindh Agriculture University (SAU) Advisory Desk',
    institutionUrdu: 'سندھ زرعی یونیورسٹی ٹنڈوجام ایڈوائزری ڈیسک',
    city: 'Tandojam',
    role: 'Academic Agronomy, Soil Testing & Disease Clinic',
    phone: '+92-22-2765870',
    scope: 'Soil salinity testing (Kalar assessment), water quality tests, crop diagnostic laboratory'
  },
  {
    institution: 'Rice Research Institute Dokri (Larkana)',
    institutionUrdu: 'رائس ریسرچ انسٹیٹیوٹ ڈوکری (لاڑکانہ)',
    city: 'Dokri, Larkana',
    role: 'Rice Varieties, Blast & Stem Borer Management',
    phone: '+92-74-4050212',
    scope: 'Specialized support for IRRI-6, Basmati, and local rice growers in Upper Sindh'
  },
  {
    institution: 'Cotton Research Station Sakrand',
    institutionUrdu: 'کاٹن ریسرچ اسٹیشن سکرنڈ (نوابشاہ روڈ)',
    city: 'Sakrand, Shaheed Benazirabad',
    role: 'Cotton Leaf Curl Virus (CLCuD) & Pink Bollworm Control',
    phone: '+92-244-322134',
    scope: 'Certified seed guidance, pheromone trap deployment, resistant BT cotton protocols'
  },
  {
    institution: 'Horticulture Research Station Mirpurkhas',
    institutionUrdu: 'باغبانی ریسرچ اسٹیشن میرپورخاص',
    city: 'Mirpurkhas',
    role: 'Mango, Citrus, Date Palm & Chili Cultivation',
    phone: '+92-233-9290150',
    scope: 'Fruit fly management, mango blossom protection, export quality standards'
  }
];

export const SUGGESTED_QUESTIONS = [
  {
    en: 'How to control whitefly in cotton without killing ladybird beetles?',
    ur: 'کپاس میں لیڈی برڈ برنگوں کو نقصان پہنچائے بغیر سفید مکھی کیسے کنٹرول کریں؟',
    sd: 'ڦٽين ۾ دوست ڪيڙن کي بچائيندي اڇي مکي تي ڪيئن ضابطو آڻجي؟'
  },
  {
    en: 'What is the best irrigation timing for rice during canal rotation (Warabandi)?',
    ur: 'وارہ بندی (نہری پانی کی بندش) کے دوران دھان کو پانی دینے کا بہترین وقت کیا ہے؟',
    sd: 'وارابندي جي ڏينهن ۾ سارين کي پاڻي ڏيڻ جو سڀ کان بهتر وقت ڪهڙو آهي؟'
  },
  {
    en: 'My Sindhri mango flowers are dropping in Mirpurkhas. What safe steps can I take?',
    ur: 'میرپورخاص میں سندھڑی آم کا بور / پھول گر رہا ہے۔ کیا محفوظ احتیاط کریں؟',
    sd: 'ميرپورخاص ۾ سنڌڙي انب جو ٻور ڇڻي رهيو آهي، ڪهڙا محفوظ اپاءَ وٺجن؟'
  },
  {
    en: 'How to treat salinity (kalar) patches in my field using gypsum in Sindh?',
    ur: 'سندھ میں کلر زدہ زمین پر جپسم کے ذریعے زمین کی اصلاح کا طریقہ کیا ہے؟',
    sd: 'سنڌ ۾ ڪلر واري زمين کي جپسم ذريعي ڪيئن سڌاري سگهجي ٿو؟'
  }
];
