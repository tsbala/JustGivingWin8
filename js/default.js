// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        var argument;
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.arguments !== "") {
                argument = args.detail.arguments;
            }

            args.setPromise(WinJS.UI.processAll()
                .then(function () {
                    var url = WinJS.Application.sessionState.lastUrl;
                    if (url) {
                        return nav.navigate(url);
                    }
                    JustGivingWinJS.RecentPages.LoadFromRoamingData();
                    return nav.navigate(Application.navigator.home);
                }));
        }
    });
    
    WinJS.Navigation.addEventListener("navigated", function (eventObject) {
        WinJS.Application.sessionState.lastUrl = eventObject.detail.location;
    });

    app.oncheckpoint = function (args) {
        JustGivingWinJS.RecentPages.SaveToRoamingData();
    };


    app.onerror = function(event) {
        var x = event;
        return true;
    };
    app.start();
})();
