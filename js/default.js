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
                    JustGivingWinJS.RecentPages.LoadFromRoamingData();
                    return nav.navigate(Application.navigator.home);
                }));
        }
    });
    

    app.oncheckpoint = function (args) {
        JustGivingWinJS.RecentPages.SaveToRoamingData();
    };

    app.start();
})();
