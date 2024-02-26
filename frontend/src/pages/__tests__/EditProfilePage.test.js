import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import EditProfilePage from '../EditProfilePage';


describe("EditProfilePage tests", () => {
    const mockUserObject = {
        "_id": "65ab1e880338dd4f0e12c1f4",
        "email": "magda5@gmail.com",
        "firstName": "Brian",
        "lastName": "Smith",
        "birthDate": "20.05.1990",
        "location": "Warszawa",
        "profilePhoto": "..\frontend\public\\uploads\profile-placeholder-05.png"
    };

    const user = {"email" : "magda5@gmail.com", "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiMWU4ODAzMzhkZDRmMGUxMmMxZjQiLCJpYXQiOjE3MDg5NTczNDUsImV4cCI6MTcwOTIxNjU0NX0.dPRuPqriPBgr2OCioyvGO21BQxZHnwCXXPgHz4wJz6A"}
    console.log('This is current user:' + user.email);
    
    //H1 - Edit Profile title
    test('EditProfilePage displaying main h1', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const titleElement01 = await screen.findByText(/Edit/i);
        const titleElement02 = await screen.findByText(/Profile/i);
        expect(titleElement01).toBeInTheDocument();
        expect(titleElement02).toBeInTheDocument();
    });

    //Basic data
    test('EditProfilePage displaying basic data sub-title', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const titleElement = await screen.findByText('BASIC DATA:')
        expect(titleElement).toBeInTheDocument();
    });

    //Email
    test('EditProfilePage displaying email', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const emailValueElement = await screen.findByText(mockUserObject.email)
        expect(emailValueElement).toBeInTheDocument();
    });

    //Birthdate
    test('EditProfilePage displaying birthDate', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const birthDateValueElement = await screen.findByText(mockUserObject.birthDate)
        expect(birthDateValueElement).toBeInTheDocument();
    });

    //Additional info
    test('EditProfilePage displaying additional info sub-title', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const titleElement = await screen.findByText('Additional info:')
        expect(titleElement).toBeInTheDocument();
    });

    //Location
    test('EditProfilePage displaying location', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const locElement = await screen.findByDisplayValue(mockUserObject.location)
        expect(locElement).toBeInTheDocument();
    });

    //First Name
    test('EditProfilePage displaying firstName', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const fNElement = await screen.findByDisplayValue(mockUserObject.firstName)
        expect(fNElement).toBeInTheDocument();
    });

    //Last Name
    test('EditProfilePage displaying lastName', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const lNElement = await screen.findByDisplayValue(mockUserObject.lastName)
        expect(lNElement).toBeInTheDocument();
    });

    //SUBMIT/UPLOAD
    test('EditProfilePage displaying submit/upload buttons', async () => {
        render(
            <AuthContext.Provider value = {{ user }}>
                <Router initialEntries={["/cellar-page/edit-profile"]}>
                    <Routes>
                        <Route 
                            path="cellar-page/edit-profile" 
                            element={<EditProfilePage />} 
                        />
                    </Routes>
                </Router>
            </AuthContext.Provider>
          );
        const buttonElements = await screen.findAllByRole('button')
        expect(buttonElements[0]).toBeInTheDocument();
        expect(buttonElements[1]).toBeInTheDocument();
    });

});