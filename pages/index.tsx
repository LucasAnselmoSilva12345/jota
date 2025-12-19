import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { NewsList } from '@/components/NewsList';
import { getNews } from '@/service/news.service';
import { News } from '@/types/news';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  news: News[];
  hasError: boolean;
}

export default function Home({ news, hasError }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>JOTA News</title>
        <meta
          name="description"
          content="Portal de notícias do teste técnico"
        />
      </Head>
      <main role="main">
        {hasError && (
          <p role="alert" className="text-red-600">
            Erro ao carregar as notícias
          </p>
        )}
        <h1 className="sr-only">Portal de Notícias — Desafio Técnico</h1>

        <h2 id="news-section" className="sr-only">
          Lista das principais notícias
        </h2>
        <NewsList news={news} />
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const news = await getNews();

    return {
      props: {
        news,
        hasError: false,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        news: [],
        hasError: true,
      },
      revalidate: 60,
    };
  }
};
