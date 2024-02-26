import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import FinderPage from '../FinderPage';

describe("FinderPage tests", () => {
    const user = {"email" : "magda5@gmail.com", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiMWU4ODAzMzhkZDRmMGUxMmMxZjQiLCJpYXQiOjE3MDg5NTczNDUsImV4cCI6MTcwOTIxNjU0NX0.dPRuPqriPBgr2OCioyvGO21BQxZHnwCXXPgHz4wJz6A"}
    console.log('This is current user:' + user.email);

    //H1 - FinderPage title
    test('FinderPage displaying h1', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/finder-page/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/finder-page/65b1769866a77ecf1343df3e" 
                            element={<FinderPage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const titleElement = await screen.findByText(/Find the best deals/i);
        expect(titleElement).toBeInTheDocument();
    });

    //FinderPage displaying the analyzed wine div
    test('FinderPage displaying analyzed wine div', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/finder-page/65b177ed66a77ecf1343df61"]}>
                    <Routes>
                        <Route 
                            path="finder-page/:id" 
                            element={<FinderPage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const wineTitleElement = await screen.findByText(/Feudi del Duca - Primitivo di Manduria/i);
        expect(wineTitleElement).toBeInTheDocument();
    });
});