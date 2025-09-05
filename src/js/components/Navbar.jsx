import React from "react";
import { useAppContext } from "../store/appContext.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useAppContext();

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Star Wars Catalog</Link>
                <div className="dropdown">
                    <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites [{store.favorites.length}]
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {store.favorites.length === 0 ? (
                            <li><span className="dropdown-item-text">No favorites yet</span></li>
                        ) : (
                            store.favorites.map((fav, idx) => (
                                <li key={fav.uid + fav.type}>
                                    <span className="dropdown-item d-flex justify-content-between align-items-center">
                                        <Link to={`/${fav.type}/${fav.uid}`} className="text-decoration-none text-dark">{fav.name}</Link>
                                        <button className="btn btn-sm btn-danger ms-2" onClick={() => actions.removeFavorite(fav)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
