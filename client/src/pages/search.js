import React, { useState } from 'react';
import { Input } from 'antd';

import { useLazyQuery, gql } from '@apollo/client';

const { Search } = Input;

export default function SearchPage() {
    const [searchTerms, setSearchTerms] = useState("");

    const DATA = gql`
        query {
            Page(page: 1, perPage: 25) {
                media(search: "Attack") {
                    id
                    coverImage {
                        large
                    }
                    title {
                        english
                        romaji
                        native
                    }
                    averageScore
                }
            }
        }
    `
    const [
        getResults,
        { loading, data }
    ] = useLazyQuery(DATA);
    
    if (loading) return <p>Loading</p>
    if (data) {
        console.log(data)
    }
    
    const handleSearch = (value) => {
        console.log('value', value);
        setSearchTerms(value);
        console.log(searchTerms);
        getResults();
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setSearchTerms(value);
    }

    return (
        <div>
            Search
            <Search
                placeholder="Input Search"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                onChange={handleChange}
            />
        </div>
    )
}
