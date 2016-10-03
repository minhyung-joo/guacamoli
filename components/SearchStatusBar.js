import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import AddBox from 'material-ui/svg-icons/content/add-box';


import {teal50, teal100, green200, lightGreen200, lime200, red100} from 'material-ui/styles/colors';

export default class SearchStatusBar extends React.Component {
    render() {
        const options = this.props.filterOptions;
        return (
            <Paper style={styles.paper} zDepth={1}>
                <Row>
                    <Col md={12}>
                        {/*<RaisedButton label="Filter Options" primary={true} style={styles.labelButton}*/}
                                      {/*labelPosition="before" icon={<Add/>}/>*/}
                        <IconButton tooltip="Additional Filtering">
                            <AddBox />
                        </IconButton>
                        {
                            Object.keys(options).map(function(key){
                                return(
                                    <Chip style={styles.chip} backgroundColor={styles.colors[key]}>
                                        {key + ": " + options[key]}
                                    </Chip>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Paper>
        )
    }
}

const styles = {
    paper: {
        width: '100%',
        marginTop: 20,
        // textAlign: 'center',
        display: 'inline-block',
    },
    labelButton: {
        // display: 'inline-block',
    },
    chip: {
        margin: 4,
        display: 'inline-block',
    },
    colors: {
        'Restaurant': teal50,
        'Delivery Speed': teal100,
        'Offered Time': teal100,
        'Cuisine Type': green200,
        'Taste Type': lightGreen200,
        'Ingredient': lime200,
        'Sauce Type': lime200,
        'Without': red100,
    }
}

/*
colors

Restaurant - teal50

Delivery Speed -teal100
Offered Time

Cuisine Type - teal200

Taste Type - teal300

Ingredient - teal400
Sauce Type

Without - red200
 */