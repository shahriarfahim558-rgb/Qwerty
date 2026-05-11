/* ══════════════════════════════════════════════════════════════════
   JAVASCRIPT — Fresh rewrite — Single file, zero dependencies
   ──────────────────────────────────────────────────────────────────
    §1  Skill data & modal system
    §2  Theme system (155 themes + auto-cycle + keyboard shortcuts)
    §3  Navigation (scroll spy, mobile menu)
    §4  Hero (typing animation, music player, visualizer)
    §5  Particles & cursor effects
    §6  Terminal (interactive CLI with commands)
    §7  Games engine (16 games with high score tracking)
    §8  Pomodoro timer
    §9  Stats counter animation
    §10 AI Chat (rule-based assistant with fuzzy matching)
    §11 Notes (localStorage)
    §12 Guestbook (localStorage)
    §13 FAQ accordion
    §14 Search modal
    §15 Share / Konami code / Gravity mode
    §16 Silent protection (anti-copy, anti-devtools)
   ══════════════════════════════════════════════════════════════════ */

/* ─────────────────── §1  SKILL DATA & MODALS ─────────────────── */
        const skillData = {
            python: { title: "Python", icon: "fab fa-python", percent: 95, info: [
                { emoji: "🐍", text: "So, I'm actually a student of Diploma Engineering. (yeah, not exactly a dev major, right? xD)" },
                { emoji: "💡", text: "But hey, I'm super hyped about coding, even though I'm still basically a noob!" },
                { emoji: "🚀", text: "Super into diving deep into new stuff I don't know yet (ambitious much? Maybe!)." },
                { emoji: "💬", text: "Hit me up to chat about anything tech, maybe some Hip-hop song, or just life stuff." },
                { emoji: "🦀", text: "I'm currently focusing on Rust for system-level programming." },
                { emoji: "⚙️", text: "Like exploring low-level implementations and abstractions." }
            ]},
            lua: { title: "Lua Script", icon: "fas fa-code", percent: 92, info: [
                { emoji: "🎮", text: "Heavily experienced with game scripting and modding." },
                { emoji: "⚡", text: "Optimized performance for resource-constrained environments." },
                { emoji: "🔧", text: "Created custom automation tools and config scripts." },
                { emoji: "❤️", text: "Love the simplicity and speed of Lua for embedded scripting." }
            ]},
            uiux: { title: "UI/UX Design", icon: "fas fa-palette", percent: 88, info: [
                { emoji: "🎨", text: "Passionate about creating clean, user-centric interfaces." },
                { emoji: "📱", text: "Experienced in responsive design and mobile-first approaches." },
                { emoji: "✨", text: "Focusing on micro-interactions and smooth animations." },
                { emoji: "🧠", text: "Understanding user psychology to build intuitive flows." }
            ]},
            js: { title: "JavaScript & TypeScript", icon: "fab fa-js", percent: 90, info: [
                { emoji: "🌐", text: "Building interactive web experiences and SPAs." },
                { emoji: "📘", text: "TypeScript enthusiast for scalable codebases." },
                { emoji: "⚛️", text: "Familiar with modern frameworks and state management." },
                { emoji: "🚄", text: "Love optimizing performance and bundle sizes." }
            ]},
            db: { title: "Databases & DevOps", icon: "fas fa-database", percent: 85, info: [
                { emoji: "🐘", text: "PostgreSQL for robust relational data management." },
                { emoji: "🍃", text: "MongoDB experience for flexible NoSQL solutions." },
                { emoji: "🐳", text: "Docker containerization for consistent environments." },
                { emoji: "🔄", text: "Setting up CI/CD pipelines for smooth deployments." }
            ]}
        };

/* ─────────────────── §2  THEME SYSTEM ─────────────────────────── */
        // ===== THEME SYSTEM =====
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const themeCards = document.querySelectorAll('.theme-card');


const themes = [
  'dark','obsidian','caribbean','ice','viridian','coral','royal','sunset','aurora','mirror',
  'cyberpunk','volcanic','galaxy','phantom','glacier','steampunk','neon','autumn','saffron','scorpion',
  'sakura','storm','bamboo','matrix','bloodmoon','vaporwave','glitch','coffee','rosegold','cavern',
  'light','paper','cherry','mint','lavender','blueberry','mango','bubblegum','plum','strawberry',
  'aether','emerald','crimson','cobalt','lava','orchid','arctic','koi','midnight','jade',
  'coconut','watermelon','honeydew','desert','blizzard','pool','diamond','pearl','macaron','cloud',
  'spectrum','copper','plasma','lagoon','nebula','citrus','iron','peacock','ruby','sonic',
  'apricot','alabaster','lily','carnation','frosting','dawn','vanilla','breeze','cantaloupe','lychee',
  'bronze','wraith','eclipse','venom','trench','mirage','neural','geode','wisteria','willow',
  'buttercream','petalite','dewdrop','cotton','linen','tidepool','marigold','birch','daisy','clover',
  'matcha','honeysuckle','frostbite','nimbus','golden','porcelain','parchment','quicksilver','rosewood','celestial',
  'seashell','lemon','sky','snowglobe','lilac','peach','pistachio','buttercup','chalk','meringue',
  'rust','oasis','solar','abyss','arcade','ember','vortex','monolith','velvet','specter',
  'onyx','amber','borealis','magenta','titanium','reef','twilight','wavelength','moss','hologram',
  'tar','sludge','abyssal','shade','forge','noir','obsidianflame','raven','void','smolder',
  'eclipse2','hologram2','nebula2','grape','guava'
];

// Auto theme cycling: 155 themes perfectly synced over 24 hours
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    // Divide 1440 minutes (24 hours) by the number of themes to sync perfectly to midnight
    const index = Math.floor(minutesSinceMidnight / (1440 / themes.length)) % themes.length;
    setTheme(themes[index]);
}

setInterval(() => {
    if (!localStorage.getItem('theme')) {
        const now = new Date();
        const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
        const index = Math.floor(minutesSinceMidnight / (1440 / themes.length)) % themes.length;
        setTheme(themes[index]);
        showKbToast('Theme: <kbd>' + themes[index].charAt(0).toUpperCase() + themes[index].slice(1) + '</kbd>');
    }
}, 60000); // check every 60 seconds









function setTheme(theme, skipSave) {
    body.setAttribute('data-theme', theme);
    if (!skipSave) localStorage.setItem('theme', theme);
    updateThemeCards(theme);
    updateThemeToggleIcon(theme);
}

function clearManualTheme() {
    localStorage.removeItem('theme');
}

        function updateThemeCards(activeTheme) {
            themeCards.forEach(card => {
                card.classList.remove('active');
                if (card.dataset.themeValue === activeTheme) card.classList.add('active');
            });
        }

        function updateThemeToggleIcon(theme) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                setTheme(card.dataset.themeValue);
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.transform = ''; }, 150);
            });
        });

let currentThemeIndex = themes.indexOf(body.getAttribute('data-theme') || 'dark');
themeToggle.addEventListener('click', () => {
    clearManualTheme();
    currentThemeIndex = themes.indexOf(body.getAttribute('data-theme') || themes[0]);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex], true);
    themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => themeToggle.style.transform = '', 400);
});

        // ===== CUSTOM CURSOR =====
        const cursorDot = document.getElementById('cursorDot');
        const cursorOutline = document.getElementById('cursorOutline');
        let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px';
        });

// ===== PARTICLE TRAIL =====
let trailThrottle = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - trailThrottle < 50) return;
    trailThrottle = now;
    const p = document.createElement('div');
    p.className = 'trail-particle';
    p.style.left = e.clientX + 'px';
    p.style.top = e.clientY + 'px';
    document.body.appendChild(p);
    requestAnimationFrame(() => {
        p.style.opacity = '0';
        p.style.transform = 'scale(0)';
    });
    setTimeout(() => p.remove(), 500);
});


let cursorPaused = false;
let cursorRaf;
function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15; outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + 'px'; cursorOutline.style.top = outlineY + 'px';
    cursorRaf = requestAnimationFrame(animateCursor);
}
document.addEventListener('scroll', () => {
    if (!cursorPaused) {
        cursorPaused = true;
        cancelAnimationFrame(cursorRaf);
        cursorOutline.style.opacity = '0';
    }
    clearTimeout(window._cursorTimeout);
    window._cursorTimeout = setTimeout(() => {
        cursorPaused = false;
        cursorOutline.style.opacity = '';
        animateCursor();
    }, 200);
}, { passive: true });
animateCursor();


        // ===== HERO NAME ANIMATION =====
        setTimeout(() => { document.getElementById('heroName').classList.add('animate'); }, 1500);

        // ===== ACTIVE NAV LINK =====
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => { if (scrollY >= section.offsetTop - 300) current = section.getAttribute('id'); });
            navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === '#' + current) link.classList.add('active'); });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
        });

        // ===== SKILL MODAL =====
        const skillModalOverlay = document.getElementById('skillModalOverlay');
        const skillModalClose = document.getElementById('skillModalClose');
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalLevelFill = document.getElementById('modalLevelFill');
        const modalPercent = document.getElementById('modalPercent');
        const modalBody = document.getElementById('modalBody');
        const skillItems = document.querySelectorAll('.skill-item');

        function openSkillModal(key) {
            const d = skillData[key]; if (!d) return;
            modalIcon.innerHTML = '<i class="' + d.icon + '"></i>'; modalTitle.textContent = d.title;
            modalLevelFill.style.width = d.percent + '%'; modalPercent.textContent = d.percent + '%';
            modalBody.innerHTML = d.info.map(i => '<div class="skill-info-item"><span class="skill-info-emoji">' + i.emoji + '</span><span class="skill-info-text">' + i.text + '</span></div>').join('');
            skillModalOverlay.classList.add('active'); document.body.style.overflow = 'hidden';
        }
        function closeSkillModal() { skillModalOverlay.classList.remove('active'); document.body.style.overflow = ''; }
        skillItems.forEach(i => i.addEventListener('click', () => openSkillModal(i.dataset.skill)));
        skillModalClose.addEventListener('click', closeSkillModal);
        skillModalOverlay.addEventListener('click', e => { if (e.target === skillModalOverlay) closeSkillModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && skillModalOverlay.classList.contains('active')) closeSkillModal(); });

        // ===== MUSIC PLAYER =====
        const bgAudio = document.getElementById('bgAudio');
        const bgMusicBtn = document.getElementById('bgMusicBtn');
        const bgMusicIcon = document.getElementById('bgMusicIcon');
        const mainAudio = document.getElementById('mainAudio');
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const progressBar = document.getElementById('progressBar');
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        const volumeSlider = document.getElementById('volumeSlider');
        const albumArt = document.getElementById('albumArt');
        const trackTitle = document.getElementById('trackTitle');
        const trackArtist = document.getElementById('trackArtist');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let bgWasPlaying = false;
        let musicIsPlaying = false;

        const playlist = [

            { title: "Lofi Vibes", artist: "Sunflower-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/sunflower.mp3", art: "https://i.ibb.co/LXQxypPv/profile.jpg" },

            { title: "Chill Vibes", artist: "Shape Of You-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/shapeofyou.mp3", art: "https://i.postimg.cc/L4qzJngx/FB-IMG-1777106017984-1.jpg" },

            { title: "Mind Relaxing", artist: "Nevada-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/nevada.mp3", art: "https://i.postimg.cc/FKMhGWGZ/ssstik-io-1776141707423-1.jpg" },

            { title: "Somewhere Only We Know", artist: "Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/somewhereonlyweknow.mp3", art: "https://i.postimg.cc/fWFJpCyw/FB-IMG-1775100888328-1.jpg" },

            { title: "Did I Tell You That I Miss You", artist: "Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/didimissu.mp3", art: "https://i.postimg.cc/nhRRDTtN/Screenshot-20260502-135711-1.jpg" },

            { title: "Paradise", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/Paradise.mp3", art: "https://i.postimg.cc/VLcpmGSc/Screenshot-20260509-161526.png" },
            
            { title: "Around The World", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/AroundTheWorld.mp3", art: "https://i.postimg.cc/Y9Hq1NXZ/Around-The-World-(La-La-La)(MP3-320K)-mp3.jpg" },

            { title: "End Of Beginning", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/EndOfBeginning.mp3", art: "https://i.postimg.cc/J0h8qpjb/End-Of-Beginning-(Lyrics)(MP3-320K)-mp3.jpg" },

            { title: "Heat Waves", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/HeatWaves.mp3", art: "https://i.postimg.cc/fyVFypc4/Heat-Waves-Glass-animals-x-High-Cloud-Cover-(Full-Version)(MP3-320K)-mp3.png" },
            
            { title: "GATA ONLY", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/GATAONLY.mp3", art: "https://i.postimg.cc/KYbdf925/GATA-ONLY-ft-Cris-MJ-slowed-reverb-(MP3-320K)-mp3.jpg" },
                        
            { title: "AFSOS", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/AFSOS.mp3", art: "https://i.postimg.cc/tCCJS5X0/AFSOS-ft-AP-Dhillon-(Official-Visualizer)(MP3-320K)-mp3.jpg" },

            { title: "Broken Angel", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/BrokenAngel.mp3", art: "https://i.postimg.cc/R0rMBQxY/Broken-Angel(MP3-320K)-mp3.png" },

            { title: "Worry", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/worry.mp3", art: "https://i.postimg.cc/ht258KpL/Screenshot-20260509-160902.png" }
            
            { title: "Photocopy Kora Sheet", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/PhotocopyKoraSheet.mp3", art: "https://i.postimg.cc/T3BPPvgs/Amar-Photocopy-Kora-Sheet-Amar-bus-er-last-sheet-vocal-lyrics-Raihan-Rahi-goosebumping-lyrics.jpg" },
            
            { title: "15 Songs Mixed Mashup", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/Mashup.mp3", art: "https://i.postimg.cc/3Rk50khF/Screenshot-20260509-162131-1.jpg" },

            { title: "Espresso", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/Espresso.mp3", art: "https://i.postimg.cc/Wp9T3PPy/Espresso(MP3-320K)-mp3.jpg" },
            
            { title: "Where Are You", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/WhereAreYou.mp3", art: "https://i.postimg.cc/5ydmw2T0/IMG-20260509-140524-108.jpg" },
            
            { title: "Montagem Nada", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/MontagemNadaTropica.mp3", art: "https://i.postimg.cc/7YFvGHtJ/Eternxlkz-Montagem-Nada-Tropica-(Official-Lyrics-Video)(MP3-320K)-mp3.png" },
                        
            { title: "CALMA CALMA", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/CALMACALMA.mp3", art: "https://i.postimg.cc/j2y1yNFv/Screenshot-20260509-161740.png" },

            { title: "DARE", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/DARE.mp3", art: "https://i.postimg.cc/gJmmwzJ4/DARE(MP3-320K)-mp3.png" },

            { title: "Illusionary Daytime x TrackMaker", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/IllusionaryDaytimexTrackMaker.mp3", art: "https://i.postimg.cc/G3G55kkY/Screenshot-20260502-135913-2.jpg" },

            { title: "Taka Taka Taka Tá", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/TakaTakaTaka.mp3", art: "https://i.postimg.cc/cCDxypd5/Automotivo-XM-Taka-Taka-Taka-Ta-(-Dj-Brunin-XM-Mc-Lullu-Mc-Erikah-Kinechan-)(MP3-320K)-mp3.jpg" },

        ];
        let currentTrackIndex = 0;

        function loadTrack(index) {
            const track = playlist[index];
            const pt = document.getElementById('musicPlayerTop');
            pt.classList.add('slide-out');
            setTimeout(() => {
                mainAudio.src = track.src;
                trackTitle.textContent = track.title;
                trackArtist.textContent = track.artist;
                albumArt.src = track.art;
                progressFill.style.width = '0%';
                currentTimeEl.textContent = '0:00';
                durationEl.textContent = '0:00';
                pt.classList.remove('slide-out');
                pt.classList.add('slide-in');
                void pt.offsetWidth;
                pt.classList.remove('slide-in');

                // Auto-play if music was playing before switching
                if (musicIsPlaying) {
                    mainAudio.play().catch(() => {});
                    albumArt.classList.add('spinning');
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                } else {
                    albumArt.classList.remove('spinning');
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            }, 400);
        }
        loadTrack(currentTrackIndex);

function togglePlay() {
    if (mainAudio.paused) {
        if (!bgAudio.paused) { bgAudio.pause(); bgWasPlaying = true; bgMusicIcon.classList.remove('fa-pause'); bgMusicIcon.classList.add('fa-music'); } else bgWasPlaying = false;
        mainAudio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        albumArt.classList.add('spinning');
        musicIsPlaying = true;
        startViz();
    } else {
        mainAudio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        albumArt.classList.remove('spinning');
        musicIsPlaying = false;
        stopViz();
        if (bgWasPlaying) { bgAudio.play(); bgMusicIcon.classList.remove('fa-music'); bgMusicIcon.classList.add('fa-pause'); }
    }
}

        playBtn.addEventListener('click', togglePlay);

        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
        });

        prevBtn.addEventListener('click', () => {
            if (mainAudio.currentTime > 3) {
                mainAudio.currentTime = 0;
            } else {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                loadTrack(currentTrackIndex);
            }
        });

        mainAudio.addEventListener('timeupdate', () => {
            if (mainAudio.duration) {
                progressFill.style.width = (mainAudio.currentTime / mainAudio.duration * 100) + '%';
                currentTimeEl.textContent = formatTime(mainAudio.currentTime);
            }
        });

        mainAudio.addEventListener('loadedmetadata', () => { durationEl.textContent = formatTime(mainAudio.duration); });

        progressBar.addEventListener('click', e => { if (mainAudio.duration) mainAudio.currentTime = (e.offsetX / progressBar.clientWidth) * mainAudio.duration; });
        volumeSlider.addEventListener('input', e => { mainAudio.volume = e.target.value; });

        function formatTime(s) { if (isNaN(s)) return '0:00'; return Math.floor(s/60) + ':' + (Math.floor(s%60) < 10 ? '0' : '') + Math.floor(s%60); }

mainAudio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    stopViz();
});

        // ===== VIDEO PLAYER =====
        const mainVideo = document.getElementById('mainVideo');
        mainVideo.addEventListener('contextmenu', e => e.preventDefault());
        mainVideo.addEventListener('touchstart', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
        const videoPlayBtn = document.getElementById('videoPlayBtn');
        const videoPlayIcon = document.getElementById('videoPlayIcon');
        const videoProgressBar = document.getElementById('videoProgressBar');
        const videoProgressFill = document.getElementById('videoProgressFill');
        const videoCurrentTimeEl = document.getElementById('videoCurrentTime');
        const videoDurationEl = document.getElementById('videoDuration');
        const videoVolumeSlider = document.getElementById('videoVolumeSlider');
        const videoTitle = document.getElementById('videoTitle');
        const videoArtist = document.getElementById('videoArtist');
        const videoPrevBtn = document.getElementById('videoPrevBtn');
        const videoNextBtn = document.getElementById('videoNextBtn');
        const videoPlayerTop = document.getElementById('videoPlayerTop');
        const videoOverlayInfo = document.getElementById('videoOverlayInfo');
        let videoIsPlaying = false;


        const videoPlaylist = [

            { title: "Anime Lover <3", artist: "Anime-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/fahim2.mp4" },

            { title: "I Love Watching At Sky <3", artist: "Sky-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/video2.mp4" },

            { title: "Eyes Never Lies °°", artist: "Eyes-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/video3.mp4" },

            { title: "I love Cat's", artist: "Cat-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/video4.mp4" },

            { title: "Sunny Day & Sky View <3", artist: "Nature-Xecute", src: "https://raw.githubusercontent.com/shahriarfahim558-rgb/Website/main/video1.mp4" },

        ];

        let currentVideoIndex = 0;

        function loadVideo(index) {
            const v = videoPlaylist[index];
            videoPlayerTop.classList.add('switching');
            videoOverlayInfo.style.opacity = '0';
            setTimeout(() => {
                mainVideo.src = v.src;
                videoTitle.textContent = v.title;
                videoArtist.textContent = v.artist;
                videoOverlayInfo.textContent = v.title;
                videoProgressFill.style.width = '0%';
                videoCurrentTimeEl.textContent = '0:00';
                videoDurationEl.textContent = '0:00';
                videoPlayerTop.classList.remove('switching');

                // Auto-play if video was playing before switching
                if (videoIsPlaying) {
                    mainVideo.play().catch(() => {});
                    videoPlayIcon.classList.remove('fa-play');
                    videoPlayIcon.classList.add('fa-pause');
                    videoOverlayInfo.style.opacity = '1';
                    setTimeout(() => { videoOverlayInfo.style.opacity = '0'; }, 2000);
                } else {
                    videoPlayIcon.classList.remove('fa-pause');
                    videoPlayIcon.classList.add('fa-play');
                }
            }, 300);
        }
        loadVideo(currentVideoIndex);

        function toggleVideoPlay() {
            if (mainVideo.paused) {
                if (!mainAudio.paused) { mainAudio.pause(); playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); albumArt.classList.remove('spinning'); musicIsPlaying = false; }
                mainVideo.play();
                videoPlayIcon.classList.remove('fa-play');
                videoPlayIcon.classList.add('fa-pause');
                videoOverlayInfo.style.opacity = '1';
                setTimeout(() => { videoOverlayInfo.style.opacity = '0'; }, 2000);
                videoIsPlaying = true;
            } else {
                mainVideo.pause();
                videoPlayIcon.classList.remove('fa-pause');
                videoPlayIcon.classList.add('fa-play');
                videoIsPlaying = false;
            }
        }

        videoPlayBtn.addEventListener('click', toggleVideoPlay);
        mainVideo.addEventListener('click', toggleVideoPlay);

        videoNextBtn.addEventListener('click', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
            loadVideo(currentVideoIndex);
        });

        videoPrevBtn.addEventListener('click', () => {
            if (mainVideo.currentTime > 3) {
                mainVideo.currentTime = 0;
            } else {
                currentVideoIndex = (currentVideoIndex - 1 + videoPlaylist.length) % videoPlaylist.length;
                loadVideo(currentVideoIndex);
            }
        });

        mainVideo.addEventListener('timeupdate', () => {
            if (mainVideo.duration) {
                videoProgressFill.style.width = (mainVideo.currentTime / mainVideo.duration * 100) + '%';
                videoCurrentTimeEl.textContent = formatTime(mainVideo.currentTime);
            }
        });

        mainVideo.addEventListener('loadedmetadata', () => { videoDurationEl.textContent = formatTime(mainVideo.duration); });
        videoProgressBar.addEventListener('click', e => { if (mainVideo.duration) mainVideo.currentTime = (e.offsetX / videoProgressBar.clientWidth) * mainVideo.duration; });
        videoVolumeSlider.addEventListener('input', e => { mainVideo.volume = e.target.value; });

        mainVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
            loadVideo(currentVideoIndex);
        });

        // ===== BG MUSIC =====
        bgMusicBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (bgAudio.paused) {
                bgAudio.play();
                bgMusicIcon.classList.remove('fa-music');
                bgMusicIcon.classList.add('fa-pause');
            } else {
                bgAudio.pause();
                bgMusicIcon.classList.remove('fa-pause');
                bgMusicIcon.classList.add('fa-music');
            }
        });



/* ─────────────────── §3  SCROLL · TYPING · STATS ──────────────── */
// ===== SCROLL PROGRESS BAR =====
const scrollProgressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
});

// ===== TYPING ANIMATION =====
const typingText = document.getElementById('typingText');
const typingStrings = ['Welcome To My Website <3', 'Developer & Designer', 'Lua Script Enthusiast', 'Python Lover', 'UI/UX Creator'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeWriter() {
    const current = typingStrings[typingIndex];
    if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }
    if (!isDeleting && charIndex === current.length) { isDeleting = true; typingSpeed = 1500; }
    if (isDeleting && charIndex === 0) { isDeleting = false; typingIndex = (typingIndex + 1) % typingStrings.length; typingSpeed = 300; }
    setTimeout(typeWriter, typingSpeed);
}
setTimeout(typeWriter, 1500);

// ===== ANIMATED STATS =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsCounted = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
            statsCounted = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.dataset.target);
                let count = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) { count = target; clearInterval(timer); }
                    num.textContent = Math.floor(count) + '+';
                }, 40);
            });
        }
    });
}, { threshold: 0.5 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ─────────────────── §6  INTERACTIVE TERMINAL ──────────────────── */
// ===== LIVE TERMINAL =====
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

const terminalCommands = {
    help: () => `<span class="output">Available commands:<br>• help     — Show this menu<br>• about    — About Xecute<br>• skills   — List my skills<br>• themes   — How many themes<br>• projects — My projects<br>• contact  — How to reach me<br>• hello    — Say hi<br>• whoami   — Who are you?<br>• clear    — Clear terminal<br>• secret   — ???</span>`,

    about: () => `<span class="output">I'm Xecute — a diploma engineering student who's obsessed with coding.</span>
<span class="output">I love sitting alone, looking at the sky, listening to music.</span>
<span class="output">Currently focusing on Python, Lua, JavaScript & UI Design.</span>`,

    skills: () => `<span class="output">Python ████████████████░ 95%</span>
<span class="output">Lua    ███████████████░░ 92%</span>
<span class="output">JS/TS  ██████████████░░░ 90%</span>
<span class="output">UI/UX  █████████████░░░░ 88%</span>
<span class="output">DB     █████████████░░░░ 85%</span>`,



themes: () => `<span class="output">155 themes available: Dark, Light, Caribbean, Ice, Viridian, Paper, Royal, Sunset,</span>
<span class="output">Aurora, Cherry, Cyberpunk, Volcanic, Galaxy, Mint, Lavender, Desert,</span>
<span class="output">Neon, Autumn, Blizzard, Pool, Sakura, Storm, Diamond, Matrix,</span>
<span class="output">Blood Moon, Vaporwave, Glitch, Coffee, Rose Gold, Cavern, Obsidian, Coral,</span>
<span class="output">Bamboo, Steampunk, Phantom, Saffron, Glacier, Scorpion, Mirror, Frostbite,</span>
<span class="output">Aether, Emerald, Crimson, Cobalt, Lava, Orchid, Arctic, Koi,</span>
<span class="output">Midnight, Jade, Spectrum, Copper, Plasma, Lagoon, Nebula, Citrus,</span>
<span class="output">Iron, Peacock, Ruby, Sonic, Onyx, Amber, Borealis, Magenta,</span>
<span class="output">Titanium, Reef, Twilight, Wavelength, Moss, Hologram, Bronze, Wraith,</span>
<span class="output">Eclipse, Venom, Trench, Mirage, Neural, Geode, Wisteria, Willow,</span>
<span class="output">Matcha, Honeysuckle, Pearl, Nimbus, Golden, Porcelain, Parchment, Quicksilver,</span>
<span class="output">Rosewood, Celestial, Rust, Oasis, Solar, Abyss, Arcade, Ember,</span>
<span class="output">Vortex, Monolith, Velvet, Specter, Daisy, Clover, Seashell, Lemon,</span>
<span class="output">Sky, Cotton, Linen, Tidepool, Marigold, Birch, Snowglobe, Lilac,</span>
<span class="output">Peach, Pistachio, Buttercup, Carnation, Frosting, Dawn, Vanilla, Breeze,</span>
<span class="output">Tar, Chalk, Sludge, Meringue, Abyssal, Apricot, Shade, Alabaster, Forge, Lily,</span>
<span class="output">Noir, Macaron, Obsidian Flame, Cloud, Raven, Buttercream, Void, Petalite, Smolder, Dewdrop,</span>
<span class="output">Blueberry, Mango, Bubblegum, Plum, Strawberry, Coconut, Watermelon, Honeydew,</span>
<span class="output">Cantaloupe, Lychee, Grape, Guava, Eclipse², Hologram², Nebula²</span>`,


    projects: () => `<span class="output">1. Xecute-WiFi    - Grab WiFi passwords</span>
<span class="output">2. Stream-Xecute  - Watch movies & series</span>
<span class="output">3. Xecute Obfuscator - Encrypt your code</span>
<span class="output">4. Got a new idea? Let's create it together.</span>`,

    contact: () => `<span class="output">Telegram: @iXecute</span>
<span class="output">Email:    xecute558@hotmail.com</span>
<span class="output">GitHub:   github.com/The-Xecute</span>
<span class="output">Website:  chithi.me/xecute</span>`,

    hello: () => `<span class="output">Hey there! 👋 Thanks for visiting my portfolio!</span>`,

    whoami: () => `<span class="output">You are a visitor exploring Xecute's world. Welcome! 🌍</span>`,

    clear: () => 'CLEAR',

    secret: () => `<span class="output">🎉 You found the secret!</span>
<span class="output">Here's a cookie: 🍪</span>
<span class="output">Fun fact: This portfolio has 155 themes and was built with pure HTML, CSS & JS.</span>
<span class="output">No frameworks. No libraries. Just vibes. ✨</span>`,

    gravity: () => {
        toggleGravity();
        return '<span class="output">Gravity disabled! Everything is falling... 🪂</span>';
    }
};



terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        if (!cmd) return;

        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = '<span class="prompt">~$ </span><span class="command">' + cmd + '</span>';
        terminalBody.appendChild(cmdLine);

        if (terminalCommands[cmd]) {
            const result = terminalCommands[cmd]();
            if (result === 'CLEAR') {
                terminalBody.innerHTML = '';
            } else {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line';
                outputLine.innerHTML = result;
                terminalBody.appendChild(outputLine);
            }
        } else {
            const errorLine = document.createElement('div');
            errorLine.className = 'terminal-line';
            errorLine.innerHTML = '<span class="error">Command not found: ' + cmd + '. Type "help" for available commands.</span>';
            terminalBody.appendChild(errorLine);
        }

        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

terminalInput.addEventListener('focus', () => { document.addEventListener('keydown', terminalKeyStop); });
terminalInput.addEventListener('blur', () => { document.removeEventListener('keydown', terminalKeyStop); });
function terminalKeyStop(e) { if (['ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) e.preventDefault(); }

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== KEYBOARD SHORTCUTS =====
const kbToast = document.getElementById('kbToast');
let kbToastTimer;
function showKbToast(msg) {
    kbToast.innerHTML = msg;
    kbToast.classList.add('show');
    clearTimeout(kbToastTimer);
    kbToastTimer = setTimeout(() => kbToast.classList.remove('show'), 1500);
}

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
        const idx = num - 1;
        if (idx < themes.length) {
            setTheme(themes[idx]);
            showKbToast('Theme: <kbd>' + themes[idx].charAt(0).toUpperCase() + themes[idx].slice(1) + '</kbd>');
        }
    }
    if (e.key === '0') {
        setTheme('dark');
        showKbToast('Theme: <kbd>Dark</kbd>');
    }
});

// ===== MUSIC VISUALIZER =====
const vizBars = document.querySelectorAll('.viz-bar');
let vizInterval;
function startViz() {
    if (vizInterval) return;
    vizInterval = setInterval(() => {
        vizBars.forEach(bar => {
            const h = Math.random() * 20 + 4;
            bar.style.height = h + 'px';
            bar.style.opacity = 0.4 + Math.random() * 0.6;
        });
    }, 120);
}
function stopViz() {
    clearInterval(vizInterval);
    vizInterval = null;
    vizBars.forEach(bar => { bar.style.height = '4px'; bar.style.opacity = '0.7'; });
}



// ===== TEXT SCRAMBLE =====
const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';
const navLinksAll = document.querySelectorAll('.nav-link');
navLinksAll.forEach(link => {
    const originalText = link.textContent.trim();
    let isScrambling = false;

    link.addEventListener('mouseenter', () => {
        if (isScrambling) return;
        isScrambling = true;
        let iteration = 0;
        const interval = setInterval(() => {
            link.childNodes.forEach(node => {
                if (node.nodeType === 3) {
                    const text = node.textContent;
                    let scrambled = '';
                    for (let i = 0; i < text.length; i++) {
                        if (i < iteration) scrambled += text[i];
                        else scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    }
                    node.textContent = scrambled;
                }
            });
            iteration += 1 / 2;
            if (iteration >= originalText.length) {
                clearInterval(interval);
                link.textContent = originalText;
                isScrambling = false;
            }
        }, 30);
    });
});

// ===== KONAMI CODE =====
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
            konamiIndex = 0;
            document.getElementById('konamiOverlay').classList.add('active');
        }
    } else {
        konamiIndex = 0;
    }
});
document.getElementById('konamiClose').addEventListener('click', () => {
    document.getElementById('konamiOverlay').classList.remove('active');
});

window.addEventListener('load', () => {
    bgAudio.volume = 0.5;
});

function startBgOnFirstInteraction() {
    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            bgMusicIcon.classList.remove('fa-music');
            bgMusicIcon.classList.add('fa-pause');
        }).catch(() => {});
    }
    document.removeEventListener('click', startBgOnFirstInteraction);
    document.removeEventListener('scroll', startBgOnFirstInteraction);
    document.removeEventListener('touchstart', startBgOnFirstInteraction);
}

/* ─────────────────── §8  POMODORO TIMER ────────────────────────── */
// ===== POMODORO TIMER =====
let pomodoroTime = 25 * 60;
let pomodoroRunning = false;
let pomodoroInterval = null;
let pomodoroSessions = parseInt(localStorage.getItem('pom-sessions') || '0');
let pomodoroMode = 'focus';
const pomodoroModes = { focus: 25 * 60, short: 5 * 60, long: 15 * 60, custom: 25 * 60 };
const pomodoroLabels = { focus: 'Focus Session', short: 'Short Break', long: 'Long Break', custom: 'Custom Timer' };

document.getElementById('pomodoroSessions').textContent = pomodoroSessions;

function setPomodoroMode(mode) {
    pomodoroMode = mode;
    pomodoroTime = pomodoroModes[mode] !== undefined ? pomodoroModes[mode] : 25 * 60;
    pomodoroRunning = false;
    clearInterval(pomodoroInterval);
    document.getElementById('pomodoroStartBtn').textContent = 'Start';
    document.getElementById('pomodoroLabel').textContent = pomodoroLabels[mode] || 'Custom Timer';
    updatePomodoroDisplay();
    document.querySelectorAll('.pomodoro-mode-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-secondary)';
    });
    const btnId = mode === 'focus' ? 'pomFocusBtn' : mode === 'short' ? 'pomShortBtn' : mode === 'long' ? 'pomLongBtn' : null;
    if (btnId) {
        document.getElementById(btnId).style.background = 'var(--accent)';
        document.getElementById(btnId).style.color = 'var(--bg-primary)';
    }
}

function updatePomodoroDisplay() {
    const m = Math.floor(pomodoroTime / 60);
    const s = pomodoroTime % 60;
    document.getElementById('pomodoroDisplay').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function togglePomodoro() {
    if (pomodoroRunning) {
        pomodoroRunning = false;
        clearInterval(pomodoroInterval);
        document.getElementById('pomodoroStartBtn').textContent = 'Resume';
    } else {
        pomodoroRunning = true;
        document.getElementById('pomodoroStartBtn').textContent = 'Pause';
        pomodoroInterval = setInterval(() => {
            pomodoroTime--;
            updatePomodoroDisplay();
            if (pomodoroTime <= 0) {
                clearInterval(pomodoroInterval);
                pomodoroRunning = false;
                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
                if (pomodoroMode === 'focus') {
                    pomodoroSessions++;
                    localStorage.setItem('pom-sessions', pomodoroSessions);
                    document.getElementById('pomodoroSessions').textContent = pomodoroSessions;
                }
                document.getElementById('pomodoroStartBtn').textContent = 'Start';
                setPomodoroMode(pomodoroMode === 'focus' ? 'short' : 'focus');
            }
        }, 1000);
    }
}

function resetPomodoro() {
    pomodoroRunning = false;
    clearInterval(pomodoroInterval);
    pomodoroTime = pomodoroModes[pomodoroMode];
    updatePomodoroDisplay();
    document.getElementById('pomodoroStartBtn').textContent = 'Start';
}

function adjustTimer(seconds) {
    if (pomodoroRunning) return;
    pomodoroTime = Math.max(0, pomodoroTime + seconds);
    updatePomodoroDisplay();
    // Deselect mode buttons since it's now custom
    document.querySelectorAll('.pomodoro-mode-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-secondary)';
    });
    document.getElementById('pomodoroLabel').textContent = 'Custom Timer';
}

function setQuickTimer(minutes, event) {
    if (pomodoroRunning) return;
    pomodoroTime = minutes * 60;
    pomodoroMode = 'custom';
    pomodoroRunning = false;
    clearInterval(pomodoroInterval);
    document.getElementById('pomodoroStartBtn').textContent = 'Start';
    document.getElementById('pomodoroLabel').textContent = minutes >= 60 ? (minutes / 60) + 'h Timer' : minutes + 'm Timer';
    updatePomodoroDisplay();
    // Highlight the clicked quick button
    document.querySelectorAll('.quick-timer-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-muted)';
        b.style.borderColor = 'var(--border)';
    });
    event.target.style.background = 'var(--accent)';
    event.target.style.color = 'var(--bg-primary)';
    event.target.style.borderColor = 'var(--accent)';
}

updatePomodoroDisplay();

/* ─────────────────── §11 QUICK NOTES (localStorage) ────────────── */
// ===== QUICK NOTES =====
const notes = JSON.parse(localStorage.getItem('xecute-notes') || '[]');

function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function renderNotes() {
    const list = document.getElementById('notesList');
    if (notes.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.85rem;">No notes yet. Write something above!</div>';
        return;
    }
    list.innerHTML = notes.map((n, i) => `
        <div class="note-item glass">
            <span class="note-text">${escapeHtml(n.text)}</span>
            <span class="note-date">${new Date(n.date).toLocaleDateString()}</span>
            <button class="note-delete" onclick="deleteNote(${i})"><i class="fas fa-times"></i></button>
        </div>
    `).reverse().join('');
}

function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;
    notes.push({ text: text, date: new Date().toISOString() });
    localStorage.setItem('xecute-notes', JSON.stringify(notes));
    input.value = '';
    renderNotes();
}

function deleteNote(index) {
    const realIndex = notes.length - 1 - index;
    notes.splice(realIndex, 1);
    localStorage.setItem('xecute-notes', JSON.stringify(notes));
    renderNotes();
}

document.getElementById('noteInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addNote();
});

renderNotes();


/* ─────────────────── §12 GUESTBOOK (localStorage) ──────────────── */
// ===== GUESTBOOK =====
const guestbook = JSON.parse(localStorage.getItem('xecute-guestbook') || '[]');

function renderGuestbook() {
    const el = document.getElementById('guestbookEntries');
    if (guestbook.length === 0) {
        el.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.85rem;">Be the first to sign the guestbook!</div>';
        return;
    }
    el.innerHTML = guestbook.map((e, i) => `
        <div class="note-item glass">
            <div style="flex:1;">
                <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px;color:var(--accent);">${escapeHtml(e.name)}</div>
                <div class="note-text">${escapeHtml(e.message)}</div>
                <div class="note-date">${new Date(e.date).toLocaleString()}</div>
            </div>
        </div>
    `).reverse().join('');
}

function addGuestEntry() {
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();
    if (!name || !message) return;
    guestbook.push({ name, message, date: new Date().toISOString() });
    localStorage.setItem('xecute-guestbook', JSON.stringify(guestbook));
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
    renderGuestbook();
}

renderGuestbook();



/* ─────────────────── §10 AI CHAT (rule-based + fuzzy match) ────── */
// ===== AI CHAT SECTION =====
var chatMsgs=document.getElementById('chatMsgs');
var chatInput=document.getElementById('chatTypeInput');
var chatBtns=document.getElementById('chatBtns');
var chatHelpDrop=document.getElementById('chatHelpDrop');
var chatHelpBtn=document.getElementById('chatHelpBtn');
var chatMsgCount=0;

var chatK={
    'hello|hi|hey|yo|sup|wassup|good morning|good evening|good afternoon':[
        'Hey there! 👋 Welcome to Xecute\'s portfolio.',
        'I\'m his AI assistant — ask about skills, projects, contact, hobbies, themes, games, or anything!',
        'What would you like to know?'
    ],
    'who is xecute|about xecute|tell me about|who are you':[
        'Xecute is a <span class="hl">Diploma Engineering student</span> from Bangladesh who\'s deeply obsessed with coding.',
        'Started in <span class="hl">2022</span> with Python and hasn\'t stopped learning since.',
        'Stack: Python, Lua, JS/TS, UI/UX Design, Databases. Currently exploring <span class="hl">Rust</span>. 🦀',
        'Fun fact: He loves sitting alone looking at the sky while listening to music. 🎵'
    ],
    'skills|what can you do|tech stack|technologies|what does he know':[
        'Here\'s the full stack:',
        '🐍 <span class="hl">Python</span> — 95% — Automation, tools, scripting',
        '📜 <span class="hl">Lua Script</span> — 92% — Game scripting, modding',
        '⚡ <span class="hl">JavaScript & TypeScript</span> — 90% — Web development',
        '🎨 <span class="hl">UI/UX Design</span> — 88% — Interfaces & user experience',
        '🗄️ <span class="hl">Databases & DevOps</span> — 85% — PostgreSQL, MongoDB, Docker',
        '🦀 <span class="hl">Rust</span> — Currently learning',
        'Prefers <span class="hl">vanilla HTML/CSS/JS</span> over frameworks. Raw power! 💪'
    ],
    'projects|portfolio|work|what has he built':[
        '📡 <span class="hl">Xecute-WiFi</span> — Grab WiFi passwords on rooted devices',
        '🎬 <span class="hl">Stream-Xecute</span> — Watch movies & series online',
        '🔒 <span class="hl">Xecute Obfuscator</span> — Encrypt and protect your code',
        '💡 Got a new idea? He\'s always open to collaborate! Check Projects section above. 🔗'
    ],
    'contact|reach|email|telegram|how to reach|get in touch':[
        '📨 <span class="hl">Telegram</span> — @iXecute',
        '📧 <span class="hl">Email</span> — xecute558@hotmail.com',
        '💬 <span class="hl">Messages</span> — chithi.me/xecute',
        '🐙 <span class="hl">GitHub</span> — github.com/The-Xecute',
        'He\'s open to freelance and collaborations! 🤝'
    ],
    'hobbies|free time|interests|what does he do for fun':[
        '<span class="hl">10 hobbies</span> — the guy\'s got range!',
        '📸 Photography · 🎮 Gaming · 🎸 Music (guitar & lo-fi)',
        '🥾 Hiking & outdoors · 😂 Creating memes · 🎬 Movies',
        '🌍 Languages · 💪 Gym · 🚴 Cycling · 💻 Coding'
    ],
    'themes|how many themes|design|visual styles':[
'<span class="hl">155 unique themes</span>! Dark, Light, Caribbean, Ice, Viridian, Paper, Royal Blue & Gold, Sunset, Aurora, Cherry, Cyberpunk, Volcanic, Galaxy, Mint, Lavender, Desert, Neon, Autumn, Blizzard, Pool, Sakura Night, Thunderstorm, Diamond, Matrix, Blood Moon, Vaporwave, Glitch, Coffee, Rose Gold, Cavern, Obsidian, Coral, Bamboo, Steampunk, Phantom, Saffron, Glacier, Scorpion, Mirror, Frostbite, Aether, Emerald, Crimson, Cobalt, Lava, Orchid, Arctic, Koi, Midnight, Jade, Spectrum, Copper, Plasma, Lagoon, Nebula, Citrus, Iron, Peacock, Ruby, Sonic, Onyx, Amber, Borealis, Magenta, Titanium, Reef, Twilight, Wavelength, Moss, Hologram, Bronze, Wraith, Eclipse, Venom, Trench, Mirage, Neural, Geode, Wisteria, Willow, Matcha, Honeysuckle, Pearl, Nimbus, Golden, Porcelain, Parchment, Quicksilver, Rosewood, Celestial, Rust, Oasis, Solar, Abyss, Arcade, Ember, Vortex, Monolith, Velvet, Specter, Daisy, Clover, Seashell, Lemon, Sky, Cotton, Linen, Tidepool, Marigold, Birch, Snowglobe, Lilac, Peach, Pistachio, Buttercup, Carnation, Frosting, Dawn, Vanilla, Breeze, Tar, Chalk, Sludge, Meringue, Abyssal, Apricot, Shade, Alabaster, Forge, Lily, Noir, Macaron, Obsidian Flame, Cloud, Raven, Buttercream, Void, Petalite, Smolder, Dewdrop, Blueberry, Mango, Bubblegum, Plum, Strawberry, Coconut, Watermelon, Honeydew, Cantaloupe, Lychee, Grape, Guava, Eclipse², Hologram², Nebula².',
        'Each has <span class="hl">custom animated backgrounds</span> and glassmorphism!',
        'Press <span class="hl">1-9</span> and <span class="hl">0</span> to quick-switch. Or swipe in Themes section. 🔑'
    ],
    'games|mini games|play|what games':[
        '<span class="hl">16 mini games</span>: Reaction, Tic Tac Toe, Memory, Whack-a-Mole, Snake, Flappy Bird, Simon Says, Typing Speed, 2048, Brick Breaker, Minesweeper, Hangman.',
        'All with <span class="hl">high score tracking</span>! Try to beat your best. 🏆'
    ],
    'location|where|from|country|where does he live':[
        '<span class="hl">Sherpur, Mymensingh</span>, Bangladesh 🇧🇩',
        'Small district, big dreams. Proof you don\'t need a big city for big things! 🌍'
    ],
    'python|lua|javascript|typescript|what languages':[
        '<span class="hl">Python</span> — 95% — automation, tools, scripting.',
        '<span class="hl">Lua</span> — 92% — game scripting, modding.',
        '<span class="hl">JS/TS</span> — 90% — web development, prefers vanilla.',
        'Adding <span class="hl">Rust</span> to the list now. Next frontier! 🦀'
    ],
    'rust|learning|future|next':[
        'Currently diving into <span class="hl">Rust</span> for system-level programming.',
        'Loves exploring <span class="hl">low-level implementations</span> and memory safety.',
        'Always seeking the next challenge! 🚀'
    ],
    'age|old|born|birthday|how old':[
        'Started coding in <span class="hl">2022</span> — a few years now.',
        'Age is classified! 😄 But young, hungry, and ambitious.',
        'Hello World to 155 themes in under 3 years — that\'s speed! ⚡'
    ],
    'website|url|link|built with|what is this':[
        'You\'re on it! 🎉 Built with <span class="hl">pure HTML, CSS & JavaScript</span>.',
        '155 themes, music player, video player, terminal, 16 games, AI chat, Pomodoro, guestbook, notes, FAQ...',
        'All in a <span class="hl">single HTML file</span>. That\'s the flex. 💪'
    ],
    'freelance|available|hire|work with|collaborate':[
        'Yes! Open to <span class="hl">freelance</span> work and collaborations!',
        'Python automation, game scripting, UI/UX, full-stack web apps — hit him up on Telegram! 📨'
    ],
    'spotify|music|now playing|song|listening':[
        'Check the <span class="hl">music player</span> in the hero section!',
        '6 tracks with album art, progress bar, and visualizer. Loves Lofi and Hip-hop. 🎵'
    ],
    'thank|thanks|awesome|cool|nice|great|love it':[
        'That means a lot! 🙏 If you haven\'t yet, <span class="hl">sign the guestbook</span>!',
        'Feel free to ask anything else. I\'m always here! 💬'
    ],
    'help|commands|what can i ask|how does this work':[
        'I\'m a <span class="hl">rule-based AI assistant</span> built into the portfolio.',
        'I know everything about Xecute. Try: skills, projects, contact, hobbies, themes, games, location!',
        'Just type naturally — I\'ll try to understand! 🧠'
    ],
    'ai|real|gpt|chatgpt|claude|gemini|llm|model':[
        'I\'m a <span class="hl">custom-built</span> — not GPT or Claude, but I know my stuff! 😎',
        'Pattern matching + curated knowledge = fast, accurate answers about Xecute.',
        'Not bad for zero API calls, right? 💯'
    ],
    'terminal|command line|console':[
        'Found the <span class="hl">interactive terminal</span> too! Type <span class="hl">help</span> there.',
        'Also responds to: gravity, about, themes, projects, secret (try it! 🔮)'
    ],
    'secret|easter egg|hidden|surprise':[
        '🤫 Found the terminal secret command! Try: ↑↑↓↓↓←→←→BA for <span class="hl">Konami Code</span>!',
        'Type <span class="hl">gravity</span> in terminal for chaos mode! 🪂'
    ],
    'blog|article|write|content':[
        'No blog yet, but on the roadmap!',
        'For now, the <span class="hl">guestbook</span> and <span class="hl">terminal</span> are the best ways to leave your mark. 📝'
    ],
    'school|college|university|study|education|diploma':[
        'Studying <span class="hl">Diploma Engineering</span>.',
        'Mostly self-taught when it comes to coding. Passion beats pedigree! 🔥'
    ],
    'phone|mobile|device|android|ios':[
        'Fully <span class="hl">responsive</span> — works on all devices.',
        'All 16 games support <span class="hl">touch controls</span>. Try Snake or Flappy on mobile! 📱'
    ],
    'instagram|tiktok|youtube|facebook|social':[
        '📸 <span class="hl">@the_xecute</span> · 🎵 <span class="hl">@the_xecute</span> · 📘 <span class="hl">Shahriar.X.Fahim</span>',
        '🐙 <span class="hl">github.com/The-Xecute</span> · 💬 chithi.me/xecute'
    ],
    'xecute|name meaning|why xecute|what does it mean':[
        '<span class="hl">Xecute</span> — to carry out with precision and efficiency. 💎',
        '"Execute with style." — that\'s the vibe. ⚡'
    ],
    'best|favorite|proud|impressive':[
        'Proudest: this <span class="hl">entire portfolio</span> in one HTML file.',
        '155 themes, 16 games, music player, video player, AI chat, Pomodoro, terminal, guestbook, notes, FAQ...',
        'No build tools, no frameworks. Pure dedication. That\'s the real flex. 🏆'
    ],
    'can you code|write code|build something':[
        'I can\'t write code (I\'m a bot 😅) but Xecute says:',
        '"<span class="hl">Got an idea? Let\'s create it together!</span>" — DM him on Telegram! 🚀'
    ],
    'what can you do|your features|capabilities':[
        '✅ Skills & experience',
        '✅ Projects with links',
        '✅ Contact info',
        '✅ Hobbies, themes, games',
        '✅ Fuzzy matching (handles typos!)',
        '✅ Multi-line responses',
        '❌ Write code, browse web, make coffee ☕'
    ],
    'dark mode|light mode|theme switch|change theme':[
        '<span class="hl">155 themes</span> available! Tap the sun/moon icon (top right) to cycle through.',
        'Or press <span class="hl">1-9</span> and <span class="hl">0</span> keys for quick switch.',
        'Swipe left/right in the Themes section on mobile! 📱'
    ],
    'how to play|game controls|how games work':[
        '🎮 <span class="hl">Snake</span> — Arrow keys or swipe + on-screen buttons',
        '🐦 <span class="hl">Flappy</span> — Tap, click, or press the LAUNCH button',
        '🧱 <span class="hl">2048</span> — Arrow keys, swipe, or on-screen buttons',
        '💣 <span class="hl">Minesweeper</span> — Tap cells, use 🚩 flag mode button',
        '⌨️ <span class="hl">Typing</span> — Just type the words shown!',
        '🎯 <span class="hl">Hangman</span> — Type letters or tap the on-screen keys',
        'All games have <span class="hl">touch support</span> for mobile! 📱'
    ],
    'pomodoro|timer|focus|study|productivity':[
        '<span class="hl">Pomodoro Timer</span> built in — Focus 25m, Short Break 5m, Long Break 15m.',
        'Quick timers: 1m, 5m, 10m, 15m, 25m, 30m, 45m, 1h — just tap!',
        'Use +/- buttons for custom time. Sessions are saved locally! ⏱️'
    ],
    'notes|sticky notes|remember|save ideas':[
        '<span class="hl">Quick Notes</span> section — jot down ideas, saved in your browser.',
        'No account needed. Just type and hit Add! Notes persist across refreshes. 📝'
    ],
    'guestbook|sign|message|leave a message':[
        '<span class="hl">Guestbook</span> — leave your name and a message!',
        'All entries saved locally in your browser. Be the first to sign! ✍️'
    ],
    'faq|frequently asked|common questions':[
        '<span class="hl">FAQ section</span> covers:',
        '• Freelance availability',
        '• Tech stack details',
        '• Theme count',
        '• Code usage policy',
        'Click any question to expand the answer! 📋'
    ],
    'search|find something|ctrl k|lookup':[
        'Press <span class="hl">Ctrl+K</span> (or ⌘K on Mac) to open search!',
        'Or click the 🔍 icon (top left). Searches all sections instantly! 🔎'
    ],
    'keyboard shortcut|hotkey|keys':[
        '<span class="hl">1-9, 0</span> — Quick theme switch',
        '<span class="hl">Ctrl+K</span> — Open search',
        '<span class="hl">Esc</span> — Close modals/search',
        '<span class="hl">↑↑↓↓↓←→←→BA</span> — Konami Code (in terminal section) 🎮'
    ],
    'animation|transition|smooth|effect':[
        'This portfolio uses <span class="hl">custom CSS animations</span> — no libraries!',
        'Glassmorphism, gradient orbs, particle trails, text scramble, hover effects...',
        'All GPU-accelerated with `transform` and `opacity`. Zero jank! ✨'
    ],
    'glass|glassmorphism|blur|frosted':[
        'Every card uses <span class="hl">glassmorphism</span> — frosted glass effect.',
        'Custom per-theme: each theme adjusts glass opacity, border glow, and reflection.',
        'Scroll-aware: glass highlights reduce when scrolling for performance! 🪟'
    ],
    'performance|speed|fast|loading|optimize':[
        'Optimized for <span class="hl">60fps</span> on all devices.',
        'Zero layout shifts, lazy animations, `will-change` hints, `contain` layout.',
        'Single HTML file with zero external dependencies (except fonts & icons). ⚡'
    ],
    'single file|one file|no framework|no library|vanilla':[
        'Yes — <span class="hl">everything in one HTML file</span>. ~50K+ lines.',
        'No React, no Vue, no Tailwind CDN. All hand-written CSS and vanilla JS.',
        'Why? Because it proves you CAN. Skill over shortcuts. 💪'
    ],
    'inspiration|motivated|why coding|passion':[
        'Xecute says: "I love sitting alone, looking at the sky while listening to music."',
        'Coding started as curiosity, became obsession. <span class="hl">Passion > pressure</span>.',
        'Dream: flying in the sky. Literally. 🛩️'
    ],
    'difficult|hard|challenge|struggle':[
        'Biggest challenge? Being <span class="hl">self-taught</span> with no mentor.',
        'YouTube tutorials, docs, trial and error — the hard way builds real understanding.',
        '"If it was easy, everyone would do it." 💎'
    ],
    'tip|advice|beginner|learn|start':[
        'Xecute\'s #1 tip: <span class="hl">Build projects, not tutorials</span>.',
        'Tutorial hell is real. Build something broken, fix it, repeat. That\'s how you grow.',
        'Start with Python — it\'s the most forgiving language for beginners. 🐍'
    ],
    'github|code|repository|source':[
        '🐙 <span class="hl">github.com/The-Xecute</span> — check it out!',
        'This portfolio itself is open to inspect and learn from.',
        'But please don\'t copy — be creative! 🎨'
    ],
    'error|bug|broken|not working|fix':[
        'Found a bug? <span class="hl">DM on Telegram</span> — @iXecute',
        'He actually reads reports and fixes things fast! 🐛→🦋'
    ],
    'update|new|coming soon|roadmap|plan':[
        'On the roadmap:',
        '• 📝 Blog system',
        '• 🎨 More themes',
        '• 🎮 More games',
        '• 💬 Real AI integration',
        'Stay tuned! 🚀'
    ],
    'good night|bye|see you|later|gtg|gn':[
        'Good night! 🌙 Thanks for visiting Xecute\'s portfolio!',
        'Come back anytime — this portfolio never sleeps! 😴'
    ],
    'morning|good day|gm|wake up':[
        'Good morning! ☀️ Ready to explore? Start with the themes section!',
        'New day, new theme to try. There are 155 after all! 🎨'
    ],
    'lol|haha|funny|joke|humor':[
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄',
        '...okay that was terrible. But I tried. 😂'
    ],
    'bored|nothing to do|boring':[
        'Try these!',
        '🎮 Play all 16 games and beat your high scores',
        '🎨 Cycle through all 155 themes',
        '💻 Explore the terminal commands',
        '⌨️ Try the Konami code (↑↑↓↓↓←→←→BA in terminal)',
        '⏱️ Set a Pomodoro focus session',
        '📝 Write something in the guestbook'
    ],
    'wow|amazing|incredible|mind blowing':[
        'Glad you like it! 🎉 All built with <span class="hl">pure dedication</span>.',
        'Every pixel, every animation, every game — handcrafted. No shortcuts! 💎'
    ],
    'compare|better|vs|versus|other portfolios':[
        'Not about being "better" — it\'s about being <span class="hl">unique</span>.',
        '155 themes, 16 games, AI chat, music player, video player — all in ONE file.',
        'That\'s the statement. Not "better than yours" — "this is mine." 💪'
    ],
    'size|how big|how many lines|kb|mb|file size':[
        'The entire portfolio is one <span class="hl">HTML file</span> — no external CSS or JS files.',
        'Tens of thousands of lines. Compressed, it\'s surprisingly small. Uncompressed... well, it\'s thorough! 📏'
    ],
    'cursor|mouse|custom cursor|pointer':[
        'Custom <span class="hl">dot + outline cursor</span> with smooth trailing effect!',
        'Plus particle trail on mouse movement. Auto-hides on scroll for performance.',
        'Desktop only — touch devices don\'t need it. 🖱️'
    ],
    'share|send to friend|recommend|show someone':[
        'Use the <span class="hl">Share</span> button in the hero section!',
        'Uses native Web Share API on mobile, copies link on desktop. 📤'
    ],
    'visit counter|views|how many visits|popular':[
        'Visit counter at the bottom — saved in <span class="hl">localStorage</span>.',
        'You\'re visit number <span class="hl">#' + (parseInt(localStorage.getItem('xecute-visits')||'0')) + '</span>! 🎉'
    ],
    'back to top|scroll up|go up':[
        'Click the <span class="hl">↑ arrow button</span> (bottom right) to scroll to top.',
        'Appears after scrolling down 500px. Smooth animation! ⬆️'
    ],
    'scroll|scrolling|progress bar|how far':[
        '<span class="hl">Progress bar</span> at the very top shows how far you\'ve scrolled.',
        'Thin line that fills with the accent color. Subtle but useful! 📊'
    ],
    'text scramble|text effect|hover effect|nav effect':[
        'Nav links have a <span class="hl">text scramble effect</span> on hover!',
        'Characters randomize briefly then resolve to the original text. Cyberpunk vibes! ✨'
    ],
    'konami|up up down down|cheat code|secret code':[
        '<span class="hl">↑↑↓↓↓←→←→BA</span> — The classic Konami Code!',
        'Activate it while the terminal section is in view for a surprise popup. 🎮',
        'Try it now! Focus on the terminal area first.'
    ],
    'gravity|fall|everything falls|chaos mode':[
        'Type <span class="hl">gravity</span> in the terminal for chaos mode!',
        'All elements fall and rotate. A restore button appears to fix everything. 🪂'
    ],
    'what time|time|clock|timezone':[
        'Xecute is in <span class="hl">Bangladesh Time (BST)</span> — UTC+6.',
        'Current time on your device: ' + new Date().toLocaleTimeString() + ' ⏰'
    ],
    'weather|temperature|climate|rain|sunny':[
        'No live weather API (keeps it lightweight!), but Sherpur vibes:',
        'Tropical monsoon climate 🌧️ — perfect for coding with chai! ☕'
    ],
    'food|eat|hungry|restaurant|chai|tea':[
        'Can\'t code on an empty stomach! ☕ <span class="hl">Cha and biscuits</span> fuel the grind.',
        'Xecute\'s tip: "Never code hungry. Always have chai nearby." 🍵'
    ],
    'sleep|tired|rest|exhausted|late night':[
        'Late night coding? That\'s when the best ideas come! 🌙',
        'But also: sleep is important. Even Xecute needs rest sometimes. 😴'
    ],
    'friend|group|team|collaboration|partner':[
        'Looking for collabs? <span class="hl">DM @iXecute on Telegram</span>!',
        'Open to: pair programming, open source, hackathons, creative projects. 🤝'
    ],
    'money|price|cost|free|paid|charge':[
        'This portfolio? <span class="hl">100% free</span> to explore and learn from.',
        'For freelance work — depends on the project scope. DM to discuss! 💰'
    ],
    'resume|cv|hire me|job|employment|career':[
        'No traditional resume — <span class="hl">this portfolio IS the resume</span>.',
        '155 themes, 16 games, AI chat, music/video players... speaks louder than PDF. 📄'
    ],
    'test|testing|qa|quality|debug':[
        'Xecute tests by <span class="hl">using the site himself</span> daily.',
        'If something breaks, he\'s usually the first to notice. Dogfooding! 🐕'
    ],
    'color|palette|design system|ui design':[
        'Each of the <span class="hl">155 themes</span> has a complete design system:',
        'Background, text, accent, border, glow, glass — all as CSS variables.',
        'Switches instantly with zero flash. Smooth 0.8s transitions! 🎨'
    ],
    'responsive|mobile|tablet|desktop|screen size|breakpoint':[
        'Fully <span class="hl">responsive</span> with 3 breakpoints:',
        '📱 Mobile (<768px) · 💻 Tablet (768px+) · 🖥️ Desktop (1024px+)',
        'Nav, grid, fonts, games — all adapt. Try resizing your browser! 📐'
    ],
    'api|backend|server|frontend|full stack':[
        'Primarily <span class="hl">frontend</span>, but knows backend basics.',
        'Python scripting, database queries, Docker — enough to go full stack when needed! 🔧'
    ],
    'react|vue|angular|svelte|next|framework|why no':[
        'Why no framework? <span class="hl">Skill demonstration</span>.',
        '"Anyone can install React. Not everyone can build this from scratch." 💪',
        'Plus: zero build step, zero dependencies, instant loading. ⚡'
    ],
    'css|style|design|layout|flexbox|grid':[
        'All <span class="hl">hand-written CSS</span> — no Tailwind, no Bootstrap.',
        'Flexbox for layout, Grid for themes/games, custom properties for theming.',
        'Glass effects use layered gradients and masks. Pure CSS magic! 🪄'
    ],
    'javascript|vanilla js|plain js|no jquery':[
        'All <span class="hl">vanilla JavaScript</span> — no jQuery, no Lodash, no moment.js.',
        'Shows deep understanding of the language. ES6+, async/await, canvas, Web APIs...',
        'If you can build this without frameworks, you can build anything. 🚀'
    ],
    'design tool|figma|sketch|adobe|xd':[
        '<span class="hl">Figma</span> for UI/UX design prototyping.',
        'Plans layouts there first, then translates to pixel-perfect CSS. 🎨'
    ],
    'favorite theme|best theme|which theme|recommend theme':[
        'Can\'t pick a favorite — but popular ones:',
        '👑 <span class="hl">Royal</span> — Blue & Gold luxury vibes',
        '🌊 <span class="hl">Pool</span> — Unique underwater sun reflection',
        '⌨️ <span class="hl">Matrix</span> — Code rain aesthetic',
        '🩸 <span class="hl">Blood Moon</span> — Dark and moody',
        'Try them all and find yours! 🎨'
    ],
    'dark theme|default theme|standard theme':[
        '<span class="hl">Dark</span> is the default — classic monochrome elegance.',
        'White accent on black background. Timeless and professional. 🖤'
    ],
    'light theme|white theme|bright':[
        '<span class="hl">Light</span> theme — clean, bright, minimal.',
        'Great for daytime browsing or well-lit environments. ☀️'
    ],
    'how long|time taken|hours|months|years to build':[
        'Started <span class="hl">2022</span>, continuously improved since.',
        '155 themes alone took serious dedication. Each has unique animated backgrounds!',
        '16 games, music player, video player, AI chat, Pomodoro... it never stops! 🔨'
    ],
    'first project|beginning|start|started coding':[
        'First project: <span class="hl">Xecute-WiFi</span> — a Python WiFi tool for rooted Android.',
        'That first "it works!" moment was everything. The rest is history! 🚀'
    ],
    'biggest project|largest|most complex':[
        'This <span class="hl">portfolio itself</span> — 50K+ lines in one file.',
        '155 themes × unique backgrounds × glass effects × 16 games × players × chat × timer...',
        'Most complex single-file project he\'s ever attempted. And it works! 🏗️'
    ],
    'fail|failure|mistake|wrong|error':[
        'Mistakes? Many. But every bug fixed is a lesson learned.',
        '"The only real failure is giving up." — Xecute\'s philosophy 💪'
    ],
    'dream|goal|ambition|aspiration|future plan':[
        'Short term: master <span class="hl">Rust</span> and ship more projects.',
        'Long term: become a <span class="hl">full-stack developer</span> who can build anything.',
        'Ultimate dream: <span class="hl">flying in the sky</span> ✈️ (literally, not figuratively!)'
    ],
    'special|unique|different|standout|one of a kind':[
        'What makes this special:',
        '• <span class="hl">155 themes</span> with animated backgrounds',
        '• <span class="hl">16 playable games</span> with high scores',
        '• <span class="hl">AI chat</span> with fuzzy matching',
        '• <span class="hl">Music + Video</span> players',
        '• All in <span class="hl">one HTML file</span>',
        'Not a template. Not a generator. Hand-built. 🔥'
    ],
    'who made|developer|creator|author|made by':[
        'Built by <span class="hl">Xecute</span> (Shahriar Fahim) — every line, every pixel.',
        'No team, no agency — just one person with too much ambition. 😅'
    ],
    'feedback|suggestion|improve|better':[
        'Got feedback? <span class="hl">DM on Telegram</span> — @iXecute!',
        'He reads everything and actually cares. Rare quality these days! 💬'
    ],
    'version|update history|changelog|v1|v2':[
        'No version numbers — it <span class="hl">continuously evolves</span>.',
        'New themes, games, and features added regularly. Always improving! 📈'
    ],
    'hosting|deploy|where hosted|server|domain':[
        'Portfolio code is hosted on <span class="hl">GitHub Pages</span> (via raw files).',
        'Stream-Xecute on a free host. Content delivery via CDNs. Zero cost! 🌐'
    ],
    'encrypt|security|protect|safe|privacy':[
        'No sensitive data in the frontend — it\'s a portfolio, not a bank vault! 🔒',
        'Contact info is intentionally public. That\'s the point of a portfolio!'
    ],
    'open source|github code|view source':[
        'Right-click → View Page Source works (we removed the block).',
        '<span class="hl">Learn from it</span>, but please don\'t copy directly. Be original! 🎨'
    ],
    'like|love|heart|favorite|best portfolio|coolest':[
        'Thanks! 🙏 That really means a lot!',
        'Every like, share, and guestbook entry motivates to keep improving! ❤️'
    ],
    'random|surprise me|anything|idk|dunno':[
        'Random fact: This portfolio has more lines of CSS than some novels have words! 📖',
        'Or try asking: <span class="hl">skills</span>, <span class="hl">themes</span>, <span class="hl">games</span>, <span class="hl">projects</span>!',
        'Or press <span class="hl">Ctrl+K</span> and search for anything! 🔎'
    ],
    'yes|yep|yeah|sure|ok|confirm|true':[
        'Great! But what are you confirming? 😄',
        'Try being more specific — I know a LOT about Xecute!'
    ],
    'no|nope|nah|never|false|wrong':[
        'Hmm, I respect that! But what\'s the question? 🤔',
        'Try asking about: <span class="hl">skills</span>, <span class="hl">projects</span>, <span class="hl">contact</span>...'
    ],
    'what|how|why|when|where|who':[
        'Good questions! But I need more context 😄',
        'Try: "What <span class="hl">skills</span>..." or "How to <span class="hl">contact</span>..."'
    ],
    'please|help me|assist|support|explain':[
        'Of course! I\'m here to help. What do you need to know? 🤝',
        'Try: <span class="hl">skills</span>, <span class="hl">projects</span>, <span class="hl">contact</span>, <span class="hl">themes</span>...'
    ],
    'thanks bro|thanks dude|nice bro|good work|well done':[
        'Appreciate that! 🙏 Means a lot coming from you!',
        'If you like it, consider <span class="hl">signing the guestbook</span> before you go! ✍️'
    ],
    'bangla|bengali|bangladesh|বাংলা':[
        'Xecute is from <span class="hl">Bangladesh 🇧🇩</span>! বাংলাদেশ!',
        'Sherpur, Mymensingh — a beautiful small district.',
        'He can respond in both English and Bangla! 🇧🇩'
    ],
    'marka|shahriar|fahim|real name|actual name':[
        'Xecute\'s real name is <span class="hl">Shahriar Fahim</span>.',
        '"Xecute" is his online identity — sharp and memorable, just like his code! 💎'
    ]
};

var chatAllQ=['What are your skills?','Show me projects','How to contact Xecute?','Tell me about themes','What games are here?','Where are you from?','Tell me about Xecute','What\'s the tech stack?','What are his hobbies?','Is he available for freelance?','How many themes?','Tell me about Lua','What about Rust?','What is this website built with?','Tell me about Python','What games does he play?','Where can I find him on social media?','Is he self-taught?'];





function chatEnter(e){if(e.key==='Enter')chatSend()}

function chatSend(t){
    var text=t||chatInput.value;
    if(!text||!text.trim())return;
    text=text.trim();
    chatInput.value='';
    var wrap=document.createElement('div');
    wrap.style.cssText='display:flex;flex-direction:column;align-items:flex-end';
    var ts=document.createElement('span');
    ts.style.cssText='font-size:.6rem;color:var(--text-muted);margin-bottom:3px;padding:0 10px;align-self:flex-end;opacity:.6';
    var d=new Date();
    ts.textContent=(d.getHours()<10?'0':'')+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes();
    wrap.appendChild(ts);
    var bubble=document.createElement('div');
    bubble.className='chat-bubble user';
    bubble.textContent=text;
    wrap.appendChild(bubble);
    chatMsgs.appendChild(wrap);
    chatMsgs.scrollTop=chatMsgs.scrollHeight;
    chatMsgCount++;
    var typingWrap=document.createElement('div');
    typingWrap.id='typingIndicator';
    typingWrap.innerHTML='<div class="chat-bubble typing-ind"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
    chatMsgs.appendChild(typingWrap);
    chatMsgs.scrollTop=chatMsgs.scrollHeight;
    setTimeout(function(){
        var ti=document.getElementById('typingIndicator');
        if(ti)ti.remove();
        var response=chatGetResponse(text);
        if(!Array.isArray(response)) response=[response];
        var responseWrap=document.createElement('div');
        responseWrap.style.cssText='display:flex;flex-direction:column;align-items:flex-start';
        var badge=document.createElement('span');
        badge.style.cssText='font-size:.55rem;color:var(--text-muted);padding:0 10px;align-self:flex-start;opacity:.5';
        badge.textContent='AI';
        responseWrap.appendChild(badge);
        response.forEach(function(line){
            var respBubble=document.createElement('div');
            respBubble.className='chat-bubble bot';
            respBubble.innerHTML=line;
            responseWrap.appendChild(respBubble);
        });
        chatMsgs.appendChild(responseWrap);
        chatMsgs.scrollTop=chatMsgs.scrollHeight;
        chatRefreshQ();
    },800+Math.random()*600);
}


// Close dropdown on outside click
document.addEventListener('click',function(e){
    if(e.target.closest('.chat-qbtn'))return;
    if(e.target.closest('.chat-help-btn'))return;
    if(e.target.closest('.chat-help-drop'))return;
    if(e.target.closest('.chat-type-send'))return;
    if(e.target.closest('.chat-type-input'))return;
    chatHelpDrop.classList.remove('show');
    chatHelpBtn.classList.remove('open');
});


// Welcome + 2 random suggestions
var allSuggestions=['What are your skills?','Show me projects','How to contact Xecute?','Tell me about themes','What games are here?','Where are you from?','Tell me about Xecute','What are his hobbies?','What tech stack?','Is he available for freelance?','How many themes?','Tell me about Lua','What about Rust?','What is this website built with?','Tell me about Python','Where can I find him on social media?','Is he self-taught?'];
var shuffled=allSuggestions.sort(function(){return .5-Math.random()});
var pickedSuggestions=shuffled.slice(0,2+Math.floor(Math.random()*2));

setTimeout(function(){
    var w=document.createElement('div');
    w.className='chat-welcome';
    w.innerHTML='<div class="chat-welcome-text">👋 Click a suggestion or type below</div>';
    chatMsgs.appendChild(w);
    
    pickedSuggestions.forEach(function(q){
        var btn=document.createElement('div');
        btn.style.cssText='align-self:center;cursor:pointer;padding:8px 16px;border-radius:var(--radius-full);border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);font-size:.78rem;font-weight:600;transition:all .2s ease;white-space:nowrap;margin:3px 0;';
        btn.textContent=q;
        btn.onmouseover=function(){btn.style.borderColor='var(--accent)';btn.style.color='var(--accent)';btn.style.transform='translateY(-1px)';};
        btn.onmouseout=function(){btn.style.borderColor='var(--border)';btn.style.color='var(--text-secondary)';btn.style.transform='';};
        btn.onclick=function(){chatSend(q);btn.remove();};
        chatMsgs.appendChild(btn);
    });
},200);



/* ─────────────────── §13 FAQ ACCORDION ─────────────────────────── */
// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
    
    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = '0px');
    document.querySelectorAll('.faq-question i').forEach(i => i.style.transform = 'rotate(0deg)');
    
    if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

/* ─────────────────── §14 SEARCH MODAL ──────────────────────────── */
// ===== SEARCH =====
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.120rem;">Start typing to search...</div>';
        setTimeout(() => document.getElementById('searchInput').focus(), 100);
    }
}

function performSearch(query) {
    const results = document.getElementById('searchResults');
    if (!query.trim()) {
        results.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.85rem;">Start typing to search...</div>';
        return;
    }
    const q = query.toLowerCase();
    const found = [];
    
    document.querySelectorAll('section[id]').forEach(section => {
        const text = section.textContent;
        const title = section.querySelector('.section-title')?.textContent || section.id;
        if (text.toLowerCase().includes(q)) {
            const idx = text.toLowerCase().indexOf(q);
            const start = Math.max(0, idx - 40);
            const end = Math.min(text.length, idx + query.length + 40);
            const snippet = (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
            found.push({ title: title.trim(), section: section.id, snippet });
        }
    });
    
    if (found.length === 0) {
        results.innerHTML = '<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.85rem;">No results found for "' + query + '"</div>';
        return;
    }
    
    results.innerHTML = found.map(f => `
        <div onclick="document.getElementById('${f.section}').scrollIntoView({behavior:'smooth'});toggleSearch();" style="padding:16px 20px;border-radius:var(--radius-md);cursor:pointer;transition:all 0.2s ease;border:1px solid var(--border);margin-bottom:8px;background:var(--bg-card);" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="font-weight:700;font-size:0.9rem;color:var(--accent);margin-bottom:4px;">${f.title}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;">${f.snippet}</div>
        </div>
    `).join('');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('searchModal');
        if (modal.style.display === 'flex') toggleSearch();
    }
    // Ctrl+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});

/* ─────────────────── §15 SHARE · GRAVITY · KONAMI ──────────────── */
// ===== SHARE =====
async function sharePortfolio() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Xecute Portfolio',
                text: 'Check out this amazing portfolio with 155 themes!',
                url: window.location.href
            });
        } catch(e) {}
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showKbToast('Link copied to clipboard!');
        });
    }
}

// ===== GRAVITY MODE =====
let gravityActive = false;
function toggleGravity() {
    gravityActive = !gravityActive;
    const overlay = document.getElementById('gravityOverlay');
    overlay.style.display = gravityActive ? 'flex' : 'none';
    
    document.querySelectorAll('.glass, .theme-card, .hobby-card, .project-card, .social-card, .stat-card, .btn').forEach((el, i) => {
        if (gravityActive) {
            el.style.transition = 'transform 2s cubic-bezier(0.55,0,1,0.45), opacity 2s ease';
            el.style.transform = 'translateY(' + (window.innerHeight + 200) + 'px) rotate(' + (Math.random() * 720 - 360) + 'deg)';
            el.style.opacity = '0';
        } else {
            el.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease';
            el.style.transform = '';
            el.style.opacity = '';
        }
    });
}

// ===== CLICK SOUNDS (using AudioContext) =====
let audioCtx;
function playClickSound(type) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'click') {
        osc.frequency.value = 800;
        gain.gain.value = 0.05;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'theme') {
        osc.frequency.value = 600;
        gain.gain.value = 0.08;
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.stop(audioCtx.currentTime + 0.2);
    }
}

document.querySelectorAll('button:not(.play-btn):not(.control-btn):not(.pomodoro-mode-btn):not(.faq-question):not(.note-delete):not(.skill-modal-close):not(.konami-close)').forEach(el => {
    el.addEventListener('click', () => playClickSound('click'));
});

themeCards.forEach(card => {
    card.addEventListener('click', () => playClickSound('theme'));
});

// ===== SWIPE THEME NAVIGATION =====
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
        const themesSection = document.getElementById('themes');
        const rect = themesSection.getBoundingClientRect();
        // Only trigger if we're in the themes section area
        if (window.scrollY >= rect.top - 200 && window.scrollY <= rect.bottom + 200) {
            if (diffX > 0) {
                // Swipe left = next theme
                currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            } else {
                // Swipe right = previous theme
                currentThemeIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
            }
            setTheme(themes[currentThemeIndex]);
            showKbToast('Theme: <kbd>' + themes[currentThemeIndex].charAt(0).toUpperCase() + themes[currentThemeIndex].slice(1) + '</kbd>');
        }
    }
});


// ===== VISIT COUNTER =====
let visits = parseInt(localStorage.getItem('xecute-visits') || '0');
visits++;
localStorage.setItem('xecute-visits', visits);
document.getElementById('visitCount').textContent = visits;





// ===== ALL 155 THEMES TIME-BASED =====
function autoThemeByTime() {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    // Divide 1440 minutes (24 hours) by the number of themes to sync perfectly to midnight
    const index = Math.floor(totalMinutes / (1440 / themes.length)) % themes.length;
    setTheme(themes[index], true);
}
autoThemeByTime();
setInterval(autoThemeByTime, 60000);






/* ─────────────────── §7  MINI GAMES ENGINE (16 games) ─────────── */
// ===== MINI GAMES ENGINE =====
const gameInits={}; // THIS WAS MISSING - caused theme break!
const GAMES=[
{id:'reaction',name:'Reaction',icon:'fa-bolt',info:'Click when green. Faster = better!'},
{id:'tictactoe',name:'Tic Tac Toe',icon:'fa-hashtag',info:'You are X. Beat the AI!'},
{id:'memory',name:'Memory',icon:'fa-clone',info:'Find all matching pairs.'},
{id:'whack',name:'Whack',icon:'fa-hand-back-fist',info:'Tap the moles! 30 seconds.'},
{id:'snake',name:'Snake',icon:'fa-worm',info:'Arrow keys / swipe to move.'},
{id:'flappy',name:'Flappy',icon:'fa-dove',info:'Tap / click to flap up.'},
{id:'simon',name:'Simon',icon:'fa-circle-nodes',info:'Repeat the color pattern.'},
{id:'typing',name:'Typing',icon:'fa-keyboard',info:'Type the words. 30 seconds.'},
{id:'g2048',name:'2048',icon:'fa-table-cells',info:'Swipe / arrows to merge tiles.'},
{id:'breaker',name:'Breaker',icon:'fa-cubes',info:'Move paddle. Break all bricks.'},
{id:'mines',name:'Mines',icon:'fa-bomb',info:'Reveal safe cells. Flag mines.'},
{id:'hangman',name:'Hangman',icon:'fa-person',info:'Guess the tech word.'}, // <-- COMMA ADDED HERE

{id:'pong',name:'Pong',icon:'fa-table-tennis-paddle-ball',info:'Mouse/touch to move. First to 5 wins!'},
{id:'wordle',name:'Wordle',icon:'fa-spell-check',info:'Guess the 4-letter word. 5 tries.'},
{id:'connect4',name:'Connect 4',icon:'fa-grip',info:'Drop chips. Connect 4 to win!'},
{id:'colormatch',name:'Color Match',icon:'fa-palette',info:'Tap the TEXT color, not the word!'}
];

let currentGame=null,cleanupFns=[];
function gid(id){return document.getElementById(id);}
function cleanupGame(){cleanupFns.forEach(function(f){f();});cleanupFns=[];gid('gameArea').innerHTML='';gid('gameControls').innerHTML='';}
function addClean(fn){if(typeof fn==='number'){var id=fn;cleanupFns.push(function(){try{clearTimeout(id);}catch(e){}try{clearInterval(id);}catch(e){}});}else if(typeof fn==='function'){cleanupFns.push(fn);}return fn;}
function getHS(n){return parseInt(localStorage.getItem('xg-'+n)||'0');}
function setHS(n,s,lb){var c=getHS(n);if(lb?s<c||c===0:s>c){localStorage.setItem('xg-'+n,s);return true}return false}
function gScore(t){gid('gScore').innerHTML=t?t:'';}
function gHigh(n){var s=getHS(n);gid('gHigh').innerHTML=s?'Best: <span>'+s+'</span>':'';}
function gInfo(t){gid('gInfo').textContent=t||'';}
function showControls(html){gid('gameControls').innerHTML=html;}

// Build selector
var sel=gid('gameSelector');
GAMES.forEach(function(g){
    var b=document.createElement('button');
    b.className='game-sel-btn';b.dataset.id=g.id;
    b.innerHTML='<i class="fas '+g.icon+'"></i>'+g.name;
    b.onclick=function(){selectGame(g.id);};
    sel.appendChild(b);
});

function selectGame(id){
    if(currentGame===id)return;
    var area=gid('gameArea');
    area.classList.add('switching');
    setTimeout(function(){
        cleanupGame();currentGame=id;
        var g=GAMES.find(function(x){return x.id===id;});
        sel.querySelectorAll('.game-sel-btn').forEach(function(b){b.classList.toggle('active',b.dataset.id===id);});
        gid('gHdrIcon').className='game-hdr-icon fas '+g.icon;
        gid('gHdrName').textContent=g.name;
        gid('gRestart').style.display='';
        gScore('');gHigh(id);gInfo(g.info);
        if(gameInits[id])gameInits[id]();
        area.classList.remove('switching');
    },150);
}
function restartGame(){var g=currentGame;if(!g)return;currentGame=null;cleanupGame();setTimeout(function(){selectGame(g);},150);}

// ===== 1. REACTION TIME =====
gameInits.reaction=function(){
    var a=gid('gameArea');
    a.innerHTML='<div class="reaction-box" id="rBox" style="background:var(--bg-card)"><span style="color:var(--text-muted);font-weight:600;font-size:.9rem">Click to Start</span></div>';
    var box=gid('rBox'),state='wait',st;
    box.onclick=function(){
        if(state==='wait'){
            state='ready';box.style.background='var(--text-muted)';
            box.innerHTML='<span style="color:var(--bg-primary);font-weight:700">Wait...</span>';
            var reactionTimer=setTimeout(function(){
                state='go';box.style.background='var(--accent)';
                box.innerHTML='<span style="color:var(--bg-primary);font-weight:700">CLICK!</span>';
                st=Date.now();
            },1000+Math.random()*4000);
            addClean(function(){clearTimeout(reactionTimer);});
        }else if(state==='ready'){
            state='wait';box.style.background='var(--bg-card)';
            box.innerHTML='<span style="color:#ff6b6b;font-weight:700">Too early!</span><br><span style="color:var(--text-muted);font-size:.8rem">Tap to retry</span>';
        }else if(state==='go'){
            var t=Date.now()-st;state='result';
            box.style.background='var(--bg-card)';
            box.innerHTML='<span style="color:var(--accent);font-weight:900;font-size:1.8rem">'+t+'ms</span><br><span style="color:var(--text-muted);font-size:.8rem">Tap to retry</span>';
            gScore(t+'ms');
            if(setHS('reaction',t,true))gHigh('reaction');
        }else{state='wait';box.style.background='var(--bg-card)';box.innerHTML='<span style="color:var(--text-muted);font-weight:600;font-size:.9rem">Click to Start</span>';}
    };
};

// ===== 2. TIC TAC TOE (UNBEATABLE AI) =====
gameInits.tictactoe=function(){
    var a=gid('gameArea');
    a.innerHTML='<div class="ttt-grid" id="tttGrid"></div>';
    var grid=gid('tttGrid'),board=Array(9).fill(''),turn='X',over=false;
    var wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    
    function render(){
        grid.innerHTML=board.map(function(c,i){return '<div class="ttt-cell '+(c==='X'?'x':c==='O'?'o':'')+'" data-i="'+i+'">'+c+'</div>';}).join('');
        grid.querySelectorAll('.ttt-cell').forEach(function(c){c.onclick=function(){play(+c.dataset.i);};});
    }
    
    function check(b){
        for(var w=0;w<wins.length;w++){
            var a2=wins[w][0],b2=wins[w][1],c2=wins[w][2];
            if(b[a2]&&b[a2]===b[b2]&&b[a2]===b[c2])return b[a2];
        }
        return b.includes('')?null:'D';
    }
    
    // Upgraded Minimax with Depth - Makes AI aggressive and flawless
    function minimax(b, depth, isMax){
        var r=check(b);
        if(r==='X') return 10 - depth; // Player wins: bad for AI, worse if it happens late
        if(r==='O') return depth - 10; // AI wins: good for AI, better if it happens early
        if(r==='D') return 0;

        if(isMax){ // Player's turn (Maximizing)
            var best=-9999;
            for(var i=0;i<9;i++){
                if(!b[i]){
                    b[i]='X';
                    best=Math.max(best,minimax(b,depth+1,false));
                    b[i]='';
                }
            }
            return best;
        } else { // AI's turn (Minimizing)
            var best=9999;
            for(var i=0;i<9;i++){
                if(!b[i]){
                    b[i]='O';
                    best=Math.min(best,minimax(b,depth+1,true));
                    b[i]='';
                }
            }
            return best;
        }
    }
    
    function aiMove(){
        var bestScore=9999; 
        var bestMoves=[]; // Store all equally good moves
        
        for(var i=0;i<9;i++){
            if(!board[i]){
                board[i]='O';
                var score=minimax(board,0,true); // Check outcome after AI places 'O'
                board[i]='';
                
                if(score<bestScore){
                    bestScore=score;
                    bestMoves=[i]; // Found a better move, reset list
                } else if(score===bestScore){
                    bestMoves.push(i); // Found an equally good move
                }
            }
        }
        
        // Pick randomly from the best moves so it doesn't play exactly the same every time
        if(bestMoves.length>0){
            var move=bestMoves[Math.floor(Math.random()*bestMoves.length)];
            board[move]='O';
        }
    }
    
    function play(i){
        if(over||board[i]||turn!=='X')return;
        board[i]='X';turn='O';render();
        var r=check(board);
        if(r){end(r);return;}
        var ttt=setTimeout(function(){
            aiMove();
            turn='X';render();
            var r2=check(board);
            if(r2)end(r2);
            else gScore('Your turn (X)');
        },350);
        addClean(function(){clearTimeout(ttt);});
    }
    
    function end(r){
        over=true;
        if(r==='D'){gScore('Draw!');gInfo("It's a draw! Unbeatable tied.");}
        else if(r==='X'){gScore('You Win!');gInfo('Impossible! You beat the AI!');}
        else{gScore('AI Wins');gInfo('O wins. The AI is unbeatable!');}
    }
    
    render();gScore('Your turn (X)');
};

// ===== 3. MEMORY MATCH =====
gameInits.memory=function(){
    var icons=['fa-moon','fa-sun','fa-bolt','fa-heart','fa-star','fa-fire','fa-gem','fa-crown'];
    var cards=icons.concat(icons).sort(function(){return Math.random()-.5;});
    var flipped=[],matched=0,moves=0,locked=false;
    var a=gid('gameArea');
    a.innerHTML='<div class="mem-grid" id="memGrid"></div>';
    var grid=gid('memGrid');
    function render(){
        grid.innerHTML=cards.map(function(c,i){
            var isFlipped=flipped.indexOf(i)>=0||c==='_';
            return '<div class="mem-card '+(isFlipped?'flipped':'')+' '+(c==='_'?'matched':'')+'" data-i="'+i+'"><i class="fas '+(c==='_'?'fa-check':c)+'"></i></div>';
        }).join('');
        grid.querySelectorAll('.mem-card:not(.matched)').forEach(function(c){c.onclick=function(){flip(+c.dataset.i);};});
    }
    function flip(i){
        if(locked||flipped.indexOf(i)>=0||cards[i]==='_')return;
        flipped.push(i);render();
        if(flipped.length===2){
            moves++;locked=true;gScore('Moves: '+moves);
            var a2=flipped[0],b=flipped[1];
            if(cards[a2]===cards[b]){cards[a2]='_';cards[b]='_';matched+=2;flipped=[];locked=false;render();
                if(matched===cards.length){gScore('Won in '+moves+'!');if(setHS('memory',moves,true))gHigh('memory');}
            }else{addClean(setTimeout(function(){flipped=[];locked=false;render();},800));}
        }
    }
    render();
};

// ===== 4. WHACK-A-MOLE =====
gameInits.whack=function(){
    var a=gid('gameArea');
    var html='<div class="whack-grid" id="wGrid">';
    for(var i=0;i<9;i++)html+='<div class="whack-hole" data-i="'+i+'"></div>';
    html+='</div>';a.innerHTML=html;
    var holes=gid('wGrid').children,score=0,time=30,active=false,moleTimer,secTimer;
    function showMole(){
        if(!active)return;
        for(var j=0;j<holes.length;j++){holes[j].classList.remove('active');holes[j].classList.remove('hit');}
        var i=Math.floor(Math.random()*9);holes[i].classList.add('active');
        moleTimer=setTimeout(showMole,500+Math.random()*600);
    }
    secTimer=setInterval(function(){
        time--;gScore('Score: '+score+' | '+time+'s');
        if(time<=0){active=false;clearInterval(secTimer);clearTimeout(moleTimer);
            for(var j=0;j<holes.length;j++)holes[j].classList.remove('active');
            gScore('Final: '+score);if(setHS('whack',score,false))gHigh('whack');}
    },1000);
    active=true;
    showMole();
    for(var k=0;k<holes.length;k++){
        (function(h){
            h.onclick=function(){
                if(!active||!h.classList.contains('active'))return;
                h.classList.remove('active');h.classList.add('hit');score++;gScore('Score: '+score);
                addClean(setTimeout(function(){h.classList.remove('hit');},200));
            };
        })(holes[k]);
    }
    addClean(function(){clearInterval(secTimer);clearTimeout(moleTimer);});
};
gameInits.snake=function(){
    var a=gid('gameArea');
    a.innerHTML='<canvas class="game-canvas" id="sCanvas"></canvas>';
    var c=gid('sCanvas'),ctx=c.getContext('2d');
    c.width=a.clientWidth;c.height=a.clientHeight;
    var sz=16,cols=Math.floor(c.width/sz),rows=Math.floor(c.height/sz);
    var snake=[{x:Math.floor(cols/2),y:Math.floor(rows/2)}],dir={x:1,y:0},food,score=0,over=false,spd=160,loop;
    function placeFood(){do{food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};}while(snake.some(function(s){return s.x===food.x&&s.y===food.y;}));}
    placeFood();
    function draw(){
        ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim()||'#111';
        ctx.fillRect(0,0,c.width,c.height);
        var accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#fff';
        ctx.fillStyle=accent;
        for(var i=0;i<snake.length;i++){
            if(i===0){
                ctx.shadowColor=accent;ctx.shadowBlur=8;
            } else {
                ctx.shadowBlur=0;
            }
            ctx.fillRect(snake[i].x*sz+1,snake[i].y*sz+1,sz-2,sz-2);
        }
        ctx.shadowBlur=0;
        ctx.fillStyle='#ff4444';ctx.beginPath();ctx.arc(food.x*sz+sz/2,food.y*sz+sz/2,sz/2-2,0,Math.PI*2);ctx.fill();
        if(over){ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(0,0,c.width,c.height);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='bold 22px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Game Over!',c.width/2,c.height/2-12);ctx.font='14px Inter,sans-serif';ctx.fillText('Score: '+score,c.width/2,c.height/2+16);}
    }
    function update(){
        if(over)return;
        var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
        if(head.x<0)head.x=cols-1;
        if(head.x>=cols)head.x=0;
        if(head.y<0)head.y=rows-1;
        if(head.y>=rows)head.y=0;
        if(snake.some(function(s){return s.x===head.x&&s.y===head.y;})){
            over=true;gScore('Score: '+score);if(setHS('snake',score,false))gHigh('snake');draw();return;
        }
        snake.unshift(head);
        if(head.x===food.x&&head.y===food.y){score++;gScore('Score: '+score);placeFood();if(spd>80)spd-=3;}
        else snake.pop();
        draw();
    }
    function keyHandler(e){
        if(over)return;
        var map={'ArrowUp':{x:0,y:-1},'ArrowDown':{x:0,y:1},'ArrowLeft':{x:-1,y:0},'ArrowRight':{x:1,y:0}};
        var d=map[e.key];if(d&&!(d.x===-dir.x&&d.y===-dir.y)){dir=d;e.preventDefault();}
    }
    addClean(function(){document.removeEventListener('keydown',keyHandler);});
    document.addEventListener('keydown',keyHandler);
    var tx,ty;
    function ts(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;}
    function te(e){if(!tx)return;var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
        if(Math.abs(dx)>Math.abs(dy)){if(dx>0&&dir.x!==-1)dir={x:1,y:0};else if(dx<0&&dir.x!==1)dir={x:-1,y:0};}
        else{if(dy>0&&dir.y!==-1)dir={x:0,y:1};else if(dy<0&&dir.y!==1)dir={x:0,y:-1};}}
    addClean(function(){c.removeEventListener('touchstart',ts);c.removeEventListener('touchend',te);});
    c.addEventListener('touchstart',ts,{passive:true});c.addEventListener('touchend',te);
    loop=setInterval(function(){
        if(over){clearInterval(loop);return;}
        update();
    },spd);
    draw();
    addClean(function(){clearInterval(loop);});
    showControls('<div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="up"><i class="fas fa-chevron-up"></i></button></div><div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="left"><i class="fas fa-chevron-left"></i></button><button class="game-ctrl-btn" data-dir="down"><i class="fas fa-chevron-down"></i></button><button class="game-ctrl-btn" data-dir="right"><i class="fas fa-chevron-right"></i></button></div>');
    gid('gameControls').querySelectorAll('.game-ctrl-btn').forEach(function(b){
        b.onclick=function(){
            var d=b.dataset.dir,dirs={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
            var nd=dirs[d];if(nd&&!(nd.x===-dir.x&&nd.y===-dir.y))dir=nd;
        };
    });
};

// ===== 6. FLAPPY BIRD =====
gameInits.flappy=function(){
    var a=gid('gameArea');
    a.innerHTML='<canvas class="game-canvas" id="fCanvas"></canvas>';
    var c=gid('fCanvas'),ctx=c.getContext('2d');
    c.width=a.clientWidth;c.height=a.clientHeight;
    var W=c.width,H=c.height;
    var bird={x:60,y:H/2,v:0},pipes=[],score=0,over=false,started=false,frame;
    var grav=.35,jump=-6.5,gap=120,pw=45,pspd=2;
    function flap(){if(over)return;if(!started)started=true;bird.v=jump;}
    function keyH(e){if(e.code==='Space'||e.key===' '){e.preventDefault();flap();}}
    addClean(function(){document.removeEventListener('keydown',keyH);});
    document.addEventListener('keydown',keyH);
    addClean(function(){c.removeEventListener('click',flap);});c.addEventListener('click',flap);
    addClean(function(){c.removeEventListener('touchstart',flap);});c.addEventListener('touchstart',flap,{passive:true});
    var pipeInterval=setInterval(function(){if(started&&!over)pipes.push({x:W,y:60+Math.random()*(H-gap-120)});},1800);
    addClean(function(){clearInterval(pipeInterval);});
    function draw(){
        var bg=getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim()||'#111';
        ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
        var accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#fff';
        var muted=getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim()||'#888';
        var border=getComputedStyle(document.documentElement).getPropertyValue('--border-strong').trim()||'#333';
        ctx.fillStyle=accent;ctx.beginPath();ctx.arc(bird.x,bird.y,12,0,Math.PI*2);ctx.fill();
        ctx.fillStyle=border;
        for(var i=0;i<pipes.length;i++){var p=pipes[i];ctx.fillRect(p.x,0,pw,p.y);ctx.fillRect(p.x,p.y+gap,pw,H-p.y-gap);}
        ctx.fillStyle=accent;
        for(var i=0;i<pipes.length;i++){var p=pipes[i];ctx.fillRect(p.x-3,p.y-15,pw+6,15);ctx.fillRect(p.x-3,p.y+gap,pw+6,15);}
        if(!started){ctx.fillStyle=muted;ctx.font='bold 16px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Tap to Start',W/2,H/2);}
        if(over){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='bold 20px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Score: '+score,W/2,H/2);}
    }
    function update(){
        if(over||!started)return draw();
        bird.v+=grav;bird.y+=bird.v;
        for(var i=0;i<pipes.length;i++)pipes[i].x-=pspd;
        pipes=pipes.filter(function(p){return p.x+pw>-10;});
        for(var i=0;i<pipes.length;i++){var p=pipes[i];if(!p.scored&&p.x+pw<bird.x){p.scored=true;score++;gScore('Score: '+score);}}
        for(var i=0;i<pipes.length;i++){var p=pipes[i];if(bird.x+12>p.x&&bird.x-12<p.x+pw){if(bird.y-12<p.y||bird.y+12>p.y+gap){over=true;gScore('Score: '+score);if(setHS('flappy',score,false))gHigh('flappy');return;}}}
        if(bird.y>H||bird.y<0){over=true;gScore('Score: '+score);if(setHS('flappy',score,false))gHigh('flappy');return;}
        draw();
    }
    frame=setInterval(update,16);draw();
    addClean(function(){clearInterval(frame);});
    showControls('<button class="game-tap-btn" id="flapBtn">TAP</button>');
    gid('flapBtn').onclick=flap;
};


// ===== 7. SIMON SAYS (OPTIMIZED) =====
gameInits.simon=function(){
    var a=gid('gameArea');
    a.innerHTML='<div class="simon-grid" id="simGrid"><div class="simon-btn" data-i="0"></div><div class="simon-btn" data-i="1"></div><div class="simon-btn" data-i="2"></div><div class="simon-btn" data-i="3"></div></div>';
    var btns=gid('simGrid').children,seq=[],playerSeq=[],playing=false,level=0;
    var tms=[]; // Track timeouts locally to avoid bloat
    
    function clearTms(){tms.forEach(clearTimeout);tms=[];}
    addClean(clearTms); // Clean up on game exit

    function showScore(){gScore('Level: '+level);}
    
    function flash(i,dur){
        btns[i].classList.add('lit');
        tms.push(setTimeout(function(){btns[i].classList.remove('lit');},dur));
    }
    
    function playSeq(){
        playing=false;
        var delay=0, dur=400, gap=300;
        // Schedule all flashes at once with increasing delays (no promises needed)
        for(var k=0;k<seq.length;k++){
            (function(idx){
                tms.push(setTimeout(function(){flash(idx,dur);},delay));
            })(seq[k]);
            delay+=dur+gap;
        }
        // Enable player input after sequence finishes
        tms.push(setTimeout(function(){playing=true;playerSeq=[];},delay));
    }
    
    function nextLevel(){level++;seq.push(Math.floor(Math.random()*4));showScore();playSeq();}
    
    for(var k=0;k<btns.length;k++){
        (function(b){
            b.onclick=function(){
                if(!playing)return;
                var i=+b.dataset.i;playerSeq.push(i);flash(i,200);
                var idx2=playerSeq.length-1;
                if(playerSeq[idx2]!==seq[idx2]){playing=false;gScore('Fail! Level: '+level);if(setHS('simon',level,false))gHigh('simon');return;}
                if(playerSeq.length===seq.length){playing=false;tms.push(setTimeout(nextLevel,800));}
            };
        })(btns[k]);
    }
    nextLevel();
};

// ===== 8. TYPING SPEED =====
gameInits.typing=function(){
    var words=['the','quick','brown','fox','jumps','over','lazy','dog','hello','world','code','python','javascript','function','variable','array','object','string','number','boolean','loop','class','return','import','async','await','promise','style','margin','padding','border','color','flex','grid','pixel','theme','design','build','create','deploy','debug','stack','queue','node','data','type','game','play','score','level','speed','input','click','touch','render','paint','draw','font','text','link','image','video','audio','block','none','auto','float','clear','react','vue','angular','server','client','route','state','props','hook','render','component','module','export','default','const','let','async','fetch','api','json','array','filter','map','reduce','sort','slice','push','pop','shift','length','index','key','value','pair','hash','set','list','tree','graph','node','edge','path','depth','breadth','search','sort','merge','split','join','trim','lower','upper','replace','match','test','exec'];
    var a=gid('gameArea');
    a.innerHTML='<div class="typing-area"><div class="typing-word" id="tWord"></div><input class="typing-input" id="tInput" autocomplete="off" spellcheck="false" placeholder="type here..."><div id="tTimer" style="margin-top:12px;font-size:.8rem;color:var(--text-muted)">Start typing...</div></div>';
    var wordEl=gid('tWord'),input=gid('tInput'),timerEl=gid('tTimer');
    var current='',typed=0,correct=0,timeLeft=30,timer,started=false,over=false;
    function newWord(){current=words[Math.floor(Math.random()*words.length)];wordEl.innerHTML=current;input.value='';}
    newWord();input.focus();
    function start(){if(started)return;started=true;timer=setInterval(function(){timeLeft--;timerEl.textContent=timeLeft+'s';if(timeLeft<=0){clearInterval(timer);over=true;var wpm=Math.round((correct/5)/(30/60));gScore('WPM: '+wpm);if(setHS('typing',wpm,false))gHigh('typing');timerEl.textContent='Done! '+wpm+' WPM';}},1000);}
    input.oninput=function(){
        if(over)return;start();
        var val=input.value;var html='';
        for(var i=0;i<current.length;i++){
            if(i<val.length)html+=val[i]===current[i]?'<span class="correct">'+current[i]+'</span>':'<span class="wrong">'+current[i]+'</span>';
            else html+=current[i];
        }
        wordEl.innerHTML=html;
        if(val===current){correct++;typed++;newWord();input.value='';}
        else if(val.length>=current.length&&val!==current){typed++;newWord();input.value='';}
    };
    addClean(function(){clearInterval(timer);});
};

// ===== 9. 2048 =====
gameInits.g2048=function(){
    var a=gid('gameArea');
    a.innerHTML='<div class="grid-2048" id="grid2048"></div>';
    var grid=gid('grid2048'),board=Array(16).fill(0),score=0,over=false;
    var colors={0:'var(--bg-card)',2:'var(--text-muted)',4:'var(--text-secondary)',8:'#e8a050',16:'#e07830',32:'#e06020',64:'#e04010',128:'#edc850',256:'#edc040',512:'#edc030',1024:'#edc020',2048:'#edc010'};
    function render(){
        grid.innerHTML=board.map(function(v){return '<div class="tile-2048" style="background:'+(colors[v]||'var(--accent)')+';color:'+(v>=8?'#fff':'var(--text-primary)')+';font-size:'+(v>=1024?'.9rem':v>=128?'1.1rem':'1.3rem')+'">'+(v||'')+'</div>';}).join('');
    }
    function addTile(){var empty=[];for(var i=0;i<16;i++)if(board[i]===0)empty.push(i);if(!empty.length){checkOver();return;}board[empty[Math.floor(Math.random()*empty.length)]]=Math.random()<.9?2:4;render();}
    function slide(row){var arr=row.filter(function(v){return v;}),pts=0;for(var i=0;i<arr.length-1;i++)if(arr[i]===arr[i+1]){arr[i]*=2;pts+=arr[i];arr.splice(i+1,1);}while(arr.length<4)arr.push(0);return{arr:arr,pts:pts};}
    function move(dir){
        if(over)return;var moved=false,totalPts=0;
        if(dir==='left'){for(var r=0;r<4;r++){var res=slide(board.slice(r*4,r*4+4));if(res.arr.join()!==board.slice(r*4,r*4+4).join())moved=true;totalPts+=res.pts;for(var c=0;c<4;c++)board[r*4+c]=res.arr[c];}}
        else if(dir==='right'){for(var r=0;r<4;r++){var res=slide(board.slice(r*4,r*4+4).reverse());res.arr.reverse();if(res.arr.join()!==board.slice(r*4,r*4+4).join())moved=true;totalPts+=res.pts;for(var c=0;c<4;c++)board[r*4+c]=res.arr[c];}}
        else if(dir==='up'){for(var c=0;c<4;c++){var col=[];for(var r=0;r<4;r++)col.push(board[r*4+c]);var res=slide(col);if(res.arr.join()!==col.join())moved=true;totalPts+=res.pts;for(var r=0;r<4;r++)board[r*4+c]=res.arr[r];}}
        else if(dir==='down'){for(var c=0;c<4;c++){var col=[];for(var r=0;r<4;r++)col.push(board[r*4+c]);var res=slide(col.reverse());res.arr.reverse();if(res.arr.join()!==col.join())moved=true;totalPts+=res.pts;for(var r=0;r<4;r++)board[r*4+c]=res.arr[r];}}
        if(moved){score+=totalPts;gScore('Score: '+score);addTile();if(board.indexOf(2048)>=0)gScore('You got 2048!');checkOver();}
    }
    function checkOver(){if(board.indexOf(0)>=0)return;for(var r=0;r<4;r++)for(var c=0;c<3;c++)if(board[r*4+c]===board[r*4+c+1])return;for(var c=0;c<4;c++)for(var r=0;r<3;r++)if(board[r*4+c]===board[(r+1)*4+c])return;over=true;gScore('Over! '+score);if(setHS('g2048',score,false))gHigh('g2048');}
    function keyH(e){var map={'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'up','ArrowDown':'down'};if(map[e.key]){e.preventDefault();move(map[e.key]);}}
    addClean(function(){document.removeEventListener('keydown',keyH);});document.addEventListener('keydown',keyH);
    var tx,ty;var gc=gid('grid2048');
    function ts(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;}
    function te(e){if(!tx)return;var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<20&&Math.abs(dy)<20)return;if(Math.abs(dx)>Math.abs(dy))move(dx>0?'right':'left');else move(dy>0?'down':'up');}
    addClean(function(){gc.removeEventListener('touchstart',ts);gc.removeEventListener('touchend',te);});
    gc.addEventListener('touchstart',ts,{passive:true});gc.addEventListener('touchend',te);
    addTile();addTile();render();
    showControls('<div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="up"><i class="fas fa-chevron-up"></i></button></div><div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="left"><i class="fas fa-chevron-left"></i></button><button class="game-ctrl-btn" data-dir="down"><i class="fas fa-chevron-down"></i></button><button class="game-ctrl-btn" data-dir="right"><i class="fas fa-chevron-right"></i></button></div>');
    gid('gameControls').querySelectorAll('.game-ctrl-btn').forEach(function(b){
        b.onclick=function(){move(b.dataset.dir);};
    });
};

// ===== 10. BRICK BREAKER =====
gameInits.breaker=function(){
    var a=gid('gameArea');
    a.innerHTML='<canvas class="game-canvas" id="bCanvas"></canvas>';
    var c=gid('bCanvas'),ctx=c.getContext('2d');
    c.width=a.clientWidth;c.height=a.clientHeight;
    var W=c.width,H=c.height;
    var pad={w:70,h:10,x:W/2-35,y:H-25},ball={x:W/2,y:H-40,r:6,dx:3,dy:-3},bricks=[],score=0,over=false,started=false;
    var cols=Math.floor(W/50),rows=5,bw=(W-20)/cols-4,bh=16;
    var bColors=['#ff4444','#ff8844','#ffaa00','#44bb44','#4488ff'];
    for(var r=0;r<rows;r++)for(var cl=0;cl<cols;cl++)bricks.push({x:12+cl*(bw+4),y:40+r*(bh+4),w:bw,h:bh,alive:true,color:bColors[r]});
    function draw(){
        var bg=getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim()||'#111';
        ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
        for(var i=0;i<bricks.length;i++){var b=bricks[i];if(!b.alive)continue;ctx.fillStyle=b.color;ctx.fillRect(b.x,b.y,b.w,b.h);}
        var accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#fff';
        ctx.fillStyle=accent;ctx.fillRect(pad.x,pad.y,pad.w,pad.h);
        ctx.fillStyle=accent;ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);ctx.fill();
        if(!started){ctx.fillStyle='var(--text-muted)';ctx.font='14px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Tap to launch',W/2,H/2);}
        if(over){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='bold 18px Inter,sans-serif';ctx.textAlign='center';ctx.fillText('Score: '+score,W/2,H/2);}
    }
    function update(){
        if(over||!started)return draw();
        ball.x+=ball.dx;ball.y+=ball.dy;
        if(ball.x-ball.r<0||ball.x+ball.r>W)ball.dx*=-1;
        if(ball.y-ball.r<0)ball.dy*=-1;
        if(ball.y+ball.r>H){over=true;gScore('Score: '+score);if(setHS('breaker',score,false))gHigh('breaker');draw();return;}
        if(ball.y+ball.r>=pad.y&&ball.x>=pad.x&&ball.x<=pad.x+pad.w){ball.dy=-Math.abs(ball.dy);ball.y=pad.y-ball.r;}
        for(var i=0;i<bricks.length;i++){var b=bricks[i];if(!b.alive)continue;if(ball.x+ball.r>b.x&&ball.x-ball.r<b.x+b.w&&ball.y+ball.r>b.y&&ball.y-ball.r<b.y+b.h){b.alive=false;ball.dy*=-1;score++;gScore('Score: '+score);break;}}
        if(bricks.every(function(b){return !b.alive;})){over=true;gScore('All clear! '+score);if(setHS('breaker',score,false))gHigh('breaker');}
        draw();
    }
    function launch(){if(over){restartGame();return;}if(!started){started=true;ball.dx=3*(Math.random()>.5?1:-1);ball.dy=-3;}}
    addClean(function(){c.removeEventListener('click',launch);});c.addEventListener('click',launch);
    addClean(function(){c.removeEventListener('touchstart',launch);});c.addEventListener('touchstart',launch,{passive:true});
    function movePad(e){var rect=c.getBoundingClientRect();var x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;pad.x=Math.max(0,Math.min(W-pad.w,x-pad.w/2));}
    addClean(function(){c.removeEventListener('mousemove',movePad);c.removeEventListener('touchmove',movePad);});
    c.addEventListener('mousemove',movePad);c.addEventListener('touchmove',movePad,{passive:true});
    var frame=setInterval(function(){if(over){clearInterval(frame);return;}update();},16);draw();
    addClean(function(){clearInterval(frame);});
    showControls('<button class="game-tap-btn" id="launchBtn">LAUNCH</button>');
    gid('launchBtn').onclick=launch;
};

// ===== 11. MINESWEEPER =====
gameInits.mines=function(){
    var a=gid('gameArea'),R=8,C=8,M=10;
    a.innerHTML='<button class="mine-flag-toggle" id="mineFlag">🚩 Flag Mode: OFF</button><div style="text-align:center"><div class="mine-grid" id="mineGrid" style="grid-template-columns:repeat('+C+',32px)"></div></div>';
    var grid=gid('mineGrid'),flagBtn=gid('mineFlag');
    var board=Array(R*C).fill(0),revealed=Array(R*C).fill(false),flagged=Array(R*C).fill(false),mines=[],over=false,flagMode=false,firstClick=true;
    function placeMines(safe){mines=[];while(mines.length<M){var i=Math.floor(Math.random()*R*C);if(mines.indexOf(i)<0&&i!==safe)mines.push(i);}for(var m=0;m<mines.length;m++)board[mines[m]]=-1;for(var i=0;i<R*C;i++){if(board[i]===-1)continue;var cnt=0;for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){var nr=Math.floor(i/C)+dr,nc=i%C+dc;if(nr>=0&&nr<R&&nc>=0&&nc<C&&board[nr*C+nc]===-1)cnt++;}board[i]=cnt;}}
    function render(){grid.innerHTML='';for(var i=0;i<R*C;i++){var d=document.createElement('div');d.className='mine-cell';if(revealed[i]){d.classList.add('revealed');if(board[i]===-1){d.classList.add('mine-exploded');d.textContent='💣';}else if(board[i]>0){var colors=['','#4488ff','#44bb44','#ff4444','#8844aa','#ff8800','#44bbbb','#888'];d.style.color=colors[board[i]];d.textContent=board[i];}}else if(flagged[i]){d.classList.add('hidden','flagged');d.textContent='🚩';}else{d.classList.add('hidden');}(function(idx){d.onclick=function(){click(idx);};d.oncontextmenu=function(e){e.preventDefault();flag(idx);};})(i);grid.appendChild(d);}}
    function reveal(i){if(over||revealed[i]||flagged[i])return;if(firstClick){firstClick=false;placeMines(i);}revealed[i]=true;if(board[i]===-1){over=true;for(var m=0;m<mines.length;m++)revealed[mines[m]]=true;render();gScore('Boom! 💥');return;}if(board[i]===0){var r2=Math.floor(i/C),c2=i%C;for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){var nr=r2+dr,nc=c2+dc;if(nr>=0&&nr<R&&nc>=0&&nc<C)reveal(nr*C+nc);}}render();checkWin();}
    function flag(i){if(over||revealed[i])return;flagged[i]=!flagged[i];render();}
    function checkWin(){var allRevealed=true;for(var i=0;i<R*C;i++){if(!revealed[i]&&mines.indexOf(i)<0){allRevealed=false;break;}}if(allRevealed){over=true;gScore('You Win!');if(setHS('mines',1,false))gHigh('mines');}}
    flagBtn.onclick=function(){flagMode=!flagMode;flagBtn.textContent='🚩 Flag Mode: '+(flagMode?'ON':'OFF');flagBtn.classList.toggle('active',flagMode);};
    function click(i){if(flagMode)flag(i);else reveal(i);}
    render();
};

// ===== 12. HANGMAN =====
gameInits.hangman=function(){
    var words=['PYTHON','JAVASCRIPT','TYPESCRIPT','ALGORITHM','FUNCTION','VARIABLE','DATABASE','COMPONENT','MONGODB','FRONTEND','BACKEND','TERMINAL','GRADIENT','ANIMATION','KEYBOARD','TEMPLATE','FRAMEWORK','LIBRARY','RUNTIME','COMPILER'];
    var word=words[Math.floor(Math.random()*words.length)];
    var a=gid('gameArea');
    
    a.innerHTML='<div class="hangman-area"><div class="hangman-figure" id="hFig"></div><div class="hangman-word" id="hWord"></div><div class="hangman-keys" id="hKeys"></div></div>';
    
    var fig=gid('hFig');
    var wordEl=gid('hWord');
    var keysEl=gid('hKeys');
    
    var guessed={};
    var wrong=0;
    var maxWrong=6;
    var over=false; // <--- THIS WAS MISSING IN YOUR ORIGINAL CODE AND BREAKING THE THEME
    
    function render(){
        var parts=['',' O','<br>|','<br>/ \\','<br> ^','<br> _ _'];
        var f='';
        for(var i=1;i<=wrong;i++) f+=parts[i];
        fig.innerHTML=f||'❓';
        
        wordEl.innerHTML=word.split('').map(function(c){
            return guessed[c] ? c : '_';
        }).join(' ');
        
        keysEl.innerHTML='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(l){
            var cls=guessed[l]?(word.indexOf(l)>=0?'correct':'wrong'):'';
            return '<button class="hangman-key '+cls+'" data-l="'+l+'" '+(cls?'disabled':'')+'>'+l+'</button>';
        }).join('');
        
        var btns=keysEl.querySelectorAll('.hangman-key:not(.correct):not(.wrong)');
        for(var i=0;i<btns.length;i++){
            btns[i].onclick=function(){
                guess(this.dataset.l);
            };
        }
    }
    
    function guess(l){
        if(guessed[l]||over) return;
        guessed[l]=true;
        if(word.indexOf(l)<0){
            wrong++;
            gScore(wrong+'/'+maxWrong+' wrong');
        }
        render();
        if(wrong>=maxWrong){
            over=true;
            gScore('Lost! Word: '+word);
            return;
        }
        var won=word.split('').every(function(c){ return guessed[c]; });
        if(won){
            over=true;
            gScore('You Won!');
        }
    }
    
    function keyH(e){
        if(over) return;
        var l=e.key.toUpperCase();
        if(/^[A-Z]$/.test(l)) guess(l);
    }
    
    document.addEventListener('keydown',keyH);
    addClean(function(){
        document.removeEventListener('keydown',keyH);
    });
    
    render();
    gScore('Guess the tech word!');
};



// ===== 13. PONG =====
gameInits.pong=function(){
    var a=gid('gameArea');
    a.innerHTML='<canvas class="pong-canvas" id="pongCanvas"></canvas>';
    var c=gid('pongCanvas'),ctx=c.getContext('2d');
    c.width=a.clientWidth;c.height=a.clientHeight;
    var W=c.width,H=c.height;
    var padW=12,padH=80,ballR=7,spd=5,aiSpd=4;
    var p1={x:10,y:H/2-padH/2,score:0};
    var p2={x:W-10-padW,y:H/2-padH/2,score:0};
    var ball={x:W/2,y:H/2,dx:spd*(Math.random()>.5?1:-1),dy:spd*(Math.random()*2-1)};
    var over=false, raf;
    
    // Cache styles so we don't lag the browser asking for them every frame
    var style=getComputedStyle(document.documentElement);
    var bgCol=style.getPropertyValue('--bg-secondary').trim()||'#111';
    var acCol=style.getPropertyValue('--accent').trim()||'#fff';
    
    function reset(){ball.x=W/2;ball.y=H/2;ball.dx=spd*(Math.random()>.5?1:-1);ball.dy=spd*(Math.random()*2-1);}
    function draw(){
        ctx.fillStyle=bgCol;ctx.fillRect(0,0,W,H);
        ctx.fillStyle=acCol;
        ctx.fillRect(p1.x,p1.y,padW,padH);
        ctx.fillRect(p2.x,p2.y,padW,padH);
        ctx.beginPath();ctx.arc(ball.x,ball.y,ballR,0,Math.PI*2);ctx.fill();
        ctx.setLineDash([5,10]);ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);
        if(over){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='bold 18px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(p1.score+' - '+p2.score,W/2,H/2);}
    }
    function loop(){
        if(over){cancelAnimationFrame(raf);return;}
        ball.x+=ball.dx;ball.y+=ball.dy;
        if(ball.y-ballR<0||ball.y+ballR>H)ball.dy*=-1;
        if(ball.x<p1.x+padW&&ball.y>p1.y&&ball.y<p1.y+padH){ball.dx=Math.abs(ball.dx);ball.x=p1.x+padW;}
        if(ball.x>p2.x&&ball.y>p2.y&&ball.y<p2.y+padH){ball.dx=-Math.abs(ball.dx);ball.x=p2.x;}
        if(ball.x<0){p2.score++;gScore('CPU: '+p2.score+' | You: '+p1.score);if(p2.score>=5){over=true;gScore('You Lose!');if(setHS('pong',p1.score,false))gHigh('pong');draw();return;}else reset();}
        if(ball.x>W){p1.score++;gScore('You: '+p1.score+' | CPU: '+p2.score);if(p1.score>=5){over=true;gScore('You Win!');if(setHS('pong',p1.score,false))gHigh('pong');draw();return;}else reset();}
        var center2=p2.y+padH/2;if(center2<ball.y-10)p2.y+=aiSpd;else if(center2>ball.y+10)p2.y-=aiSpd;
        draw();
        raf=requestAnimationFrame(loop); // requestAnimationFrame instead of setInterval
    }
    function movePad(e){var rect=c.getBoundingClientRect();var y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;p1.y=Math.max(0,Math.min(H-padH,y-padH/2));}
    c.addEventListener('mousemove',movePad);c.addEventListener('touchmove',movePad,{passive:true});
    addClean(function(){c.removeEventListener('mousemove',movePad);c.removeEventListener('touchmove',movePad);cancelAnimationFrame(raf);});
    
    draw();
    raf=requestAnimationFrame(loop);
};

// ===== 14. WORDLE =====
gameInits.wordle=function(){
    var words=['CODE','PLAY','GAME','GRID','FIRE','WAVE','DARK','LINK','MAZE','LOOP','BYTE','DATA','HACK','PORT','SYNC','TYPE','VOID','ZERO','FLUX','NODE'];
    var word=words[Math.floor(Math.random()*words.length)];
    var a=gid('gameArea');
    a.innerHTML='<div class="wordle-grid" id="wGrid"></div><div class="wordle-keys" id="wKeys"></div>';
    var grid=gid('wGrid'),keys=gid('wKeys');
    var row=0,col=0,guesses=Array(5).fill(''),over=false;
    var rowResults=[]; // Store previous rows so they keep their colors
    var keyStates={};  // Track keyboard colors
    
    function render(){
        grid.innerHTML='';
        for(var r=0;r<5;r++){
            for(var c=0;c<4;c++){
                var d=document.createElement('div');
                d.className='wordle-cell';
                if(r<rowResults.length){
                    d.textContent=rowResults[r][c][0];
                    d.classList.add(rowResults[r][c][1]); // Apply correct/present/absent
                } else {
                    d.textContent=guesses[r][c]||'';
                }
                grid.appendChild(d);
            }
        }
    }
    function renderKeys(){
        keys.innerHTML='';
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(l){
            var b=document.createElement('button');b.className='wordle-key';b.textContent=l;
            if(keyStates[l]==='correct')b.classList.add('correct');
            else if(keyStates[l]==='present')b.classList.add('present');
            else if(keyStates[l]==='absent')b.classList.add('absent');
            b.onclick=function(){if(!over&&col<4){guesses[row]+=l;col++;render();}};
            keys.appendChild(b);
        });
        var del=document.createElement('button');del.className='wordle-key';del.textContent='⌫';del.style.minWidth='40px';
        del.onclick=function(){if(!over&&col>0){guesses[row]=guesses[row].slice(0,-1);col--;render();}};
        keys.appendChild(del);
        var enter=document.createElement('button');enter.className='wordle-key';enter.textContent='GO';enter.style.minWidth='40px';
        enter.onclick=function(){submitGuess();};
        keys.appendChild(enter);
    }
    function submitGuess(){
        if(over||col<4)return;
        var guess=guesses[row];
        var result=['absent','absent','absent','absent'];
        var used=[false,false,false,false];
        
        for(var i=0;i<4;i++){if(guess[i]===word[i]){result[i]='correct';used[i]=true;}}
        for(var i=0;i<4;i++){
            if(result[i]==='correct')continue;
            for(var j=0;j<4;j++){if(!used[j]&&guess[i]===word[j]){result[i]='present';used[j]=true;break;}}
        }
        
        var rowResult=[];
        for(var i=0;i<4;i++){
            rowResult.push([guess[i], result[i]]);
            var letter=guess[i];
            if(result[i]==='correct')keyStates[letter]='correct';
            else if(result[i]==='present'&&keyStates[letter]!=='correct')keyStates[letter]='present';
            else if(!keyStates[letter])keyStates[letter]='absent';
        }
        rowResults.push(rowResult);
        guesses[row]=''; // clear current row buffer
        
        render(); renderKeys(); // Re-render to apply CSS classes
        
        if(guess===word){
            over=true; gScore('You got it!');
            if(setHS('wordle',(6-row)*100,false))gHigh('wordle');
        } else {
            row++;col=0;
            if(row>=5){ over=true; gScore('It was '+word); }
            else { gScore((5-row)+' tries left'); }
        }
    }
    render();renderKeys();gScore('Guess the word!');
};

// ===== 15. CONNECT 4 =====
gameInits.connect4=function(){
    var a=gid('gameArea');
    // Increased max-width from 320px to 450px to make the boxes bigger
    a.innerHTML='<div class="c4-grid" id="c4Grid" style="max-width:450px; width:100%;"></div>';
    var gridEl=gid('c4Grid');
    var COLS=7,ROWS=6;
    var board=[];
    for(var c=0;c<COLS;c++){board[c]=[];for(var r=0;r<ROWS;r++)board[c][r]=0;}
    var turn=1,over=false; // 1=Player, 2=CPU
    
    function render(){
        gridEl.innerHTML='';
        for(var r=0;r<ROWS;r++){
            for(var c=0;c<COLS;c++){
                var cell=document.createElement('div');
                cell.className='c4-cell';
                if(board[c][r]===1)cell.classList.add('p1');
                else if(board[c][r]===2)cell.classList.add('p2');
                else cell.onclick=(function(col){return function(){drop(col);};})(c);
                gridEl.appendChild(cell);
            }
        }
    }
    function drop(col){
        if(over)return;
        for(var r=ROWS-1;r>=0;r--){
            if(board[col][r]===0){
                board[col][r]=turn;
                if(checkWin(col,r,turn)){
                    over=true; render();
                    if(turn===1){gScore('You Win!');if(setHS('connect4',1,false))gHigh('connect4');}
                    else gScore('CPU Wins!');
                    return;
                }
                var isDraw=true;
                for(var cc=0;cc<COLS;cc++){if(board[cc][0]===0){isDraw=false;break;}}
                if(isDraw){over=true;render();gScore('Draw!');return;}
                
                turn=turn===1?2:1;
                render();
                gScore(turn===1?'Your turn':'CPU thinking...');
                if(turn===2)setTimeout(cpuMove,150); // <--- CHANGE THIS NUMBER
                return;
            }
        }
    }
    function cpuMove(){
        if(over)return;
        var move=findWinningMove(2);
        if(move===-1)move=findWinningMove(1); 
        if(move===-1){
            var opts=[3,2,4,1,5,0,6];
            for(var i=0;i<opts.length;i++){if(board[opts[i]][0]===0){move=opts[i];break;}}
        }
        if(move!==-1)drop(move);
    }
    function findWinningMove(player){
        for(var c=0;c<COLS;c++){
            if(board[c][0]!==0)continue;
            for(var r=ROWS-1;r>=0;r--){
                if(board[c][r]===0){
                    board[c][r]=player;
                    if(checkWin(c,r,player)){board[c][r]=0;return c;}
                    board[c][r]=0;break;
                }
            }
        }
        return -1;
    }
    function checkWin(col,row,player){
        var dirs=[[1,0],[0,1],[1,1],[1,-1]];
        for(var d=0;d<dirs.length;d++){
            var count=1;var dx=dirs[d][0],dy=dirs[d][1];
            for(var i=1;i<4;i++){var nx=col+dx*i,ny=row+dy*i;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&board[nx][ny]===player)count++;else break;}
            for(var i=1;i<4;i++){var nx=col-dx*i,ny=row-dy*i;if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&board[nx][ny]===player)count++;else break;}
            if(count>=4)return true;
        }
        return false;
    }
    render();gScore('Your turn!');
};

// ===== 16. COLOR MATCH =====
gameInits.colormatch=function(){
    var a=gid('gameArea');
    a.innerHTML='<div class="color-match-area"><div class="color-word" id="cmWord"></div><div class="color-btns" id="cmBtns"></div></div>'; // Fixed classes to match CSS
    var wordEl=gid('cmWord'),btnsEl=gid('cmBtns');
    
    var colors=[
        {name:'RED',hex:'#ff4444'},
        {name:'BLUE',hex:'#4488ff'},
        {name:'GREEN',hex:'#44ff44'},
        {name:'YELLOW',hex:'#ffff44'},
        {name:'PURPLE',hex:'#bb44ff'},
        {name:'ORANGE',hex:'#ff8844'}
    ];
    var score=0,timeLeft=30,over=false,timer;
    
    function newRound(){
        var wordIdx=Math.floor(Math.random()*colors.length);
        var colorIdx=Math.floor(Math.random()*colors.length);
        wordEl.textContent=colors[wordIdx].name;
        wordEl.style.color=colors[colorIdx].hex;
        wordEl.style.textShadow='0 0 10px '+colors[colorIdx].hex+'55';
        
        var options=[colorIdx];
        while(options.length<4){
            var r=Math.floor(Math.random()*colors.length);
            if(options.indexOf(r)===-1)options.push(r);
        }
        options.sort(function(){return Math.random()-0.5;});
        
        btnsEl.innerHTML='';
        options.forEach(function(idx){
            var btn=document.createElement('button');
            btn.className='color-btn'; // Fixed class to match CSS
            btn.style.background=colors[idx].hex;
            btn.onclick=function(){
                if(over)return;
                if(idx===colorIdx){score++; newRound();}
                else {over=true; endGame();}
            };
            btnsEl.appendChild(btn);
        });
    }
    function endGame(){
        over=true;clearInterval(timer);
        gScore('Score: '+score);
        if(setHS('colormatch',score,false))gHigh('colormatch');
    }
    timer=setInterval(function(){
        timeLeft--;
        gScore('Time: '+timeLeft+' | Score: '+score);
        if(timeLeft<=0)endGame();
    },1000);
    
    addClean(function(){clearInterval(timer);});
    gScore('Time: 30 | Score: 0');
    newRound();
};

function chatGetResponse(q){
    var ql=q.toLowerCase().trim();
    var candidates=[];
    for(var k in chatK){
        var ps=k.split('|');
        var matchCount=0;
        var totalLen=0;
        for(var i=0;i<ps.length;i++){
            var p=ps[i].trim();
            if(ql.includes(p)){matchCount++;totalLen+=p.length;}
        }
        if(matchCount>0)candidates.push({r:chatK[k],c:matchCount,l:totalLen});
    }
    if(candidates.length>0){
        candidates.sort(function(a,b){return b.c-a.c||(a.l/a.c)-(b.l/b.c);});
        return candidates[0].r;
    }
    var fuzz={'skill':'skills','skil':'skills','projec':'projects','projct':'projects','contat':'contact','contct':'contact','hobbie':'hobbies','hobbi':'hobbies','them':'themes','theam':'themes','game':'games','locat':'location','locaion':'location','framwork':'frameworks','freelan':'freelance','mobil':'mobile','socia':'social','abou':'about','aboout':'about','tel me':'tell me','waht':'what','hwat':'what','taech':'tech','tehc':'tech','stack':'tech stack','techstack':'tech stack','porfolio':'portfolio','portfoilo':'portfolio','protfolio':'portfolio','mesage':'message','mssage':'message','assistanat':'assistant','assistan':'assistant','questio':'question','questin':'question','sugestion':'suggestion','typng':'typing','countri':'country','contry':'country','eduction':'education','educton':'education','dipola':'diploma','dipolma':'diploma','universtiy':'university','univesity':'university','instgram':'instagram','instagrm':'instagram','tiktk':'tiktok','yotub':'youtube','yotube':'youtube','facebok':'facebook','faceook':'facebook','favrite':'favorite','favorit':'favorite','favourit':'favorite','favorate':'favorite','impress':'impressive','impressiv':'impressive','resposiv':'responsive','resposive':'responsive','resposne':'response','everythig':'everything','everythin':'everything','anythin':'anything','anthing':'anything','anynig':'anything','nothig':'nothing','nothin':'nothing','writte':'write','writ':'write','xecut':'xecute','exectue':'xecute','capabiliti':'capabilities','capabilty':'capabilities','capabilit':'capability'};
    for(var w in fuzz){
        if(ql.includes(w)){
            var corr=fuzz[w];
            for(var k2 in chatK){
                var ps2=k2.split('|');
                var mc=0;var tl=0;
                for(var j=0;j<ps2.length;j++){if(ps2[j].includes(corr)){mc++;tl+=ps2[j].length;}}
                if(mc>0)candidates.push({r:chatK[k2],c:mc,l:tl});
            }
        }
    }
    if(candidates.length>0){
        candidates.sort(function(a,b){return b.c-a.c||(a.l/a.c)-(b.l/b.c);});
        return candidates[0].r;
    }
    return ['Hmm, didn\'t quite catch that 🤔 Try rephrasing? Ask about <span class="hl">skills</span>, <span class="hl">projects</span>, <span class="hl">contact</span>, <span class="hl">hobbies</span>, <span class="hl">themes</span>, or just say <span class="hl">help</span>!'];
}





/* ─────────────────── §16 SILENT PROTECTION ─────────────────────── */
// ===== SILENT PROTECTION (background only, no UI) =====

// Block iframe embedding (silent)
if(window.top!==window.self){window.top.location=window.self.location;}

// Disable drag silently
document.addEventListener('dragstart',function(e){e.preventDefault();});

// Silent right-click block
document.addEventListener('contextmenu',function(e){e.preventDefault();});

// Silent copy/cut/select block
document.addEventListener('copy',function(e){e.preventDefault();});
document.addEventListener('cut',function(e){e.preventDefault();});
document.addEventListener('selectstart',function(e){e.preventDefault();});
document.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&(e.key==='a'||e.key==='c'||e.key==='x'||e.key==='u')){
        if(e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA')e.preventDefault();
    }
    if(e.key==='F12'){e.preventDefault();return false;}
    if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==='I'||e.key==='i')){e.preventDefault();return false;}
    if((e.ctrlKey||e.metaKey)&&e.key==='u'){e.preventDefault();return false;}
});

// DevTools detection (silent, no UI)
setInterval(function(){
    var threshold=160;
    if(window.outerWidth-window.innerWidth>threshold||window.outerHeight-window.innerHeight>threshold){
        // detected — do nothing visible
    }
},1000);

// Screen capture detection (silent, no UI)
var focusLost=0;
window.addEventListener('blur',function(){
    focusLost++;
    // detected — do nothing visible
});

// Note: view-source protocol detection is not possible via JS (view-source pages don't execute scripts)
// Removed: if(window.location.protocol==='view-source:'){window.location.href='/';}





document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', e => e.preventDefault());
});

document.addEventListener('click', startBgOnFirstInteraction);
document.addEventListener('scroll', startBgOnFirstInteraction);
document.addEventListener('touchstart', startBgOnFirstInteraction);