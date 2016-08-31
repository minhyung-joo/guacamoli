import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Panel} from 'react-bootstrap';
import RankingItem from './RankingItem';

export default class RankingList extends React.Component {
    render() {
        const rankingObject = this.props.rankingObject;
        return (
            <Panel header={rankingObject.rankingTitle}>
                {
                    rankingObject.rankingArray.map(function(food){
                        return(
                        <Link to={`/food/${1}`}>
                            <RankingItem food={food}/>
                        </Link>

                        )
                    })
                }
            </Panel>
        );
    }
};