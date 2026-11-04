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
    mapUrl: "" // لینک مسیریابی (نشان / بلد / گوگل‌مپ). اگر خالی باشد دکمه‌اش نمایش داده نمی‌شود.
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
      title: "ADDED",
      brand: "ادد · تیم طراحی بوم",
      note: "رونمایی از کالکشن جدید آبجکت‌های استیل",
      layout: "grid",
      items: []
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
