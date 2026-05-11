import { StatsCard } from './StatsCard';
import { Building2, Eye, Handshake, Wallet, TrendingUp, Star, MessageCircle, Clock } from 'lucide-react';
import { formatNumber } from '@/utils/helpers';

interface BrokerStats {
  active_listings: number;
  total_deals: number;
  total_views: number;
  wallet_balance: number;
  avg_ai_score: number;
  total_favorites: number;
  new_messages: number;
  pending_deals: number;
}

export const StatsGrid = ({ stats }: { stats: BrokerStats }) => {
  const cards = [
    { title: 'عقارات نشطة', value: stats.active_listings, icon: <Building2 className="w-6 h-6 text-blue-600" />, color: 'primary' as const },
    { title: 'صفقات مكتملة', value: stats.total_deals, icon: <Handshake className="w-6 h-6 text-emerald-600" />, color: 'success' as const },
    { title: 'مشاهدات اليوم', value: formatNumber(stats.total_views), icon: <Eye className="w-6 h-6 text-purple-600" /> },
    { title: 'الرصيد', value: `${formatNumber(stats.wallet_balance)} ج.م`, icon: <Wallet className="w-6 h-6 text-amber-600" />, color: 'warning' as const },
    { title: 'متوسط AI Score', value: `${stats.avg_ai_score}/100`, icon: <TrendingUp className="w-6 h-6 text-teal-600" /> },
    { title: 'المفضلة', value: stats.total_favorites, icon: <Star className="w-6 h-6 text-pink-600" /> },
    { title: 'رسائل جديدة', value: stats.new_messages, icon: <MessageCircle className="w-6 h-6 text-indigo-600" />, color: stats.new_messages > 0 ? 'danger' : 'default' as const },
    { title: 'صفقات معلقة', value: stats.pending_deals, icon: <Clock className="w-6 h-6 text-orange-600" />, color: stats.pending_deals > 0 ? 'warning' : 'default' as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
};
