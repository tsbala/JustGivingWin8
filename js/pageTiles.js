// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/html/pageTiles.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = document.getElementById('fundraising-page-listview');
            listView.winControl.itemTemplate = pageTemplateFunction;
        },

    });

    var pageTemplateFunction = function(pagePromise) {
        return pagePromise.then(function (page) {
            return JustGivingWinJS.GetFundraisingPage(page.data)
                .then(function (data) {
                     return JustGivingWinJS.DisplayFundraisingPageDetails(data, "fundraising-page-tile");
                });
        });
    };
 
    var pagesList = function () {
        var pages = JustGivingWinJS.RecentPages.AllPages();
        var list = new WinJS.Binding.List(pages);
        
        return {
            Pages: list
        };
    };

    WinJS.Namespace.define("PagesList", pagesList());

})();
