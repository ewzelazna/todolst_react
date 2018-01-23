import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class ButtonAddTrack extends React.Component{

    render(){
        return(
            <Link to="/add">
                <RaisedButton
                    label="Dodaj nową trasę"
                    primary={true}
                    className="btn add-track" />
            </Link>
        );
    }
}


export default ButtonAddTrack;