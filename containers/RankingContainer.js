import React from 'react';
import {render} from 'react-dom';
import {Row, Col, Glyphicon, Button, Panel} from 'react-bootstrap';

import RankingList from '../components/RankingList';

export default class RankingContainer extends React.Component {
    render () {
        return (
            <Row>
                <Col mdOffset={5} md={4}>
                    <h2>Rankings</h2>
                </Col>
                <div style={rankingDisplayDivStyle}>
                    <Col md={4}>
                        <RankingList rankingObject={rankingObject}/>
                    </Col>
                    <Col md={4}>
                        <RankingList rankingObject={rankingObject2}/>
                    </Col>
                    <Col md={4}>
                        <RankingList rankingObject={rankingObject2}/>
                    </Col>
                </div>
            </Row>
        );
    }
}

const rankingDisplayDivStyle = {
    marginTop:90
};

const rankingObject = {
    rankingTitle:'LG1 Ranking',
    rankingArray: [{
        rank:1,
        imageUrl:"http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg",
        foodName:"Shrimp Dimsum",
        price:15
    },
    {
        rank:2,
        imageUrl:"https://s3.amazonaws.com/Menu_Pic/c20c3ce3-eef0-4b87-abb4-3909a3c5a246_N1_House_Special_Noodles.jpg",
        foodName:"Chinese Fried Noodles",
        price:30
    },
    {
        rank:3,
        imageUrl:"http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg",
        foodName:"Shrimp Dimsum",
        price:15
    },
    {
        rank:4,
        imageUrl:"http://nachodudes.com/wp-content/uploads/2013/09/nachos.jpg",
        foodName:"Chinese Fried Noodles",
        price:30
    },
    {
        rank:5,
        imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/cb/3c/37/cb3c3733f72df249ae1fe24844d84d2d.jpg",
        foodName:"Chinese Fried Noodles",
        price:30
    }
    ]
};

const rankingObject2 = {
    rankingTitle:'LG7 Ranking',
    rankingArray: [{
        rank:1,
        imageUrl:"http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg",
        foodName:"Shrimp Dimsum",
        price:15
    },
        {
            rank:2,
            imageUrl:"https://s3.amazonaws.com/Menu_Pic/c20c3ce3-eef0-4b87-abb4-3909a3c5a246_N1_House_Special_Noodles.jpg",
            foodName:"Chinese Fried Noodles",
            price:30
        },
        {
            rank:3,
            imageUrl:"http://www.seriouseats.com/images/20110417-dim-sum-har-gau.jpg",
            foodName:"Shrimp Dimsum",
            price:15
        },
        {
            rank:4,
            imageUrl:"http://nachodudes.com/wp-content/uploads/2013/09/nachos.jpg",
            foodName:"Chinese Fried Noodles",
            price:30
        },
        {
            rank:5,
            imageUrl:"https://s-media-cache-ak0.pinimg.com/736x/cb/3c/37/cb3c3733f72df249ae1fe24844d84d2d.jpg",
            foodName:"Chinese Fried Noodles",
            price:30
        }
    ]
};