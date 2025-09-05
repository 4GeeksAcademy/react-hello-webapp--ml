import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [store, setStore] = useState({
        people: [],
        planets: [],
        vehicles: [],
        favorites: []
    });

    const actions = {
        setEntities: (type, data) => {
            setStore(prev => ({ ...prev, [type]: data }));
        },
        addFavorite: (item) => {
            setStore(prev => {
                if (prev.favorites.find(fav => fav.uid === item.uid && fav.type === item.type)) return prev;
                return { ...prev, favorites: [...prev.favorites, item] };
            });
        },
        removeFavorite: (item) => {
            setStore(prev => ({
                ...prev,
                favorites: prev.favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type))
            }));
        }
    };

    return (
        <AppContext.Provider value={{ store, actions }}>
            {children}
        </AppContext.Provider>
    );
};
