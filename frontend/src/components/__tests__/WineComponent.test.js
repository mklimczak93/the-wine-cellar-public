import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WineComponent from '../WineComponent';
import userEvent from '@testing-library/user-event';

describe("WineComponent tests", () => {
    const mockWineObject = {
        "_id": "65b1769866a77ecf1343df3e",
        "name": "Pinot Grigio delle Venezie",
        "wineType": "white",
        "sweatness": "dry",
        "denomination": "",
        "grape": "Pinot Grigio",
        "origin": "Italy",
        "year": { "$numberInt": "2019" },
        "notes": ["apple, citrus"],
        "pairing": ["seafood"],
        "userId": "65ab1e880338dd4f0e12c1f4",
        "imagePath": "1706129048396.JPG"
    }

    test('WineComponent rendering 2 images', () => {
        render(<WineComponent wine={mockWineObject} />);
        const imageElements = screen.getAllByRole('img');
        expect(imageElements[0]).toBeInTheDocument();
        expect(imageElements[1]).toBeInTheDocument();
        expect(imageElements.length).toBe(2);
    });

    test('WineComponent rendering a right image for chosen wine', () => {
        render(<WineComponent wine={mockWineObject} />);
        const wineImage = screen.getByAltText('Wine image');
        expect(wineImage.src).toContain(mockWineObject.imagePath);
    })
})
