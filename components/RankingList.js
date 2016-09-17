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
            </Paper>
        );
    }
};