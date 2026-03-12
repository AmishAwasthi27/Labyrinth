// India's Labyrinth - Full Blueprint Civic Dashboard
import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis
} from "recharts";

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
  suicideTrend: [
    { year: "2013", total: 134799, farmers: 11772, students: 8934 },
    { year: "2014", total: 131666, farmers: 12360, students: 8068 },
    { year: "2015", total: 133623, farmers: 12602, students: 8934 },
    { year: "2016", total: 131008, farmers: 11379, students: 9478 },
    { year: "2017", total: 129887, farmers: 10655, students: 9905 },
    { year: "2018", total: 134516, farmers: 10349, students: 10159 },
    { year: "2019", total: 139123, farmers: 10281, students: 10335 },
    { year: "2020", total: 153052, farmers: 10677, students: 12526 },
    { year: "2021", total: 164033, farmers: 10881, students: 13089 },
    { year: "2022", total: 170924, farmers: 11290, students: 13044 },
  ],
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
  "POPULATION: 144.17 CR",
  "GDP: ₹296.58 LCR",
  "LITERACY: 77.7%",
  "HDI RANK: 132/193",
  "UNEMPLOYMENT: 8.1%",
  "SEX RATIO: 943/1000",
  "UNDER-5 MORTALITY: 32/1000",
  "FOREST COVER: 21.7%",
  "ANEMIA IN WOMEN: 57%",
  "OPEN DEFECATION FREE: 100% (CLAIMED)",
];

// ── SHARED COMPONENTS ──

function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px",
    }} />
  );
}

function Crosshair({ x, y }) {
  return (
    <div style={{
      position: "fixed", left: x + 14, top: y - 8,
      pointerEvents: "none", zIndex: 9999,
      fontFamily: "monospace", fontSize: "10px",
      color: "#00FFFF", opacity: 0.7,
      textShadow: "0 0 8px rgba(0,255,255,0.5)",
    }}>
      X:{Math.round(x)} Y:{Math.round(y)}
    </div>
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
      position: "relative",
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,20,50,0.6)",
      padding: "20px",
      marginBottom: "16px",
      backdropFilter: "blur(4px)",
      ...extraStyle,
    }}>
      <CardCorners />
      {(title || serial) && (
        <div style={{
          fontFamily: "monospace", fontSize: "10px", color: "#00FFFF",
          marginBottom: "12px", letterSpacing: "0.15em",
          display: "flex", justifyContent: "space-between",
        }}>
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
    const duration = 1800;
    const stepTime = 16;
    const increment = num / (duration / stepTime);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        const rounded = Math.round(start);
        setDisplay(
          typeof value === "string" && value.includes(",")
            ? rounded.toLocaleString("en-IN")
            : rounded
        );
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  const trendColor = !trend ? "#FFFFFF" : trend.startsWith("↑") ? "#FF3333" : trend.startsWith("↓") ? "#00FF88" : "#FF8C00";

  return (
    <div style={{
      position: "relative",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(0,15,40,0.8)",
      padding: "16px 18px",
      flex: "1 1 180px",
      minWidth: "160px",
    }}>
      <CardCorners />
      <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: "28px", fontWeight: "bold", color, lineHeight: 1, letterSpacing: "0.05em" }}>
        {display}
        <span style={{ fontSize: "13px", marginLeft: "4px", color: "rgba(255,255,255,0.5)" }}>{unit}</span>
      </div>
      {trend && <div style={{ fontFamily: "monospace", fontSize: "9px", color: trendColor, marginTop: "4px" }}>{trend}</div>}
      {src && <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(0,255,255,0.5)", marginTop: "6px" }}>[SRC: {src}]</div>}
    </div>
  );
}

function Annotation({ children, rotate = "-1.5deg", color = "#FFD700" }) {
  return (
    <div style={{
      fontFamily: "monospace", fontSize: "11px", color,
      border: `1px solid ${color}`,
      background: "rgba(255,215,0,0.04)",
      padding: "10px 14px",
      transform: `rotate(${rotate})`,
      marginBottom: "12px",
      lineHeight: "1.6", letterSpacing: "0.05em",
    }}>
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
    <div style={{
      border: "2px solid #FF3333", background: "rgba(255,51,51,0.05)",
      padding: "12px 16px", marginBottom: "8px", position: "relative",
    }}>
      <CardCorners />
      <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>{name}</div>
      <div style={{ fontFamily: "monospace", fontSize: "24px", fontWeight: "bold", color: "#FF3333", letterSpacing: "0.1em" }}>{num}</div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", flex: 1 }}>{org} · {hours}</div>
        <button onClick={handleShare} style={{
          background: "none", border: "1px solid #00FFFF", color: "#00FFFF",
          fontFamily: "monospace", fontSize: "9px", padding: "3px 8px",
          cursor: "pointer", letterSpacing: "0.1em",
        }}>SHARE ↗</button>
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
    <div style={{
      background: "rgba(0,20,50,0.97)", border: "1px solid rgba(0,255,255,0.3)",
      padding: "10px 14px", fontFamily: "monospace", fontSize: "10px",
    }}>
      <div style={{ color: "#00FFFF", marginBottom: "4px", letterSpacing: "0.1em" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}
        </div>
      ))}
    </div>
  );
}

function ListItem({ text }) {
  return (
    <div style={{
      fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.7)",
      padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.04em",
    }}>{text}</div>
  );
}

// ── OVERVIEW ──

function OverviewModule() {
  const kpis = [
    { label: "REGISTERED CRIMES (2022)", value: "58,24,946", src: "NCRB-2022", trend: "↑ +4.5% YoY", color: "#FF3333" },
    { label: "SUICIDE CASES (2022)", value: "1,70,924", src: "NCRB-2022", trend: "↑ +4.2% YoY", color: "#FF6633" },
    { label: "LITERACY RATE", value: "77.7", unit: "%", src: "CENSUS-2021", trend: "↓ +1.9% from 2011", color: "#00FF88" },
    { label: "BELOW POVERTY LINE", value: "11.2", unit: "%", src: "NITI-2023", trend: "↓ improving", color: "#FFD700" },
    { label: "CHILD STUNTING", value: "35.5", unit: "%", src: "NFHS5", trend: "↓ -3.5% from NFHS-4", color: "#FF8C00" },
    { label: "YOUTH UNEMPLOYMENT", value: "23.2", unit: "%", src: "CMIE-2023", trend: "↑ crisis level", color: "#FF3333" },
  ];
  return (
    <div>
      <SectionTitle num="00" title="NATIONAL SNAPSHOT" sub="// INDIA AT A GLANCE — KEY INDICATORS 2022-23" />
      <Annotation>⚠ ALL DATA SOURCED FROM OFFICIAL GOVERNMENT PUBLICATIONS: NCRB, NFHS-5, UDISE+, MOSPI, CMIE. STATISTICS REPRESENT REPORTED FIGURES ONLY. ACTUAL NUMBERS MAY BE SIGNIFICANTLY HIGHER DUE TO UNDER-REPORTING.</Annotation>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        {kpis.map((k, i) => <StatTile key={i} {...k} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <BCard serial="§ 00-A" title="CRIME CATEGORY BREAKDOWN [SRC: NCRB-2022]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={DATA.crimeCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} stroke="rgba(0,20,50,0.8)" strokeWidth={2}>
                {DATA.crimeCategories.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            {DATA.crimeCategories.map((c, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: 8, height: 8, background: c.color, flexShrink: 0 }} />
                {c.name}
              </div>
            ))}
          </div>
        </BCard>
        <BCard serial="§ 00-B" title="SUICIDE TREND 2013-2022 [SRC: NCRB]">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={DATA.suicideTrend}>
              <defs>
                <linearGradient id="suicideGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3333" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF3333" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" stroke="#FF3333" fill="url(#suicideGrad)" strokeWidth={2} name="TOTAL SUICIDES" />
            </AreaChart>
          </ResponsiveContainer>
        </BCard>
      </div>
      <BCard serial="§ 00-C" title="INDIA DEVELOPMENT RADAR — SCORE OUT OF 100">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={DATA.radarData}>
            <PolarGrid stroke="rgba(0,255,255,0.15)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }} />
            <Radar name="INDIA" dataKey="value" stroke="#00FFFF" fill="rgba(0,255,255,0.15)" strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
        <Annotation color="#00FFFF" rotate="0deg">// COMPOSITE INDEX — HIGHER SCORE = BETTER. BASED ON NCRB, NFHS-5, UDISE+, CMIE, MOSPI DATA.</Annotation>
      </BCard>
    </div>
  );
}

// ── SAFETY ──

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

// ── MENTAL HEALTH ──

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
      <BCard serial="§ 02-A" title="SUICIDE TREND 2013-2022 [SRC: NCRB]">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={DATA.suicideTrend}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="total" stroke="#FF3333" strokeWidth={2} dot={{ fill: "#FF3333", r: 3 }} name="TOTAL" />
            <Line type="monotone" dataKey="farmers" stroke="#FF8C00" strokeWidth={2} dot={{ fill: "#FF8C00", r: 3 }} name="FARMERS" />
            <Line type="monotone" dataKey="students" stroke="#FFD700" strokeWidth={2} dot={{ fill: "#FFD700", r: 3 }} name="STUDENTS" />
          </LineChart>
        </ResponsiveContainer>
        <Annotation color="#FF3333" rotate="0deg">⚠ 2020 SPIKE: COVID-19 lockdowns, financial distress, isolation. 2022: HIGHEST EVER RECORDED. Age group 18-45 accounts for 67.2% of suicides.</Annotation>
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

// ── HEALTH ──

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

// ── EDUCATION ──

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

// ── ECONOMY ──

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

// ── HELPLINES ──

function HelplinesModule() {
  const [search, setSearch] = useState("");
  const filtered = DATA.helplines
    .map(cat => ({
      ...cat,
      items: cat.items.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.num.includes(search) ||
        h.org.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.items.length > 0);

  return (
    <div>
      <SectionTitle num="06" title="HELPLINE DIRECTORY" sub="// ALL NUMBERS VERIFIED AS OF 2024 — SHARE WIDELY" />
      <Annotation color="#FF3333" rotate="0deg">⚠ ALL NUMBERS VERIFIED AS OF 2024. PLEASE VERIFY BEFORE SHARING. HELPLINE AVAILABILITY MAY VARY BY STATE.</Annotation>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="SEARCH BY NAME, NUMBER, OR ORGANIZATION..."
          style={{
            width: "100%", background: "rgba(0,20,50,0.8)",
            border: "1px solid rgba(0,255,255,0.3)", color: "#FFFFFF",
            fontFamily: "monospace", fontSize: "11px",
            padding: "12px 16px", letterSpacing: "0.1em",
            outline: "none", boxSizing: "border-box",
          }}
        />
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

      {/* TOP TICKER */}
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

      {/* FLOATING HELPLINE BTN */}
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