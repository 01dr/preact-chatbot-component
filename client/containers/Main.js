/**
 * Crafted by Aidar Ibatullin <amazing.space.invader@gmail.com>
 * 14.11.16
 */

import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './common/main.pcss';

class Main extends Component {
	render() {
		return (
			<div>
				hello, world!
			</div>
		);
	}
}

export default connect(() => ({}))(Main);
