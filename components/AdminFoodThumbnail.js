/**
 * Created by nylee on 4/11/16.
 */
import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {imageUrlMapper} from '../constants/Utility';
import {restaurantList} from '../constants/StaticData';


export default class AdminFoodThumbnail extends React.Component {
    render() {
        const food = this.props.foodDetail;
        const restaurantId = food.restaurantid;
        const foodid = food.id;

        const {onUpdate, onDelete} = this.props;

        function titleHandler(foodTitle){
            if(foodTitle!=undefined && foodTitle!=null){
                const maxLength = 15;
                if(foodTitle.length > maxLength){
                    return foodTitle.substring(0,maxLength).concat("...");
                }else{
                    return foodTitle;
                }
            }
        }

        return (
            <Card style={{marginBottom:25}}>
                <CardMedia>
                    {/*<img src={imageUrlMapper(food.picture_url, false)} height="175" width="100%"/>*/}
                    <img src={food.picture_url} height="175" width="100%"/>
                </CardMedia>
                <CardTitle title={titleHandler(food.name)} subtitle={restaurantList[restaurantId] + " - " + food.price + " HKD"} />
                <CardActions>
                    <FlatButton label="Update" onClick={()=>onUpdate(restaurantId, foodid)} />
                    <FlatButton label="Delete" onClick={()=>onDelete(foodid)} />
                </CardActions>
            </Card>
        );
    }
};