import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    const titleFavorite = screen.getByRole('heading', { name: /favorite pokémon/i });
    const paragraphFavorite = screen.getByText(/no favorite pokémon found/i);

    expect(pathname).toBe('/favorites');
    expect(titleFavorite).toBeInTheDocument();
    expect(paragraphFavorite).toHaveTextContent('No favorite Pokémon found');
  });
  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetais = screen.getByRole('link', { name: /more details/i });

    userEvent.click(linkDetais);

    const titleSummary = screen.getByRole('heading', { name: /summary/i });
    const titleGameLocations = screen.getByRole('heading', { name: /game locations of pikachu/i });
    const pokemonChecked = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(titleSummary).toHaveTextContent('Summary');
    expect(titleGameLocations).toHaveTextContent(/game locations of/i);
    expect(pokemonChecked).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(pokemonChecked);
    userEvent.click(linkFavorite);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByText(/electric/i);
    const paragraphFavorite = screen.queryByText(/no favorite pokémon found/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(paragraphFavorite).not.toBeInTheDocument();
  });
});
