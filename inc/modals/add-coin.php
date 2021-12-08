<div id="add-coin-modal" class="modal fade" role="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-coin"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <input type="number" name="id" value="" hidden>
                    <label for="amount">Amount:</label>
                    <input type="number" name="amount" min="1" value="" onchange="updateCoinVal(this.value)"><br>
                    <label for="priceUsd">Price usd:</label>
                    <input type="number" name="priceUsd" value="" require readonly><br>
                    <label for="totalValue">Total value</label>
                    <input type="number" name="totalValue" value="" require readonly><br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="add-coin" data-bs-dismiss="modal" class="add-coin btn btn-primary" type="submit">Create</button>
                </form>
            </div>
        </div>
    </div>
</div>