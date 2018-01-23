import React from 'react';
import {List} from 'material-ui/List';
import TrackItem from './TrackItem/TrackItem';
import Cookies from 'universal-cookie';


class TrackList extends React.Component {


    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        let listArray;

        if(this.cookies.get('react_app') == undefined) {
            listArray = [];
        } else {
            listArray = this.cookies.get('react_app').listArray;
        }

        this.state = { listArray };
    }

    render(){

        return(
            <div>
                <List>
                    <TrackItem
                        onDelete={this.onDelete.bind(this)}
                        listArray={this.state.listArray} />
                </List>
            </div>
        );
    }

    onDelete(itemToBeDeleted) {
        var updatedItems = this.state.listArray.filter((item) => {
            return item !== itemToBeDeleted
        });

        this.setState({
            listArray: updatedItems
        });

        this.cookies.remove('react_app');
        this.cookies.set('react_app', {'listArray': updatedItems } );

    }
}

export default TrackList;
