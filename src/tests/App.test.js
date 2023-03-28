// Iniciando projeto
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNextPokemon).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémon"', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavoritePokemon).toBeInTheDocument();

    userEvent.click(linkFavoritePokemon);

    const titleFavorite = screen.getByRole('heading', { name: /favorite pokémon/i });
    expect(titleFavorite).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('invalid');
    });
    const titlePageNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(titlePageNotFound).toBeInTheDocument();
  });
});
