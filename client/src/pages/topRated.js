import React from 'react';
import AnimeList from '../components/animeList';

export default function TopRated() {
    return (
        <div>
            <h1>Top Rated</h1>
            <AnimeList category="top" />
        </div>
    )
}
