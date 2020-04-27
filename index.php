<?php

	echo("<script>console.log('PHP: Hello World');</script>");
	$db = parse_url(getenv("DATABASE_URL"));


	$pdo = new PDO("pgsql:" . sprintf(
		"host=%s;port=%s;user=%s;password=%s;dbname=%s",
		$db["host"],
		$db["port"],
		$db["user"],
		$db["pass"],
		ltrim($db["path"], "/")
	));



	if (!$pdo) {
		echo("<script>console.log('PHP: Database connection failed.');</script>");
	}
	else {
		echo("<script>console.log('PHP: Database connection success.');</script>");

		$sql = "SELECT name FROM message";
		foreach ($pdo->query($sql) as $row)
		{
			echo("<script>console.log('PHP: " . $row['name'] ."');</script>");
		}
	}

?>

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=0.8">
		<title>Mitchell Wills | Portfolio</title>
		<link rel="stylesheet" type="text/css" href="./css/style.css">
		<link rel="stylesheet" type="text/css" href="./css/navbar.css">
		<link rel="stylesheet" type="text/css" href="./css/portfolio.css">
		<link rel="stylesheet" type="text/css" href="./css/contact.css">
		<link rel="stylesheet" type="text/css" href="./css/skillsCard.css">
		<link rel="stylesheet" type="text/css" href="./css/educationAwardsCard.css">
	</head>
	<body>
		<div id="main">
		</div>

		<script src="./reactJS/react.js"></script>
		<script src="./reactJS/react-dom.js"></script>
		<script src="./dist/app/bundle.js"></script>
	</body>
</html>
