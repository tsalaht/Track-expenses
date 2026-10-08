# ميزان — دفتر مصاريف ومداخيل التجارة الإلكترونية

تطبيق ويب بالدارجة والدينار الجزائري.

## التشغيل

لازم Node.js 22:

```bash
npm install
npm run dev
```

يفتح على المنفذ 8080.

## وين الكود المهم

| الملف | الدور |
|---|---|
| `src/lib/ledger/model.ts` | الأنواع، الأبواب، الحسابات، المثال |
| `src/lib/ledger/store.ts` | الحفظ في المتصفح (localStorage) |
| `src/components/ledger/home.tsx` | الصفحة الرئيسية |
| `src/components/ledger/entry-form.tsx` | فورم مدخول / مصروف |
| `src/components/ledger/kpis.tsx` | بطاقات المداخيل والمصاريف والربح |
| `src/components/ledger/flow-chart.tsx` | الرسم البياني |
| `src/components/ledger/categories-panel.tsx` | وين راحوا المصاريف |
| `src/components/ledger/transactions.tsx` | قائمة الحركات |
| `src/routes/index.tsx` | مسار الصفحة |
| `src/routes/__root.tsx` | غلاف الصفحة (عربي RTL) |
| `src/styles.css` | الألوان والخطوط |

الحسابات تتحفظ في **نفس المتصفح على نفس الجهاز** (`mizan-ledger-v1`). الكمبيوتر والتيليفون ما يتزامنوش وحدهم — كل واحد عندو نسختو.

## التصدير

من القائمة (⋮) داخل التطبيق: تصدير CSV للفترة المختارة.
يوجد أيضاً ملف Excel جاهز: `public/mizan.xlsx`.
