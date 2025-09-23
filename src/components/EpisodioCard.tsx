import React, { useState, useEffect }from "react";
import Image from "next/image";
import type { Episodio } from "@/hooks/favoritos";

interface EpisodioCardProp {
    episodio: Episodio;
    onToggleFavorito: (episodio: Episodio) => void;
    esFavorito: boolean;
    showInFavorites?: boolean;
}

interface Personaje {
    id: number;
    name: string;
    image: string;
}

const EpisodioCard: React.FC<EpisodioCardProp> = ({
    episodio,
    onToggleFavorito,
    esFavorito
}) => {
    const [personajes, setPersonajes] = useState<Personaje[]>([]);
    const [loadingPersonajes, setLoadingPersonajes] = useState(true);

    useEffect(() => {
        const fetchPersonajes = async () => {
            if(!episodio.characters || episodio.characters.length === 0) {
                setLoadingPersonajes(false);
                return;
            }

            const primeros5 = episodio.characters.slice(0, 5);
            const personajesPromises = primeros5.map(async (characterUrl) => {
                const response = await fetch(characterUrl);
                return response.json();
            });

            const personajesData = await Promise.all(personajesPromises);
            setPersonajes(personajesData);
            
        };
        fetchPersonajes();
    }, [episodio.characters]);

    return (
        <div>
            <div>
                <div>
                    <h3>{episodio.name}</h3>
                </div>
                <div>
                    <p>Fecha Episodio</p>
                    <p>{episodio.air_date}</p>
                </div>
            </div>
            <div>
                {personajes.map((personaje) => (
                    <div key={personaje.id}>
                        <div>
                            <Image
                                src={personaje.image}
                                alt={personaje.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {personajes.map((personaje) => (
                    <div key={`name-${personaje.id}`}>
                        <p>{personaje.name}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>
                    <strong>Episodio:</strong> {episodio.episode}
                </p>
            </div>
            <button
                onClick={() => onToggleFavorito(episodio)}
                className={`px-4 py-2 rounded ${
                    esFavorito ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}
            >
                {esFavorito ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
            </button>
        </div>
    );
};

export default EpisodioCard;