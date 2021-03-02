import React from 'react';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

import './searchResult.css';

const { Column } = Table;

export default function SearchResult({ query, data}) {

    const history = useHistory();

    return (
            <div className="searchResults">
                <h1>{data.Page.media.length} Results</h1>
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
                            render={averageScore => (
                                <>{averageScore || "N/A"}</>
                            )}
                        />
                </Table>
            </div>
    )
}