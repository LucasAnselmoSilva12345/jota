import { Header } from '@/components/Header';
import { getNewsById } from '@/service/news.service';
import { useAuthStore } from '@/store/auth.store';
import { News } from '@/types/news';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

interface NewsPageProps {
  news: News | null;
}

export default function NewsPage({ news }: NewsPageProps) {
  const { favorites, toggleFavorites, token } = useAuthStore();
  const isFavorited = favorites.includes(Number(news?.id));

  if (!news) {
    return <h1>Notícia não encontrada</h1>;
  }

  return (
    <div className="w-full p-4 lg:max-w-325 lg:mx-auto lg:my-0">
      <Head>
        <title>{news.title} | JOTA News</title>
        <meta name="description" content={news.content.slice(0, 150)} />
      </Head>

      <Header />
      <main>
        <section>
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
                  className="absolute top-0 right-0 p-1"
                  onClick={() => toggleFavorites(Number(news.id))}
                  aria-label="Favoritar"
                >
                  {isFavorited ? 'Remover dos favorito' : 'Favoritar'}
                </button>
              )}
            </div>

            <h2 className="text-xl font-bold text-neutral-800">{news.title}</h2>

            <span className="block text-xs font-normal text-neutral-500">
              {news.category}
            </span>

            <p className="text-sm font-normal text-neutral-700">
              {news.content}
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<NewsPageProps> = async ({
  params,
}) => {
  try {
    const news = await getNewsById(params!.id as string);

    return { props: { news } };
  } catch {
    return { props: { news: null } };
  }
};
