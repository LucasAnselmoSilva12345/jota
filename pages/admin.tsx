import { NewsList } from '@/components/NewsList';
import { getNews } from '@/service/news.service';
import { useAuthStore } from '@/store/auth.store';
import { News } from '@/types/news';
import { GetStaticProps } from 'next';
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
    <main>
      <h1>Bem-vindo 👋</h1>
      <p>Suas notícias favoritas</p>

      {favoriteNews.length === 0 ? (
        <p>Nenhuma notícia favoritada ainda.</p>
      ) : (
        <NewsList news={favoriteNews} />
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const news = await getNews();

  return {
    props: { news },
    revalidate: 60,
  };
};
