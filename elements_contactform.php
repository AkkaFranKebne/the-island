
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
            

            <form id='contact-form' action="mailSender.php" method="POST">
                <div class='row'>
                    <div class='col-6'>
                        <label for="name">Imię </label> 
                        <input type="text" name="name" value="" id="name" />   
                        <label for="tel">Numer telefonu <span class="error-one"></span></label>
                        <input type="text" name="tel" value="+" id="tel" />
                    </div>   
                    <div class='col-6'>
                        <label for="surname">Nazwisko </label> 
                        <input type="text" name="surname" value="" id="surname" />
                        <label for="email">e-mail <span class="error-two"></span></label>
                        <input type="text" name="email" value="" id="email" />                      
                    </div>  
                </div>
                <div class='row'>
                     <div class='col-12'>
                          <label for="message">Wiadomość </label>
                        <textarea name="message" value="message" id="message" placeholder=""></textarea>                
                    </div>                     
                </div>
                <input type="submit" name="submit" value="Wysyłam!" />
            </form>
        </div>
    </div>
