<?php include('inc/layouts/header.php'); ?>

<body class="m-0">
    <?php include('inc/layouts/navbar.php'); ?>
    <!-- Modals -->
    <?php include('inc/modals/add-coin.php'); ?>
    <?php include('inc/modals/more-info.php'); ?>
    <?php include('inc/modals/create-account.php'); ?>
    <?php include('inc/modals/login-account.php'); ?>
    <!-- /Modals -->
    <?php include('inc/crypto-table.php'); ?>
    <div class="loading-container"><img src="images/loading.gif"></img></div>
    <!-- Templates -->
    <?php include('inc/templates/all-coins.php'); ?>
    <!-- /Templates -->
    <?php include('inc/layouts/scripts.php'); ?>
</body>

<?php include('inc/layouts/footer.php'); ?>

</html>