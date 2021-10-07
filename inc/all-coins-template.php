<template id="all-coins-template">
    {{#data}}
    <tr>
        <td class="crypto-symbol">{{symbol}}</td>
        <td class="crypto-id">{{id}}</td>
        <td class="crypto-priceUsd">{{priceUsd}}</td>
        <td class="crypto-marketCapUsd">{{marketCapUsd}}</td>
        <td class="crypto-volumeUsd24Hr">{{volumeUsd24Hr}}</td>
        <td><button class="coins-info-btn button btn-primary" id="{{id}}">More info</button></td>
    </tr>
    {{/data}}
</template>