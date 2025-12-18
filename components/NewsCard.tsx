import { News } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const excerpt = news.content.slice(0, 120) + '...';

  return (
    <article className="news-card-container">
      <Image
        src={news.photo}
        width={500}
        height={500}
        alt={news.title}
        sizes="(max-width: 768px) 100vw, 500px"
        priority={false}
      />
      <h3 className="">{news.title}</h3>
      <p>{excerpt}</p>
      <p>{news.category}</p>

      <Link href={`/noticia/${news.id}`}>Ver notícia</Link>
    </article>
  );
}
