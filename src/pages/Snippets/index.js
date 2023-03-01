import {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {MonorepoContext} from "../../context/MonorepoContext";
import "./style.css";
import fetchInfo from "../../utils/fetchInfo";

import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import "prismjs/components";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-go";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";

import "prismjs/themes/prism-tomorrow.css";

import HighlightableButton from "../../components/HighlightableButton";

export default function Snippets(props) {
	const {jwToken, setJwToken} = useContext(MonorepoContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const [messageText, setMessageText] = useState("");

	const [allUserSnippets, setAllUserSnippets] = useState([]);

	const navigate = useNavigate();

	const getAccessToken = async () => {
		const token = searchParams.has("t") ? searchParams.get("t") : null;
		if (token && (jwToken === null || jwToken == "null" || jwToken === "")) {
			localStorage.setItem("monorepo_jwt_token", token ?? jwToken);
			setJwToken(token);
		}
		searchParams.delete("t");
		setSearchParams(searchParams);
	};

	function getSelectionText() {
		var text = "";
		var activeEl = document.activeElement;
		var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
		if (
			activeElTagName == "textarea" &&
			typeof activeEl.selectionStart == "number"
		) {
			text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
		} else if (window.getSelection) {
			text = window.getSelection().toString();
		}
		return [text, activeEl.selectionStart, activeEl.selectionEnd];
	}

	const getAllUserSnippets = async () => {
		const allUserSnippetsQuery = await fetchInfo(
			"/snippets/",
			"GET",
			null,
			jwToken
		);
		if (allUserSnippetsQuery.snippets) {
			setAllUserSnippets(allUserSnippetsQuery.snippets);
			console.log(allUserSnippetsQuery.snippets);
		}
	};
	useEffect(() => {
		getAccessToken();
		if (!jwToken) {
			navigate("/");
		}

		getAllUserSnippets();
	}, []);

	return (
		<>
			<div
				className='snippetsMain'
				onPasteCapture={async (e) => {
					if (e.target.tagName !== "TEXTAREA") {
						const pastedSnippet = await navigator.clipboard.readText();

						const createdSnippet = await fetchInfo(
							"/snippets/",
							"POST",
							{
								content: pastedSnippet,
							},
							jwToken
						);

						if (createdSnippet.success) {
							getAllUserSnippets();
						}
					}
				}}>
				<Navbar currentPage='snippets' />
				<div className='snippetsHeader'>
					<h1 className='snippetsPageTitle'>my snippets</h1>
					<h2
						id='snippetsMessageText'
						onTransitionEnd={() => {
							if (
								document.getElementById("snippetsMessageText").style.display !== "none"
							) {
								document.getElementById("snippetsMessageText").style.display = "none";
							}
						}}>
						{messageText}
					</h2>
					<h4 className='snippetsPageSubtitle'>
						Paste anywhere on the page
						<br />
						to create a snippet
					</h4>
				</div>
				<div className='snippetView'>
					{allUserSnippets.map((obj, ind) => {
						const objID = `snippet/${obj._id}`;
						console.log(objID);
						const languageMap = {
							c: {language: languages.c, shorthand: "c"},
							"c++": {language: languages.cpp, shorthand: "cpp"},
							css: {language: languages.css, shorthand: "css"},
							html: {language: languages.html, shorthand: "html"},
							go: {language: languages.go, shorthand: "go"},
							java: {language: languages.java, shorthand: "java"},
							javascript: {language: languages.js, shorthand: "js"},
							python: {language: languages.python, shorthand: "python"},
							ruby: {language: languages.ruby, shorthand: "ruby"},
						};
						const currentlyUnfunctionalLanguages = ["php", "cpp", "c"];
						return (
							<div className='individualSnippetView' id={`main/${objID}`}>
								<HighlightableButton
									title='🗑'
									onClick={async () => {
										console.log("delete clicked");
										const didDelete = await fetchInfo(
											`/snippets/${obj._id}`,
											"DELETE",
											null,
											jwToken
										);
										if (didDelete.success) {
											document
												.getElementById(`main/${objID}`)
												.classList.add("snippetDeleted");
										}
									}}
								/>
								<div className='mainSnippetContent'>
									<div className='snippetsTitleTray'>
										<h4>
											<select
												id={`select/${objID}`}
												value={obj.language}
												style={{
													background: "rgb(0, 0, 0, 0.3)",
													border: "none",
													color: "white",
												}}
												onChange={async (event) => {
													const newArr = [...allUserSnippets];
													newArr[ind].language = event.target.value;
													setAllUserSnippets(newArr);

													const val = event.target.value;
													const result = await fetchInfo(
														`/snippets/${obj._id}`,
														"PATCH",
														{
															language: val,
														},
														jwToken
													);
													if (result.success) {
														console.log(`Snippet ${obj._id} language successfully updated`);
													} else {
														console.log(result);
													}
												}}>
												<option value={"c"}>C</option>
												<option value={"c++"}>C++</option>
												<option value={"css"}>CSS</option>
												<option value={"html"}>HTML</option>
												<option value={"go"}>Go</option>
												<option value={"java"}>Java</option>
												<option value={"javascript"}>JavaScript</option>
												<option value={"php"}>PHP</option>
												<option value={"python"}>Python</option>
												<option value={"ruby"}>Ruby</option>
												<option value={"unknown"}>Unknown</option>
											</select>
										</h4>
									</div>
									<div className='editorHolder'>
										<Editor
											value={obj.content}
											padding={10}
											textareaId={objID}
											tabSize={2}
											onKeyDown={(e) => {
												console.log(e.key);
												if (e.metaKey && e.key === "[") {
													e.preventDefault();
													const [text, selectionStart, selectionEnd] = getSelectionText();
													const split = text.split("\n");
													console.log(split);
													for (let line = 0; line < split.length; line++) {
														if (split[line].startsWith("\t")) {
															split[line] = split[line].slice(2);
														}
													}
													const contentWithTabIndentation =
														e.target.value.slice(0, selectionStart + 1) +
														split.join("\n") +
														e.target.value.slice(selectionEnd);

													const newArr = [...allUserSnippets];
													newArr[ind].content = contentWithTabIndentation;
													setAllUserSnippets(newArr);
												}
											}}
											onValueChange={(code) => {
												const newArr = [...allUserSnippets];
												newArr[ind].content = code;
												setAllUserSnippets(newArr);
											}}
											onBlur={async () => {
												const val = document.getElementById(objID).value;
												const result = await fetchInfo(
													`/snippets/${obj._id}`,
													"PATCH",
													{
														content: String(val),
													},
													jwToken
												);
												console.log(result);
												if (result.success) {
													console.log(`Snippet ${obj._id} successfully updated`);
												} else {
													console.log(result);
												}
											}}
											highlight={(code) => {
												if (
													obj.language !== "unknown" &&
													!currentlyUnfunctionalLanguages.includes(obj.language)
												)
													return highlight(
														code,
														languageMap[obj.language].language,
														languageMap[obj.language].shorthand
													);
												return code;
											}}
											className='container__editor'
										/>
									</div>
								</div>
								<HighlightableButton
									title='📋'
									onClick={async () => {
										const content = document.getElementById(objID).value;
										await navigator.clipboard.writeText(content);
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
