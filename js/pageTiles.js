// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    WinJS.UI.Pages.define("/html/pageTiles.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = document.getElementById('fundraising-page-listview');
            addPageEventhandler();
            pageSelectedEventHandler(listView);
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
    
    function addPageEventhandler() {
        document.getElementById("addPageButton").addEventListener("click", function() {
            var pageName = pageNameText.value;
            if (pageName) {
                JustGivingWinJS.RecentPages.AddPage(pageName);
                JustGivingWinJS.RecentPages.SaveToRoamingData();
                PagesList.Pages.push(pageName);
                document.getElementById('fundraisingPageSearchFlyout').winControl.hide();
            }
            
        });
    }

    function pageSelectedEventHandler(listView) {
        listView.winControl.addEventListener('selectionchanged', function(evt) {
            if (listView.winControl.selection.count() > 0) {
                listView.winControl.selection.getItems().then(function(items) {
                    WinJS.Navigation.navigate("/html/fundraisingpage.html", items[0].data);
                });
            }
        });
    }

 
    var pagesList = function () {
        var pages = JustGivingWinJS.RecentPages.AllPages();
        var list = new WinJS.Binding.List();
        pages.forEach(function(item) {
            list.dataSource.insertAtEnd(null, item);
        });
        
        return {
            Pages: list
        };
    };

    WinJS.Namespace.define("PagesList", pagesList());

})();
