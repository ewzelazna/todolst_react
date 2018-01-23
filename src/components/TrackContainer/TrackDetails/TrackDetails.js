import React from 'react';
import {Link} from 'react-router-dom';
import {List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';
import TextField from 'material-ui/TextField';

import TrackCity from './TrackCity/TrackCity';


class TrackDetails extends React.Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        let listArray;

        if(this.cookies.get('react_app') == undefined) {
            listArray = [];
        } else {
            listArray = this.cookies.get('react_app').listArray;

            //wybranie z ciastka odpowiedniego :id
            const my_param = this.props.match.params.id;

            for(var i = 0; i < listArray.length; i++){
                if(my_param == i){
                    listArray = listArray[i];
                }
            }

        }

        this.state = {
            track_id: this.props.match.params.id,
            cities: listArray.cities,
            track_name: listArray.track_name,
            current_city_value: ''

        };
    }

    render() {

        return (
            <div className="wrapper-details">
                <Link to="/">powrót do listy tras</Link>
                <h1>Edycja danej trasy</h1>
                <div className="wrapper-details-name">
                    <div className="inner-wrapper">
                        <RaisedButton
                            label="Zapisz zmiany"
                            primary={true}
                            onClick={this.onSubmitTrack.bind(this)}
                        />
                    </div>
                    <p>Nazwa trasy:</p>
                    <TextField
                        id="details-track-name"
                        className="next-to-btn"
                        defaultValue={this.state.track_name}
                        onChange={this.onChangeTrack}
                    />
                </div>
                <form className="wrapper-details-city" onSubmit={this.onSubmitCity.bind(this)}>
                    <p>Dodaj nową trasę:</p>
                    <TextField
                        id="details-track-city"
                        className="next-to-btn"
                        value={this.state.current_city_value}
                        onChange={this.onChangeCity}
                    />
                    <RaisedButton
                        label="Dodaj nową trasę"
                        primary={true}
                        type="submit"
                    />
                    <p className="error-message">{this.state.message}</p>
                </form>
                <div className="inner-wrapper">
                    <h3>Miasta przez które przebiega trasa:</h3>
                    <List>
                        <TrackCity citiesList={this.state.cities} />
                    </List>
                </div>
            </div>
        );
    }

    onChangeCity = (event) => {
        this.setState({current_city_value: event.target.value});
    };

    onChangeTrack = (event) => {
        this.setState({track_name: event.target.value});
    };

    onSubmitCity = (event) => {
        event.preventDefault();

        const isOnTheList = this.state.cities.filter((item) => {
            return item.toUpperCase() == this.state.current_city_value.toUpperCase()
        });

        if (isOnTheList.length == 0) {
            this.setState({
                current_city_value: '',
                cities: [...this.state.cities, this.state.current_city_value],
                message: ''
            });
        } else {
            this.setState({
                message: 'To miasto już jest dodane'
            })
        }
    };

    onSubmitTrack = (event) => {
        event.preventDefault();

        let new_cookie_value = {
            track_name: this.state.track_name,
            cities: [...this.state.cities]
        };


        let array_cookie = this.cookies.get('react_app').listArray;

        //sprawdzam ktorą trase podmienić po edycji
        for(var i = 0; i < array_cookie.length; i++) {
            if(this.state.track_id == i) {
                array_cookie.splice(i,1)
            }
        }

        array_cookie.unshift(new_cookie_value)

        this.cookies.set('react_app', {'listArray': array_cookie } );

        this.props.history.push('/')

    };

}

export default TrackDetails;
