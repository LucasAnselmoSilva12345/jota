# Jota

## Arquitetura e decisões técnicas do projeto

### Estratégia de renderização

- Utilização do `getStaticProps` foi baseado pelo fator que o é performatico para contéudo publico, SEO, HTML gerado previamente, menos carga pelo lado do servidor e melhor Time to First Byte (TTFB)
- Com o uso de `Incremental Static Regeneration (ISR)` & `revalidade: 60`, temos um cenário onde:
- O Next.js cacheia o HTML
- A cada 60 segundos, a página pode ser regenerada
- A regeneração ocorre em background
- O usuário nunca espera a requisição
- Essa tomada de decisão é ideal para portais de notícias, onde o conteúdo muda com frequencia e não precisa ser atualizado a cada requisição

### Porque não usar getServerSideProps

- O `getServerSideProps` executa a cada requisição, logo temos um cenário onde:
- Aumenta o tempo de resposta
- Prejudica SEO em alto tráfego
- Não escala bem para portais públicos
- O `getServerSideProps` só seria adequado se o conteúdo fosse personalizado por um usuario, ou depdente de autenticaçaõ ou se for um conteúdo dinamico (dashboard, por exemplo)

## Estruturas das rotas

| Rota             | Estratégia             | Motivo                              |
| ---------------- | ---------------------- | ----------------------------------- |
| `/`              | `getStaticProps + ISR` | Lista pública de notícias           |
| `/notícias/[id]` | `getStaticProps + ISR` | Conteúdo indexável e compartilhável |
| `/admin`         | Client-side guard      | Área simulada autenticada           |

## Conexão com a API

- A conexão com a API ocorre no servidor, dentro de:

```ts
export async function getNews(): Promise<News[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar as notícias');
  }

  return response.json();
}

export async function getNewsById(id: string): Promise<News> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar as notícias');
  }

  return response.json();
}
```

- A Vantagem aqui é que a API nesse formato ela não fica exposta no lado do usuário, melhor segurança, menos requisições no navegador, dados já chegam prontos no HTML

## Gerenciamento de Estado - Zustand

- Feramenta simples e leva para gerenciamento de estado
- O que fica no Zustand?
- Autenticação simulada (token)
- Notícias favoritedas

```ts
{
  token: string | null;
  favorites: number[];
}

```
