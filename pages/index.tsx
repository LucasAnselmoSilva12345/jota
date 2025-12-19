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
    <div className="w-full p-4 lg:max-w-325 lg:mx-auto lg:my-0">
      <Head>
        <title>JOTA News</title>
        <meta
          name="description"
          content="Portal de notícias do teste técnico"
        />
      </Head>
      <Header />
      <main>
        {hasError && <p>Erro ao carregar as notícias</p>}
        <h1 className="sr-only">Portal de Notícias — Desafio Técnico</h1>
        <NewsList news={news} />
      </main>
    </div>
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
