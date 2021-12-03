<!-- <div id="login-account-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Login</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="login-account-modal">Close</button>
            </div>
        </div>
    </div>
</div> -->

<div id="login-account-modal" class="modal fade" role="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Login</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="login-account-form">
                    <input id="email-login" class="amount" name="email-login" type="email" placeholder="Email"/>
                    <input id="password-login" class="amount" name="password-login" type="password" placeholder="Password" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="login-account" class="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</div>