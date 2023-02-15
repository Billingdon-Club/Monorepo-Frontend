import {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {MonorepoContext} from "../../context/MonorepoContext";
import "./style.css";
import fetchInfo from "../../utils/fetchInfo";

import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import HighlightableButton from "../../components/HighlightableButton";

export default function Snippets(props) {
	const {jwToken, setJwToken} = useContext(MonorepoContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const [allUserSnippets, setAllUserSnippets] = useState([]);

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

	const getAllUserSnippets = async () => {
		const allUserSnippetsQuery = await fetchInfo(
			"/snippets/",
			"GET",
			null,
			jwToken
		);
		if (allUserSnippetsQuery.snippets) {
			setAllUserSnippets(allUserSnippetsQuery.snippets);
		}
	};
	useEffect(() => {
		getAccessToken();
		if (!jwToken) {
			navigate("/");
		}

		getAllUserSnippets();

		console.log();
	}, []);

	return (
		<div className='snippetsMain'>
			<Navbar currentPage='snippets' />
			<div className='snippetsHeader'>
				<h1 className='snippetsPageTitle'>my snippets</h1>
				<HighlightableButton title='add' />
			</div>
			<div className='snippetView'>
				{allUserSnippets.map((obj) => {
					console.log(obj);
					return (
						<div className='individualSnippetView'>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									width: "100%",
									justifyContent: "space-between",
								}}>
								<h2>{obj.title}</h2>
								<h2>{obj.language}</h2>
							</div>
							<Editor
								value={obj.content}
								padding={10}
								onValueChange={(code) => code}
								highlight={(code) => highlight(code, languages.js, "js")}
								className='container__editor'
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
