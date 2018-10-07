import { Component, OnInit } from '@angular/core';
import { Post, DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  posts: Post[];
  CurrentDate = new Date();
  NextDate = new Date();
  select;
  postTem: Post;
  id;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => this.getid(params['id'])); 
  }

  ngOnInit() {
    this.NextDate.setDate( this.NextDate.getDate() + 7 );
    this.posts = this.dataService.getPosts();
    if(this.NextDate > this.CurrentDate)console.log(this.NextDate)
    this.postTem = {
      postid: 0,
      icon: 'flag',
      time: new Date(),
      title: 'Facebook SDE on-site interview',
      body: 'First go through several coding interviews. Then, you’ll do a design interview. Next, comes lunch with the recruiter. Finally, there’s a behavioral interview.',
      location: 'SF Bay Area',
      done: false
    };
    console.log(this.posts.length);
  }
  newPost(): void {
    this.postTem = {
      postid: 0,
      icon: 'flag',
      time: new Date(),
      title: 'Facebook SDE on-site interview',
      body: 'First go through several coding interviews. Then, you’ll do a design interview. Next, comes lunch with the recruiter. Finally, there’s a behavioral interview.',
      location: 'SF Bay Area',
      done: false
    };
  }
  save(): void {
    this.postTem.icon = this.select;
    if(this.postTem.postid == 0) { // new Post
      let newOne = this.dataService.newPost();
      newOne.icon = this.postTem.icon;
      newOne.time = this.postTem.time;
      newOne.title = this.postTem.title;
      newOne.body = this.postTem.body;
      newOne.location = this.postTem.location;
      newOne.done = this.postTem.done;
      this.dataService.updatePost(newOne);
    }
    else {
      this.dataService.updatePost(this.postTem);
    }
  }
  edit(event) {
    this.postTem.postid = event.path[0].id;
    console.log(this.postTem.postid);
    for (let i = 0; i < this.posts.length; i++) {
      if(this.postTem.postid == this.posts[i].postid){
        this.postTem.icon  = this.posts[i].icon;
        this.postTem.time = this.posts[i].time ;
        this.postTem.title = this.posts[i].title;
        this.postTem.body = this.posts[i].body;
        this.postTem.location = this.posts[i].location;
        this.postTem.done = this.posts[i].done;
      }
    }
  }
  done(event) {
    this.postTem.postid = event.path[0].id;
    for (let i = 0; i < this.posts.length; i++) {
      if(this.postTem.postid == this.posts[i].postid){
        this.postTem.icon  = this.posts[i].icon;
        this.postTem.time = this.posts[i].time ;
        this.postTem.title = this.posts[i].title;
        this.postTem.body = this.posts[i].body;
        this.postTem.location = this.posts[i].location;
        this.postTem.done = this.posts[i].done;
      }
    }
  }
  yesDone(){
    this.postTem.done = true;
    this.dataService.updatePost(this.postTem);
  }

  yesRecall(){
    this.postTem.done = false;
    this.dataService.updatePost(this.postTem);
  }

  checkCat(icon){
    if(icon == 'flag' && this.id == 'important' || 
      icon == 'strategy' && this.id == 'affair' || 
      icon == 'laptop' && this.id == 'work' || 
      icon == 'archive' && this.id == 'school' || 
      icon == 'goal' && this.id == 'trips' || 
      icon == 'target' && this.id == 'purchases' || 
      icon == 'team' && this.id == 'social' || 
      icon == 'puzzle-1' && this.id == 'other')
      return true;
    return false;

  }

  getid(id){
    this.id = id
  }

}
