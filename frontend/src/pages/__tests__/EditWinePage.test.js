import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import EditWineForm from '../../components/EditWineForm';
import EditWinePage from '../EditWinePage';


describe("EditWinePage tests", () => {
    const mockWineObject = {
        "_id": "65b1769866a77ecf1343df3e",
        "name": "Pinot Grigio delle Venezie",
        "wineType": "White",
        "sweatness": "Dry",
        "denomination": "",
        "grape": "Pinot Grigio",
        "origin": "Italy",
        "year": "2019",
        "notes": ["apple, citrus"],
        "pairing": "Seafood",
        "userId": "65ab1e880338dd4f0e12c1f4",
        "imagePath": "1706129048396.JPG"
    };
    const mockChosenImage = "../assets/wine-patterns/pattern01s.png";

    const user = {"email" : "magda5@gmail.com", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiMWU4ODAzMzhkZDRmMGUxMmMxZjQiLCJpYXQiOjE3MDg5NTczNDUsImV4cCI6MTcwOTIxNjU0NX0.dPRuPqriPBgr2OCioyvGO21BQxZHnwCXXPgHz4wJz6A"}
    console.log('This is current user:' + user.email)

    const layout = render(
        <AuthContext.Provider value = {{ user }}>
            <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                <Routes>
                    <Route 
                        path="cellar-page/edit/:id" 
                        element={<EditWinePage />} 
                    />
                </Routes>
            </Router>
        </AuthContext.Provider>
      );
    

    //NAME
    test('EditWinePage displaying and changing value of NAME input', async () => {
        layout;
        const nameInput = await screen.findByPlaceholderText(mockWineObject.name)
        expect(nameInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, "Trial wine name");
        expect(nameInput).toHaveValue("Trial wine name");
    });

    //TYPE
    test('EditWinePage selecting the right WINE TYPE', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const selectElement = await screen.findByDisplayValue(mockWineObject.wineType)
        expect(selectElement).toBeInTheDocument();
        userEvent.setup();
        await userEvent.selectOptions(selectElement, 'Red')
        expect(selectElement).toHaveValue("red");
    });

    //SWEATNESS
    test('EditWinePage selecting the right SWEATNESS', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const selectElement = await screen.findByDisplayValue(mockWineObject.sweatness)
        expect(selectElement).toBeInTheDocument();
        userEvent.setup();
        await userEvent.selectOptions(selectElement, 'Sweet')
        expect(selectElement).toHaveValue("sweet");
    });

    //ORIGIN
    test('EditWinePage displaying and changing value of ORIGIN input', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const originInput = await screen.findByPlaceholderText(mockWineObject.origin)
        expect(originInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(originInput);
        await userEvent.type(originInput, "Netherlands");
        expect(originInput).toHaveValue("Netherlands");
    });

    //YEAR
    test('EditWinePage displaying and changing value of YEAR input', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const yearInput= await screen.findByPlaceholderText(mockWineObject.year)
        expect(yearInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(yearInput);
        await userEvent.type(yearInput, "1994");
        expect(yearInput).toHaveValue(1994);
    });

    //ORIGIN
    test('EditWinePage displaying and changing value of DENOMINATION input', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const denominationInput = await screen.findByPlaceholderText("Denomination")
        expect(denominationInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(denominationInput);
        await userEvent.type(denominationInput, "Vinho verde");
        expect(denominationInput).toHaveValue("Vinho verde");
    });

    //GRAPE
    test('EditWinePage displaying and changing value of GRAPE input', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const grapeInput = await screen.findByPlaceholderText("Pinot Grigio")
        expect(grapeInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(grapeInput);
        await userEvent.type(grapeInput, "Avesso");
        expect(grapeInput).toHaveValue("Avesso");
    });

    //NOTES
    test('EditWinePage displaying and changing value of NOTES input', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const notesInput = await screen.findByPlaceholderText("apple, citrus")
        expect(notesInput).toBeInTheDocument();
        userEvent.setup();
        await userEvent.clear(notesInput);
        await userEvent.type(notesInput, "Tomato");
        expect(notesInput).toHaveValue("Tomato");
    });

    //PAIRING
    test('EditWinePage selecting the right PAIRING', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const selectElement = await screen.findByDisplayValue(mockWineObject.pairing)
        expect(selectElement).toBeInTheDocument();
        userEvent.setup();
        await userEvent.selectOptions(selectElement, 'Starches')
        expect(selectElement).toHaveValue("starches");
    });

    //RANDOM IMAGE
    test('EditWinePage has RADIO inputs for RANDOM IMAGE', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const radioYesElement = await screen.findByLabelText('Yes');
        const radioNoElement = await screen.findByLabelText('No');
        expect(radioYesElement).toBeInTheDocument();
        expect(radioNoElement).toBeInTheDocument();
    });

    //SUBMIT
    test('EditWinePage has a SUBMIT button', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit/65b1769866a77ecf1343df3e"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit/:id" 
                            element={<EditWinePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        );
        const submitButton = await screen.findByTestId('edit-wine-form-submit-button');
        expect(submitButton).toBeInTheDocument();
    });
});