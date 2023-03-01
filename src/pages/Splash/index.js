import "./style.css";
import Navbar from "../../components/Navbar";
export default function Splash(props) {
	return (
		<div>
			<Navbar currentPage='splash'/>
			<div className='splashContent'>
				<div className='splashBody'>
					<br />
					Welcome to Monorepo!<br />
					<br />
					We are navigating around with keyboards and pointing devices! <br />
					<br />
					You can copy and paste as usual: paste will create a new snippet, and copy
					can be captured from any selection of the content or you can use the round clipboard
					button on the right to copy the whole snippet. <br />
					<br />
					Delete also has its own round button on the left, should you wish to remove
					a snippet. <br />
					<br />
					Languages are automatically detected, although you may need to use the
					dropdown menu to select manually, above the snippet on the left hand side. <br />
					<br />
					To get started, register or log in from the navbar at the top of the page; you will also have a profile associated with your account, which you can always access from the icon in the top right corner. <br />
				</div>
			</div>
		</div>
	);
}
