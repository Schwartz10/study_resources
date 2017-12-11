// ----- REDUX --------
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

const ACTION  = 'ACTION';

export function userActed(action){
  return {
    type: ACTION,
    action
  };
}

export function actionThunk(){
  return function thunk(dispatch){
    axios.get('/api/somewhere')
    .then(res => res.data)
    .then(data => dispatch(userActed(data)))
    .catch(err => console.error(err));
  };
}

const rootReducer = function(state = initialState, action){
  switch (action.type) {
    case ACTION:
      return Object.assign({}, state, { action: action.action });
    default: return state;
  }
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;

// ------------------REACT--------------------
// html <script src="/bundle.js" defer></script>

// <div id="app"></div>

import React from 'react';
import {render} from 'react-dom';

render (
  <Provider store={store}>
    <Root prop1={'data' || function(){}}/>
  </Provider>,
  document.getElementById('app')
)

// Tom's first law = state must always be initialized wit hthe appropirate data type
// Tom's second law =
// Tom's third law =

export default class Root extends Component {
  constructor(props){
    super(props)
    this.state = store.getState()
  }


  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }


  render(){
    return (
      <Router>
          <div>
            <div>
              <TabsComponent />
            </div>
            <div>
              <Switch>
                <Route exact path={'/new-page'} component={Page} />
                <Route exact path={'/'} component={Home} />
              </Switch>
            </div>
          </div>
      </Router>
    )
  }
}
