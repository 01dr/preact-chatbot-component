import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import s from './startButton.pcss';

class StartButton extends Component {
	render() {
		return (
			<div className={s.broBot}>
				<button className={s.startButton}></button>
			</div>
		);
	}
}

export default connect(() => ({}))(StartButton);
