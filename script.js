/**
 * AIML CLUB OCT — HIGH-PRECISION RUNTIME & MOTION ENGINE
 * Oriental College of Technology, Bhopal
 * Swiss Architectural Interaction, Telemetry, Studio Switcher & Roster Engine
 */

(function () {
  'use strict';

  // 01. Live Real-Time Telemetry Clock (UTC+05:30 / IST)
  function initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    function updateTime() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = timeStr + ' IST';
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  // 02. Desktop Custom Cursor & Follower
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    const badge = document.getElementById('cursor-badge');

    if (!cursor || !follower || window.matchMedia('(hover: none)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate3d(${followerX - 17}px, ${followerY - 17}px, 0)`;
      requestAnimationFrame(renderFollower);
    }
    requestAnimationFrame(renderFollower);

    // Interactive Hover Elements
    const interactives = document.querySelectorAll('a, button, .project-feed-card, .curriculum-cell, .notebook-card, .member-card');
    interactives.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        follower.classList.add('hovering');
        const customText = el.getAttribute('data-cursor') || 'EXPLORE';
        if (badge) badge.textContent = customText;
      });
      el.addEventListener('mouseleave', function () {
        follower.classList.remove('hovering');
      });
    });
  }

  // 03. Scroll Progress Rail & Section Spy
  function initScrollProgressRail() {
    const indicator = document.getElementById('rail-indicator');
    const tag = document.getElementById('rail-current-tag');
    const sections = document.querySelectorAll('section[data-section-name]');
    const navItems = document.querySelectorAll('.nav-item');

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (indicator) {
        indicator.style.height = progress + '%';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window && sections.length) {
      const spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute('data-section-name');
            const id = entry.target.getAttribute('id');
            if (tag && name) tag.textContent = name;

            navItems.forEach(function (item) {
              const href = item.getAttribute('href');
              if (href === '#' + id) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      }, { threshold: 0.3 });

      sections.forEach(function (sec) {
        spyObserver.observe(sec);
      });
    }
  }

  // 04. Staggered Reveal Observer & Counter Animations
  function initRevealObserver() {
    const reveals = document.querySelectorAll('.reveal-stagger');

    if ('IntersectionObserver' in window && reveals.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Counter animation on spec values
            const counters = entry.target.querySelectorAll('.spec-value[data-target]');
            counters.forEach(function (c) {
              const target = parseInt(c.getAttribute('data-target'), 10);
              if (!c.classList.contains('counted') && !isNaN(target)) {
                c.classList.add('counted');
                let count = 0;
                const duration = 1200;
                const stepTime = 30;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const timer = setInterval(function () {
                  count += increment;
                  if (count >= target) {
                    c.textContent = (target < 10 ? '0' : '') + target + (target === 9 ? '+' : '');
                    clearInterval(timer);
                  } else {
                    const cur = Math.floor(count);
                    c.textContent = (cur < 10 ? '0' : '') + cur;
                  }
                }, stepTime);
              }
            });
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  // 05. Interactive Sticky Project Studio Switcher
  const PROJECTS_CONFIG = [
  {
    "id": "PROJECT // 01",
    "status": "STABLE RELEASE",
    "statusClass": "status-prod",
    "diagram": [
      {
        "tag": "RAW INPUT STREAM",
        "spec": "Email MIME Body / RFC 5322 Headers"
      },
      {
        "tag": "PREPROCESSING ENGINE",
        "spec": "Regex Normalization \u2022 TF-IDF Vectorizer"
      },
      {
        "tag": "CLASSIFICATION CORE",
        "spec": "MultinomialNB \u2022 Fallback Vector Math"
      },
      {
        "tag": "OUTPUT ENVELOPE",
        "spec": "Spam Probability \u2022 Sub-8ms Latency"
      }
    ],
    "stats": [
      {
        "label": "ACCURACY",
        "val": "97.4%"
      },
      {
        "label": "LATENCY",
        "val": "< 8ms"
      },
      {
        "label": "COVERAGE",
        "val": "100%"
      }
    ]
  },
  {
    "id": "PROJECT // 02",
    "status": "STABLE RELEASE",
    "statusClass": "status-prod",
    "diagram": [
      {
        "tag": "TABULAR DATASET",
        "spec": "Internal Marks \u2022 Attendance Logs \u2022 Lab Scores"
      },
      {
        "tag": "DATA PIPELINE",
        "spec": "Median Imputer \u2022 MinMax Scaler \u2022 One-Hot"
      },
      {
        "tag": "ESTIMATION CORE",
        "spec": "Random Forest Regressor \u2022 Gradient Descent"
      },
      {
        "tag": "INTERVENTION OUT",
        "spec": "Semester Performance & At-Risk Alert"
      }
    ],
    "stats": [
      {
        "label": "R\u00b2 SCORE",
        "val": "0.91"
      },
      {
        "label": "F1-SCORE",
        "val": "0.89"
      },
      {
        "label": "ACCURACY",
        "val": "94.2%"
      }
    ]
  },
  {
    "id": "PROJECT // 03",
    "status": "ACTIVE LAB",
    "statusClass": "status-beta",
    "diagram": [
      {
        "tag": "RTSP VIDEO STREAM",
        "spec": "1080p Industrial CCTV Live Feed (30 FPS)"
      },
      {
        "tag": "TENSOR PREPROCESSING",
        "spec": "Letterbox 640x640 \u2022 BGR to RGB Normalization"
      },
      {
        "tag": "NEURAL INFERENCE",
        "spec": "YOLOv8 Edge Model \u2022 INT8 Quantized Core"
      },
      {
        "tag": "SAFETY BOUNDING BOX",
        "spec": "Hard-Hat Detection & Compliance Telemetry"
      }
    ],
    "stats": [
      {
        "label": "EDGE FPS",
        "val": "45 FPS"
      },
      {
        "label": "mAP@50",
        "val": "0.88"
      },
      {
        "label": "RUNTIME",
        "val": "ONNX"
      }
    ]
  },
  {
    "id": "PROJECT // 04",
    "status": "ACTIVE LAB",
    "statusClass": "status-beta",
    "diagram": [
      {
        "tag": "DOCUMENT CORPUS",
        "spec": "OCT Ordinances \u2022 Syllabi \u2022 Regulatory PDFs"
      },
      {
        "tag": "INDEXING ENGINE",
        "spec": "Semantic Recursive Split \u2022 512 Token Chunks"
      },
      {
        "tag": "HYBRID RETRIEVAL",
        "spec": "BM25 Sparse + BGE-Large Dense Search"
      },
      {
        "tag": "SYNTHESIS GATE",
        "spec": "Grounded LLM Prompt \u2022 Exact Section Citation"
      }
    ],
    "stats": [
      {
        "label": "CITATIONS",
        "val": "100%"
      },
      {
        "label": "SEARCH",
        "val": "HYBRID"
      },
      {
        "label": "GATE",
        "val": "NO-HALLUC"
      }
    ]
  }
];

  function initProjectStudio() {
    const feedCards = document.querySelectorAll('.project-feed-card');
    const studioId = document.getElementById('studio-active-id');
    const studioStatus = document.getElementById('studio-active-status');
    const studioDiagram = document.getElementById('studio-diagram');
    const stat1 = document.getElementById('studio-stat-1');
    const stat2 = document.getElementById('studio-stat-2');
    const stat3 = document.getElementById('studio-stat-3');

    if (!feedCards.length || !studioDiagram) return;

    function activateProject(idx) {
      const p = PROJECTS_CONFIG[idx];
      if (!p) return;

      feedCards.forEach(function (c, i) {
        if (i === idx) c.classList.add('active');
        else c.classList.remove('active');
      });

      if (studioId) studioId.textContent = p.id;
      if (studioStatus) {
        studioStatus.textContent = p.status;
        studioStatus.className = 'studio-status-pill ' + p.statusClass;
      }

      // Build diagram layers
      let diagramHtml = '';
      p.diagram.forEach(function (layer, li) {
        diagramHtml += `
          <div class="blueprint-layer">
            <span class="bp-tag">${layer.tag}</span>
            <div class="bp-spec">${layer.spec}</div>
          </div>
        `;
        if (li < p.diagram.length - 1) {
          diagramHtml += '<div class="blueprint-connector"><i class="fa-solid fa-arrow-down"></i></div>';
        }
      });
      studioDiagram.innerHTML = diagramHtml;

      if (stat1 && p.stats[0]) stat1.textContent = p.stats[0].val;
      if (stat2 && p.stats[1]) stat2.textContent = p.stats[1].val;
      if (stat3 && p.stats[2]) stat3.textContent = p.stats[2].val;
    }

    feedCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-project-idx'), 10);
        activateProject(idx);
      });
      card.addEventListener('mouseenter', function () {
        const idx = parseInt(this.getAttribute('data-project-idx'), 10);
        activateProject(idx);
      });
    });
  }

  // 06. Curricula Filter Strip
  function initCurriculumFilter() {
    const chips = document.querySelectorAll('.curr-chip');
    const cells = document.querySelectorAll('.curriculum-cell');

    if (!chips.length || !cells.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');

        const cat = this.getAttribute('data-curr-cat');
        cells.forEach(function (cell) {
          const cellCat = cell.getAttribute('data-category');
          if (cat === 'all' || cellCat === cat) {
            cell.style.display = 'flex';
          } else {
            cell.style.display = 'none';
          }
        });
      });
    });
  }

  // 07. Event Timeline Category Filter
  function initEventFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const timelineRows = document.querySelectorAll('.timeline-row');

    if (!filterChips.length || !timelineRows.length) return;

    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        timelineRows.forEach(function (row) {
          const rowCat = row.getAttribute('data-category');
          if (filter === 'all' || rowCat === filter) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // 08. Verified 41-Member Council Directory Engine
  const TEAM_MEMBERS = [
  {
    "name": "Prof. Shamaila Khan",
    "role": "Faculty Coordinator",
    "team": "Faculty",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740166003c24000955/view?project=696f6e31002241c92438",
    "category": "leadership"
  },
  {
    "name": "Vishal Kumar",
    "role": "President",
    "team": "Core Leadership",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016e000fe00e2876/view?project=696f6e31002241c92438",
    "category": "leadership"
  },
  {
    "name": "Umesh Patel",
    "role": "Vice President",
    "team": "Core Leadership",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016c0036a984f65d/view?project=696f6e31002241c92438",
    "category": "leadership"
  },
  {
    "name": "Gourav Jain",
    "role": "Event Head",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015800361d973786/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Aarchi Sharma",
    "role": "Event Head",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974014f000261841619/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Parul Ajit",
    "role": "Event Head",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740161003318821aed/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Anjali Sonare",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543ac000d7e025929/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Aanya Tomar",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6975444500395ed065e4/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Bhavesh Singh",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543af003050c9361f/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Tanu Jadon",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016b003343c8afa7/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Sarvesh Sejwar",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016a0034e20ad52b/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Nasir Khan",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b6002a0d8065b0/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Rinki Pathak",
    "role": "Event Team Member",
    "team": "Event & Operations",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740168002185bf2f30/view?project=696f6e31002241c92438",
    "category": "events"
  },
  {
    "name": "Prince Kumar",
    "role": "Discipline Head",
    "team": "Discipline",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016500248e0046df/view?project=696f6e31002241c92438",
    "category": "discipline"
  },
  {
    "name": "Nikhil Singh",
    "role": "Discipline Team Member",
    "team": "Discipline",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b7002d7ddb2b72/view?project=696f6e31002241c92438",
    "category": "discipline"
  },
  {
    "name": "Himanshu Gour",
    "role": "Discipline Team Member",
    "team": "Discipline",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b300058fa2e995/view?project=696f6e31002241c92438",
    "category": "discipline"
  },
  {
    "name": "Sarthak Shrivastava",
    "role": "Discipline Team Member",
    "team": "Discipline",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697401690031518aaaa8/view?project=696f6e31002241c92438",
    "category": "discipline"
  },
  {
    "name": "Kinshuk Verma",
    "role": "Tech Lead",
    "team": "Technical",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015f00120dba207e/view?project=696f6e31002241c92438",
    "category": "technical"
  },
  {
    "name": "Nimisha Kumari",
    "role": "Tech Team Member",
    "team": "Technical",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740160002a07f3b1d3/view?project=696f6e31002241c92438",
    "category": "technical"
  },
  {
    "name": "Arnav Singh",
    "role": "Tech Team Member",
    "team": "Technical",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697401540029be8ef4a2/view?project=696f6e31002241c92438",
    "category": "technical"
  },
  {
    "name": "Himanshu Singh",
    "role": "Tech Team Member",
    "team": "Technical",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015b001c5adbccb0/view?project=696f6e31002241c92438",
    "category": "technical"
  },
  {
    "name": "Jitesh",
    "role": "Tech Team Member",
    "team": "Technical",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015c00331fae240e/view?project=696f6e31002241c92438",
    "category": "technical"
  },
  {
    "name": "Heer",
    "role": "Anchors Head",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b2000730525313/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Anshul Sharma",
    "role": "Anchors Head",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543ae0023e5929ce1/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Ayush Tamrakar",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740156003c5d72d9be/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Avni Rawat",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697401550033cd189eae/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Ankit Sharma",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543ad00149b16a48c/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Apurvi Aggarwal",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/69740153002984206116/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Shambhavi",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543ba003a1d3cd095/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Manish Mehra",
    "role": "Anchor",
    "team": "Anchors & Stage",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b40012763d7d31/view?project=696f6e31002241c92438",
    "category": "stage"
  },
  {
    "name": "Prakhar Sahu",
    "role": "Public Relations",
    "team": "Media - PR",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974016300038282dd7e/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Khushi Kumari",
    "role": "Media Head",
    "team": "Media - PR",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015d003d415caf42/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Anushka Malviya",
    "role": "Media Associate",
    "team": "Media - PR",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015200216bdf7c04/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Aashu Kumar",
    "role": "Media Associate",
    "team": "Media - PR",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697401500016440307b1/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Daksh Sahni",
    "role": "Graphics Designer",
    "team": "Media - Design",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b00035aa1eb0fe/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Pritish Mandal",
    "role": "Graphics Designer",
    "team": "Media - Design",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b800365b369445/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Abhijeet Sarkar",
    "role": "Graphics Designer",
    "team": "Media - Design",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697401510017b68be401/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Hana Nafees Abbasi",
    "role": "Graphics Designer",
    "team": "Media - Design",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/6974015a000dec52fdcb/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Rajeev Kumar",
    "role": "Media Member",
    "team": "Media - Editors",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543b9003c5b0005da/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Aditya Rajput",
    "role": "Media Member",
    "team": "Media - Editors",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543ab000570fb4bf1/view?project=696f6e31002241c92438",
    "category": "media"
  },
  {
    "name": "Teena Nandanwar",
    "role": "Media Member",
    "team": "Media - Editors",
    "imageUrl": "https://fra.cloud.appwrite.io/v1/storage/buckets/team-members/files/697543bb002da8ee1f7b/view?project=696f6e31002241c92438",
    "category": "media"
  }
];

  function initTeamDirectory() {
    const rosterGrid = document.getElementById('team-roster');
    const tabButtons = document.querySelectorAll('.team-tab-btn');
    const searchInput = document.getElementById('member-search-input');

    if (!rosterGrid) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function getInitials(name) {
      const clean = name.replace(/Prof\.\s*/i, '').trim();
      const parts = clean.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return clean.slice(0, 2).toUpperCase();
    }

    function renderMembers() {
      rosterGrid.innerHTML = '';

      const filtered = TEAM_MEMBERS.filter(function (m) {
        const matchesCategory = (activeCategory === 'all') || (m.category === activeCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q ||
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.team.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        rosterGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.88rem; background: var(--bg-surface); border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm);">
            [NO VERIFIED MEMBERS MATCHING SPECIFIED CRITERIA]
          </div>
        `;
        return;
      }

      filtered.forEach(function (m) {
        const card = document.createElement('div');
        const isCore = (m.category === 'leadership');
        card.className = 'member-card' + (isCore ? ' featured-card' : '');

        const initials = getInitials(m.name);
        const imageUrl = m.imageUrl || '';

        const photoHtml = imageUrl
          ? `<div class="member-photo-frame">
               <img src="${imageUrl}" alt="${m.name}" class="member-photo" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="member-initials-fallback" style="display: none;">${initials}</div>
             </div>`
          : `<div class="member-photo-frame">
               <div class="member-initials-fallback">${initials}</div>
             </div>`;

        let socialsHtml = `
          <div class="member-socials">
            <a href="https://aimlcluboct.in/team" target="_blank" rel="noopener noreferrer" title="Official Profile" aria-label="Official Profile">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        `;

        if (m.name.includes('Umesh Patel')) {
          socialsHtml = `
            <div class="member-socials">
              <a href="https://linkedin.com/in/umesh-patel-5647b42a4" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/UmeshCode1" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          `;
        } else if (m.name.includes('Prof. Shamaila Khan')) {
          socialsHtml = `
            <div class="member-socials">
              <a href="mailto:shamailakhan@oriental.ac.in" title="Academic Email" aria-label="Email">
                <i class="fa-solid fa-envelope"></i>
              </a>
              <a href="https://aimlcluboct.in/team" target="_blank" rel="noopener noreferrer" title="Faculty Profile" aria-label="Profile">
                <i class="fa-solid fa-graduation-cap"></i>
              </a>
            </div>
          `;
        }

        card.innerHTML = `
          ${photoHtml}
          <h3 class="member-name">${m.name}</h3>
          <div class="member-role">${m.role}</div>
          <div class="member-wing-tag">${m.team}</div>
          ${socialsHtml}
        `;

        rosterGrid.appendChild(card);
      });
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        activeCategory = this.getAttribute('data-team');
        renderMembers();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        renderMembers();
      });
    }

    renderMembers();
  }

  // 09. Full-Screen Mobile Drawer Toggle
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 10. Copy Clone Command Button
  function initCopyButton() {
    const btn = document.getElementById('btn-copy-clone');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const text = 'git clone https://github.com/AIMLCLUBOCT/Workshops.git';
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>';
        setTimeout(function () {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      }).catch(function () {});
    });
  }

  // Initialize all subsystems on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initLiveClock();
    initCustomCursor();
    initScrollProgressRail();
    initRevealObserver();
    initProjectStudio();
    initCurriculumFilter();
    initEventFilters();
    initTeamDirectory();
    initMobileDrawer();
    initCopyButton();
  });

})();
