// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll()
                .then(function () {
                    $('button').click(function (e) {
                        JustGivingWinJS.GetFundraisingPage($('input').val())
                                       .done(function (data) {
                                           JustGivingWinJS.DisplayFundraisingPageDetails(data);
                                       });
                    });
                }));
        }
        console.log('Activated');
    };

    app.onready = function () {
        console.log('Ready');
    };

    app.onloaded = function () {
        console.log('Loaded');
    };

    app.onunload = function () {
        console.log('Unloaded');
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();

var JustGivingWinJS = {};

JustGivingWinJS.ApiKey = 'e682f19f';

JustGivingWinJS.GetFundraisingPage = function (pageShortUrl) {
    var url = 'https://api.justgiving.com/' + JustGivingWinJS.ApiKey + '/v1/fundraising/pages/' + pageShortUrl;
    return WinJS.xhr({url: url, headers: {'content-type' : 'application/json' }});
};

JustGivingWinJS.DisplayFundraisingPageDetails = function (data) {
    var template = document.getElementById('fundraising-page');
    var renderElement = document.getElementById('fundraising-page-details');
    var page = JSON.parse(data.responseText);
    page.CharityLogoUrl = 'http://www.justgiving.com/Utils/Imaging.ashx?width=120&imageType=charitybrandinglogo&img=' + page.charity.logoUrl;
    template.winControl.render(page, renderElement);
};
