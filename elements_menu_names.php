<?php
                        $title = $link;
                        $sql = "SELECT name FROM lemoniada_test.krainy WHERE url ='".$title."'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                return $row["name"];
                            }
                        } else {
                            return "brak danych!";
                        }
                    ?>