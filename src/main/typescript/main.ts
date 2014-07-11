/// <reference path="entity/Pickable.ts"/>
/// <reference path="entity/Category.ts"/>
/// <reference path="entity/Lecture.ts"/>
/// <reference path="entity/Section.ts"/>
/// <reference path="entity/Resource.ts"/>

/// <reference path="coursera/Categorizer.ts"/>
/// <reference path="coursera/FileRenamer.ts"/>
/// <reference path="coursera/Page.ts"/>
/// <reference path="coursera/Scraper.ts"/>

/// <reference path="coursera/resource/SupportedResources.ts"/>
/// <reference path="coursera/resource/SimpleCategorizer.ts"/>
/// <reference path="coursera/resource/SimpleFileRenamer.ts"/>

/// <reference path="metalink/BlobUrl.ts"/>
/// <reference path="metalink/ResourceRequestor.ts"/>
/// <reference path="metalink/Resolver.ts"/>
/// <reference path="metalink/Generator.ts"/>

/// <reference path="metalink/browser/BlobUrlImpl.ts"/>
/// <reference path="metalink/browser/ResourceRequestorImpl.ts"/>

/// <reference path="ui/Picker.ts"/>
/// <reference path="ui/Widget.ts"/>
/// <reference path="ui/MainController.ts"/>


GM_addStyle(style)

var supportedResources = new SupportedResources()
var categorizer = new SimpleCategorizer()
var fileRenamer = new SimpleFileRenamer(supportedResources)
var page = new Page(supportedResources)
var scraper = new Scraper(page, categorizer, fileRenamer)

var blobUrl = new BlobUrlImpl()
var resourceRequestor = new ResourceRequestorImpl()
var resolver = new Resolver(resourceRequestor)
var generator = new Generator(resolver, blobUrl, scraper.resources, scraper.categories)

var controller = new MainController(generator, scraper.lectures)
controller.createSectionPicker(scraper.sections, scraper.sectionDomHooks)
controller.createLecturePicker(scraper.lectures, scraper.lectureDomHooks)
controller.createWidget(scraper.categories, scraper.widgetDomHook)

;
(function initialize() {
    (function clickNewLectures() {
        var newLectures = <HTMLLinkElement>document.querySelector("#cmg-pick-lectures li:first-child a")
        newLectures.click()
    })()
    ;
    (function clickVideos() {
        var labels = document.querySelectorAll("#cmg-pick-categories label")
        var index = [].map.call(labels, label => label.lastChild.textContent.trim()).indexOf("Video (MP4)")
        if (index >= 0) {
            labels[index].click()
        }
    })()
})()
