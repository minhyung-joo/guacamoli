import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Row, Col, Panel} from 'react-bootstrap';
import RankingItem from './RankingItem';

import Paper from 'material-ui/Paper';

export default class RankingList extends React.Component {
    render() {
        const rankingObject = this.props.rankingObject;
        return (
            <Paper>
                <Panel header={rankingObject.title}>
                    {
                        rankingObject.rankingArray.map(function(food, index){
                            return(
                            <Link to={`/food/${food.id}`}>
                                <RankingItem food={food} rank={index+1}/>
                            </Link>

                            )
                        })
                    }
                </Panel>
            </Paper>
        );
    }
};