
    <div id="wrap">
        


        <div id='form_wrap'>
            
           <?php

            if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['message']) === true) {

              if (urldecode($_GET['message']) === "success") {
                echo '<p class="alert success">Wiadomość wysłana! Odezwiemy się niebawem.</p>' ;
              } 
                else if  (urldecode($_GET['message']) === "failure") {
                echo '<p class="alert failure">Kłopoty z wysłaniem wiadomości. </p>' ;
              }
            }
            else echo '<p class="alert action">Napisz do nas wiadomość:</p>'

            ?>
            

            <form action="mailSender.php" method="POST">
                <label for="email">Wiadomość: </label>
                <textarea name="message" value="message" id="message" placeholder=""></textarea>
                <label for="name">Imię i nazwisko: </label>
                <input type="text" name="name" value="" id="name" />
                <label for="name">Telefon: <span class="error-one"></span></label>
                <input type="text" name="tel" value="+" id="tel" />
                <label for="email">Email: <span class="error-two"></span></label>
                <input type="text" name="email" value="" id="email" />
                <input type="submit" name="submit" value="Wysyłam!" />
            </form>
        </div>
    </div>
