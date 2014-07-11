var assert = require('assert')

describe('Generator', function () {

    //don't generate the url for the blob, just generate the metalink string
    function MockBlobUrl() {
        this.generate = function (metalinkParts) {
            return metalinkParts.reduce(function (a, b) {
                return a.concat(b)
            }, "")
        }
    }

    //don't use values that require network access, just use dummy values
    function MockResourceRequestor() {
        this.request = function (resource, onResponse) {
            onResponse("0", resource.href, resource.href)
        }
    }

    function getTwoResources(category) {
        var section = new Section("Section")
        var lecture = new Lecture(1, null, section)
        var resource1 = new Resource("Video (MP4)", "https://resource1.url", lecture)
        var resource2 = new Resource("Video (MP4)", "http://resource2.url", lecture)
        resource1.setScraped(category, null)
        resource2.setScraped(category, null)
        section.setLectures([lecture])
        lecture.setResources([resource1, resource2])
        Resource.setCourseName(function () {
            return "Course"
        })
        return [resource1, resource2]
    }

    var category = new Category("Category")
    var categories = [category]
    var resources = getTwoResources(category)

    var mockBlobUrl = new MockBlobUrl()
    var mockResourceResolver = new MockResourceRequestor()
    var resolver = new Resolver(mockResourceResolver)
    var generator = new Generator(resolver, mockBlobUrl, resources, categories)

    describe('#selectedResourceCount()', function () {
        it('should be 0 when lecture of resources is not selected', function () {
            resources[0].lecture.selected = false
            assert.equal(generator.selectedResourceCount()[0], 0)
        })
        it('should be resources.length when lecture of resources is selected', function () {
            resources[0].lecture.selected = true
            assert.equal(generator.selectedResourceCount()[0], resources.length)
        })
    })

    describe('#resourcesToDownload()', function () {
        it('should not have resources when lecture and category of resources is not selected', function () {
            resources[0].lecture.selected = false
            category.selected = false
            assert.equal(generator.resourcesToDownload().length, 0)
        })
        it('should have resources when lecture and category of resources is selected', function () {
            resources[0].lecture.selected = true
            category.selected = true
            assert.equal(generator.resourcesToDownload().length, 2)
        })
    })

    describe('#generate()', function () {
        it('should generate a valid Metalink for the resources', function (done) {
            var expected = '' +
                '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<metalink version="3.0" xmlns="http://www.metalinker.org/">\n' +
                '\t<files>\n' +
                '\t\t<file name="Course/Section/https:__resource1.url">\n' +
                '\t\t\t<size>0</size>\n' +
                '\t\t\t<resources><url type="https">https://resource1.url</url></resources>\n' +
                '\t\t</file>\n' +
                '\t\t<file name="Course/Section/http:__resource2.url">\n' +
                '\t\t\t<size>0</size>\n' +
                '\t\t\t<resources><url type="http">http://resource2.url</url></resources>\n' +
                '\t\t</file>\n' +
                '\t</files>\n' +
                '</metalink>\n'
            var onResource = function () {
            }
            var onAll = function (justMetalinkString) {
                assert.equal(justMetalinkString, expected)
                done()
            }
            generator.generate(onResource, onAll)
        })
    })
})
