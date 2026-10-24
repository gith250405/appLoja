
export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem?: string;
};

export const PRODUTOS: Produto[] = [
  {
    id: '1',
    nome: 'Kit Alto Falantes 6 Polegadas Jbl Selenium 6trfx50 100w Rms',
    descricao: 'Par de alto-falantes coaxiais',
    preco: 'R$ 189,90',
    imagem: 'https://imgs.search.brave.com/ARra3-Q3WuWNVOlU5IXxgwizcObFcF_FUqB3dj2cfVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk4NjkxNi1NTEIz/MTE5MTA5NjM0OV8w/NjIwMTktVi1raXQt/YWx0by1mYWxhbnRl/cy02LXBvbGVnYWRh/cy1qYmwtc2VsZW5p/dW0tNnRyZng1MC0x/MDB3LXJtcy53ZWJw',
  },
  {
    id: '2',
    nome: 'Kit 1 Módulo Amplificador Stetsom Hl400.4 400w 4 Canais',
    descricao: '2 canais, classe D',
    preco: 'R$ 349,90',
    imagem: 'https://imgs.search.brave.com/nB8LcXpv6wMnx1wC0nR664buhim7hrICSTRsefTXtg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg5Mjc3Mi1NTFU3/Nzg5NzgyODYzOF8w/ODIwMjQtVi53ZWJw',
  },
  {
    id: '3',
    nome: 'DC Audio Level 2 12 M4 600w Subwoofer',
    descricao: '500W RMS, 4 ohms',
    preco: 'R$ 459,90',
    imagem: 'https://imgs.search.brave.com/Imx-bkfeRvfn8mZCkG1dFpB3865FWQsTynKopT4Jpdk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/ZS5zb3VuZHNvbHV0/aW9uc2F1ZGlvLmNv/bS9jZG4vc2hvcC9m/aWxlcy9MVkxfMl8w/MDBfXzU1MzY2LnBu/Zz92PTE3Mjk3MjMy/OTImd2lkdGg9MTI4/MA',
  },
  {
    id: '4',
    nome: 'Kit Instalação De Som Com Fios Cabo Rca 5m E Cabos Y 2m 1f 1m',
    descricao: 'Instalação completa',
    preco: 'R$ 129,90',
    imagem: 'https://imgs.search.brave.com/SLftEkYPR2sqx7nEm6gB0Pb-FJZaFyLWTqyuEzbNwuY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF83/NDAxMjgtTUxBODA5/NTgxMDQ1OTFfMTEy/MDI0LU8ud2VicA',
  },
];

export const getProdutoPorId = (id?: string) =>
  PRODUTOS.find((p) => p.id === id);