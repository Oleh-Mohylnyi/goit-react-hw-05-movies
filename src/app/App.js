// import logo from './logo.svg';
import './App.css';
import {lazy, Suspense} from 'react'
import {Switch, Route} from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar';
import NotFoundView from '../views/NotFoundView/NotFoundView';
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

          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          
          <Route path={"/" && "" && "/goit-react-hw-05-movies"} exact>
            <HomeView />
          </Route>
          
          
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          
          <Route>
            <NotFoundView text="page not found"/>
          </Route>
        </Switch>
      </Suspense>


    </div>
  );
}

export default App;
