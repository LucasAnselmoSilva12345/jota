import { News } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  news: News[];
}

export function NewsList({ news }: NewsListProps) {
  return (
    <>
      {news.map((item) => (
        <NewsCard news={item} key={item.id} />
      ))}
    </>
  );
}
