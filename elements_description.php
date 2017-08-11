            <?php
                        $title = $_SERVER['SCRIPT_NAME'];
                        $title = str_replace('/the-island/','', $title);
                        $sql = "SELECT description FROM lemoniada_test.krainy WHERE url ='".$title."'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo $row["description"];
                            }
                        } else {
                            echo "brak danych!";
                        }
                        $conn->close();
                    ?>