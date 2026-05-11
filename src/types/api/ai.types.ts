// =============================================
// 🤖 AI Types - AqarZain API
// =============================================

export type MarketStatus = 'bargain' | 'fair_price' | 'overpriced';
export type DemandLevel = 'very_high' | 'high' | 'medium' | 'low' | 'very_low';

export interface AIScore {
  listing_id: string;
  score: number; // 0-100
  fair_price: number;
  actual_price: number;
  price_difference_percentage: number;
  market_status: MarketStatus;
  sell_probability: number; // 0-100
  expected_days_on_market: number;
  confidence_level: number; // 0-100
}

export interface MarketAnalysis {
  district: string;
  city: string;
  average_price_per_meter: number;
  price_trend: 'up' | 'down' | 'stable';
  trend_percentage: number;
  demand_level: DemandLevel;
  average_days_on_market: number;
  total_listings: number;
  total_deals_last_month: number;
}

export interface AIRecommendation {
  id: string;
  listing_id: string;
  type: 'price_adjustment' | 'feature_highlight' | 'timing' | 'marketing';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  potential_impact: string;
  created_at: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  event?: string;
}

export interface SimilarProperty {
  id: string;
  title: string;
  price: number;
  area: number;
  main_image: string;
  ai_score: number;
  similarity_percentage: number;
}

export interface AIScoreResponse {
  data: AIScore;
}

export interface MarketAnalysisResponse {
  data: MarketAnalysis;
}

export interface AIRecommendationsResponse {
  data: AIRecommendation[];
}

export interface PriceHistoryResponse {
  data: PriceHistory[];
}

export interface SimilarPropertiesResponse {
  data: SimilarProperty[];
}
