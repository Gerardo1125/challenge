import React from "react";

import './OverView.css'

const Overview = props=> {
	
		return (
			<div class="dash-view">
				<h2 class="view-heading">Here's your breakdown.</h2>
				<div>
                    <h4 class="card-heading">Your Weekly Outlook</h4>
                    <p class="card-subtitle">You are on track to hit your target this week.</p>
                    <div id="stats-container">
                        <div>
                            <h5 class="lg-nmbr">13</h5>
                            <p>Sales this week.</p>
                        </div>
                        <div>
                            <h5 class="lg-nmbr">87%</h5>
                            <p>Of your targets hit.</p>
                        </div>
                        <div>
                            <h5 class="lg-nmbr">5</h5>
                            <p>Sales this week.</p>
                        </div>
                        <div>
                            <h5 class="lg-nmbr">45</h5>
                            <p>Sales this week.</p>
                        </div>
                    </div>
	            </div>
			</div>
		);
	
}

export default Overview