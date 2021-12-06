<template id="cryptofolio-template">
    {{#.}}
        <tr>
            <td class="crypto-id">{{id}}</td>
            <td class="crypto-name">{{name}}</td>
            <td class="crypto-priceUsd">{{price}}</td>
            <td class="crypto-amount">{{amount}}</td>
            <td class='crypto-total-value'>{{total_value}}</td>
            <td>
                <button class="button btn-warning edit-coin-open" data-bs-toggle="modal" data-bs-target="#edit-coin-modal">Edit</button>
                <button class="button btn-danger" id="delete-coin">Delete</button>
            </td>
        </tr>
    {{/.}}
</template>