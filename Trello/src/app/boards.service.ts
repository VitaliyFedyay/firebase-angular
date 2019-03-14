import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Board } from './Board';
import { List } from './List';
import { Note } from './Note';

 
@Injectable()
export class BoardsService {

  boardsCollection: AngularFirestoreCollection<Board>;
  boardDoc: AngularFirestoreDocument<Board>;
  listsCollection: AngularFirestoreCollection<List>;
  listDoc: AngularFirestoreDocument<List>;
  notesCollection: AngularFirestoreCollection<Note>;
  noteDoc: AngularFirestoreDocument<Note>;
  boards: Observable<Board[]>;
  board: Observable<Board>;
  lists: Observable<any[]>;
  list: Observable<any>; 
  notes: Observable<Note[]>;
  note: Observable<Note>;

  //Init the dependencies
  constructor( private asf: AngularFirestore ) { }


  //Get boards collection 
  getBoards (uid): Observable<Board[]> {
    this.boardsCollection = this.asf.collection<Board>('/boards', ref => ref.where('nr', '==', `${uid}`));
    this.boards = this.boardsCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Board;
      const id = a.payload.doc.id;
      return { id, ...data };
      });
    });
    return this.boards;
  }


  //Get lists collection where the ID matches the Boards ID
  getLists (id: string): Observable<any> {
    this.listsCollection = this.asf.collection<any>('/lists', ref => ref.where('nr', '==', `${id}`));
    this.lists = this.listsCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as List;
      const id = a.payload.doc.id;
      return { id, ...data };
      });
    });
    return this.lists;
  }

  //Get notes collection
  getNotes (): Observable<Note[]> {
    this.notesCollection = this.asf.collection<Note>('/notes');
    this.notes = this.notesCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Note;
      const id = a.payload.doc.id;
      return { id, ...data };
      });
    });
    return this.notes;
  }

  //Get a single note
  getNote(id: string, nr: string): Observable<Note>{
    this.noteDoc = this.asf.doc<Note>(`notes/${id}`);
    this.note = this.noteDoc.snapshotChanges().map(action => {      
        const data = action.payload.data() as Note;
        
        data.nr = nr;
        console.log(data);
        this.noteDoc.update(data);
        return data;
    });
    return this.note
  }  


  //Delete a note
  deleteNote (note: Note, id: string) {
    this.noteDoc = this.asf.doc<Note>(`notes/${id}`);
    this.noteDoc.delete();
  }

  //Delete a list
  deleteList (list: List, id: string) {
    this.listDoc = this.asf.doc<List>(`lists/${id}`);
    this.listDoc.delete();
  }

  //Delete a board
  deleteBoard (board: Board, id: string) {
    this.boardDoc = this.asf.doc<Board>(`boards/${id}`);
    this.boardDoc.delete();
  }

  //Add a board 
  addBoard (board: Board) {
    this.boardsCollection.add(board); 
  } 

  //Add a list
  addList (list: List) {
    this.listsCollection.add(list);  
  } 

  //Add a note
  addNote (note: Note) {
    this.notesCollection.add(note); 
  } 

  


}