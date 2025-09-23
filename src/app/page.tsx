"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFavoritos } from "@/hooks/favoritos";
import type { Episodio } from "@/hooks/favoritos";
import EpisodioCard from "@/components/EpisodioCard";
import ListaFavoritos from "@/components/ListaFavoritos";
import CrearEpisodio from "@/components/CrearEpisodio";
import { toast } from "sonner";
import { set } from "zod";

export default function Home() {

    const [episodiosAPI, setEpisodiosAPI] = useState<Episodio[]>([]);
    const { agregarFavorito, eliminarFavorito, esFavorito } = useFavoritos();
    const [loading, setLoading] = useState(true);
    const [episodiosCreados, setEpisodiosCreados] = useState<Episodio[]>([]);

    const todosEpisodios = [...episodiosCreados, ...episodiosAPI];

    useEffect(() => {
        const fetchEpisodios = async () => {
            try {
                let todosEpisodios: Episodio[] = [];
                let url = 'https://rickandmortyapi.com/api/episode';

                while (url) {
                    const response = await fetch(url);
                    const data = await response.json();
                    todosEpisodios = [...todosEpisodios, ...data.results];
                    url = data.info.next;
                }

                setEpisodiosAPI(todosEpisodios);
                setLoading(false);
            } catch {
                toast.error("Error al cargar los episodios");
                setLoading(false);
            }
        };
        fetchEpisodios();
    }, []);

    const handleToggleFavorito = (episodio: Episodio) => {
        if (esFavorito(episodio.id)) {
            eliminarFavorito(episodio.id);
        } else {
            agregarFavorito(episodio);
        }
    };

    const handleAgregarEpisodio = (nuevoEpisodio: Episodio) => {
        setEpisodiosCreados(prev => [...prev, nuevoEpisodio]);
        toast.success(`Episodio "${nuevoEpisodio.name}" creado`);
    };

  return (
    <div>
        <h1>
            Rick y morty Episodios
        </h1>
        <div>
            <div>
                <ListaFavoritos />
                <CrearEpisodio onAgregarEpisodio={handleAgregarEpisodio} />
            </div>
            <div>
                <h2>
                    Lista Episodios ({todosEpisodios.length})
                </h2>
                <div>
                    {todosEpisodios.map((episodio) => (
                        <EpisodioCard
                            key={episodio.id}
                            episodio={episodio}
                            onToggleFavorito={handleToggleFavorito}
                            esFavorito={esFavorito(episodio.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
    
  );
}
