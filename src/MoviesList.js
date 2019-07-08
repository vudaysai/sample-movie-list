import React from 'react'
import jsonMoviesData from './data/data.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const data = [
  { id: 'img', placeholder: 'Enter movie image url...', label: 'Image url*' }, { id: 'title', placeholder: 'Enter Movie name...', label: 'Move Name*' },
  { id: 'likes', placeholder: 'Enter Movie Likes...', label: 'Likes' }, { id: 'year', placeholder: 'Enter Year of Movie...', label: 'Year Of Movie' },
  { id: 'rating', placeholder: 'Enter Movie ratings...', label: 'Movie Ratings' }]

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', taskTypes: jsonMoviesData, modal: false, movieDetails: jsonMoviesData,
      act: 0,
      index: '',
      datas: [],
      showComponent: false,
      movieDisplayInfo: '',
      newMovie: { id: jsonMoviesData.length + 1, img: '', title: '', rating: '', likes: '', content: '', year: '' },

    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showMovieInfo = this.showMovieInfo.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.taskTypes = jsonMoviesData.map(function (a) { return a });
    let suggestions = this.taskTypes.filter(function (tname) {
      return tname.title.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({
      taskTypes: suggestions
    })
  }

  dataChange(e) {
    const { newMovie } = this.state
    newMovie[e.target.id] = e.target.value
    this.setState({
      newMovie: newMovie
    });
  }

  submitMovieInfo = (e) => {
    e.preventDefault();
    const { movieDetails, newMovie, modal } = this.state
    if (this.state.act === 0) {
      movieDetails.push(newMovie);
    }


    this.setState({
      movieDetails: movieDetails,
      taskTypes: movieDetails, modal: !modal,
      newMovie: { id: jsonMoviesData + 1, img: '', title: '', rating: '', likes: '', content: '', year: '' }

    });

  }


  showMovieInfo(movieDetails) {
    this.setState({
      showComponent: true,
      movieDisplayInfo: movieDetails
    });
  }


  removeMovieInfo = (i) => {
    let movieDetails = this.state.movieDetails;
    if (i !== -1) {
      movieDetails.splice(i, 1);
      this.setState({
        showComponent: true,
        movieDetails: movieDetails
      });
    }

  }

  editMovieInfo = (i) => {
    let movie = this.state.movieDetails[i];
    this.setState({ act: 1, newMovie: movie });
  }

  closeMovieInfo = (i) => {
    this.setState({
      showComponent: false,
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
                  <Button color="primary" onClick={this.toggle}>Add Movie</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  newMoviesInfo() {
    const { newMovie } = this.state

    return (
      <div>
        <div className="col-sm-1"></div>
        <div className="col-sm-2 mt-5">

          <form ref="myform" className="myForm" >
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle} className="text-center">Add Movie</ModalHeader>
              <ModalBody>
                {data.map(({ id, label, placeholder }, i) => {
                  return (
                    <div className="form-group">
                      <label> {label}</label>
                      <input type="text" id={id} placeholder={placeholder} className="form-control" onChange={this.dataChange} value={newMovie[id]} />
                    </div>
                  )
                })
                }
                <div className="form-group">
                  <label>Movie Content:*</label>
                  <textarea type="text" id="content" rows="3" cols="3" placeholder="Enter Movie content..." className="form-control" onChange={this.dataChange} value={newMovie.content}></textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={(e) => this.submitMovieInfo(e)}>Add Detailes</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </form>

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
                  <img src={movieData.img} width="300" className="ml-5 " alt="movieimage" onClick={() => this.showMovieInfo(movieData)} />
                </div>
                <div>
                  {
                    this.state.showComponent && this.state.movieDisplayInfo.id === movieData.id ?
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-3 mr-5 mt-5 ml-5">
                            <img src={this.state.movieDisplayInfo.img} width="300" alt="MovieImage" height="300" />
                          </div>
                          <div className="col   ml-5">
                            <div className="row-sm-3 offset-sm-3 ml-5 mt-5">
                              <div className="text-center"> <h3>{this.state.movieDisplayInfo.title}</h3></div>
                            </div>
                            <div className="row mt-5">
                              <div className="col-sm-4">
                                <div>
                                  <i className="fa fa-star fa-2x">{this.state.movieDisplayInfo.rating}</i>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div>
                                  <i className="fa fa-heart fa-2x">{this.state.movieDisplayInfo.likes}</i>
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <div>
                                  <h3>{this.state.movieDisplayInfo.year} </h3>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-sm">
                                <h6>{this.state.movieDisplayInfo.content}</h6>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => this.removeMovieInfo(i)}  >Delete</button>
                              </div>
                              <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => { this.toggle(); this.editMovieInfo(i) }}  >Edit</button>
                              </div>
                              <div className="col-sm-2 offset-sm-2">
                                <button className="btn btn-primary myButton mb-3" onClick={() => this.closeMovieInfo(i)}>Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      null
                  }
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
        {this.newMoviesInfo()}
        {this.movieInfo()}
      </div>

    )
  }
}