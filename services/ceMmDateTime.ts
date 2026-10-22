// services/ceMmDateTime.ts
// Myanmar Calendar based on ceMmDateTime.js algorithm
// Source: https://yan9a.github.io/mmcal/
// MIT License - Copyright (c) 2018 Yan Naing Aye

type SpecialDayType = "ရက်ရာဇာ" | "ပြဿဒါး";

// Myanmar month names (Burmese/Unicode)
const MONTH_NAMES = [
  "First Waso",
  "Tagu",
  "Kason",
  "Nayon",
  "Waso",
  "Wagaung",
  "Tawthalin",
  "Thadingyut",
  "Tazaungmon",
  "Nadaw",
  "Pyatho",
  "Tabodwe",
  "Tabaung",
  "Late Tagu",
  "Late Kason",
];

const MOON_PHASE_NAMES = ["လဆန်း", "လပြည့်", "လဆုတ်", "လကွယ်"];

// Astrological day names in Burmese
const ASTRO_NAMES: Record<string, string> = {
  Thamanyo: "သမားညို",
  Amyeittasote: "အမြိတ္တစုတ်",
  Warameittugyi: "ဝါရမိတ္တုကြီး",
  Warameittunge: "ဝါရမိတ္တုငယ်",
  Yatpote: "ရက်ပုပ်",
  Thamaphyu: "သမားဖြူ",
  Nagapor: "နဂါးပေါ်",
  Yatyotema: "ရက်ယုတ်မာ",
  Mahayatkyan: "မဟာရက်ကြမ်း",
  Shanyat: "ရှမ်းရက်",
};

// Holiday names in Burmese
const HOLIDAY_NAMES: Record<string, string> = {
  "Myanmar New Year's Day": "မြန်မာနှစ်ဆန်း",
  "Thingyan Atat": "သင်္ကြန်အတက်",
  "Thingyan Akyat": "သင်္ကြန်အကြတ်",
  "Thingyan Akya": "သင်္ကြန်အကျ",
  "Thingyan Akyo": "သင်္ကြန်အကြို",
  "New Year's Day": "နှစ်ဆန်း",
  Independence: "လွတ်လပ်ရေး",
  Union: "ပြည်ထောင်စု",
  "Peasants' Day": "တောင်သူလယ်သမား",
  Resistance: "တော်လှန်ရေး",
  Labour: "အလုပ်သမား",
  "Martyrs' Day": "အာဇာနည်",
  "Buddha Day": "ဗုဒ္ဓနေ့",
  "Start of Buddhist Lent": "ဓမ္မစကြာနေ့",
  "End of Buddhist Lent": "မီးထွန်းပွဲ",
  Tazaungdaing: "တန်ဆောင်တိုင်",
  National: "အမျိုးသား",
  "Karen New Year's Day": "ကရင်နှစ်သစ်",
  "Tabaung Pwe": "တပေါင်းပွဲ",
  Holiday: "ရုံးပိတ်ရက်",
};

// =============================================================================
// Core Date Functions (from ceMmDateTime.js)
// =============================================================================

const SY = 1577917828.0 / 4320000.0; // solar year (365.2587565)
const LM = 1577917828.0 / 53433336.0; // lunar month (29.53058795)
const MO = 1954168.050623; // beginning of 0 ME for MMT

function bSearch1(k: number, A: number[]): number {
  let i = 0;
  let l = 0;
  let u = A.length - 1;
  while (u >= l) {
    i = Math.floor((l + u) / 2);
    if (A[i] > k) u = i - 1;
    else if (A[i] < k) l = i + 1;
    else return i;
  }
  return -1;
}

function bSearch2(k: number, A: number[][]): number {
  let i = 0;
  let l = 0;
  let u = A.length - 1;
  while (u >= l) {
    i = Math.floor((l + u) / 2);
    if (A[i][0] > k) u = i - 1;
    else if (A[i][0] < k) l = i + 1;
    else return i;
  }
  return -1;
}

function GetMyConst(my: number) {
  let EI: number,
    WO: number,
    NM: number,
    EW = 0,
    i: number;
  let fme: number[][], wte: number[];

  if (my >= 1312) {
    // Third era
    EI = 3;
    WO = -0.5;
    NM = 8;
    fme = [[1377, 1]];
    wte = [1344, 1345];
  } else if (my >= 1217) {
    // Second era
    EI = 2;
    WO = -1;
    NM = 4;
    fme = [
      [1234, 1],
      [1261, -1],
    ];
    wte = [1263, 1264];
  } else if (my >= 1100) {
    // Thandeikta
    EI = 1.3;
    WO = -0.85;
    NM = -1;
    fme = [
      [1120, 1],
      [1126, -1],
      [1150, 1],
      [1172, -1],
      [1207, 1],
    ];
    wte = [1201, 1202];
  } else if (my >= 798) {
    // Makaranta system 2
    EI = 1.2;
    WO = -1.1;
    NM = -1;
    fme = [
      [813, -1],
      [849, -1],
      [851, -1],
      [854, -1],
      [927, -1],
      [933, -1],
      [936, -1],
      [938, -1],
      [949, -1],
      [952, -1],
      [963, -1],
      [968, -1],
      [1039, -1],
    ];
    wte = [];
  } else {
    // Makaranta system 1
    EI = 1.1;
    WO = -1.1;
    NM = -1;
    fme = [
      [205, 1],
      [246, 1],
      [471, 1],
      [572, -1],
      [651, 1],
      [653, 2],
      [656, 1],
      [672, 1],
      [729, 1],
      [767, -1],
    ];
    wte = [];
  }

  i = bSearch2(my, fme);
  if (i >= 0) WO += fme[i][1];
  i = bSearch1(my, wte);
  if (i >= 0) EW = 1;

  return { EI, WO, NM, EW };
}

function cal_watat(my: number) {
  const c = GetMyConst(my);
  const TA = (SY / 12 - LM) * (12 - c.NM);
  let ed = (SY * (my + 3739)) % LM;
  if (ed < TA) ed += LM;
  const fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO);

  let TW = 0,
    watat = 0;
  if (c.EI >= 2) {
    TW = LM - (SY / 12 - LM) * c.NM;
    if (ed >= TW) watat = 1;
  } else {
    watat = (my * 7 + 2) % 19;
    if (watat < 0) watat += 19;
    watat = Math.floor(watat / 12);
  }
  watat ^= c.EW;
  return { fm, watat };
}

function cal_my(my: number) {
  let yd = 0,
    y1: ReturnType<typeof cal_watat>,
    nd = 0,
    werr = 0,
    fm = 0;
  const y2 = cal_watat(my);
  let myt = y2.watat;
  do {
    yd++;
    y1 = cal_watat(my - yd);
  } while (y1.watat == 0 && yd < 3);

  if (myt) {
    nd = (y2.fm - y1.fm) % 354;
    myt = Math.floor(nd / 31) + 1;
    fm = y2.fm;
    if (nd != 30 && nd != 31) {
      werr = 1;
    }
  } else fm = y1.fm + 354 * yd;
  const tg1 = y1.fm + 354 * yd - 102;
  return { myt, tg1, fm, werr };
}

function j2m(jdn: number) {
  jdn = Math.round(jdn);
  let my = Math.floor((jdn - 0.5 - MO) / SY);
  const yo = cal_my(my);
  let dd = jdn - yo.tg1 + 1;
  const b = Math.floor(yo.myt / 2);
  const c = Math.floor(1 / (yo.myt + 1));
  const myl = 354 + (1 - c) * 30 + b;
  const mmt = Math.floor((dd - 1) / myl);
  dd -= mmt * myl;
  const a = Math.floor((dd + 423) / 512);
  let mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
  const e = Math.floor((mm + 12) / 16);
  const f = Math.floor((mm + 11) / 16);
  let md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;
  mm += f * 3 - e * 4 + 12 * mmt;
  return { myt: yo.myt, my, mm, md };
}

function cal_mml(mm: number, myt: number) {
  let mml = 30 - (mm % 2);
  if (mm == 3) mml += Math.floor(myt / 2);
  return mml;
}

function cal_mp(md: number, mm: number, myt: number) {
  const mml = cal_mml(mm, myt);
  return Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);
}

function cal_mf(md: number) {
  return md - 15 * Math.floor(md / 16);
}

function cal_sabbath(md: number, mm: number, myt: number) {
  const mml = cal_mml(mm, myt);
  let s = 0;
  if (md == 8 || md == 15 || md == 23 || md == mml) s = 1;
  if (md == 7 || md == 14 || md == 22 || md == mml - 1) s = 2;
  return s;
}

function cal_yatyaza(mm: number, wd: number) {
  const m1 = mm % 4;
  const wd1 = Math.floor(m1 / 2) + 4;
  const wd2 = (1 - Math.floor(m1 / 2) + (m1 % 2)) * (1 + 2 * (m1 % 2));
  return wd == wd1 || wd == wd2 ? 1 : 0;
}

function cal_pyathada(mm: number, wd: number) {
  const m1 = mm % 4;
  const wda = [1, 3, 3, 0, 2, 1, 2];
  let pyathada = 0;
  if (m1 == 0 && wd == 4) pyathada = 2;
  if (m1 == wda[wd]) pyathada = 1;
  return pyathada;
}

function cal_nagahle(mm: number) {
  if (mm <= 0) mm = 4;
  return Math.floor((mm % 12) / 3);
}

function cal_mahabote(my: number, wd: number) {
  console.log(my, wd);

  return (((my - wd) % 7) + 7) % 7;
}

function cal_nakhat(my: number) {
  return ((my % 3) + 3) % 3;
}

function cal_thamanyo(mm: number, wd: number) {
  let mmt = Math.floor(mm / 13);
  let m = (mm % 13) + mmt;
  if (m <= 0) m = 4;
  const m1 = m - 1 - Math.floor(m / 9);
  const wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
  const wd2 = (wd + 7 - wd1) % 7;
  return wd2 <= 1 ? 1 : 0;
}

function cal_amyeittasote(md: number, wd: number) {
  const mf = md - 15 * Math.floor(md / 16);
  const wda = [5, 8, 3, 7, 2, 4, 1];
  return mf == wda[wd] ? 1 : 0;
}

function cal_warameittugyi(md: number, wd: number) {
  const mf = md - 15 * Math.floor(md / 16);
  const wda = [7, 1, 4, 8, 9, 6, 3];
  return mf == wda[wd] ? 1 : 0;
}

function cal_warameittunge(md: number, wd: number) {
  const mf = md - 15 * Math.floor(md / 16);
  const wn = (wd + 6) % 7;
  return 12 - mf == wn ? 1 : 0;
}

function cal_yatpote(md: number, wd: number) {
  const mf = md - 15 * Math.floor(md / 16);
  const wda = [8, 1, 4, 6, 9, 8, 7];
  return mf == wda[wd] ? 1 : 0;
}

function cal_thamaphyu(md: number, wd: number) {
  const mf = md - 15 * Math.floor(md / 16);
  const wda = [1, 2, 6, 6, 5, 6, 7];
  const wdb = [0, 1, 0, 0, 0, 3, 3];
  if (mf == wda[wd]) return 1;
  if (mf == wdb[wd]) return 1;
  if (mf == 4 && wd == 5) return 1;
  return 0;
}

function cal_nagapor(md: number, wd: number) {
  const wda = [26, 21, 2, 10, 18, 2, 21];
  const wdb = [17, 19, 1, 0, 9, 0, 0];
  if (md == wda[wd]) return 1;
  if (md == wdb[wd]) return 1;
  if ((md == 2 && wd == 1) || ((md == 12 || md == 4 || md == 18) && wd == 2))
    return 1;
  return 0;
}

function cal_yatyotema(mm: number, md: number) {
  let mmt = Math.floor(mm / 13);
  let m = (mm % 13) + mmt;
  if (m <= 0) m = 4;
  const mf = md - 15 * Math.floor(md / 16);
  const m1 = m % 2 ? m : (m + 9) % 12;
  const m2 = ((m1 + 4) % 12) + 1;
  return mf == m2 ? 1 : 0;
}

function cal_mahayatkyan(mm: number, md: number) {
  if (mm <= 0) mm = 4;
  const mf = md - 15 * Math.floor(md / 16);
  const m1 = ((Math.floor((mm % 12) / 2) + 4) % 6) + 1;
  return mf == m1 ? 1 : 0;
}

function cal_shanyat(mm: number, md: number) {
  let mmt = Math.floor(mm / 13);
  let m = (mm % 13) + mmt;
  if (m <= 0) m = 4;
  const mf = md - 15 * Math.floor(md / 16);
  const sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
  return mf == sya[m - 1] ? 1 : 0;
}

function cal_astro(jdn: number) {
  jdn = Math.round(jdn);
  const yo = j2m(jdn);
  const myt = yo.myt;
  const my = yo.my;
  const mm = yo.mm;
  const md = yo.md;
  const wd = (jdn + 2) % 7;
  const hs: string[] = [];

  if (cal_thamanyo(mm, wd)) hs.push("Thamanyo");
  if (cal_amyeittasote(md, wd)) hs.push("Amyeittasote");
  if (cal_warameittugyi(md, wd)) hs.push("Warameittugyi");
  if (cal_warameittunge(md, wd)) hs.push("Warameittunge");
  if (cal_yatpote(md, wd)) hs.push("Yatpote");
  if (cal_thamaphyu(md, wd)) hs.push("Thamaphyu");
  if (cal_nagapor(md, wd)) hs.push("Nagapor");
  if (cal_yatyotema(mm, md)) hs.push("Yatyotema");
  if (cal_mahayatkyan(mm, md)) hs.push("Mahayatkyan");
  if (cal_shanyat(mm, md)) hs.push("Shanyat");

  return hs;
}

function cal_holiday(jdn: number) {
  jdn = Math.round(jdn);
  const yo = j2m(jdn);
  const myt = yo.myt;
  const my = yo.my;
  const mm = yo.mm;
  const md = yo.md;
  const mp = cal_mp(md, mm, myt);
  const mmt = Math.floor(mm / 13);
  const hs: string[] = [];

  // Thingyan
  const SE3 = 1312;
  const ja = SY * (my + mmt) + MO;
  const jk = my >= SE3 ? ja - 2.169918982 : ja - 2.1675;
  const akn = Math.round(jk);
  const atn = Math.round(ja);

  if (jdn == atn + 1) hs.push("Myanmar New Year's Day");
  if (my + mmt >= 1100) {
    if (jdn == atn) hs.push("Thingyan Atat");
    else if (jdn > akn && jdn < atn) hs.push("Thingyan Akyat");
    else if (jdn == akn) hs.push("Thingyan Akya");
    else if (jdn == akn - 1) hs.push("Thingyan Akyo");
  }

  // Myanmar calendar holidays
  if (mm == 2 && mp == 1) hs.push("Buddha Day");
  else if (mm == 4 && mp == 1) hs.push("Start of Buddhist Lent");
  else if (mm == 7 && mp == 1) hs.push("End of Buddhist Lent");
  else if (mm == 8 && mp == 1) hs.push("Tazaungdaing");
  else if (mm == 10 && md == 1) hs.push("Karen New Year's Day");
  else if (mm == 12 && mp == 1) hs.push("Tabaung Pwe");

  return hs;
}

// Convert JavaScript Date to Julian Day Number
function dateToJDN(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const n = date.getMinutes();
  const s = date.getSeconds();

  const a = Math.floor((14 - m) / 12);
  const y_adj = y + 4800 - a;
  const m_adj = m + 12 * a - 3;

  const jdn =
    d +
    Math.floor((153 * m_adj + 2) / 5) +
    365 * y_adj +
    Math.floor(y_adj / 4) -
    Math.floor(y_adj / 100) +
    Math.floor(y_adj / 400) -
    32045;

  // let jd =
  //   d +
  //   Math.floor((153 * (m + 12 * Math.floor((14 - m) / 12) - 3) + 2) / 5) +
  //   365 * (y + 4800 - Math.floor((14 - m) / 12)) +
  //   Math.floor((y + 4800 - Math.floor((14 - m) / 12)) / 4) -
  //   Math.floor((y + 4800 - Math.floor((14 - m) / 12)) / 100) +
  //   Math.floor((y + 4800 - Math.floor((14 - m) / 12)) / 400) -
  //   32045;
  // console.log("Date TO JDN", jdn + (h - 12) / 24 + n / 1440 + s / 86400);
  console.log("JDN", jdn);
  return jdn;

  // return jd + (h - 12) / 24 + n / 1440 + s / 86400;
}
// =============================================================================
// ceMmDateTime Class
// =============================================================================

export class ceMmDateTime {
  private _date: Date;
  private _jdn: number;
  private _yo: ReturnType<typeof j2m>;
  private _weekday: number;

  // Legacy properties for compatibility
  public mmObj: any;
  public my: string = "";
  public mm: string = "";
  public mdText: string = "";
  public mpText: string = "";
  public mdNum: number = 0;
  public mpNum: number = 0;
  public fortnightDayNum: number = 0;
  public fortnightDayText: string = "";

  public sravana: string = "N/A";
  public mahabote: string = "N/A";
  public nakhat: string = "N/A";
  public nagaHead: string = "N/A";

  private specialDays: SpecialDayType[] = [];

  // Myanmar month index (for astrology)
  private monthIndex: number = -1;

  constructor(date?: Date) {
    const inputDate = new Date();
    // const inputDate = new Date("2026-10-22T08:26:45.540Z");
    console.log("InputDate", inputDate);
    this._date = inputDate;
    this._jdn = dateToJDN(inputDate);
    this._weekday = (this._jdn + 1) % 7; // 0=Sat, 1=Sun, ..., 6=Fri
    this._yo = j2m(this._jdn);

    // Set legacy properties
    this.setLegacyProperties();
  }

  private setLegacyProperties() {
    const yo = this._yo;
    const my = yo.my;
    const mm = yo.mm;
    const md = yo.md;
    const myt = yo.myt;

    // Debug logging
    console.log("DEBUG: my =", my, "mm =", mm, "weekday =", this._weekday);

    // Myanmar year
    this.my = this.toMyanmarNumber(my);
    this.mm = MONTH_NAMES[mm] || "";
    this.mdText = this.toMyanmarNumber(md);
    this.mdNum = md;

    // Moon phase
    this.mpNum = cal_mp(md, mm, myt);
    this.mpText = MOON_PHASE_NAMES[this.mpNum] || "";

    // Fortnight day
    this.fortnightDayNum = cal_mf(md);
    this.fortnightDayText = this.toMyanmarNumber(this.fortnightDayNum);

    // Month index for astrology (0-14 mapped to meaningful values)
    this.monthIndex = mm;
    if (mm >= 13) {
      // Late months map back to their base months
      this.monthIndex = mm === 13 ? 1 : mm === 14 ? 2 : mm;
    }

    // Astrology calculations
    const mahaboteList = [
      "ဘင်္ဂ",
      "အထွန်း",
      "ရာဇ",
      "အဓိပတိ",
      "မရဏ",
      "သိုက်",
      "ပုတိ",
    ];
    // const mahaboteList = [
    //   "ဘင်္ဂ",
    //   "မရဏ",
    //   "အထွန်း",
    //   "သိုက်",
    //   "ရာဇ",
    //   "ပုတိ",
    //   "အဓိပတိ",
    // ];
    const sravanaYears = ["ပုဏ္ဏား", "ဗြဟ္မဏ", "သရဝန်"];
    const nakhatList = ["ဘီလူး", "နတ်", "လူ"];

    const mahaboteIdx = cal_mahabote(my, this._weekday);
    const sravanaIdx = (my + 3) % 4;
    const nakhatIdx = cal_nakhat(my);

    console.log(
      "DEBUG: mahaboteIdx =",
      mahaboteIdx,
      "mahaboteList length =",
      mahaboteList.length,
    );
    console.log("DEBUG: sravanaIdx =", sravanaIdx, "nakhatIdx =", nakhatIdx);

    this.mahabote = mahaboteList[mahaboteIdx] || "N/A";
    this.sravana = sravanaYears[sravanaIdx] || "N/A";
    this.nakhat = nakhatList[nakhatIdx] || "N/A";

    console.log("DEBUG: this.mahabote =", this.mahabote);

    const nagahleIdx = cal_nagahle(mm);
    const nagaDirs = ["အနောက်", "မြောက်", "အရှေ့", "တောင်"];
    this.nagaHead = nagaDirs[nagahleIdx] || "N/A";

    // Special days (Yatyaza, Pyathada)
    this.specialDays = [];
    if (cal_yatyaza(mm, this._weekday)) {
      this.specialDays.push("ရက်ရာဇာ");
    }
    const pyathada = cal_pyathada(mm, this._weekday);
    if (pyathada > 0) {
      this.specialDays.push("ပြဿဒါး");
    }
  }

  private toMyanmarNumber(num: number): string {
    const myanDigits = "၀၁၂၃၄၅၆၇၈၉";
    return num
      .toString()
      .split("")
      .map((d) => myanDigits[parseInt(d)] || d)
      .join("");
  }

  private toEnglishNumber(str: string): number {
    const myanDigits = "၀၁၂၃၄၅၆၇၈၉";
    return (
      parseInt(
        str.replace(/[၀-၉]/g, (d) => myanDigits.indexOf(d).toString()),
      ) || 0
    );
  }

  // Properties from the new algorithm
  get myear(): number {
    return this._yo.my;
  }

  get mmonth(): number {
    return this._yo.mm;
  }

  get mday(): number {
    return this._yo.md;
  }

  get mtype(): number {
    return this._yo.myt;
  }

  get moonPhase(): number {
    return this.mpNum;
  }

  get fortnightDay(): number {
    return this.fortnightDayNum;
  }

  get weekday(): number {
    return this._weekday;
  }

  // Legacy methods
  public getAstrologyInfo(): string[] {
    console.log(
      "DEBUG getAstrologyInfo: mahabote =",
      this.mahabote,
      "nakhat =",
      this.nakhat,
      "nagaHead =",
      this.nagaHead,
    );
    const astro = [
      `နှစ်အမည်: ${this.my}`,
      `မဟာဘုတ်: ${this.mahabote}`,
      `နက္ခတ်: ${this.nakhat}`,
      `နဂါးခေါင်း: ${this.nagaHead}သို့ မျက်နှာမူ`,
    ];

    // Add astrological days
    const astroDays = cal_astro(this._jdn);
    for (const day of astroDays) {
      if (ASTRO_NAMES[day]) {
        astro.push(`အရက်: ${ASTRO_NAMES[day]}`);
      }
    }

    if (this.specialDays.length > 0)
      astro.push(`နေ့ထူး: ${this.specialDays.join(" / ")}`);

    return astro;
  }

  get isFullMoon(): boolean {
    return this.mpNum === 1;
  }

  get isNewMoon(): boolean {
    return this.mpNum === 3;
  }

  get isYatyaza(): boolean {
    return this.specialDays.includes("ရက်ရာဇာ");
  }

  get isPyathada(): boolean {
    return this.specialDays.includes("ပြဿဒါး");
  }

  public getHolidays(): string[] {
    const holidays = cal_holiday(this._jdn);
    return holidays.map((h) => HOLIDAY_NAMES[h] || h);
  }

  public isSabbath() {
    const sabbath = cal_sabbath(this._yo.md, this._yo.mm, this._yo.myt);
    return sabbath > 0;
  }

  public ToMString(): string {
    // Format: "၁၅ တန်ခူး လပြည့် ၁၃၈၆"
    const parts = [this.fortnightDayText, this.mm, this.mpText, this.my].filter(
      Boolean,
    );
    return parts.join(" ");
  }

  public getSpecialDay() {
    const out = this.isSabbath() ? ["ဥပုသ်နေ့"] : [];
    return [...out, ...this.specialDays];
  }
}

const inputDate: Date = new Date("2026-10-30T09:08:31.233Z");

const day: number = inputDate.getDay();
const hour: number = inputDate.getHours();

let dateList: number[] = [
  day === 0
    ? 1 // Sunday
    : day === 1
      ? 2 // Monday
      : day === 2
        ? 3 // Tuesday
        : day === 3
          ? hour < 12
            ? 4
            : 5 // Wednesday AM/PM
          : day === 4
            ? 6 // Thursday
            : 0, // Friday or Saturday
];

const mahaboteList = [
  // "ဘင်္ဂ",
  // "မရဏ",
  "အထွန်း",
  "ဘင်္ဂ",
  "ပုတိ",
  "သိုက်",
  "မရဏ",
  "အဓိပတိ",
  "ရာဇ",
];
console.log(day);
console.log("DateList", dateList);

if (dateList == 0 || dateList == 7) {
  dateList = 7;
}
console.log("DateList", mahaboteList[dateList - 1]);
