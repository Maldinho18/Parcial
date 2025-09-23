"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { set } from "zod";

export interface Episodio {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters?: string[];
}

interface FavoritosContext {
    favoritos: Episodio[];
    agregarFavorito: (episodio: Episodio) => void;
    eliminarFavorito: (episodioId: number) => void;
    esFavorito: (episodioId: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContext | undefined>(undefined);

const FAVORITOS_KEY = "favoritos_episodios";

export const FavoritosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favoritos, setFavoritos] = useState<Episodio[]>([]);

    useEffect(() => {
        const favoritosGuardados = localStorage.getItem(FAVORITOS_KEY);
        if(favoritosGuardados) {
            setFavoritos(JSON.parse(favoritosGuardados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    }, [favoritos]);

    const agregarFavorito = (episodio: Episodio) => {
        if(!favoritos.find(fav => fav.id === episodio.id)) {
            setFavoritos(prev => [...prev, episodio]);
            toast.success(`"${episodio.name}" agregado a favoritos`);
        }
    };

    const eliminarFavorito = (episodioId: number) => {
        const episodio = favoritos.find(fav => fav.id === episodioId);
        setFavoritos(prev => prev.filter(fav => fav.id !== episodioId));
        if(episodio) {
            toast.success(`"${episodio.name}" eliminado de favoritos`);
        }
    };

    const esFavorito = (episodioId: number) => {
        return favoritos.some(fav => fav.id === episodioId);
    };

    return (
        <FavoritosContext.Provider value={{
            favoritos,
            agregarFavorito,
            eliminarFavorito,
            esFavorito
        }}>
            {children}
        </FavoritosContext.Provider>
    )
};

export const useFavoritos = () => {
    const context = useContext(FavoritosContext);
    return context;
}
