import React, { useState } from 'react';
import AnimeList from '../components/animeList';

export default function Home() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="home_container">
            <h1>Welcome</h1>
            {loading ? "loading" : 
                <div>
                    <AnimeList category={"trending"} />
                    <AnimeList category={"top"} /> 
                    <AnimeList category={"popular"} />
                </div>
            }
        </div>
    )
}
