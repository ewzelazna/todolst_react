import React from 'react';
import {ListItem} from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';


class TrackCity extends React.Component {
    render(){

        if(this.props.citiesList.length > 0) {

            let items = this.props.citiesList;

            items = items.map((item, index) => {

                return(
                    <div className="list-track" key={index}>
                        <ListItem
                            primaryText={item}
                         />
                        <RaisedButton
                            label="Usuń"
                            primary={true}
                            onClick={this.onDeleteCity.bind(null, item)}
                            className="btn remove-button" />
                    </div>
                );
            });

            return (
                <div>{items}</div>
            )
        } else {
            return (
                <p>Trasa nie przebiega przez żadne miasto</p>
            )
        }

    }

    onDeleteCity(itemToBeDeleted) {
        var updatedItems = this.state.cities.filter((item) => {
            return item !== itemToBeDeleted
        });

        this.setState({
            cities: updatedItems
        });
    };
}

export default TrackCity;