import './App.css';
import {lazy, Suspense} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// import NotFoundView from '../views/NotFoundView/NotFoundView';
import NavBar from '../components/NavBar/NavBar';
import Loader from '../components/loader/loader';

const HomeView = lazy(() => import('../views/HomeView/HomeView' /* webpackChunkName: "home-view" */))
const MoviesView = lazy(() => import('../views/MoviesView/MoviesView' /* webpackChunkName: "movies-view" */))
const MovieDetailsView = lazy(() => import('../views/MovieDetailsView/MovieDetailsView' /* webpackChunkName: "movies-details-view" */))


function App() {
  return (
    <div className="App">

       <NavBar />
      
      <Suspense fallback={<Loader/>}>
        <Switch>

          <Route path={"/"} exact>
            <HomeView />
          </Route>
          
          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          
          <Route>
            {/* <NotFoundView text="page not found" /> */}
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>

    </div>
  );
}

export default App;
