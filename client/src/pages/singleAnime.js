import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import './pages.css'

export default function SingleAnime(props) {
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

    return (
        <div className="singleAnime_container">
            <div className="singleAnime__header">
                <img alt={"banner"} src={bannerImage}/>
                <h1>{title.english || title.romaji}</h1>
            </div>
            <div className="singleAnime__info">
                <img alt={"cover"} src={coverImage.large}/>
                <p>Start Date : {startDate.month}/{startDate.year}</p>
                <p>Episode Count: {episodes}</p>
                <ul>Genres: {genres.map(genre => <li>{genre}</li>)}</ul>
                <p>Average User Score: {averageScore}</p>
                <p>Popularity: {popularity}</p>
            </div>
            <div className="singleAnime__description">
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}
