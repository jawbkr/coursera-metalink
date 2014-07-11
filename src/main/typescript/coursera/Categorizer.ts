/**
 * Some observations about the categorization of resources:
 *
 * Actual lecture videos and their corresponding subtitles can be easily identified by their hrefs
 * or title attributes. These links are consistent and appear to be machine generated.
 *
 * Categorizing resources by anchor title, e.g. "Slides", or by the directory from which they are served
 * may be more difficult.
 *
 * 1) There is no standard way of titling or serving resources across classes.
 *
 * 2) Titles are human generated and are commonly subject to errors including
 *  a. inconsistent case usage ("Slides" and "slides");
 *  b. labelling some resources methodically ("Slides") and others by some other label, e.g. "Lecture Slides"; and
 *  c. labelling some resources methodically ("Slides") and others randomly.
 *
 * 3) Sometimes unique titles are given to each resource, e.g. a title based on the lecture name,
 * which could cause a proliferation of categories.
 *
 * 4) Sometimes there are minor variations in titles of resources that are in the same logical category,
 * e.g. "report-x.pdf" and "report-y.pdf". Sometimes these resources are not in the same logical
 * category, e.g. "notes-whiteboard.pdf" and "notes-typed.pdf".
 * This can occur whether the documents are served from the same path or not.
 *
 * 5) Resources served from the same path may not be logically related.  Also, resources served from
 * different paths may be logically related, e.g. most resources served from /2014-slides with a smattering
 * of resources served from /2013-slides
 */
interface Categorizer {
    createCategories(resources: Array<Resource>)
    getCategory(resource: Resource): Category
    getCategories(): Array<Category>
}
