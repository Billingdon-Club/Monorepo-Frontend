import "./style.css";
import Navbar from "../../components/Navbar";
export default function Splash(props) {
	return (
		<div
			className='splashMain'
			onMouseMove={(e) => {
				document.getElementById("cursorRadialGradient").style.top = `${
					e.pageY - 1500
				}px`;
				document.getElementById("cursorRadialGradient").style.left = `${
					e.pageX - 1500
				}px`;
			}}>
			<Navbar currentPage='splash' />

			<div className='cursorRadialGradient' id='cursorRadialGradient'></div>
			<div className='splashContent'>
				<h1 className='splashTitle'>monorepo</h1>
			</div>
		</div>
	);
}
