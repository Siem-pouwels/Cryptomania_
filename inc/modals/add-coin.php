<!-- <div id="add-coin-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content" id="add-coin-modal" aria-hidden="true">
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
                    <input id="add-amount" class="amount" name="add-amount" type="number" />
                    <button id="submit-crypto" type="submit">Add</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="add-coin-modal">Close</button>
            </div>
            {{/data}}
        </div>
    </div>
</div> -->

<div id="add-coin-modal" class="modal fade" role="modal">
    <div class="modal-dialog">
        <div class="modal-content" id="add-coin-modal">
            {{#.}}
                <div class="modal-header">
                    <h5 class="modal-title">Add coin {{id}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{symbol}}
                    {{id}}
                    {{priceUsd}}
                    {{marketCapUsd}}
                    {{volumeUsd24Hr}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="create-house" data-bs-dismiss="modal" class="btn-edit btn btn-primary" type="submit">Create</button>
                </div>
            {{/.}}
        </div>
    </div>
</div>