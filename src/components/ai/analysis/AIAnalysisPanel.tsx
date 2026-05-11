import { AIScoreRing } from '@/components/ai/scores/AIScoreRing';
import { MarketStatusCard } from '@/components/ai/analysis/MarketStatusCard';
import { cn } from '@/utils/helpers';
import { Sparkles, TrendingUp, MapPin, Home } from 'lucide-react';
import { formatPriceCompact, formatArea } from '@/utils/formatters';
import type { Listing } from '@/types/api/listing.types';

interface AIAnalysisPanelProps {
  listing: Listing;
  className?: string;
}

export const AIAnalysisPanel = ({ listing, className }: AIAnalysisPanelProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center ai-glow">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">تحليل AI للعقار</h3>
          <p className="text-sm text-slate-500">تحليل شامل بمساعدة الذكاء الاصطناعي</p>
        </div>
      </div>

      {/* Score + Market Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 flex flex-col items-center justify-center">
          <AIScoreRing score={listing.ai_score} size="xl" />
          <p className="text-sm text-slate-500 mt-4 text-center">
            تقييم شامل يعتمد على السعر، الموقع، المساحة، وحالة السوق
          </p>
        </div>
        
        <MarketStatusCard
          status={listing.market_status}
          actualPrice={listing.price}
          fairPrice={listing.fair_price}
          priceDifferencePercentage={
            ((listing.price - listing.fair_price) / listing.fair_price) * 100
          }
          sellProbability={listing.sell_probability}
          expectedDaysOnMarket={listing.expected_days_on_market}
        />
      </div>

      {/* Quick AI Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">سعر المتر</div>
            <div className="font-bold text-slate-900 dark:text-white">
              {formatPriceCompact(listing.price_per_meter)}
            </div>
            <div className="text-xs text-slate-400">للمتر المربع</div>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">مقارنة بالمنطقة</div>
            <div className="font-bold text-slate-900 dark:text-white">
              {listing.price_per_meter > 0 ? 'متوسط المنطقة' : 'غير متوفر'}
            </div>
            <div className="text-xs text-slate-400">تحليل AI</div>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs text-slate-500">الموقع</div>
            <div className="font-bold text-slate-900 dark:text-white">
              {listing.district}
            </div>
            <div className="text-xs text-slate-400">{listing.city}</div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {listing.ai_recommendations && listing.ai_recommendations.length > 0 && (
        <div className="card p-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            توصيات AI
          </h4>
          <ul className="space-y-3">
            {listing.ai_recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-600">{index + 1}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
