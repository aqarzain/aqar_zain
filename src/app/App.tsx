import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const gold = '#D4AF37';
const goldDark = '#C5A028';

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');
  useEffect(() => {
    localStorage.setItem('darkMode', String(dark));
    document.documentElement.style.background = dark ? '#0f172a' : '#f8fafc';
    document.documentElement.style.color = dark ? '#f1f5f9' : '#0f172a';
  }, [dark]);
  return { dark, toggle: () => setDark(!dark) };
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', (e) => setMatches(e.matches));
    return () => mq.removeEventListener('change', () => {});
  }, [query]);
  return matches;
}

const themeFn = (dark: boolean) => ({
  bg: dark ? '#0f172a' : '#f8fafc',
  card: dark ? '#1e293b' : '#fff',
  border: dark ? '#334155' : '#e5e7eb',
  text: dark ? '#f1f5f9' : '#0f172a',
  muted: dark ? '#94a3b8' : '#64748b',
});

function Container({ children, style }: any) {
  return <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', ...style }}>{children}</div>;
}

function Badge({ children, color, style }: any) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: color || gold, color: 'white', ...style }}>{children}</span>;
}

function Card({ children, dark, style, onClick }: any) {
  const t = themeFn(dark);
  return <div onClick={onClick} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', transition: 'all 0.3s', ...style }}>{children}</div>;
}

function Button({ children, variant, onClick, fullWidth, style }: any) {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const s: any = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: isMobile ? '10px 18px' : '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: isMobile ? 13 : 15, transition: 'all 0.3s', width: fullWidth ? '100%' : 'auto', ...style };
  if (variant === 'primary') { s.background = gold; s.color = 'white'; }
  else if (variant === 'outline') { s.background = 'transparent'; s.border = `2px solid ${gold}`; s.color = gold; }
  else if (variant === 'ghost') { s.background = 'transparent'; s.color = '#64748b'; }
  else if (variant === 'whatsapp') { s.background = '#25D366'; s.color = 'white'; }
  else if (variant === 'danger') { s.background = '#EF4444'; s.color = 'white'; }
  return <button onClick={onClick} style={s}>{children}</button>;
}

function Input({ placeholder, value, onChange, type, dark, style }: any) {
  const t = themeFn(dark);
  return <input type={type || 'text'} placeholder={placeholder} value={value} onChange={onChange} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.bg, color: t.text, fontSize: 14, boxSizing: 'border-box', ...style }} />;
}

function Select({ value, onChange, options, dark, style }: any) {
  const t = themeFn(dark);
  return <select value={value} onChange={onChange} style={{ padding: '10px 14px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.bg, color: t.text, fontSize: 13, cursor: 'pointer', ...style }}>{options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}

function LoadingSpinner() {
  return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: gold, animation: 'spin 1s linear infinite' }} /><style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style></div>;
}

function EmptyState({ icon, title, description, action }: any) {
  return <div style={{ textAlign: 'center', padding: '60px 20px' }}><div style={{ fontSize: 48, marginBottom: 16 }}>{icon || '📭'}</div><h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{title}</h3><p style={{ color: '#64748b', marginBottom: 20 }}>{description}</p>{action && <Button variant="primary" onClick={action.onClick}>{action.label}</Button>}</div>;
}

function StatCard({ icon, value, label, color, dark }: any) {
  const t = themeFn(dark);
  return <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '16px 20px', textAlign: 'center' }}><div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div><div style={{ fontSize: 28, fontWeight: 'bold', color: color || gold }}>{value}</div><div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>{label}</div></div>;
}

function Navbar({ currentPage, onNavigate, dark, toggleDark }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const t = themeFn(dark);
  const links = [{ id: 'home', label: 'الرئيسية', icon: '🏠' }, { id: 'listings', label: 'العقارات', icon: '🏘️' }];

  return (
    <nav style={{ background: t.card, borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div onClick={() => { onNavigate('home'); setMobileOpen(false); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${gold}, ${goldDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>ز</div>
            <span style={{ fontWeight: 'bold', fontSize: 18, color: t.text }}>عقار زين</span>
          </div>
          {!isMobile && <div style={{ display: 'flex', gap: 2 }}>{links.map(l => <button key={l.id} onClick={() => onNavigate(l.id)} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 14, background: currentPage === l.id ? gold : 'transparent', color: currentPage === l.id ? 'white' : t.muted }}>{l.icon} {l.label}</button>)}</div>}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}>{dark ? '☀️' : '🌙'}</button>
            {!isMobile && <><Button variant="outline" onClick={() => onNavigate('login')}>دخول</Button><Button variant="primary" onClick={() => onNavigate('register')}>حساب جديد</Button></>}
            {isMobile && <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', fontSize: 22, color: t.text, padding: 4 }}>{mobileOpen ? '✕' : '☰'}</button>}
          </div>
        </div>
        {isMobile && mobileOpen && (
          <div style={{ borderTop: `1px solid ${t.border}`, padding: '12px 0' }}>
            {links.map(l => <button key={l.id} onClick={() => { onNavigate(l.id); setMobileOpen(false); }} style={{ display: 'block', width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', textAlign: 'right', fontSize: 14, background: currentPage === l.id ? gold : 'transparent', color: currentPage === l.id ? 'white' : t.text, marginBottom: 4 }}>{l.icon} {l.label}</button>)}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><Button variant="outline" fullWidth onClick={() => { onNavigate('login'); setMobileOpen(false); }}>دخول</Button><Button variant="primary" fullWidth onClick={() => { onNavigate('register'); setMobileOpen(false); }}>حساب جديد</Button></div>
          </div>
        )}
      </Container>
    </nav>
  );
}

function Footer({ dark }: any) {
  return (
    <footer style={{ background: '#1e293b', padding: '40px 16px', marginTop: 60 }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${gold}, ${goldDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: 14 }}>ز</div><span style={{ color: '#f1f5f9', fontWeight: 'bold', fontSize: 16 }}>عقار زين</span></div>
            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>المنصة العقارية الذكية الأولى في مصر. نستخدم الذكاء الاصطناعي لمساعدتك في العثور على أفضل العقارات بأفضل الأسعار.</p>
          </div>
          <div><h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: 12, fontSize: 15 }}>روابط سريعة</h4><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{['الرئيسية', 'العقارات', 'عن المنصة', 'اتصل بنا'].map(l => <span key={l} style={{ color: '#94a3b8', fontSize: 13, cursor: 'pointer' }}>{l}</span>)}</div></div>
          <div><h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: 12, fontSize: 15 }}>اتصل بنا</h4><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>📧 info@aqarzain.com</span><span style={{ color: '#94a3b8', fontSize: 13 }}>📞 0100 000 0000</span><span style={{ color: '#94a3b8', fontSize: 13 }}>📍 القاهرة، مصر</span></div></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 30, paddingTop: 20, borderTop: '1px solid #334155' }}><p style={{ color: '#64748b', fontSize: 12 }}>© 2026 عقار زين. جميع الحقوق محفوظة.</p></div>
      </Container>
    </footer>
  );
}

function HomePage({ onNavigate, dark }: any) {
  const [featured, setFeatured] = useState<any[]>([]);
  const [stats] = useState({ listings: 5000, brokers: 1200, deals: 500 });
  const isMobile = useMediaQuery('(max-width: 640px)');
  const t = themeFn(dark);

  useEffect(() => {
    fetch('/api/listings?featured=1&limit=6').then(r => r.json()).then(d => setFeatured(d.data || [])).catch(() => {});
  }, []);

  return (
    <div>
      <section style={{ background: dark ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e3a5f 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #fff 50%, #fef3c7 100%)', padding: isMobile ? '50px 16px' : '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: `${gold}15`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <Badge style={{ marginBottom: 20 }}>🤖 مدعوم بالذكاء الاصطناعي</Badge>
          <h1 style={{ fontSize: isMobile ? 28 : 52, fontWeight: 800, margin: '0 0 16px', color: t.text, lineHeight: 1.2 }}>ابحث عن <span style={{ color: gold }}>عقار أحلامك</span> بذكاء</h1>
          <p style={{ fontSize: isMobile ? 15 : 19, color: t.muted, maxWidth: 550, margin: '0 auto 32px', lineHeight: 1.7 }}>نساعدك في العثور على أفضل العقارات باستخدام تقنيات الذكاء الاصطناعي لتحليل السوق وتقديم توصيات دقيقة</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}><Button variant="primary" onClick={() => onNavigate('listings')}>🏘️ تصفح العقارات</Button><Button variant="outline" onClick={() => onNavigate('register')}>👤 انضم كوسيط</Button></div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 40, marginTop: 40 }}>
            {[{ icon: '🏠', value: `+${stats.listings}`, label: 'عقار' }, { icon: '👥', value: `+${stats.brokers}`, label: 'وسيط' }, { icon: '🤝', value: `+${stats.deals}`, label: 'صفقة شهرياً' }].map(s => <div key={s.label} style={{ textAlign: 'center' }}><div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: isMobile ? 18 : 24, fontWeight: 'bold', color: gold }}>{s.value}</div><div style={{ fontSize: 12, color: t.muted }}>{s.label}</div></div>)}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 16px' : '80px 20px', background: dark ? '#0f172a' : '#f8fafc' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 40 }}><h2 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 'bold', color: t.text, marginBottom: 8 }}>لماذا عقار زين؟</h2><p style={{ color: t.muted, maxWidth: 500, margin: '0 auto' }}>نقدم لك تجربة عقارية فريدة مدعومة بأحدث تقنيات الذكاء الاصطناعي</p></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {[{ icon: '🤖', title: 'تحليل AI دقيق', desc: 'تقييم ذكي للعقارات يساعدك في اتخاذ القرار الصحيح بناءً على بيانات السوق' }, { icon: '🛡️', title: 'عقارات موثقة', desc: 'جميع العقارات المعروضة موثقة ومدققة من قبل فريقنا لضمان المصداقية والأمان' }, { icon: '⚡', title: 'بحث سريع وذكي', desc: 'محرك بحث متقدم يساعدك في العثور على ما تبحث عنه في ثوانٍ معدودة' }].map(f => <Card key={f.title} dark={dark} style={{ padding: 24, textAlign: 'center' }}><div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div><h3 style={{ fontSize: 17, fontWeight: 'bold', color: t.text, marginBottom: 8 }}>{f.title}</h3><p style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>{f.desc}</p></Card>)}
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section style={{ padding: isMobile ? '40px 16px' : '60px 20px' }}>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}><h2 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 'bold', color: t.text }}>🏘️ عقارات مميزة</h2><Button variant="ghost" onClick={() => onNavigate('listings')}>عرض الكل →</Button></div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '100%' : '320px'}, 1fr))`, gap: 16 }}>
              {featured.map((l: any) => (
                <Card key={l.id} dark={dark} onClick={() => onNavigate(`listing/${l.id}`)}>
                  <div style={{ position: 'relative' }}><img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} alt={l.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} /><div style={{ position: 'absolute', top: 10, left: 10 }}><Badge color={l.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6'}>{l.transaction_type === 'sell' ? 'بيع' : 'إيجار'}</Badge></div>{l.ai_score && <Badge color={l.ai_score >= 80 ? '#10B981' : '#F59E0B'} style={{ position: 'absolute', top: 10, right: 10 }}>🤖 {l.ai_score}</Badge>}</div>
                  <div style={{ padding: 16 }}><h3 style={{ fontSize: 15, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>{l.title}</h3><p style={{ fontSize: 12, color: t.muted, marginBottom: 10 }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 20, fontWeight: 'bold', color: gold }}>{l.price?.toLocaleString("ar-EG")} ج.م</span><span style={{ fontSize: 11, color: t.muted }}>{l.area} م²</span></div></div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section style={{ padding: isMobile ? '40px 16px' : '60px 20px', background: dark ? '#1e293b' : '#0f172a' }}>
        <Container><div style={{ textAlign: 'center' }}><h2 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 'bold', color: 'white', marginBottom: 12 }}>هل أنت وسيط عقاري؟</h2><p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>انضم إلى منصتنا وابدأ في عرض عقاراتك لملايين الباحثين. احصل على تحليلات AI مجانية لعقاراتك وأدوات احترافية لإدارة أعمالك.</p><Button variant="primary" onClick={() => onNavigate('register')}>🚀 سجل الآن مجاناً</Button></div></Container>
      </section>
    </div>
  );
}

function ListingsPage({ onNavigate, dark }: any) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterTrans, setFilterTrans] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterScore, setFilterScore] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const t = themeFn(dark);

  useEffect(() => { fetch('/api/listings').then(r => r.json()).then(d => { setListings(d.data || []); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const cities = [...new Set(listings.map(l => l.district?.city_ar).filter(Boolean))] as string[];
  const propertyTypes = [...new Set(listings.map(l => l.property_type).filter(Boolean))] as string[];

  const filtered = listings
    .filter(l => filterType === 'all' ? true : l.property_type === filterType)
    .filter(l => filterTrans === 'all' ? true : l.transaction_type === filterTrans)
    .filter(l => filterCity === 'all' ? true : l.district?.city_ar === filterCity)
    .filter(l => filterScore === 'all' ? true : filterScore === 'high' ? l.ai_score >= 80 : filterScore === 'medium' ? (l.ai_score >= 60 && l.ai_score < 80) : l.ai_score < 60)
    .filter(l => search ? l.title?.includes(search) || l.district?.name_ar?.includes(search) || l.district?.city_ar?.includes(search) : true)
    .sort((a, b) => { if (sort === 'price_asc') return a.price - b.price; if (sort === 'price_desc') return b.price - a.price; if (sort === 'ai_score') return (b.ai_score || 0) - (a.ai_score || 0); if (sort === 'most_viewed') return (b.views || 0) - (a.views || 0); return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); });

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: isMobile ? '16px 10px' : '24px 16px' }}>
      <Container>
        <div style={{ marginBottom: 20 }}><h1 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 'bold', color: t.text, marginBottom: 4 }}>جميع العقارات</h1><p style={{ color: t.muted, fontSize: 14 }}>{filtered.length} عقار من {listings.length}</p></div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <Select dark={dark} value={filterType} onChange={(e: any) => setFilterType(e.target.value)} options={[{ value: 'all', label: 'كل الأنواع' }, ...propertyTypes.map(t => ({ value: t, label: t }))]} />
          <Select dark={dark} value={filterTrans} onChange={(e: any) => setFilterTrans(e.target.value)} options={[{ value: 'all', label: 'بيع + إيجار' }, { value: 'sell', label: 'بيع' }, { value: 'rent', label: 'إيجار' }]} />
          {cities.length > 0 && <Select dark={dark} value={filterCity} onChange={(e: any) => setFilterCity(e.target.value)} options={[{ value: 'all', label: 'كل المدن' }, ...cities.map(c => ({ value: c, label: c }))]} />}
          <Select dark={dark} value={filterScore} onChange={(e: any) => setFilterScore(e.target.value)} options={[{ value: 'all', label: 'كل التقييمات' }, { value: 'high', label: '🤖 ممتاز (80+)' }, { value: 'medium', label: '🤖 جيد (60-79)' }, { value: 'low', label: '🤖 ضعيف (<60)' }]} />
          <Select dark={dark} value={sort} onChange={(e: any) => setSort(e.target.value)} options={[{ value: 'latest', label: 'الأحدث' }, { value: 'ai_score', label: 'AI Score' }, { value: 'price_asc', label: 'السعر ↑' }, { value: 'price_desc', label: 'السعر ↓' }, { value: 'most_viewed', label: 'الأكثر مشاهدة' }]} />
          <div style={{ display: 'flex', gap: 1 }}><button onClick={() => setViewMode('grid')} style={{ padding: '8px 12px', borderRadius: '0 10px 10px 0', border: `1px solid ${t.border}`, background: viewMode === 'grid' ? gold : t.bg, color: viewMode === 'grid' ? 'white' : t.muted, cursor: 'pointer' }}>▦</button><button onClick={() => setViewMode('list')} style={{ padding: '8px 12px', borderRadius: '10px 0 0 10px', border: `1px solid ${t.border}`, background: viewMode === 'list' ? gold : t.bg, color: viewMode === 'list' ? 'white' : t.muted, cursor: 'pointer' }}>☰</button></div>
          <Input dark={dark} placeholder="🔍 بحث..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ width: isMobile ? '100%' : 180 }} />
        </div>

        {loading ? <LoadingSpinner /> : filtered.length === 0 ? <EmptyState icon="🔍" title="لا توجد نتائج" description="جرب تغيير الفلاتر أو البحث" /> : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '100%' : '300px'}, 1fr))`, gap: 14 }}>
            {filtered.map(l => (
              <Card key={l.id} dark={dark} onClick={() => onNavigate(`listing/${l.id}`)}>
                <div style={{ position: 'relative' }}><img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} alt={l.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} /><Badge color={l.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6'} style={{ position: 'absolute', top: 10, left: 10 }}>{l.transaction_type === 'sell' ? 'بيع' : 'إيجار'}</Badge>{l.ai_score && <Badge color={l.ai_score >= 80 ? '#10B981' : '#F59E0B'} style={{ position: 'absolute', top: 10, right: 10 }}>🤖 {l.ai_score}</Badge>}</div>
                <div style={{ padding: 14 }}><h3 style={{ fontSize: 14, fontWeight: 'bold', color: t.text, marginBottom: 6 }}>{l.title}</h3><p style={{ fontSize: 11, color: t.muted, marginBottom: 10 }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p><div style={{ display: 'flex', gap: 10, fontSize: 11, color: t.muted, marginBottom: 10 }}>{l.rooms > 0 && <span>🛏 {l.rooms}</span>}{l.bathrooms > 0 && <span>🚿 {l.bathrooms}</span>}<span>📐 {l.area} م²</span></div><div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 18, fontWeight: 'bold', color: gold }}>{l.price?.toLocaleString("ar-EG")} ج.م</span><span style={{ fontSize: 10, color: t.muted }}>{l.transaction_type === 'rent' ? '/شهر' : ''}</span></div></div>
              </Card>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(l => (
              <Card key={l.id} dark={dark} onClick={() => onNavigate(`listing/${l.id}`)} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                <img src={l.images?.[0] || 'https://via.placeholder.com/200x150'} alt={l.title} style={{ width: isMobile ? '100%' : 200, height: isMobile ? 160 : 150, objectFit: 'cover' }} />
                <div style={{ padding: 14, flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}><h3 style={{ fontSize: 15, fontWeight: 'bold', color: t.text, marginBottom: 4 }}>{l.title}</h3>{l.ai_score && <Badge color={l.ai_score >= 80 ? '#10B981' : '#F59E0B'}>🤖 {l.ai_score}</Badge>}</div><p style={{ fontSize: 12, color: t.muted }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p><div style={{ display: 'flex', gap: 12, fontSize: 12, color: t.muted, marginTop: 6 }}>{l.rooms > 0 && <span>🛏 {l.rooms} غرف</span>}{l.bathrooms > 0 && <span>🚿 {l.bathrooms} حمام</span>}<span>📐 {l.area} م²</span></div><div style={{ marginTop: 10 }}><span style={{ fontSize: 18, fontWeight: 'bold', color: gold }}>{l.price?.toLocaleString("ar-EG")} ج.م</span><span style={{ fontSize: 11, color: t.muted, marginRight: 8 }}>{l.transaction_type === 'rent' ? '/شهر' : ''}</span></div></div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

function ListingDetailPage({ id, onNavigate, dark }: any) {
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const t = themeFn(dark);

  useEffect(() => { fetch(`/api/listings/${id}`).then(r => r.json()).then(d => { setListing(d.data); setLoading(false); }).catch(() => setLoading(false)); }, [id]);
  if (loading) return <LoadingSpinner />;
  if (!listing) return <EmptyState icon="❌" title="العقار غير موجود" action={{ label: 'العودة للعقارات', onClick: () => onNavigate('listings') }} />;

  const broker = listing.broker || {};
  const district = listing.district || {};
  const aiScore = listing.ai_score;

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: isMobile ? '10px' : '20px' }}>
      <Container>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, fontSize: 13, color: t.muted }}><span onClick={() => onNavigate('home')} style={{ cursor: 'pointer', color: gold }}>الرئيسية</span><span>›</span><span onClick={() => onNavigate('listings')} style={{ cursor: 'pointer', color: gold }}>العقارات</span><span>›</span><span style={{ color: t.text }}>{listing.title?.slice(0, 40)}...</span></div>

        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
          <img src={listing.images?.[0] || 'https://via.placeholder.com/1000x500'} alt={listing.title} style={{ width: '100%', height: isMobile ? 250 : 450, objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}><Badge color={listing.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6'}>{listing.transaction_type === 'sell' ? 'للبيع' : 'للإيجار'}</Badge><Badge color="rgba(0,0,0,0.6)">{listing.property_type}</Badge>{listing.is_featured && <Badge color={gold}>⭐ مميز</Badge>}</div>
          {aiScore && <div style={{ position: 'absolute', top: 16, right: 16, background: aiScore >= 80 ? '#10B981' : '#F59E0B', color: 'white', borderRadius: 16, padding: '12px 18px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}><div style={{ fontSize: 10, opacity: 0.9 }}>🤖 AI Score</div><div style={{ fontSize: 30, fontWeight: 'bold' }}>{aiScore}</div><div style={{ fontSize: 10, opacity: 0.9 }}>{aiScore >= 80 ? 'ممتاز' : 'جيد'}</div></div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: 24 }}>
          <div>
            <h1 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 'bold', color: t.text, marginBottom: 8 }}>{listing.title}</h1>
            <p style={{ color: t.muted, fontSize: 15, marginBottom: 20 }}>📍 {district.name_ar}، {district.city_ar}{listing.street ? ` - ${listing.street}` : ''}</p>
            <div style={{ background: dark ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'linear-gradient(135deg, #fef3c7, #fffbeb)', borderRadius: 16, padding: 20, marginBottom: 24, border: `1px solid ${dark ? '#334155' : '#fde68a'}` }}><div style={{ fontSize: 13, color: t.muted, marginBottom: 4 }}>{listing.transaction_type === 'rent' ? 'الإيجار الشهري' : 'سعر البيع'}</div><div style={{ fontSize: isMobile ? 28 : 38, fontWeight: 'bold', color: gold }}>{listing.price?.toLocaleString("ar-EG")} ج.م{listing.transaction_type === 'rent' && <span style={{ fontSize: 16, color: t.muted }}> /شهر</span>}</div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10, marginBottom: 24 }}>
              {[{ icon: '🛏', label: 'غرف', value: listing.rooms }, { icon: '🚿', label: 'حمامات', value: listing.bathrooms }, { icon: '📐', label: 'المساحة', value: `${listing.area} م²` }, { icon: '🏢', label: 'الطابق', value: listing.floor || '-' }, { icon: '✨', label: 'التشطيب', value: listing.finishing_type || '-' }, { icon: '👁', label: 'مشاهدات', value: listing.views || 0 }].filter(s => s.value && s.value !== '-').map(s => <Card key={s.label} dark={dark} style={{ padding: 14, textAlign: 'center' }}><div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: 15, fontWeight: 'bold', color: t.text }}>{s.value}</div><div style={{ fontSize: 10, color: t.muted }}>{s.label}</div></Card>)}
            </div>
            {listing.description && <div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 18, fontWeight: 'bold', color: t.text, marginBottom: 12 }}>📝 الوصف</h2><Card dark={dark} style={{ padding: 20 }}><p style={{ color: t.text, lineHeight: 2, fontSize: 14, margin: 0, whiteSpace: 'pre-line' }}>{listing.description}</p></Card></div>}
          </div>

          <div>
            <div style={{ position: 'sticky', top: 80 }}>
              {broker.name && <Card dark={dark} style={{ padding: 24, textAlign: 'center', marginBottom: 16 }}><div style={{ width: 70, height: 70, borderRadius: '50%', background: `linear-gradient(135deg, ${gold}, ${goldDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', fontSize: 28, fontWeight: 'bold' }}>{broker.name?.charAt(0) || 'و'}</div><h3 style={{ color: t.text, marginBottom: 4 }}>{broker.name}</h3><div style={{ color: gold, fontSize: 14, marginBottom: 12 }}>{'⭐'.repeat(Math.round(broker.rating || 0))} {broker.rating}</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><Button variant="primary" fullWidth onClick={() => window.open(`tel:${broker.phone}`)}>📞 {broker.phone}</Button><Button variant="whatsapp" fullWidth onClick={() => window.open(`https://wa.me/2${broker.phone?.replace(/[^0-9]/g, '')}`)}>💬 واتساب</Button></div></Card>}
              {aiScore && <Card dark={dark} style={{ padding: 20, textAlign: 'center' }}><h3 style={{ color: t.text, marginBottom: 12 }}>🤖 تحليل AI</h3><div style={{ width: 80, height: 80, borderRadius: '50%', border: `5px solid ${aiScore >= 80 ? '#10B981' : '#F59E0B'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 26, fontWeight: 'bold', color: aiScore >= 80 ? '#10B981' : '#F59E0B' }}>{aiScore}</div><p style={{ fontSize: 13, color: t.muted }}>{aiScore >= 80 ? '✨ صفقة ممتازة!' : aiScore >= 60 ? '👍 سعر عادل' : '⚠️ أعلى من المتوسط'}</p></Card>}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function LoginPage({ onNavigate, dark }: any) {
  const [email, setEmail] = useState('hassan@aqarzain.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const isMobile = useMediaQuery('(max-width: 480px)');
  const t = themeFn(dark);

  return (
    <div style={{ maxWidth: 420, margin: isMobile ? '20px 10px' : '60px auto', padding: isMobile ? 0 : 20 }}>
      <Card dark={dark} style={{ padding: isMobile ? 24 : 32 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}><div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${gold}, ${goldDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', fontSize: 24, fontWeight: 'bold' }}>ز</div><h1 style={{ fontSize: 22, fontWeight: 'bold', color: t.text }}>تسجيل الدخول</h1></div>
        {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: 10, borderRadius: 10, marginBottom: 16, fontSize: 13 }}>{error}</div>}
        <Input dark={dark} type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <div style={{ height: 12 }} />
        <Input dark={dark} type="password" placeholder="كلمة المرور" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <div style={{ height: 16 }} />
        <Button variant="primary" fullWidth onClick={async () => { setError(''); const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }); const d = await r.json(); const tok = d.data?.access_token || d.token; tok ? (localStorage.setItem('token', tok), onNavigate('dashboard')) : setError(d.message || 'خطأ'); }}>🚀 دخول</Button>
        <p style={{ textAlign: 'center', marginTop: 16, color: t.muted, fontSize: 13 }}>ليس لديك حساب؟ <span onClick={() => onNavigate('register')} style={{ color: gold, cursor: 'pointer', fontWeight: 600 }}>إنشاء حساب</span></p>
      </Card>
    </div>
  );
}

function RegisterPage({ onNavigate, dark }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isMobile = useMediaQuery('(max-width: 480px)');
  const t = themeFn(dark);

  return (
    <div style={{ maxWidth: 420, margin: isMobile ? '20px 10px' : '60px auto', padding: isMobile ? 0 : 20 }}>
      <Card dark={dark} style={{ padding: isMobile ? 24 : 32 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}><h1 style={{ fontSize: 22, fontWeight: 'bold', color: t.text }}>إنشاء حساب</h1></div>
        {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: 10, borderRadius: 10, marginBottom: 16, fontSize: 13 }}>{error}</div>}
        {[{ p: 'الاسم', v: name, s: setName }, { p: 'البريد', v: email, s: setEmail }, { p: 'الهاتف', v: phone, s: setPhone }, { p: 'كلمة المرور', v: password, s: setPassword }].map(f => <div key={f.p}><Input dark={dark} placeholder={f.p} value={f.v} onChange={(e: any) => f.s(e.target.value)} type={f.p === 'البريد' ? 'email' : f.p === 'كلمة المرور' ? 'password' : 'text'} /><div style={{ height: 10 }} /></div>)}
        <Button variant="primary" fullWidth onClick={async () => { setError(''); const r = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, password, password_confirmation: password, role: 'broker' }) }); const d = await r.json(); d.success ? (alert('✅ تم'), onNavigate('login')) : setError(d.message || 'خطأ'); }}>🚀 إنشاء حساب</Button>
        <p style={{ textAlign: 'center', marginTop: 16, color: t.muted, fontSize: 13 }}>لديك حساب؟ <span onClick={() => onNavigate('login')} style={{ color: gold, cursor: 'pointer', fontWeight: 600 }}>دخول</span></p>
      </Card>
    </div>
  );
}

function DashboardPage({ onNavigate, dark }: any) {
  const [user, setUser] = useState<any>(null);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const t = themeFn(dark);

  useEffect(() => { const tok = localStorage.getItem('token'); if (!tok) { onNavigate('login'); return; } const h = { 'Authorization': `Bearer ${tok}` }; fetch('/api/me', { headers: h }).then(r => r.json()).then(d => setUser(d.data || d)).catch(() => onNavigate('login')); fetch('/api/listings', { headers: h }).then(r => r.json()).then(d => setMyListings(d.data || [])); fetch('/api/wallet/balance', { headers: h }).then(r => r.json()).then(d => setWallet(d.data?.wallet || d)); }, []);

  return (
    <div style={{ background: t.bg, minHeight: '100vh', padding: isMobile ? '16px 10px' : '24px 16px' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}><div><h1 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 'bold', color: t.text }}>👋 مرحباً، {user?.name || 'وسيط'}</h1></div><Button variant="danger" onClick={() => { localStorage.removeItem('token'); onNavigate('home'); }}>تسجيل الخروج</Button></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 30 }}>
          <StatCard dark={dark} icon="🏠" value={myListings.length} label="عقاراتي" color={gold} />
          <StatCard dark={dark} icon="💰" value={wallet?.balance || 0} label="رصيدي" color="#10B981" />
          <StatCard dark={dark} icon="⭐" value={user?.rating || 0} label="التقييم" color="#8B5CF6" />
          <StatCard dark={dark} icon="👁" value={myListings.reduce((s: number, l: any) => s + (l.views || 0), 0)} label="مشاهدات" color="#3B82F6" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 'bold', color: t.text, marginBottom: 14 }}>🏘️ عقاراتي</h2>
        {myListings.length === 0 ? <EmptyState icon="🏠" title="لا توجد عقارات" description="ابدأ بإضافة أول عقار لك" /> : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '100%' : '280px'}, 1fr))`, gap: 12 }}>
            {myListings.map(l => <Card key={l.id} dark={dark}><img src={l.images?.[0] || 'https://via.placeholder.com/400x200'} alt={l.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} /><div style={{ padding: 14 }}><h3 style={{ fontSize: 13, fontWeight: 'bold', color: t.text, marginBottom: 4 }}>{l.title}</h3><p style={{ fontSize: 16, fontWeight: 'bold', color: gold, marginBottom: 8 }}>{l.price?.toLocaleString("ar-EG")} ج.م</p><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Badge color={l.status === 'active' ? '#10B981' : '#64748b'}>{l.status === 'active' ? 'نشط' : l.status}</Badge>{l.is_featured && <Badge color={gold}>⭐ مميز</Badge>}{l.ai_score && <Badge color={l.ai_score >= 80 ? '#10B981' : '#F59E0B'}>🤖 {l.ai_score}</Badge>}</div></div></Card>)}
          </div>
        )}
      </Container>
    </div>
  );
}

function AppRouter() {
  const [page, setPage] = useState('home');
  const [listingId, setListingId] = useState('');
  const { dark, toggle } = useDarkMode();

  const navigate = (target: string) => {
    if (target.startsWith('listing/')) { setListingId(target.replace('listing/', '')); setPage('listing-detail'); }
    else setPage(target);
    window.scrollTo(0, 0);
  };

  const showFooter = !['login', 'register', 'dashboard'].includes(page);

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#0f172a' : '#f8fafc', color: dark ? '#f1f5f9' : '#0f172a', fontFamily: "'Tajawal', sans-serif" }}>
      {!['login', 'register'].includes(page) && <Navbar currentPage={page} onNavigate={navigate} dark={dark} toggleDark={toggle} />}
      {page === 'home' && <HomePage onNavigate={navigate} dark={dark} />}
      {page === 'listings' && <ListingsPage onNavigate={navigate} dark={dark} />}
      {page === 'search' && <ListingsPage onNavigate={navigate} dark={dark} />}
      {page === 'listing-detail' && <ListingDetailPage id={listingId} onNavigate={navigate} dark={dark} />}
      {page === 'login' && <LoginPage onNavigate={navigate} dark={dark} />}
      {page === 'register' && <RegisterPage onNavigate={navigate} dark={dark} />}
      {page === 'dashboard' && <DashboardPage onNavigate={navigate} dark={dark} />}
      {showFooter && <Footer dark={dark} />}
    </div>
  );
}

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
);
