import { News } from '@/types/news';

const API_URL = 'https://69035749d0f10a340b23c2d5.mockapi.io/news';

export async function getNews(): Promise<News[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar as noticias');
  }

  return response.json();
}

export async function getNewsById(id: string): Promise<News> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar as noticias');
  }

  return response.json();
}
