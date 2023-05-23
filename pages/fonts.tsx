import classNames from 'classnames';
import { Container } from '../components/Container';
import styles from './fonts.module.css';
function Fonts() {
	return (
		<Container scroll>
			<div className="contentWrapper">
				<h1>Fonts</h1>
				<hr />
				<div className="space30" />
				<div className={styles.tableLayout}>
					<h1 className={styles.quickBrown}>Quick Brown Fox Jumps</h1>
					<div className={styles.class}>{`<h1/>`}, .h1</div>
				</div>
				<div className={styles.tableLayout}>
					<h2 className={styles.quickBrown}>Quick Brown Fox Jumps</h2>
					<div className={styles.class}>{`<h2/>`}, .h2</div>
				</div>
				<div className={styles.tableLayout}>
					<h3 className={styles.quickBrown}>Quick Brown Fox Jumps</h3>
					<div className={styles.class}>{`<h3/>`}, .h3</div>
				</div>
				<div className={styles.tableLayout}>
					<h4 className={styles.quickBrown}>Quick Brown Fox Jumps</h4>
					<div className={styles.class}>{`<h4/>`}, .h4</div>
				</div>
				<div className={styles.tableLayout}>
					<h5 className={styles.quickBrown}>Quick Brown Fox Jumps</h5>
					<div className={styles.class}>{`<h5/>`}, .h5</div>
				</div>
				<div className={styles.tableLayout}>
					<p className={styles.quickBrown}>Quick Brown Fox Jumps</p>
					<div className={styles.class}>{`<p/>`}, .p, margin-bottom: 15px</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={styles.quickBrown}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.body</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'callout')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.callout</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'footnote')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.footnote</div>
				</div>
				<hr />
				<div className={styles.tableLayout}>
					<h1 className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</h1>
					<div className={styles.class}>{`<h1/>`}, .h1, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<h2 className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</h2>
					<div className={styles.class}>{`<h2/>`}, .h2, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<h3 className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</h3>
					<div className={styles.class}>{`<h3/>`}, .h3, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<h4 className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</h4>
					<div className={styles.class}>{`<h4/>`}, .h4, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<h5 className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</h5>
					<div className={styles.class}>{`<h5/>`}, .h5, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<p className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</p>
					<div className={styles.class}>{`<p/>`}, .p, .medium, margin-bottom: 15px</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'medium')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.body, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'callout', 'medium')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.callout, .medium</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'footnote', 'medium')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.footnote, .medium</div>
				</div>
				<hr />
				<div className={styles.tableLayout}>
					<h1 className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</h1>
					<div className={styles.class}>{`<h1/>`}, .h1, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<h2 className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</h2>
					<div className={styles.class}>{`<h2/>`}, .h2, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<h3 className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</h3>
					<div className={styles.class}>{`<h3/>`}, .h3, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<h4 className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</h4>
					<div className={styles.class}>{`<h4/>`}, .h4, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<h5 className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</h5>
					<div className={styles.class}>{`<h5/>`}, .h5, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<p className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</p>
					<div className={styles.class}>{`<p/>`}, .p, .bold, margin-bottom: 15px</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'bold')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.body, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'callout', 'bold')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.callout, .bold</div>
				</div>
				<div className={styles.tableLayout}>
					<div className={classNames(styles.quickBrown, 'footnote', 'bold')}>Quick Brown Fox Jumps</div>
					<div className={styles.class}>.footnote, .bold</div>
				</div>
			</div>
		</Container>
	);
}

export default Fonts;
