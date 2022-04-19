export class BlogPosts {
  getAllPosts() {
    return cy.request({
      method: 'GET',
      url: '/posts',
    });
  }

  getPostsByUser(userId: number) {
    return cy.request({
      method: 'GET',
      url: '/posts',
      qs: { userId },
    });
  }

  getPost(id: number, otherOptions: any = {}) {
    const requestOptions = {
      method: 'GET',
      url: `/posts/${id}`,
    };
    if (otherOptions) {
      Object.assign(requestOptions, otherOptions);
    }
    return cy.request(requestOptions);
  }

  addPost(post: any) {
    return cy.request({
      method: 'POST',
      url: '/posts',
      body: post,
    });
  }

  updatePost(id: number, update: any, otherOptions: any = {}) {
    const requestOptions = {
      method: 'PUT',
      url: `/posts/${id}`,
      body: update,
    };
    if (otherOptions) {
      Object.assign(requestOptions, otherOptions);
    }
    return cy.request(requestOptions);
  }

  deletePost(id: number, otherOptions: any = {}) {
    const requestOptions = {
      method: 'DELETE',
      url: `/posts/${id}`,
    };
    if (otherOptions) {
      Object.assign(requestOptions, otherOptions);
    }
    return cy.request(requestOptions);
  }
}
