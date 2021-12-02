<template id="all-coins-template">
    {{#data}}
        <tr>
            {{colorVolume}}
            <td class="crypto-symbol"><img class="symbol-images" src="https://assets.coincap.io/assets/icons/{{symbolLowerCase}}@2x.png"></img>{{symbol}}</td>
            <td class="crypto-id">{{id}}</td>
            <td class="crypto-priceUsd">{{priceUsd}}</td>
            <td class="crypto-marketCapUsd">{{marketCapUsd}}</td>
            <td class='crypto-volumeUsd24Hr {{colorVolume}}'>{{volumeUsd24Hr}}</td>
            <td><button class="coins-info-btn button btn-primary" data-bs-toggle="modal" data-bs-target="#more-info-modal">More info</button></td>
            <td><button class="button btn-primary open-add-coin-button" data-bs-toggle="modal" data-bs-target="#add-coin-modal">Add</button></td>
        </tr>
    {{/data}}
    <!-- <input type="submit" value="Submit"> -->
</template>