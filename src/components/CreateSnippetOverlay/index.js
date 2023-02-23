import "./style.css";

export default function CreateSnippetOverlay(props) {
	return (
		<div
			className='createSnippetOverlayMain'
			id='createSnippetOverlayMain'
			onClick={() => {
				document
					.getElementById("createSnippetOverlayMain")
					.classList.toggle("changeSnippetOverlayAppearence");
			}}
			onTransitionEnd={() => {
				if (
					window.getComputedStyle(
						document.getElementById("createSnippetOverlayMain")
					).opacity === "0"
				) {
					document.getElementById("createSnippetOverlayMain").style.display = "none";
				}
			}}>
			<div className='snippetOverlayInnerContent'>Inner Content</div>
		</div>
	);
}
