var assert = require('assert')

describe('SupportedResources', function() {

    var kr = new SupportedResources()

    describe('#isAcceptable()', function() {

        it('should allow resources from a standard coursera url', function() {
            var video = "https://class.coursera.org/course/lecture/download.mp4?lecture_id=86"
            var srtSubs = "https://class.coursera.org/course/lecture/subtitles?q=86_en&format=srt"
            var txtSubs = "https://class.coursera.org/course/lecture/subtitles?q=86_en&format=txt"
            assert.equal(kr.isAcceptable(video), true)
            assert.equal(kr.getResourceOrigin(video), ResourceOrigin.Coursera)
            assert.equal(kr.isAcceptable(srtSubs), true)
            assert.equal(kr.getResourceOrigin(srtSubs), ResourceOrigin.Coursera)
            assert.equal(kr.isAcceptable(txtSubs), true)
            assert.equal(kr.getResourceOrigin(txtSubs), ResourceOrigin.Coursera)
        })

        it('should allow resources from a standard cdn url', function() {
            var cdn = "https://d396qusza40orc.cloudfront.net/course/slides/some-notes.pdf"
            assert.equal(kr.isAcceptable(cdn), true)
            assert.equal(kr.getResourceOrigin(cdn), ResourceOrigin.Cdn)
        })

        it('should not allow resources with an unknown url', function() {
            var youTube = "https://www.youtube.com/watch?v=Q1T3QPCHJ9s"
            assert.equal(kr.isAcceptable(youTube), false)
        })
    })
})
