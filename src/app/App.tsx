import { useState, useEffect, useCallback } from 'react';
import { Skeleton, PropertyListSkeleton } from '../components/Skeleton';
import { ToastContainer, toast } from '../components/Toast';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';

// =============================================
// Hooks
// =============================================
function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');
  useEffect(() => {
    localStorage.setItem('darkMode', String(dark));
    document.documentElement.style.background = dark ? '#0f172a' : '#f9fafb';
    document.documentElement.style.color = dark ? '#f1f5f9' : '#111827';
  }, [dark]);
  return { dark, toggle: () => setDark(!dark) };
}

// =============================================
// Navbar
// =============================================
function Navbar({ currentPage, onNavigate, dark, toggleDark }: any) {
  const theme = { bg: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };
  const favCount = JSON.parse(localStorage.getItem('favorites') || '[]').length;

  return (
    <nav style={{ background: theme.bg, borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #D4AF37, #C5A028)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: 15 }}>ز</div>
            <span style={{ fontWeight: 'bold', fontSize: 18, color: theme.text }}>عقار زين</span>
          </div>
          <button onClick={() => onNavigate('listings')} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 13, background: currentPage === 'listings' ? '#D4AF37' : 'transparent', color: currentPage === 'listings' ? 'white' : theme.muted }}>🏘️ العقارات</button>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button onClick={() => onNavigate('favorites')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, position: 'relative' }}>
            ❤️ {favCount > 0 && <span style={{ position: 'absolute', top: -4, right: -8, background: '#EF4444', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{favCount}</span>}
          </button>
          <button onClick={toggleDark} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>{dark ? '☀️' : '🌙'}</button>
          <button onClick={() => onNavigate('login')} style={{ padding: '6px 14px', borderRadius: 10, border: '2px solid #D4AF37', background: 'transparent', color: '#D4AF37', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}>دخول</button>
        </div>
      </div>
    </nav>
  );
}

// =============================================
// HomePage
// =============================================
function HomePage({ onNavigate, dark }: any) {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = { text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => {
    fetch('https://kenneth-italic-sql-lamb.trycloudflare.com/api/listings?featured=1&limit=6')
      .then(r => r.json()).then(d => { setFeatured(d.data || []); setLoading(false); })
      .catch(() => { setLoading(false); toast.error('فشل تحميل العقارات'); });
  }, []);

  return (
    <div>
      <div style={{ background: dark ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'linear-gradient(135deg, #fef3c7, #fff)', padding: '60px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 800, margin: '0 0 12px', color: theme.text, animation: 'fadeIn 0.6s ease' }}>
          ابحث عن <span style={{ color: '#D4AF37' }}>عقار أحلامك</span> بذكاء
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: theme.muted, maxWidth: 600, margin: '0 auto 24px' }}>
          نساعدك في العثور على أفضل العقارات باستخدام تقنيات الذكاء الاصطناعي
        </p>
        <button onClick={() => onNavigate('listings')} style={{ padding: '12px 32px', borderRadius: 14, border: 'none', background: '#D4AF37', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 'clamp(14px, 2vw, 18px)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          تصفح العقارات ←
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 12px' }}>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold', marginBottom: 24, color: theme.text }}>🏠 عقارات مميزة</h2>
        {loading ? <PropertyListSkeleton count={6} /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {featured.map((l: any) => (
              <div key={l.id} onClick={() => onNavigate(`listing/${l.id}`)} style={{ background: dark ? '#1e293b' : 'white', borderRadius: 14, border: `1px solid ${dark ? '#334155' : '#e5e7eb'}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'relative' }}>
                  <img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} alt={l.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 20, background: l.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6', color: 'white', fontSize: 11, fontWeight: 600 }}>{l.transaction_type === 'sell' ? 'بيع' : 'إيجار'}</span>
                  {l.ai_score && <span style={{ position: 'absolute', top: 8, right: 8, padding: '3px 10px', borderRadius: 20, background: l.ai_score >= 80 ? '#10B981' : '#F59E0B', color: 'white', fontSize: 11, fontWeight: 600 }}>🤖 {l.ai_score}</span>}
                </div>
                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: '0 0 6px', color: theme.text, fontSize: 14 }}>{l.title}</h3>
                  <p style={{ color: theme.muted, fontSize: 12, margin: '0 0 10px' }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 18 }}>{l.price?.toLocaleString('ar-EG')} ج.م</span>
                    <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                      <FavoriteButton listingId={l.id} />
                      <ShareButton title={l.title} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// ListingsPage
// =============================================
function ListingsPage({ onNavigate, dark }: any) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTrans, setFilterTrans] = useState('all');
  const [search, setSearch] = useState('');
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => {
    fetch('https://kenneth-italic-sql-lamb.trycloudflare.com/api/listings')
      .then(r => r.json()).then(d => { setListings(d.data || []); setLoading(false); })
      .catch(() => { setLoading(false); toast.error('فشل تحميل العقارات'); });
  }, []);

  const filtered = listings.filter(l => filterTrans === 'all' ? true : l.transaction_type === filterTrans).filter(l => search ? l.title?.includes(search) : true);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 12px', background: theme.bg, minHeight: '100vh' }}>
      <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 'bold', marginBottom: 8, color: theme.text }}>جميع العقارات ({filtered.length})</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <select value={filterTrans} onChange={e => setFilterTrans(e.target.value)} style={{ padding: '8px 14px', borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 13 }}>
          <option value="all">الكل</option>
          <option value="sell">بيع</option>
          <option value="rent">إيجار</option>
        </select>
        <input type="text" placeholder="🔍 بحث..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px 14px', borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 13, flex: 1, minWidth: 150 }} />
      </div>

      {loading ? <PropertyListSkeleton count={6} /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map(l => (
            <div key={l.id} onClick={() => onNavigate(`listing/${l.id}`)} style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'relative' }}>
                <img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} alt={l.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 20, background: l.transaction_type === 'sell' ? '#EC4899' : '#8B5CF6', color: 'white', fontSize: 11, fontWeight: 600 }}>{l.transaction_type === 'sell' ? 'بيع' : 'إيجار'}</span>
                {l.ai_score && <span style={{ position: 'absolute', top: 8, right: 8, padding: '3px 10px', borderRadius: 20, background: l.ai_score >= 80 ? '#10B981' : '#F59E0B', color: 'white', fontSize: 11, fontWeight: 600 }}>🤖 {l.ai_score}</span>}
              </div>
              <div style={{ padding: 14 }}>
                <h3 style={{ margin: '0 0 4px', color: theme.text, fontSize: 14 }}>{l.title}</h3>
                <p style={{ color: theme.muted, fontSize: 11, margin: '0 0 8px' }}>📍 {l.district?.name_ar}، {l.district?.city_ar}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 18 }}>{l.price?.toLocaleString('ar-EG')} ج.م</span>
                  <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                    <FavoriteButton listingId={l.id} />
                    <ShareButton title={l.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// Favorites Page
// =============================================
function FavoritesPage({ onNavigate, dark }: any) {
  const [favIds] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', text: dark ? '#f1f5f9' : '#111827' };

  useEffect(() => {
    fetch('https://kenneth-italic-sql-lamb.trycloudflare.com/api/listings')
      .then(r => r.json()).then(d => {
        setListings((d.data || []).filter((l: any) => favIds.includes(l.id)));
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 12px', background: theme.bg, minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 20 }}>❤️ المفضلة ({favIds.length})</h1>
      {loading ? <PropertyListSkeleton count={3} /> : listings.length === 0 ? <p style={{ color: theme.text }}>لا توجد عقارات مفضلة</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {listings.map(l => (
            <div key={l.id} onClick={() => onNavigate(`listing/${l.id}`)} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}>
              <img src={l.images?.[0] || 'https://via.placeholder.com/400x250'} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 14 }}>
                <h3 style={{ fontSize: 14 }}>{l.title}</h3>
                <p style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 18 }}>{l.price?.toLocaleString('ar-EG')} ج.م</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// ListingDetailPage
// =============================================
function ListingDetailPage({ id, onNavigate, dark }: any) {
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const theme = { bg: dark ? '#0f172a' : '#f9fafb', card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb', text: dark ? '#f1f5f9' : '#111827', muted: dark ? '#94a3b8' : '#6b7280' };

  useEffect(() => {
    fetch(`https://kenneth-italic-sql-lamb.trycloudflare.com/api/listings/${id}`)
      .then(r => r.json()).then(d => { setListing(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><PropertyListSkeleton count={1} /></div>;
  if (!listing) return <div style={{ padding: 60, textAlign: 'center', color: '#EF4444' }}>❌ العقار غير موجود</div>;

  const broker = listing.broker || {};
  const district = listing.district || {};

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 12px', background: theme.bg }}>
      <button onClick={() => onNavigate('listings')} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', marginBottom: 12, fontSize: 16 }}>← العودة</button>
      <img src={listing.images?.[0] || 'https://via.placeholder.com/800x400'} style={{ width: '100%', height: 'clamp(200px, 40vw, 400px)', objectFit: 'cover', borderRadius: 14, marginBottom: 20 }} />
      
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <FavoriteButton listingId={listing.id} size={24} />
        <ShareButton title={listing.title} size={22} />
      </div>

      <h1 style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>{listing.title}</h1>
      <p style={{ color: theme.muted, marginBottom: 16 }}>📍 {district.name_ar}، {district.city_ar}</p>
      <h2 style={{ color: '#D4AF37', fontSize: 'clamp(20px, 4vw, 32px)', marginBottom: 16 }}>{listing.price?.toLocaleString('ar-EG')} ج.م</h2>

      <div style={{ display: 'flex', gap: 12, color: theme.muted, fontSize: 14, flexWrap: 'wrap', marginBottom: 16 }}>
        {listing.rooms > 0 && <span>🛏 {listing.rooms} غرف</span>}
        {listing.bathrooms > 0 && <span>🚿 {listing.bathrooms} حمام</span>}
        <span>📐 {listing.area} م²</span>
      </div>

      <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, padding: 16 }}>
        <h3 style={{ color: theme.text }}>👤 {broker.name}</h3>
        <p style={{ color: theme.muted }}>📞 {broker.phone}</p>
        <p style={{ color: '#D4AF37' }}>⭐ {broker.rating}</p>
      </div>
    </div>
  );
}

// =============================================
// Login Page
// =============================================
function LoginPage({ onNavigate, dark }: any) {
  const [email, setEmail] = useState('hassan@aqarzain.com');
  const [password, setPassword] = useState('password123');
  const theme = { text: dark ? '#f1f5f9' : '#111827', card: dark ? '#1e293b' : 'white', border: dark ? '#334155' : '#e5e7eb' };

  const handleLogin = async () => {
    const res = await fetch('https://kenneth-italic-sql-lamb.trycloudflare.com/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    const token = data.data?.access_token || data.token;
    if (token) { localStorage.setItem('token', token); toast.success('تم تسجيل الدخول'); onNavigate('dashboard'); }
    else toast.error('خطأ في تسجيل الدخول');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 16 }}>
      <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, padding: 24 }}>
        <h1 style={{ textAlign: 'center', color: theme.text, marginBottom: 20 }}>تسجيل الدخول</h1>
        <input type="email" placeholder="البريد" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, marginBottom: 12, boxSizing: 'border-box', background: dark ? '#0f172a' : '#f9fafb', color: theme.text }} />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, marginBottom: 16, boxSizing: 'border-box', background: dark ? '#0f172a' : '#f9fafb', color: theme.text }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: '#D4AF37', color: 'white', cursor: 'pointer', fontWeight: 600 }}>دخول</button>
      </div>
    </div>
  );
}

// =============================================
// App Router
// =============================================
function AppRouter() {
  const [page, setPage] = useState('home');
  const [listingId, setListingId] = useState('');
  const { dark, toggle } = useDarkMode();

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
    </div>
  );
}

export const App = () => <AppRouter />;
