import React from 'react';
import {ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


class TrackItem extends React.Component {

    render(){

        let items = this.props.listArray;
        items = items.map((item, index) => {

            let cities = item.cities;
            cities = cities.map((city, i) => {

                return(
                    city + ' '
                )
            });

            return(
                <div className="list-track" key={index}>
                    <Link to={`/details/${index}`}>
                        <ListItem
                            item={item}
                            primaryText={item.track_name}
                            secondaryText={
                                <p className="city">{cities}</p>
                            }
                        />
                    </Link>
                    <RaisedButton
                        label="Usuń"
                        primary={true}
                        onClick={this.props.onDelete.bind(null, item)}
                        className="btn remove-button" />
                </div>
            );
        });

        return (
            <div>{items}</div>
        )
    }

}

export default TrackItem;
