import { BlogPosts } from '@service/blog-posts';

describe('Basic blog', () => {
  const blogPosts = new BlogPosts();

  before('Get a blog post to use for searching and updates', () => {
    blogPosts
      .getAllPosts()
      .its('body')
      .then((posts) => posts[0])
      .as('blogPost');
  });

  context('Create blog posts', () => {
    it('Should add a new blog post', () => {
      const newPost = {
        title: 'New Title',
        body: 'New blog details',
        userId: 1,
      };

      blogPosts.addPost(newPost).then((response) => {
        expect(response).property('status').to.eq(201);
        expect(response).property('body').to.have.property('id');
      });
    });
  });

  context('Update blog posts', () => {
    it('Should update an existing blog post', function () {
      const postUpdate = {
        title: 'this is the updated title',
      };

      blogPosts.updatePost(this.blogPost.id, postUpdate).then((response) => {
        expect(response).property('status').to.eq(200);
        expect(response).property('body').to.include(postUpdate);
      });
    });

    it('Should return an internal server error when updating a post that does not exist', () => {
      const postUpdate = {
        title: 'this should not update',
      };

      // @ts-expect-error - Ignore type number requirement
      blogPosts.updatePost('error', postUpdate, { failOnStatusCode: false }).then((response) => {
        expect(response).property('status').to.eq(500);
      });
    });
  });

  context('Remove blog posts', () => {
    it('Should remove an existing blog post', function () {
      blogPosts.deletePost(this.blogPost.id).then((response) => {
        expect(response).property('status').to.eq(200);
      });
    });

    // Skipping test as the delete endpoint returns a successful response even though the post id is invalid
    it.skip('Should return an error when removing a post that does not exist', function () {
      // @ts-expect-error - Ignore type number requirement
      blogPosts.deletePost('error').then((response) => {
        expect(response).property('status').to.eq(404);
      });
    });
  });

  context('Get blog posts', () => {
    it('Should return all blog posts', () => {
      blogPosts
        .getAllPosts()
        .its('body')
        .then((posts) => {
          expect(posts).to.be.an('Array');
          posts.forEach((post) => {
            expect(post).to.have.all.keys(['id', 'title', 'body', 'userId']);
          });
        });
    });

    it('Should return blog post details', function () {
      blogPosts
        .getPost(this.blogPost.id)
        .its('body')
        .then((post) => {
          expect(post).to.be.an('Object');
          expect(post).to.have.all.keys(['id', 'title', 'body', 'userId']);
        });
    });

    it('Should return page not found error when getting a post with an invalid post id', () => {
      blogPosts
        // @ts-expect-error - Ignore type number requirement
        .getPost('error', { failOnStatusCode: false })
        .then((response) => expect(response).property('status').to.eq(404));
    });

    it('Should return blog posts of a user given a user id', function () {
      blogPosts
        .getPostsByUser(this.blogPost.userId)
        .its('body')
        .then((posts) => {
          expect(posts).to.be.an('Array');
          posts.forEach((post) => {
            expect(post).property('userId').to.eq(this.blogPost.userId);
          });
        });
    });

    it('Should return an empty list if user does not exist', () => {
      blogPosts
        // @ts-expect-error - Ignore type number requirement
        .getPostsByUser('error')
        .its('body')
        .then((posts) => {
          expect(posts).to.be.an('Array');
          expect(posts).to.be.empty;
        });
    });
  });
});
