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
            addFundraisingPage();
        }
    });

    WinJS.Namespace.define("FundraisingPage", {
        FundraisingPageControl: fundraisingPage
    });

    function addFundraisingPage() {
        document.getElementById("addPageButton").addEventListener("click", function() {
            var pageName = pageNameText.value;
            if (pageName) {
                displayFundraisingPage(pageName);
            }
        });
    }

    function displayFundraisingPage(pageName) {
        
        JustGivingWinJS.GetFundraisingPage(pageName)
            .then(function (data) {
                JustGivingWinJS.RecentPages.AddPage(pageName);
                JustGivingWinJS.RecentPages.SaveToRoamingData();
                JustGivingWinJS.DisplayFundraisingPageDetails(data);
            });
    }
}());