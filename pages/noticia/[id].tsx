import { getNewsById } from '@/service/news.service';
import { News } from '@/types/news';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

interface NewsPageProps {
  news: News | null;
}

export default function NewsPage({ news }: NewsPageProps) {
  if (!news) {
    <h1>Noticia não encontrada no site</h1>;
  }

  return (
    <>
      <Head>
        <title>{news?.title} | JOTA News</title>
        <meta name="description" content={news?.content.slice(0, 150)} />
      </Head>

      <main style={{ padding: 20 }}>
        <h1>Portal de Notícias — Desafio Técnico</h1>

        <p>Esta é a página inicial.</p>

        <hr style={{ margin: '2rem 0' }} />

        <Image src={news?.photo} width={500} height={500} alt={news?.title} />
        <h3>{news?.title}</h3>
        <p>{news?.content}</p>
        <p>{news?.category}</p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<NewsPageProps> = async ({
  params,
}) => {
  try {
    const id = params?.id as string;
    const news = await getNewsById(id);

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
