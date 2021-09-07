import "./App.css";
import { Navbar } from "./components";
import { Route, Switch } from "react-router-dom";
import { AddMovie, DetailsMovie, EditMovie, HomePage, AddTVSeries, EditTVSeries, DetailsTVSeries, FavoritePage, Movies, TVSeries } from "./pages";

function App() {
  return (
    <div className="font-sans text-gray-700 antialiased bg-white">
      <Navbar />
      <Switch>
        <Route path="/add-movie">
          <AddMovie />
        </Route>
        <Route path="/favorites">
          <FavoritePage />
        </Route>
        <Route path="/edit-movie/:id">
          <EditMovie />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/details-movie/:id">
          <DetailsMovie />
        </Route>
        <Route path="/add-tv-series">
          <AddTVSeries />
        </Route>
        <Route path="/edit-tv-series/:id">
          <EditTVSeries />
        </Route>
        <Route path="/details-tv-series/:id">
          <DetailsTVSeries />
        </Route>
        <Route path="/tv-series">
          <TVSeries />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
