<?php
                    
                        $sql = "SELECT address_content FROM lemoniada_test.address WHERE address_element ='".$title."'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo $row["address_content"];
                            }
                        } else {
                            echo "brak danych!";
                        }
                    ?>