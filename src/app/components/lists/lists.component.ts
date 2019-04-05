import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { List } from '../../models/List';
import { Note } from '../../models/Note';
import { Board } from '../../models/Board';
import { BoardsService } from '../../services/boards.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[];
  notes: Note[];
  note: Note;
  dragId: string;
  boards: Board[];
  nr: string;
  user: User;
  uid: any;

  constructor(
    // init of dependacies
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    // Get the Boards id form the URL
    this.nr = this.route.snapshot.params['id'];

    this.getBoards(this.auth.userId)
    // Get all lists with the same ID as the Boards ID
    this.boardsService.getLists(this.nr).subscribe(lists => {
      this.lists = lists;
    });
    // Get all notes
    this.boardsService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }
  getNr(title: string) {
    this.addList(title, this.nr);
  }

  // Add a list to the page
  addList(title: string, nr: string): void {
    title = title.trim();
    if (!title) { return; }
    this.boardsService.addList({ title, nr } as List);
  }

  // Add a note to a list
  addNote(text: string, nr: String): void {
    text = text.trim();
    if (!text) { return; }
    this.boardsService.addNote({ text, nr } as Note);
  }

  // Delete a note
  deleteNote(note: Note, id: string): void {
    this.boardsService.deleteNote(note, id);
  }

  // Delete a list
  deleteList(list: List, id: string): void {
    this.boardsService.deleteList(list, id);
  }

  // Drag and drop notes
  onItemDrop(e: any, nr: string) {
    this.boardsService.getNote(e.dragData, nr).subscribe(note => {
      this.note.nr = nr;
      console.log(this.note);
    });
  }

  getBoards(uid) {
    this.boardsService.getBoards(uid)
      .subscribe(boards => this.boards = boards);
  }

  addBoard(title: string, color: string, nr: string): void {
    title = title.trim();
    if (!title) { return; }
    this.boardsService.addBoard({ title, color, nr } as Board);
  }

  deleteBoard(board: Board, id: string): void {
    this.boardsService.deleteBoard(board, id);
  }
  

}
