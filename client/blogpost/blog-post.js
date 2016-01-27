import './blog-post.html';


Template.blogPost.onCreated(function() {
    console.log("onCreated1");
    this.autorun(() => {
        console.log("onCreated2");
    })
});
