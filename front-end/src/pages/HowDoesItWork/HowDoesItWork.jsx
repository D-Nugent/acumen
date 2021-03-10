import React, { Component } from 'react';
import './HowDoesItWork.scss';

export class HowDoesItWork extends Component {
    render() {
        return (
            <div className="how">
                <div className="how__container">
                    <h2 className="how__container-heading">Well, this is awkward...</h2>
                    <p className="how__container-text">It looks as though you were looking for our<span className="how__emph">'How Does It Work'</span> page.</p>
                    <p className="how__container-text">We were just getting ready for you. But you're a week early. Come see us on 03-16-20!</p>
                </div>
            </div>
        )
    }
}

export default HowDoesItWork
