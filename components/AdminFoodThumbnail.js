/**
 * Created by nylee on 4/11/16.
 */
import React from 'react';
import {Thumbnail, Button} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {restaurantList} from '../constants/StaticData';
import {imageUrlMapper} from '../constants/Utility';


export default class AdminFoodThumbnail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openDeleteModal: false,
        }
    }

    render() {
        const food = this.props.foodDetail;
        const restaurantId = food.restaurantid;
        const foodid = food.id;

        const {onUpdate, onDelete} = this.props;
        const actions = [
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={()=>handleClose()}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={()=>handleModalYes()}
            />,
        ];

        var handleClose = () => {
            this.setState({openDeleteModal:false});
        };

        var handleModalYes = () => {
            onDelete(foodid);
            this.setState({openDeleteModal:false});
        };

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
            <div>
                <Card style={{marginBottom:25}}>
                    <CardMedia>
                        <img src={imageUrlMapper(food.picture_url, false)} height="175" width="100%"/>
                        {/*<img src={food.picture_url} height="175" width="100%"/>*/}
                    </CardMedia>
                    <CardTitle title={titleHandler(food.name)} subtitle={restaurantList[restaurantId] + " - " + food.price + " HKD"} />
                    <CardActions>
                        <FlatButton label="Update" onClick={()=>onUpdate(restaurantId, foodid)} />
                        <FlatButton label="Delete" onClick={()=>this.setState({openDeleteModal: true})} />
                    </CardActions>
                </Card>
                <Dialog
                    title="Confirm Menu Delete"
                    actions={actions}
                    modal={false}
                    open={this.state.openDeleteModal}
                    onRequestClose={this.handleClose}
                >
                    Are you sure you want to delete this menu?
                </Dialog>
            </div>
        );
    }
};