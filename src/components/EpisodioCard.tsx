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

    useEffect(() => {
        const fetchPersonajes = async () => {
            if(!episodio.characters || episodio.characters.length === 0) {
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
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden text-sm">
            <div className="flex items-center justify-between bg-gray-100 border-b px-3 py-2">
                <h3 className="font-semibold truncate pr-3 text-xs sm:text-sm">{episodio.name}</h3>
                <span className="text-[11px] text-gray-600">
                    Fecha: {episodio.air_date}
                </span>
            </div>
            <div className="flex flex-wrap gap-5">
                {personajes.map((personaje) => (
                    <div key={personaje.id} className="flex flex-col items-center w-16">
                        <div>
                            <Image
                                src={personaje.image}
                                alt={personaje.name}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-300"
                            />
                            <span className="mt-1 text-[10px] text-center leading-tight line-clamp-2">
                                {personaje.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-600">
                    Fecha: {episodio.air_date}
                </span>
                <button
                    onClick={() => onToggleFavorito(episodio)}
                    className={`px-4 py-2 rounded ${
                        esFavorito ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    }`}
                >
                    {esFavorito ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </button>
            </div>
        </div>
    );
};

export default EpisodioCard;