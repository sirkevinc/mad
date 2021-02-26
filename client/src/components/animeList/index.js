import React, { useRef } from 'react';
import { Card, Popover } from 'antd';
import { Link } from 'react-router-dom';


import { useQuery, gql } from '@apollo/client';

import './animeList.css';

const { Meta } = Card;


export default function AnimeList({ category, count }) {    
    const sortDict = {
        top: 'SCORE_DESC',
        popular: 'POPULARITY_DESC',
        trending: 'TRENDING_DESC'
    }
    
    const LIST_DATA = gql`
    query {
        Page(page: 1, perPage: 25) {
            media(sort: ${sortDict[category]}) {
                id
                coverImage {
                    large
                }
                title {
                    english
                    romaji
                    native
                }
                startDate {
                    year
                }
                averageScore
                genres
            }
        }
    }
    `
    const navRef = useRef(null);

    const handleNav = (direction) => {
        if (direction === 'left') {
            navRef.current.scrollLeft -= 200;
        } else {
            navRef.current.scrollLeft += 200;
        }
    }

    const { loading, error, data } = useQuery(LIST_DATA);
    
    if (loading) return "Loading"
    if(error) return "Error"

    return (
        <div>
            <h2>{category.toUpperCase()}</h2>
            <button onClick={() => handleNav('left')}>Prev</button>
            <div className="animeList_container" ref={navRef}>
                {data.Page.media.map((entry) => {
                    let titleEng = entry.title.english;
                    let titleRom = entry.title.romaji;
                    let imageLarge = entry.coverImage.large;
                    return (
                        <Popover 
                            className="popover"
                            title={titleEng || titleRom} 
                            content={"Content"}
                            placement={"right"}
                            key={entry.id}
                        >
                        <Link to={`/anime/${entry.id}`}>
                            <Card
                                style={{ margin: '2px' }}
                                className="animeList__item"
                                loading={loading}
                                hoverable
                                cover={<img alt={"title"} src={imageLarge} />}
                            >
                                <Meta title={titleEng || titleRom} />
                            </Card>
                        </Link>
                        </Popover>
                    )
                })}
            </div>
            <button onClick={() => handleNav('right')}>Next</button>
        </div>
    )
}
