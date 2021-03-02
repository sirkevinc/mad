import React, { useState } from 'react';
import AnimeCards from '../components/animeCards';

export default function Home() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="home_container">
            <h1>Welcome</h1>
            {loading ? "loading" : 
                <div>
                    <AnimeCards category={"trending"} />
                    <AnimeCards category={"top"} /> 
                    <AnimeCards category={"popular"} />
                </div>
            }
        </div>
    )
}
