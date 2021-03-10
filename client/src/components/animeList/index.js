import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Spin, Alert } from 'antd';


import { useQuery, gql } from '@apollo/client';

import './animeList.css';
const { Column } = Table;

export default function Popular({ category }) {
    const [currentPage, setPage] = useState(1);

    let history = useHistory();

    const sortDict = {
        top: 'SCORE_DESC',
        popular: 'POPULARITY_DESC',
        trending: 'TRENDING_DESC'
    }

    const DATA = gql`
        query {
            Page(page: ${currentPage}, perPage: 50) {
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
                    averageScore
                }
            }
        }
    `
    
    const { loading, error, data, fetchMore } = useQuery(DATA);

    // const loadMore = () => {
    //     fetchMore({
    //         variables: { page: 2 },
    //         updateQuery: (prevResult, { fetchMoreResult }) => {
    //             if (!fetchMoreResult) return prevResult

    //             return {
    //                 ...prevResult,
    //             }
    //         }
    //     })
    // }

    if (loading) {
        return (
            <Spin size="large" className="spinner"/>
        )
    }
    if (error) {
        return (
            <Alert message="Error loading data" type="error" />
        )
    }

    return (
        <div className="animeList__container">
            <div className="animeList__table">
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
                    rowKey='id'
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
            </div>
        </div>
    )
}
