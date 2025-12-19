import { News } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  news: News[];
}

export function NewsList({ news }: NewsListProps) {
  const feature = news.slice(0, 4);
  const rest = news.slice(4);

  return (
    <section className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {feature.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rest.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}
