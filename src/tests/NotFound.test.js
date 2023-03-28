import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/invalid');
    });

    const titleNotFound = screen.getByRole('heading', { name: /page requested not found/i });

    expect(titleNotFound).toHaveTextContent('Page requested not found');
  });
  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/linkInvalid');
    });

    const titleNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(titleNotFound).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
