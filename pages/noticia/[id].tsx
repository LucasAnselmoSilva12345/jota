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
    return <h1>Notícia não encontrada</h1>;
  }

  return (
    <>
      <Head>
        <title>{news.title} | JOTA News</title>
        <meta name="description" content={news.content.slice(0, 150)} />
      </Head>

      <main style={{ padding: 20 }}>
        <article>
          <Image src={news.photo} alt={news.title} width={800} height={450} />

          <h1>{news.title}</h1>
          <p>{news.category}</p>
          <p>{news.content}</p>
        </article>
      </main>
    </>
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
