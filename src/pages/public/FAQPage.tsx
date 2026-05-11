import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';

const FAQS = [
  {
    q: 'ما هو عقار زين؟',
    a: 'عقار زين هي منصة عقارية ذكية تستخدم الذكاء الاصطناعي لتحليل العقارات وتقديم تقييمات دقيقة للمشترين والوسطاء.',
    category: 'عام',
  },
  {
    q: 'كيف يعمل تقييم AI؟',
    a: 'نظامنا يحلل مئات العوامل مثل الموقع، المساحة، حالة السوق، والاتجاهات المستقبلية ليعطي تقييماً من 0-100.',
    category: 'تقني',
  },
  {
    q: 'كيف أسجل كوسيط؟',
    a: 'يمكنك التسجيل من خلال صفحة إنشاء حساب، واختيار "وسيط عقاري"، ثم إكمال بياناتك ورفع المستندات المطلوبة.',
    category: 'وسطاء',
  },
  {
    q: 'هل المنصة مجانية؟',
    a: 'التسجيل وتصفح العقارات مجاني. للوسطاء، هناك باقات رصيد لتمييز العقارات وإبرازها في نتائج البحث.',
    category: 'عام',
  },
  {
    q: 'كيف أضيف عقاراً؟',
    a: 'بعد تسجيل الدخول، اذهب إلى لوحة التحكم واضغط على "إضافة عقار"، ثم املأ بيانات العقار وارفع الصور.',
    category: 'وسطاء',
  },
  {
    q: 'هل العقارات موثقة؟',
    a: 'نعم، فريقنا يراجع جميع العقارات المضافة للتأكد من صحتها وجودة البيانات قبل نشرها.',
    category: 'عام',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', ...new Set(FAQS.map((f) => f.category))];
  const filtered = activeCategory === 'الكل' ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">الأسئلة الشائعة</h1>
        <p className="text-slate-500">كل ما تحتاج معرفته عن منصة عقار زين</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-primary-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((faq, index) => (
          <div
            key={index}
            className="card overflow-hidden cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="p-4 flex items-center justify-between gap-4">
              <h3 className="font-medium text-slate-900 dark:text-white text-sm">{faq.q}</h3>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform',
                  openIndex === index && 'rotate-180'
                )}
              />
            </div>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-slide-down">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
