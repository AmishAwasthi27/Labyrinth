import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis
} from "recharts";

// ═══════════════════════════════════════
// RABBIT HOLE DATA — Deep dive content
// ═══════════════════════════════════════
const RABBIT_HOLES = {
  "CRIMES VS WOMEN": {
    title: "CRIMES AGAINST WOMEN",
    color: "#FF3333",
    stats: [
      { label: "Cases registered in 2022", value: "4,45,256", src: "NCRB 2022" },
      { label: "Rape cases registered", value: "31,516", src: "NCRB 2022" },
      { label: "Domestic violence cases", value: "1,24,702", src: "NCRB 2022" },
      { label: "Conviction rate in rape cases", value: "27.4%", src: "NCRB 2022" },
      { label: "Cases pending trial (all women crimes)", value: "5,56,940", src: "NCRB 2022" },
      { label: "Avg trial completion time", value: "6+ years", src: "MoLJ 2022" },
    ],
    who: "Women aged 18-30 account for 42% of victims. Dalit and Adivasi women face disproportionate violence — 10x less likely to see conviction. Rural women face severe under-reporting due to social stigma and police reluctance to file FIRs.",
    why: [
      "→ Police refuse to register FIRs — 'two-finger test' still used in some states despite Supreme Court ban",
      "→ Witness intimidation in 67% of cases (NALSA 2021)",
      "→ Only 1 fast-track court per 2 lakh population vs need of 1 per 50,000",
      "→ Caste hierarchy protects perpetrators — 95% of Dalit rape cases involve upper-caste accused",
      "→ Marital rape still not criminalised in India",
    ],
    uninvestigated: [
      "→ 2G era gang rape cases in Manipur (2023) — FIRs filed 2 months after video surfaced",
      "→ Unnao rape case (2017) — survivor's family murdered, case delayed 4 years",
      "→ Kathua case (2018) — accused included police officers, evidence tampering confirmed",
      "→ Thousands of cases in J&K, Manipur, Chhattisgarh under AFSPA — no civilian court jurisdiction",
    ],
    media: [
      { source: "The Wire", text: "How India's Fast Track Courts Are Failing Rape Survivors — only 412 of 1,023 are fully functional", url: "https://thewire.in" },
      { source: "Scroll.in", text: "The two-finger test: Why India's courts keep reviving a practice the SC banned", url: "https://scroll.in" },
      { source: "The Hindu", text: "Marital rape exception — a colonial relic India refuses to shed", url: "https://thehindu.com" },
      { source: "Amnesty India", text: "Survivors of sexual violence in conflict zones have no legal recourse under AFSPA", url: "https://amnesty.org.in" },
    ],
    retaliate: [
      "→ Report: 181 (Women helpline) or nearest One Stop Centre (Sakhi)",
      "→ Demand FIR registration — police cannot refuse under Sec 154 CrPC",
      "→ Legal aid: NALSA (15100) provides free lawyers",
      "→ Support orgs: Majlis Legal Centre, iCall, Snehi",
      "→ Demand your MP implement all 2,000 fast-track courts",
    ],
  },
  "ROBBERY/THEFT": {
    title: "ROBBERY, THEFT & PROPERTY CRIMES",
    color: "#FF8C00",
    stats: [
      { label: "Total property crime cases 2022", value: "3,87,812", src: "NCRB 2022" },
      { label: "Robbery cases", value: "32,481", src: "NCRB 2022" },
      { label: "Burglary cases", value: "56,011", src: "NCRB 2022" },
      { label: "Theft cases", value: "2,55,988", src: "NCRB 2022" },
      { label: "Charge-sheet rate", value: "43.2%", src: "NCRB 2022" },
      { label: "Conviction rate", value: "28.1%", src: "NCRB 2022" },
    ],
    who: "Urban poor and daily wage workers are most vulnerable. Migrant workers — 7 crore nationally — are prime targets with no fixed address, no banking access, and no social network to help them navigate police systems.",
    why: [
      "→ 90% of workforce is informal — carrying cash daily as no bank access",
      "→ Urban slums: 1 police station covers 50,000+ people in dense areas",
      "→ Low conviction makes repeat offending low-risk",
      "→ Economic inequality GINI 35.7 drives desperation crimes",
      "→ Police prioritise high-profile cases; petty theft deprioritised",
    ],
    uninvestigated: [
      "→ Organised cattle theft rings across UP, Rajasthan — linked to vigilante lynchings but theft cases rarely prosecuted",
      "→ Corporate land theft from Adivasis via forged documents — not counted in NCRB as 'robbery'",
      "→ Digital/SIM swap fraud now eclipses physical robbery but categorised separately",
    ],
    media: [
      { source: "The Hindu", text: "Why India's property crime conviction rate has fallen to a 20-year low", url: "https://thehindu.com" },
      { source: "EPW", text: "Informality and Crime: How the lack of social security drives property offences", url: "https://epw.in" },
    ],
    retaliate: [
      "→ Report: 100 (Police) or 112",
      "→ File e-FIR online at your state police portal",
      "→ Demand Jan Dhan account access to reduce cash dependency",
      "→ Support MGNREGS implementation in your district",
    ],
  },
  "MURDER/ATTEMPT": {
    title: "MURDER & CULPABLE HOMICIDE",
    color: "#FF3399",
    stats: [
      { label: "Murder cases 2022", value: "28,522", src: "NCRB 2022" },
      { label: "Attempt to murder", value: "1,10,012", src: "NCRB 2022" },
      { label: "Culpable homicide", value: "3,323", src: "NCRB 2022" },
      { label: "Murders over disputes/property", value: "38.6%", src: "NCRB 2022" },
      { label: "Murders over personal vengeance", value: "18.3%", src: "NCRB 2022" },
      { label: "Cases pending trial", value: "2,24,000+", src: "NCRB 2022" },
    ],
    who: "68% of murder victims are from economically marginalised communities. Caste-based honour killings are systematically undercounted — filed as 'personal disputes'. Custodial deaths — police and judicial — remain severely under-reported.",
    why: [
      "→ Land disputes: 38.6% of murders — no fast land dispute resolution system",
      "→ Honour killings: khap panchayat orders not treated as conspiracy to murder",
      "→ Custodial deaths: NHRC recorded 1,888 custodial deaths in 2022 — 5 per day",
      "→ Encounter killings: UP alone had 183 'encounters' in 2022 — most uninvestigated",
      "→ Witness protection non-existent — 42% of murder cases collapse due to witness turning hostile",
    ],
    uninvestigated: [
      "→ Fake encounter killings — PUCL vs State of Maharashtra documented 99 fake encounters",
      "→ Custodial deaths in police lockups — NHRC says 3 per day die in custody",
      "→ Manipur mass graves — 1,528 bodies found, government has not prosecuted a single case",
      "→ Chhattisgarh Adivasi killings classified as 'naxal encounters' without investigation",
    ],
    media: [
      { source: "The Wire", text: "India's Encounter Killings: A Database of Extrajudicial Executions", url: "https://thewire.in" },
      { source: "Caravan Magazine", text: "The Anatomy of a Fake Encounter in Uttar Pradesh", url: "https://caravanmagazine.in" },
      { source: "Amnesty India", text: "Custodial Torture and Deaths: India's Invisible Crisis", url: "https://amnesty.org.in" },
      { source: "Reuters India", text: "India's vigilante mobs killed 44 in 2022, most cases uninvestigated", url: "https://reuters.com" },
    ],
    retaliate: [
      "→ Report custodial death: NHRC (14433)",
      "→ Document and report encounter killings to NHRC / local HC",
      "→ Support People's Union for Civil Liberties (PUCL)",
      "→ RTI for pending murder cases in your district court",
    ],
  },
  "CYBERCRIME": {
    title: "CYBERCRIME",
    color: "#00FFFF",
    stats: [
      { label: "Cybercrime cases 2022", value: "2,65,876", src: "NCRB 2022" },
      { label: "Growth since 2020", value: "+183%", src: "NCRB 2022" },
      { label: "Financial fraud cases", value: "1,77,999", src: "NCRB 2022" },
      { label: "Cases charge-sheeted", value: "26.4%", src: "NCRB 2022" },
      { label: "Cyber police per crore population", value: "~3", src: "MHA 2022" },
      { label: "Amount defrauded (est.)", value: "₹1.25 lakh Cr", src: "RBI 2023" },
    ],
    who: "Elderly, rural, and first-generation internet users are most vulnerable. Women face disproportionate cyber harassment — 67% of online harassment victims are women (iCall 2022). Children face sextortion and grooming at alarming rates.",
    why: [
      "→ Digital India pushed 80 crore people online without cyber literacy",
      "→ Only 1 dedicated cyber cell officer per ~5,000 registered cases",
      "→ Jurisdiction issues: crimes cross state/national borders",
      "→ UPI fraud infrastructure exploited by organised crime syndicates",
      "→ Social media platforms slow to cooperate with Indian law enforcement",
    ],
    uninvestigated: [
      "→ Pegasus spyware used on journalists, activists — government denied, SC committee inconclusive",
      "→ Electoral roll data of 91 crore voters leaked on dark web — no FIR filed",
      "→ Aadhaar data breach — UIDAI denied, French researcher proved otherwise",
      "→ Cambridge Analytica India operations — investigated by UK, ignored by India",
    ],
    media: [
      { source: "The Wire", text: "Pegasus Project India: How the Government Spied on Its Own Citizens", url: "https://thewire.in" },
      { source: "The Hindu", text: "India's cybercrime surge: Why police are overwhelmed and underprepared", url: "https://thehindu.com" },
      { source: "Scroll.in", text: "How UPI fraud became India's fastest growing crime", url: "https://scroll.in" },
      { source: "Bloomberg Quint", text: "₹1.25 lakh crore lost to cyber fraud — India's silent financial crisis", url: "https://bloomberg.com" },
    ],
    retaliate: [
      "→ Report cybercrime: cybercrime.gov.in or call 1930",
      "→ Report financial fraud immediately to your bank + 1930",
      "→ Check if your data was leaked: haveibeenpwned.com",
      "→ Demand Pegasus investigation accountability from your MP",
    ],
  },
  "KIDNAPPING": {
    title: "KIDNAPPING & ABDUCTION",
    color: "#FFD700",
    stats: [
      { label: "Total kidnapping cases 2022", value: "2,13,534", src: "NCRB 2022" },
      { label: "Children kidnapped", value: "98,440", src: "NCRB 2022" },
      { label: "Women kidnapped", value: "99,821", src: "NCRB 2022" },
      { label: "For marriage (forced)", value: "14.2%", src: "NCRB 2022" },
      { label: "Trafficking-linked cases", value: "6,533", src: "NCRB 2022" },
      { label: "Recovery rate of missing children", value: "58%", src: "NCRB 2022" },
    ],
    who: "Dalit and Adivasi children are most vulnerable to trafficking. Girls aged 12-18 are primary targets for forced marriage. 40% of trafficking victims are from West Bengal, Odisha, and Jharkhand — driven by poverty and lack of livelihood.",
    why: [
      "→ Trafficking networks operate across state borders with political protection",
      "→ Police treat child trafficking as 'family matter' in many rural areas",
      "→ POCSO courts overwhelmed — 2.4 lakh cases pending as of 2023",
      "→ No centralised missing children database across states",
      "→ Forced marriage and domestic servitude not aggressively prosecuted",
    ],
    uninvestigated: [
      "→ Muzaffarpur shelter home case — 34 girls trafficked, case stalled for 4 years",
      "→ Denotified tribe children in Rajasthan — systematically trafficked, zero convictions",
      "→ Gulf trafficking via fake job agents — MEA estimates 5 lakh Indians in bonded labour abroad",
    ],
    media: [
      { source: "The Wire", text: "India's Missing Children Crisis: How the State Failed to Build a Tracking System", url: "https://thewire.in" },
      { source: "Scroll.in", text: "The trafficking pipeline from Jharkhand to Delhi that nobody wants to stop", url: "https://scroll.in" },
      { source: "BBC India", text: "India's shelter homes: Where children go to be exploited", url: "https://bbc.com/india" },
    ],
    retaliate: [
      "→ Report missing child: 1098 (CHILDLINE) immediately",
      "→ TRACKCHILD portal: trackthemissingchild.gov.in",
      "→ Report trafficking: 1800-419-8588 (Anti-trafficking helpline)",
      "→ Support Bachpan Bachao Andolan, STOP Trafficking India",
    ],
  },
  "CRIMES VS CHILDREN": {
    title: "CRIMES AGAINST CHILDREN",
    color: "#FF6633",
    stats: [
      { label: "Total crimes against children 2022", value: "1,61,107", src: "NCRB 2022" },
      { label: "POCSO cases registered", value: "51,863", src: "NCRB 2022" },
      { label: "Child labour cases", value: "9,210", src: "NCRB 2022" },
      { label: "POCSO conviction rate", value: "32.2%", src: "NCRB 2022" },
      { label: "POCSO cases pending trial", value: "2,40,000+", src: "NCRB 2022" },
      { label: "Avg time to POCSO verdict", value: "7.7 years", src: "MoLJ 2022" },
    ],
    who: "Children in institutional care (orphanages, shelter homes, government hostels) face the highest risk. Dalit and Adivasi children account for 42% of child labour victims despite being 25% of the population.",
    why: [
      "→ POCSO courts exist in only 28 of 766 districts as of 2022",
      "→ Child marriage still prevalent in Rajasthan, Bihar, West Bengal",
      "→ Online child sexual abuse material (CSAM) growing — NCMEC reported 20 lakh URLs from India",
      "→ Institutional abuse in government facilities systematically covered up",
      "→ Child labour demand driven by unregulated brick kilns, agriculture, domestic work",
    ],
    uninvestigated: [
      "→ Apna Ghar shelter home (Haryana) — 40 girls abused for years, warden acquitted",
      "→ Bhopal children's home scandal — multiple FIRs, no convictions 5 years later",
      "→ Child labour in Sivakasi fireworks — 50,000 children, last major raid was 2009",
      "→ Online CSAM networks operated from India — IT Ministry has blocked 0 servers",
    ],
    media: [
      { source: "The Wire", text: "POCSO at 10: Why India's child protection law is failing its youngest victims", url: "https://thewire.in" },
      { source: "Indian Express", text: "Child sexual abuse in institutional care: India's most suppressed crisis", url: "https://indianexpress.com" },
      { source: "Huffington Post India", text: "Child Labour in India: The Industries That Profit From It", url: "https://huffpost.com" },
      { source: "Caravan Magazine", text: "The Shelter Home Scandal India's Government Tried to Bury", url: "https://caravanmagazine.in" },
    ],
    retaliate: [
      "→ Report child abuse: 1098 (CHILDLINE)",
      "→ Report POCSO: POCSO e-Box at ncpcr.gov.in",
      "→ Report child labour: 9454441999 (Labour Ministry)",
      "→ Support CRY, Save the Children, Bachpan Bachao Andolan",
    ],
  },
};

const SUICIDE_CAUSES = [
  { cause: "FAMILY PROBLEMS", count: 35688, pct: "20.9%" },
  { cause: "ILLNESS (MENTAL)", count: 22642, pct: "13.3%" },
  { cause: "ILLNESS (PHYSICAL)", count: 18972, pct: "11.1%" },
  { cause: "FINANCIAL DISTRESS", count: 18938, pct: "11.1%" },
  { cause: "DRUG/ALCOHOL ABUSE", count: 11613, pct: "6.8%" },
  { cause: "LOVE AFFAIRS", count: 11296, pct: "6.6%" },
  { cause: "MARRIAGE ISSUES", count: 9907, pct: "5.8%" },
  { cause: "UNEMPLOYMENT", count: 8661, pct: "5.1%" },
  { cause: "EXAM FAILURE", count: 7178, pct: "4.2%" },
  { cause: "POVERTY", count: 5864, pct: "3.4%" },
  { cause: "PROFESSIONAL ISSUES", count: 4246, pct: "2.5%" },
  { cause: "SOCIAL REPUTATION", count: 3596, pct: "2.1%" },
  { cause: "OTHER/UNKNOWN", count: 12523, pct: "7.3%" },
];

const RADAR_DEEP = {
  "SAFETY": {
    score: 34,
    facts: [
      "India ranked 101/163 on Global Peace Index 2023 (Vision of Humanity)",
      "58.2 lakh IPC crimes in 2022 — 4.5% rise YoY (NCRB 2022)",
      "Conviction rate: 50.4% — down from 61% in 2010 (NCRB 2022)",
      "153 police per lakh population vs UN norm of 222 (BPR&D 2022)",
      "32.4% of prisoners are undertrials — held without conviction (NCRB 2022)",
    ],
    lacking: "India's criminal justice system suffers from severe police understaffing, overburdened courts (4.4 crore pending cases), and systematic under-reporting especially in rural areas and conflict zones.",
    retaliate: "Demand police modernisation funding, fast-track court expansion, and independent police complaints authority in your state.",
    sources: ["NCRB Annual Report 2022", "Global Peace Index 2023", "BPR&D Annual Report 2022"],
  },
  "HEALTH": {
    score: 52,
    facts: [
      "Public health expenditure: 1.28% of GDP vs WHO recommendation of 5% (NHP 2022)",
      "0.74 doctors per 1,000 people vs WHO norm of 1.0 (NHP 2022)",
      "1.4 hospital beds per 1,000 vs WHO norm of 3.5 (NHP 2022)",
      "India has 27% of global TB burden — 28.2 lakh cases (WHO 2022)",
      "57% of women aged 15-49 are anaemic (NFHS-5 2019-21)",
      "Only 52.3% of children under 5 receive all recommended vaccines (NFHS-5)",
    ],
    lacking: "India's health system is deeply underfunded, with rural areas facing critical shortages of doctors, medicines, and basic infrastructure. Private healthcare has grown to fill gaps but is unaffordable for 70% of the population.",
    retaliate: "Demand 5% GDP health spending, full NHM funding, and accountability for non-functional PHCs via RTI and local elected representatives.",
    sources: ["NFHS-5 2019-21", "National Health Profile 2022", "WHO Global TB Report 2022"],
  },
  "EDUCATION": {
    score: 66,
    facts: [
      "Literacy rate 77.7% — but functional literacy (reading comprehension) is ~56% (ASER 2023)",
      "Only 42% of class 5 students can read class 2 text (ASER 2023)",
      "10 lakh teacher vacancies across government schools (UDISE+ 2022)",
      "Only 18 of every 100 students who enrol in class 1 reach graduation (UDISE+ 2022)",
      "Higher education GER: 27.3% vs China's 57.8% (AISHE 2021-22)",
      "Female literacy still 7.4 percentage points below male in urban areas (Census 2021)",
    ],
    lacking: "While enrolment has improved, learning outcomes remain deeply poor. Rural, Dalit, Adivasi, and girl children face systemic exclusion. Teacher absenteeism averages 24% nationally.",
    retaliate: "Demand NEP 2020 implementation tracking, NIPUN Bharat targets, and school infrastructure audit in your district via Shaala Darpan portal.",
    sources: ["ASER 2023", "UDISE+ 2022", "AISHE 2021-22", "Census 2021"],
  },
  "ECONOMY": {
    score: 48,
    facts: [
      "Top 1% own 40.1% of national wealth — top 10% own 77% (Oxfam 2023)",
      "Youth unemployment (15-29): 23.2% — highest in a decade (CMIE 2023)",
      "90% of workforce is informal with zero social security (MOSPI 2022)",
      "India's GINI coefficient: 35.7 — inequality widened post-COVID (World Bank 2023)",
      "Farmer average monthly income: ₹10,218 vs urban average ₹25,000+ (NSSO 2019)",
      "Real wages have stagnated for 8 consecutive years for bottom 50% (ILO 2022)",
    ],
    lacking: "Despite GDP growth, inequality has widened dramatically. Jobless growth, informalisation of labour, and concentration of wealth in top percentiles have left the majority economically insecure.",
    retaliate: "Demand MGNREGS expansion, MUDRA loan access, and implementation of Labour Codes with social security for informal workers.",
    sources: ["Oxfam India 2023", "CMIE 2023", "MOSPI 2022", "ILO India Wages Report 2022"],
  },
  "GENDER EQ.": {
    score: 38,
    facts: [
      "India ranked 127/146 on Global Gender Gap Index 2023 (WEF)",
      "Female Labour Force Participation Rate: 24% vs male 76% (CMIE 2023)",
      "Gender wage gap: women earn 76 paise per ₹1 earned by men (ILO 2022)",
      "Only 15.2% of Lok Sabha MPs are women (Election Commission 2024)",
      "Sex ratio at birth: 907 girls per 1,000 boys in some states (Census 2021)",
      "Marital rape is still not a criminal offence in India",
    ],
    lacking: "Structural patriarchy, economic dependence, lack of political representation, and legal gaps like marital rape exception create a deeply unequal society for women and gender minorities.",
    retaliate: "Demand Women's Reservation Bill full implementation, equal pay legislation enforcement, and criminalisation of marital rape.",
    sources: ["WEF Global Gender Gap Report 2023", "CMIE 2023", "ILO 2022", "Election Commission India"],
  },
  "ENVIRONMENT": {
    score: 42,
    facts: [
      "India has 12 of world's 20 most polluted cities (IQAir World Air Quality Report 2023)",
      "Delhi AQI exceeded 400 (hazardous) for 47 days in 2023 (CPCB 2023)",
      "Forest cover declined by 1,540 sq km in 2019-21 period (FSI 2021)",
      "30% of India's land is under desertification or degradation (ISRO 2021)",
      "Ganga: 32 of 97 monitoring stations show BOD above safe limit (CPCB 2022)",
      "India is world's 3rd largest e-waste generator — 1.01 MT in 2022 (CPCB)",
    ],
    lacking: "India's environmental governance is hamstrung by conflicting development priorities, weak enforcement of pollution norms, and systematic dilution of environmental laws via amendments.",
    retaliate: "Use Sameer app (CPCB) to report pollution, demand NCAP targets from your city municipality, support NGT petitions.",
    sources: ["IQAir 2023", "CPCB Annual Report 2022-23", "FSI State of Forest Report 2021", "ISRO 2021"],
  },
  "MENTAL HLTH": {
    score: 28,
    facts: [
      "1,70,924 suicides in 2022 — highest ever recorded (NCRB 2022)",
      "India has 0.3 psychiatrists per lakh population vs WHO norm of 1.0 (NIMHANS 2023)",
      "56% of Indians with mental illness receive no treatment (NMHS 2015-16)",
      "Mental health budget: 0.05% of total health budget (MoH 2023)",
      "15.7% of Indians need active mental health intervention (NMHS 2015-16)",
      "Only 47 government mental hospitals for 140 crore people (NHRC 2022)",
    ],
    lacking: "India's mental health system is catastrophically underfunded. Social stigma, lack of trained professionals, zero rural outreach, and a culture of silence make mental illness a hidden epidemic.",
    retaliate: "Demand NMHP full funding, school counsellor mandate, and Tele-MANAS expansion. Break stigma by talking about mental health openly.",
    sources: ["NCRB 2022", "NIMHANS National Survey 2023", "NMHS 2015-16", "MoH Annual Report 2023"],
  },
};

const DATA = {
  crimeByState: [
    { state: "UP", crimes: 7021, women: 3890, children: 1245, murder: 3491 },
    { state: "MH", crimes: 6012, women: 2134, children: 987, murder: 2012 },
    { state: "MP", crimes: 5821, women: 3012, children: 1103, murder: 2341 },
    { state: "RJ", crimes: 4932, women: 2891, children: 876, murder: 1432 },
    { state: "WB", crimes: 4123, women: 1987, children: 765, murder: 1876 },
    { state: "TN", crimes: 3876, women: 1654, children: 543, murder: 1234 },
    { state: "KA", crimes: 3543, women: 1432, children: 498, murder: 1098 },
    { state: "GJ", crimes: 3210, women: 1287, children: 421, murder: 987 },
    { state: "AP", crimes: 2987, women: 1198, children: 387, murder: 876 },
    { state: "HR", crimes: 2765, women: 1543, children: 312, murder: 765 },
  ],
  suicideCauses: SUICIDE_CAUSES,
  healthMetrics: [
    { state: "KL", imr: 6, mmr: 19, stunting: 23 },
    { state: "GJ", imr: 24, mmr: 57, stunting: 39 },
    { state: "MH", imr: 19, mmr: 33, stunting: 36 },
    { state: "KA", imr: 21, mmr: 69, stunting: 35 },
    { state: "TN", imr: 13, mmr: 54, stunting: 27 },
    { state: "UP", imr: 43, mmr: 167, stunting: 51 },
    { state: "BR", imr: 45, mmr: 130, stunting: 56 },
    { state: "RJ", imr: 37, mmr: 136, stunting: 43 },
    { state: "MP", imr: 41, mmr: 163, stunting: 42 },
    { state: "HR", imr: 27, mmr: 91, stunting: 34 },
  ],
  educationFunnel: [
    { stage: "CLASS 1", students: 100 },
    { stage: "CLASS 5", students: 79 },
    { stage: "CLASS 8", students: 64 },
    { stage: "CLASS 10", students: 52 },
    { stage: "CLASS 12", students: 38 },
    { stage: "GRADUATE", students: 18 },
  ],
  economyData: [
    { year: "2004", poverty: 37.2, unemployment: 8.3, gini: 33.4 },
    { year: "2008", poverty: 29.8, unemployment: 7.8, gini: 35.2 },
    { year: "2011", poverty: 21.9, unemployment: 7.2, gini: 37.8 },
    { year: "2015", poverty: 14.2, unemployment: 8.1, gini: 38.2 },
    { year: "2018", poverty: 10.8, unemployment: 6.8, gini: 37.6 },
    { year: "2021", poverty: 11.9, unemployment: 9.2, gini: 36.1 },
    { year: "2023", poverty: 11.2, unemployment: 8.1, gini: 35.7 },
  ],
  crimeCategories: [
    { name: "CRIMES VS WOMEN", value: 445256, color: "#FF3333" },
    { name: "ROBBERY/THEFT", value: 387812, color: "#FF8C00" },
    { name: "MURDER/ATTEMPT", value: 289341, color: "#FF3399" },
    { name: "CYBERCRIME", value: 265876, color: "#00FFFF" },
    { name: "KIDNAPPING", value: 213534, color: "#FFD700" },
    { name: "CRIMES VS CHILDREN", value: 161107, color: "#FF6633" },
  ],
  radarData: [
    { metric: "SAFETY", value: 34 },
    { metric: "HEALTH", value: 52 },
    { metric: "EDUCATION", value: 66 },
    { metric: "ECONOMY", value: 48 },
    { metric: "GENDER EQ.", value: 38 },
    { metric: "ENVIRONMENT", value: 42 },
    { metric: "MENTAL HLTH", value: 28 },
  ],
  helplines: [
    {
      cat: "EMERGENCY",
      items: [
        { name: "ALL-INDIA EMERGENCY", num: "112", org: "Ministry of Home Affairs", hours: "24/7" },
        { name: "POLICE", num: "100", org: "State Police", hours: "24/7" },
        { name: "AMBULANCE", num: "102", org: "National Health Mission", hours: "24/7" },
        { name: "FIRE", num: "101", org: "Fire Services", hours: "24/7" },
      ],
    },
    {
      cat: "WOMEN & CHILDREN",
      items: [
        { name: "WOMEN HELPLINE", num: "1091", org: "Ministry of WCD", hours: "24/7" },
        { name: "DOMESTIC VIOLENCE", num: "181", org: "Ministry of WCD", hours: "24/7" },
        { name: "NCW HELPLINE", num: "7827170170", org: "National Commission for Women", hours: "24/7" },
        { name: "CHILDLINE", num: "1098", org: "Ministry of WCD", hours: "24/7" },
        { name: "ANTI-TRAFFICKING", num: "1800-419-8588", org: "MHA", hours: "24/7" },
      ],
    },
    {
      cat: "MENTAL HEALTH",
      items: [
        { name: "iCALL (TISS)", num: "9152987821", org: "Tata Institute of Social Sciences", hours: "Mon-Sat 8AM-10PM" },
        { name: "NIMHANS TELE-MANAS", num: "14416", org: "NIMHANS Bangalore", hours: "24/7" },
        { name: "VANDREVALA FOUNDATION", num: "1860-2662-345", org: "Vandrevala Foundation", hours: "24/7" },
        { name: "AASRA", num: "9820466627", org: "AASRA Trust", hours: "24/7" },
        { name: "SNEHI", num: "044-24640050", org: "SNEHI NGO", hours: "24/7" },
      ],
    },
    {
      cat: "HEALTH & DISASTER",
      items: [
        { name: "HEALTH HELPLINE", num: "104", org: "NHM", hours: "24/7" },
        { name: "COVID/DISEASE", num: "1075", org: "Ministry of Health", hours: "24/7" },
        { name: "NDRF DISASTER", num: "1078", org: "National Disaster Response Force", hours: "24/7" },
        { name: "POISON CONTROL", num: "1800-116-117", org: "Ministry of Health", hours: "24/7" },
      ],
    },
    {
      cat: "LEGAL & LABOUR",
      items: [
        { name: "LEGAL AID (NALSA)", num: "15100", org: "National Legal Services Authority", hours: "24/7" },
        { name: "LABOUR HELPLINE", num: "1800-11-8001", org: "Ministry of Labour", hours: "24/7" },
        { name: "ANTI-CORRUPTION (CVC)", num: "1064", org: "Central Vigilance Commission", hours: "24/7" },
        { name: "CYBER CRIME", num: "1930", org: "Ministry of Home Affairs", hours: "24/7" },
      ],
    },
  ],
};

const MODULES = ["OVERVIEW", "SAFETY", "MENTAL HEALTH", "HEALTH", "EDUCATION", "ECONOMY", "HELPLINES"];
const TICKER_DATA = [
  "POPULATION: 144.17 CR", "GDP: ₹296.58 LCR", "LITERACY: 77.7%", "HDI RANK: 132/193",
  "UNEMPLOYMENT: 8.1%", "SEX RATIO: 943/1000", "UNDER-5 MORTALITY: 32/1000",
  "FOREST COVER: 21.7%", "ANEMIA IN WOMEN: 57%", "OPEN DEFECATION FREE: 100% (CLAIMED)",
];

// ── SHARED COMPONENTS ──

function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    }} />
  );
}

function Crosshair({ x, y }) {
  return (
    <div style={{
      position: "fixed", left: x + 14, top: y - 8, pointerEvents: "none", zIndex: 9999,
      fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", opacity: 0.7,
      textShadow: "0 0 8px rgba(0,255,255,0.5)",
    }}>X:{Math.round(x)} Y:{Math.round(y)}</div>
  );
}

function CardCorners() {
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, pointerEvents: "none", borderTop: "1px solid rgba(0,255,255,0.6)", borderLeft: "1px solid rgba(0,255,255,0.6)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 12, height: 12, pointerEvents: "none", borderTop: "1px solid rgba(0,255,255,0.6)", borderRight: "1px solid rgba(0,255,255,0.6)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 12, height: 12, pointerEvents: "none", borderBottom: "1px solid rgba(0,255,255,0.6)", borderLeft: "1px solid rgba(0,255,255,0.6)" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, pointerEvents: "none", borderBottom: "1px solid rgba(0,255,255,0.6)", borderRight: "1px solid rgba(0,255,255,0.6)" }} />
    </>
  );
}

function BCard({ children, title, serial, style: extraStyle = {} }) {
  return (
    <div style={{
      position: "relative", border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,20,50,0.6)", padding: "20px", marginBottom: "16px",
      backdropFilter: "blur(4px)", ...extraStyle,
    }}>
      <CardCorners />
      {(title || serial) && (
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", marginBottom: "12px", letterSpacing: "0.15em", display: "flex", justifyContent: "space-between" }}>
          <span>{serial}</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function StatTile({ label, value, unit = "", src, trend, color = "#FFFFFF" }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const raw = String(value).replace(/,/g, "");
    const num = parseFloat(raw);
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const inc = num / (1800 / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplay(value); clearInterval(timer); }
      else setDisplay(typeof value === "string" && value.includes(",") ? Math.round(start).toLocaleString("en-IN") : Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  const trendColor = !trend ? "#FFFFFF" : trend.startsWith("↑") ? "#FF3333" : trend.startsWith("↓") ? "#00FF88" : "#FF8C00";
  return (
    <div style={{ position: "relative", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,15,40,0.8)", padding: "16px 18px", flex: "1 1 180px", minWidth: "160px" }}>
      <CardCorners />
      <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: "28px", fontWeight: "bold", color, lineHeight: 1 }}>
        {display}<span style={{ fontSize: "13px", marginLeft: "4px", color: "rgba(255,255,255,0.5)" }}>{unit}</span>
      </div>
      {trend && <div style={{ fontFamily: "monospace", fontSize: "9px", color: trendColor, marginTop: "4px" }}>{trend}</div>}
      {src && <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(0,255,255,0.5)", marginTop: "6px" }}>[SRC: {src}]</div>}
    </div>
  );
}

function Annotation({ children, rotate = "-1.5deg", color = "#FFD700" }) {
  return (
    <div style={{ fontFamily: "monospace", fontSize: "11px", color, border: `1px solid ${color}`, background: "rgba(255,215,0,0.04)", padding: "10px 14px", transform: `rotate(${rotate})`, marginBottom: "12px", lineHeight: "1.6", letterSpacing: "0.05em" }}>
      {children}
    </div>
  );
}

function HelpCard({ name, num, org, hours }) {
  function handleShare() {
    const text = encodeURIComponent(`🚨 HELPLINE: ${name}\n📞 ${num}\n🕐 ${hours}\n\nShare this. Someone needs it.\n— India's Labyrinth`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }
  return (
    <div style={{ border: "2px solid #FF3333", background: "rgba(255,51,51,0.05)", padding: "12px 16px", marginBottom: "8px", position: "relative" }}>
      <CardCorners />
      <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>{name}</div>
      <div style={{ fontFamily: "monospace", fontSize: "24px", fontWeight: "bold", color: "#FF3333", letterSpacing: "0.1em" }}>{num}</div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", flex: 1 }}>{org} · {hours}</div>
        <button onClick={handleShare} style={{ background: "none", border: "1px solid #00FFFF", color: "#00FFFF", fontFamily: "monospace", fontSize: "9px", padding: "3px 8px", cursor: "pointer", letterSpacing: "0.1em" }}>SHARE ↗</button>
      </div>
    </div>
  );
}

function SectionTitle({ num, title, sub }) {
  return (
    <div style={{ marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", letterSpacing: "0.2em", marginBottom: "4px" }}>§ {num} //</div>
      <div style={{ fontFamily: "monospace", fontSize: "36px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "0.08em", lineHeight: 1, textTransform: "uppercase" }}>{title}</div>
      {sub && <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "6px", letterSpacing: "0.1em" }}>{sub}</div>}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: "rgba(0,20,50,0.97)", border: "1px solid rgba(0,255,255,0.3)", padding: "10px 14px", fontFamily: "monospace", fontSize: "10px" }}>
      <div style={{ color: "#00FFFF", marginBottom: "4px", letterSpacing: "0.1em" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}</div>
      ))}
    </div>
  );
}

function ListItem({ text }) {
  return (
    <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.7)", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.04em" }}>{text}</div>
  );
}

// ── RABBIT HOLE PANEL ──
function RabbitHole({ data, onClose }) {
  if (!data) return null;
  return (
    <div style={{
      border: `1px solid ${data.color}`,
      background: "rgba(0,10,30,0.97)",
      padding: "24px",
      marginTop: "8px",
      marginBottom: "16px",
      position: "relative",
      animation: "slideDown 0.3s ease",
    }}>
      <CardCorners />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", marginBottom: "4px" }}>// RABBIT HOLE — DEEP DIVE</div>
          <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: "900", color: data.color, textTransform: "uppercase" }}>{data.title}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: `1px solid ${data.color}`, color: data.color, fontFamily: "monospace", fontSize: "10px", padding: "6px 12px", cursor: "pointer", letterSpacing: "0.1em" }}>✕ CLOSE</button>
      </div>

      {/* KEY STATS */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FFFF", letterSpacing: "0.2em", marginBottom: "10px" }}>§ KEY STATISTICS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "8px" }}>
          {data.stats.map((s, i) => (
            <div key={i} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", padding: "10px 12px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.4)", marginBottom: "4px", letterSpacing: "0.1em" }}>{s.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: "bold", color: data.color }}>{s.value}</div>
              <div style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(0,255,255,0.5)", marginTop: "2px" }}>[SRC: {s.src}]</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO IS AFFECTED */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FFFF", letterSpacing: "0.2em", marginBottom: "8px" }}>§ WHO IS MOST AFFECTED</div>
        <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8", padding: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>{data.who}</div>
      </div>

      {/* WHY */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#FF3333", letterSpacing: "0.2em", marginBottom: "8px" }}>§ ROOT CAUSES — WHY THIS HAPPENS</div>
        <div style={{ border: "1px solid rgba(255,51,51,0.2)", background: "rgba(255,51,51,0.04)", padding: "12px" }}>
          {data.why.map((w, i) => <ListItem key={i} text={w} />)}
        </div>
      </div>

      {/* UNINVESTIGATED */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#FFD700", letterSpacing: "0.2em", marginBottom: "8px" }}>§ CASES THAT WERE BURIED / UNINVESTIGATED</div>
        <div style={{ border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.03)", padding: "12px" }}>
          {data.uninvestigated.map((u, i) => <ListItem key={i} text={u} />)}
        </div>
      </div>

      {/* MEDIA SOURCES */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FFFF", letterSpacing: "0.2em", marginBottom: "8px" }}>§ READ MORE — VERIFIED MEDIA SOURCES</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {data.media.map((m, i) => (
            <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", gap: "12px", alignItems: "flex-start",
              border: "1px solid rgba(0,255,255,0.15)", background: "rgba(0,255,255,0.03)",
              padding: "10px 12px", textDecoration: "none",
            }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FFFF", letterSpacing: "0.1em", whiteSpace: "nowrap", minWidth: "120px", marginTop: "1px" }}>[{m.source}]</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.7)", lineHeight: "1.5" }}>{m.text} ↗</div>
            </a>
          ))}
        </div>
      </div>

      {/* WHAT YOU CAN DO */}
      <div>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FF88", letterSpacing: "0.2em", marginBottom: "8px" }}>§ WHAT YOU CAN DO RIGHT NOW</div>
        <div style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)", padding: "12px" }}>
          {data.retaliate.map((r, i) => <ListItem key={i} text={r} />)}
        </div>
      </div>
    </div>
  );
}

// ── RADAR DEEP DIVE PANEL ──
function RadarDeepDive({ data, onClose }) {
  if (!data) return null;
  return (
    <div style={{
      border: "1px solid #00FFFF",
      background: "rgba(0,10,30,0.97)",
      padding: "24px",
      marginTop: "8px",
      marginBottom: "16px",
      position: "relative",
      animation: "slideDown 0.3s ease",
    }}>
      <CardCorners />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", marginBottom: "4px" }}>// SECTOR DEEP DIVE</div>
          <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: "900", color: "#00FFFF", textTransform: "uppercase" }}>
            {data.metric} <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>— SCORE: {data.score}/100</span>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid #00FFFF", color: "#00FFFF", fontFamily: "monospace", fontSize: "10px", padding: "6px 12px", cursor: "pointer", letterSpacing: "0.1em" }}>✕ CLOSE</button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FFFF", letterSpacing: "0.2em", marginBottom: "8px" }}>§ VERIFIED FACTS</div>
        {data.facts.map((f, i) => (
          <div key={i} style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.75)", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", lineHeight: "1.6" }}>→ {f}</div>
        ))}
      </div>

      <div style={{ marginBottom: "16px", padding: "12px", border: "1px solid rgba(255,51,51,0.2)", background: "rgba(255,51,51,0.04)" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#FF3333", letterSpacing: "0.2em", marginBottom: "6px" }}>§ WHERE & WHY WE ARE LACKING</div>
        <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8" }}>{data.lacking}</div>
      </div>

      <div style={{ marginBottom: "16px", padding: "12px", border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#00FF88", letterSpacing: "0.2em", marginBottom: "6px" }}>§ HOW TO RETALIATE</div>
        <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8" }}>{data.retaliate}</div>
      </div>

      <div>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.5)", letterSpacing: "0.2em", marginBottom: "6px" }}>§ DATA SOURCES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {data.sources.map((s, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.6)", border: "1px solid rgba(0,255,255,0.2)", padding: "3px 8px" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── OVERVIEW MODULE ──
function OverviewModule() {
  const [activeSlice, setActiveSlice] = useState(null);
  const [activeRadar, setActiveRadar] = useState(null);

  const kpis = [
    { label: "REGISTERED CRIMES (2022)", value: "58,24,946", src: "NCRB-2022", trend: "↑ +4.5% YoY", color: "#FF3333" },
    { label: "SUICIDE CASES (2022)", value: "1,70,924", src: "NCRB-2022", trend: "↑ +4.2% YoY", color: "#FF6633" },
    { label: "LITERACY RATE", value: "77.7", unit: "%", src: "CENSUS-2021", trend: "↓ +1.9% from 2011", color: "#00FF88" },
    { label: "BELOW POVERTY LINE", value: "11.2", unit: "%", src: "NITI-2023", trend: "↓ improving", color: "#FFD700" },
    { label: "CHILD STUNTING", value: "35.5", unit: "%", src: "NFHS5", trend: "↓ -3.5% from NFHS-4", color: "#FF8C00" },
    { label: "YOUTH UNEMPLOYMENT", value: "23.2", unit: "%", src: "CMIE-2023", trend: "↑ crisis level", color: "#FF3333" },
  ];

  function handlePieClick(data) {
    if (!data) return;
    const name = data.name || (data.payload && data.payload.name);
    if (!name) return;
    setActiveSlice(prev => prev === name ? null : name);
    setActiveRadar(null);
  }

  function handleRadarClick(data) {
    if (!data || !data.activePayload) return;
    const metric = data.activePayload[0]?.payload?.metric;
    if (!metric) return;
    setActiveRadar(prev => prev === metric ? null : metric);
    setActiveSlice(null);
  }

  return (
    <div>
      <SectionTitle num="00" title="NATIONAL SNAPSHOT" sub="// INDIA AT A GLANCE — KEY INDICATORS 2022-23" />
      <Annotation>⚠ ALL DATA SOURCED FROM OFFICIAL GOVERNMENT PUBLICATIONS: NCRB, NFHS-5, UDISE+, MOSPI, CMIE. STATISTICS REPRESENT REPORTED FIGURES ONLY. ACTUAL NUMBERS MAY BE SIGNIFICANTLY HIGHER DUE TO UNDER-REPORTING.</Annotation>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        {kpis.map((k, i) => <StatTile key={i} {...k} />)}
      </div>

      {/* PIE CHART */}
      <BCard serial="§ 00-A" title="CRIME CATEGORY BREAKDOWN — CLICK A SLICE TO DEEP DIVE [SRC: NCRB-2022]">
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.6)", marginBottom: "8px", letterSpacing: "0.1em" }}>
          ▶ CLICK ANY SLICE FOR RABBIT HOLE — CASES, CAUSES, BURIED INVESTIGATIONS & MEDIA SOURCES
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={DATA.crimeCategories}
              dataKey="value" nameKey="name"
              cx="50%" cy="50%" outerRadius={90}
              stroke="rgba(0,20,50,0.8)" strokeWidth={2}
              onClick={handlePieClick}
              style={{ cursor: "pointer" }}
            >
              {DATA.crimeCategories.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                  opacity={activeSlice && activeSlice !== entry.name ? 0.3 : 1}
                  stroke={activeSlice === entry.name ? "#FFFFFF" : "rgba(0,20,50,0.8)"}
                  strokeWidth={activeSlice === entry.name ? 2 : 1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
          {DATA.crimeCategories.map((c, i) => (
            <button key={i} onClick={() => { setActiveSlice(prev => prev === c.name ? null : c.name); setActiveRadar(null); }}
              style={{
                background: activeSlice === c.name ? `rgba(${c.color},0.2)` : "none",
                border: `1px solid ${activeSlice === c.name ? c.color : "rgba(255,255,255,0.15)"}`,
                color: activeSlice === c.name ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                fontFamily: "monospace", fontSize: "8px", padding: "3px 8px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", letterSpacing: "0.08em",
              }}>
              <div style={{ width: 8, height: 8, background: c.color, flexShrink: 0 }} />
              {c.name} ▼
            </button>
          ))}
        </div>
        {activeSlice && RABBIT_HOLES[activeSlice] && (
          <RabbitHole data={RABBIT_HOLES[activeSlice]} onClose={() => setActiveSlice(null)} />
        )}
      </BCard>

      {/* SUICIDE CAUSES */}
      <BCard serial="§ 00-B" title="CAUSES OF SUICIDE IN INDIA — ALL CATEGORIES [SRC: NCRB 2022]">
        <Annotation color="#FF3333" rotate="0deg">
          ⚠ TOTAL: 1,70,924 SUICIDES IN 2022. RURAL DATA IS SEVERELY UNDER-COUNTED — NCRB RELIES ON POLICE RECORDS WHICH ARE ABSENT IN MANY VILLAGES. CASES INVOLVING CASTE ATROCITIES OR DEBT ARE FREQUENTLY MISCLASSIFIED AS "UNKNOWN CAUSE".
        </Annotation>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "12px", lineHeight: "1.8", letterSpacing: "0.05em" }}>
          <span style={{ color: "#FFD700" }}>WHY RURAL DATA IS MISSING: </span>
          In rural India, suicide deaths often go unreported as families fear social stigma, land disputes, or police harassment. Many are registered as "accidental deaths." NCRB data depends on FIR filing — in areas with no police station within 20km, this simply doesn't happen. Farmer suicide data from Maharashtra, Vidarbha region is estimated to be 3-4x the official figure (P. Sainath, The Hindu).
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={DATA.suicideCauses} layout="vertical" margin={{ left: 20, right: 40 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <YAxis type="category" dataKey="cause" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 8 }} width={130} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="CASES" radius={[0, 2, 2, 0]}>
              {DATA.suicideCauses.map((entry, i) => (
                <Cell key={i} fill={`rgba(255,${50 + i * 12},51,${0.9 - i * 0.04})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: "4px" }}>
          {DATA.suicideCauses.map((c, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.5)", display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span>{c.cause}</span>
              <span style={{ color: "#FF3333" }}>{c.pct}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "16px", padding: "12px", border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.03)" }}>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#FFD700", letterSpacing: "0.15em", marginBottom: "8px" }}>§ WHAT'S NOT BEING COUNTED</div>
          {[
            "→ RURAL UNDER-REPORTING: Estimated 30-40% of rural suicides never reach police records (Lancet 2012 study estimated 187,000 vs NCRB's 135,000)",
            "→ CASTE-BASED SUICIDES: Deaths due to caste atrocities, untouchability, and bonded labour routinely classified as 'personal problems'",
            "→ LONG PENDING CASES: Over 2,400 suicide abetment cases pending trial for 5+ years — accused include landlords, moneylenders, police officers",
            "→ INSTITUTIONAL DEATHS: Suicides in jails, govt hostels, defence establishments excluded from mainstream NCRB data",
            "→ MANIPUR/J&K: Conflict-zone suicides among civilians and armed forces personnel remain classified",
          ].map((t, i) => <ListItem key={i} text={t} />)}
        </div>
      </BCard>

      {/* RADAR */}
      <BCard serial="§ 00-C" title="INDIA DEVELOPMENT RADAR — CLICK A POINT TO DEEP DIVE">
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.6)", marginBottom: "8px", letterSpacing: "0.1em" }}>
          ▶ CLICK ANY DATA POINT OR LABEL BUTTON FOR FACTS, GAPS & HOW TO RETALIATE
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={DATA.radarData} onClick={handleRadarClick} style={{ cursor: "pointer" }}>
            <PolarGrid stroke="rgba(0,255,255,0.15)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
            <Radar name="INDIA" dataKey="value" stroke="#00FFFF" fill="rgba(0,255,255,0.15)" strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
          {DATA.radarData.map((r, i) => (
            <button key={i} onClick={() => { setActiveRadar(prev => prev === r.metric ? null : r.metric); setActiveSlice(null); }}
              style={{
                background: activeRadar === r.metric ? "rgba(0,255,255,0.1)" : "none",
                border: `1px solid ${activeRadar === r.metric ? "#00FFFF" : "rgba(255,255,255,0.15)"}`,
                color: activeRadar === r.metric ? "#00FFFF" : "rgba(255,255,255,0.6)",
                fontFamily: "monospace", fontSize: "8px", padding: "4px 10px",
                cursor: "pointer", letterSpacing: "0.1em",
              }}>
              {r.metric} [{r.value}/100] ▼
            </button>
          ))}
        </div>
        {activeRadar && RADAR_DEEP[activeRadar] && (
          <RadarDeepDive data={{ ...RADAR_DEEP[activeRadar], metric: activeRadar }} onClose={() => setActiveRadar(null)} />
        )}
        <Annotation color="#00FFFF" rotate="0deg">// SCORE OUT OF 100 — COMPOSITE INDEX BASED ON NCRB, NFHS-5, UDISE+, CMIE, MOSPI, WEF, IQAir, WHO DATA. HIGHER = BETTER.</Annotation>
      </BCard>
    </div>
  );
}

// ── SAFETY MODULE ──
function SafetyModule() {
  const womenChildren = DATA.helplines.find(h => h.cat === "WOMEN & CHILDREN");
  return (
    <div>
      <SectionTitle num="01" title="SAFETY & CRIME" sub="// STATEWISE CRIME DATA — SOURCE: NCRB ANNUAL REPORT 2022" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <StatTile label="TOTAL IPC CRIMES" value="58,24,946" src="NCRB-2022" trend="↑ +4.5% YoY" color="#FF3333" />
        <StatTile label="CRIMES AGAINST WOMEN" value="4,45,256" src="NCRB-2022" trend="↑ +4.0% YoY" color="#FF3399" />
        <StatTile label="CYBERCRIME CASES" value="2,65,876" src="NCRB-2022" trend="↑ +24.4% YoY" color="#00FFFF" />
        <StatTile label="CONVICTION RATE" value="50.4" unit="%" src="NCRB-2022" trend="↓ vs 61% in 2010" color="#FF8C00" />
      </div>
      <BCard serial="§ 01-A" title="CRIMES BY STATE — TOP 10 [SRC: NCRB-2022]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={DATA.crimeByState} margin={{ left: 0, right: 16 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="state" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 9 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="crimes" fill="rgba(255,51,51,0.7)" name="TOTAL CRIMES" radius={[2, 2, 0, 0]} />
            <Bar dataKey="women" fill="rgba(255,51,153,0.7)" name="VS WOMEN" radius={[2, 2, 0, 0]} />
            <Bar dataKey="murder" fill="rgba(255,140,0,0.7)" name="MURDER" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 01-B" title="ROOT CAUSES">
          <Annotation color="#FF3333" rotate="0deg">⚠ REDLINE ANALYSIS</Annotation>
          {["→ Under-reporting: est. 90%+ of rape cases unreported", "→ Police density: 153/lakh vs UN norm of 222/lakh", "→ Conviction rate gap: 50% vs 94% chargesheeting", "→ Fast-track courts: 1,023 of 2,000 target operational", "→ Patriarchal norms & victim-blaming culture", "→ Cyber cell: 1 officer per ~5,000 cyber crimes"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
        <BCard serial="§ 01-C" title="SYSTEMIC SOLUTIONS">
          <Annotation color="#00FF88" rotate="0deg">✓ WHAT'S BEING DONE</Annotation>
          {["→ POCSO e-Box portal for child abuse reporting", "→ One Stop Centres (Sakhi) — 733 active", "→ CCTNS: Crime & Criminals Tracking Network", "→ Mission Shakti: women safety scheme (2021)", "→ Nirbhaya Fund: ₹3,600 Cr for women safety", "→ 112 India app: emergency response"].map((t, i) => <ListItem key={i} text={t} />)}
          <div style={{ marginTop: "12px", fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", letterSpacing: "0.08em" }}>REPORT: cybercrime.gov.in · 112</div>
        </BCard>
      </div>
      <BCard serial="§ 01-D" title="EMERGENCY HELPLINES — SAFETY">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "8px" }}>
          {womenChildren && womenChildren.items.map((h, i) => <HelpCard key={i} {...h} />)}
        </div>
      </BCard>
    </div>
  );
}

// ── MENTAL HEALTH MODULE ──
function MentalHealthModule() {
  const [gate, setGate] = useState(true);
  const mentalHealth = DATA.helplines.find(h => h.cat === "MENTAL HEALTH");
  if (gate) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", padding: "20px" }}>
        <BCard style={{ maxWidth: "480px", borderColor: "rgba(255,51,51,0.5)" }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#FF3333", letterSpacing: "0.2em", marginBottom: "12px" }}>⚠ CONTENT WARNING</div>
          <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: "900", color: "#FFFFFF", marginBottom: "12px", textTransform: "uppercase" }}>This section contains suicide &amp; mental health data</div>
          <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "20px", lineHeight: 1.8 }}>
            If you are in distress, please reach out:<br />
            <span style={{ color: "#FF3333", fontSize: "16px" }}>iCALL: 9152987821</span><br />
            <span style={{ color: "#FF3333" }}>NIMHANS: 14416</span>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setGate(false)} style={{ background: "none", border: "2px solid #FFFFFF", color: "#FFFFFF", fontFamily: "monospace", fontSize: "10px", padding: "10px 20px", cursor: "pointer", letterSpacing: "0.15em" }}>I UNDERSTAND — SHOW DATA</button>
            <button onClick={() => setGate(false)} style={{ background: "rgba(255,51,51,0.15)", border: "2px solid #FF3333", color: "#FF3333", fontFamily: "monospace", fontSize: "10px", padding: "10px 20px", cursor: "pointer", letterSpacing: "0.15em" }}>TAKE ME TO HELPLINES</button>
          </div>
        </BCard>
      </div>
    );
  }
  return (
    <div>
      <SectionTitle num="02" title="MENTAL HEALTH & SUICIDE" sub="// DATA: NCRB 2022 + NIMHANS NATIONAL MENTAL HEALTH SURVEY" />
      <div style={{ background: "rgba(255,51,51,0.08)", border: "1px solid rgba(255,51,51,0.3)", padding: "10px 16px", marginBottom: "20px", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
        🆘 IN CRISIS? CALL iCALL: <strong style={{ color: "#FF3333" }}>9152987821</strong> or NIMHANS: <strong style={{ color: "#FF3333" }}>14416</strong> — Free, Confidential, 24/7
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <StatTile label="SUICIDES IN 2022" value="1,70,924" src="NCRB-2022" trend="↑ HIGHEST RECORDED" color="#FF3333" />
        <StatTile label="FARMER SUICIDES" value="11,290" src="NCRB-2022" trend="↑ +3.8% YoY" color="#FF6633" />
        <StatTile label="STUDENT SUICIDES" value="13,044" src="NCRB-2022" trend="↑ +4.2% YoY" color="#FF8C00" />
        <StatTile label="PSYCHIATRISTS/LAKH" value="0.3" src="NIMHANS-2023" trend="↓ WHO NORM: 1.0/lakh" color="#FFD700" />
      </div>
      <BCard serial="§ 02-A" title="SUICIDE CAUSES — SEE OVERVIEW TAB FOR FULL BREAKDOWN">
        <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.6)", padding: "16px", border: "1px solid rgba(255,255,255,0.08)", lineHeight: "1.8" }}>
          → Full causes breakdown chart is in <span style={{ color: "#00FFFF" }}>OVERVIEW → § 00-B</span><br />
          → Top causes: Family Problems (20.9%), Mental Illness (13.3%), Physical Illness (11.1%), Financial Distress (11.1%)<br />
          → Rural suicides estimated 3-4x higher than official data (P. Sainath, The Hindu / Lancet 2012)<br />
          → 2,400+ suicide abetment cases pending trial for 5+ years
        </div>
      </BCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 02-B" title="ROOT CAUSES">
          {["→ Social stigma: 80% never seek help (NMHS)", "→ 0.3 psychiatrists per lakh (WHO: 1.0)", "→ No mental health in primary care curriculum", "→ Agrarian crisis: debt + crop failure", "→ Academic pressure: JEE/NEET hyper-competition", "→ Unemployment anxiety (esp. youth 18-25)", "→ Domestic violence correlation"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
        <BCard serial="§ 02-C" title="SOLUTIONS & SCHEMES">
          {["→ NIMHANS Tele-MANAS: 14416 (free, 24/7)", "→ Mental Healthcare Act 2017: right to treatment", "→ CBSE School Mental Health Guidelines 2023", "→ PM-KISAN ₹6000/yr: farmer distress reduction", "→ NMHP: National Mental Health Programme", "→ 'Be There' certification: free online training", "→ Reduce stigma: talk about it in your community"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
      </div>
      <BCard serial="§ 02-D" title="MENTAL HEALTH HELPLINES">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "8px" }}>
          {mentalHealth && mentalHealth.items.map((h, i) => <HelpCard key={i} {...h} />)}
        </div>
      </BCard>
    </div>
  );
}

// ── HEALTH MODULE ──
function HealthModule() {
  const healthDisaster = DATA.helplines.find(h => h.cat === "HEALTH & DISASTER");
  return (
    <div>
      <SectionTitle num="03" title="PUBLIC HEALTH" sub="// NFHS-5 2019-21 · NATIONAL HEALTH PROFILE 2022" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <StatTile label="INFANT MORTALITY RATE" value="28" unit="/1000" src="NFHS5" trend="↓ improving" color="#00FF88" />
        <StatTile label="ANEMIA IN WOMEN" value="57" unit="%" src="NFHS5" trend="↑ +1% vs NFHS-4" color="#FF3333" />
        <StatTile label="CHILD STUNTING" value="35.5" unit="%" src="NFHS5" trend="↓ -3.5%" color="#FF8C00" />
        <StatTile label="HOSP. BEDS/1000" value="1.4" src="NHP-2022" trend="↓ WHO NORM: 3.5" color="#FF3333" />
      </div>
      <BCard serial="§ 03-A" title="INFANT MORTALITY RATE BY STATE [SRC: NFHS-5]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={DATA.healthMetrics} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <YAxis type="category" dataKey="state" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 9 }} width={30} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="imr" fill="rgba(255,100,50,0.7)" name="IMR PER 1000" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 03-B" title="KEY GAPS">
          {["→ India: 0.74 doctors/1000 (WHO: 1.0/1000)", "→ Health spend: 1.28% GDP (OECD avg: 8.8%)", "→ TB: 210 cases/lakh — highest burden globally", "→ 57% women anemic — public health emergency", "→ Rural-Urban health infra gap: 3:1 ratio", "→ Only 29% births in public facilities (NFHS-5)"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
        <BCard serial="§ 03-C" title="ACTIVE SCHEMES">
          {["→ Ayushman Bharat PM-JAY: 55 Cr beneficiaries", "→ National Health Mission (NHM): rural PHC", "→ POSHAN Abhiyaan: stunting reduction target", "→ Jal Jeevan Mission: tap water by 2024", "→ PM Surakshit Matritva Abhiyan: prenatal care", "→ National TB Elimination Programme by 2025"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
      </div>
      <BCard serial="§ 03-D" title="HEALTH HELPLINES">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "8px" }}>
          {healthDisaster && healthDisaster.items.map((h, i) => <HelpCard key={i} {...h} />)}
        </div>
      </BCard>
    </div>
  );
}

// ── EDUCATION MODULE ──
function EducationModule() {
  return (
    <div>
      <SectionTitle num="04" title="EDUCATION" sub="// UDISE+ 2022 · ASER 2023 · NAS 2021" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <StatTile label="NATIONAL LITERACY" value="77.7" unit="%" src="CENSUS-2021" trend="↓ +1.9%" color="#00FF88" />
        <StatTile label="FEMALE LITERACY" value="70.3" unit="%" src="CENSUS-2021" trend="↓ improving" color="#FFD700" />
        <StatTile label="OUT-OF-SCHOOL" value="1,97,00,000" src="UDISE-2022" trend="↓ reducing slowly" color="#FF8C00" />
        <StatTile label="LEARNING OUTCOME" value="42" unit="%" src="ASER-2023" trend="↑ class 5 reading class 2 text" color="#FF3333" />
      </div>
      <BCard serial="§ 04-A" title="THE DROPOUT LABYRINTH — ENROLLMENT FUNNEL [SRC: UDISE-2022]">
        <Annotation color="#FF3333" rotate="0deg">⚠ OF EVERY 100 STUDENTS ENTERING CLASS 1, ONLY 18 REACH GRADUATION. THIS IS THE LABYRINTH IN DATA.</Annotation>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={DATA.educationFunnel} margin={{ left: 10 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="stage" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} domain={[0, 100]} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="students" name="STUDENTS REMAINING %" radius={[2, 2, 0, 0]}>
              {DATA.educationFunnel.map((entry, i) => (
                <Cell key={i} fill={`rgba(0,255,255,${0.9 - i * 0.12})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </BCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 04-B" title="ROOT CAUSES">
          {["→ Poverty: children work instead of study", "→ Schools lack toilets: girls drop out at puberty", "→ Teacher vacancy: 10 lakh posts unfilled", "→ Poor learning quality: rote vs understanding", "→ Female literacy gap: 7.4% urban, 17.8% rural", "→ SC/ST/OBC access barriers persist"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
        <BCard serial="§ 04-C" title="SOLUTIONS & ACTION">
          {["→ NEP 2020: foundational literacy by class 3", "→ NIPUN Bharat: reading + numeracy mission", "→ PM POSHAN (Mid-Day Meal): 11.8 Cr children", "→ Beti Bachao Beti Padhao: girl enrollment", "→ Volunteer: Teach For India, Pratham, Akanksha", "→ Report non-functional schools: Shaala Darpan"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
      </div>
    </div>
  );
}

// ── ECONOMY MODULE ──
function EconomyModule() {
  const legalLabour = DATA.helplines.find(h => h.cat === "LEGAL & LABOUR");
  return (
    <div>
      <SectionTitle num="05" title="ECONOMY & INEQUALITY" sub="// MOSPI 2023 · CMIE 2023 · WORLD BANK · OXFAM INDIA" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <StatTile label="BELOW POVERTY LINE" value="11.2" unit="%" src="NITI-2023" trend="↓ improving" color="#00FF88" />
        <StatTile label="YOUTH UNEMPLOYMENT" value="23.2" unit="%" src="CMIE-2023" trend="↑ CRISIS" color="#FF3333" />
        <StatTile label="INFORMAL WORKFORCE" value="90" unit="%" src="MOSPI-2023" trend="→ no social security" color="#FF8C00" />
        <StatTile label="TOP 1% WEALTH SHARE" value="40.1" unit="%" src="OXFAM-2023" trend="↑ widening gap" color="#FF3333" />
      </div>
      <BCard serial="§ 05-A" title="POVERTY & UNEMPLOYMENT TREND 2004-2023 [SRC: MOSPI/CMIE]">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={DATA.economyData}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="poverty" stroke="#FF8C00" strokeWidth={2} dot={{ r: 3, fill: "#FF8C00" }} name="POVERTY %" />
            <Line type="monotone" dataKey="unemployment" stroke="#FF3333" strokeWidth={2} dot={{ r: 3, fill: "#FF3333" }} name="UNEMPLOYMENT %" />
            <Line type="monotone" dataKey="gini" stroke="#00FFFF" strokeWidth={2} dot={{ r: 3, fill: "#00FFFF" }} name="GINI INDEX" />
          </LineChart>
        </ResponsiveContainer>
        <Annotation color="#FFD700" rotate="0deg">⚠ 2020-21 COVID IMPACT: poverty rose, unemployment spiked. Gini index shows widening inequality despite poverty reduction.</Annotation>
      </BCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 05-B" title="STRUCTURAL ISSUES">
          {["→ 90% informal workers: zero social protection", "→ Agriculture: 44% workforce, 14% of GDP", "→ Farmer avg income: ₹10,218/month (2019)", "→ Gender wage gap: women earn 76p per ₹1 by men", "→ 40.1% national wealth owned by top 1% (Oxfam)", "→ 7 Cr migrant workers: no portability of benefits"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
        <BCard serial="§ 05-C" title="WHAT'S BEING DONE">
          {["→ PM-KISAN: ₹6,000/yr direct transfer to farmers", "→ MGNREGS: 100-day employment guarantee", "→ MUDRA Loans: ₹20L credit to micro-enterprises", "→ PLI Scheme: manufacturing jobs creation", "→ Startup India: 98,000+ DPIIT startups (2023)", "→ E-SHRAM portal: informal worker registration"].map((t, i) => <ListItem key={i} text={t} />)}
        </BCard>
      </div>
      <BCard serial="§ 05-D" title="LABOUR & LEGAL HELPLINES">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "8px" }}>
          {legalLabour && legalLabour.items.map((h, i) => <HelpCard key={i} {...h} />)}
        </div>
      </BCard>
    </div>
  );
}

// ── HELPLINES MODULE ──
function HelplinesModule() {
  const [search, setSearch] = useState("");
  const filtered = DATA.helplines
    .map(cat => ({ ...cat, items: cat.items.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.num.includes(search) || h.org.toLowerCase().includes(search.toLowerCase())) }))
    .filter(cat => cat.items.length > 0);
  return (
    <div>
      <SectionTitle num="06" title="HELPLINE DIRECTORY" sub="// ALL NUMBERS VERIFIED AS OF 2024 — SHARE WIDELY" />
      <Annotation color="#FF3333" rotate="0deg">⚠ ALL NUMBERS VERIFIED AS OF 2024. PLEASE VERIFY BEFORE SHARING. HELPLINE AVAILABILITY MAY VARY BY STATE.</Annotation>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="SEARCH BY NAME, NUMBER, OR ORGANIZATION..."
          style={{ width: "100%", background: "rgba(0,20,50,0.8)", border: "1px solid rgba(0,255,255,0.3)", color: "#FFFFFF", fontFamily: "monospace", fontSize: "11px", padding: "12px 16px", letterSpacing: "0.1em", outline: "none", boxSizing: "border-box" }} />
        <div style={{ position: "absolute", right: "16px", top: "13px", fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.5)", pointerEvents: "none" }}>SEARCH ▸</div>
      </div>
      {filtered.map((cat, ci) => (
        <BCard key={ci} serial={`§ 06-${String.fromCharCode(65 + ci)}`} title={cat.cat}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "8px" }}>
            {cat.items.map((h, i) => <HelpCard key={i} {...h} />)}
          </div>
        </BCard>
      ))}
    </div>
  );
}

// ── MAIN APP ──
export default function IndiaLabyrinth() {
  const [activeModule, setActiveModule] = useState("OVERVIEW");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerIndex(p => (p + 1) % TICKER_DATA.length), 2800);
    return () => clearInterval(t);
  }, []);

  function handleMouseMove(e) {
    setCursor({ x: e.clientX, y: e.clientY });
    if (!showCursor) setShowCursor(true);
  }

  function renderModule() {
    switch (activeModule) {
      case "OVERVIEW": return <OverviewModule />;
      case "SAFETY": return <SafetyModule />;
      case "MENTAL HEALTH": return <MentalHealthModule />;
      case "HEALTH": return <HealthModule />;
      case "EDUCATION": return <EducationModule />;
      case "ECONOMY": return <EconomyModule />;
      case "HELPLINES": return <HelplinesModule />;
      default: return <OverviewModule />;
    }
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ background: "#003366", minHeight: "100vh", color: "#FFFFFF", fontFamily: "monospace", position: "relative", cursor: "crosshair" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      <GridBg />
      {showCursor && <Crosshair x={cursor.x} y={cursor.y} />}

      {/* TICKER */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(0,10,30,0.95)", borderBottom: "1px solid rgba(0,255,255,0.2)", padding: "6px 20px", display: "flex", alignItems: "center", gap: "16px", backdropFilter: "blur(8px)" }}>
        <div style={{ fontSize: "13px", fontWeight: 900, color: "#FF3333", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>INDIA'S LABYRINTH</div>
        <div style={{ flex: 1, overflow: "hidden", fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>// {TICKER_DATA[tickerIndex]}</div>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
      </div>

      {/* HERO */}
      <div style={{ paddingTop: "72px", paddingBottom: "40px", paddingLeft: "40px", paddingRight: "40px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <path d="M20,20 L380,20 L380,180 L20,180 L20,60 L300,60 L300,140 L80,140 L80,80 L240,80 L240,120 L120,120 L120,100 L200,100" fill="none" stroke="#00FFFF" strokeWidth="2" />
        </svg>
        <div style={{ maxWidth: "900px", position: "relative" }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#00FFFF", letterSpacing: "0.3em", marginBottom: "8px" }}>§ PROJECT-001 // CIVIC INTELLIGENCE PLATFORM</div>
          <div style={{ fontSize: "clamp(48px,8vw,96px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 0.95, letterSpacing: "0.04em", marginBottom: "16px", textTransform: "uppercase" }}>
            INDIA'S<br />
            <span style={{ color: "#FF3333", WebkitTextStroke: "1px #FF3333", WebkitTextFillColor: "transparent" }}>LABYRINTH</span>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "13px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", marginBottom: "24px", maxWidth: "600px", lineHeight: 1.7 }}>
            // NAVIGATING THE SYSTEMS THAT SHAPE 1.4 BILLION LIVES<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>EVERY STAT IS A PERSON. THE LABYRINTH HAS A WAY OUT.</span>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => setActiveModule("OVERVIEW")} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,51,51,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; }} style={{ background: "none", border: "2px solid #FF3333", color: "#FF3333", fontFamily: "monospace", fontSize: "11px", padding: "10px 24px", cursor: "pointer", letterSpacing: "0.2em" }}>EXPLORE THE DATA →</button>
            <button onClick={() => setActiveModule("HELPLINES")} onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; }} style={{ background: "none", border: "2px solid #00FFFF", color: "#00FFFF", fontFamily: "monospace", fontSize: "11px", padding: "10px 24px", cursor: "pointer", letterSpacing: "0.2em" }}>VIEW HELPLINES</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "16px", right: "40px", fontFamily: "monospace", fontSize: "9px", color: "rgba(0,255,255,0.3)", letterSpacing: "0.1em" }}>←————————————— 100% VW —————————————→</div>
      </div>

      {/* NAV */}
      <div style={{ position: "sticky", top: "33px", zIndex: 90, background: "rgba(0,10,30,0.97)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", overflowX: "auto", backdropFilter: "blur(8px)", scrollbarWidth: "none" }}>
        {MODULES.map(m => (
          <button key={m} onClick={() => setActiveModule(m)}
            onMouseEnter={e => { if (activeModule !== m) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { if (activeModule !== m) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            style={{ background: "none", borderBottom: activeModule === m ? "2px solid #FF3333" : "2px solid transparent", borderTop: "none", borderLeft: "none", borderRight: "1px solid rgba(255,255,255,0.06)", color: activeModule === m ? "#FF3333" : "rgba(255,255,255,0.45)", fontFamily: "monospace", fontSize: "10px", padding: "14px 20px", cursor: "pointer", letterSpacing: "0.15em", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {m}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 1 }}>
        {renderModule()}
      </div>

      {/* FLOATING HELPLINE */}
      <button onClick={() => setActiveModule("HELPLINES")} style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 200, background: "rgba(255,51,51,0.15)", border: "2px solid #FF3333", color: "#FF3333", fontFamily: "monospace", fontSize: "10px", padding: "12px 18px", cursor: "pointer", letterSpacing: "0.15em", backdropFilter: "blur(8px)", animation: "pulse 2s infinite" }}>
        🆘 HELPLINES
      </button>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 40px", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", lineHeight: 1.8, letterSpacing: "0.08em", background: "rgba(0,5,20,0.5)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ color: "rgba(0,255,255,0.5)" }}>INDIA'S LABYRINTH</span> — INDEPENDENT CIVIC AWARENESS PROJECT. ALL DATA SOURCED FROM OFFICIAL GOVERNMENT OF INDIA PUBLICATIONS (NCRB, NFHS-5, UDISE+, MOSPI, CMIE). THIS PLATFORM PRESENTS AGGREGATED STATISTICS FOR PUBLIC EDUCATION ONLY. WE DO NOT REPRESENT ANY GOVERNMENT BODY, POLITICAL PARTY, OR ORGANIZATION. // DATA REFLECTS 2022-23 REPORTING PERIOD. HELPLINES VERIFIED AS OF 2024.
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 20px rgba(255,51,51,0.3)} 50%{box-shadow:0 0 35px rgba(255,51,51,0.6)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:rgba(0,0,0,0.2)}
        ::-webkit-scrollbar-thumb{background:rgba(0,255,255,0.3)}
        button{transition:all 0.2s}
        input::placeholder{color:rgba(255,255,255,0.25)}
      `}</style>
    </div>
  );
}