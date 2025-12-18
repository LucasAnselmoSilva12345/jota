import { Header } from '@/components/Header';
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
    <>
      <Head>
        <title>JOTA News</title>
        <meta
          name="description"
          content="Portal de notícias do teste técnico"
        />
      </Head>

      <Header />

      <main style={{ padding: 20 }}>
        <h1>Portal de Notícias — Desafio Técnico</h1>

        {hasError && <p>Erro ao carregar as notícias</p>}

        <p>Esta é a página inicial.</p>

        <hr style={{ margin: '2rem 0' }} />

        <section className="container-news-list">
          <NewsList news={news} />
        </section>
      </main>
    </>
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
