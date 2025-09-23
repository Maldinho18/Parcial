"use client";
import React from "react";
import { useFavoritos } from "@/hooks/favoritos";
import type { Episodio } from "@/hooks/favoritos";
import EpisodioCard from "@/components/EpisodioCard";

const ListaFavoritos: React.FC = () => {
    const { favoritos, eliminarFavorito } = useFavoritos();

    const handleToggleFavorito = (episodio: Episodio) => {
        eliminarFavorito(episodio.id);
    };

    return (
        <div>
            <h2>
                Favoritos ({favoritos.length})
            </h2>

            {favoritos.length === 0 ? (
                <p>
                    No tienes episodios favoritos aún
                </p>
            ) : (
                <div>
                    {favoritos.map((episodio: Episodio) => (
                        <div key={episodio.id}>
                            <EpisodioCard
                                episodio={episodio}
                                onToggleFavorito={handleToggleFavorito}
                                esFavorito={true}
                                showInFavorites={true}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListaFavoritos;