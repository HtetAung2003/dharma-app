// services/ceMmDateTime.ts
// @ts-ignore
import { MyanmarDate } from "mm-calendar";
import mcal from "myanmar-calendar";

type SpecialDayType = "ရက်ရာဇာ" | "ပြဿဒါး";

export class ceMmDateTime {
  public mmObj: any;
  public my: string = "";
  public mm: string = "";
  public mdText: string = ""; // Myanmar day in month (from mcal string)
  public mpText: string = "";
  public mdNum: number = 0; // Myanmar day in month (1..30)
  public mpNum: number = 0; // 0=waxing, 1=full moon, 2=waning, 3=new moon
  public fortnightDayNum: number = 0; // 1..15
  public fortnightDayText: string = ""; // Myanmar digits of fortnightDayNum

  public sravana: string = "N/A";
  public mahabote: string = "N/A";
  public nakhat: string = "N/A";
  public nagaHead: string = "N/A";

  private dayOfWeek: number = 0; // JS index: 0=Sun ... 6=Sat
  private weekdayIndex: number = 0; // Myanmar index: 0=Sat ... 6=Fri
  private monthIndex: number = -1;
  private specialDays: SpecialDayType[] = [];

  constructor(date?: Date) {
    const inputDate = date instanceof Date ? date : new Date();
    this.dayOfWeek = inputDate.getDay();
    this.weekdayIndex = (this.dayOfWeek + 1) % 7;

    try {
      const result = mcal.toMyanmar(inputDate);
      this.mmObj = result;

      if (typeof result === "string") {
        this.parseMyanmarDateString(result);
        this.populateMoonData(inputDate);

        const myYearInt = this.myanNumToEng(this.my);
        this.monthIndex = this.getMyanmarMonthIndex(this.mm);

        if (myYearInt > 0) {
          this.calculateAstrology(myYearInt);
        }
      }
    } catch (e) {
      console.error("❌ Calculation Error:", e);
    }
  }

  private parseMyanmarDateString(result: string) {
    const trimmed = result.trim();
    const matched = trimmed.match(/^(\S+)\s+(.+)\s+(\S+)$/);

    if (matched) {
      this.mdText = matched[1] || "";
      this.mm = matched[2] || "";
      this.my = matched[3] || "";
    } else {
      const parts = trimmed.split(/\s+/);
      this.mdText = parts[0] || "";
      this.mm = parts[1] || "";
      this.my = parts[2] || "";
    }

    this.mdNum = this.myanNumToEng(this.mdText);
  }

  private populateMoonData(inputDate: Date) {
    try {
      const raw = new MyanmarDate(
        {
          year: inputDate.getFullYear(),
          month: inputDate.getMonth() + 1,
          day: inputDate.getDate(),
        },
        { lang: "mm" },
      ).getRaw();

      this.mdNum = raw.day;
      this.mpNum = raw.moonPhase;
      this.fortnightDayNum = raw.fortnightDay;
      this.fortnightDayText = this.engNumToMyan(this.fortnightDayNum);
      this.mpText = this.getMoonPhaseText(this.mpNum);
      return;
    } catch {
      // fallback below
    }

    // Fallback mapping: 0=waxing, 1=full moon, 2=waning, 3=new moon
    if (this.mdNum === 15) this.mpNum = 1;
    else if (this.mdNum >= 29) this.mpNum = 3;
    else if (this.mdNum < 15) this.mpNum = 0;
    else this.mpNum = 2;

    this.mpText = this.getMoonPhaseText(this.mpNum);
    this.fortnightDayNum =
      this.mpNum === 0 ? this.mdNum : this.mpNum === 2 ? this.mdNum - 15 : 15;
    if (this.fortnightDayNum < 1) this.fortnightDayNum = 1;
    this.fortnightDayText = this.engNumToMyan(this.fortnightDayNum);
  }

  private getMoonPhaseText(mpNum: number): string {
    if (mpNum === 1) return "လပြည့်";
    if (mpNum === 3) return "လကွယ်";
    if (mpNum === 2) return "လဆုတ်";
    return "လဆန်း";
  }

  private calculateAstrology(myYear: number) {
    const mahaboteList = [
      "ဘင်္ဂ",
      "အထွန်း",
      "ရာဇ",
      "အဓိပတိ",
      "မရဏ",
      "သိုက်",
      "ပုတိ",
    ];
    // 2030
    const sravanaYears = [
      "ပုဏ္ဏား",
      "ဗြဟ္မဏ",
      "သရဝန်",
      // "ဘဒြ",
      // "အာသိန်",
      // "ကြတိုက်",
      // "မြိက္ကသိုဝ်",
      // "ပုဿ",
    ];
    const nakhatList = ["ဘီလူး", "နတ်", "လူ"];

    const mahaboteIndex = this.mod(myYear - this.weekdayIndex, 7);
    const sravanaIndex = this.mod(myYear + 3, 4);
    const nakhatIndex = this.mod(myYear, 3);

    this.mahabote = mahaboteList[mahaboteIndex] || "N/A";
    this.sravana = sravanaYears[sravanaIndex] || "N/A";
    this.nakhat = nakhatList[nakhatIndex] || "N/A";
    this.nagaHead = this.getNagaHeadByMonth(this.monthIndex);
    this.specialDays = this.calculateSpecialDays(
      this.monthIndex,
      this.weekdayIndex,
    );
  }

  private calculateSpecialDays(
    monthIndex: number,
    weekdayIndex: number,
  ): SpecialDayType[] {
    const out: SpecialDayType[] = [];
    if (monthIndex < 0) return out;

    const monthRemainder = monthIndex % 4;
    const yatyazaWeekday1 = Math.floor(monthRemainder / 2) + 4;
    const yatyazaWeekday2 =
      (1 - Math.floor(monthRemainder / 2) + (monthRemainder % 2)) *
      (1 + 2 * (monthRemainder % 2));

    if (weekdayIndex === yatyazaWeekday1 || weekdayIndex === yatyazaWeekday2) {
      out.push("ရက်ရာဇာ");
    }

    const pyathadaWeekdayMap = [1, 3, 3, 0, 2, 1, 2];
    if (monthRemainder === pyathadaWeekdayMap[weekdayIndex]) {
      out.push("ပြဿဒါး");
    } else if (monthRemainder === 0 && weekdayIndex === 4) {
      out.push("ပြဿဒါး");
    }

    return out;
  }

  private getNagaHeadByMonth(monthIndex: number): string {
    if (monthIndex <= 0) return "N/A";
    if (monthIndex <= 3) return "အနောက်";
    if (monthIndex <= 6) return "မြောက်";
    if (monthIndex <= 9) return "အရှေ့";
    return "တောင်";
  }

  private getMyanmarMonthIndex(mmText: string): number {
    const monthMap: Record<string, number> = {
      တန်ခူး: 1,
      ကဆုန်: 2,
      နယုန်: 3,
      "ပ ဝါဆို": 0,
      ပဝါဆို: 0,
      "ပထမ ဝါဆို": 0,
      ဝါဆို: 4,
      ဝါခေါင်: 5,
      တော်သလင်း: 6,
      သီတင်းကျွတ်: 7,
      တန်ဆောင်မုန်း: 8,
      နတ်တော်: 9,
      ပြာသို: 10,
      တပို့တွဲ: 11,
      တပေါင်း: 12,
      "နှောင်း တန်ခူး": 1,
      "နှောင်း ကဆုန်": 2,
    };

    const normalized = mmText.replace(/\s+/g, " ").trim();
    if (monthMap[normalized] !== undefined) return monthMap[normalized];

    const knownMonths = [
      "တန်ခူး",
      "ကဆုန်",
      "နယုန်",
      "ဝါဆို",
      "ဝါခေါင်",
      "တော်သလင်း",
      "သီတင်းကျွတ်",
      "တန်ဆောင်မုန်း",
      "နတ်တော်",
      "ပြာသို",
      "တပို့တွဲ",
      "တပေါင်း",
    ];

    const matchedBase = knownMonths.find((m) => normalized.includes(m));
    if (!matchedBase) return -1;

    if (
      matchedBase === "ဝါဆို" &&
      (normalized.includes("ပထမ") || normalized.startsWith("ပ "))
    ) {
      return 0;
    }
    return monthMap[matchedBase] ?? -1;
  }

  private myanNumToEng(str: string): number {
    return (
      parseInt(
        str.replace(/[၀-၉]/g, (d) => "၀၁၂၃၄၅၆၇၈၉".indexOf(d).toString()),
        10,
      ) || 0
    );
  }

  private engNumToMyan(num: number): string {
    return num
      .toString()
      .replace(/[0-9]/g, (d) => "၀၁၂၃၄၅၆၇၈၉"[parseInt(d, 10)] || d);
  }

  private mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  public getAstrologyInfo(): string[] {
    const astro = [
      `နှစ်အမည်: ${this.sravana}`,
      `မဟာဘုတ်: ${this.mahabote}`,
      `နက္ခတ်: ${this.nakhat}`,
      `နဂါးခေါင်း: ${this.nagaHead}သို့ မျက်နှာမူ`,
    ];

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
    return [];
  }

  public isSabbath() {
    return this.mdNum === 8 || this.mpNum === 1 || this.mpNum === 3;
  }

  public ToMString() {
    return this.mmObj || "";
  }

  public getSpecialDay() {
    const out = this.isSabbath() ? ["ဥပုသ်နေ့"] : [];
    return [...out, ...this.specialDays];
  }
}
