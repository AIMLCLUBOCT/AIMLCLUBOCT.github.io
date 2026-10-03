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

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let hasMoved = false;

    window.addEventListener('mousemove', function (e) {
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        followerX = e.clientX;
        followerY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      if (hasMoved) {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
      }
    });

    function renderFollower() {
      if (hasMoved) {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderFollower);
    }
    requestAnimationFrame(renderFollower);

    // Interactive Hover Elements
    const interactives = document.querySelectorAll('a, button, .project-feed-card, .curriculum-cell, .notebook-card, .member-card, .gallery-item-card, .timeline-photo-strip figure');
    interactives.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        follower.classList.add('hovering');
        const customText = el.getAttribute('data-cursor') || (el.classList.contains('gallery-item-card') || el.closest('.timeline-photo-strip') ? 'VIEW' : 'EXPLORE');
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


  // 11. Theme Appearance Toggle (Light / Dark)
  function initThemeToggle() {
    const desktopToggle = document.getElementById('theme-toggle');
    const drawerToggle = document.getElementById('drawer-theme-toggle');

    // Retrieve saved theme or default to dark as primary experience
    const savedTheme = localStorage.getItem('aiml_theme');
    let currentTheme = savedTheme || 'dark';

    function applyTheme(theme) {
      currentTheme = theme;
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.add('theme-light');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('theme-light');
      }
      localStorage.setItem('aiml_theme', theme);
      if (desktopToggle) {
        desktopToggle.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      }
    }

    applyTheme(currentTheme);

    function toggle() {
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    if (desktopToggle) desktopToggle.addEventListener('click', toggle);
    if (drawerToggle) drawerToggle.addEventListener('click', toggle);
  }

  // 12. Dynamic Student Activity Radar & Real-Time Notices
  function initStudentActivityRadar() {
    const feedContainer = document.getElementById('live-activity-feed');
    const filterContainer = document.getElementById('activity-filters');
    const refreshBtn = document.getElementById('btn-refresh-feed');
    const headlineEl = document.getElementById('live-notice-headline');
    const totalCountEl = document.getElementById('count-all-act');

    if (!feedContainer) return;

    let activities = [
      {
        id: 'act-01',
        type: 'workshop',
        badge: 'LIVE WORKSHOP LAB',
        statusClass: 'status-live',
        date: 'October 2026',
        title: 'Hands-on MediaPipe Computer Vision & Hand Landmark Tracking Lab',
        host: 'Kinshuk Verma (Tech Lead) & Technical Council',
        venue: 'OCT Computer Lab 4 & Colab GPU Cloud',
        desc: 'Production-ready notebook covering real-time 21 3D hand landmarks, finger state classification, and multi-threaded OpenCV webcam pipelines.',
        links: [
          { text: 'Launch Colab Lab', url: 'https://github.com/AIMLCLUBOCT/Workshops', icon: 'fa-solid fa-flask', btnClass: 'btn-action-primary' },
          { text: 'View Repo', url: 'https://github.com/AIMLCLUBOCT/Workshops', icon: 'fa-brands fa-github', btnClass: 'btn-terminal-outline' }
        ]
      },
      {
        id: 'act-02',
        type: 'hackathon',
        badge: 'REGISTRATIONS OPEN',
        statusClass: 'status-upcoming',
        date: 'November 2026',
        title: 'OCT AI Innovate 2026: Campus Applied Intelligence Hackathon',
        host: 'Gourav Jain, Aarchi Sharma & Event Operations Wing',
        venue: 'Oriental Auditorium & Computer Center',
        desc: '36-hour inter-branch hackathon challenging student engineering teams to build production AI systems for campus automation, healthcare, and safety.',
        links: [
          { text: 'Register Team', url: 'https://chat.whatsapp.com/ITBTDOgerQVLnw9dq7jxN6', icon: 'fa-brands fa-whatsapp', btnClass: 'btn-cobalt-solid' },
          { text: 'Guidelines', url: 'https://github.com/AIMLCLUBOCT/EVENTS', icon: 'fa-solid fa-file-lines', btnClass: 'btn-terminal-outline' }
        ]
      },
      {
        id: 'act-03',
        type: 'code',
        badge: 'NEW BLUEPRINT MERGED',
        statusClass: 'status-code',
        date: 'October 2026',
        title: 'Dual-Mode Phishing & Spam Message Classifier Committed to Projects',
        host: 'AIML Club OCT Open-Source Team',
        venue: 'AIMLCLUBOCT/Projects',
        desc: 'Deployed dual-mode classifier combining Scikit-Learn TF-IDF + MultinomialNB with an offline pure Python mathematical engine for low-compute devices.',
        links: [
          { text: 'Inspect Code', url: 'https://github.com/AIMLCLUBOCT/Projects/tree/main/beginner/phishing-spam-detector', icon: 'fa-brands fa-github', btnClass: 'btn-action-primary' }
        ]
      },
      {
        id: 'act-04',
        type: 'workshop',
        badge: 'COLAB NOTEBOOK',
        statusClass: 'status-code',
        date: 'September 2026',
        title: 'Retrieval-Augmented Generation (RAG) & Vector Database Tutorial',
        host: 'Umesh Patel & Technical Council',
        venue: 'AIMLCLUBOCT/Workshops/advanced',
        desc: 'End-to-end cloud GPU tutorial detailing text chunking, FAISS index construction, embeddings similarity metrics, and LLM synthesis.',
        links: [
          { text: 'Run in Colab', url: 'https://github.com/AIMLCLUBOCT/Workshops/tree/main/advanced', icon: 'fa-solid fa-code', btnClass: 'btn-action-primary' }
        ]
      },
      {
        id: 'act-05',
        type: 'announcement',
        badge: 'COMMUNITY RELEASE',
        statusClass: 'status-announcement',
        date: 'Active Release',
        title: 'Official AIML Club Android App & APK Archive Available for Download',
        host: 'Technical Wing & Operations',
        venue: 'Google Drive APK Distribution',
        desc: 'Official club companion Android application with real-time push announcements, workshop timetables, and offline resource syllabus.',
        links: [
          { text: 'Download APK', url: 'https://drive.google.com/drive/folders/1xRzPHXexGDH9ggROAhSjkI2hPsdRcE9F?usp=sharing', icon: 'fa-brands fa-android', btnClass: 'btn-action-secondary' }
        ]
      },
      {
        id: 'act-06',
        type: 'hackathon',
        badge: 'OPEN ISSUES',
        statusClass: 'status-live',
        date: 'Active Sprint',
        title: 'October Open-Source Sprint: Good First Issues Open for Undergraduates',
        host: 'Mentorship Council',
        venue: 'GitHub Organization Repositories',
        desc: 'Beginner-friendly repository tickets in Python algorithms, data visualization, and test suites. Mentors review and merge student pull requests.',
        links: [
          { text: 'Explore Issues', url: 'https://github.com/issues?q=is%3Aissue+is%3Aopen+org%3AAIMLCLUBOCT+label%3A%22good+first+issue%22', icon: 'fa-brands fa-github', btnClass: 'btn-action-primary' }
        ]
      },
      {
        id: 'act-07',
        type: 'announcement',
        badge: 'MEDIA ARCHIVE',
        statusClass: 'status-announcement',
        date: 'Active Drive',
        title: 'Official Event Photos, Winners Ceremonies & Certificates Archive Available',
        host: 'Media & PR Council',
        venue: 'Google Drive Media Repository',
        desc: 'Access original resolution photo galleries from Aptify 2.0, the 10-12 Sep DSPL Bootcamp, club inauguration, and student certificate archives.',
        links: [
          { text: 'Open Media Drive', url: 'https://drive.google.com/drive/folders/1-_byssQsFS1pw02iDxyt40_n2CdCBaOk?usp=sharing', icon: 'fa-brands fa-google-drive', btnClass: 'btn-action-primary' },
          { text: 'View EVENTS Repo', url: 'https://github.com/AIMLCLUBOCT/EVENTS', icon: 'fa-brands fa-github', btnClass: 'btn-terminal-outline' }
        ]
      }
    ];

    let currentFilter = 'all';

    function renderFeed() {
      const filtered = activities.filter(function (act) {
        if (currentFilter === 'all') return true;
        return act.type === currentFilter;
      });

      if (totalCountEl) totalCountEl.textContent = activities.length;

      feedContainer.innerHTML = filtered.map(function (act) {
        const linkBtns = act.links.map(function (l) {
          return `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="${l.btnClass} btn-xs" data-cursor="VIEW">
            <i class="${l.icon}"></i> <span>${l.text}</span>
          </a>`;
        }).join('');

        return `
          <article class="activity-card" data-category="${act.type}">
            <div>
              <div class="act-card-head">
                <span class="act-badge ${act.statusClass}">${act.badge}</span>
                <span class="act-date">${act.date}</span>
              </div>
              <h3 class="act-title">${act.title}</h3>
              <div class="act-meta-info">
                <span><i class="fa-solid fa-user-tie"></i> ${act.host}</span>
                <span><i class="fa-solid fa-location-dot"></i> ${act.venue}</span>
              </div>
              <p class="act-desc">${act.desc}</p>
            </div>
            <div class="act-card-actions">
              ${linkBtns}
            </div>
          </article>
        `;
      }).join('');
    }

    renderFeed();

    // Filter chip listeners
    if (filterContainer) {
      filterContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-chip');
        if (!btn) return;
        const filter = btn.getAttribute('data-act-filter');
        currentFilter = filter;
        filterContainer.querySelectorAll('.filter-chip').forEach(function (c) {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        renderFeed();
      });
    }

    // Live Sync with GitHub Organization Events API
    function syncLiveGitHubEvents() {
      if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Syncing...</span>';
      }

      fetch('https://api.github.com/orgs/AIMLCLUBOCT/events?per_page=6')
        .then(function (res) { return res.json(); })
        .then(function (events) {
          if (Array.isArray(events) && events.length > 0) {
            const gitHubActivities = events.slice(0, 3).map(function (ev, idx) {
              const repoName = ev.repo ? ev.repo.name.replace('AIMLCLUBOCT/', '') : 'Repository';
              let actionTitle = 'Live Code Update on ' + repoName;
              let actionDesc = 'Recent activity detected in the AIML Club OCT engineering organization.';
              let actType = 'code';

              if (ev.type === 'PushEvent') {
                const commitMsg = ev.payload && ev.payload.commits && ev.payload.commits[0] ? ev.payload.commits[0].message.split('\n')[0] : 'Code enhancements pushed';
                actionTitle = 'Git Push: ' + commitMsg;
                actionDesc = `New commit pushed to ${repoName} by @${ev.actor ? ev.actor.login : 'contributor'}.`;
              } else if (ev.type === 'CreateEvent') {
                actionTitle = 'New Branch / Tag created on ' + repoName;
                actionDesc = `Ref created by @${ev.actor ? ev.actor.login : 'developer'}.`;
              } else if (ev.type === 'IssuesEvent') {
                actionTitle = 'Issue ' + (ev.payload.action || 'updated') + ' on ' + repoName;
                actionDesc = ev.payload.issue ? ev.payload.issue.title : 'Organization issue activity';
                actType = 'hackathon';
              }

              return {
                id: 'gh-' + ev.id,
                type: actType,
                badge: 'LIVE GITHUB SYNC',
                statusClass: 'status-live',
                date: 'Just Recently',
                title: actionTitle,
                host: '@' + (ev.actor ? ev.actor.login : 'AIMLCLUBOCT'),
                venue: repoName,
                desc: actionDesc,
                links: [
                  { text: 'View on GitHub', url: `https://github.com/${ev.repo ? ev.repo.name : 'AIMLCLUBOCT'}`, icon: 'fa-brands fa-github', btnClass: 'btn-action-primary' }
                ]
              };
            });

            // Prepend new GitHub live items if not already added
            const existingIds = new Set(activities.map(a => a.id));
            const freshItems = gitHubActivities.filter(a => !existingIds.has(a.id));
            if (freshItems.length > 0) {
              activities = freshItems.concat(activities);
              renderFeed();
              if (headlineEl && activities[0]) {
                headlineEl.innerHTML = `<strong>⚡ LIVE DISPATCH:</strong> ${activities[0].title} • Click to explore live student activities!`;
              }
            }
          }
        })
        .catch(function () {})
        .finally(function () {
          if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> <span>Live Sync</span>';
          }
        });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', syncLiveGitHubEvents);
    }

    // Run background sync once on load
    setTimeout(syncLiveGitHubEvents, 1200);
  }

  // 13. Propose an Activity Modal Dialog
  function initProposeActivityModal() {
    const openBtn = document.getElementById('btn-propose-activity');
    const modal = document.getElementById('activity-modal');
    const closeBtn = document.getElementById('modal-act-close');
    const cancelBtn = document.getElementById('modal-act-cancel');
    const form = document.getElementById('propose-activity-form');
    const successMsg = document.getElementById('modal-success-msg');

    if (!modal) return;

    function openModal() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (successMsg) successMsg.style.display = 'none';
      if (form) form.reset();
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('act-title').value.trim();
        const category = document.getElementById('act-category').value;
        const audience = document.getElementById('act-audience').value;
        const desc = document.getElementById('act-desc').value.trim();
        const proposer = document.getElementById('act-proposer').value.trim();
        const contact = document.getElementById('act-contact').value.trim();

        // Format message for WhatsApp / Club leads
        const message = `*AIML Club OCT — Student Activity Proposal*%0A%0A*Title:* ${encodeURIComponent(title)}%0A*Category:* ${encodeURIComponent(category)}%0A*Target Audience:* ${encodeURIComponent(audience)}%0A*Description:* ${encodeURIComponent(desc)}%0A*Proposed by:* ${encodeURIComponent(proposer)}%0A*Contact:* ${encodeURIComponent(contact)}`;

        if (successMsg) successMsg.style.display = 'flex';

        setTimeout(function () {
          // Open WhatsApp or community discussions pre-filled
          const waUrl = `https://wa.me/919876543210?text=${message}`;
          const discussionUrl = `https://github.com/AIMLCLUBOCT/learning_resources/discussions/new?category=q-a&title=${encodeURIComponent('[Proposal] ' + title)}&body=${encodeURIComponent(desc + '\n\nProposed by: ' + proposer + ' (' + contact + ')')}`;
          
          window.open(discussionUrl, '_blank');
          setTimeout(closeModal, 1800);
        }, 800);
      });
    }
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

  // 14. Lenis Smooth Scrolling Engine
  function initLenisScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    if (typeof Lenis !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 0.9,
          smoothTouch: false,
          touchMultiplier: 1.5,
          infinite: false
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Keep section spy updated on Lenis scroll
        lenis.on('scroll', function () {
          window.dispatchEvent(new Event('scroll'));
        });
      } catch (err) {}
    }
  }

  // 15. Magnetic Button Micro-Interaction
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    const magneticElements = document.querySelectorAll('.magnetic-btn');
    magneticElements.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;
        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 16. Choreographed Hero Entrance Sequence
  function initHeroEntrance() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const elements = heroSection.querySelectorAll('.reveal-stagger');
    elements.forEach(function (el, idx) {
      setTimeout(function () {
        el.classList.add('visible');
      }, 250 + idx * 140);
    });
  }

    initThemeToggle();
    initStudentActivityRadar();
    initProposeActivityModal();
    initLenisScroll();
    initMagneticButtons();

  // 17. GitHub Contribution Activity Heatmap Grid Generator
  function initGitHubHeatmap() {
    const grid = document.getElementById('github-heatmap-grid');
    if (!grid) return;

    const totalColumns = 36; // ~8 months of weekly columns
    const daysPerColumn = 7;
    let html = '';

    // Deterministic pseudo-random pattern simulating active student development
    for (let c = 0; c < totalColumns; c++) {
      for (let r = 0; r < daysPerColumn; r++) {
        const seed = (c * 7 + r * 13 + 42) % 100;
        let level = 0;
        if (seed > 85) level = 4;
        else if (seed > 65) level = 3;
        else if (seed > 40) level = 2;
        else if (seed > 20) level = 1;

        html += `<div class="heatmap-cell l-${level}" title="Day ${c * 7 + r + 1}: ${level * 3} contributions" data-cursor="VIEW"></div>`;
      }
    }

    grid.innerHTML = html;
  }


  // 18. Accessible Curated Media Lightbox Engine
  function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const backdrop = document.getElementById('lightbox-backdrop');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const categoryEl = document.getElementById('lightbox-category');
    const dateEl = document.getElementById('lightbox-date');
    const counterEl = document.getElementById('lightbox-counter');
    const cards = document.querySelectorAll('.gallery-item-card');

    if (!modal || !cards.length) return;

    let currentIndex = 0;
    let lastActiveElement = null;

    function openLightbox(index) {
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;
      currentIndex = index;

      const card = cards[currentIndex];
      const src = card.getAttribute('data-src') || '';
      const title = card.getAttribute('data-title') || '';
      const category = card.getAttribute('data-category') || '';
      const date = card.getAttribute('data-date') || '';

      if (imgEl) {
        imgEl.src = src;
        imgEl.alt = title;
      }
      if (titleEl) titleEl.textContent = title;
      if (categoryEl) categoryEl.textContent = category;
      if (dateEl) dateEl.textContent = date;
      if (counterEl) counterEl.textContent = (currentIndex + 1) + ' of ' + cards.length;

      lastActiveElement = document.activeElement;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }

    function showNext() {
      openLightbox(currentIndex + 1);
    }

    function showPrev() {
      openLightbox(currentIndex - 1);
    }

    // Attach click listener to each gallery card
    
    // Also wire timeline event photos to open in lightbox
    const timelineFigures = document.querySelectorAll('.timeline-photo-strip figure');
    timelineFigures.forEach(function (fig) {
      fig.addEventListener('click', function () {
        const img = fig.querySelector('img');
        if (!img) return;
        const src = img.getAttribute('src');
        // Find matching gallery card index
        let targetIdx = 0;
        cards.forEach(function (card, idx) {
          if (card.getAttribute('data-src') === src) {
            targetIdx = idx;
          }
        });
        openLightbox(targetIdx);
      });
    });

    cards.forEach(function (card, idx) {
      card.addEventListener('click', function () {
        openLightbox(idx);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Keyboard navigation (Esc, ArrowLeft, ArrowRight)
    window.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      }
    });

    // Mobile touch swipe handling
    let touchStartX = 0;
    modal.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches.length) {
        touchStartX = e.changedTouches[0].clientX;
      }
    }, { passive: true });

    modal.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches.length) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (diff > 50) {
          showPrev();
        } else if (diff < -50) {
          showNext();
        }
      }
    }, { passive: true });
  }

    initHeroEntrance();
    initGitHubHeatmap();
    initLightbox();
    initBackToTop();
    initMetricCounters();

  // 13. Back to Top Button
  function initBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 14. Hero Metric Counter Animation
  function initMetricCounters() {
    const counters = document.querySelectorAll('.metric-val');
    if (!counters.length) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach(function (counter) {
            const text = counter.textContent.trim();
            const target = parseInt(text.replace(/\D/g, ''), 10);
            if (isNaN(target)) return;
            const suffix = text.includes('+') ? '+' : '';
            const pad = text.startsWith('0') && target < 10;
            
            let current = 0;
            const duration = 1200;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const timer = setInterval(function () {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              const displayVal = Math.floor(current);
              counter.textContent = (pad && displayVal < 10 ? '0' : '') + displayVal + suffix;
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsGrid = document.querySelector('.hero-stats-grid');
    if (statsGrid) observer.observe(statsGrid);
  }

  });

})();
