import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const summary = screen.getByRole('heading', { name: /summary/i });
    const notMoreDetails = screen.queryByRole('link', { name: /more details/i });
    const resume = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(pokemonDetails).toHaveTextContent('Pikachu Details');
    expect(summary).toHaveTextContent('Summary');
    expect(notMoreDetails).not.toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const titleGameLocations = screen.getByRole('heading', { name: /game locations of pikachu/i });

    expect(titleGameLocations).toHaveTextContent('Game Locations of Pikachu');

    const mapOne = screen.getByText(/kanto viridian forest/i);
    const mapTwo = screen.getByText(/kanto power plant/i);
    const locationImages = screen.queryAllByRole('img');
    expect(locationImages).toHaveLength(3);
    expect(locationImages[1].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImages[2].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImages[1].alt).toBe('Pikachu location');
    expect(locationImages[2].alt).toBe('Pikachu location');
    expect(mapOne).toBeInTheDocument();
    expect(mapTwo).toBeInTheDocument();
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    const image = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });

    // expect(labelFavorite).toBeInTheDocument('Pokémon favoritado?');
    expect(labelFavorite.type).toBe('checkbox');
    expect(labelFavorite.checked).toBe(false);
    expect(image).not.toBeInTheDocument();
    // expect(labelFavorite).toHaveTextContent();
    userEvent.click(labelFavorite);
    const isCheckedTrue = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(isCheckedTrue).toBeInTheDocument();
    userEvent.click(labelFavorite);
    const isCheckedFalse = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(isCheckedFalse).not.toBeInTheDocument();
  });
});
