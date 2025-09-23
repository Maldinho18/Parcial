"use client";

import React, { useState } from "react";
import type { Episodio } from "@/hooks/favoritos";
import { toast } from "sonner";

interface CrearEpisodioProps {
    onAgregarEpisodio: (episodio: Episodio) => void;
}

const CrearEpisodios: React.FC<CrearEpisodioProps> = ({ onAgregarEpisodio }) => {
    const [titulo, setTitulo] = useState("");
    const [personajes, setPersonajes] = useState("");

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nuevoEpisodio: Episodio = {
            id: Date.now(),
            name: titulo,
            air_date: new Date().toLocaleDateString('en-ES'),
            episode: `Custom-${Date.now()}`,
        };

        onAgregarEpisodio(nuevoEpisodio);
        toast.success(`Episodio "${titulo}" creado y agregado a favoritos`);
        setTitulo("");
        setPersonajes("");
    };

    return (
        <div>
            <h2>Crear Nuevo Episodio</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div>
                    <label>Personajes</label>
                    <input type="text" value={personajes} onChange={(e) => setPersonajes(e.target.value)} />
                </div>
                <button 
                    type="submit">
                        Crear Episodio
                </button>
            </form>
        </div>
    );
};

export default CrearEpisodios;