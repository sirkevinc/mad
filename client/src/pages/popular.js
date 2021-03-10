import React from 'react';
import AnimeList from '../components/animeList';

export default function Popular() {
    return (
        <div>
            <h1 className="category_title">Popular</h1>
            <AnimeList category="popular" />
        </div>
    )
}
