import React from 'react';
import { Button } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { navigate, __esModule } from "@reach/router";

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', taskTypes: [], modal: false, movieDetails: [], jsonMoviesData: [], suggestions: [],
      act: 0,
      index: '',
      showComponent: false,
      movieDisplayInfo: '',
      movieData: [],
      newMovie: { id: 9, img: '', title: '', rating: '', likes: '', content: '', year: '' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.showMovieInfo = this.showMovieInfo.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return false
  // }

  static getDerivedStateFromProps(props, state) {
    if (state.value !== '') {
      return {
        value: state.value,
      };

    } else if (props.movieData.length !== state.movieData.length) {
      return {
        jsonMoviesData: props.movieData,
        taskTypes: props.movieData,
        movieDetails: props.movieData
      }

    }

    return null;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    let taskTypes = this.state.jsonMoviesData.map(function (a) { return a });
    let suggestions = taskTypes.filter(function (tname) {
      return tname.title.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
      taskTypes: suggestions
    })
  }

  showMovieInfo(movieDetails) {
    this.setState({
      showComponent: true,
      movieDisplayInfo: movieDetails
    });
  }

  searchInfo() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6 mt-5">
            <div className="from-group">
              <div className="input-group input-group-lg">
                <span className="input-group-addon  bg-warning text-light p-2">
                  <i className="fa fa-search fa-2x"></i>
                </span>
                <input type="text" className="form-control bg-light text-dark" placeholder="Search Here" value={this.state.value} onChange={this.handleChange} />
                <div className="col-sm-1"></div>
                <div className="col-sm-2 mt-1">
                  <Button color="primary" onClick={this.props.addData}>Add Movie</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  movieInfo() {
    return (
      this.state.taskTypes.map((movieData, i) => {
        return (
          <div className="row" key={i}>
            <div className="col-sm-10 offset-sm-1 mt-5">
              <div className="card-deck">
                <div className="col-sm-4 offset-sm-4">
                  <img
                    src={movieData.img}
                    width="300"
                    className="ml-5 "
                    alt="movieimage"
                    onClick={() => { navigate('/MovieDetails', { state: { ...movieData, i } }) }} />
                </div>
              </div>
            </div>
          </div>
        )
      }
      )
    )
  }

  render() {
    return (
      <div>
        {this.searchInfo()}
        {this.movieInfo()}
      </div>
    )
  }
}






