import "./style.css";
import Navbar from "../../components/Navbar";
import HighlightableButton from "../../components/HighlightableButton";
export default function Splash(props) {
	return (
		<div>
			<Navbar currentPage='splash' />

			<div className='splashContent'>
				<div className='splashBody'>
					Welcome to Monorepo!
					<br />
					<br />
					We are navigating around with keyboards and pointing devices! <br />
					<br />
					You can copy and paste as usual: paste will create a new snippet, and copy
					can be from any selection of the content or you can use the round clipboard
					button on the right. <br />
					<br />
					Delete also has its own round button on the left, should you wish to remove
					a snippet. <br />
					<br />
					Languages are automatically detected, although you may need to use the
					dropdown menu to select manually, above the snippet on the left hand side.
				</div>
			</div>
		</div>
	);
}
