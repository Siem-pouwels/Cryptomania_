<template id="add-coins-template">
    <div class="modal-content">
        {{#data}}
        <div class="modal-header">
            <h4 class="modal-title">{{id}}</h4>
        </div>
        <div class="modal-body">
            {{symbol}}
            {{id}}
            {{priceUsd}}
            {{marketCapUsd}}
            {{volumeUsd24Hr}}
            
            <form id="add-crypto-form" action="#" onsubmit="addCrypto();return false">
                <input id="add-amount" class="amount" name="add-amount" type="number"/>
                <button id="submit-crypto" type="submit">Add</button>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="add-coin-modal">Close</button>
        </div>
        {{/data}}
    </div>
</template>