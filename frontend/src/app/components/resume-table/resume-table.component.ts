import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resume-table',
  templateUrl: './resume-table.component.html',
  styleUrls: ['./resume-table.component.scss']
})
export class ResumeTableComponent implements OnInit {
  @Input() columnDefs: any[];
  @Input() rowData: any[];
  constructor() {
  }

  ngOnInit() {
  }

}
