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
      id: "art",
      nav: "آثار هنری",
      title: "آثار هنری",
      brand: "هایا استودیو",
      note: "آثار هنری",
      unit: "اثر",
      layout: "grid",
      items: [
        { code: "A1",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 110, img: "img/art/a01.jpg", w: 683, h: 900 },
        { code: "A2",  title: "فریدون آو",     specs: ["۳۸ × ۵۷ سانتی‌متر"],  price: 150, img: "img/art/a02.jpg", w: 900, h: 600, sold: true },
        { code: "A3",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 80,  img: "img/art/a03.jpg", w: 600, h: 900 },
        { code: "A4",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 110, img: "img/art/a04.jpg", w: 900, h: 600 },
        { code: "A5",  title: "نیکزاد نجومی",  specs: ["۴۴ × ۶۰ سانتی‌متر"],  price: 110, img: "img/art/a05.jpg", w: 737, h: 900 },
        { code: "A6",  title: "نیکزاد نجومی",  specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 500, img: "img/art/a06.jpg", w: 655, h: 900 },
        { code: "A7",  title: "داریوش حسینی",  specs: ["۷۵ × ۵۶ سانتی‌متر"],  price: 70,  img: "img/art/a07.jpg", w: 447, h: 603, sold: true },
        { code: "A8",  title: "فرشید ملکی",    specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 70,  img: "img/art/a08.jpg", w: 900, h: 676 },
        { code: "A9",  title: "فرشید ملکی",    specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 70,  img: "img/art/a09.jpg", w: 900, h: 671 },
        { code: "A10", title: "فریدون آو",     specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 320, img: "img/art/a10.jpg", w: 900, h: 673 },
        { code: "A11", title: "فریدون آو",     specs: ["۷۶ × ۵۷ سانتی‌متر"],  price: 320, img: "img/art/a11.jpg", w: 900, h: 669 },
        { code: "A12", title: "مسلمیان",       specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 140, img: "img/art/a12.jpg", w: 670, h: 900 },
        { code: "A13", title: "علی نصیر",      specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 90,  img: "img/art/a13.jpg", w: 599, h: 900 },
        { code: "A14", title: "قباد شیوا",     sub: "پوستر تئاتر جهان سوم",     specs: ["۷۶ × ۵۶ سانتی‌متر"],  price: 100, img: "img/art/a14.jpg", w: 642, h: 900 },
        { code: "A15", title: "نیکزاد نجومی",  specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 150, img: "img/art/a15.jpg", w: 645, h: 900 },
        { code: "A16", title: "فرشید مثقالی",  sub: "پوستر فیلم دار",           specs: ["۱۰۰ × ۷۰ سانتی‌متر"], price: 180, img: "img/art/a16.jpg", w: 625, h: 900 },
        { code: "A17", title: "آیدین آغداشلو", sub: "پوستر فیلم تیغ و ابریشم",  specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 90,  img: "img/art/a17.jpg", w: 635, h: 900 },
        { code: "A18", title: "بهشتی",         sub: "پوستر فیلم صادق کرده",     specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 40,  img: "img/art/a18.jpg", w: 640, h: 900 },
        { code: "A19", title: "مرتضی ممیز",    sub: "پوستر فیلم اجاره‌نشین‌ها", specs: ["۵۰ × ۷۰ سانتی‌متر"],  price: 50,  img: "img/art/a19.jpg", w: 599, h: 900 },
        { code: "A20", title: "آیدین آغداشلو",   specs: ["۵۶ × ۷۶ سانتی‌متر"],   price: 900, img: "img/art/a20.jpg", w: 476, h: 640 },
        { code: "A21", title: "هبال تاژاندره",   specs: ["۱۶۰ × ۱۹۰ سانتی‌متر"], price: 200, img: "img/art/a21.jpg", w: 512, h: 640 },
        { code: "A22", title: "یاسمن عطایی",     specs: ["۱۸۰ × ۱۲۰ سانتی‌متر"], price: 140, img: "img/art/a22.jpg", w: 640, h: 461 },
        { code: "A23", title: "میلاد شفائی",     specs: ["۱۰۰ × ۷۰ سانتی‌متر"],  price: 20,  img: "img/art/a23.jpg", w: 471, h: 640 },
        { code: "F1", title: "فرامرز (هشوار)", specs: ["A4", "سال تولید ۱۴۰۴"],                   price: 20,  img: "img/art/f1.jpg", w: 769, h: 1000 },
        { code: "F2", title: "فرامرز (هشوار)", specs: ["A4", "سال تولید ۱۴۰۴"],                   price: 20,  img: "img/art/f2.jpg", w: 761, h: 1000 },
        { code: "F3", title: "فرامرز (هشوار)", specs: ["۴۰ × ۳۰ سانتی‌متر", "سال تولید ۱۴۰۴"],   price: 32,  img: "img/art/f3.jpg", w: 784, h: 1000 },
        { code: "F4", title: "فرامرز (هشوار)", specs: ["۱۳۰ × ۲۰۰ سانتی‌متر", "سال تولید ۲۰۲۱"], price: 160, img: "img/art/f4.jpg", w: 660, h: 1000 },
        { code: "A37", title: "محمد فاسونکی", specs: ["۵۵ × ۷۵ سانتی‌متر", "سال تولید ۱۳۷۵"], price: 250, img: "img/art/a37.jpg", w: 689, h: 1000 },
        { code: "A24", group: "کالکشن زمستان سرگردان", title: "بیتا فیاضی",       specs: ["۲۷ × ۲۰ سانتی‌متر"], price: 18, img: "img/art/a24.jpg", w: 640, h: 427 },
        { code: "A25", group: "کالکشن زمستان سرگردان", title: "فریدون آو",        specs: ["۲۷ × ۲۰ سانتی‌متر"], price: 30, img: "img/art/a25.jpg", w: 640, h: 443 },
        { code: "A26", group: "کالکشن زمستان سرگردان", title: "بهزاد حاتم",       specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 15, img: "img/art/a26.jpg", w: 462, h: 640 },
        { code: "A27", group: "کالکشن زمستان سرگردان", title: "آیدین آغداشلو",    specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 70, img: "img/art/a27.jpg", w: 441, h: 640 },
        { code: "A28", group: "کالکشن زمستان سرگردان", title: "پارسا پورابراهیم", specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 7,  img: "img/art/a28b.jpg", w: 767, h: 1000 },
        { code: "A29", group: "کالکشن زمستان سرگردان", title: "مرتضی پورحسینی",   specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 10, img: "img/art/a29.jpg", w: 452, h: 640 },
        { code: "A30", group: "کالکشن زمستان سرگردان", title: "محسن احمدوند",     specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 9,  img: "img/art/a30.jpg", w: 422, h: 573 },
        { code: "A31", group: "کالکشن زمستان سرگردان", title: "شایا شهرستانی",    specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 9,  img: "img/art/a31.jpg", w: 480, h: 640 },
        { code: "A32", group: "کالکشن زمستان سرگردان", title: "امیر فرهاد",       specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 9,  img: "img/art/a32.jpg", w: 480, h: 640 },
        { code: "A33", group: "کالکشن زمستان سرگردان", title: "امیر فرهاد",       specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 9,  img: "img/art/a33.jpg", w: 480, h: 640 },
        { code: "A34", group: "کالکشن زمستان سرگردان", title: "پریوش گنجی",       specs: ["۲۰ × ۲۷ سانتی‌متر"], price: 18, img: "img/art/a34.jpg", w: 465, h: 640 },
        { code: "A35", group: "کالکشن زمستان سرگردان", title: "بهناز قاسمی",      specs: ["۲۷ × ۲۰ سانتی‌متر"], price: 9,  img: "img/art/a35.jpg", w: 560, h: 427 },
        { code: "A36", group: "کالکشن زمستان سرگردان", title: "ناهید بهبودیان",   specs: ["۲۷ × ۲۰ سانتی‌متر"], price: 9,  img: "img/art/a36.jpg", w: 640, h: 480 },
        { code: "Z1", group: "علیرضا عزیزی · DAR BE DAR", title: "علیرضا عزیزی", sub: "DBD-P03-A01", specs: ["۵۰ × ۵۰ سانتی‌متر", "سیلک‌اسکرین", "ادیشن ۳"], price: 45, img: "img/azizi/z1.jpg", w: 1000, h: 991 },
        { code: "Z2", group: "علیرضا عزیزی · DAR BE DAR", title: "علیرضا عزیزی", sub: "DBD-P03-A02", specs: ["۵۰ × ۵۰ سانتی‌متر", "سیلک‌اسکرین", "ادیشن ۵"], price: 75, img: "img/azizi/z2.jpg", w: 1000, h: 1000 },
        { code: "Z3", group: "علیرضا عزیزی · DAR BE DAR", title: "علیرضا عزیزی", sub: "DBD-P03-A03", specs: ["۵۰ × ۵۰ سانتی‌متر", "سیلک‌اسکرین", "ادیشن ۴"], price: 60, img: "img/azizi/z3.jpg", w: 1000, h: 995 },
        { code: "Z4", group: "علیرضا عزیزی · DAR BE DAR", title: "علیرضا عزیزی", sub: "DBD-P03-A04", specs: ["۵۰ × ۵۰ سانتی‌متر", "سیلک‌اسکرین", "ادیشن ۴"], price: 80, img: "img/azizi/z4.jpg", w: 1000, h: 998 }
      ]
    },
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
        { code: "R8", title: "سفره کامو نقش محرمات",          specs: ["قدمت ۸۰ سال", "۱۲۰ × ۱۱۰"], price: 250, img: "img/rugs/r08.jpg", w: 640, h: 427 }
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
        { code: "D19", title: "ADDED PLAY PING",          specs: ["۱۸۶ × ۹۰", "استیل ضد زنگ"],                                        price: 195, img: "img/added/d19.jpg", w: 1000, h: 667 },
        { code: "D20", group: "WASSILY CHAIR FAMILY", title: "ARMCHAIR",    specs: ["رنگ‌ها: مشکی و نارنجی"], price: 85,  img: "img/added/d20.jpg", w: 1000, h: 667 },
        { code: "D21", group: "WASSILY CHAIR FAMILY", title: "TABLE CHAIR", specs: ["رنگ‌ها: مشکی و نارنجی"], price: 80,  img: "img/added/d21.jpg", w: 914,  h: 1000 },
        { code: "D22", group: "WASSILY CHAIR FAMILY", title: "THE WASSILY", specs: ["رنگ‌ها: مشکی و نارنجی"], price: 110, img: "img/added/d22.jpg", w: 667,  h: 1000 }
      ]
    },
    {
      id: "maghaaze",
      nav: "مغازه",
      title: "MAGHAAZE",
      brand: "مغازه",
      note: "آبجکت‌های Seletti با زبان بصری پاپ‌آرت",
      layout: "grid sq",
      items: [
        { code: "M1",  title: "Seletti x Toilet Paper Plate",                 specs: ["قیمت هر عدد"],            price: 10,  img: "img/maghaaze/m01.jpg", w: 800,  h: 800 },
        { code: "M2",  title: "Seletti x Toilet Paper Bowl",                  specs: ["قیمت هر عدد"],            price: 10,  img: "img/maghaaze/m02.jpg", w: 1000, h: 1000 },
        { code: "M3",  title: "Ceramic Moka Pot",                             specs: [],                         price: 16,  img: "img/maghaaze/m03.jpg", w: 1000, h: 973 },
        { code: "M4",  title: "Kitchen Towel",                                specs: ["قیمت هر عدد"],            price: 5,   img: "img/maghaaze/m04.jpg", w: 640,  h: 548 },
        { code: "M5",  title: "Seletti x Diesel Machine Collection Plate Large",  specs: ["قیمت هر عدد"],        price: 15,  img: "img/maghaaze/m05.jpg", w: 590,  h: 590 },
        { code: "M6",  title: "Seletti x Diesel Machine Collection Plate Medium", specs: ["قیمت هر عدد"],        price: 15,  img: "img/maghaaze/m05.jpg", w: 590,  h: 590 },
        { code: "M7",  title: "Seletti x Diesel Machine Collection Plate Small",  specs: ["قیمت هر عدد"],        price: 13,  img: "img/maghaaze/m05.jpg", w: 590,  h: 590 },
        { code: "M8",  title: "Seletti x Diesel Machine Collection Plate",    specs: ["قیمت هر عدد"],            price: 15,  img: "img/maghaaze/m08.jpg", w: 1000, h: 1000 },
        { code: "M9",  title: "Seletti Pie Plate Medium",                     specs: ["قیمت هر عدد"],            price: 15,  img: "img/maghaaze/m09.jpg", w: 841,  h: 1000 },
        { code: "M10", title: "Seletti Pie Plate Small",                      specs: ["قیمت هر عدد"],            price: 13,  img: "img/maghaaze/m09.jpg", w: 841,  h: 1000 },
        { code: "M11", title: "Seletti x Diesel Machine Collection Decorative Jar Large", specs: [],             price: 16,  img: "img/maghaaze/m11.jpg", w: 224,  h: 224 },
        { code: "M12", title: "Seletti x Diesel Machine Collection Decorative Jar Small", specs: [],             price: 13,  img: "img/maghaaze/m12.jpg", w: 1000, h: 1000 },
        { code: "M13", title: "Seletti Hybrid Soup Plate",                    specs: [],                         price: 16,  img: "img/maghaaze/m13.jpg", w: 1000, h: 500 },
        { code: "M14", title: "Seletti x Toilet Paper China Plate",           specs: [],                         price: 16,  img: "img/maghaaze/m14.jpg", w: 1000, h: 500 },
        { code: "M15", title: "Seletti x Pantone Magazine Holder",            specs: [],                         price: 16,  img: "img/maghaaze/m15.jpg", w: 640,  h: 640 },
        { code: "M16", title: "Seletti Plate Mat",                            specs: [],                         price: 10,  img: "img/maghaaze/m16.jpg", w: 447,  h: 447 },
        { code: "M17", title: "Seletti Decorative Spaceship",                 specs: [],                         price: 42,  img: "img/maghaaze/m17.jpg", w: 1000, h: 1000 },
        { code: "M18", title: "Seletti Egg Lighting",                         specs: [],                         price: 30,  img: "img/maghaaze/m18.jpg", w: 1000, h: 500 },
        { code: "M19", title: "Seletti Ceramic Lighting",                     specs: ["قیمت هر عدد"], price: 40,  img: "img/maghaaze/m19.jpg", w: 814,  h: 1000 },
        { code: "M20", title: "Seletti Vibrant Lamp Wire",                    specs: ["۵ متری", "قیمت هر عدد"],  price: 7.5, img: "img/maghaaze/m20.jpg", w: 791,  h: 1000 },
        { code: "M21", title: "Crystal Candle Holder",                        specs: ["قیمت هر عدد"],            price: 30,  img: "img/maghaaze/m21.jpg", w: 1000, h: 500 },
        { code: "M22", title: "Seletti Ceiling Lighting",                     specs: [],                         price: 40,  img: "img/maghaaze/m22.jpg", w: 616,  h: 462 },
        { code: "M23", title: "Seletti Table Lamp",                           specs: [],                         price: 40,  img: "img/maghaaze/m23.jpg", w: 334,  h: 552 },
        { code: "M24", title: "آرش نظری", sub: "بدون عنوان", specs: ["۱۰۰ × ۱۷۰ سانتی‌متر", "چاپ دیجیتال روی استیل ضد زنگ", "سال تولید ۲۰۱۱"], price: null, priceText: ["۶٬۰۰۰", "دلار"], img: "img/maghaaze/m24.jpg", w: 1000, h: 588 },
        { code: "M25", title: "Devialet Phantom I 108 dB Gold", specs: ["Devialet", "Contemporary"], price: null, priceText: ["۲٬۰۰۰", "دلار"], img: "img/maghaaze/m25.jpg", w: 979, h: 800 }
      ]
    }
  ],

  // برندهای حاضر در رویداد (بخش «درباره‌ی بوم»)
  participants: [
    ["ADDED", "کالکشن جدید آبجکت‌های استیل"],
    ["MAGHAAZE", "آبجکت‌های Seletti"],
    ["Haya Studio", "آثار هنری"],
    ["Alireza Azizi", "آثار چاپی"],
    ["Zolfaghari 1350", "فرش"],
    ["84", "پوشاک"],
    ["TheMoak", "عینک"],
    ["Studio Variété", "پذیرایی"]
  ]
};
