'use client';

import { useNewsStore } from '@/store/news.store';
import { News } from '@/types/news';
import { useEffect } from 'react';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  news: News[];
}

export function NewsList({ news }: NewsListProps) {
  const setNews = useNewsStore((state) => state.setNews);

  useEffect(() => {
    setNews(news);
  }, [news, setNews]);

  return (
    <>
      {news.map((item) => (
        <NewsCard news={item} key={item.id} />
      ))}
    </>
  );
}
