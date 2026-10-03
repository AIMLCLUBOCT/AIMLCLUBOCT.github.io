/**
 * AIML CLUB OCT — OFFICIAL CLIENT RUNTIME
 * Oriental College of Technology, Bhopal
 * Production-Grade Interactive Telemetry, Directory Filtering & UI Engine
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

  // 02. Verified Official Member Roster (41 Members)
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

  // 03. Member Directory Rendering & Filtering Engine
  function initTeamDirectory() {
    const rosterGrid = document.getElementById('team-roster');
    const tabButtons = document.querySelectorAll('.team-tab-btn');
    const searchInput = document.getElementById('member-search-input');

    if (!rosterGrid) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function getInitials(name) {
      const parts = name.replace(/Prof\.\s*/i, '').trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
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
            [NO MEMBERS MATCHING SPECIFIED CRITERIA]
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

        // Safe Fallback for Avatar
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

    // Tab Button Handlers
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        activeCategory = this.getAttribute('data-team');
        renderMembers();
      });
    });

    // Search Input Handler
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        renderMembers();
      });
    }

    // Initial Render
    renderMembers();
  }

  // 04. Event Category Filter
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
          const rowCategory = row.getAttribute('data-category');
          if (filter === 'all' || rowCategory === filter) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // 05. Mobile Navigation Drawer
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', function () {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      drawer.classList.toggle('open');
      drawer.setAttribute('aria-hidden', isExpanded);
    });

    // Close on link click
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 06. Active Nav Link on Scroll (IntersectionObserver)
  function initScrollHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navItems.forEach(function (item) {
            const href = item.getAttribute('href');
            if (href === '#' + activeId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  // Initialize all subsystems on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initLiveClock();
    initTeamDirectory();
    initEventFilters();
    initMobileDrawer();
    initScrollHighlight();
  });

})();
