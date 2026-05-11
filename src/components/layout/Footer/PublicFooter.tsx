import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Building2, Mail, Phone, MapPin, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  'المنصة': [
    { href: ROUTES.listings, label: 'تصفح العقارات' },
    { href: ROUTES.search, label: 'بحث متقدم' },
    { href: ROUTES.about, label: 'من نحن' },
    { href: ROUTES.blog, label: 'المدونة' },
  ],
  'للوسطاء': [
    { href: ROUTES.register, label: 'انضم كوسيط' },
    { href: ROUTES.dashboard.home, label: 'لوحة التحكم' },
    { href: ROUTES.dashboard.wallet, label: 'المحفظة' },
    { href: ROUTES.faq, label: 'الأسئلة الشائعة' },
  ],
  'قانوني': [
    { href: ROUTES.terms, label: 'الشروط والأحكام' },
    { href: ROUTES.privacy, label: 'سياسة الخصوصية' },
    { href: ROUTES.contact, label: 'اتصل بنا' },
  ],
};

const CONTACT_INFO = [
  { icon: Phone, text: '0100 000 0000' },
  { icon: Mail, text: 'info@aqarzain.com' },
  { icon: MapPin, text: 'القاهرة، مصر' },
];

export const PublicFooter = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-gold-glow">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">عقار زين</h2>
                <p className="text-sm text-slate-400">المنصة العقارية الذكية</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              نستخدم تقنيات الذكاء الاصطناعي لمساعدتك في العثور على أفضل العقارات
              بأفضل الأسعار. نساعد المشترين والوسطاء على اتخاذ قرارات ذكية.
            </p>
            <div className="space-y-3">
              {CONTACT_INFO.map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <item.icon className="w-4 h-4 text-primary-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} عقار زين. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              صنع بكل <Heart className="w-3 h-3 text-red-500 fill-red-500" /> في مصر
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
