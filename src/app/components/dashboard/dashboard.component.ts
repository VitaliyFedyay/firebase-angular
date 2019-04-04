import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/Board';
import { BoardsService } from '../../services/boards.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  boards: Board[];
  nr: string;
  user: User;
  uid: any;

  constructor(
    private boardsService: BoardsService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getBoards(this.auth.userId);
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
