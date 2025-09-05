import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const typeMap = {
    people: "characters",
    planets: "planets",
    vehicles: "vehicles"
};

const getImageUrl = (type, uid) => {
    return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
};

export const Single = () => {
    const { type, theid } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${theid}`)
            .then(res => res.json())
            .then(json => setData(json.result));
    }, [type, theid]);

    if (!data) return <div className="container text-center mt-5">Loading...</div>;

    const props = Object.entries(data.properties);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={getImageUrl(type, theid)}
                        alt={data.properties.name}
                        className="img-fluid rounded"
                        onError={e => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                    />
                </div>
                <div className="col-md-7">
                    <h2>{data.properties.name}</h2>
                    <table className="table table-striped mt-3">
                        <tbody>
                            {props.map(([key, value]) => (
                                <tr key={key}>
                                    <th>{key.replace("_", " ")}</th>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
