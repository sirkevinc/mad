import React, { useState, useEffect } from 'react';
import { Input, Spin, Alert } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

import { useLazyQuery, gql } from '@apollo/client';

import SearchResult from '../components/searchResult';

import './pages.css';

const { Search } = Input;

export default function SearchPage() {
    const { query } = useParams();
    const [searchTerms, setSearchTerms] = useState(query);

    const history = useHistory();

    const GET_SEARCH_RESULTS = gql`
        query ($search: String!) {
            Page(page: 1, perPage: 20) {
                media(search: $search) {
                    id
                    title {
                        english
                        romaji
                    }
                    coverImage {
                        large
                    }
                    averageScore
                }
            }
        }
    `

    const [executeSearch, { loading, data, error }] = useLazyQuery(GET_SEARCH_RESULTS);

    const handleSearch = () => {
        executeSearch({ variables: { search: `${searchTerms}`}});
        history.push(`/search/${searchTerms}`);
    }

    useEffect(() => {
        if (!query) return;
        executeSearch({ variables: { search: `${searchTerms}`}});
    }, []);

    if (loading) {
        return (
            <Spin size="large" />
        )
    }
    if (error) {
        return (
            <Alert message="Error loading data" type="error" />
        )
    }

    return (
        <div>
            <h1>Search</h1>
            <Search
                placeholder="Input Search"
                allowClear={true}
                enterButton="Search"
                size="large"
                onSearch={() => handleSearch()}
                onChange={(e) => setSearchTerms(e.target.value)}
            />
            {data ? <div>
                <SearchResult query={searchTerms} data={data} />
            </div> : null}
        </div>
    )
}