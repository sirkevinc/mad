import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import './pages.css'

export default function SingleAnime() {
    const { id } = useParams();

    const ANIME_DATA = gql`
        query {
            Media(id: ${id}) {
                title {
                    romaji
                    english
                }
                startDate {
                    month
                    year
                }
                coverImage {
                    large
                }
                bannerImage
                episodes
                genres
                averageScore
                popularity
                favourites
                description
            }
        }
    `
    const { loading, error, data } = useQuery(ANIME_DATA);

    if (loading) return "Loading";
    if (error) return "Error";

    const {
        title,
        startDate,
        coverImage,
        bannerImage,
        episodes,
        genres,
        averageScore,
        popularity,
        favourites,
        description
    } = data.Media;

    const createMarkup = () => { 
        return {__html: `${description}`}; 
    };

    return (
        <div className="singleAnime_container">
            <div className="singleAnime__header">
                <div className="singleAnime__header-banner">
                    <img alt={"banner"} src={bannerImage}/>
                </div>
            </div>
            <div className="singleAnime__info">
                <div className="singleAnime__info-main">
                    <img alt={"cover"} src={coverImage.large} />
                    <div className="singleAnime__info-main-Details">
                        <h1>{title.english || title.romaji}</h1>
                        <p>Start Date : {startDate.month}/{startDate.year}</p>
                        <div dangerouslySetInnerHTML={createMarkup()} />
                    </div>
                </div>
                <div className="singleAnime__info-details">
                    <ul><b>Genres:</b>{genres.map(genre => <li key={genre}>{genre}</li>)}</ul>
                    <p><b>Episode Count</b>: {episodes}</p>
                    <p><b>Average User Score</b>: {averageScore}</p>
                    <p><b>Popularity</b>: {popularity} </p>
                </div>
            </div>
        </div>
    )
}
