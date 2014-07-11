var assert = require('assert')

describe('SimpleCategorizer', function () {
    describe('#createCategories()', function () {
        it('should create a single Miscellaneous category for a single resource', function () {
            var sc = new SimpleCategorizer()
            var resources = [new Resource("Video", null, null)]
            sc.createCategories(resources)
            var result = sc.getCategories()

            assert.equal(result.length, 1)
            assert.equal(result[0].name, "Miscellaneous")
        })

        it('should create a single Video category for two resources with the Video type', function () {
            var sc = new SimpleCategorizer()
            var resources = [
                new Resource("Video", null, null),
                new Resource("Video", null, null)
            ]
            sc.createCategories(resources)
            var result = sc.getCategories()

            assert.equal(result.length, 1)
            assert.equal(result[0].name, "Video")
        })

        it('should create a Misc and Video category for one misc and two with the Video type', function () {
            var sc = new SimpleCategorizer()
            var resources = [
                new Resource("Additional", null, null),
                new Resource("Video", null, null),
                new Resource("Video", null, null)
            ]
            sc.createCategories(resources)
            var result = sc.getCategories()

            assert.equal(result.length, 2)
            assert.equal(result[0].name, "Miscellaneous")
            assert.equal(result[1].name, "Video")
        })
    })
})
