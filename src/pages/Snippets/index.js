import {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {MonorepoContext} from "../../context/MonorepoContext";

export default function Snippets(props) {
	const {jwToken, setJwToken} = useContext(MonorepoContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const getAccessToken = async () => {
		const token = searchParams.has("t") ? searchParams.get("t") : null;
		if (token || jwToken) {
			localStorage.setItem("monorepo_jwt_token", token ?? jwToken);
			setJwToken(token ?? jwToken);
		}
		searchParams.delete("t");
		setSearchParams(searchParams);
	};
	useEffect(() => {
		getAccessToken();
	}, []);
	return <h1>Stuff: {jwToken}</h1>;
}
