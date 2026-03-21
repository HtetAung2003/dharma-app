// @ts-nocheck


export class ceDateTime {
    m_tz: number;
    m_jd: number;
    m_ct: number;
    m_SG: number;

    constructor(m_jd?: number, m_tz?: number, m_ct: number = 0, m_SG: number = 2361222) {
        if (m_tz === undefined) this.m_tz = ceDateTime.ltzoh();
        else this.m_tz = m_tz;
        if (m_jd === undefined) this.m_jd = ceDateTime.jdnow();
        else this.m_jd = m_jd;
        this.m_ct = m_ct;
        this.m_SG = m_SG;
    }

    static j2w(jd, ct = 0, SG = 2361222) {
        var j, jf, y, m, d, h, n, s;
        if (ct == 2 || (ct == 0 && (jd < SG))) {
            var b, c, f, e;
            j = Math.floor(jd + 0.5); jf = jd + 0.5 - j;
            b = j + 1524; c = Math.floor((b - 122.1) / 365.25); f = Math.floor(365.25 * c);
            e = Math.floor((b - f) / 30.6001); m = (e > 13) ? (e - 13) : (e - 1);
            d = b - f - Math.floor(30.6001 * e); y = m < 3 ? (c - 4715) : (c - 4716);
        } else {
            j = Math.floor(jd + 0.5); jf = jd + 0.5 - j; j -= 1721119;
            y = Math.floor((4 * j - 1) / 146097); j = 4 * j - 1 - 146097 * y; d = Math.floor(j / 4);
            j = Math.floor((4 * d + 3) / 1461); d = 4 * d + 3 - 1461 * j;
            d = Math.floor((d + 4) / 4); m = Math.floor((5 * d - 3) / 153); d = 5 * d - 3 - 153 * m;
            d = Math.floor((d + 5) / 5); y = 100 * y + j;
            if (m < 10) { m += 3; } else { m -= 9; y = y + 1; }
        }
        jf *= 24; h = Math.floor(jf); jf = (jf - h) * 60; n = Math.floor(jf); s = (jf - n) * 60;
        return { y: y, m: m, d: d, h: h, n: n, s: s };
    }

    static t2d(h, n, s) { return ((h - 12) / 24 + n / 1440 + s / 86400); }
    static u2j(ut) { return 2440587.5 + ut / 86400.0; }
    static j2u(jd) { return (jd - 2440587.5) * 86400.0 + 0.5; }
    static jdnow() { return ceDateTime.u2j(new Date().getTime() / 1000.0); }
    static ltzoh() { return -(new Date().getTimezoneOffset() / 60.0); }

    get jdl() { return (this.m_jd + this.m_tz / 24.0); }
}

/**
 * မြန်မာပြက္ခဒိန်တွက်ချက်မှု Logic
 */
export class ceMmDateTime {
    my: number; 
    mm: number; 
    md: number; 
    mp: number; 
    jd: number;

    constructor(date: Date) {
        const ut = date.getTime() / 1000.0;
        this.jd = ceDateTime.u2j(ut);
        
        const SY = 1577917828 / 4320000; 
        const MO = 1577917828 / 53433336; 

        this.my = Math.floor((this.jd - 0.5 - 2415020.5) / SY) + 1262;
        const delta = this.jd - 2415020.5;
        
        // အခြေခံ လနှင့်ရက် တွက်ချက်ခြင်း
        this.mm = Math.floor((delta % SY) / MO) + 1;
        this.md = Math.floor((delta % MO) + 1);
        this.mp = this.md <= 15 ? 0 : 2;
        
        if (this.md > 15) {
            this.md -= 15;
        }
    }

    public ToMString(): string {
        const m_names = ["", "တန်ခူး", "ကဆုန်", "နယုန်", "ဝါဆို", "ဒုဝါဆို", "တော်သလင်း", "သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်", "ပြာသို", "တွဲဖက်", "တပေါင်း"];
        const p_names = ["လဆန်း", "လပြည့်", "လဆုတ်", "လကွယ်"];
        
        let phaseStr = p_names[this.mp];
        if (this.md === 15 && this.mp === 0) phaseStr = p_names[1]; 
        // လကွယ်ရက် စစ်ဆေးခြင်း (ရက် ၂၉ ရှိသောလ သို့မဟုတ် ၃၀ ရှိသောလ)
        if (this.mp === 2 && (this.md === 14 || this.md === 15)) {
             phaseStr = p_names[3]; 
        }

        return `${this.my} ခု၊ ${m_names[this.mm]} ${phaseStr} ${this.md} ရက်`;
    }

    public getSpecialDay(): string[] {
        let results: string[] = [];
        
        // လပြည့်နေ့များ
        if (this.md === 15 && this.mp === 0) {
            const mmNames = ["", "တန်ခူး", "ကဆုန်", "နယုန်", "ဝါဆို", "ဒုဝါဆို", "တော်သလင်း", "သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်", "ပြာသို", "တွဲဖက်", "တပေါင်း"];
            const specialOccasions = {
                2: "ဗုဒ္ဓနေ့",
                4: "ဓမ္မစကြာနေ့",
                7: "အဘိဓမ္မာနေ့",
                8: "သာမညဖလနေ့",
                12: "ဗုဒ္ဓမိခင်နေ့",
            };
            let name = specialOccasions[this.mm] || "";
            results.push(`${mmNames[this.mm]}လပြည့်${name ? " (" + name + ")" : ""}`);
        }

        if (this.isSabbath()) {
            results.push("ဥပုသ်နေ့");
        }

        return results;
    }

  public getHolidays(date: Date): string[] {
    let h: string[] = [];
    const d = date.getDate();
    const m = date.getMonth() + 1; // Jan = 1
    const gy = date.getFullYear(); // Gregorian Year

    // --- ပုံသေရက်စွဲ ပိတ်ရက်များ ---
    if (m === 1 && d === 4) h.push("လွတ်လပ်ရေးနေ့");
    if (m === 2 && d === 12) h.push("ပြည်ထောင်စုနေ့");
    if (m === 3 && d === 2) h.push("တောင်သူလယ်သမားနေ့");
    if (m === 3 && d === 27) h.push("တပ်မတော်နေ့");
    if (m === 7 && d === 19) h.push("အာဇာနည်နေ့");
    if (m === 12 && d === 25) h.push("ခရစ္စမတ်နေ့");

    // --- သင်္ကြန်ရက်တွက်ချက်ခြင်း (Solar Year Logic) ---
    const SY = 1577917828 / 4320000; // Solar Year Duration
    const MO = 1577917828 / 53433336; // Lunar Month Duration
    const SE3 = 1312.1632236; // Solar Era offset
    
    // သင်္ကြန်အတက်ရက် (သင်္ကြန်ပြီးဆုံးချိန်) JDN ကို ရှာခြင်း
    let ja = SY * (this.my + SE3) + 0.528430; 
    let atat = Math.round(ja); // သင်္ကြန်အတက်ရက်
    let akya = Math.round(ja - 2.1699189); // သင်္ကြန်အကျရက် (ခန့်မှန်းခြေ ၂ ရက်ခွဲခန့်အကွာ)
    
    const currentJDN = Math.round(this.jd);

    // သင်္ကြန်ရက်များ သတ်မှတ်ခြင်း
    if (currentJDN === akya) h.push("သင်္ကြန်အကျနေ့");
    if (currentJDN === akya + 1) h.push("သင်္ကြန်အကြတ်နေ့");
    if (currentJDN === akya + 2 && currentJDN < atat) h.push("သင်္ကြန်အကြတ်နေ့"); // ရက်ထပ်လျှင် ၂ ရက်ဖြစ်နိုင်
    if (currentJDN === atat) h.push("သင်္ကြန်အတက်နေ့");
    if (currentJDN === atat + 1) h.push("မြန်မာနှစ်ဆန်းတစ်ရက်နေ့");

    // --- မြန်မာလအလိုက် ပိတ်ရက်များ (Lunar-based Holidays) ---
    if (this.md === 15 && this.mp === 0) {
        if (this.mm === 2) h.push("ကဆုန်လပြည့် (ဗုဒ္ဓနေ့)");
        if (this.mm === 4) h.push("ဝါဆိုလပြည့်နေ့");
        if (this.mm === 7) h.push("သီတင်းကျွတ်လပြည့်နေ့");
        if (this.mm === 8) h.push("တန်ဆောင်မုန်းလပြည့်နေ့");
    }
    
    // အမျိုးသားနေ့ (တန်ဆောင်မုန်းလပြည့်ကျော် ၁၀ ရက်)
    if (this.mm === 8 && this.mp === 2 && this.md === 10) h.push("အမျိုးသားနေ့");

    return h;
}
// services/ceMmDateTime.ts ထဲရှိ ceMmDateTime Class အတွင်းသို့ ထည့်ရန်

/**
 * နေ့ထူးရက်မြတ် (ရက်ရာဇာ၊ ပြဿဒါး စသည်) တွက်ချက်ခြင်း
 * ဤ Logic သည် အင်္ဂါရပ်အားလုံးအတွက် Simplified Version ဖြစ်ပါသည်
 */
public getAstrologyInfo(): string[] {
    let results: string[] = [];
    const weekday = new ceDateTime(this.jd).w; // Weekday [0=Sat, 1=Sun, ..., 6=Fri]

    // --- ၁။ ရက်ရာဇာ တွက်ချက်ခြင်း (Sabbath Year Logic) ---
    const rr_table = {
        1: [2, 5], // တန်ခူး: ဗုဒ္ဓဟူး၊ သောကြာ
        2: [1, 4], // ကဆုန်: တနင်္ဂနွေ၊ ကြာသပတေး
        3: [0, 6], // နယုန်: စနေ၊ အင်္ဂါ
        4: [2, 5], // ဝါဆို: ဗုဒ္ဓဟူး၊ သောကြာ
        5: [2, 5], // ဒုဝါဆို: ဗုဒ္ဓဟူး၊ သောကြာ (ဝါထပ်လျှင်)
        6: [1, 4], // တော်သလင်း: တနင်္ဂနွေ၊ ကြာသပတေး
        7: [0, 6], // သီတင်းကျွတ်: စနေ၊ အင်္ဂါ
        8: [2, 5], // တန်ဆောင်မုန်း: ဗုဒ္ဓဟူး၊ သောကြာ
        9: [1, 4], // နတ်တော်: တနင်္ဂနွေ၊ ကြာသပတေး
        10: [0, 6], // ပြာသို: စနေ၊ အင်္ဂါ
        11: [2, 5], // တွဲဖက်: ဗုဒ္ဓဟူး၊ သောကြာ
        12: [1, 4], // တပေါင်း: တနင်္ဂနွေ၊ ကြာသပတေး
    };

    if (rr_table[this.mm]?.includes(weekday)) {
        results.push("ရက်ရာဇာ");
    }

    // --- ၂။ ပြဿဒါး တွက်ချက်ခြင်း ---
    const ptd_table = {
        1: [3],    // တန်ခူး: တနင်္လာ
        2: [6],    // ကဆုန်: အင်္ဂါ
        3: [1],    // နယုန်: တနင်္ဂနွေ
        4: [3],    // ဝါဆို: တနင်္လာ
        5: [3],    // ဒုဝါဆို: တနင်္လာ
        6: [6],    // တော်သလင်း: အင်္ဂါ
        7: [1],    // သီတင်းကျွတ်: တနင်္ဂနွေ
        8: [3],    // တန်ဆောင်မုန်း: တနင်္လာ
        9: [6],    // နတ်တော်: အင်္ဂါ
        10: [1],   // ပြာသို: တနင်္ဂနွေ
        11: [3],   // တွဲဖက်: တနင်္လာ
        12: [6],   // တပေါင်း: အင်္ဂါ
    };

    if (ptd_table[this.mm]?.includes(weekday)) {
        results.push("ပြဿဒါး");
    }

    return results;
}
    private isSabbath(): boolean {
        // လဆန်း ၈ ရက်၊ လပြည့် (၁၅ ရက်)၊ လဆုတ် ၈ ရက်
        if (this.md === 8) return true;
        if (this.md === 15 && this.mp === 0) return true;
        
        // လကွယ်နေ့ တွက်ချက်မှု (၂၉ ရက်ရှိသောလဆိုလျှင် ၁၄ ရက်၊ ၃၀ ရက်ရှိသောလဆိုလျှင် ၁၅ ရက်)
        // ဤနေရာတွင် Simplified အနေဖြင့် ၁၄ နှင့် ၁၅ နှစ်ခုလုံးကို ဥပုသ်နေ့အဖြစ် ယာယီသတ်မှတ်နိုင်သည်
        if (this.mp === 2 && (this.md === 14 || this.md === 15)) {
             // တကယ့် logic မှာ လကွယ်ရက် အစစ်အမှန်ကိုသာ စစ်ဆေးသင့်သည်
             return true; 
        }
        return false;
    }
}