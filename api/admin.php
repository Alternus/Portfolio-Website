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
		if ($_POST["username"] == "" || (!isset($_POST["username"]) && ($_POST["username"] == null))) {
			echo("Login Error [0]");
		}
		elseif ($_POST["password"] == "" || (!isset($_POST["password"]) && ($_POST["password"] == null))) {
			echo("Login Error [1]");
		}
		else {
			$sql = $pdo->prepare( "SELECT * FROM adminlogin WHERE username=:username AND password=:password LIMIT 1;");

			$isInvalid = True;
			if ($sql->execute( [ ':username' => hash('sha256',strip_tags($_POST["username"])), ':password' => hash('sha256',strip_tags($_POST["password"])) ] )) {
				$result = $sql->fetch();
				if (isset($result["id"]) && $result["id"] !== null){
					$isInvalid = False;
					$sql = "select * from messages;";
					$messages = $pdo->query($sql);
					$array = array();
					foreach ($messages as $row2) {
						array_push($array,
							array("name" =>  $row2['name'],
							"email" => $row2['email'],
							"message" => $row2['message'],
							"timestamp" => $row2['time']
						));
					}
					echo(json_encode($array));
				}
			}
			if ($isInvalid == True) {
				echo("Login Error [2]");
			}
		}
	}
	else {
		echo ("Invalid API Call");
	}
?>
