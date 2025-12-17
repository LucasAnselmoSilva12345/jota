import { News } from '@/types/news';

export async function getNews(): Promise<News[]> {
  const response = await fetch(
    'https://69035749d0f10a340b23c2d5.mockapi.io/news',
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar as noticias');
  }

  return response.json();
}

export async function getNewsById(id: string): Promise<News> {
  const response = await fetch(
    `https://69035749d0f10a340b23c2d5.mockapi.io/news/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar as noticias');
  }

  return response.json();
}
