import { Header } from '@/components/Header';
import { NewsList } from '@/components/NewsList';
import { getNews } from '@/service/news.service';
import { useAuthStore } from '@/store/auth.store';
import { News } from '@/types/news';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AdminProps {
  news: News[];
}

export default function Admin({ news }: AdminProps) {
  const router = useRouter();
  const { token, favorites } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  const favoriteNews = news.filter((item) =>
    favorites.includes(Number(item.id))
  );

  if (!token) return null;

  return (
    <div className="w-full p-4 lg:max-w-325 lg:mx-auto lg:my-0">
      <Head>
        <title>Favoritos | Jota News</title>
        <meta
          name="description"
          content="Suas notícias favoritas no Jota News"
        />
      </Head>
      <Header />
      <main>
        <section className="space-y-3">
          {favoriteNews.length === 0 ? (
            <p className="text-neutral-600 text-center text-lg font-medium">
              Nenhuma notícia favoritada ainda. Volte à home e clique no ❤️ para
              salvar suas favoritas.
            </p>
          ) : (
            <>
              <h1 className="text-neutral-800 text-2xl font-bold">
                Suas notícias favoritas
              </h1>
              <NewsList news={favoriteNews} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const news = await getNews();

  return {
    props: { news },
    revalidate: 60,
  };
};
