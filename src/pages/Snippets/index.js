import {useContext, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {MonorepoContext} from "../../context/MonorepoContext";
import "./style.css";

export default function Snippets(props) {
	const {jwToken, setJwToken} = useContext(MonorepoContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const navigate = useNavigate();

	const getAccessToken = async () => {
		const token = searchParams.has("t") ? searchParams.get("t") : null;
		if (token && (jwToken === null || jwToken == "null" || jwToken === "")) {
			console.log(jwToken);
			localStorage.setItem("monorepo_jwt_token", token ?? jwToken);
			setJwToken(token);
		}
		searchParams.delete("t");
		setSearchParams(searchParams);
	};
	useEffect(() => {
		getAccessToken();
		if (!jwToken) {
			navigate("/");
		}
	}, []);
	return (
		<div className='snippetsMain'>
			<Navbar currentPage='snippets' />
			<h1 className='snippetsPageTitle'>My Snippets</h1>
		</div>
	);
}
