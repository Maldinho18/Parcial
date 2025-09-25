"use client";

import React, { useEffect, useState } from "react";
import { useFavoritos } from "@/hooks/favoritos";
import type { Episodio } from "@/hooks/favoritos";
import EpisodioCard from "@/components/EpisodioCard";
import ListaFavoritos from "@/components/ListaFavoritos";
import CrearEpisodio from "@/components/CrearEpisodio";
import { toast } from "sonner";

export default function Home() {

    const [episodiosAPI, setEpisodiosAPI] = useState<Episodio[]>([]);
    const { agregarFavorito, eliminarFavorito, esFavorito } = useFavoritos();
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
                
            } catch {
                toast.error("Error al cargar los episodios");
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
    <div className="min-h-screen p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Rick y Morty Episodios</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <section className="lg:col-span-2 border rounded-lg bg-white shadow-sm p-4 flex flex-col h-[calc(100vh-140px)]">
                <h2 className="text-lg font-semibold mb-4">
                    Lista Episodios ({todosEpisodios.length})
                </h2>
                <div className="overflow-y-auto pr-2">
                    <div className="flex flex-col gap-3">
                        {todosEpisodios.map(episodio => (
                            <EpisodioCard
                                key={episodio.id}
                                episodio={episodio}
                                onToggleFavorito={handleToggleFavorito}
                                esFavorito={esFavorito(episodio.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <aside className="flex flex-col gap-6">
                <div className="border rounded-lg bg-white shadow-sm p-4 flex flex-col h-[45vh]">
                    <h2 className="text-lg font-semibold mb-3">Favoritos</h2>
                    <div className="overflow-y-auto pr-1">
                        <ListaFavoritos />
                    </div>
                </div>
                <div className="border rounded-lg bg-white shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-3">Crear Episodio</h2>
                    <CrearEpisodio onAgregarEpisodio={handleAgregarEpisodio} />
                </div>
            </aside>
        </div>
    </div>
  );
}
