import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {imageUrlMapper} from '../constants/Utility';


export default class FoodThumbnailComponent extends React.Component {
    // render() {
    //     const food = this.props.foodDetail;
    //     return (
    //         <Thumbnail>
    //             <div>
    //                 <img src={food.image_url} height="175" width="100%"/>
    //                 <h4>{food.name}</h4>
    //                 <p>{food.price} HKD</p>
    //             </div>
    //         </Thumbnail>
    //     );
    // }

    render() {
        const food = this.props.foodDetail;
        function titleHandler(foodTitle){
            console.log(foodTitle.length);
            const maxLength = 35;
            if(foodTitle.length > maxLength){
                return foodTitle.substring(0,maxLength).concat("...");
            }else{
                return foodTitle;
            }
        }

        return (
            <Card>
                <CardMedia>
                    <img src={imageUrlMapper(food.picture_url)} height="175" width="100%"/>
                </CardMedia>
                <CardTitle style={{}} title={titleHandler(food.name)} subtitle={food.price + " HKD"} />
            </Card>
        );
    }
};