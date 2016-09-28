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

    //http://guacamolistorage-hkust25.appcloud.ust.hk/uploads/DSC03505.jpg

    render() {
        const food = this.props.foodDetail;
        return (
            <Card>
                <CardMedia>
                    {/*overlay={<CardTitle title={food.name} subtitle={food.price + " HKD"} />}*/}
                    <img src={imageUrlMapper(food.picture_url)} height="175" width="100%"/>
                </CardMedia>
                <CardTitle title={food.name} subtitle={food.price + " HKD"} />
            </Card>
        );
    }
};