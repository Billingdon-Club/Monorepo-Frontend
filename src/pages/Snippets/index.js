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
				<HighlightableButton title='+' />
			</div>
			<div className='snippetView'>
				{allUserSnippets.map((obj, ind) => {
					console.log(obj);
					const objID = `snippet/${obj.id}`;
					return (
						<div className='individualSnippetView' id={`main/${objID}`}>
							<HighlightableButton
								title='🗑'
								onClick={async () => {
									console.log("delete clicked");
									const didDelete = await fetchInfo(
										`/snippets/${obj.id}`,
										"DELETE",
										null,
										jwToken
									);

									console.log(didDelete);

									if (didDelete.success) {
										document
											.getElementById(`main/${objID}`)
											.classList.add("snippetDeleted");
									}
								}}
							/>
							<div className='mainSnippetContent'>
								<div className='snippetsTitleTray'>
									<h2>{obj.title}</h2>
									<h2>{obj.language}</h2>
								</div>
								<div className='editorHolder'>
									<div
										className='copyView'
										onClick={async () => {
											const content = document.getElementById(objID).value;
											await navigator.clipboard.writeText(content);

											document.getElementById(`header/${objID}`).innerText =
												"content copied";
										}}
										onMouseLeave={() => {
											if (
												(document.getElementById(`header/${objID}`).innerText =
													"content copied")
											) {
												document.getElementById(`header/${objID}`).innerText =
													"copy content";
											}
										}}>
										<div>
											<h2 id={`header/${objID}`}>copy content</h2>
										</div>
									</div>
									<Editor
										value={obj.content}
										padding={10}
										textareaId={objID}
										onValueChange={(code) => code}
										highlight={(code) => highlight(code, languages.js, "js")}
										className='container__editor'
									/>
								</div>
							</div>
							<HighlightableButton title='✎' />
						</div>
					);
				})}
			</div>
		</div>
	);
}
