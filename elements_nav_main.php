<nav>
    <?php include 'elements_sideNav.php';?>
    <div class="container">
        <a href="index.php">
            <img class="block" id="logo" src="images/lemonhills.png" alt="" />
        </a>
    </div>
    <a href="index.php?source=<?php echo $_SERVER['SCRIPT_NAME'] ?>">
        <div id="close" class="hidden">
            <!-- fix for ie  moving logo -->
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    </a>
</nav>
