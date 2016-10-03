import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {imageUrlMapper} from '../constants/Utility';


export default class FoodThumbnailComponent extends React.Component {
    render() {
        const food = this.props.foodDetail;
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
            <Card style={{marginBottom:10}}>
                <CardMedia>
                    <img src={imageUrlMapper(food.picture_url)} height="175" width="100%"/>
                </CardMedia>
                <CardTitle title={titleHandler(food.name)} subtitle={food.price + " HKD"} />
            </Card>
        );
    }
};