import React from "react";
import { useAppContext } from "../store/appContext.jsx";
import { Link } from "react-router-dom";

const getImageUrl = (type, uid) => {
    // Puedes mejorar las imágenes con una fuente externa si lo deseas
    return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
};

export const Card = ({ item, type, properties }) => {
    const { store, actions } = useAppContext();
    const isFav = store.favorites.some(fav => fav.uid === item.uid && fav.type === type);

    return (
        <div className="card m-2" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img src={getImageUrl(type, item.uid)} className="card-img-top" alt={item.name} onError={e => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                {properties && (
                    <ul className="list-unstyled">
                        {properties.map(prop => (
                            <li key={prop}><strong>{prop}:</strong> {item[prop]}</li>
                        ))}
                    </ul>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/${type}/${item.uid}`} className="btn btn-outline-primary btn-sm">Learn More!</Link>
                    <button
                        className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() => isFav ? actions.removeFavorite({ ...item, type }) : actions.addFavorite({ ...item, type })}
                        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        <i className={`fa${isFav ? "s" : "r"} fa-heart`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
