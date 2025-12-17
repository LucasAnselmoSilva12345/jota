import { NewsList } from '@/components/NewsList';
import { getNews } from '@/service/news.service';
import { News } from '@/types/news';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface HomeProps {
  news: News[];
}

export default function Home({ news }: HomeProps) {
  return (
    <>
      <Head>
        <title>JOTA News</title>
        <meta
          name="description"
          content="Portal de notícias do teste técnico"
        />
      </Head>

      <main style={{ padding: 20 }}>
        <h1>Portal de Notícias — Desafio Técnico</h1>

        <p>Esta é a página inicial.</p>

        <hr style={{ margin: '2rem 0' }} />

        <section className="container-news-list">
          <NewsList news={news} />
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const news = await getNews();

    return {
      props: {
        news,
      },
    };
  } catch (error) {
    return {
      props: {
        news: [],
      },
    };
  }
};
