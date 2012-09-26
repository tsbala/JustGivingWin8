(function() {
    "use strict";
    var app = WinJS.Application;
    var applicationData = Windows.Storage.ApplicationData.current;
    
    var fundraisingPage = WinJS.UI.Pages.define("/html/fundraisingpage.html", {
        ready: function () {
            var page = JustGivingWinJS.RecentPages.GetFirstItem();
            if (page) {
                displayFundraisingPage(page);
            }
        }
    });

    WinJS.Namespace.define("FundraisingPage", {
        FundraisingPageControl: fundraisingPage
    });
}());