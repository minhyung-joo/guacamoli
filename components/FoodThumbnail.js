import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {imageUrlMapper} from '../constants/Utility';
import {restaurantList} from '../constants/StaticData';



export default class FoodThumbnailComponent extends React.Component {
    render() {
        const food = this.props.foodDetail;
        const restaurantId = food.restaurantid;

        //var processedPath = food.picture_url.replace('.jpg', '_S.jpg');
        console.log(food.picture_url);

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
                    <img src={imageUrlMapper(food.picture_url)} height="175" width="100%"/>
                </CardMedia>
                <CardTitle title={titleHandler(food.name)} subtitle={restaurantList[restaurantId] + " - " + food.price + " HKD"} />
            </Card>
        );
    }
};