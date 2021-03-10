import React, { useState } from 'react';
import AnimeCards from '../components/animeCards';

import { Spin } from 'antd';

import './pages.css';

export default function Home() {
    const [childrenLoaded, setChildLoaded] = useState(0);

    const onChildLoad = () => {
        setChildLoaded(childrenLoaded + 1);
    }

    return (
        <div className="home_container">
                {childrenLoaded !== 3 ? <Spin /> : null}
                <AnimeCards category={"trending"} onLoad={onChildLoad} loaded={childrenLoaded} />
                <AnimeCards category={"top"} onLoad={onChildLoad} loaded={childrenLoaded} /> 
                <AnimeCards category={"popular"} onLoad={onChildLoad} loaded={childrenLoaded} />
        </div>
    )
}
