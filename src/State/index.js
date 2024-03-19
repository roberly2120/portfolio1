import React from 'react';


export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const initialState = {
        projects: [],
        testimonials: [],
        adminIsAuthorized: false,
        adminModalOpen: false,
        projectToEdit: null,
        shouldFetch: true,
    }
    const [globalState, setGlobalState] = React.useState(initialState)



    return (
            <AppContext.Provider value={{ globalState, setGlobalState }}>
                {children}
            </AppContext.Provider>
    )
};