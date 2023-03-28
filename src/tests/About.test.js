import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });
  test('este se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);

    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleAbout).toHaveTextContent('About Pokédex');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);
    const paragraphOne = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const paragraphTwo = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);

    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
