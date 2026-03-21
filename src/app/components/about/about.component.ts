import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  aboutData = [
    {
      image: 'assets/images/tribal.jpg',
      text: `Chhattisgarh is a state presently with 27 states. Bastar is a south-part of Chhattisgarh, a state located centrally in India. The area of Bastar was 40,836 kilometer square. Later it got divided into 7 districts- Bastar, Dantewada, Kanker, Sukma, Narayanpur, Bijapur, Kondagoan. There are many local tribes living in this specific part of India, namely- The Gond, The Halba, The Mahara, The Thakad, The Dhurvaa, The Abhuj Maria, The Bhatra, The Telunga. Population of Chhattisgarh is 25.5 million as per 2011 census. The Literacy rate in Chhattisgarh state is 61%.`
    },
    {
      image: 'assets/images/naxals.jpg',
      text: `People in Chhattisgarh are mostly affected by the Naxals (Maoist). In 2007, the Maoist killed 55 policemen in Rani Bodli. In 2010, 76 CRPF were killed in Dantewada. In 2013, 32 people including Mahendra Karma were killed in Darbha valley. In 2019, MLA Bheema Ram Mandavi was killed in Dantewada. Many such incidents happen regularly.`
    },
    {
      image: 'assets/images/persecution.jpg',
      text: `The custom of untouchability, caste system, and harmful practices exist. Many worship nature, idols, spirits, and demons. In 2015, more than 50 villages banned Christianity. Evangelism is difficult and believers face persecution.`
    },
    {
      image: 'assets/images/kasirajan1.jpg',
      text: `In 1987, Late Rev. S. Kasirajan came with his wife Mani Megalai and started ministry work. In 1993, Rev. J. Ravi Kumar Silva joined. The first church was built in Dantewada. Despite persecution, they expanded churches and ministries.`
    },
    {
      image: 'assets/images/kasirajan_family1.jpg',
      text: `They struggled for ministry growth. On 5th November 2011, Rev. Kasirajan lost his wife and later passed away, being buried beside her.`
    },
    {
      image: 'assets/images/ravi_family1.jpg',
      text: `<strong>- Present Status -</strong><br><br>
      Currently led by Rev. J. Ravi Kumar Silva and his wife. The mission has expanded across South Chhattisgarh with 60 pastors, 35 churches, and hostels supporting children.`
    }
  ];

  toggleRead(section: any) {
    section.expanded = !section.expanded;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }
}