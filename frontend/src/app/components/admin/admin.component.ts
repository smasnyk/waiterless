import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayed: string[] = ['id', 'name', 'username', 'role'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public adminService: AdminService) {
    adminService.getUsers().subscribe(users => this.dataSource.data = users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(event: KeyboardEvent) {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }

}
