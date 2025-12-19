import { render, screen } from '@testing-library/react';
import { NewsCard } from '../NewsCard';
import { News } from '../../types/news';

const mockNews: News = {
  id: '1',
  title: 'Notícia de Teste',
  content: 'Conteúdo da notícia de teste',
  category: 'Tecnologia',
  photo: 'https://picsum.photos/200',
  createdAt: '2025-01-01',
};

describe('NewsCard', () => {
  it('should render title and link', () => {
    render(<NewsCard news={mockNews} />);

    expect(
      screen.getByRole('heading', { name: mockNews.title })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Ver notícia/i })).toHaveAttribute(
      'href',
      `/noticia/${mockNews.id}`
    );
  });
});
