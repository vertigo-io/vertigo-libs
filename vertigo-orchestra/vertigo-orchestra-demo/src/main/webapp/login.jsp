<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content=""/>
<meta name="author" content="Klee Group"/>
<title>Login</title>


<link rel="stylesheet" href="./static/login_assets/material.min.css"/>
<script defer src="./static/login_assets/material.min.js"></script>
<style>

/* latin */
@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	src: local('Roboto'), local('Roboto-Regular'),
		url(./static/login_assets/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
		U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
	font-family: 'Material Icons';
	font-style: normal;
	font-weight: 400;
	src: url(./static/login_assets/MaterialIcons-Regular.eot); /* For IE6-8 */
	src: local('Material Icons'), local('MaterialIcons-Regular'),
		url(./static/login_assets/MaterialIcons-Regular.woff2) format('woff2'),
		url(./static/login_assets/MaterialIcons-Regular.woff) format('woff'),
		url(./static/login_assets/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
	font-family: 'Material Icons';
	font-weight: normal;
	font-style: normal;
	font-size: 24px; /* Preferred icon size */
	display: inline-block;
	line-height: 1;
	text-transform: none;
	letter-spacing: normal;
	word-wrap: normal;
	white-space: nowrap;
	direction: ltr;
	/* Support for all WebKit browsers. */
	-webkit-font-smoothing: antialiased;
	/* Support for Safari and Chrome. */
	text-rendering: optimizeLegibility;
	/* Support for Firefox. */
	-moz-osx-font-smoothing: grayscale;
	/* Support for IE. */
	font-feature-settings: 'liga';
}

div.content  span, label, input {
	font-family: Roboto;
}
</style>
</head>
<body>

	<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
		<header class="mdl-layout__header">
		<div class="mdl-layout__header-row" style="background-color: #086DC1;">
			<!-- Title -->
			<span class="mdl-layout-title">Plateforme de médiation</span>
		</div>
		</header>

		<div class="content">
			<div class="form ">
				<form action="loginServlet" method="post" id="loginForm">
					<div>
						<div class="mdl-grid" style="width: 300px; margin-top: 30px">
							<div class="mdl-cell mdl-cell--12-col"
								style="text-align: center;">
								<div class="titre" style="padding: 20px 5px; font-size: 2em">
									<span> Identification </span>
								</div>
								<i class="material-icons" style="font-size: 100px; color: grey;">account_circle</i>
							</div>
							<div style="color: red; margin: auto;">
								<span>${errorMessage}</span>
							</div>
							<div class="mdl-cell mdl-cell--12-col">
								<div
									class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
									<input name="login" class="mdl-textfield__input" type="text" id="login"/>
									<label class="mdl-textfield__label" for="login">Login</label>
								</div>
							</div>
							<div class="mdl-cell mdl-cell--12-col">
								<div
									class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
									<input name="password" class="mdl-textfield__input" type="password" id="password"/> <label class="mdl-textfield__label" for="password">Mot de passe</label>
								</div>
							</div>
							<div class="mdl-cell mdl-cell--12-col"
								style="text-align: center;">
								<button
									class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
									style="background-color: #086DC1;"
									type="submit">Valider</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
</body>
</html>