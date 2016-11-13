import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {imageUrlMapper} from '../constants/Utility';


export default class RankingItem extends React.Component {
    render() {
        const {food,rank} = this.props;
        return (
            <Row md={12} xs={12} style={styles.rankingItemStyle}>
                <Col md={1} style={styles.defaultStyle}>{rank}</Col>
                <Col md={3}><img src={imageUrlMapper(food.picture_url, false)} style={styles.rankingDetailStyle} height="100%" width="100%"/></Col>
                <Col md={7}>
                    <p style={styles.rankingDetailStyle}><b>{food.name}</b></p>
                    <p style={styles.rankingDetailStyle}>{food.price + "HKD"}</p>
                </Col>
            </Row>
        );
    }
};

const styles = {
    defaultStyle:{
        fontSize:20, color:'black'
    },
    rankingDetailStyle:{
        margin:0, padding:0, color:'black',
        fontSize: '80%',
        width:'100%'
    },
    rankingItemStyle:{
        margin:20,
        height:70,
        width:'100%'
    }
};