import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import classNames from 'classnames/bind';
import s from './message.pcss';

import barney from './images/barney.png';
import admin from './images/admin.png';

export default class Message extends Component {
	render() {
		const st = classNames.bind(s);
		const {type, author, text} = this.props;

		return (
			<div className={s.wrapper}>
				{type === 'incoming'
				? <img className={s.avatar} src={author === 'admin' ? admin : barney}/>
				: null}
				<div className={ st('message', type) }>
					{text}
				</div>
			</div>
		);
	}
}
