export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">سياسة الخصوصية</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          خصوصيتك مهمة بالنسبة لنا. تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. المعلومات التي نجمعها</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          نجمع المعلومات التي تقدمها عند التسجيل مثل الاسم، البريد الإلكتروني، ورقم الهاتف.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. استخدام المعلومات</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          نستخدم معلوماتك لتقديم خدماتنا، تحسين تجربة المستخدم، والتواصل معك.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. حماية المعلومات</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          نطبق إجراءات أمنية لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح.
        </p>
      </div>
    </div>
  );
}
