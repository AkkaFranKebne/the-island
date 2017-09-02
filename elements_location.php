


<div id="location">
</div>
<!--- google maps script ----->
<script>
    function initMap() {
        var uluru = {
            //lat: 51.031836, lng: 16.97143989999995
            <?php  $title = 'coord'; include 'elements_address.php';?>
        };
        var map = new google.maps.Map(document.getElementById('location'), {
            zoom: 17,
            center: uluru
        });

        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Kliknij by otworzyc duzą mapę.'
        });

        map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the marker. 
            window.setTimeout(function() {
                map.panTo(marker.getPosition());
            }, 3000);
        });
        marker.addListener('click', function() {
            window.open("https://www.google.pl/maps/place/LemOnHills+Agencja+Marketingowa/@51.0318394,16.9692459,17z/data=!3m1!4b1!4m5!3m4!1s0x470fc40bc5806521:0x42f2e2687c8118da!8m2!3d51.031836!4d16.97144", '_blank');
        });
    }

</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCz4mH-_dyTC-Jhy4rdINwblNsRzG87evg&callback=initMap"  //code changed>


</script>
§                                       