<?php include('inc/layouts/header.php'); ?>

<body class="m-0">
    <?php include('inc/layouts/navbar.php'); ?>
    <?php include('inc/templates/cryptofolio.php'); ?>
    <?php include('inc/modals/edit-coin.php'); ?>

    <div class="container" id="cryptofolio-table">
        <table class="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total price</th>
                <th>Delete</th>
            </tr>
            <tbody id="tbody-portfolio">

        </tbody>
        </table>
    </div>

    <?php include('inc/layouts/scripts.php'); ?>

</body>
<?php include('inc/layouts/footer.php'); ?>

</html>