import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import s from './chatHeader.pcss';

import barney from './images/barney.png';

class ChatHeader extends Component {
	render() {
		return (
			<div className={s.header}>
				<div className={s.avatar}>
					<img src={barney}/>
				</div>
				<div className={s.name}>Барни</div>
			</div>
		);
	}
}

export default connect(() => ({}))(ChatHeader);
