import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import CellarPage from '../CellarPage';

describe("EditProfilePage tests", () => {
    const user = {"email" : "magda5@gmail.com", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiMWU4ODAzMzhkZDRmMGUxMmMxZjQiLCJpYXQiOjE3MDg5NTczNDUsImV4cCI6MTcwOTIxNjU0NX0.dPRuPqriPBgr2OCioyvGO21BQxZHnwCXXPgHz4wJz6A"}
    console.log('This is current user:' + user.email);

    //H1 - Cellar Profile title
    test('CellarPage displaying h1', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page"]}>
                    <Routes>
                        <Route 
                            path="cellar-page" 
                            element={<CellarPage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const titleElement01 = await screen.findByText(/Your/i);
        const titleElement02 = await screen.findByText(/Cellar/i);
        expect(titleElement01).toBeInTheDocument();
        expect(titleElement02).toBeInTheDocument();
    });

    //Menu
    test('CellarPage displaying menu', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page"]}>
                    <Routes>
                        <Route 
                            path="cellar-page" 
                            element={<CellarPage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const menuElement = await screen.findByRole('list');
        const menuSingleElement = await screen.findByText('Red');
        expect(menuElement).toBeInTheDocument();
        userEvent.setup();
        await userEvent.click(menuSingleElement);
        expect(menuSingleElement).toHaveStyle({textAlign: "end"})
    });
});