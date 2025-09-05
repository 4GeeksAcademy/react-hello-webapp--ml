import React, { useEffect } from "react";
import { useAppContext } from "../store/appContext.jsx";
import { Card } from "../components/Card";

const categories = [
    { type: "people", title: "Characters", properties: ["gender", "hair_color", "eye_color"] },
    { type: "planets", title: "Planets", properties: ["climate", "population", "terrain"] },
    { type: "vehicles", title: "Vehicles", properties: ["model", "vehicle_class", "manufacturer"] }
];

export const Home = () => {
    const { store, actions } = useAppContext();

    useEffect(() => {
        categories.forEach(cat => {
            if (store[cat.type].length === 0) {
                fetch(`https://www.swapi.tech/api/${cat.type}`)
                    .then(res => res.json())
                    .then(data => {
                        actions.setEntities(cat.type, data.results);
                    });
            }
        });
    }, []);

    return (
        <div className="container">
            {categories.map(cat => (
                <div key={cat.type} className="mb-5">
                    <h2 className="mb-3">{cat.title}</h2>
                    <div className="d-flex flex-row overflow-auto">
                        {store[cat.type].length === 0 ? (
                            <div className="text-muted">Loading...</div>
                        ) : (
                            store[cat.type].map(item => (
                                <Card key={item.uid} item={item} type={cat.type} properties={cat.properties} />
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
