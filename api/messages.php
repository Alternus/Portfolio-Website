<?php
	$db = parse_url(getenv("DATABASE_URL"));
	//$db = parse_url("postgres://fnruhhognjxibe:dcef3e6f4191e63a0a80412f5db7ec90e3949fd56ddca93708abc53dd1499401@ec2-35-174-88-65.compute-1.amazonaws.com:5432/dbki8vo9llemnj");

	$pdo = new PDO("pgsql:" . sprintf(
		"host=%s;port=%s;user=%s;password=%s;dbname=%s",
		$db["host"],
		$db["port"],
		$db["user"],
		$db["pass"],
		ltrim($db["path"], "/")
	));

	if (!$pdo) {
		echo("Database connection failed.");
	}
	elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
		if ($_POST["name"] == "" || (!isset($_POST["name"]) && ($_POST["name"] == null))) {
			echo("Contact Error [0]");
		}
		elseif ($_POST["email"] == "" || (!isset($_POST["email"]) && ($_POST["email"] == null))) {
			echo("Contact Error [1]");
		}
		elseif ($_POST["message"] == "" || (!isset($_POST["message"]) && ($_POST["message"] == null))) {
			echo("Contact Error [2]");
		}
		else {

			$sql = $pdo->prepare( "INSERT INTO messages (name, email, message) VALUES (:name, :email, :message);");

			$sql->execute([':name' => $_POST["name"], ':email' => $_POST["email"],':message' =>$_POST["message"]]);
			$result = $sql->fetch();

			echo("Contact Success");
		}
	}
	else {
		echo ("Invalid API Call");
	}
?>
