import { Sparkles, Shield, Zap, Users, Target, Eye } from 'lucide-react';

const VALUES = [
  { icon: Target, title: 'مهمتنا', description: 'توفير منصة عقارية ذكية تربط المشترين بالوسطاء بثقة وشفافية' },
  { icon: Eye, title: 'رؤيتنا', description: 'أن نكون المنصة العقارية الأولى في الشرق الأوسط المعتمدة على الذكاء الاصطناعي' },
  { icon: Shield, title: 'قيمنا', description: 'الشفافية، المصداقية، الابتكار، وخدمة العملاء المتميزة' },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">من نحن</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          عقار زين هي منصة عقارية ذكية تستخدم تقنيات الذكاء الاصطناعي لتحليل السوق العقاري
          وتقديم توصيات دقيقة للمشترين والوسطاء
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {VALUES.map((value) => (
          <div key={value.title} className="card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <value.icon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
            <p className="text-sm text-slate-500">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="card p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">تقنيتنا</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          نستخدم أحدث تقنيات الذكاء الاصطناعي وتعلم الآلة لتحليل مئات العوامل المؤثرة في سعر العقار،
          بما في ذلك الموقع، المساحة، حالة السوق، والاتجاهات المستقبلية. نظامنا يقوم بمعالجة آلاف
          البيانات يومياً ليقدم لك تقييماً دقيقاً وموضوعياً لأي عقار.
        </p>
      </div>
    </div>
  );
}
