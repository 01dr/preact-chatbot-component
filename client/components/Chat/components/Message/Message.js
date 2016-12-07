import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import classNames from 'classnames/bind';
import s from './message.pcss';

import barney from './images/barney.png';

export default class Message extends Component {
	render() {
		const st = classNames.bind(s);
		const {type, text} = this.props;

		return (
			<div className={s.wrapper}>
				{type === 'incoming'
				? <img className={s.avatar} src={barney}/>
				: null}
				<div className={ st('message', type) }>
					{text}
				</div>
			</div>
		);
	}
}
