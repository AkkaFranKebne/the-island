<?php
include 'elements_db_connection.php';


                        //$title = $_SERVER['SCRIPT_NAME'];
                        //$title = str_replace('/the-island/','', $title);
                        $title = 'eventy.php';
                        $sql = "SELECT * FROM lemoniada_test.galleries WHERE  url ='".$title."'  ORDER BY data_order ASC";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) { ?>
                                <picture class="<?php echo  $row["content_type"] ?>">
                                    <a href="#" title="<?php echo $row["name"] ?>">
                                        
                                        <img  
                                             class="<?php echo str_replace('mate','', $row["content_type"]); ?>"
                                             src="<?php  if ($row["content_type"]=='mate') {echo 'images/thumbnail_'.str_replace('images/','', $row["link"]); } else if ($row["content_type"]=='mate video') { echo 'images/thumbnail_'.basename($row["thumbnail"]); };?>" 
                                             alt="<?php echo $row["name"]; ?>" 
                                             data-source="<?php echo $row["link"]; ?>" 
                                             data-order="<?php echo $row["data_order"]; ?>">
                                        
                                        <div class='image-description'><h3><?php echo $row["surname"] ?></h3>
                                            
                                        <h3><?php echo $row["job_position"] ?></h3></div>
                                    </a>
                                </picture>
                            <?php
                                                                 }
                        } else {
                            echo "brak danych!";
                        }
                        $conn->close();
                    ?>

