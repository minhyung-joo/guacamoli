import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Add from 'material-ui/svg-icons/content/add-circle-outline';

export default class SearchStatusBar extends React.Component {
    render() {
        const options = this.props.filterOptions;
        return(
            <Paper style={styles.paper} zDepth={1}>
                <Row>
                    <Col md={12}>
                        <RaisedButton label="Filter Options" primary={true} style={styles.labelButton}
                                      labelPosition="before" icon={<Add/>}/>
                        {
                            options.map(function(option){
                                return(
                                    <Chip style={styles.chip}>
                                        {option}
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
    paper:{
        width: '100%',
        marginTop: 20,
        // textAlign: 'center',
        display: 'inline-block',
    },
    labelButton:{
        // display: 'inline-block',
    },
    chip: {
        margin: 4,
        display: 'inline-block',
    },
}