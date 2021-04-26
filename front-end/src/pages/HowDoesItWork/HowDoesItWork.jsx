import React, { Component } from 'react';
import AcumenDemo from '../../assets/videos/acumen-demo.mp4';
import './HowDoesItWork.scss';

export class HowDoesItWork extends Component {
	render() {
		return (
			<section className="how">
				<div className="how__container">
					<h2 className="how__heading">How Does Acumen Work?</h2>
					<div className="how__details-wrapper">
						<div className="how__details-container">
							<p className="how__text">
								To get a good understanding of how Acumen works, feel free to review the
								accompanying demo video which will give you a top-level overview of Acumen's key
								features.
							</p>
							<ul className="how__features-list">
								This demo covers:
								<li className="how__features-list-item">
									3rd Party Account Creation
								</li>
								<li className="how__features-list-item">
									Profile Creation/Editing
								</li>
								<li className="how__features-list-item">
									Video Recording
								</li>
								<li className="how__features-list-item">
									Video Bookmarking and Playback
								</li>
								<li className="how__features-list-item">
									Video Sharing (QR and Email)
								</li>
							</ul>
						</div>
					<video src={AcumenDemo} className="how__demo-video" controls/>
					</div>
				</div>
			</section>
		)
	}
}

export default HowDoesItWork
