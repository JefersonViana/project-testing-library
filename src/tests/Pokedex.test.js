import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titleEncountered = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(titleEncountered).toBeInTheDocument();
    expect(titleEncountered).toHaveTextContent('Encountered Pokémon');
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(btnNextPokemon).toHaveTextContent('Próximo Pokémon');

    userEvent.click(btnNextPokemon);

    const pokemonCharmander = screen.queryByText(/charmander/i);
    const pokemonPikachu = screen.queryByText(/Pikachu/i);

    expect(pokemonCharmander).toBeInTheDocument();
    expect(pokemonPikachu).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonCaterpie = screen.queryByText(/caterpie/i);
    const charmander = screen.queryByText(/charmander/i);

    expect(pokemonCaterpie).toBeInTheDocument();
    expect(charmander).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonEkans = screen.queryByText(/ekans/i);
    const caterpie = screen.queryByText(/caterpie/i);

    expect(pokemonEkans).toBeInTheDocument();
    expect(caterpie).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonAlakazam = screen.queryByText(/Alakazam/i);
    const ekans = screen.queryByText(/ekans/i);

    expect(pokemonAlakazam).toBeInTheDocument();
    expect(ekans).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonMew = screen.queryByText(/mew/i);
    const alakazam = screen.queryByText(/Alakazam/i);

    expect(pokemonMew).toBeInTheDocument();
    expect(alakazam).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonRapidash = screen.queryByText(/rapidash/i);
    const mew = screen.queryByText(/mew/i);

    expect(pokemonRapidash).toBeInTheDocument();
    expect(mew).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonSnorlax = screen.queryByText(/snorlax/i);
    const rapidash = screen.queryByText(/rapidash/i);

    expect(pokemonSnorlax).toBeInTheDocument();
    expect(rapidash).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pokemonDradonair = screen.queryByText(/dragonair/i);
    const snorlax = screen.queryByText(/snorlax/i);

    expect(pokemonDradonair).toBeInTheDocument();
    expect(snorlax).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const pikachu = screen.queryByText(/pikachu/i);
    const dragonair = screen.queryByText(/dragonair/i);

    expect(pikachu).toBeInTheDocument();
    expect(dragonair).not.toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(btnNextPokemon).toHaveTextContent('Próximo Pokémon');

    userEvent.click(btnNextPokemon);

    const pokemonCharmander = screen.queryByText(/charmander/i);
    const pokemonPikachu = screen.queryByText(/Pikachu/i);

    expect(pokemonCharmander).toBeInTheDocument();
    expect(pokemonPikachu).not.toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const buttons = screen.queryAllByTestId('pokemon-type-button');
    const array = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Snorlax', 'Dragonair'];
    for (let index = 6; index >= 0; index -= 1) {
      userEvent.click(buttons[index]);
      const pokemonName = screen.getByText(array[index]);
      const btnAll = screen.getByRole('button', { name: /all/i });
      expect(pokemonName).toBeInTheDocument();
      expect(btnAll).toBeInTheDocument();
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnFire = screen.getByRole('button', { name: /fire/i });
    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnNextPokemon).toBeInTheDocument();

    userEvent.click(btnFire);
    userEvent.click(btnNextPokemon);

    const pokemonName = screen.getByText(/rapidash/i);

    expect(pokemonName).toHaveTextContent('Rapidash');

    userEvent.click(btnAll);

    const pikachu = screen.getByText(/Pikachu/i);
    const rapidash = screen.queryByText(/rapidash/i);
    expect(pikachu).toBeInTheDocument();
    expect(rapidash).not.toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const charmander = screen.getByText(/Charmander/i);

    expect(charmander).toHaveTextContent('Charmander');
  });
});
