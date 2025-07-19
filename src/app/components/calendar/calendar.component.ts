import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendar!: ElementRef<any>;

  calendarOptions: any;
  program_data: any[] = [];

  constructor(
    private _auth: AuthService,
    private service: CookieService,
    private datepipe: DatePipe
  ) {}
base_url:any='https://bcmmovement.in'
  ngOnInit(): void {
    var calendarEl = this.calendar.nativeElement;

    let body = {};

    this._auth.get_events(body).subscribe((res: any) => {
      if (res.status === 'success') {
        this.program_data = res.data;
        let value: any[] = [];

        this.program_data.forEach((item: any) => {
          value.push({
            title: item.event_name,
            start: this.datepipe.transform(item.event_start_date, 'yyyy-MM-dd'),
            end:
              this.datepipe.transform(item.event_end_date, 'yyyy-MM-dd') +
              'T23:59:59',
            description: item.detail,
            image_url: item.image,
          });
        });

        var calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          },
          eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false,
          },
          events: value, 

          eventContent: function (arg) {
            let eventContent = document.createElement('div');

            let eventTitle = document.createElement('div');
            eventTitle.innerHTML = `<strong>${arg.event.title}</strong>`;
            eventContent.appendChild(eventTitle);

            let eventDetails = document.createElement('div');
            eventDetails.classList.add('calendar-event-details');
            eventDetails.innerHTML = `
              <div>${arg.event.extendedProps.description}</div>
              <img src="${arg.event.extendedProps.image_url}" class="event-image" />
            `;
            eventContent.appendChild(eventDetails);

            eventContent.addEventListener('mouseenter', function () {
              eventDetails.classList.add('show');
            });
            eventContent.addEventListener('mouseleave', function () {
              eventDetails.classList.remove('show');
            });

            return { domNodes: [eventContent] };
          },
        });

        calendar.render();
      }
    });
  }
}
