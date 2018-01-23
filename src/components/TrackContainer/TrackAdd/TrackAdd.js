import React from 'react';
import {Link} from 'react-router-dom';
import {List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';

import TextField from 'material-ui/TextField';
import TrackCity from '../TrackDetails/TrackCity/TrackCity';

class TrackAdd extends React.Component {

    constructor(props) {
        super(props);

        this.cookies = new Cookies();

        this.state = {
            cities: [],
            current_city_value: '',
            track_name: '',
            message: '',
        };
    }


    render() {
        const styleBtn = {
            float: 'right',
        };

        return (
            <div>
                <div>
                    <Link to="/">
                        <p>powrót do listy tras</p>
                    </Link>
                    <RaisedButton
                        label="Zapisz trasę"
                        primary={true}
                        style={styleBtn}
                        onClick={this.onSubmitTrack.bind(this)}
                    />
                </div>
                <h1>Dodaj nową trasę</h1>
                <div className="wrapper-add-name">
                    <p>Nazwa trasy:</p>
                    <TextField
                        id="new-track-name"
                        value={this.state.track_name}
                        onChange={this.onChangeTrack}
                    />
                </div>
                <form className="wrapper-add-city" onSubmit={this.onSubmitCity.bind(this)}>
                    <p>Dodaj miasto:</p>
                    <div>
                        <TextField
                            id="new-city-name"
                            value={this.state.current_city_value}
                            onChange={this.onChangeCity}
                        />
                        <RaisedButton
                            label="Dodaj nową trasę"
                            primary={true}
                            type="submit"
                        />
                    </div>
                    <p className="error-message">{this.state.message}</p>
                </form>
                <div className="inner-wrapper">
                    <h3>Miasta przez które trasa przebiega:</h3>
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


        if(this.cookies.get('react_app') == undefined) {
            this.cookies.set('react_app', {'listArray': [new_cookie_value] } );

        } else {

            let array_cookie = this.cookies.get('react_app').listArray;
            array_cookie.push(new_cookie_value)

            this.cookies.set('react_app', {'listArray': array_cookie } );
        }


        this.setState({
            current_city_value: '',
            cities: [],
            message: '',
            track_name: ''
        });


    };

}

export default TrackAdd;


