import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import ButtonAddTrack from './HeaderContainer/ButtonAddTrack';
import TrackList from '../components/TrackContainer/TrackList/TrackList';
import TrackAdd from '../components/TrackContainer/TrackAdd/TrackAdd';
import TrackDetails from '../components/TrackContainer/TrackDetails/TrackDetails';

class App extends React.Component {

    render() {
        const currentPath = window.location.pathname;

        return (
            <MuiThemeProvider>
                <div>
                    { !currentPath.includes('add') ? <ButtonAddTrack/> : null }
                    <main>
                        <Switch>
                            <Route exact path='/' component={TrackList}/>
                            <Route path='/add' component={TrackAdd}/>
                            <Route path='/details/:id' component={TrackDetails}/>
                        </Switch>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
