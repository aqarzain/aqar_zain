import { useState, useEffect } from 'react';
import { ToastContainer, toast } from '../components/Toast';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';
import { PropertyListSkeleton } from '../components/Skeleton';

const API = 'https://teachers-organized-appendix-titles.trycloudflare.com/api';
const api = {
  get: (url: string) => fetch(API + url, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` } }).then(r => r.json()),
  post: (url: string, data?: any) => fetch(API + url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }, body: JSON.stringify(data) }).then(r => r.json()),
};

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');
  useEffect(() => { localStorage.setItem('darkMode', String(dark)); document.documentElement.style.background = dark ? '#0f172a' : '#f9fafb'; document.documentElement.style.color = dark ? '#f1f5f9' : '#111827'; }, [dark]);
  return { dark, toggle: () => setDark(!dark) };
}

function Navbar({ currentPage, onNavigate, dark, toggleDark }: any) {
  const theme = { bg: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };
  const favCount = JSON.parse(localStorage.getItem('favorites') || '[]').length;
  const token = localStorage.getItem('token');
  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); toast.info('تم تسجيل الخروج'); onNavigate('home'); };

  return (
    <nav style={{ background: theme.bg, borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #D4AF37, #C5A028)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: 15 }}>ز</div>
            <span style={{ fontWeight: 'bold', fontSize: 16, color: theme.text }}>عقار زين</span>
          </div>
          <button onClick={() => onNavigate('listings')} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, background: currentPage === 'listings' ? '#D4AF37' : 'transparent', color: currentPage === 'listings' ? 'white' : theme.muted }}>🏘️ العقارات</button>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <button onClick={() => onNavigate('favorites')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, position: 'relative', padding: '4px 8px' }}>
            ❤️ {favCount > 0 && <span style={{ position: 'absolute', top: -2, right: 0, background: '#EF4444', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{favCount}</span>}
          </button>
          <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}>{dark ? '☀️' : '🌙'}</button>
          {token ? (
            <>
              <button onClick={() => onNavigate('dashboard')} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, background: currentPage === 'dashboard' ? '#D4AF37' : 'transparent', color: currentPage === 'dashboard' ? 'white' : theme.muted }}>📊 لوحة التحكم</button>
              <button onClick={handleLogout} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}>خروج</button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate('login')} style={{ padding: '6px 14px', borderRadius: 10, border: '2px solid #D4AF37', background: 'transparent', color: '#D4AF37', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}>دخول</button>
              <button onClick={() => onNavigate('register')} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: '#D4AF37', color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}>حساب جديد</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function PropertyCard({ listing, onNavigate, dark }: any) {
  const theme = { card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };
  const l = listing;
  return (
    <div onClick={() => onNavigate(`listing/${l.id}`)} style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ position: 'relative' }}>
        <img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} alt={l.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4 }}>
          <span style={{ padding: '3px 10px', borderRadius: 20, background: l.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6', color: 'white', fontSize: 11, fontWeight: 600 }}>{l.transaction_type === 'sell' ? 'بيع' : 'إيجار'}</span>
          {l.is_featured && <span style={{ padding: '3px 10px', borderRadius: 20, background: '#D4AF37', color: 'white', fontSize: 11, fontWeight: 600 }}>⭐</span>}
        </div>
        {l.ai_score && <span style={{ position: 'absolute', top: 8, right: 8, padding: '3px 10px', borderRadius: 20, background: l.ai_score >= 80 ? '#10B981' : l.ai_score >= 60 ? '#F59E0B' : '#EF4444', color: 'white', fontSize: 11, fontWeight: 600 }}>🤖 {l.ai_score}</span>}
      </div>
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: '0 0 6px', color: theme.text, fontSize: 14 }}>{l.title}</h3>
        <p style={{ color: theme.muted, fontSize: 12, margin: '0 0 8px' }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: theme.muted }}>
          {l.rooms > 0 && <span>🛏 {l.rooms}</span>}
          {l.bathrooms > 0 && <span>🚿 {l.bathrooms}</span>}
          <span>📐 {l.area} م²</span>
        </div>
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 18 }}>{l.price?.toLocaleString('ar-EG')} ج.م</span>
          <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
            <FavoriteButton listingId={l.id} />
            <ShareButton title={l.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate, dark }: any) {
  const [featured, setFeatured] = useState<any[]>([]);
  const [latest, setLatest] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = { text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => {
    Promise.all([api.get('/listings?featured=1&limit=6'), api.get('/listings?limit=6')])
      .then(([f, l]) => { setFeatured(f.data || []); setLatest(l.data || []); setLoading(false); })
      .catch(() => { setLoading(false); toast.error('فشل تحميل البيانات'); });
  }, []);

  return (
    <div>
      <div style={{ background: dark ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'linear-gradient(135deg, #fef3c7, #fff)', padding: 'clamp(40px, 8vw, 80px) 16px', textAlign: 'center' }}>
        <div style={{ animation: 'fadeIn 0.8s ease' }}>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 800, margin: '0 0 12px', color: theme.text }}>ابحث عن <span style={{ color: '#D4AF37' }}>عقار أحلامك</span> بذكاء</h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: theme.muted, maxWidth: 600, margin: '0 auto 24px' }}>نساعدك في العثور على أفضل العقارات باستخدام تقنيات الذكاء الاصطناعي</p>
          <button onClick={() => onNavigate('listings')} style={{ padding: '14px 36px', borderRadius: 14, border: 'none', background: '#D4AF37', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 'clamp(14px, 2vw, 18px)' }}>تصفح العقارات ←</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40 }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 'bold', color: '#D4AF37' }}>+13</div><div style={{ color: theme.muted, fontSize: 13 }}>عقار</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 'bold', color: '#D4AF37' }}>+3</div><div style={{ color: theme.muted, fontSize: 13 }}>وسيط</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 'bold', color: '#10B981' }}>AI</div><div style={{ color: theme.muted, fontSize: 13 }}>ذكاء اصطناعي</div></div>
        </div>
      </div>
      {['⭐ عقارات مميزة', '🆕 أحدث العقارات'].map((title, idx) => (
        <div key={title} style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 12px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 24 }}>{title}</h2>
          {loading ? <PropertyListSkeleton count={3} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {(idx === 0 ? featured : latest).slice(0, 3).map((l: any) => <PropertyCard key={l.id} listing={l} onNavigate={onNavigate} dark={dark} />)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ListingsPage({ onNavigate, dark }: any) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTrans, setFilterTrans] = useState('all');
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterTrans !== 'all') params.set('transaction_type', filterTrans);
    if (sort !== 'latest') params.set('sort', sort);
    if (search) params.set('q', search);
    api.get(`/listings?${params.toString()}`).then(d => { setListings(d.data || []); setLoading(false); }).catch(() => { setLoading(false); });
  }, [filterTrans, sort, search]);

  const sel: React.CSSProperties = { padding: '8px 14px', borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 13 };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 12px', background: theme.bg, minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>جميع العقارات ({listings.length})</h1>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={filterTrans} onChange={e => setFilterTrans(e.target.value)} style={sel}><option value="all">الكل</option><option value="sell">بيع</option><option value="rent">إيجار</option></select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={sel}><option value="latest">الأحدث</option><option value="ai_score">AI Score</option><option value="price_asc">السعر ↑</option><option value="price_desc">السعر ↓</option></select>
        <input type="text" placeholder="🔍 بحث..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...sel, flex: 1, minWidth: 150 }} />
      </div>
      {loading ? <PropertyListSkeleton count={6} /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {listings.map((l: any) => <PropertyCard key={l.id} listing={l} onNavigate={onNavigate} dark={dark} />)}
        </div>
      )}
    </div>
  );
}

function ListingDetailPage({ id, onNavigate, dark }: any) {
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', card: dark ? '#1e293b' : 'white', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => { api.get(`/listings/${id}`).then(d => { setListing(d.data); setLoading(false); }).catch(() => setLoading(false)); }, [id]);
  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><PropertyListSkeleton count={1} /></div>;
  if (!listing) return <div style={{ padding: 60, textAlign: 'center', color: '#EF4444' }}>❌ العقار غير موجود</div>;

  const broker = listing.broker || {};
  const district = listing.district || {};

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 12px', background: theme.bg }}>
      <button onClick={() => onNavigate('listings')} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', marginBottom: 12 }}>← العودة</button>
      <img src={listing.images?.[0] || 'https://via.placeholder.com/800x400'} style={{ width: '100%', height: 'clamp(200px, 40vw, 400px)', objectFit: 'cover', borderRadius: 14, marginBottom: 20 }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><FavoriteButton listingId={listing.id} size={24} /><ShareButton title={listing.title} size={22} /></div>
      <h1 style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 'bold', color: theme.text }}>{listing.title}</h1>
      <p style={{ color: theme.muted }}>📍 {district.name_ar}، {district.city_ar}</p>
      <h2 style={{ color: '#D4AF37', fontSize: 'clamp(20px, 4vw, 32px)' }}>{listing.price?.toLocaleString('ar-EG')} ج.م</h2>
      <div style={{ display: 'flex', gap: 12, color: theme.muted, fontSize: 14, flexWrap: 'wrap', marginTop: 8 }}>
        {listing.rooms > 0 && <span>🛏 {listing.rooms} غرف</span>}
        {listing.bathrooms > 0 && <span>🚿 {listing.bathrooms} حمام</span>}
        <span>📐 {listing.area} م²</span>
      </div>
      <div style={{ background: theme.card, borderRadius: 14, padding: 16, marginTop: 16 }}>
        <h3 style={{ color: theme.text }}>👤 {broker.name}</h3>
        <p style={{ color: theme.muted }}>📞 {broker.phone}</p>
        <p style={{ color: '#D4AF37' }}>⭐ {broker.rating}</p>
      </div>
    </div>
  );
}

function LoginPage({ onNavigate, dark }: any) {
  const [email, setEmail] = useState('hassan@aqarzain.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const theme = { text: dark ? '#f1f5f9' : '#111827', card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb' };

  const handleLogin = async () => {
    setLoading(true);
    const data = await api.post('/auth/login', { email, password });
    if (data.success && data.data?.access_token) { localStorage.setItem('token', data.data.access_token); toast.success('تم تسجيل الدخول'); onNavigate('dashboard'); }
    else toast.error('خطأ في تسجيل الدخول');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
      <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, padding: 24 }}>
        <h1 style={{ textAlign: 'center', color: theme.text, marginBottom: 20 }}>تسجيل الدخول</h1>
        <input type="email" placeholder="البريد" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, marginBottom: 10, boxSizing: 'border-box', background: dark ? '#0f172a' : '#f9fafb', color: theme.text }} />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, marginBottom: 16, boxSizing: 'border-box', background: dark ? '#0f172a' : '#f9fafb', color: theme.text }} />
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: '#D4AF37', color: 'white', cursor: 'pointer', fontWeight: 600 }}>{loading ? '⏳ جاري...' : 'دخول'}</button>
      </div>
    </div>
  );
}

function FavoritesPage({ onNavigate, dark }: any) {
  const [favIds] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', text: dark ? '#f1f5f9' : '#111827' };
  useEffect(() => {
    if (favIds.length === 0) { setLoading(false); return; }
    api.get('/listings').then(d => { setListings((d.data || []).filter((l: any) => favIds.includes(l.id))); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 12px', background: theme.bg, minHeight: '100vh' }}>
      <h1 style={{ color: theme.text }}>❤️ المفضلة ({favIds.length})</h1>
      {loading ? <PropertyListSkeleton count={3} /> : listings.length === 0 ? <p style={{ color: theme.text }}>لا توجد عقارات مفضلة</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {listings.map((l: any) => <PropertyCard key={l.id} listing={l} onNavigate={onNavigate} dark={dark} />)}
        </div>
      )}
    </div>
  );
}

function Footer({ dark }: any) {
  return (
    <footer style={{ background: '#1e293b', padding: '24px 16px', marginTop: 40, textAlign: 'center' }}>
      <p style={{ color: '#94a3b8', fontSize: 13 }}>© 2026 عقار زين. جميع الحقوق محفوظة.</p>
    </footer>
  );
}

function AppRouter() {
  const [page, setPage] = useState('home');
  const [listingId, setListingId] = useState('');
  const { dark, toggle } = useDarkMode();
  const showFooter = !['login', 'register', 'dashboard'].includes(page);

  const navigate = (target: string) => {
    if (target.startsWith('listing/')) { setListingId(target.replace('listing/', '')); setPage('listing-detail'); }
    else setPage(target);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', background: dark ? '#0f172a' : '#f9fafb', color: dark ? '#f1f5f9' : '#111827', fontFamily: 'Tajawal, sans-serif' }}>
      <ToastContainer />
      {!['login'].includes(page) && <Navbar currentPage={page} onNavigate={navigate} dark={dark} toggleDark={toggle} />}
      {page === 'home' && <HomePage onNavigate={navigate} dark={dark} />}
      {page === 'listings' && <ListingsPage onNavigate={navigate} dark={dark} />}
      {page === 'favorites' && <FavoritesPage onNavigate={navigate} dark={dark} />}
      {page === 'listing-detail' && <ListingDetailPage id={listingId} onNavigate={navigate} dark={dark} />}
      {page === 'login' && <LoginPage onNavigate={navigate} dark={dark} />}
      {page === 'dashboard' && <LoginPage onNavigate={navigate} dark={dark} />}
      {showFooter && <Footer dark={dark} />}
    </div>
  );
}

export const App = () => <AppRouter />;
