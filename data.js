/*
  داده‌های کاتالوگ STEEL POP
  ─────────────────────────
  • قیمت‌ها عدد لاتین و به «میلیون تومان» نوشته شوند (مثلاً 118). سایت خودش فارسی‌شان می‌کند.
  • برای کالای فروخته‌شده:  sold: true
  • برای کالایی که قیمتش اعلام نمی‌شود:  price: null   (روی سایت «استعلام در غرفه» می‌آید)
  • code هر کالا باید یکتا باشد؛ «لیست من» با همین کد کار می‌کند و فروشنده هم با همین کد کالا را پیدا می‌کند.
*/
window.CATALOG = {
  event: {
    dates: "۱۴ و ۱۵ آبان ۱۴۰۵",
    hours: "ساعت ۱۶ تا ۲۲",
    address: "قائم‌مقام فراهانی، خیابان مشاهیر، کوچه بهرامی، پلاک ۵",
    mapUrl: "https://maps.app.goo.gl/M7AJEuSsRFRAW4kg8" // لینک مسیریابی (نشان / بلد / گوگل‌مپ). اگر خالی باشد دکمه‌اش نمایش داده نمی‌شود.
  },

  sections: [
    {
      id: "rugs",
      nav: "فرش",
      title: "فرش",
      brand: "مجموعه‌ی ذوالفقاری ۱۳۵۰",
      note: "گبه و سره",
      logo: "img/brand/zolfaghari.png",
      layout: "wide",
      items: [
        { code: "R1", title: "گبه شیراز چله پشم",            specs: ["قدمت ۳۵ سال", "۱۰۶ × ۱۳۹"], price: 118, img: "img/rugs/r01.jpg", w: 640, h: 427 },
        { code: "R2", title: "گبه شیراز ترنج خطی",           specs: ["قدمت ۵۰ سال", "۱۰۰ × ۱۹۰"], price: 150, img: "img/rugs/r02.jpg", w: 640, h: 427 },
        { code: "R3", title: "گبه قشقایی لاکی",              specs: ["نوبافت", "۱۷۴ × ۲۱۲"],      price: 162, img: "img/rugs/r03.jpg", w: 640, h: 427 },
        { code: "R4", title: "گبه شیراز ۲ ترنج",             specs: ["قدمت ۷۰ سال", "۱۱۰ × ۱۷۰"], price: 250, img: "img/rugs/r04.jpg", w: 640, h: 427 },
        { code: "R5", title: "گبه شیراز نقش محرمات رنگی",    specs: ["قدمت ۴۰ سال", "۱۶۰ × ۱۰۰"], price: 137, img: "img/rugs/r05.jpg", w: 640, h: 427 },
        { code: "R6", title: "گبه شیراز خشتی ریز",           specs: ["قدمت ۷۰ سال", "۱۰۲ × ۱۴۶"], price: 240, img: "img/rugs/r06.jpg", w: 640, h: 427 },
        { code: "R7", title: "گبه نوبافت قشقایی طرح شیر سنگی", specs: ["نوبافت", "۱۵۰ × ۱۰۰"],    price: 80,  img: "img/rugs/r07.jpg", w: 640, h: 427 },
        { code: "R8", title: "سره کامو نقش محرمات",          specs: ["قدمت ۸۰ سال", "۱۲۰ × ۱۱۰"], price: 250, img: "img/rugs/r08.jpg", w: 640, h: 427 }
      ]
    },
    {
      id: "art",
      nav: "آثار هنری",
      title: "آثار هنری",
      brand: "هایا استودیو",
      note: "آثار چاپی",
      unit: "اثر",
      layout: "grid",
      items: [
        { code: "A1",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 100, img: "img/art/a01.jpg", w: 683, h: 900 },
        { code: "A2",  title: "فریدون آو",     specs: ["۳۸ × ۵۷ سانتی‌متر"],  price: 150, img: "img/art/a02.jpg", w: 900, h: 600 },
        { code: "A3",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 80,  img: "img/art/a03.jpg", w: 600, h: 900 },
        { code: "A4",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 100, img: "img/art/a04.jpg", w: 900, h: 600 },
        { code: "A5",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 100, img: "img/art/a05.jpg", w: 737, h: 900 },
        { code: "A6",  title: "نیکزاد نجومی",  specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 500, img: "img/art/a06.jpg", w: 655, h: 900 },
        { code: "A7",  title: "داریوش حسینی",  specs: ["۷۵ × ۵۶ سانتی‌متر"],  price: 70,  img: "img/art/a07.jpg", w: 447, h: 603 },
        { code: "A8",  title: "فرشید ملکی",    specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 70,  img: "img/art/a08.jpg", w: 900, h: 676 },
        { code: "A9",  title: "فرشید ملکی",    specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 70,  img: "img/art/a09.jpg", w: 900, h: 671 },
        { code: "A10", title: "فریدون آو",     specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 260, img: "img/art/a10.jpg", w: 900, h: 673 },
        { code: "A11", title: "فریدون آو",     specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 260, img: "img/art/a11.jpg", w: 900, h: 669 },
        { code: "A12", title: "مسلمیان",       specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 140, img: "img/art/a12.jpg", w: 670, h: 900 },
        { code: "A13", title: "علی نصیر",      specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 90,  img: "img/art/a13.jpg", w: 599, h: 900 },
        { code: "A14", title: "قباد شیوا",     sub: "پوستر تئاتر جهان سوم",     specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 100, img: "img/art/a14.jpg", w: 642, h: 900 },
        { code: "A15", title: "نیکزاد نجومی",  specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 150, img: "img/art/a15.jpg", w: 645, h: 900 },
        { code: "A16", title: "فرشید مثقالی",  sub: "پوستر فیلم دار",           specs: ["۱۰۰ × ۷۰ سانتی‌متر"], price: 180, img: "img/art/a16.jpg", w: 625, h: 900 },
        { code: "A17", title: "آیدین آغداشلو", sub: "پوستر فیلم تیغ و ابریشم",  specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 90,  img: "img/art/a17.jpg", w: 635, h: 900 },
        { code: "A18", title: "بهشتی",         sub: "پوستر فیلم صادق کرده",     specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 40,  img: "img/art/a18.jpg", w: 640, h: 900 },
        { code: "A19", title: "مرتضی ممیز",    sub: "پوستر فیلم اجاره‌نشین‌ها", specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 50,  img: "img/art/a19.jpg", w: 599, h: 900 }
      ]
    },
    {
      id: "added",
      nav: "ادد",
      title: "ادد",
      brand: "ADDED · تیم طراحی بوم",
      note: "کالکشن جدید آبجکت‌های استیل",
      logo: "img/brand/added.png",
      layout: "grid sq",
      items: [
        { code: "D1",  title: "NEW SOFA",                 specs: ["۱۴۶ × ۷۵ · ارتفاع ۵۰"],                                           price: 210, img: "img/added/d01.jpg", w: 1000, h: 667 },
        { code: "D2",  title: "4-LEVEL STAND",            specs: ["۱۲۰ × ۳۰ · ارتفاع ۸۵", "استیل ضد زنگ"],                            price: 85,  img: "img/added/d02.jpg", w: 1000, h: 1000 },
        { code: "D3",  title: "MODULAR SHELF",            specs: ["استیل ضد زنگ"],                                                   price: 210, img: "img/added/d03.jpg", w: 750,  h: 1000 },
        { code: "D4",  title: "MODULAR SHELF",            specs: ["طبقه‌ها: ۱ × ۱۵۶، ۱ × ۲۳۰، ۴ × ۸۲ سانتی‌متر", "استیل ضد زنگ"],    price: 154, img: "img/added/d04.jpg", w: 1000, h: 1000 },
        { code: "D5",  title: "MODULAR SHELF",            specs: ["طبقه‌ها: ۳ × ۸۲، ۱ × ۲۳۰، ۲ × ۱۵۶ سانتی‌متر", "استیل ضد زنگ"],    price: 162, img: "img/added/d05.jpg", w: 1000, h: 1000 },
        { code: "D6",  title: "MODULAR SHELF",            specs: ["طبقه‌ها: ۲ × ۱۲۰، ۱ × ۶۴ سانتی‌متر", "استیل ضد زنگ"],              price: 64,  img: "img/added/d06.jpg", w: 1000, h: 667 },
        { code: "D7",  title: "CYLINDER COFFEE",          specs: ["۷۸ × ۳۰", "استیل ضد زنگ"],                                         price: 95,  img: "img/added/d07.jpg", w: 1000, h: 667 },
        { code: "D8",  title: "JOINT COFFEE",             specs: ["۱۰۰ × ۱۰۰ × ۳۰", "استیل ضد زنگ"],                                  price: 120, img: "img/added/d08.jpg", w: 1000, h: 667 },
        { code: "D9",  title: "JOINT DINING",             specs: ["۲۰۰ × ۱۰۰ × ۷۵", "استیل ضد زنگ"],                                  price: 195, img: "img/added/d09.jpg", w: 1000, h: 667 },
        { code: "D10", title: "HANGING MIRROR OBJECT",    specs: ["۹۰ × ۳۰", "استیل ضد زنگ"],                                         price: 60,  img: "img/added/d10.jpg", w: 667,  h: 1000 },
        { code: "D11", title: "CUBE TV CONSOLE",          specs: ["۲۱۳ × ۴۰ × ۳۵", "استیل ضد زنگ"],                                   price: 145, img: "img/added/d11.jpg", w: 1000, h: 750 },
        { code: "D12", title: "CURVED MIRROR",            specs: ["استیل ضد زنگ"],                                                   price: 98,  img: "img/added/d12.jpg", w: 750,  h: 1000 },
        { code: "D13", title: "UFO",                      specs: ["استیل ضد زنگ"],                                                   price: 3.8, img: "img/added/d13.jpg", w: 1000, h: 1000 },
        { code: "D14", title: "MIRROR / MATTE PARTITION", specs: ["استیل ضد زنگ"],                                                   price: 355, img: "img/added/d14.jpg", w: 908,  h: 1000 },
        { code: "D15", title: "CONE SIDE",                specs: ["استیل ضد زنگ"],                                                   price: 95,  img: "img/added/d15.jpg", w: 800,  h: 1000 },
        { code: "D16", title: "CONE DINING",              specs: ["استیل ضد زنگ"],                                                   price: 190, img: "img/added/d16.jpg", w: 914,  h: 1000 },
        { code: "D17", title: "ADDED PLAY TIC TAC TOE",   specs: [],                                                                 price: 45,  img: "img/added/d17.jpg", w: 750,  h: 1000 },
        { code: "D18", title: "STRIPED SEAT",             specs: ["۱۸۰ × ۴۵ · ارتفاع ۵۰", "فلز آبکاری‌شده"],                          price: 120, img: "img/added/d18.jpg", w: 1000, h: 750 },
        { code: "D19", title: "ADDED PLAY PING",          specs: ["۱۸۶ × ۹۰", "استیل ضد زنگ"],                                        price: 195, img: "img/added/d19.jpg", w: 1000, h: 667 }
      ]
    },
    {
      id: "maghaaze",
      nav: "مغازه",
      title: "MAGHAAZE",
      brand: "مغازه",
      note: "آبجکت‌های Seletti با زبان بصری پاپ‌آرت",
      layout: "grid",
      items: []
    }
  ],

  // برندهای حاضر در رویداد (بخش «درباره‌ی بوم»)
  participants: [
    ["ADDED", "کالکشن جدید آبجکت‌های استیل"],
    ["MAGHAAZE", "آبجکت‌های Seletti"],
    ["Haya Studio", "آثار هنری"],
    ["Zolfaghari 1350", "فرش"],
    ["84", "پوشاک"],
    ["TheMoak", "عینک"],
    ["Studio Variété", "پذیرایی"]
  ]
};
