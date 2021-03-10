import React from 'react'
import AnimeList from '../components/animeList';

export default function Discover() {
    return (
        <div>
            <h1 className="category_title">Discover</h1>
            <AnimeList category="trending" />
        </div>
    )
}
