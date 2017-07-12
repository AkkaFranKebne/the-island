<?php

//use the library
require 'PHPMailerAutoload.php';

// email and admin name
define('ADMIN_NAME', "Admin");
define('ADMIN_MAIL', "wp_1@lokori.atthouse.pl");

//check if data was send by POST method and attach them to variables  
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(
      (isset($_POST['name']) === true)
  && (isset($_POST['email']) === true)
  && (isset($_POST['tel']) === true) 
  && (isset($_POST['message']) === true)
  ) {
      $userName = $_POST['name'];
      $userEmail = $_POST['email'];
      $userTel = $_POST['tel'];
      $message = $_POST['message'];
      
      $clientEmail = 'ewawrobel@gmail.com';
      $clientName = 'NOWA WIADOMOSC NA LEMONHILLS.PL';
    
      //start the library
      $mail = new PHPMailer;
      
      //dodane: send email parameters
      
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'lokori.atthouse.pl';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'wp_1@lokori.atthouse.pl';                 // SMTP username
        $mail->Password = 'Nc6DPQCI0O#m3';                           // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to
      

    //send email  
      
        $mail->setFrom (ADMIN_MAIL, ADMIN_NAME) ;
        $mail->addAddress($clientEmail, $clientName);
        $mail->Subject  = $clientName.", od: ".$userName;
        $mail->Body     = "NADAWCA: ".$userName."; E-MAIL: ".$userEmail."; TELEFON: ".$userTel."; WIADOMOSC: ".$message;
    
      //redirect to the feedback info page using GET
      
     if($mail->send()) {
        $message = urlencode("Wiadomosc zostala wyslana, odezwiemy sie wkrotce!");
    } 
      else {
        $message = urlencode("Wystapil blad, sprobuj ponownie.");
    }
    header("Location: newbiz.php?message=$message");

}
    
}

?>

echo 'Mailer error: ' . $mail->ErrorInfo;