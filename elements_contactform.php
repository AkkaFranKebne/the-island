<?php

            if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['message']) === true) {

              if (urldecode($_GET['message']) === "Wiadomosc zostala wyslana, odezwiemy sie wkrotce!") {
                echo '<div class="alert alert-success" style="display: block; color: green; font-size: 24px; text-align: center; ">' . urldecode($_GET['message']) . '</div>' ;
              } 
                else if  (urldecode($_GET['message']) === "Wystapil blad, sprobuj ponownie.") {
                echo '<div class="alert alert-success" style="display: block; font-size: 24px; text-align: center; ">' . urldecode($_GET['message']) . '</div>' ;
              }
            } 

            ?>


    <div id="wrap">

        <div id='form_wrap'>

            <form action="mailSender.php" method="POST">
                <p>Drogie Lemonhills!,</p>
                <label for="email">Wiadomosc : </label>
                <textarea name="message" value="message" id="message" placeholder=""></textarea>
                <p>Pozdrawiam,</p>
                <label for="name">Imię i nazwisko: </label>
                <input type="text" name="name" value="" id="name" />
                <label for="name">Telefon: <span class="alert alert-danger error-one"></span></label>
                <input type="text" name="tel" value="+" id="tel" />
                <label for="email">Email: <span class="alert alert-danger error-two"></span></label>
                <input type="text" name="email" value="" id="email" />
                <input type="submit" name="submit" value="Wysyłam!" />
            </form>
        </div>
    </div>
