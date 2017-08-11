<div id="hamburger">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div>
<div class="sidenav">
    <a href="index.php">Strona Główna</a>
    <?php $link = "sm.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    <?php $link = "kreacja.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    <?php $link = "www.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    <?php $link = "eventy.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    <?php $link = "about.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    <?php $link = "newbiz.php"; $text = include 'elements_menu_names.php'; echo '<a href="'.$link.'">'.$text .'</a> '?>
    
</div>


