﻿    "use strict";
    var JustGivingWinJS = JustGivingWinJS || { };

    JustGivingWinJS.RecentPages = function() {
        var pages = [];
        var settings = Windows.Storage.ApplicationData.current.roamingSettings;
        
        function addPage(pageName) {
            if (pages.indexOf(pageName) === -1) {
                pages.push(pageName);
            }
        }

        function recentPagesAsJson() {
            return JSON.stringify(pages);
        }

        function loadPages(jsonString) {
            pages = JSON.parse(jsonString);
        }

        function getFirstItem() {
            if (pages && pages.length > 0) {
                return pages[0];
            }

            return undefined;
        }

        function allPages() {
            return pages;
        }
        
        function saveToRoamingData() {
            settings.values.insert("RecentPages", recentPagesAsJson());
        }
        
        function roamingDataPresent() {
            return settings.values["RecentPages"];
        }
        
        function loadFromRoamingData() {
            if (roamingDataPresent()) {
                pages = JSON.parse(settings.values["RecentPages"]);
            }
        }

        return {
            AddPage: addPage,
            ToJson: recentPagesAsJson,
            FromJson: loadPages,
            GetFirstItem: getFirstItem,
            SaveToRoamingData: saveToRoamingData,
            LoadFromRoamingData: loadFromRoamingData,
            AllPages: allPages
        };
    }();


var obj = JustGivingWinJS.RecentPages;