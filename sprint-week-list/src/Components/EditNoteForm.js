import React from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

import styles from '../css/EditNoteForm.css';

class EditNoteForm extends React.Component{
    constructor(){
        super()
        this.state = {
          title : '',
          textBody : '',
        }
    }
    inputHandler = (event) =>{
        this.setState({[event.target.name] : event.target.value})
    }
    fetchNote = id => {
        axios
        .get(`https://fe-notes.herokuapp.com/note/edit/${id}`)
        .then(response => {
            this.setState(() => ({ 
                title : response.data.title,
                textBody : response.data.textBody,
             }))
        })
        .catch(err => {
            console.error('Trouble fetching data',err)
        })
    }

    componentDidMount() {
        const id = this.props.match.params._id;
        this.fetchNote(id);
        
    }
    submitHandler = (event) =>{
        //event.preventDefault()
        const id = this.props.match.params._id;
        this.props.updateNote(id, this.state)
        this.setState({
            title : '',
            textBody : '',
        })
       
    }
    render(){
        return(
            <div className = 'edit-page-container'>
                <div className = 'sub-container'>
                    <h1 className = 'edit-header'>Edit Note:</h1>
                    <form className = 'form' onSubmit = {this.submitHandler}>
                        <input 
                            className = 'title-input'
                            type = 'text'
                            placeholder = 'Note Title'
                            value = {this.state.title}
                            name = 'title'
                            onChange = {this.inputHandler}/>
                        <input 
                            className = 'text-input'
                            type = 'text'
                            placeholder = 'Note Content'
                            value = {this.state.textBody}
                            name = 'textBody'
                            onChange = {this.inputHandler}/>    
                        <Link exact to = '/' >
                            <button className = 'submit-button' type = 'submit'>Save</button>
                        </Link>

                    </form>
                </div>
            </div>
        )
    }
}
export default EditNoteForm;