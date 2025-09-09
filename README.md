# Prayer Pro 🕌 | تطبيق متابعة الصلاة

> تطبيق ويب شامل لمتابعة وتسجيل الصلوات اليومية مع إحصائيات تفصيلية وتقارير شهرية

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Arabic](https://img.shields.io/badge/Language-Arabic-green.svg)](https://github.com/alalem/prayer-pro)
[![Islamic](https://img.shields.io/badge/Theme-Islamic-blue.svg)](https://github.com/alalem/prayer-pro)

## 🌟 المميزات الرئيسية

- ✅ **تسجيل الصلوات**: الفرائض الخمس والنوافل
- 🕌 **صلاة الجمعة الذكية**: تحديد تلقائي لصلاة الجمعة
- 📊 **إحصائيات تفاعلية**: دوائر تقدم ونسب مئوية
- 📅 **تقويم شهري**: عرض ملون لأداء كل يوم
- 👥 **متعدد المستخدمين**: دعم عدة مستخدمين
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة
- 💾 **تصدير واستيراد**: نسخ احتياطية آمنة
- 🎨 **تخصيص المظهر**: أفاتار وألوان مختلفة

## 🚀 البدء السريع

1. **تحميل المشروع**:
   ```bash
   git clone https://github.com/alalem/prayer-pro.git
   cd prayer-pro
   ```

2. **تشغيل التطبيق**:
   - افتح `index.html` في المتصفح
   - أو استخدم خادم محلي:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

3. **إنشاء مستخدم جديد**:
   - اختر "إضافة مستخدم جديد"
   - أدخل اسمك واختر أفاتار ولون
   - ابدأ تسجيل صلواتك!

## 📱 لقطات الشاشة

### اللوحة الرئيسية
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Prayer+Dashboard)

### التقرير الشهري
![Monthly Report](https://via.placeholder.com/800x400/059669/FFFFFF?text=Monthly+Report)

## 🏗️ هيكل المشروع

```
prayer-pro/
├── index.html                    # نقطة الدخول
├── user-select.html             # اختيار المستخدم
├── user-setup.html              # إعداد مستخدم جديد
├── prayer-dashboard.html        # اللوحة الرئيسية
├── table-view.html              # العرض الجدولي
├── monthly-report.html          # التقرير الشهري
├── missed-prayers-summary.html  # ملخص الصلوات المفقودة
├── missed-rakaat-summary.html   # ملخص الركعات الفائتة
├── sidebar.js                   # الشريط الجانبي
├── assets/                      # الصور والخلفيات
└── README.md                    # هذا الملف
```

## 🔧 التقنيات المستخدمة

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS
- **Storage**: localStorage (تخزين محلي)
- **Icons**: SVG, Unicode Emojis
- **Design**: Responsive, RTL Support

## 📊 نظام البيانات

### هيكل بيانات المستخدم
```javascript
{
  "username": "أحمد",
  "avatar": "👨",
  "color": "blue",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### هيكل بيانات الصلوات
```javascript
{
  "1": {
    "fajr": { "completed": true, "missedRakaat": 0 },
    "dhuhr": { "completed": true, "missedRakaat": 0 },
    "asr": { "completed": true, "missedRakaat": 0 },
    "maghrib": { "completed": true, "missedRakaat": 0 },
    "isha": { "completed": true, "missedRakaat": 0 },
    "fajr-sunnah": true,
    "duha": true,
    "witr": true
  }
}
```

## 🌟 المميزات المتقدمة

### صلاة الجمعة الذكية
- تحديد تلقائي ليوم الجمعة
- تغيير "الظهر (4 ركعات)" إلى "الجمعة (2 ركعة)"
- حساب دقيق للإحصائيات

### نظام الأيام المتتالية
- حساب عدد الأيام المتتالية للأداء المثالي
- تحفيز المستخدم للمحافظة على الصلاة

### التقارير التفصيلية
- ملخص الصلوات المفقودة
- ملخص الركعات الفائتة
- إحصائيات شهرية شاملة

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 الدعم

إذا أعجبك هذا المشروع، يرجى إعطاؤه ⭐ على GitHub!

للدعم والاستفسارات، يرجى فتح [Issue](https://github.com/alalem/prayer-pro/issues).

---

**بارك الله فيك وتقبل منك صالح الأعمال** 🤲

Made with ❤️ for the Muslim community