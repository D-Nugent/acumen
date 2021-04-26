import './About.scss';

function About () {

	return (
		<section className="about">
			<div className="about__container">
				<h2 className="about__heading">About Acumen</h2>
				<p className="about__text">
					Created by David Nugent, Acumen is a web app designed to change the way that employers and 
					candidates look at recruitment. Consider the way that technology 
					and the internet of things have revolutionized all that is around us. 
					We have only just touched the surface of what is possible with 
					the recruitment process but unfortunately <span className="about__emph">we 
					have been working in the wrong direction</span>.
				</p>
				<p className="about__text">
					Current tech application in the recruitment scope have worked to make
					the recruitment process more exclusive rather than inclusive. Acumen 
					is not a tool to filter candidates, nor is it a tool to rate candidate 
					eligibility based on arbitrary metric mapping. Rather it is a tool 
					focused on connecting prospective candidates with employers.
				</p>
				<p className="about__text">
					Nothing is more demotivating for the average applicant than applying 
					for a job with a company they love and to not have the opportunity 
					to interview. It is smart for companies to be risk-averse, it is not
					smart for companies to be opportunity-averse. 
				</p>
				<p className="about__text">
					This is not the fault of the recruiter. Many would love the opportunity
					to speak with every candidate and truly get to learn who they are as an 
					individual and a professional. They simply don't have the time to schedule
					interviews with everyone. <span className="about__emph">Acumen is here to help</span>. 
				</p>
				<p className="about__text">
					By allowing candidates the opportunity to record interviews of themselves,
					either pre-prepared on in a real-time environment. Prospective employers can
					more easily schedule the time to review candidates, review only the answers that
					matter most to them, they can direct interview questions, share candidates with
					team members, avoid the difficulty of timezones and more.
				</p>
				<p className="about__text">
					Lets start making recruitment inclusive and invest in people again.
				</p>
			</div>
		</section>
	)
}

export default About
