import React from 'react';
import AnimeList from '../components/animeList';

export default function Popular() {
    return (
        <div>
            <h1>Popular</h1>
            <AnimeList category="popular" />
        </div>
    )
}
