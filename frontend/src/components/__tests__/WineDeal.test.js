import { render, screen } from '@testing-library/react';
import WineDeal from '../WineDeal';
import userEvent from '@testing-library/user-event';

describe('WineDeal', () => {
    const mockWineObject = {
        "_id":"65d4bb4f3853f4c5b5e04fb2",
        "wineId":"65b177ed66a77ecf1343df61",
        "matchedBy":"name",
        "available":true,
        "shopName":"marekkondrat.pl",
        "wineURLInShop":"https://www.marekkondrat.pl/pliniana-juvenis-primitivo-di-manduria-dop",
        "wineNameInShop":"Wino Pliniana Juvenis Primitivo di Manduria DOP 2022",
        "winePriceInShop":"62.00"
    }

    test('WineDeal receving prop', () => {
        render(<WineDeal wine={mockWineObject} number={2} />);
        //number
        const numberElement = screen.getByText(2);
        expect(numberElement).toBeInTheDocument();
        //name
        const nameElement = screen.getByText("Wino Pliniana Juvenis Primitivo di Manduria DOP 2022")
        expect(nameElement).toBeInTheDocument();
        //status
        const statusElement = screen.getByText("Available")
        expect(statusElement).toBeInTheDocument();
        //price
        const priceElement = screen.getByText("62.00 PLN")
        expect(priceElement).toBeInTheDocument();
        //link
        const linkElement = screen.getByRole('link', { name: 'Visit' });
        expect(linkElement).toBeInTheDocument();
    })

    test('WineDeal having a right link', async () => {
        render(<WineDeal wine={mockWineObject} number={2} />);
        const linkElement = screen.getByRole('link', { name: 'Visit' });
        expect(linkElement).toHaveAttribute('href', mockWineObject.wineURLInShop);
    })
})
