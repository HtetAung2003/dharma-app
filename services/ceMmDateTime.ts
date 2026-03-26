// services/ceMmDateTime.ts
// @ts-ignore
import mcal from "myanmar-calendar";

export class ceMmDateTime {
  public mmObj: any;
  public my: string = "";
  public mm: string = "";
  public mdText: string = "";
  public mpText: string = "";
  public mdNum: number = 0;
  public mpNum: number = 0;

  // Astrology Data (Manual Calculated)
  public sravana: string = "N/A";
  public mahabote: string = "N/A";
  public nakhat: string = "N/A";
  public nagaHead: string = "N/A";

  constructor(date?: Date) {
    const inputDate = date instanceof Date ? date : new Date();

    try {
      // ၁။ Library မှ String ရယူခြင်း
      const result = mcal.toMyanmar(inputDate);
      this.mmObj = result;

      if (typeof result === "string") {
        const parts = result.trim().split(/\s+/);
        this.mdText = parts[0] || "";
        this.mm = parts[1] || "";
        this.my = parts[2] || "";

        // မြန်မာဂဏန်းကို Number ပြောင်းခြင်း
        this.mdNum = this.myanNumToEng(this.mdText);
        const myYearInt = this.myanNumToEng(this.my);
        const dayOfWeek = inputDate.getDay(); // 0=Sun, 1=Mon...

        // ၂။ Moon Phase သတ်မှတ်ခြင်း
        if (result.includes("လပြည့်")) {
          this.mpText = "လပြည့်";
          this.mpNum = 1;
        } else if (result.includes("လကွယ်")) {
          this.mpText = "လကွယ်";
          this.mpNum = 3;
        } else {
          this.mpText = this.mdNum <= 15 ? "လဆန်း" : "လဆုတ်";
          this.mpNum = this.mdNum <= 15 ? 0 : 2;
        }

        // ၃။ Astrology ကို Manual တွက်ချက်ခြင်း
        if (myYearInt > 0) {
          this.calculateAstrology(myYearInt, dayOfWeek);
        }

        // 🚀 DEBUG LOGS
        console.log("================================");
        console.log("📍 ASTROLOGY DEBUG LOG");
        console.log(`📅 Date: ${inputDate.toDateString()} (Day: ${dayOfWeek})`);
        console.log(`🇲🇲 MM Date: ${result}`);
        console.log("--------------------------------");
        console.log(`🌟 Year Name (Sravana): ${this.sravana}`);
        console.log(`☸️ Mahabote: ${this.mahabote}`);
        console.log(`🏹 Nakhat: ${this.nakhat}`);
        console.log(`🐍 Naga Head: ${this.nagaHead}`);
        console.log("================================");
      }
    } catch (e) {
      console.error("❌ Calculation Error:", e);
    }
  }

  private calculateAstrology(myYear: number, dayOfWeek: number) {
    // မဟာဘုတ်တွက်နည်း: (မြန်မာသက္ကရာဇ် + မွေးနေ့ဂဏန်း) % 7
    // တနင်္ဂနွေ=0, တနင်္လာ=1 ... စနေ=6 (ဂဏန်းသင်္ချာအရ)
    const mahaboteList = [
      "ဘင်္ဂ",
      "အထွန်း",
      "ရာဇ",
      "အဓိပတိ",
      "မရဏ",
      "သိုက်",
      "ပုတိ",
    ];
    const chartPos = (myYear + dayOfWeek) % 7;
    this.mahabote = mahaboteList[chartPos] || "N/A";

    // နဂါးခေါင်း (မြန်မာလအလိုက်)
    const westMonths = ["တန်ခူး", "ကဆုန်", "နယုန်"];
    const northMonths = ["ဝါဆို", "ဝါခေါင်", "တော်သလင်း"];
    const eastMonths = ["သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်"];

    if (westMonths.includes(this.mm)) this.nagaHead = "အနောက်";
    else if (northMonths.includes(this.mm)) this.nagaHead = "မြောက်";
    else if (eastMonths.includes(this.mm)) this.nagaHead = "အရှေ့";
    else this.nagaHead = "တောင်";

    // နှစ်အမည် (သာဝဏ စသည်)
    const sravanaYears = ["ပုဏ္ဏား", "ဗြဟ္မဏ", "သာဝဏ", "စိတြ"];
    this.sravana = sravanaYears[myYear % 4] || "N/A";

    // နက္ခတ် (ရိုးရှင်းသော cycle)
    this.nakhat =
      this.mdNum % 3 === 0 ? "ဘီလူး" : this.mdNum % 3 === 1 ? "နတ်" : "လူ";
  }

  private myanNumToEng(str: string): number {
    return (
      parseInt(
        str.replace(/[၀-၉]/g, (d) => "၀၁၂၃၄၅၆၇၈၉".indexOf(d).toString()),
      ) || 0
    );
  }

  public getAstrologyInfo(): string[] {
    return [
      `နှစ်အမည်: ${this.sravana}`,
      `မဟာဘုတ်: ${this.mahabote}`,
      `နက္ခတ်: ${this.nakhat}`,
      `နဂါးခေါင်း: ${this.nagaHead}သို့ မျက်နှာမူ`,
    ];
  }
  // 🌕 လပြည့် ဟုတ်မဟုတ် စစ်ဆေးသည့် Getter
  get isFullMoon(): boolean {
    return this.mpNum === 1;
  }

  // 🌑 လကွယ် ဟုတ်မဟုတ် စစ်ဆေးသည့် Getter
  get isNewMoon(): boolean {
    return this.mpNum === 3;
  }

  // 🚩 ရက်ရာဇာ (လက်ရှိ logic ထဲတွင် default false ထားပါဦးမည်)
  get isYatyaza(): boolean {
    // နောက်ပိုင်းတွင် ရက်ရာဇာတွက်သည့် logic ထည့်ရန်
    return false;
  }
  public getHolidays(): string[] {
    // ဥပမာ - Thingyan သို့မဟုတ် အခြား အစိုးရရုံးပိတ်ရက်များ တွက်ရန်
    return [];
  }44
  public isSabbath() {
    return this.mdNum === 8 || this.mpNum === 1 || this.mpNum === 3;
  }
  public ToMString() {
    return this.mmObj || "";
  }
  public getSpecialDay() {
    return this.isSabbath() ? ["ဥပုသ်နေ့"] : [];
  }
}
