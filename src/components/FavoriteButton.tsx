import React, { useState, useEffect } from 'react';
import { toast } from './Toast';

interface FavoriteButtonProps {
  listingId: string | number;
  size?: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ listingId, size = 20 }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favs.includes(listingId));
    setCount(favs.length);
  }, [listingId]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favs: (string | number)[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favs.includes(listingId)) {
      const newFavs = favs.filter(id => id !== listingId);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
      setCount(newFavs.length);
      toast.info('تمت إزالة من المفضلة');
    } else {
      favs.push(listingId);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
      setCount(favs.length);
      toast.success('تمت إضافة للمفضلة ❤️');
    }
  };

  return (
    <button onClick={toggle} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
      fontSize: size, transition: 'transform 0.2s',
      transform: isFavorite ? 'scale(1.2)' : 'scale(1)',
    }}>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export const getFavoritesCount = (): number => {
  return JSON.parse(localStorage.getItem('favorites') || '[]').length;
};
