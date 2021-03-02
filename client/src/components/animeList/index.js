import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Spin, Alert } from 'antd';


import { useQuery, gql } from '@apollo/client';

import './animeList.css';
const { Column } = Table;

export default function Popular({ category }) {
    let history = useHistory();

    const sortDict = {
        top: 'SCORE_DESC',
        popular: 'POPULARITY_DESC',
        trending: 'TRENDING_DESC'
    }

    const DATA = gql`
        query {
            Page(page: 1, perPage: 50) {
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
    
    const { loading, error, data } = useQuery(DATA);

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
        <div className="animeList__container">
            <div className="animeList__table">
                <Table 
                    dataSource={data.Page.media}
                    pagination={{ 
                        position: ["bottomCenter"],
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
            </div>
        </div>
    )
}
