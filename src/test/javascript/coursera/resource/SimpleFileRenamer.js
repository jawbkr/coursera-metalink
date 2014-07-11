var assert = require('assert')

describe('SimpleFileRenamer', function() {

    var supportedResources = new SupportedResources()
    var fr = new SimpleFileRenamer(supportedResources)

    describe('#getRenamer()', function() {

        var lecture = new Lecture(5, null, null)

        it('should return a filename of the form "##-filename.ext" for videos and subtitles', function() {
            function getCourseraResources() {
                var videoUrl = "https://class.coursera.org/course/lecture/download.mp4?lecture_id=86"
                var srtSubUrl = "https://class.coursera.org/course/lecture/subtitles?q=86_en&format=srt"
                var txtSubUrl = "https://class.coursera.org/course/lecture/subtitles?q=86_en&format=txt"

                return [
                    new Resource(null, videoUrl, lecture),
                    new Resource(null, srtSubUrl, lecture),
                    new Resource(null, txtSubUrl, lecture),
                ]
            }

            var responseHeaders = [
                "Content-Disposition: attachment; filename=\"0 - 5 - THIS IS A VIDEO.MP4\"",
                "Content-Disposition: attachment; filename=\"0 - 5 - THIS IS A SUB.SRT\"",
                "Content-Disposition: attachment; filename=\"0 - 5 - THIS IS A SUB.TXT\""
            ]
            var resources = getCourseraResources()
            assert.equal(fr.getRenamer(resources[0])(responseHeaders[0]), "05-THIS IS A VIDEO.MP4")
            assert.equal(fr.getRenamer(resources[1])(responseHeaders[1]), "05-THIS IS A SUB.SRT")
            assert.equal(fr.getRenamer(resources[2])(responseHeaders[2]), "05-THIS IS A SUB.TXT")
        })

        it('should return a filename of the form "##-category-filename.ext for cdn resources', function() {
            function getCdnResource() {
                var url = "https://d396qusza40orc.cloudfront.net/course/slides/some-notes.pdf"
                var resource = new Resource(null, url, lecture)
                var category = new Category("PDF")
                resource.setScraped(category, null)
                return resource
            }

            var resource = getCdnResource()
            assert.equal(fr.getRenamer(resource)(), "05-pdf-some-notes.pdf")
        })
    })
})
