<template id="cryptofolio-template">
    {{#.}}
        <tr>
            <td class="crypto-id">{{id}}</td>
            <td class="crypto-priceUsd">{{price}}</td>
            <td class="crypto-marketCapUsd">{{amount}}</td>
            <td class='crypto-volumeUsd24Hr {{colorVolume}}'>{{total_value}}</td>
            <td><button class="button btn-primary" id="delete-coin">Delete</button></td>
        </tr>
    {{/.}}
</template>