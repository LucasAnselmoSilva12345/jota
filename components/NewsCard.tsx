import { useAuthStore } from '@/store/auth.store';
import { News } from '@/types/news';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const { favorites, toggleFavorites, token } = useAuthStore();
  const isFavorited = favorites.includes(Number(news.id));

  const excerpt = news.content.slice(0, 120) + '...';

  return (
    <article className="space-y-3" data-testid="news-card">
      <div className="relative w-full h-37.5 overflow-hidden rounded">
        <Image
          src={news.photo}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {token && (
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-neutral-700/60 hover:bg-neutral-700/80 transition"
            onClick={() => toggleFavorites(Number(news.id))}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar'}
          >
            <Heart
              className={`h-5 w-5 transition ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold text-neutral-800 line-clamp-1">
        {news.title}
      </h2>
      <p className="text-sm font-normal text-neutral-500">{excerpt}</p>

      <Link
        className="bg-emerald-500 text-white py-1 font-bold text-base block w-full text-center rounded"
        href={`/noticia/${news.id}`}
      >
        Ver notícia
      </Link>
    </article>
  );
}
