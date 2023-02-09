import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Splash from "./pages/Splash";
import Snippets from "./pages/Snippets";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{/* Homepage */}
				<Route index element={<Splash />} />

				{/* View All Blogs Page */}
				<Route path='/mysnippers' element={<Snippets />} />

				{/* Visit blog */}
				<Route path='/profile' element={<Profile />} />

				{/* 404 error */}
				<Route path='/error' element={<Error />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
