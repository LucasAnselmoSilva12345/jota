import { News } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="news-card-container">
      <Image src={news.photo} width={500} height={500} alt={news.title} />
      <h3 className="">{news.title}</h3>
      <p>{news.content}</p>
      <p>{news.category}</p>

      <Link href={`/noticia/${news.id}`}>Ver Noticia</Link>
    </div>
  );
}
