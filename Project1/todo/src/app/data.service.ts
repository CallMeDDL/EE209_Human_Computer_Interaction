import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private posts: Post[];
  private nextPostId: number;

  private ERRORPOST = {
    postid: -1,
    icon: 'ERROR',
    time: new Date(),
    title: 'ERROR',
    body: 'ERROR',
    location: 'ERROR',
    done: false
  };
  
  constructor() {
    this.fetchPosts();
  }

  // Populate the posts
  fetchPosts(): void {

    let example = [
      {
        postid: 1,
        icon: 'archive',
        time: new Date(),
        title: 'ECE209AS presentation',
        body: 'To create and iterate a todo list design and there will be a workshop about prototyping on the same day.',
        location: 'UCLA Bolter Hall',
        done: false
      }
    ];
    if (localStorage.getItem('savedPosts') == null) {
      localStorage.setItem('savedPosts', JSON.stringify(example));
      this.posts = JSON.parse(localStorage.getItem('savedPosts'));
      this.nextPostId = 2;
    }
    else {
      this.posts = JSON.parse(localStorage.getItem('savedPosts'));
      this.nextPostId = this.posts.length + 1;
    }
  }

  // Return posts
  getPosts(): Post[] { 
    console.log(this.posts.length)
    return this.posts;
  }

  // Find the post
  getPost(postid: number): Post {
    /* TODO: better error handling? */
    let result = this.posts.filter(post => post.postid == postid)
    if (result.length != 1) {
      // alert("Invalid postid in getPostById!!");
      return null;
    }
    else {
      return result[0];
    }
  }

  // Create a new post
  newPost(): Post {
    let p = {
      postid: this.nextPostId,
      icon: 'flag',
      time: new Date(),
      title: '',
      body: '',
      location: '',
      done: false
    };
    this.nextPostId++;
    this.posts.push(p);
    localStorage.setItem("savedPosts", JSON.stringify(this.posts));
    return p;
  }

  // Update a post
  updatePost(p: Post): void {
    /* TODO: better error handling */
    let count = 0;
    let idx = [];
    this.posts.forEach((post, index) => {
      if (p.postid == post.postid) {
        count++;
        idx.push(index);
      }
    });
    console.log(p)
    
    if (count == 1) {
      this.posts[idx[0]].icon = p.icon;
      this.posts[idx[0]].time = p.time;
      this.posts[idx[0]].title = p.title;
      this.posts[idx[0]].body = p.body;
      this.posts[idx[0]].location = p.location;
      this.posts[idx[0]].done = p.done;
      localStorage.setItem("savedPosts", JSON.stringify(this.posts));
    }
    // else if (count > 1) {
    //   alert("Duplicate postid in updatePost!!");
    // }
    // else {
    //   // count = 0
    //   alert("Did't find the post in updatePost!!")
    // }
  }

  // Delete a post
  deletePost(postid: number): void { 
    /* TODO: better error handling? */
    let originalLen = this.posts.length;
    this.posts = this.posts.filter(post => post.postid !== postid)
    localStorage.setItem("savedPosts", JSON.stringify(this.posts));
    // if (originalLen - 1 !== this.posts.length)  // make sure we deleted exactly 1 post
    //   alert("Invalid postid in deletePost!!");
  }

} 
export class Post {
  postid: number;
  icon: string;
  time: Date;
  title: string;
  body: string;
  location: string;
  done: boolean;

  constructor(postRes : Post) {
    this.postid = postRes.postid;
    this.icon = postRes.icon;
    this.time = postRes.time;
    this.title = postRes.title;
    this.body = postRes.body;
    this.location = postRes.location;
    this.done = postRes.done;
  }
}
