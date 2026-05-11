export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">الشروط والأحكام</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          مرحباً بك في عقار زين. باستخدامك للمنصة، فإنك توافق على الشروط والأحكام التالية.
          يرجى قراءتها بعناية قبل استخدام خدماتنا.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. قبول الشروط</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          باستخدامك لمنصة عقار زين، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. التسجيل</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          للتسجيل كوسيط، يجب تقديم معلومات دقيقة وكاملة. أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. المحتوى</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          أنت مسؤول عن دقة المعلومات التي تنشرها عن العقارات. نحتفظ بالحق في إزالة أي محتوى غير دقيق أو مضلل.
        </p>
      </div>
    </div>
  );
}
