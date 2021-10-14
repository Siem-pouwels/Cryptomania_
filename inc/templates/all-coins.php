<template id="all-coins-template">
    {{#data}}
        <tr>
            <!-- <td class="crypto-symbolLowerCase"><img src=""></img></td> -->
            <td class="crypto-symbol">{{symbol}}</td>
            <td class="crypto-id">{{id}}</td>
            <td class="crypto-priceUsd">{{priceUsd}}</td>
            <td class="crypto-marketCapUsd">{{marketCapUsd}}</td>
            <td class="crypto-volumeUsd24Hr">{{volumeUsd24Hr}}</td>
            <td><button class="coins-info-btn button btn-primary" id="{{id}}">More info</button></td>
            <td><button class="show-crypto-modal button btn-primary" id="{{id}}">Add</button></td>
        </tr>
    {{/data}}
    <!-- <input type="submit" value="Submit"> -->
</template>