import React, { useState } from 'react';
import { Input, Table, Spin, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

import { useLazyQuery, gql } from '@apollo/client';

import './pages.css';

const { Search } = Input;
const { Column } = Table;

export default function SearchPage() {
    const [searchTerms, setSearchTerms] = useState("");

    const history = useHistory();

    const GET_SEARCH = gql`
        query ($search: String!) {
            Page(page: 1, perPage: 10) {
                media(search: $search) {
                    id
                    title {
                        english
                        romaji
                    }
                    coverImage{
                        large
                    }
                    averageScore
                }
            }
        }
    `

    const [executeSearch, { loading, data, error }] = useLazyQuery(GET_SEARCH);

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
            Search
            <Search
                placeholder="Input Search"
                allowClear={true}
                enterButton="Search"
                size="large"
                onSearch={() => executeSearch({ variables: { search: `${searchTerms}`}})}
                onChange={(e) => setSearchTerms(e.target.value)}
            />
            {data ? 
            <div className="searchResults">
                <h1>{data.Page.media.length} Results</h1>
                <Table 
                    dataSource={data.Page.media}
                    pagination={{ 
                        position: ["bottomCenter"],
                        // onChange: (loadMore())
                    }}
                    onRow={(record, rowIndex) => {
                        let id = record.id;
                        return {
                            onClick: () => history.push(`/anime/${id}`)
                        }
                    }}
                >
                        <Column 
                            title=""
                            key="coverImage"
                            dataIndex="coverImage"
                            render={coverImage => (
                                <img alt="coverImage" src={coverImage.large} />
                            )}
                        />
                        <Column 
                            title="Title"
                            key="title"
                            dataIndex="title"
                            render={title => (
                                <>
                                    {title.english || title.romaji}
                                </>
                            )}
                        />
                        <Column 
                            title="Average Score"
                            key="averageScore"
                            dataIndex="averageScore"
                        />
                </Table>
            </div> : null}
        </div>
    )
}
