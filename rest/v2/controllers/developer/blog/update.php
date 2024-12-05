<?php
$conn = null;
$conn = checkDbConnection();
$blog = new Blog($conn);
// $error = [];
// $returnData = [];
if (array_key_exists("blogid", $_GET)) {
    checkPayload($data);

    $blog->blog_aid = $_GET['blogid'];
    $blog->blog_title = checkIndex($data, "blog_title");
    $blog->blog_category = checkIndex($data, "blog_category");
    $blog->blog_image = checkIndex($data, "blog_image");
    $blog->blog_date = checkIndex($data["blog_date"]);
    $blog->blog_description = checkIndex($data, "blog_description");
    $blog->blog_information = checkIndex($data, "blog_information");
    $blog->blog_author = checkIndex($data, "blog_author");

    $blog->blog_datetime = date("Y-m-d H:i:s");
    $blog_title_old = strtolower($data["blog_title_old"]);
    // checkId($blog->blog_aid);
    compareName($blog, $blog_title_old, $blog->blog_title);

    $query = checkUpdate($blog);
    returnSuccess($blog, "blog", $query);
}

checkEndpoint();