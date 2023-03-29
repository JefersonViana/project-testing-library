import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toBe('http://localhost/pokemon/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const summary = screen.getByRole('heading', { name: /summary/i });

    expect(summary).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const summary = screen.getByRole('heading', { name: /summary/i });
    const { pathname } = history.entries[1];
    expect(summary).toBeInTheDocument();
    expect(pathname).toBe('/pokemon/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const iconFavorite = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });

    expect(iconFavorite).not.toBeInTheDocument();

    userEvent.click(checkbox);

    const iconStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(iconStar.src).toBe('http://localhost/star-icon.svg');
    expect(iconStar.alt).toBe('Pikachu is marked as favorite');
  });
});
