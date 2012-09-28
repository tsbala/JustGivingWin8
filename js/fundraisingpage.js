(function() {
    "use strict";
    var app = WinJS.Application;
    var applicationData = Windows.Storage.ApplicationData.current;
    
    var fundraisingPage = WinJS.UI.Pages.define("/html/fundraisingpage.html", {
        ready: function (element, options) {
            var pageUrl = options;
            JustGivingWinJS.GetFundraisingPage(pageUrl)
                .then(function (data) {
                    var page = JustGivingWinJS.PageObjectFromResponse(data);
                    element.querySelector(".pageTitle").textContent = page.title;
                    JustGivingWinJS.DisplayFundraisingPageDetails(data, 'fundraising-page', 'fundraising-page-details');
                });
        }
    });

    WinJS.Namespace.define("FundraisingPage", {
        FundraisingPageControl: fundraisingPage
    });
}());