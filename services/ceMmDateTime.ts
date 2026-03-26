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

  // Astrology Information
  public sravana: string = "N/A";
  public mahabote: string = "N/A";
  public nakhat: string = "N/A";
  public nagaHead: string = "N/A";

  constructor(date?: Date) {
    const inputDate = date instanceof Date ? date : new Date();

    try {
      // ၁။ အခြေခံစာသား ရယူခြင်း
      const result = mcal.toMyanmar(inputDate);
      this.mmObj = result;

      // ၂။ အသေးစိတ် Astrology Object ရယူခြင်း (true ပေးခြင်းဖြင့် Object ရနိုင်သည်)
      const astro = mcal.toMyanmar(inputDate, true);

      if (typeof result === "string") {
        const parts = result.trim().split(/\s+/);
        this.mdText = parts[0] || "N/A";
        this.mm = parts[1] || "N/A";
        this.my = parts[2] || "N/A";

        this.mdNum = this.myanNumToEng(this.mdText);

        // Moon Phase logic
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
      }

      // ၃။ Astrology Data Mapping
      if (astro && typeof astro === "object") {
        this.sravana = astro.sravana || "N/A";
        this.mahabote = astro.mahabote || "N/A";
        this.nakhat = astro.nakhat || "N/A";
        this.nagaHead = astro.naga_head || "N/A";

        console.log("--- 🌌 MYANMAR ASTROLOGY INFO ---");
        console.log(`🌟 Sravana Year: ${this.sravana}`);
        console.log(`☸️ Mahabote: ${this.mahabote}`);
        console.log(`🏹 Nakhat: ${this.nakhat}`);
        console.log(`🐍 Naga Head: ${this.nagaHead}`);
        console.log("--------------------------------");
      }
    } catch (e) {
      console.error("❌ Debug Log Error:", e);
    }
  }

  private myanNumToEng(str: string): number {
    const myanDigits = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    const engStr = str.replace(/[၀-၉]/g, (d) =>
      myanDigits.indexOf(d).toString(),
    );
    return parseInt(engStr) || 0;
  }

  public isSabbath(): boolean {
    return this.mdNum === 8 || this.mpNum === 1 || this.mpNum === 3;
  }

  public ToMString(): string {
    return typeof this.mmObj === "string" ? this.mmObj : "Data Error";
  }

  public getSpecialDay(): string[] {
    return this.isSabbath() ? ["ဥပုသ်နေ့"] : [];
  }
  public getAstrologyInfo(): string[] {
    let astro: string[] = [];

    if (this.sravana !== "N/A") astro.push(`နှစ်အမည်: ${this.sravana}`);
    if (this.mahabote !== "N/A") astro.push(`မဟာဘုတ်: ${this.mahabote}`);
    if (this.nakhat !== "N/A") astro.push(`နက္ခတ်: ${this.nakhat}`);
    if (this.nagaHead !== "N/A") astro.push(`နဂါးခေါင်း: ${this.nagaHead}`);

    return astro;
  }
}
