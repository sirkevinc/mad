import React, { useState } from 'react';
import AnimeCards from '../components/animeCards';

export default function Home() {
    const [childrenLoaded, setChildLoaded] = useState(0);

    const onChildLoad = () => {
        setChildLoaded(childrenLoaded + 1);
    }

    return (
        <div className="home_container">
            <h1>Welcome</h1>
                {childrenLoaded !== 3 ? "LOADING MATE" : null}
                <AnimeCards category={"trending"} onLoad={onChildLoad} loaded={childrenLoaded} />
                <AnimeCards category={"top"} onLoad={onChildLoad} loaded={childrenLoaded} /> 
                <AnimeCards category={"popular"} onLoad={onChildLoad} loaded={childrenLoaded} />
        </div>
    )
}
