<?php
	session_start();
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
		if($_POST['type'] == 'login') {
			if ($_POST["username"] == "" || !isset($_POST["username"])) {
				echo("Login Error [0]");
			}
			elseif ($_POST["password"] == "" || !isset($_POST["password"])) {
				echo("Login Error [1]");
			}
			else {
				$sql = $pdo->prepare( "SELECT * FROM adminlogin WHERE username=:username AND password=:password LIMIT 1;");

				$isInvalid = True;
				if ($sql->execute( [ ':username' => hash('sha256',$_POST["username"]), ':password' => hash('sha256',$_POST["password"]) ] )) {
					$result = $sql->fetch();
					if (isset($result["id"]) && $result["id"] !== null){
						$isInvalid = False;
						$_SESSION['user'] = "admin";
						$_SESSION['name'] = hash('sha256',$_POST["username"]);
					}
				}
				if ($isInvalid == True) {
					echo("Login Error [2]");
				}
			}
		}
		elseif($_POST['type'] == "delete") {
			if($_SESSION['user'] == 'admin') {
				$sql = $pdo->prepare( "DELETE FROM messages WHERE id=:id;");

				$isInvalid = True;
				if ($sql->execute( [ ':id' => $_POST["id"] ] )) {
					$isInvalid = False;
				}
				if ($isInvalid == True) {
					echo("Login Error [2]");
				}
			}
			else {
				echo("Your not an admin you cheecky bugger");
			}
		}
		elseif($_POST['type'] == "update") {
			if($_SESSION['user'] == 'admin') {
				if ($_POST["newPassword"] == "" || !isset($_POST["newPassword"])) {
					echo("Update Error [0]");
				}
				elseif ($_POST["oldPassword"] == "" || !isset($_POST["oldPassword"])) {
					echo("Update Error [1]");
				}
				else {
					$sql = $pdo->prepare( "UPDATE adminlogin SET password = :newPassword WHERE username=:username AND password = :oldPassword;");

					$isInvalid = True;
					if ($sql->execute( [ ':newPassword' => hash('sha256',$_POST["newPassword"]),':username' => $_SESSION['name'], ':oldPassword' => hash('sha256',$_POST["oldPassword"]) ] )) {
						$result = $sql->fetch();
						echo(($result));
						echo($_SESSION['name']);
					}
					if ($isInvalid == True) {
						echo("Update Error [2]");
					}
				}
			}
			else {
				echo("Your not an admin you cheecky bugger");
			}
		}

		if($_SESSION['user'] == 'admin') {
			$sql = "select * from messages;";
			$messages = $pdo->query($sql);
			$array = array();
			foreach ($messages as $row2) {
				array_push($array,
					array(
					"id" =>  $row2['id'],
					"name" =>  $row2['name'],
					"email" => $row2['email'],
					"message" => $row2['message'],
					"timestamp" => $row2['time']
				));
			}
			echo(json_encode($array));
		}
	}
	else {
		echo ("Invalid API Call");
	}
?>
