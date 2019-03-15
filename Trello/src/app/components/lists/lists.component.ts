import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { BoardsService } from '../../services/boards.service';
import { List } from '../../models/List';
import { Note } from '../../models/Note';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[];
  notes: Note[];
  nr: string;
  note: Note;
  dragId: string;
  

  constructor(
    //init of dependacies
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService
  ) { }

  ngOnInit() {
    //Get the Boards id form the URL
    this.nr = this.route.snapshot.params['id'];

    //Get all lists with the same ID as the Boards ID
    this.boardsService.getLists(this.nr).subscribe(lists => {
      this.lists = lists;  
    }); 

    //Get all notes
    this.boardsService.getNotes().subscribe(notes => {
      this.notes = notes;        
    });   

  }

  
  getNr(title: string){
    this.addList(title, this.nr);
  }

  //Add a list to the page
  addList(title: string, nr: string): void {
    title = title.trim();
    if (!title) { return; }
    this.boardsService.addList({title, nr} as List);
  }


  //Add a note to a list
  addNote(text: string, nr: String): void {
    text = text.trim();
    if (!text) { return; }
    this.boardsService.addNote({text, nr} as Note);
  }

  //Delete a note
  deleteNote(note: Note, id: string): void {
    this.boardsService.deleteNote(note, id);
  }

  //Delete a list
  deleteList(list: List, id: string): void {
    this.boardsService.deleteList(list, id); 
  }

  //Drag and drop notes
  onItemDrop(e: any, nr: string) {
      
      this.boardsService.getNote(e.dragData, nr).subscribe(note => {
      this.note.nr = nr;
      console.log(this.note);  
    });
  }

}
