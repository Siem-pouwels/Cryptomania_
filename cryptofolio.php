<?php include('inc/layouts/header.php'); ?>

<body class="m-0">
    <?php include('inc/layouts/navbar.php'); ?>
    <?php include('inc/templates/cryptofolio.php'); ?>

    <div class="container" id="cryptofolio-table">
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total price</th>
                <th></th>
            </tr>
            <tbody>

            </tbody>
        </table>
    </div>

    <?php include('inc/layouts/scripts.php'); ?>

</body>
<?php include('inc/layouts/footer.php'); ?>

</html>