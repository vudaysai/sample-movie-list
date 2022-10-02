import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const data = [
    { id: 'img', placeholder: 'Enter movie image url...', label: 'Image url*' }, { id: 'title', placeholder: 'Enter Movie name...', label: 'Move Name*' },
    { id: 'likes', placeholder: 'Enter Movie Likes...', label: 'Likes' }, { id: 'year', placeholder: 'Enter Year of Movie...', label: 'Year Of Movie' },
    { id: 'rating', placeholder: 'Enter Movie ratings...', label: 'Movie Ratings' }]

export default class ModalData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newMovie: { id: 9, img: '', title: '', rating: '', likes: '', content: '', year: '' },
        }
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
            newMovie: { id: 10, img: '', title: '', rating: '', likes: '', content: '', year: '' }
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    dataChange(e) {
        const { newMovie } = this.state
        newMovie[e.target.id] = e.target.value
        this.setState({
            newMovie: newMovie
        });
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
                                {
                                    data.map(({ id, label, placeholder }, i) => {
                                        return (
                                            <div className="form-group" key={i}>
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


    render() {
        return (
            <div>
                {this.newMoviesInfo()}
            </div>
        )
    }
}