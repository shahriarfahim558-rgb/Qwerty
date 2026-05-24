/* ================================================================
   THEME BLOCK — JS
   To add a new theme: add its name to the array below. That's it.
   ================================================================ */
const themes = [
'dark',
'ice',
'galaxy',
'autumn',
'light',
'paper',
'cherry',
'lavender',
'mint',
'coral',
'frosting',
'lemon',
'sakura',
'storm',
'vaporwave',
'vortex',
'peach',
'sky',
'matcha',
'lilac',
];



const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeCards = document.querySelectorAll('.theme-card');


const themeColors = {
    dark:       '#0a0a0a',
    ice:        '#0d1f2d',
    galaxy:     '#0b0020',
    autumn:     '#1a0a00',
    light:      '#f5f5f0',
    paper:      '#f0ebe0',
    cherry:     '#1a0010',
    lavender:   '#1a0a2e',
    mint:       '#001a10',
    coral:      '#1a0500',
    frosting:   '#1a001a',
    lemon:      '#1a1a00',
    sakura:     '#1a0010',
    storm:      '#050a15',
    vaporwave:  '#0d001a',
    vortex:     '#000a1a',
    peach:      '#fff3ec',
    sky:        '#eef7ff',
    matcha:     '#f2f7ee',
    lilac:      '#f9f4ff',
};


function setTheme(theme, skipSave) {
    body.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColors[theme] || '#0a0a0a'); // ← ADD THIS LINE
    if (!skipSave) localStorage.setItem('theme', theme);
    themeCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.themeValue === theme) card.classList.add('active');
    });
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function autoThemeByTime() {
    const now = new Date();
    const m = now.getHours() * 60 + now.getMinutes();
    setTheme(themes[Math.floor(m / (1440 / themes.length)) % themes.length], true);
}

if (localStorage.getItem('theme')) setTheme(localStorage.getItem('theme'));
else autoThemeByTime();

setInterval(() => {
    if (!localStorage.getItem('theme')) {
        autoThemeByTime();
        const now = new Date();
        const m = now.getHours() * 60 + now.getMinutes();
        const idx = Math.floor(m / (1440 / themes.length)) % themes.length;
        showKbToast('Theme: <kbd>' + themes[idx].charAt(0).toUpperCase() + themes[idx].slice(1) + '</kbd>');
    }
}, 10000);

themeCards.forEach(card => {
    card.addEventListener('click', () => {
        setTheme(card.dataset.themeValue);
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.transform = ''; }, 150);
    });
});


// ===== ALL THEMES TIME-BASED =====
function autoThemeByTime() {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    // Divide 1440 minutes (24 hours) by the number of themes to sync perfectly to midnight
    const index = Math.floor(totalMinutes / (1440 / themes.length)) % themes.length;
    setTheme(themes[index], true);
}
autoThemeByTime();
setInterval(autoThemeByTime, 60000);


let currentThemeIndex = themes.indexOf(body.getAttribute('data-theme') || 'dark');
themeToggle.addEventListener('click', () => {
    currentThemeIndex = themes.indexOf(body.getAttribute('data-theme') || themes[0]);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex], true);
    themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => themeToggle.style.transform = '', 400);
});

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const num = parseInt(e.key);
    if (num >= 1 && num <= themes.length) {
        setTheme(themes[num - 1]);
        showKbToast('Theme: <kbd>' + themes[num - 1].charAt(0).toUpperCase() + themes[num - 1].slice(1) + '</kbd>');
    }
});


/* ================================================================
   MAIN JS
   ================================================================ */
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
    ]},
};


const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; });
let trailThrottle = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now(); if (now - trailThrottle < 50) return; trailThrottle = now;
    const p = document.createElement('div'); p.className = 'trail-particle'; p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
    document.body.appendChild(p); requestAnimationFrame(() => { p.style.opacity = '0'; p.style.transform = 'scale(0)'; }); setTimeout(() => p.remove(), 500);
});
let cursorPaused = false, cursorRaf;
function animateCursor() { outlineX += (mouseX - outlineX) * 0.50;
outlineY += (mouseY - outlineY) * 0.50;
cursorOutline.style.left = outlineX + 'px';
cursorOutline.style.top = outlineY + 'px';
cursorRaf = requestAnimationFrame(animateCursor); }
document.addEventListener('scroll', () => { if (!cursorPaused) { cursorPaused = true; cancelAnimationFrame(cursorRaf); cursorOutline.style.opacity = '0'; } clearTimeout(window._cursorTimeout); window._cursorTimeout = setTimeout(() => { cursorPaused = false; cursorOutline.style.opacity = ''; animateCursor(); }, 200); }, { passive: true });
animateCursor();
setTimeout(() => { document.getElementById('heroName').classList.add('animate'); }, 1500);


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => { let current = ''; sections.forEach(s => { if (scrollY >= s.offsetTop - 300) current = s.getAttribute('id'); }); navLinks.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + current) l.classList.add('active'); }); });
document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });

const skillModalOverlay = document.getElementById('skillModalOverlay');
function openSkillModal(key) { const d = skillData[key]; if (!d) return; document.getElementById('modalIcon').innerHTML = '<i class="' + d.icon + '"></i>'; document.getElementById('modalTitle').textContent = d.title; document.getElementById('modalLevelFill').style.width = d.percent + '%'; document.getElementById('modalPercent').textContent = d.percent + '%'; document.getElementById('modalBody').innerHTML = d.info.map(i => '<div class="skill-info-item"><span class="skill-info-emoji">' + i.emoji + '</span><span class="skill-info-text">' + i.text + '</span></div>').join(''); skillModalOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeSkillModal() { skillModalOverlay.classList.remove('active'); document.body.style.overflow = ''; }
document.querySelectorAll('.skill-item').forEach(i => i.addEventListener('click', () => openSkillModal(i.dataset.skill)));
document.getElementById('skillModalClose').addEventListener('click', closeSkillModal);
skillModalOverlay.addEventListener('click', e => { if (e.target === skillModalOverlay) closeSkillModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && skillModalOverlay.classList.contains('active')) closeSkillModal(); });

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
let bgWasPlaying = false, musicIsPlaying = false;

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
    { title: "Worry", artist: "Xecute", src: "https://raw.githubusercontent.com/The-Xecute/Qwerty/main/W1/Mp3/worry.mp3", art: "https://i.postimg.cc/ht258KpL/Screenshot-20260509-160902.png" },
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
        mainAudio.src = track.src; trackTitle.textContent = track.title; trackArtist.textContent = track.artist; albumArt.src = track.art;
        progressFill.style.width = '0%'; currentTimeEl.textContent = '0:00'; durationEl.textContent = '0:00';
        pt.classList.remove('slide-out'); pt.classList.add('slide-in'); void pt.offsetWidth; pt.classList.remove('slide-in');
        if (musicIsPlaying) { mainAudio.play().catch(() => {}); albumArt.classList.add('spinning'); playIcon.classList.remove('fa-play'); playIcon.classList.add('fa-pause'); }
        else { albumArt.classList.remove('spinning'); playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); }
    }, 400);
}
loadTrack(currentTrackIndex);

function togglePlay() {
    if (mainAudio.paused) {
        if (!bgAudio.paused) { bgAudio.pause(); bgWasPlaying = true; bgMusicIcon.classList.remove('fa-pause'); bgMusicIcon.classList.add('fa-music'); } else bgWasPlaying = false;
        mainAudio.play(); playIcon.classList.remove('fa-play'); playIcon.classList.add('fa-pause'); albumArt.classList.add('spinning'); musicIsPlaying = true; startViz();
    } else {
        mainAudio.pause(); playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); albumArt.classList.remove('spinning'); musicIsPlaying = false; stopViz();
        if (bgWasPlaying) { bgAudio.play(); bgMusicIcon.classList.remove('fa-music'); bgMusicIcon.classList.add('fa-pause'); }
    }
}
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', () => { currentTrackIndex = (currentTrackIndex + 1) % playlist.length; loadTrack(currentTrackIndex); });
prevBtn.addEventListener('click', () => { if (mainAudio.currentTime > 3) mainAudio.currentTime = 0; else { currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; loadTrack(currentTrackIndex); } });
mainAudio.addEventListener('timeupdate', () => { if (mainAudio.duration) { progressFill.style.width = (mainAudio.currentTime / mainAudio.duration * 100) + '%'; currentTimeEl.textContent = formatTime(mainAudio.currentTime); } });
mainAudio.addEventListener('loadedmetadata', () => { durationEl.textContent = formatTime(mainAudio.duration); });
progressBar.addEventListener('click', e => { if (mainAudio.duration) mainAudio.currentTime = (e.offsetX / progressBar.clientWidth) * mainAudio.duration; });
volumeSlider.addEventListener('input', e => { mainAudio.volume = e.target.value; });
function formatTime(s) { if (isNaN(s)) return '0:00'; return Math.floor(s/60) + ':' + (Math.floor(s%60) < 10 ? '0' : '') + Math.floor(s%60); }
mainAudio.addEventListener('ended', () => { currentTrackIndex = (currentTrackIndex + 1) % playlist.length; loadTrack(currentTrackIndex); stopViz(); });

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
    const v = videoPlaylist[index]; videoPlayerTop.classList.add('switching'); videoOverlayInfo.style.opacity = '0';
    setTimeout(() => {
        mainVideo.src = v.src; videoTitle.textContent = v.title; videoArtist.textContent = v.artist; videoOverlayInfo.textContent = v.title;
        videoProgressFill.style.width = '0%'; videoCurrentTimeEl.textContent = '0:00'; videoDurationEl.textContent = '0:00'; videoPlayerTop.classList.remove('switching');
        if (videoIsPlaying) { mainVideo.play().catch(() => {}); videoPlayIcon.classList.remove('fa-play'); videoPlayIcon.classList.add('fa-pause'); videoOverlayInfo.style.opacity = '1'; setTimeout(() => { videoOverlayInfo.style.opacity = '0'; }, 2000); }
        else { videoPlayIcon.classList.remove('fa-pause'); videoPlayIcon.classList.add('fa-play'); }
    }, 300);
}
loadVideo(currentVideoIndex);

function toggleVideoPlay() {
    if (mainVideo.paused) {
        if (!mainAudio.paused) { mainAudio.pause(); playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); albumArt.classList.remove('spinning'); musicIsPlaying = false; }
        mainVideo.play(); videoPlayIcon.classList.remove('fa-play'); videoPlayIcon.classList.add('fa-pause'); videoOverlayInfo.style.opacity = '1'; setTimeout(() => { videoOverlayInfo.style.opacity = '0'; }, 2000); videoIsPlaying = true;
    } else { mainVideo.pause(); videoPlayIcon.classList.remove('fa-pause'); videoPlayIcon.classList.add('fa-play'); videoIsPlaying = false; }
}
videoPlayBtn.addEventListener('click', toggleVideoPlay);
mainVideo.addEventListener('click', toggleVideoPlay);
videoNextBtn.addEventListener('click', () => { currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length; loadVideo(currentVideoIndex); });
videoPrevBtn.addEventListener('click', () => { if (mainVideo.currentTime > 3) mainVideo.currentTime = 0; else { currentVideoIndex = (currentVideoIndex - 1 + videoPlaylist.length) % videoPlaylist.length; loadVideo(currentVideoIndex); } });
mainVideo.addEventListener('timeupdate', () => { if (mainVideo.duration) { videoProgressFill.style.width = (mainVideo.currentTime / mainVideo.duration * 100) + '%'; videoCurrentTimeEl.textContent = formatTime(mainVideo.currentTime); } });
mainVideo.addEventListener('loadedmetadata', () => { videoDurationEl.textContent = formatTime(mainVideo.duration); });
videoProgressBar.addEventListener('click', e => { if (mainVideo.duration) mainVideo.currentTime = (e.offsetX / videoProgressBar.clientWidth) * mainVideo.duration; });
videoVolumeSlider.addEventListener('input', e => { mainVideo.volume = e.target.value; });
mainVideo.addEventListener('ended', () => { currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length; loadVideo(currentVideoIndex); });

bgMusicBtn.addEventListener('click', e => { e.stopPropagation(); if (bgAudio.paused) { bgAudio.play(); bgMusicIcon.classList.remove('fa-music'); bgMusicIcon.classList.add('fa-pause'); } else { bgAudio.pause(); bgMusicIcon.classList.remove('fa-pause'); bgMusicIcon.classList.add('fa-music'); } });

const scrollProgressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => { const s = document.documentElement.scrollTop; const h = document.documentElement.scrollHeight - document.documentElement.clientHeight; scrollProgressBar.style.width = (s / h * 100) + '%'; });

const typingText = document.getElementById('typingText');
const typingStrings = ['Welcome To My Website <3', 'Developer & Designer', 'Lua Script Enthusiast', 'Python Lover', 'UI/UX Creator'];
let typingIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 80;
function typeWriter() {
    const current = typingStrings[typingIndex];
    if (isDeleting) { typingText.textContent = current.substring(0, charIndex - 1); charIndex--; typingSpeed = 40; }
    else { typingText.textContent = current.substring(0, charIndex + 1); charIndex++; typingSpeed = 80; }
    if (!isDeleting && charIndex === current.length) { isDeleting = true; typingSpeed = 1500; }
    if (isDeleting && charIndex === 0) { isDeleting = false; typingIndex = (typingIndex + 1) % typingStrings.length; typingSpeed = 300; }
    setTimeout(typeWriter, typingSpeed);
}
setTimeout(typeWriter, 1500);

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { if (window.scrollY > 500) backToTop.classList.add('visible'); else backToTop.classList.remove('visible'); });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const backToBottom = document.getElementById('backToBottom');
const pageHeight = () => document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener('scroll', () => { if (window.scrollY < pageHeight() - 500) backToBottom.classList.add('visible'); else backToBottom.classList.remove('visible'); });
backToBottom.addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));

const kbToast = document.getElementById('kbToast');
let kbToastTimer;
function showKbToast(msg) { kbToast.innerHTML = msg; kbToast.classList.add('show'); clearTimeout(kbToastTimer); kbToastTimer = setTimeout(() => kbToast.classList.remove('show'), 1500); }

const vizBars = document.querySelectorAll('.viz-bar');
let vizInterval;
function startViz() { if (vizInterval) return; vizInterval = setInterval(() => { vizBars.forEach(bar => { bar.style.height = (Math.random() * 20 + 4) + 'px'; bar.style.opacity = 0.4 + Math.random() * 0.6; }); }, 120); }
function stopViz() { clearInterval(vizInterval); vizInterval = null; vizBars.forEach(bar => { bar.style.height = '4px'; bar.style.opacity = '0.7'; }); }

/* ================================================================
   NAV LINK SCRAMBLE EFFECT
   ================================================================ */
const scrambleChars = '!<>-_\\/[]{}—=+*^?#_';
const navLinksAll = document.querySelectorAll('.nav-link');
navLinksAll.forEach(link => {
    const originalText = link.textContent.trim();
    let isScrambling = false, scrambleInterval = null;
    function resetText() { if (scrambleInterval) { clearInterval(scrambleInterval); scrambleInterval = null; } link.textContent = originalText; isScrambling = false; }
    link.addEventListener('mouseenter', () => {
        if (isScrambling) return; isScrambling = true; let iteration = 0;
        scrambleInterval = setInterval(() => {
            link.childNodes.forEach(node => {
                if (node.nodeType === 3) { const text = node.textContent; let scrambled = ''; for (let i = 0; i < text.length; i++) { scrambled += i < iteration ? text[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]; } node.textContent = scrambled; }
            });
            iteration += 1 / 2;
            if (iteration >= originalText.length) { clearInterval(scrambleInterval); scrambleInterval = null; link.textContent = originalText; isScrambling = false; }
        }, 30);
    });
    link.addEventListener('click', resetText);
    link.addEventListener('touchstart', resetText);
    link.addEventListener('mouseleave', resetText);
});

window.addEventListener('load', () => { bgAudio.volume = 0.5; });

function startBgOnFirstInteraction() { if (bgAudio.paused) { bgAudio.play().then(() => { bgMusicIcon.classList.remove('fa-music'); bgMusicIcon.classList.add('fa-pause'); }).catch(() => {}); } document.removeEventListener('click', startBgOnFirstInteraction); document.removeEventListener('scroll', startBgOnFirstInteraction); document.removeEventListener('touchstart', startBgOnFirstInteraction); }

function shareProffile() { if (navigator.share) { navigator.share({ title: 'Xecute — Proffile', text: 'Check out Xecute\'s Proffile!', url: window.location.href }).catch(() => {}); } else { navigator.clipboard.writeText(window.location.href).then(() => { showKbToast('Link copied to clipboard!'); }).catch(() => {}); } }


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


themes: () => `<span class="output">16 themes available: Dark, Light, Ice, Galaxy, Autumn, Paper, Cherry, Lavender,</span>
<span class="output">Mint, Coral, Frosting, Lemon, Sakura, Storm, Vaporwave, Vortex.</span>`,


    projects: () => `<span class="output">1. Xecute-WiFi    - Grab WiFi passwords</span>
<span class="output">2. Stream-Xecute  - Watch movies & series</span>
<span class="output">3. Xecute Obfuscator - Encrypt your code</span>
<span class="output">4. Got a new idea? Let's create it together.</span>`,

    contact: () => `<span class="output">Telegram: @iXecute</span>
<span class="output">Email:    xecute558@hotmail.com</span>
<span class="output">GitHub:   github.com/The-Xecute</span>
<span class="output">Website:  chithi.me/xecute</span>`,

    hello: () => `<span class="output">Hey there! 👋 Thanks for visiting my Proffile!</span>`,

    whoami: () => `<span class="output">You are a visitor exploring Xecute's world. Welcome! 🌍</span>`,

    clear: () => 'CLEAR',

    secret: () => `<span class="output">🎉 You found the secret!</span>
<span class="output">Here's a cookie: 🍪</span>
<span class="output">Fun fact: This Proffile has 16 themes and was built with pure HTML, CSS & JS.</span>
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


// ===== AI CHAT KNOWLEDGE BASE =====
const chatK = {
  'hello|hi|hey|yo|sup|wassup|good morning|good evening|good afternoon': [
    'Hey there! 👋 Welcome to Xecute\'s portfolio.',
    'I\'m his AI assistant — ask about skills, projects, contact, hobbies, themes, games, or anything!',
    'What would you like to know?'
  ],
  'who is xecute|about xecute|tell me about|who are you': [
    'Xecute is a <span class="hl">Diploma Engineering student</span> from Bangladesh who\'s deeply obsessed with coding.',
    'Started in <span class="hl">2022</span> with Python and hasn\'t stopped learning since.',
    'Stack: Python, Lua, JS/TS, UI/UX Design, Databases. Currently exploring <span class="hl">Rust</span>. 🦀',
    'Fun fact: He loves sitting alone looking at the sky while listening to music. 🎵'
  ],
  'skills|what can you do|tech stack|technologies|what does he know': [
    'Here\'s the full stack:',
    '🐍 <span class="hl">Python</span> — 95% — Automation, tools, scripting',
    '📜 <span class="hl">Lua Script</span> — 92% — Game scripting, modding',
    '⚡ <span class="hl">JavaScript & TypeScript</span> — 90% — Web development',
    '🎨 <span class="hl">UI/UX Design</span> — 88% — Interfaces & user experience',
    '🗄️ <span class="hl">Databases & DevOps</span> — 85% — PostgreSQL, MongoDB, Docker',
    '🦀 <span class="hl">Rust</span> — Currently learning',
    'Prefers <span class="hl">vanilla HTML/CSS/JS</span> over frameworks. Raw power! 💪'
  ],
  'projects|portfolio|work|what has he built': [
    '📡 <span class="hl">Xecute-WiFi</span> — Grab WiFi passwords on rooted devices',
    '🎬 <span class="hl">Stream-Xecute</span> — Watch movies & series online',
    '🔒 <span class="hl">Xecute Obfuscator</span> — Encrypt and protect your code',
    '💡 Got a new idea? He\'s always open to collaborate! Check Projects section above. 🔗'
  ],
  'contact|reach|email|telegram|how to reach|get in touch': [
    '📨 <span class="hl">Telegram</span> — @iXecute',
    '📧 <span class="hl">Email</span> — xecute558@hotmail.com',
    '💬 <span class="hl">Messages</span> — chithi.me/xecute',
    '🐙 <span class="hl">GitHub</span> — github.com/The-Xecute',
    'He\'s open to freelance and collaborations! 🤝'
  ],
  'hobbies|free time|interests|what does he do for fun': [
    '<span class="hl">10 hobbies</span> — the guy\'s got range!',
    '📸 Photography · 🎮 Gaming · 🎸 Music (guitar & lo-fi)',
    '🥾 Hiking & outdoors · 😂 Creating memes · 🎬 Movies',
    '🌍 Languages · 💪 Gym · 🚴 Cycling · 💻 Coding'
  ],
  'themes|how many themes|design|visual styles': [

'<span class="hl">16 unique themes</span>! Dark, Light, Ice, Galaxy, Autumn, Paper, Cherry, Lavender, Mint, Coral, Frosting, Lemon, Sakura, Storm, Vaporwave, Vortex.',

    'Each has <span class="hl">custom animated backgrounds</span> and glassmorphism!',
    'Press <span class="hl">1-9</span> and <span class="hl">0</span> to quick-switch. Or swipe in Themes section. 🔑'
  ],
  'games|mini games|play|what games': [
    '<span class="hl">8 mini games</span>: Reaction, Tic Tac Toe, Memory, Whack-a-Mole, Snake, Flappy Bird, Simon Says, Typing Speed, 2048, Brick Breaker, Minesweeper, Hangman.',
    'All with <span class="hl">high score tracking</span>! Try to beat your best. 🏆'
  ],
  'location|where|from|country|where does he live': [
    '<span class="hl">Sherpur, Mymensingh</span>, Bangladesh 🇧🇩',
    'Small district, big dreams. Proof you don\'t need a big city for big things! 🌍'
  ],
  'python|lua|javascript|typescript|what languages': [
    '<span class="hl">Python</span> — 95% — automation, tools, scripting.',
    '<span class="hl">Lua</span> — 92% — game scripting, modding.',
    '<span class="hl">JS/TS</span> — 90% — web development, prefers vanilla.',
    'Adding <span class="hl">Rust</span> to the list now. Next frontier! 🦀'
  ],
  'rust|learning|future|next': [
    'Currently diving into <span class="hl">Rust</span> for system-level programming.',
    'Loves exploring <span class="hl">low-level implementations</span> and memory safety.',
    'Always seeking the next challenge! 🚀'
  ],
  'age|old|born|birthday|how old': [
    'Started coding in <span class="hl">2022</span> — a few years now.',
    'Age is classified! 😄 But young, hungry, and ambitious.',
    'Hello World to 16 themes in under 3 years — that\'s speed! ⚡'
  ],
  'website|url|link|built with|what is this': [
    'You\'re on it! 🎉 Built with <span class="hl">pure HTML, CSS & JavaScript</span>.',
    '16 themes, music player, video player, terminal, 8 games, AI chat, Pomodoro, guestbook, notes, FAQ...',
    'All in a <span class="hl">single HTML file</span>. That\'s the flex. 💪'
  ],
  'freelance|available|hire|work with|collaborate': [
    'Yes! Open to <span class="hl">freelance</span> work and collaborations!',
    'Python automation, game scripting, UI/UX, full-stack web apps — hit him up on Telegram! 📨'
  ],
  'thank|thanks|awesome|cool|nice|great|love it': [
    'That means a lot! 🙏 If you haven\'t yet, <span class="hl">sign the guestbook</span>!',
    'Feel free to ask anything else. I\'m always here! 💬'
  ],
  'help|commands|what can i ask|how does this work': [
    'I\'m a <span class="hl">rule-based AI assistant</span> built into the portfolio.',
    'I know everything about Xecute. Try: skills, projects, contact, hobbies, themes, games, location!',
    'Just type naturally — I\'ll try to understand! 🧠'
  ]
};

// Helper function to get response based on user input
function chatGetResponse(input) {
  const lowerInput = input.toLowerCase();
  
  for (let pattern in chatK) {
    const regex = new RegExp(`\\b(${pattern})\\b`, 'i');
    if (regex.test(lowerInput)) {
      const responses = chatK[pattern];
      return Array.isArray(responses) ? responses : [responses];
    }
  }
  
  return ["I don't understand that yet. Try asking about skills, projects, themes, games, or contact info!"];
}

// Refresh quick questions dropdown
function chatRefreshQ() {
  const helpDrop = document.getElementById('chatHelpDrop');
  if (!helpDrop) return;
  
  const quickQuestions = [
    'What are your skills?',
    'Show me projects',
    'How to contact Xecute?',
    'Tell me about themes',
    'What games are here?',
    'Where are you from?'
  ];
  
  helpDrop.innerHTML = '<div class="chat-help-drop-title">📋 Quick Questions</div>';
  quickQuestions.forEach(q => {
    const btn = document.createElement('button');
    btn.textContent = q;
    btn.onclick = () => {
      chatSend(q);
      document.getElementById('chatHelpDrop').classList.remove('show');
      document.getElementById('chatHelpBtn').classList.remove('open');
    };
    helpDrop.appendChild(btn);
  });
}

// Send message function
function chatSend(text) {
  const input = document.getElementById('chatTypeInput');
  const message = text || input.value;
  
  if (!message || !message.trim()) return;
  
  const finalMessage = message.trim();
  if (!text) input.value = '';
  
  const chatMsgs = document.getElementById('chatMsgs');
  
  // Add user message
  const userWrap = document.createElement('div');
  userWrap.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end';
  
  const timestamp = document.createElement('span');
  timestamp.style.cssText = 'font-size: .6rem; color: var(--text-muted); margin-bottom: 3px; padding: 0 10px; align-self: flex-end; opacity: .6';
  const now = new Date();
  timestamp.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  userWrap.appendChild(timestamp);
  
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = finalMessage;
  userWrap.appendChild(userBubble);
  chatMsgs.appendChild(userWrap);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  
  // Show typing indicator
  const typingWrap = document.createElement('div');
  typingWrap.id = 'typingIndicator';
  typingWrap.innerHTML = '<div class="chat-bubble typing-ind"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
  chatMsgs.appendChild(typingWrap);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  
  // Get bot response after delay
  setTimeout(() => {
    const ti = document.getElementById('typingIndicator');
    if (ti) ti.remove();
    
    const responses = chatGetResponse(finalMessage);
    const responseWrap = document.createElement('div');
    responseWrap.style.cssText = 'display: flex; flex-direction: column; align-items: flex-start';
    
    const aiBadge = document.createElement('span');
    aiBadge.style.cssText = 'font-size: .55rem; color: var(--text-muted); padding: 0 10px; align-self: flex-start; opacity: .5';
    aiBadge.textContent = 'AI';
    responseWrap.appendChild(aiBadge);
    
    responses.forEach(line => {
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      botBubble.innerHTML = line;
      responseWrap.appendChild(botBubble);
    });
    
    chatMsgs.appendChild(responseWrap);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }, 800 + Math.random() * 600);
}

// Setup event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatTypeInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const helpBtn = document.getElementById('chatHelpBtn');
  const helpDrop = document.getElementById('chatHelpDrop');
  const chatMsgs = document.getElementById('chatMsgs');
  
  // Send button click
  if (sendBtn) {
    sendBtn.addEventListener('click', () => chatSend());
  }
  
  // Enter key press
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') chatSend();
    });
  }
  
  // Help button toggle
  if (helpBtn && helpDrop) {
    helpBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      helpDrop.classList.toggle('show');
      helpBtn.classList.toggle('open');
      chatRefreshQ();
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.chat-help-btn') && !e.target.closest('.chat-help-drop')) {
      if (helpDrop) helpDrop.classList.remove('show');
      if (helpBtn) helpBtn.classList.remove('open');
    }
  });
  
  // Add welcome message and suggestions
  if (chatMsgs) {
    setTimeout(() => {
      const welcomeDiv = document.createElement('div');
      welcomeDiv.className = 'chat-welcome';
      welcomeDiv.innerHTML = '<div class="chat-welcome-text">👋 Click a suggestion or type below</div>';
      chatMsgs.appendChild(welcomeDiv);
      
      const suggestions = [
        'What are your skills?',
        'Show me projects',
        'How to contact Xecute?'
      ];
      
      suggestions.forEach(q => {
        const btn = document.createElement('div');
        btn.style.cssText = 'align-self: center; cursor: pointer; padding: 8px 16px; border-radius: var(--radius-full); border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); font-size: .78rem; font-weight: 600; transition: all .2s ease; margin: 3px 0;';
        btn.textContent = q;
        btn.onmouseover = () => {
          btn.style.borderColor = 'var(--accent)';
          btn.style.color = 'var(--accent)';
          btn.style.transform = 'translateY(-1px)';
        };
        btn.onmouseout = () => {
          btn.style.borderColor = 'var(--border)';
          btn.style.color = 'var(--text-secondary)';
          btn.style.transform = '';
        };
        btn.onclick = () => {
          chatSend(q);
          btn.remove();
        };
        chatMsgs.appendChild(btn);
      });
    }, 200);
  }
});


    
// ========== GAMES SECTION==========

// == GAMES ENGINE ===
const gameInits = {};
const GAMES = [
    {id:'tictactoe',name:'Tic Tac Toe',icon:'fa-hashtag',info:'You are X. Beat the AI!'},
    {id:'whack',name:'Whack',icon:'fa-hand-back-fist',info:'Tap the moles! 30 seconds.'},
    {id:'snake',name:'Snake',icon:'fa-worm',info:'Arrow keys / swipe to move.'},
    {id:'g2048',name:'2048',icon:'fa-table-cells',info:'Swipe / arrows to merge tiles.'},
    {id:'breaker',name:'Breaker',icon:'fa-cubes',info:'Move paddle. Break all bricks.'},
    {id:'connect4',name:'Connect 4',icon:'fa-grip',info:'Drop chips. Connect 4 to win!'},
    {id:'bounce',name:'Bounce Tales',icon:'fa-circle',info:'Arrow keys / swipe. Collect rings!'},
    ];


let currentGame = null, cleanupFns = [];
function gid(id) { return document.getElementById(id); }
function cleanupGame() {
    cleanupFns.forEach(fn => { try { fn(); } catch(e) {} });
    cleanupFns = [];
    gid('gameArea').innerHTML = '';
    gid('gameControls').innerHTML = '';
}
function addClean(fn) { cleanupFns.push(fn); return fn; }
function getHS(n) { return parseInt(localStorage.getItem('xg-'+n) || '0'); }
function setHS(n, s, lowerIsBetter) {
    let old = getHS(n);
    if ((lowerIsBetter && (s < old || old === 0)) || (!lowerIsBetter && s > old)) {
        localStorage.setItem('xg-'+n, s);
        return true;
    }
    return false;
}
function gScore(t) { gid('gScore').innerHTML = t || ''; }
function gHigh(n) { let s = getHS(n); gid('gHigh').innerHTML = s ? 'Best: <span>'+s+'</span>' : ''; }
function gInfo(t) { gid('gInfo').innerHTML = t || ''; }
function showControls(html) { gid('gameControls').innerHTML = html; }

// Helper: get computed CSS var value (for Canvas rendering)
function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

// Build game selector
let sel = gid('gameSelector');
GAMES.forEach(g => {
    let btn = document.createElement('button');
    btn.className = 'game-sel-btn';
    btn.dataset.id = g.id;
    btn.innerHTML = `<i class="fas ${g.icon}"></i>${g.name}`;
    btn.onclick = () => selectGame(g.id);
    sel.appendChild(btn);
});

function selectGame(id) {
    if (currentGame === id) return;
    let area = gid('gameArea');
    area.classList.add('switching');
    setTimeout(() => {
        cleanupGame();
        currentGame = id;
        let game = GAMES.find(g => g.id === id);
        sel.querySelectorAll('.game-sel-btn').forEach(b => b.classList.toggle('active', b.dataset.id === id));
        gid('gHdrIcon').className = `game-hdr-icon fas ${game.icon}`;
        gid('gHdrName').innerHTML = game.name;
        gid('gRestart').style.display = '';
        gScore('');
        gHigh(id);
        gInfo(game.info);
        if (gameInits[id]) gameInits[id]();
        area.classList.remove('switching');
    }, 150);
}
window.restartGame = function() {
    let g = currentGame;
    if (!g) return;
    currentGame = null;
    cleanupGame();
    setTimeout(() => selectGame(g), 150);
};


// ===== 2. TIC TAC TOE (Unbeatable AI) =====
gameInits.tictactoe = function() {
    let a = gid('gameArea');
    a.innerHTML = '<div class="ttt-grid" id="tttGrid"></div>';
    let grid = gid('tttGrid'), board = Array(9).fill(''), turn = 'X', over = false;
    let wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function render() {
        grid.innerHTML = board.map((c,i) => `<div class="ttt-cell ${c==='X'?'x':c==='O'?'o':''}" data-i="${i}">${c}</div>`).join('');
        grid.querySelectorAll('.ttt-cell').forEach(c => c.onclick = () => play(+c.dataset.i));
    }
    function check(b) {
        for (let w of wins) {
            if (b[w[0]] && b[w[0]] === b[w[1]] && b[w[0]] === b[w[2]]) return b[w[0]];
        }
        return b.includes('') ? null : 'D';
    }
    function minimax(b, depth, isMax) {
        let r = check(b);
        if (r === 'X') return 10 - depth;
        if (r === 'O') return depth - 10;
        if (r === 'D') return 0;
        if (isMax) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (!b[i]) {
                    b[i] = 'X';
                    best = Math.max(best, minimax(b, depth+1, false));
                    b[i] = '';
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (!b[i]) {
                    b[i] = 'O';
                    best = Math.min(best, minimax(b, depth+1, true));
                    b[i] = '';
                }
            }
            return best;
        }
    }
    function aiMove() {
        let bestScore = Infinity, bestMoves = [];
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let score = minimax(board, 0, true);
                board[i] = '';
                if (score < bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                } else if (score === bestScore) {
                    bestMoves.push(i);
                }
            }
        }
        if (bestMoves.length) {
            let move = bestMoves[Math.floor(Math.random() * bestMoves.length)];
            board[move] = 'O';
        }
    }
    function play(i) {
        if (over || board[i] || turn !== 'X') return;
        board[i] = 'X';
        turn = 'O';
        render();
        let r = check(board);
        if (r) { end(r); return; }
        let ttt = setTimeout(() => {
            aiMove();
            turn = 'X';
            render();
            let r2 = check(board);
            if (r2) end(r2);
            else gScore('Your turn (X)');
        }, 350);
        addClean(() => clearTimeout(ttt));
    }
    function end(r) {
        over = true;
        if (r === 'D') gScore('Draw!');
        else if (r === 'X') gScore('You Win!');
        else gScore('AI Wins');
    }
    render();
    gScore('Your turn (X)');
};



// ===== 4. WHACK-A-MOLE =====
gameInits.whack = function() {
    let a = gid('gameArea');
    let html = '<div class="whack-grid" id="wGrid">';
    for (let i = 0; i < 9; i++) html += '<div class="whack-hole" data-i="'+i+'">🕳️</div>';
    html += '</div>';
    a.innerHTML = html;
    let holes = gid('wGrid').children, score = 0, time = 30, active = false, moleTimer, secTimer;
    function showMole() {
        if (!active) return;
        for (let j = 0; j < holes.length; j++) { holes[j].classList.remove('active'); holes[j].classList.remove('hit'); holes[j].textContent = '🕳️'; }
        let i = Math.floor(Math.random() * 9);
        holes[i].classList.add('active');
        holes[i].textContent = '🐹';
        moleTimer = setTimeout(showMole, 500 + Math.random() * 600);
    }
    secTimer = setInterval(() => {
        time--;
        gScore('Score: '+score+' | '+time+'s');
        if (time <= 0) {
            active = false;
            clearInterval(secTimer);
            clearTimeout(moleTimer);
            for (let j = 0; j < holes.length; j++) { holes[j].classList.remove('active'); holes[j].textContent = '🕳️'; }
            gScore('Final: '+score);
            setHS('whack', score, false);
            gHigh('whack');
        }
    }, 1000);
    active = true;
    showMole();
    for (let k = 0; k < holes.length; k++) {
        (function(h) {
            h.onclick = function() {
                if (!active || !h.classList.contains('active')) return;
                h.classList.remove('active');
                h.classList.add('hit');
                h.textContent = '💥';
                score++;
                gScore('Score: '+score);
                setTimeout(() => { h.classList.remove('hit'); h.textContent = '🕳️'; }, 200);
            };
        })(holes[k]);
    }
    addClean(() => { clearInterval(secTimer); clearTimeout(moleTimer); });
};

// ===== 5. SNAKE =====
gameInits.snake = function() {
    let a = gid('gameArea');
    a.innerHTML = '<canvas class="game-canvas" id="sCanvas"></canvas>';
    let c = gid('sCanvas'), ctx = c.getContext('2d');
    c.width = a.clientWidth; c.height = a.clientHeight;
    let sz = 16, cols = Math.floor(c.width/sz), rows = Math.floor(c.height/sz);
    let snake = [{x:Math.floor(cols/2), y:Math.floor(rows/2)}], dir = {x:1,y:0}, food, score = 0, over = false, spd = 160, loop;
    function placeFood() {
        do { food = {x:Math.floor(Math.random()*cols), y:Math.floor(Math.random()*rows)}; }
        while (snake.some(s => s.x === food.x && s.y === food.y));
    }
    placeFood();
    function draw() {
        ctx.fillStyle = cssVar('--bg-secondary', '#111');
        ctx.fillRect(0,0,c.width,c.height);
        let accent = cssVar('--accent', '#fff');
        ctx.fillStyle = accent;
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) { ctx.shadowColor = accent; ctx.shadowBlur = 8; }
            else ctx.shadowBlur = 0;
            ctx.fillRect(snake[i].x*sz+1, snake[i].y*sz+1, sz-2, sz-2);
        }
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(food.x*sz+sz/2, food.y*sz+sz/2, sz/2-2, 0, Math.PI*2);
        ctx.fill();
        if (over) {
            ctx.fillStyle = 'rgba(0,0,0,.7)';
            ctx.fillRect(0,0,c.width,c.height);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 22px Inter,sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', c.width/2, c.height/2-12);
            ctx.font = '14px Inter,sans-serif';
            ctx.fillText('Score: '+score, c.width/2, c.height/2+16);
        }
    }
    function update() {
        if (over) return;
        let head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
        if (head.x < 0) head.x = cols-1;
        if (head.x >= cols) head.x = 0;
        if (head.y < 0) head.y = rows-1;
        if (head.y >= rows) head.y = 0;
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            over = true;
            gScore('Score: '+score);
            setHS('snake', score, false);
            gHigh('snake');
            draw();
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            gScore('Score: '+score);
            placeFood();
            if (spd > 80) spd -= 3;
            clearInterval(loop);
            loop = setInterval(update, spd);
            addClean(() => clearInterval(loop));
        } else {
            snake.pop();
        }
        draw();
    }
    function keyHandler(e) {
        if (over) return;
        let map = {'ArrowUp':{x:0,y:-1},'ArrowDown':{x:0,y:1},'ArrowLeft':{x:-1,y:0},'ArrowRight':{x:1,y:0}};
        let d = map[e.key];
        if (d && !(d.x === -dir.x && d.y === -dir.y)) { dir = d; e.preventDefault(); }
    }
    document.addEventListener('keydown', keyHandler);
    addClean(() => document.removeEventListener('keydown', keyHandler));
    let tx, ty;
    function ts(e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }
    function te(e) {
        if (!tx) return;
        let dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && dir.x !== -1) dir = {x:1,y:0};
            else if (dx < 0 && dir.x !== 1) dir = {x:-1,y:0};
        } else {
            if (dy > 0 && dir.y !== -1) dir = {x:0,y:1};
            else if (dy < 0 && dir.y !== 1) dir = {x:0,y:-1};
        }
        tx = null; ty = null;
    }
    c.addEventListener('touchstart', ts, {passive:true});
    c.addEventListener('touchend', te);
    addClean(() => { c.removeEventListener('touchstart', ts); c.removeEventListener('touchend', te); });
    loop = setInterval(update, spd);
    addClean(() => clearInterval(loop));
    draw();
    showControls(`<div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="up"><i class="fas fa-chevron-up"></i></button></div>
                   <div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="left"><i class="fas fa-chevron-left"></i></button>
                   <button class="game-ctrl-btn" data-dir="down"><i class="fas fa-chevron-down"></i></button>
                   <button class="game-ctrl-btn" data-dir="right"><i class="fas fa-chevron-right"></i></button></div>`);
    gid('gameControls').querySelectorAll('.game-ctrl-btn').forEach(b => {
        b.onclick = () => {
            let d = b.dataset.dir, dirs = {up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
            let nd = dirs[d];
            if (nd && !(nd.x === -dir.x && nd.y === -dir.y)) dir = nd;
        };
    });
};


// ===== 9. 2048 =====
gameInits.g2048 = function() {
    let a = gid('gameArea');
    a.innerHTML = '<div class="grid-2048" id="grid2048"></div>';
    let grid = gid('grid2048'), board = Array(16).fill(0), score = 0, over = false;
    let colors = {0:'var(--bg-card)',2:'var(--text-muted)',4:'var(--text-secondary)',8:'#e8a050',16:'#e07830',32:'#e06020',64:'#e04010',128:'#edc850',256:'#edc040',512:'#edc030',1024:'#edc020',2048:'#edc010'};
    function render() {
        grid.innerHTML = board.map(v => `<div class="tile-2048" style="background:${colors[v]||'var(--accent)'};color:${v>=8?'#fff':'var(--text-primary)'};font-size:${v>=1024?'.9rem':v>=128?'1.1rem':'1.3rem'}">${v||''}</div>`).join('');
    }
    function addTile() {
        let empty = []; for (let i=0;i<16;i++) if(board[i]===0) empty.push(i);
        if (!empty.length) { checkOver(); return; }
        board[empty[Math.floor(Math.random()*empty.length)]] = Math.random()<0.9 ? 2 : 4;
        render();
    }
    function slide(row) {
        let arr = row.filter(v => v), pts = 0;
        for (let i=0;i<arr.length-1;i++) if (arr[i]===arr[i+1]) { arr[i]*=2; pts+=arr[i]; arr.splice(i+1,1); }
        while (arr.length<4) arr.push(0);
        return {arr, pts};
    }
    function move(dir) {
        if (over) return;
        let moved = false, totalPts = 0;
        if (dir === 'left') {
            for (let r=0;r<4;r++) {
                let res = slide(board.slice(r*4, r*4+4));
                if (res.arr.join() !== board.slice(r*4, r*4+4).join()) moved = true;
                totalPts += res.pts;
                for (let c=0;c<4;c++) board[r*4+c] = res.arr[c];
            }
        } else if (dir === 'right') {
            for (let r=0;r<4;r++) {
                let row = board.slice(r*4, r*4+4).reverse();
                let res = slide(row);
                res.arr.reverse();
                if (res.arr.join() !== board.slice(r*4, r*4+4).join()) moved = true;
                totalPts += res.pts;
                for (let c=0;c<4;c++) board[r*4+c] = res.arr[c];
            }
        } else if (dir === 'up') {
            for (let c=0;c<4;c++) {
                let col = []; for (let r=0;r<4;r++) col.push(board[r*4+c]);
                let res = slide(col);
                if (res.arr.join() !== col.join()) moved = true;
                totalPts += res.pts;
                for (let r=0;r<4;r++) board[r*4+c] = res.arr[r];
            }
        } else if (dir === 'down') {
            for (let c=0;c<4;c++) {
                let col = []; for (let r=0;r<4;r++) col.push(board[r*4+c]);
                // FIX: save original join BEFORE reverse mutates the array
                let origCol = col.join();
                let res = slide(col.reverse());
                res.arr.reverse();
                if (res.arr.join() !== origCol) moved = true;
                totalPts += res.pts;
                for (let r=0;r<4;r++) board[r*4+c] = res.arr[r];
            }
        }
        if (moved) {
            score += totalPts;
            gScore('Score: '+score);
            addTile();
            if (board.indexOf(2048) >= 0) gScore('You got 2048!');
            checkOver();
        }
    }
    function checkOver() {
        if (board.indexOf(0) >= 0) return;
        for (let r=0;r<4;r++) for (let c=0;c<3;c++) if (board[r*4+c] === board[r*4+c+1]) return;
        for (let c=0;c<4;c++) for (let r=0;r<3;r++) if (board[r*4+c] === board[(r+1)*4+c]) return;
        over = true;
        gScore('Over! '+score);
        setHS('g2048', score, false);
        gHigh('g2048');
    }
    function keyH(e) {
        let map = {'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'up','ArrowDown':'down'};
        if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
    }
    document.addEventListener('keydown', keyH);
    addClean(() => document.removeEventListener('keydown', keyH));
    let tx, ty;
    function ts(e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }
    function te(e) {
        if (!tx) return;
        let dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
        tx = null; ty = null;
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
        if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
        else move(dy > 0 ? 'down' : 'up');
    }
    grid.addEventListener('touchstart', ts, {passive:true});
    grid.addEventListener('touchend', te);
    addClean(() => { grid.removeEventListener('touchstart', ts); grid.removeEventListener('touchend', te); });
    addTile(); addTile(); render();
    showControls(`<div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="up"><i class="fas fa-chevron-up"></i></button></div>
                   <div class="game-ctrl-row"><button class="game-ctrl-btn" data-dir="left"><i class="fas fa-chevron-left"></i></button>
                   <button class="game-ctrl-btn" data-dir="down"><i class="fas fa-chevron-down"></i></button>
                   <button class="game-ctrl-btn" data-dir="right"><i class="fas fa-chevron-right"></i></button></div>`);
    gid('gameControls').querySelectorAll('.game-ctrl-btn').forEach(b => b.onclick = () => move(b.dataset.dir));
};

// ===== BRICK BREAKER =====
gameInits.breaker = function() {
    let a = gid('gameArea');
    a.innerHTML = '<canvas class="game-canvas" id="bCanvas"></canvas>';
    let c = gid('bCanvas'), ctx = c.getContext('2d');
    c.width = a.clientWidth; c.height = a.clientHeight;
    let W = c.width, H = c.height;
    let T = 0; // global time

    // --- Audio ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playTone(freq, dur, type = 'square', vol = 0.06, detune = 0) {
        try {
            let o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.type = type; o.frequency.value = freq; o.detune.value = detune;
            g.gain.setValueAtTime(vol, audioCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
            o.connect(g); g.connect(audioCtx.destination);
            o.start(); o.stop(audioCtx.currentTime + dur);
        } catch(e) {}
    }
    function sndHit()     { playTone(440, 0.06, 'triangle', 0.04); }
    function sndBrick(r, hp) { playTone(280 + r * 90, 0.1, 'square', 0.05 + (hp||1)*0.02); }
    function sndWall()    { playTone(180, 0.04, 'triangle', 0.03); }
    function sndLose()    { playTone(100, 0.5, 'sawtooth', 0.07); setTimeout(() => playTone(80, 0.5, 'sawtooth', 0.05), 150); }
    function sndPowerup() { playTone(700, 0.08, 'sine', 0.05); setTimeout(() => playTone(1100, 0.12, 'sine', 0.04), 60); setTimeout(() => playTone(1400, 0.15, 'sine', 0.04), 120); }
    function sndWin()     { [0,80,160,240,360].forEach((d,i) => setTimeout(() => playTone(500+i*120, 0.25, 'sine', 0.06), d)); }
    function sndExplode() { playTone(60, 0.3, 'sawtooth', 0.1); playTone(90, 0.2, 'square', 0.06); }
    function sndLaser()   { playTone(1200, 0.06, 'sawtooth', 0.04); playTone(800, 0.08, 'sine', 0.03); }
    function sndShield()  { playTone(600, 0.15, 'sine', 0.05, 10); }

    // --- Helpers ---
    function rr(x, y, w, h, r) {
        r = Math.min(r, w/2, h/2);
        ctx.beginPath();
        ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
        ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
        ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
        ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r); ctx.closePath();
    }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function hexToRgb(hex) {
        if (!hex || hex[0] !== '#') return {r:200,g:200,b:200};
        return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) };
    }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function rand(a, b) { return a + Math.random() * (b - a); }

    // --- State ---
    let score = 0, lives = 3, level = 1, maxLevel = 8;
    let over = false, started = false, won = false;
    let combo = 0, comboTimer = 0, maxCombo = 0, totalBricksDestroyed = 0;
    let multiplier = 1, multiTimer = 0;
    let shakeX = 0, shakeY = 0, shakeDur = 0, shakeStr = 0;
    let flashAlpha = 0, flashColor = '#fff';
    let particles = [], floatTexts = [], powerups = [], trails = [];
    let lasers = [], stars = [];
    let balls = [], bricks = [];
    let padW = 90, padH = 12, padX = W/2 - padW/2, padY = H - 35;
    let padTargetX = padX, baseSpeed = 3.2;
    let shieldHP = 0, shieldMaxHP = 0;
    let fireball = false, fireballTimer = 0;
    let magnet = false, magnetTimer = 0;
    let laserCharges = 0;
    let levelTransition = 0; // countdown
    let transitionText = '';
    let bgHue = 220;
    let overStartT = 0;
    
    // Optimization: Track counts to avoid array filtering every frame
    let bricksRemaining = 0, bricksTotal = 0;

    // --- Stars background ---
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * W, y: Math.random() * H,
            r: 0.3 + Math.random() * 1.2,
            speed: 0.05 + Math.random() * 0.15,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.01 + Math.random() * 0.03
        });
    }

    // --- Level Palettes ---
    const levelPalettes = [
        ['#ff4466','#ff7744','#ffaa33','#44cc66','#4499ff'],
        ['#ff3377','#ff6644','#ffcc22','#22ddaa','#3388ff','#aa44ff'],
        ['#ff2255','#ff5533','#ff9900','#33ee77','#2288ff','#7744ff','#ff44aa'],
        ['#ff1144','#ff4422','#ee8800','#22ff88','#1166ff','#6622ff','#ff22aa','#ffdd00'],
        ['#ff0033','#ff3300','#dd7700','#00ffaa','#0055ff','#5500ff','#ff00aa','#ffee00','#00ddff'],
        ['#ff0066','#ff6600','#ccaa00','#00ff66','#0066ff','#6600ff','#ff00cc','#ff8800','#00ffdd','#88ff00'],
        ['#ff0044','#ff4400','#ffaa00','#aaff00','#00ff44','#00aaff','#0044ff','#aa00ff','#ff00aa','#ff0088','#ffcc00'],
        ['#ff0033','#ff2200','#ff8800','#ddff00','#44ff00','#00ff88','#00ffcc','#0088ff','#0044ff','#4400ff','#cc00ff','#ff00cc'],
    ];

    // --- Brick Patterns ---
    function generateBricks(lvl) {
        let bricks = [];
        let pal = levelPalettes[Math.min(lvl - 1, levelPalettes.length - 1)];
        let cols = Math.floor(W / 52);
        let bw = (W - 20) / cols - 4, bh = 18;
        let topOff = 55;

        function addBrick(r, cl, special = '') {
            let hp = 1;
            if (lvl >= 3 && r < 2) hp = 2;
            if (lvl >= 5 && r === 0) hp = 3;
            if (lvl >= 7 && r === 0) hp = 4;
            if (special === 'tough') hp = lvl + 1;
            if (special === 'bomb') hp = 1;
            if (special === 'steel') hp = 999;
            let color = pal[r % pal.length];
            if (special === 'steel') color = '#667788';
            if (special === 'bomb') color = '#ff2200';
            if (special === 'tough') color = '#ffaa00';
            bricks.push({
                x: 12 + cl * (bw + 4), y: topOff + r * (bh + 4),
                w: bw, h: bh, alive: true, hp, maxHp: hp, color, special,
                flash: 0, enterDelay: (r * cols + cl) * 0.015,
                enterProgress: 0, shakeX: 0
            });
        }

        let rows = Math.min(3 + lvl, 9);
        if (lvl <= 2) {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) addBrick(r, cl);
        } else if (lvl === 3) {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    if ((r + cl) % 2 === 0) addBrick(r, cl);
                    else if (r > 0 && Math.random() < 0.15) addBrick(r, cl, 'bomb');
                }
        } else if (lvl === 4) {
            let mid = Math.floor(rows / 2), midC = Math.floor(cols / 2);
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    let dist = Math.abs(r - mid) + Math.abs(cl - midC);
                    if (dist <= mid + 1) addBrick(r, cl, dist <= 1 ? 'tough' : '');
                }
        } else if (lvl === 5) {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    if (r === 0 || r === rows-1 || cl === 0 || cl === cols-1) addBrick(r, cl, 'steel');
                    else addBrick(r, cl, r === Math.floor(rows/2) && cl === Math.floor(cols/2) ? 'tough' : '');
                }
        } else if (lvl === 6) {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    let offset = (r % 2) * 2;
                    if (cl + offset < cols) addBrick(r, cl + offset, Math.random() < 0.1 ? 'bomb' : '');
                }
        } else if (lvl === 7) {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    let cx = cols/2, cy = rows/2;
                    let dist = Math.sqrt((cl-cx)**2 + (r-cy)**2);
                    if (dist < Math.max(cx, cy)) {
                        let sp = dist < 1.5 ? 'tough' : (Math.random() < 0.08 ? 'bomb' : '');
                        addBrick(r, cl, sp);
                    }
                }
        } else {
            for (let r = 0; r < rows; r++)
                for (let cl = 0; cl < cols; cl++) {
                    let sp = '';
                    if (r === 0 && (cl === 0 || cl === cols-1)) sp = 'steel';
                    else if (Math.random() < 0.08) sp = 'bomb';
                    else if (r < 2 && Math.random() < 0.3) sp = 'tough';
                    addBrick(r, cl, sp);
                }
        }
        return bricks;
    }

    // --- Init Level ---
    function initLevel() {
        bricks = generateBricks(level);
        powerups = []; particles = []; floatTexts = []; trails = []; lasers = [];
        balls = [{x: W/2, y: padY - 8, r: 6, dx: 0, dy: 0, fireball: false, stuck: false}];
        combo = 0; comboTimer = 0; started = false; over = false; won = false; overStartT = 0;
        fireball = false; fireballTimer = 0; magnet = false; magnetTimer = 0;
        laserCharges = 0; shieldHP = 0; shieldMaxHP = 0;
        multiplier = 1; multiTimer = 0;
        padW = Math.max(55, 90 - (level - 1) * 4); // Balanced shrink
        padX = W/2 - padW/2; padTargetX = padX;
        baseSpeed = 3.2 + (level - 1) * 0.35;
        bgHue = (200 + level * 25) % 360;
        levelTransition = 90;
        transitionText = level === 1 ? 'BREAKER' : 'LEVEL ' + level;
        
        bricksRemaining = 0; bricksTotal = 0;
        for (let b of bricks) {
            if (b.special !== 'steel') {
                bricksTotal++;
                bricksRemaining++;
            }
        }
    }

    // --- Particles ---
    function spawnParticles(x, y, color, count = 12, opts = {}) {
        let rgb = hexToRgb(color);
        for (let i = 0; i < count; i++) {
            let angle = Math.random() * Math.PI * 2;
            let speed = (opts.speed || 1) + Math.random() * (opts.speedMax || 4);
            particles.push({
                x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                life: 1, decay: 0.012 + Math.random() * (opts.decay || 0.025),
                size: (opts.size || 2) + Math.random() * (opts.sizeMax || 4),
                r: rgb.r, g: rgb.g, b: rgb.b,
                gravity: opts.gravity !== undefined ? opts.gravity : 0.1,
                shape: opts.shape || 'circle'
            });
        }
    }
    function spawnSparkle(x, y, count = 6) {
        for (let i = 0; i < count; i++) {
            let angle = Math.random() * Math.PI * 2;
            let speed = 0.5 + Math.random() * 2;
            particles.push({
                x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - 1.5,
                life: 1, decay: 0.025 + Math.random() * 0.02,
                size: 1 + Math.random() * 2.5, r: 255, g: 255, b: 255,
                gravity: 0.02, shape: 'diamond'
            });
        }
    }
    function spawnExplosion(x, y, color) {
        let rgb = hexToRgb(color);
        for (let i = 0; i < 24; i++) {
            let angle = (i / 24) * Math.PI * 2;
            let speed = 3 + Math.random() * 5;
            particles.push({
                x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
                life: 1, decay: 0.015 + Math.random() * 0.015,
                size: 3 + Math.random() * 5, r: rgb.r, g: rgb.g, b: rgb.b,
                gravity: 0.05, shape: Math.random() > 0.5 ? 'circle' : 'diamond'
            });
        }
        particles.push({
            x, y, vx: 0, vy: 0, life: 1, decay: 0.06,
            size: 30, r: 255, g: 255, b: 255, gravity: 0, shape: 'flash'
        });
    }

    // --- Float Text ---
    function addFloatText(x, y, text, color = '#fff', size = 13) {
        floatTexts.push({x, y, text, color, size, life: 1, vy: -1.8, scale: 0.3});
    }

    // --- Screen Effects ---
    function shake(amount, dur) { shakeStr = amount; shakeDur = dur; }
    function flash(color, alpha = 0.3) { flashColor = color; flashAlpha = alpha; }

    // --- Power-ups ---
    const POWERUP_TYPES = [
        {type:'wide',   label:'W', color:'#44ff88', desc:'Wide Paddle'},
        {type:'multi',  label:'M', color:'#44aaff', desc:'Multi Ball'},
        {type:'slow',   label:'S', color:'#ffaa44', desc:'Slow Mo'},
        {type:'life',   label:'+', color:'#ff4488', desc:'Extra Life'},
        {type:'fire',   label:'F', color:'#ff6600', desc:'Fireball'},
        {type:'shield', label:'O', color:'#44ffff', desc:'Shield'},
        {type:'magnet', label:'N', color:'#ff44ff', desc:'Magnet'},
        {type:'laser',  label:'L', color:'#ffff44', desc:'Laser x3'},
        {type:'multi2', label:'2', color:'#88aaff', desc:'Score x2'},
    ];
    function maybeSpawnPowerup(x, y) {
        let chance = 0.13 + level * 0.01;
        if (Math.random() < chance) {
            let pt = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
            powerups.push({x, y, vy: 1.2, ...pt, size: 13, wobble: Math.random() * Math.PI * 2});
        }
    }
    function applyPowerup(pu) {
        sndPowerup();
        addFloatText(pu.x, pu.y - 10, pu.desc, pu.color, 11);
        switch(pu.type) {
            case 'wide':
                padW = Math.min(170, padW + 35);
                flash('#44ff88', 0.15);
                setTimeout(() => { padW = Math.max(45, padW - 35); }, 9000);
                break;
            case 'multi': {
                let nb = [];
                for (let b of balls) for (let i = 0; i < 2; i++) {
                    let a = Math.atan2(b.dy, b.dx) + (i===0 ? 0.5 : -0.5);
                    let sp = Math.sqrt(b.dx*b.dx + b.dy*b.dy) || baseSpeed;
                    nb.push({x:b.x, y:b.y, r:b.r, dx:Math.cos(a)*sp, dy:Math.sin(a)*sp, fireball:b.fireball||fireball, stuck: false});
                }
                balls.push(...nb);
                flash('#44aaff', 0.15);
                break;
            }
            case 'slow':
                for (let b of balls) { b.dx *= 0.55; b.dy *= 0.55; }
                flash('#ffaa44', 0.12);
                setTimeout(() => { for (let b of balls) { let sp=Math.sqrt(b.dx*b.dx+b.dy*b.dy); if(sp>0.5){let f=baseSpeed/sp;b.dx*=f;b.dy*=f;} } }, 7000);
                break;
            case 'life':
                lives = Math.min(6, lives + 1);
                flash('#ff4488', 0.15);
                break;
            case 'fire':
                fireball = true; fireballTimer = 480;
                for (let b of balls) b.fireball = true;
                flash('#ff6600', 0.2);
                break;
            case 'shield':
                shieldHP = 3; shieldMaxHP = 3;
                flash('#44ffff', 0.15);
                break;
            case 'magnet':
                magnet = true; magnetTimer = 600;
                flash('#ff44ff', 0.12);
                break;
            case 'laser':
                laserCharges += 3;
                flash('#ffff44', 0.15);
                break;
            case 'multi2':
                multiplier = 2; multiTimer = 600;
                flash('#88aaff', 0.15);
                break;
        }
    }

    // --- Bomb Chain ---
    function explodeBomb(b) {
        sndExplode();
        spawnExplosion(b.x + b.w/2, b.y + b.h/2, '#ff4400');
        shake(8, 12);
        flash('#ff4400', 0.25);
        let bx = b.x + b.w/2, by = b.y + b.h/2, radius = 80;
        for (let ob of bricks) {
            if (!ob.alive || ob === b) continue;
            let dx = (ob.x + ob.w/2) - bx, dy = (ob.y + ob.h/2) - by;
            if (Math.sqrt(dx*dx + dy*dy) < radius) {
                ob.hp = 0; ob.alive = false;
                if (ob.special !== 'steel') bricksRemaining--;
                score += 10 * multiplier;
                totalBricksDestroyed++;
                spawnParticles(ob.x + ob.w/2, ob.y + ob.h/2, ob.color, 8, {speed: 2, speedMax: 5});
                maybeSpawnPowerup(ob.x + ob.w/2, ob.y + ob.h/2);
            }
        }
    }

    // --- Collision ---
    function ballBrickCollision(ball, b) {
        let cx = clamp(ball.x, b.x, b.x + b.w);
        let cy = clamp(ball.y, b.y, b.y + b.h);
        let dx = ball.x - cx, dy = ball.y - cy;
        return (dx*dx + dy*dy) < (ball.r * ball.r);
    }
    
    function resolveCollision(ball, b) {
        let cx = clamp(ball.x, b.x, b.x + b.w);
        let cy = clamp(ball.y, b.y, b.y + b.h);
        let dx = ball.x - cx;
        let dy = ball.y - cy;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist === 0) { // Center inside brick fallback
            ball.dy = -Math.abs(ball.dy);
            return;
        }
        
        let nx = dx / dist;
        let ny = dy / dist;
        let dot = ball.dx * nx + ball.dy * ny;
        
        // Only reflect if moving towards the brick
        if (dot < 0) {
            ball.dx -= 2 * dot * nx;
            ball.dy -= 2 * dot * ny;
        }
    }

    // --- Fire Laser ---
    function fireLaser() {
        if (laserCharges <= 0 || over || !started) return;
        laserCharges--;
        sndLaser();
        let lx = padX + padW/2;
        lasers.push({x: lx, y: padY, w: 4, h: padY, life: 1});
        // Match hitbox to visual width
        for (let b of bricks) {
            if (!b.alive) continue;
            if (b.special === 'steel') { b.flash = 1; continue; }
            if (b.x < lx + 6 && b.x + b.w > lx - 6) {
                b.hp--;
                b.flash = 1;
                if (b.hp <= 0) {
                    b.alive = false; bricksRemaining--;
                    if (b.special === 'bomb') explodeBomb(b);
                    else {
                        spawnParticles(b.x + b.w/2, b.y + b.h/2, b.color, 10);
                        score += 5 * multiplier; totalBricksDestroyed++;
                        maybeSpawnPowerup(b.x + b.w/2, b.y + b.h/2);
                    }
                }
            }
        }
    }

    // --- Update ---
    function update() {
        T++;
        if (over) { updateParticlesOnly(); draw(); return; }

        if (levelTransition > 0) { levelTransition--; updateParticlesOnly(); draw(); return; }

        if (comboTimer > 0) { comboTimer--; if (comboTimer <= 0) combo = 0; }
        if (fireballTimer > 0) { fireballTimer--; if (fireballTimer <= 0) { fireball = false; for (let b of balls) b.fireball = false; } }
        if (magnetTimer > 0) { magnetTimer--; if (magnetTimer <= 0) magnet = false; }
        if (multiTimer > 0) { multiTimer--; if (multiTimer <= 0) multiplier = 1; }
        if (flashAlpha > 0) flashAlpha -= 0.02;

        padX = lerp(padX, padTargetX, 0.22);
        padX = clamp(padX, 0, W - padW);

        if (shakeDur > 0) {
            shakeDur--;
            let f = shakeDur / 12;
            shakeX = (Math.random()-0.5) * shakeStr * f;
            shakeY = (Math.random()-0.5) * shakeStr * f;
        } else { shakeX = 0; shakeY = 0; }

        if (!started) {
            if (balls.length > 0) {
                balls[0].x = padX + padW/2;
                balls[0].y = padY - balls[0].r - 1;
            }
            updateParticlesOnly(); draw(); return;
        }

        let aliveBalls = [];
        for (let ball of balls) {
            if (magnet && ball.dy > 0 && ball.y + ball.r >= padY - 5 &&
                ball.x >= padX - 5 && ball.x <= padX + padW + 5) {
                ball.dx = 0; ball.dy = 0;
                ball.y = padY - ball.r - 1;
                ball.stuck = true;
            }

            if (ball.stuck) {
                ball.x = padX + padW/2;
                ball.y = padY - ball.r - 1;
                aliveBalls.push(ball);
                continue;
            }

            ball.x += ball.dx; ball.y += ball.dy;
            trails.push({x: ball.x, y: ball.y, r: ball.r, life: 1, fireball: ball.fireball});

            if (ball.x - ball.r < 0)  { ball.x = ball.r; ball.dx = Math.abs(ball.dx); sndWall(); spawnSparkle(0, ball.y, 3); }
            if (ball.x + ball.r > W)  { ball.x = W - ball.r; ball.dx = -Math.abs(ball.dx); sndWall(); spawnSparkle(W, ball.y, 3); }
            if (ball.y - ball.r < 0)  { ball.y = ball.r; ball.dy = Math.abs(ball.dy); sndWall(); spawnSparkle(ball.x, 0, 3); }

            if (ball.y - ball.r > H) {
                if (shieldHP > 0) {
                    shieldHP--; sndShield();
                    ball.dy = -Math.abs(ball.dy || baseSpeed);
                    ball.y = H - 5;
                    spawnSparkle(ball.x, H, 10);
                    shake(3, 5);
                    flash('#44ffff', 0.15);
                    aliveBalls.push(ball);
                    continue;
                }
                spawnSparkle(ball.x, H, 10);
                continue; // Ball dies
            }

            // Paddle
            if (ball.dy > 0 && ball.y + ball.r >= padY && ball.y + ball.r <= padY + padH + 8 &&
                ball.x >= padX - 6 && ball.x <= padX + padW + 6) {
                let hitPos = clamp((ball.x - padX) / padW, 0, 1);
                let angle = lerp(-2.6, -0.5, hitPos);
                let sp = Math.sqrt(ball.dx*ball.dx + ball.dy*ball.dy);
                sp = clamp(sp, baseSpeed, baseSpeed * 1.6);
                ball.dx = Math.cos(angle) * sp;
                ball.dy = Math.sin(angle) * sp;
                ball.y = padY - ball.r;
                ball.stuck = false;
                sndHit();
                spawnSparkle(ball.x, padY, 5);
            }

            // Bricks
            for (let b of bricks) {
                if (!b.alive || b.enterProgress < 0.8) continue;
                if (ballBrickCollision(ball, b)) {
                    if (b.special === 'steel') {
                        b.flash = 1; b.shakeX = 3;
                        sndWall();
                        resolveCollision(ball, b);
                        spawnSparkle(ball.x, ball.y, 4);
                        if (!ball.fireball) break;
                        continue;
                    }

                    if (b.special === 'bomb') {
                        b.alive = false; bricksRemaining--;
                        explodeBomb(b);
                        score += 15 * multiplier; totalBricksDestroyed++;
                        gScore('Score: ' + score);
                        if (!ball.fireball) resolveCollision(ball, b);
                        if (!ball.fireball) break;
                        continue;
                    }

                    b.hp--;
                    b.flash = 1; b.shakeX = 2;
                    sndBrick(bricks.indexOf(b) % 5, b.hp);

                    if (b.hp <= 0) {
                        b.alive = false; bricksRemaining--;
                        combo++; comboTimer = 100;
                        if (combo > maxCombo) maxCombo = combo;
                        let pts = 10 * Math.min(combo, 15) * multiplier;
                        score += pts; totalBricksDestroyed++;
                        gScore('Score: ' + score);
                        spawnParticles(b.x + b.w/2, b.y + b.h/2, b.color, 14 + combo * 2, {speed: 1.5, speedMax: 5 + combo * 0.3});
                        if (combo > 1) {
                            addFloatText(b.x+b.w/2, b.y, 'x' + Math.min(combo,15) + ' +' + pts, '#ffee44', 12 + Math.min(combo, 10));
                        } else addFloatText(b.x+b.w/2, b.y, '+' + pts, '#fff', 12);
                        maybeSpawnPowerup(b.x + b.w/2, b.y + b.h/2);
                        shake(2 + Math.min(combo, 8) * 0.5, 3 + Math.min(combo, 8));
                        if (combo >= 5) flash('#ffee44', 0.08 + Math.min(combo, 10) * 0.01);
                    } else {
                        spawnParticles(b.x+b.w/2, b.y+b.h/2, b.color, 4, {speed:1, speedMax:2, size:1, sizeMax:2});
                        shake(1.5, 2);
                    }

                    if (!ball.fireball) {
                        resolveCollision(ball, b);
                        break;
                    }
                }
            }
            aliveBalls.push(ball);
        }
        balls = aliveBalls;

        if (balls.length === 0) {
            lives--; combo = 0;
            if (lives <= 0) {
                over = true; overStartT = T; sndLose();
                gScore('Game Over — ' + score);
                setHS('breaker', score, false); gHigh('breaker');
            } else {
                sndLose();
                balls = [{x: padX+padW/2, y: padY-8, r:6, dx:0, dy:0, fireball: fireball, stuck: false}];
                started = false;
                addFloatText(W/2, H/2, lives + ' lives left', '#ff6688', 16);
                flash('#ff2244', 0.2);
            }
        }

        let alivePU = [];
        for (let pu of powerups) {
            pu.y += pu.vy;
            pu.wobble += 0.08;
            let px = pu.x + Math.sin(pu.wobble) * 3;
            if (pu.y + pu.size > padY && pu.y < padY + padH + 10 && px > padX - 5 && px < padX + padW + 5) {
                applyPowerup(pu);
            } else if (pu.y < H + 20) {
                alivePU.push(pu);
            }
        }
        powerups = alivePU;

        for (let l of lasers) l.life -= 0.08;
        lasers = lasers.filter(l => l.life > 0);

        for (let b of bricks) {
            if (b.enterProgress < 1) b.enterProgress = Math.min(1, b.enterProgress + 0.035);
            if (b.flash > 0) b.flash -= 0.06;
            if (Math.abs(b.shakeX) > 0.1) b.shakeX *= 0.85; else b.shakeX = 0;
        }

        updateParticlesOnly();

        if (bricksRemaining <= 0 && bricksTotal > 0) {
            if (level >= maxLevel) {
                over = true; won = true; overStartT = T; sndWin();
                gScore('You Win! — ' + score);
                setHS('breaker', score, false); gHigh('breaker');
                flash('#44ffaa', 0.3);
            } else {
                level++;
                sndWin();
                flash('#44ffaa', 0.2);
                initLevel();
            }
        }

        draw();
    }

    function updateParticlesOnly() {
        for (let p of particles) { p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.life -= p.decay; p.vx *= 0.99; }
        particles = particles.filter(p => p.life > 0);
        for (let t of trails) t.life -= 0.1;
        trails = trails.filter(t => t.life > 0);
        for (let f of floatTexts) { f.y += f.vy; f.life -= 0.016; f.scale = Math.min(1, f.scale + 0.12); }
        floatTexts = floatTexts.filter(f => f.life > 0);
    }

    // --- Draw ---
    function draw() {
        ctx.save();
        ctx.translate(shakeX, shakeY);

        let bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, `hsl(${bgHue}, 15%, 6%)`);
        bgGrad.addColorStop(1, `hsl(${bgHue + 30}, 20%, 3%)`);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(-10, -10, W+20, H+20);

        for (let s of stars) {
            s.twinkle += s.twinkleSpeed;
            s.y += s.speed;
            if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
            let alpha = 0.2 + Math.sin(s.twinkle) * 0.2;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
        }

        ctx.strokeStyle = 'rgba(255,255,255,0.015)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

        if (shieldHP > 0) {
            let shieldAlpha = 0.15 + Math.sin(T * 0.05) * 0.08;
            let shieldGrad = ctx.createLinearGradient(0, H - 6, 0, H);
            shieldGrad.addColorStop(0, `rgba(68,255,255,${shieldAlpha})`);
            shieldGrad.addColorStop(1, `rgba(68,255,255,${shieldAlpha * 2})`);
            ctx.fillStyle = shieldGrad;
            ctx.fillRect(0, H - 6, W, 6);
            for (let i = 0; i < shieldHP; i++) {
                ctx.fillStyle = `rgba(68,255,255,${0.5 + Math.sin(T*0.08+i)*0.3})`;
                ctx.beginPath(); ctx.arc(W/(shieldMaxHP+1)*(i+1), H-3, 3, 0, Math.PI*2); ctx.fill();
            }
        }

        for (let b of bricks) {
            if (!b.alive) continue;
            let ep = b.enterProgress;
            if (ep <= 0) continue;
            ctx.save();
            let bx = b.x + b.shakeX;
            let by = b.y - (1 - ep) * 30;
            ctx.globalAlpha = ep;
            let scale = 0.8 + ep * 0.2;
            ctx.translate(bx + b.w/2, by + b.h/2);
            ctx.scale(scale, scale);
            ctx.translate(-(bx + b.w/2), -(by + b.h/2));

            let rgb = hexToRgb(b.color);
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`;
            rr(bx+2, by+2, b.w, b.h, 4); ctx.fill();
            
            let fl = Math.max(0, b.flash);
            let r2 = Math.min(255, rgb.r + fl * 200);
            let g2 = Math.min(255, rgb.g + fl * 200);
            let b2 = Math.min(255, rgb.b + fl * 200);
            let grad = ctx.createLinearGradient(bx, by, bx, by + b.h);
            grad.addColorStop(0, `rgba(${r2|0},${g2|0},${b2|0},1)`);
            grad.addColorStop(1, `rgba(${(r2*0.55)|0},${(g2*0.55)|0},${(b2*0.55)|0},1)`);
            ctx.fillStyle = grad;
            rr(bx, by, b.w, b.h, 4); ctx.fill();
            
            ctx.fillStyle = `rgba(255,255,255,${0.12 + fl * 0.3})`;
            rr(bx+2, by+1, b.w-4, b.h*0.4, 3); ctx.fill();
            
            if (b.special === 'steel') {
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 1;
                for (let sx = bx + 6; sx < bx + b.w - 4; sx += 8) {
                    ctx.beginPath(); ctx.moveTo(sx, by+2); ctx.lineTo(sx, by+b.h-2); ctx.stroke();
                }
            }
            
            // Better Bomb Drawing (instead of emoji)
            if (b.special === 'bomb') {
                ctx.fillStyle = '#111';
                ctx.beginPath(); ctx.arc(bx + b.w/2, by + b.h/2 + 1, b.h/3.5, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = '#aaa';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(bx + b.w/2, by + b.h/2 - 2); ctx.quadraticCurveTo(bx + b.w/2 + 5, by + b.h/2 - 6, bx + b.w/2 + 3, by + b.h/2 - 8); ctx.stroke();
                ctx.fillStyle = '#ffaa00';
                ctx.beginPath(); ctx.arc(bx + b.w/2 + 3, by + b.h/2 - 8, 2, 0, Math.PI*2); ctx.fill();
            }
            
            if (b.maxHp > 1 && b.special !== 'bomb') {
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.font = `bold ${b.hp > 9 ? 8 : 10}px Inter,sans-serif`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(b.hp, bx + b.w/2, by + b.h/2);
            }
            
            if (b.special === 'tough') {
                ctx.strokeStyle = `rgba(255,200,0,${0.3 + Math.sin(T*0.06)*0.15})`;
                ctx.lineWidth = 2;
                rr(bx-1, by-1, b.w+2, b.h+2, 5); ctx.stroke();
            }
            ctx.restore();
        }

        // Powerups (No shadowBlur, custom glow instead)
        for (let pu of powerups) {
            let px = pu.x + Math.sin(pu.wobble) * 3;
            let rgb = hexToRgb(pu.color);
            ctx.save();
            
            let glowGrad = ctx.createRadialGradient(px, pu.y, pu.size * 0.5, px, pu.y, pu.size * 2.5);
            glowGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`);
            glowGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            ctx.fillStyle = glowGrad;
            ctx.beginPath(); ctx.arc(px, pu.y, pu.size * 2.5, 0, Math.PI*2); ctx.fill();
            
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`;
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(px, pu.y, pu.size + 2, 0, Math.PI*2); ctx.stroke();
            
            ctx.fillStyle = pu.color;
            ctx.beginPath(); ctx.arc(px, pu.y, pu.size, 0, Math.PI*2); ctx.fill();
            
            ctx.fillStyle = '#000';
            ctx.font = 'bold 11px Inter,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(pu.label, px, pu.y);
            ctx.restore();
        }

        for (let l of lasers) {
            ctx.save();
            ctx.globalAlpha = l.life;
            let lgr = ctx.createLinearGradient(l.x - 8, 0, l.x + 8, 0);
            lgr.addColorStop(0, 'rgba(255,255,68,0)');
            lgr.addColorStop(0.3, 'rgba(255,255,68,0.6)');
            lgr.addColorStop(0.5, 'rgba(255,255,200,1)');
            lgr.addColorStop(0.7, 'rgba(255,255,68,0.6)');
            lgr.addColorStop(1, 'rgba(255,255,68,0)');
            ctx.fillStyle = lgr;
            ctx.fillRect(l.x - 8, 0, 16, l.h);
            ctx.restore();
        }

        for (let t of trails) {
            if (t.fireball) {
                let hue = 20 + Math.random() * 30;
                ctx.fillStyle = `hsla(${hue},100%,55%,${t.life * 0.35})`;
            } else {
                let ac = hexToRgb(cssVar('--accent', '#ffffff'));
                ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},${t.life * 0.2})`;
            }
            ctx.beginPath(); ctx.arc(t.x, t.y, t.r * t.life * 0.8, 0, Math.PI*2); ctx.fill();
        }

        let accentColor = cssVar('--accent', '#ffffff');
        let accentRgb = hexToRgb(accentColor);
        
        for (let ball of balls) {
            ctx.save();
            if (ball.fireball) {
                let fbGrad = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.r * 2);
                fbGrad.addColorStop(0, 'rgba(255,255,136,0.6)');
                fbGrad.addColorStop(0.4, 'rgba(255,136,0,0.4)');
                fbGrad.addColorStop(1, 'rgba(255,68,0,0)');
                ctx.fillStyle = fbGrad;
                ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r * 2, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#fff';
            } else {
                let ballGlow = ctx.createRadialGradient(ball.x, ball.y, ball.r * 0.5, ball.x, ball.y, ball.r * 2);
                ballGlow.addColorStop(0, `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.3)`);
                ballGlow.addColorStop(1, `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0)`);
                ctx.fillStyle = ballGlow;
                ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r * 2, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = accentColor;
            }
            ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath(); ctx.arc(ball.x - 1.5, ball.y - 1.5, ball.r * 0.35, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        }

        ctx.save();
        // Paddle Glow
        let padGlow = ctx.createRadialGradient(padX + padW/2, padY + padH/2, padW * 0.25, padX + padW/2, padY + padH/2, padW * 0.8);
        padGlow.addColorStop(0, `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15)`);
        padGlow.addColorStop(1, `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0)`);
        ctx.fillStyle = padGlow;
        ctx.fillRect(padX - padW*0.3, padY - padH, padW*1.6, padH*4);

        let padGrad = ctx.createLinearGradient(padX, padY, padX, padY + padH);
        padGrad.addColorStop(0, accentColor);
        padGrad.addColorStop(1, `rgba(${(accentRgb.r*0.45)|0},${(accentRgb.g*0.45)|0},${(accentRgb.b*0.45)|0},1)`);
        ctx.fillStyle = padGrad;
        rr(padX, padY, padW, padH, 6); ctx.fill();
        
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        rr(padX+4, padY+1, padW-8, padH*0.45, 4); ctx.fill();
        
        if (laserCharges > 0) {
            ctx.fillStyle = 'rgba(255,255,68,0.7)';
            ctx.font = 'bold 8px Inter,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText('L' + laserCharges, padX + padW/2, padY + padH/2);
        }
        if (magnet) {
            ctx.strokeStyle = `rgba(255,68,255,${0.3 + Math.sin(T*0.1)*0.15})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.arc(padX + padW/2, padY - 20, padW/2 + 10, Math.PI, 0); ctx.stroke();
            ctx.setLineDash([]);
        }
        ctx.restore();

        for (let p of particles) {
            ctx.globalAlpha = clamp(p.life, 0, 1);
            if (p.shape === 'flash') {
                let fg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.life);
                fg.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.life * 0.6})`);
                fg.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
                ctx.fillStyle = fg;
                ctx.fillRect(p.x - p.size, p.y - p.size, p.size*2, p.size*2);
            } else if (p.shape === 'diamond') {
                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life})`;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.PI/4);
                let s = p.size * p.life;
                ctx.fillRect(-s/2, -s/2, s, s);
                ctx.restore();
            } else {
                ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI*2); ctx.fill();
            }
        }
        ctx.globalAlpha = 1;

        for (let f of floatTexts) {
            ctx.globalAlpha = clamp(f.life, 0, 1);
            ctx.font = `bold ${f.size * f.scale|0}px Inter,sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            // Text outline for readability
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeText(f.text, f.x, f.y);
            ctx.fillStyle = f.color;
            ctx.fillText(f.text, f.x, f.y);
        }
        ctx.globalAlpha = 1;

        if (flashAlpha > 0.001) {
            let fc = hexToRgb(flashColor);
            ctx.fillStyle = `rgba(${fc.r},${fc.g},${fc.b},${flashAlpha})`;
            ctx.fillRect(-10, -10, W+20, H+20);
        }

        // === HUD ===
        for (let i = 0; i < lives; i++) {
            ctx.fillStyle = '#ff4488';
            let hx = 14 + i * 20, hy = 15;
            ctx.beginPath(); ctx.arc(hx, hy, 5, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath(); ctx.arc(hx - 1, hy - 1.5, 2, 0, Math.PI*2); ctx.fill();
        }

        ctx.fillStyle = cssVar('--text-muted', '#555');
        ctx.font = '10px Inter,sans-serif';
        ctx.textAlign = 'right'; ctx.textBaseline = 'top';
        ctx.fillText('LVL ' + level + '/' + maxLevel, W - 12, 8);
        ctx.fillText(bricksRemaining + ' left', W - 12, 22);

        let prog = bricksTotal > 0 ? 1 - bricksRemaining / bricksTotal : 0;
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        rr(12, 28, W - 24, 3, 2); ctx.fill();
        if (prog > 0) {
            let progGrad = ctx.createLinearGradient(12, 0, 12 + (W-24)*prog, 0);
            progGrad.addColorStop(0, '#44ffaa');
            progGrad.addColorStop(1, '#44aaff');
            ctx.fillStyle = progGrad;
            rr(12, 28, (W-24)*prog, 3, 2); ctx.fill();
        }

        if (combo > 1 && comboTimer > 0) {
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            let ca = Math.min(1, comboTimer / 30);
            let cs = 14 + Math.min(combo, 15) * 0.8;
            ctx.font = `bold ${cs|0}px Inter,sans-serif`;
            ctx.fillStyle = `rgba(255,238,68,${ca})`;
            ctx.fillText('COMBO x' + Math.min(combo, 15), W/2, 36);
        }

        let timerY = H - 12;
        ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
        ctx.font = '9px Inter,sans-serif';
        if (fireballTimer > 0) { ctx.fillStyle = '#ff6600'; ctx.fillText('FIRE ' + (fireballTimer/60|0) + 's', 12, timerY); timerY -= 12; }
        if (magnetTimer > 0) { ctx.fillStyle = '#ff44ff'; ctx.fillText('MAGNET ' + (magnetTimer/60|0) + 's', 12, timerY); timerY -= 12; }
        if (multiTimer > 0) { ctx.fillStyle = '#88aaff'; ctx.fillText('x2 SCORE ' + (multiTimer/60|0) + 's', 12, timerY); timerY -= 12; }
        if (shieldHP > 0) { ctx.fillStyle = '#44ffff'; ctx.fillText('SHIELD x' + shieldHP, 12, timerY); }

        if (!started && !over && levelTransition <= 0) {
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            let pulse = 0.4 + Math.sin(T * 0.06) * 0.6;
            ctx.globalAlpha = pulse;
            ctx.fillStyle = cssVar('--text-muted', '#888');
            ctx.font = '14px Inter,sans-serif';
            ctx.fillText('Tap to launch', W/2, H/2);
            ctx.font = '10px Inter,sans-serif';
            ctx.fillText(magnet ? '(tap to release magnet)' : '', W/2, H/2 + 20);
            ctx.globalAlpha = 1;
        }

        if (levelTransition > 0) {
            let tp = levelTransition / 90;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.globalAlpha = tp > 0.5 ? (1 - tp) * 2 : tp * 2;
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${28 + (1-tp)*10|0}px Inter,sans-serif`;
            ctx.fillText(transitionText, W/2, H/2);
            if (level > 1) {
                ctx.font = '12px Inter,sans-serif';
                ctx.fillStyle = cssVar('--text-muted', '#888');
                ctx.fillText('Get ready...', W/2, H/2 + 30);
            }
            ctx.globalAlpha = 1;
        }

        if (over) {
            let oa = Math.min(1, (T - overStartT) / 30);
            ctx.globalAlpha = oa;
            ctx.fillStyle = 'rgba(0,0,0,0.65)';
            ctx.fillRect(-10, -10, W+20, H+20);

            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = won ? '#44ffaa' : '#ff4466';
            ctx.font = 'bold 24px Inter,sans-serif';
            ctx.fillText(won ? 'YOU WIN!' : 'GAME OVER', W/2, H/2 - 50);

            ctx.fillStyle = '#fff';
            ctx.font = '18px Inter,sans-serif';
            ctx.fillText(score, W/2, H/2 - 15);
            ctx.font = '11px Inter,sans-serif';
            ctx.fillStyle = cssVar('--text-muted', '#888');
            ctx.fillText('points', W/2, H/2 + 3);

            ctx.font = '11px Inter,sans-serif';
            ctx.fillStyle = '#aaa';
            ctx.fillText('Level ' + level + '  •  Max Combo x' + maxCombo + '  •  ' + totalBricksDestroyed + ' bricks', W/2, H/2 + 30);

            ctx.globalAlpha = 0.4 + Math.sin(T * 0.06) * 0.4;
            ctx.fillStyle = '#fff';
            ctx.font = '13px Inter,sans-serif';
            ctx.fillText('Tap to restart', W/2, H/2 + 65);
            ctx.globalAlpha = 1;
        }

        ctx.restore();
    }

    // --- Input ---
    function launch() {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        if (over) { restartGame(); return; }
        if (levelTransition > 0) return;

        let stuckBalls = balls.filter(b => b.stuck);
        if (stuckBalls.length > 0) {
            for (let b of stuckBalls) {
                let angle = -Math.PI/2 + (Math.random() - 0.5) * 0.6;
                b.dx = Math.cos(angle) * baseSpeed;
                b.dy = Math.sin(angle) * baseSpeed;
                b.stuck = false;
            }
            sndHit();
            spawnSparkle(padX + padW/2, padY, 8);
            return;
        }

        if (!started && balls.length > 0) {
            started = true;
            let angle = -Math.PI/2 + (Math.random() - 0.5) * 0.7;
            balls[0].dx = Math.cos(angle) * baseSpeed;
            balls[0].dy = Math.sin(angle) * baseSpeed;
        }
    }
    
    function movePad(e) {
        let rect = c.getBoundingClientRect();
        let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        padTargetX = clamp(x - padW/2, 0, W - padW);
    }

    function onKey(e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); launch(); }
        if (e.key === 'x' || e.key === 'X') { e.preventDefault(); fireLaser(); }
        if (e.key === 'ArrowLeft' || e.key === 'a') padTargetX = clamp(padTargetX - 20, 0, W - padW);
        if (e.key === 'ArrowRight' || e.key === 'd') padTargetX = clamp(padTargetX + 20, 0, W - padW);
    }

    // Fix: Properly named functions to ensure event listeners are successfully removed on clean
    const onClickFn = e => launch();
    const onTouchStartFn = e => { e.preventDefault(); launch(); };
    const onMouseMoveFn = e => movePad(e);
    const onTouchMoveFn = e => { e.preventDefault(); movePad(e); };
    const onKeyDownFn = e => onKey(e);

    c.addEventListener('click', onClickFn);
    c.addEventListener('touchstart', onTouchStartFn, {passive: false});
    c.addEventListener('mousemove', onMouseMoveFn);
    c.addEventListener('touchmove', onTouchMoveFn, {passive: false});
    document.addEventListener('keydown', onKeyDownFn);

    addClean(() => {
        c.removeEventListener('click', onClickFn);
        c.removeEventListener('touchstart', onTouchStartFn);
        c.removeEventListener('mousemove', onMouseMoveFn);
        c.removeEventListener('touchmove', onTouchMoveFn);
        document.removeEventListener('keydown', onKeyDownFn);
    });

    function restartGame() {
        score = 0; lives = 3; level = 1; combo = 0; maxCombo = 0; totalBricksDestroyed = 0;
        overStartT = 0;
        gScore('Score: 0');
        initLevel();
    }

    // --- Game Loop ---
    let lastTime = 0, accumulator = 0;
    const STEP = 1000 / 60;
    function loop(time) {
        if (!lastTime) lastTime = time;
        let dt = Math.min(time - lastTime, 100);
        lastTime = time;
        accumulator += dt;
        while (accumulator >= STEP) { update(); accumulator -= STEP; }
        raf = requestAnimationFrame(loop);
    }
    let raf = requestAnimationFrame(loop);
    addClean(() => cancelAnimationFrame(raf));

    // --- Init ---
    initLevel();
    showControls(`
        <div style="display:flex;gap:4px;align-items:center;justify-content:center;flex-wrap:wrap;">
            <button class="game-tap-btn" id="launchBtn">LAUNCH</button>
            <button class="game-tap-btn" id="laserBtn" style="background:rgba(255,255,68,0.15);color:#ffff44;border-color:rgba(255,255,68,0.3);">LASER (X)</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px 8px;margin-top:6px;font-size:9px;text-align:center;">
            <span style="color:#44ff88">W Wide</span>
            <span style="color:#44aaff">M Multi</span>
            <span style="color:#ffaa44">S Slow</span>
            <span style="color:#ff4488">+ Life</span>
            <span style="color:#ff6600">F Fire</span>
            <span style="color:#44ffff">O Shield</span>
            <span style="color:#ff44ff">N Magnet</span>
            <span style="color:#ffff44">L Laser</span>
            <span style="color:#88aaff">2 x2 Score</span>
        </div>
    `);
    gid('launchBtn').onclick = launch;
    gid('laserBtn').onclick = () => fireLaser();
};

// ===== CONNECT 4 =====
gameInits.connect4 = function() {
    let a = gid('gameArea');
    a.innerHTML = '<div class="c4-wrapper"><div class="c4-grid" id="c4Grid"></div><div class="c4-status" id="c4Status">Your turn</div></div>';
    
    let grid = gid('c4Grid');
    let board = Array(42).fill(0);
    let turn = 1;
    let over = false;
    let status = gid('c4Status');
    
    // Build grid
    for (let i = 0; i < 42; i++) {
        let cell = document.createElement('div');
        cell.className = 'c4-cell';
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    let cells = grid.querySelectorAll('.c4-cell');
    
    function updateStatus() {
        if (over) return;
        let color = turn === 1 ? '#ff4444' : '#ffaa00';
        let name = turn === 1 ? 'Your' : 'AI\'s';
        status.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:6px;vertical-align:middle;box-shadow:0 0 6px ${color}66;"></span><span style="color:${color}">${name} turn</span>`;
    }
    updateStatus();
    
    function checkWin(b, p) {
        // Horizontal
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                let i = r * 7 + c;
                if (b[i] === p && b[i+1] === p && b[i+2] === p && b[i+3] === p) return [i, i+1, i+2, i+3];
            }
        }
        // Vertical
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 7; c++) {
                let i = r * 7 + c;
                if (b[i] === p && b[i+7] === p && b[i+14] === p && b[i+21] === p) return [i, i+7, i+14, i+21];
            }
        }
        // Diagonal /
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 4; c++) {
                let i = r * 7 + c;
                if (b[i] === p && b[i+8] === p && b[i+16] === p && b[i+24] === p) return [i, i+8, i+16, i+24];
            }
        }
        // Diagonal \
        for (let r = 0; r < 3; r++) {
            for (let c = 3; c < 7; c++) {
                let i = r * 7 + c;
                if (b[i] === p && b[i+6] === p && b[i+12] === p && b[i+18] === p) return [i, i+6, i+12, i+18];
            }
        }
        return null;
    }
    
    function isFull(b) {
        return b.every(c => c !== 0);
    }
    
    function getLowestEmpty(col) {
        for (let row = 5; row >= 0; row--) {
            let i = row * 7 + col;
            if (board[i] === 0) return i;
        }
        return -1;
    }
    
    function placePiece(index, player, isNew) {
        board[index] = player;
        let cell = cells[index];
        cell.classList.add(player === 1 ? 'p1' : 'p2');
        if (isNew) {
            cell.classList.add('new-drop');
            setTimeout(() => cell.classList.remove('new-drop'), 400);
        }
    }
    
    function highlightWin(winCells) {
        winCells.forEach(i => cells[i].classList.add('win'));
    }
    
    function endGame(winner) {
        over = true;
        if (winner === 0) {
            status.innerHTML = '<span style="color:var(--text-muted)">Draw!</span>';
        } else if (winner === 1) {
            status.innerHTML = '<span style="color:#ff4444">You Win!</span>';
            setHS('connect4', getHS('connect4') + 1, false);
        } else {
            status.innerHTML = '<span style="color:#ffaa00">AI Wins!</span>';
        }
        gHigh('connect4');
    }
    
    function aiMove() {
        if (over) return;
        
        let bestCol = -1, bestScore = -9999;
        
        for (let col = 0; col < 7; col++) {
            let i = getLowestEmpty(col);
            if (i === -1) continue;
            
            let score = 0;
            let newB = [...board];
            newB[i] = 2;
            
            if (checkWin(newB, 2)) { score = 1000; }
            else {
                let blockB = [...board];
                blockB[i] = 1;
                if (checkWin(blockB, 1)) score = 500;
                
                score += [0, 1, 3, 5, 3, 1, 0][col];
                score += Math.random() * 15;
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestCol = col;
            }
        }
        
        if (bestCol === -1) return;
        
        let i = getLowestEmpty(bestCol);
        placePiece(i, 2, true);
        
        let win = checkWin(board, 2);
        if (win) {
            highlightWin(win);
            endGame(2);
            return;
        }
        if (isFull(board)) {
            endGame(0);
            return;
        }
        turn = 1;
        updateStatus();
    }
    
    cells.forEach((cell, idx) => {
        cell.addEventListener('click', () => {
            if (over || turn !== 1) return;
            
            let col = idx % 7;
            let i = getLowestEmpty(col);
            if (i === -1) return;
            
            placePiece(i, 1, true);
            
            let win = checkWin(board, 1);
            if (win) {
                highlightWin(win);
                endGame(1);
                return;
            }
            if (isFull(board)) {
                endGame(0);
                return;
            }
            
            turn = 2;
            updateStatus();
            setTimeout(aiMove, 400);
        });
    });
    
    gScore('');
    gHigh('connect4');
};





// ===== RED BALL =====
gameInits.bounce = function() {
    let a = gid('gameArea');
    a.innerHTML = '<canvas class="game-canvas" id="bncCanvas"></canvas>';
    let c = gid('bncCanvas'), ctx = c.getContext('2d');
    c.width = a.clientWidth; c.height = a.clientHeight;
    let W = c.width, H = c.height;

    const GY = H - 50;
    const GRAV = 0.5, JFORCE = -11.2, MAXSPD = 6.5;
    const GACCEL = 0.55, AACCEL = 0.4, FRIC = 0.84;
    const COYOTE = 6, JBUF = 8;
    const LEND = 5400;

    let ball = { x: 100, y: GY - 18, r: 18, vx: 0, vy: 0, rot: 0, onG: false, sqX: 1, sqY: 1, dead: false, dt: 0, prevY: GY - 18, inv: 0, jumpHeld: false };
    let cam = { x: 0, shake: 0 };
    let starsC = 0, starsT = 0, lives = 3;
    let gnds = [], plats = [], ens = [], sts = [], cps = [], pts = [], clouds = [], trail = [];
    let flagX = 0, gameOver = false, won = false, started = false, tick = 0, frame;
    let keys = { l: false, r: false, j: false }, jPress = false, tBounce = 0;
    let coyoteF = 0, jBufF = 999, cpFlash = 0;

    function addG(x, y, w) { gnds.push({ x, y, w, h: 80 }); }
    function addP(x, y, w, opts = {}) { plats.push({ x, y, w, h: 16, moving: !!opts.mv, mAxis: opts.mAxis || 'y', mRange: opts.mRange || 50, mSpd: opts.mSpd || 0.8, mDir: opts.mDir || 1, oY: y, oX: x, _dx: 0, _dy: 0, crumble: !!opts.cr, crTimer: 0, crActive: false, alpha: 1 }); }
    function addE(x, y, mn, mx, fast) { ens.push({ x, y, w: 24, h: 24, sX: mn + 15, eX: mx - 15, dir: 1, spd: fast ? 1.8 + Math.random() * 0.6 : 1 + Math.random() * 0.7, alive: true, sq: 0, ph: Math.random() * 6.28, fast: !!fast }); }
    function addS(x, y) { sts.push({ x, y, got: false, bp: Math.random() * 6.28 }); starsT++; }
    function addCP(x) { cps.push({ x, y: GY, active: false }); }

    function buildLevel() {
        gnds = []; plats = []; ens = []; sts = []; cps = []; pts = []; clouds = []; trail = [];
        starsC = 0; starsT = 0;
        for (let i = 0; i < 20; i++) clouds.push({ x: Math.random() * LEND, y: 25 + Math.random() * 90, w: 55 + Math.random() * 110, h: 20 + Math.random() * 25 });

        // Section 1: Tutorial
        addG(-50, GY, 580);
        addS(160, GY - 65); addS(280, GY - 65); addS(400, GY - 65);

        // Section 2: First enemies
        addG(660, GY, 360);
        addE(740, GY - 24, 675, 985); addE(900, GY - 24, 830, 990);
        addS(780, GY - 70); addS(870, GY - 70); addS(960, GY - 70);
        addCP(1020);

        // Section 3: Platform hopping
        addG(1080, GY, 140);
        addP(1270, GY - 60, 95); addS(1318, GY - 110);
        addP(1420, GY - 115, 95); addS(1468, GY - 165);
        addP(1570, GY - 70, 95); addS(1618, GY - 120);
        addP(1680, GY - 35, 70);

        // Section 4: Moving platforms
        addG(1800, GY, 100);
        addP(1970, GY - 50, 90, { mv: true, mAxis: 'y', mRange: 55, mSpd: 0.9, mDir: 1 }); addS(2015, GY - 110);
        addP(2150, GY - 85, 90, { mv: true, mAxis: 'y', mRange: 45, mSpd: -0.75, mDir: -1 }); addS(2195, GY - 145);
        addP(2320, GY - 50, 80, { mv: true, mAxis: 'x', mRange: 50, mSpd: 0.7, mDir: 1 }); addS(2360, GY - 100);

        // Section 5: Enemy gauntlet
        addG(2460, GY, 440);
        addE(2540, GY - 24, 2475, 2750); addE(2680, GY - 24, 2590, 2830); addE(2810, GY - 24, 2730, 2890);
        addS(2600, GY - 70); addS(2740, GY - 70); addS(2840, GY - 70);
        addCP(2900);

        // Section 6: Staircase
        addG(2970, GY, 100);
        addP(3130, GY - 55, 85); addS(3173, GY - 105);
        addP(3270, GY - 100, 85); addS(3313, GY - 150);
        addP(3410, GY - 60, 85); addS(3453, GY - 110);
        addP(3510, GY - 110, 85); addS(3553, GY - 160);
        addP(3630, GY - 55, 85); addS(3673, GY - 105);

        // Section 7: Crumble platforms
        addG(3750, GY, 80);
        addP(3880, GY - 35, 85, { cr: true }); addS(3923, GY - 90);
        addP(4000, GY - 55, 85, { cr: true }); addS(4043, GY - 110);
        addP(4120, GY - 35, 85, { cr: true }); addS(4163, GY - 90);
        addG(4240, GY, 120);
        addCP(4360);

        // Section 8: Final stretch
        addP(4520, GY - 55, 100, { mv: true, mAxis: 'x', mRange: 60, mSpd: 0.8, mDir: 1 }); addS(4570, GY - 110);
        addG(4660, GY, 620);
        addE(4740, GY - 24, 4675, 4890, true); addE(4900, GY - 24, 4820, 5040); addE(5060, GY - 24, 4990, 5240, true);
        addP(4870, GY - 100, 105); addS(4923, GY - 155);
        addS(4800, GY - 70); addS(5140, GY - 70);

        flagX = 5220;
    }
    buildLevel();
    ball.y = GY - ball.r;

    function spP(x, y, col, n, o = {}) {
        for (let i = 0; i < n; i++) {
            let a = o.a !== undefined ? o.a + (Math.random() - .5) * (o.sp || 1) : Math.random() * 6.28;
            let s = (o.s || 3) * (.5 + Math.random());
            pts.push({ x, y, vx: Math.cos(a) * s + (o.bvx || 0), vy: Math.sin(a) * s + (o.bvy || 0), sz: (o.sz || 2.5) * (.5 + Math.random()), c: col, l: 1, d: o.d || (.02 + Math.random() * .02), sh: o.sh || 'r', g: o.g !== undefined ? o.g : .1, r: Math.random() * 6.28, rs: (Math.random() - .5) * .2 });
        }
    }

    function star5(cx, cy, oR, iR, rot) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
            let r = i % 2 === 0 ? oR : iR, a = rot + i * Math.PI / 5 - Math.PI / 2;
            i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.closePath();
    }

    function drawHeart(x, y, s) {
        ctx.beginPath();
        ctx.moveTo(x, y + s * .3);
        ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * .3);
        ctx.bezierCurveTo(x - s, y + s * .7, x, y + s, x, y + s * 1.2);
        ctx.bezierCurveTo(x, y + s, x + s, y + s * .7, x + s, y + s * .3);
        ctx.bezierCurveTo(x + s, y, x, y, x, y + s * .3);
        ctx.closePath();
    }

    function drawSky() {
        let g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#3D85C6'); g.addColorStop(0.45, '#6DB3F2'); g.addColorStop(0.8, '#A8D8F0'); g.addColorStop(1, '#C8E8C8');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        let sx = W * .82 - cam.x * .02, sy = 65;
        ctx.fillStyle = 'rgba(255,240,120,0.12)'; ctx.beginPath(); ctx.arc(sx, sy, 65, 0, 6.28); ctx.fill();
        ctx.fillStyle = 'rgba(255,240,120,0.25)'; ctx.beginPath(); ctx.arc(sx, sy, 42, 0, 6.28); ctx.fill();
        ctx.fillStyle = '#FFE57F'; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, 6.28); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.arc(sx - 5, sy - 6, 10, 0, 6.28); ctx.fill();
    }

    function drawHills() {
        [.06, '#8FD48F', 55, .0025, H - 130, .13, '#6DBF6D', 42, .004, H - 95, .22, '#52A852', 32, .007, H - 68].reduce((a, v, i) => {
            if (i % 5 === 0) a.push([]);
            a[a.length - 1].push(v); return a;
        }, []).forEach(h => {
            let ox = cam.x * h[0];
            ctx.fillStyle = h[1]; ctx.beginPath(); ctx.moveTo(-5, H);
            for (let x = -5; x <= W + 5; x += 4) { let wx = x + ox; ctx.lineTo(x, h[4] + Math.sin(wx * h[3]) * h[2] + Math.sin(wx * h[3] * 2.7 + 1) * h[2] * .3); }
            ctx.lineTo(W + 5, H); ctx.closePath(); ctx.fill();
        });
    }

    function drawClouds() {
        clouds.forEach(cl => {
            let cx = cl.x - cam.x * .08 + Math.sin(tick * .003 + cl.x * .01) * 8;
            if (cx + cl.w < -60 || cx > W + 60) return;
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            let r = cl.h / 2;
            ctx.beginPath(); ctx.arc(cx + cl.w * .25, cl.y, r, 0, 6.28); ctx.arc(cx + cl.w * .5, cl.y - r * .35, r * 1.25, 0, 6.28); ctx.arc(cx + cl.w * .75, cl.y - r * .05, r * .95, 0, 6.28); ctx.fill();
        });
    }

    function drawGrounds() {
        gnds.forEach(g => {
            if (g.x + g.w < cam.x - 50 || g.x > cam.x + W + 50) return;
            ctx.fillStyle = '#7A5C1E'; ctx.fillRect(g.x, g.y + 10, g.w, g.h - 10);
            ctx.fillStyle = '#5E4414'; ctx.fillRect(g.x, g.y + g.h - 18, g.w, 18);
            let gr = ctx.createLinearGradient(0, g.y, 0, g.y + 14);
            gr.addColorStop(0, '#6ECF6E'); gr.addColorStop(1, '#43A047');
            ctx.fillStyle = gr; ctx.fillRect(g.x, g.y, g.w, 14);
            ctx.fillStyle = '#85E085'; ctx.fillRect(g.x, g.y, g.w, 3);
            ctx.fillStyle = '#6ECF6E';
            for (let gx = g.x + 4; gx < g.x + g.w - 4; gx += 7 + Math.sin(gx * .8) * 2.5) {
                let bh = 4 + Math.sin(gx * .5 + tick * .02) * 1.5;
                ctx.beginPath(); ctx.moveTo(gx, g.y); ctx.lineTo(gx + 1.5, g.y - bh); ctx.lineTo(gx + 3, g.y); ctx.fill();
            }
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            for (let dx = g.x + 8; dx < g.x + g.w - 8; dx += 16) for (let dy = g.y + 22; dy < g.y + g.h - 12; dy += 14) ctx.fillRect(dx + Math.sin(dy) * 3, dy, 3, 2);
        });
    }

    function drawPlats() {
        plats.forEach(p => {
            if (p.x + p.w < cam.x - 50 || p.x > cam.x + W + 50) return;
            if (p.crActive && p.alpha <= 0) return;
            ctx.save();
            if (p.crActive) ctx.globalAlpha = p.alpha;
            if (p.moving) { ctx.shadowColor = 'rgba(100,180,255,0.25)'; ctx.shadowBlur = 10; }
            let bc = p.crumble ? '#A1887F' : '#6D4C2F', tc = p.crumble ? '#BCAAA4' : (p.moving ? '#5DADE2' : '#8B6914'), hc = p.crumble ? '#D7CCC8' : (p.moving ? '#85C1E9' : '#A67C2E');
            ctx.fillStyle = bc; ctx.beginPath(); ctx.roundRect(p.x, p.y + 4, p.w, p.h - 4, 3); ctx.fill();
            let tg = ctx.createLinearGradient(0, p.y, 0, p.y + 7);
            tg.addColorStop(0, hc); tg.addColorStop(1, tc);
            ctx.fillStyle = tg; ctx.beginPath(); ctx.roundRect(p.x, p.y, p.w, 7, [3, 3, 0, 0]); ctx.fill();
            if (!p.moving && !p.crumble) { ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1; for (let lx = p.x + 12; lx < p.x + p.w - 6; lx += 16) { ctx.beginPath(); ctx.moveTo(lx, p.y + 8); ctx.lineTo(lx + 7, p.y + p.h - 2); ctx.stroke(); } }
            if (p.crumble) { ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.strokeRect(p.x + 2, p.y + 2, p.w - 4, p.h - 4); ctx.setLineDash([]); }
            ctx.shadowBlur = 0; ctx.restore();
        });
    }

    function drawCheckpoints() {
        cps.forEach(cp => {
            if (cp.x < cam.x - 80 || cp.x > cam.x + W + 80) return;
            let fx = cp.x, fy = cp.y;
            let act = cp.active;
            let wave = Math.sin(tick * .06 + cp.x * .01) * 5;

            if (act) {
                ctx.fillStyle = 'rgba(229,57,53,0.06)';
                ctx.beginPath(); ctx.arc(fx, fy - 45, 35, 0, 6.28); ctx.fill();
            }

            // Pole
            ctx.fillStyle = act ? '#C62828' : '#9E9E9E';
            ctx.fillRect(fx - 2.5, fy - 85, 5, 85);

            // Pole top
            ctx.fillStyle = act ? '#E53935' : '#BDBDBD';
            ctx.beginPath(); ctx.arc(fx, fy - 85, 5, 0, 6.28); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath(); ctx.arc(fx - 1.5, fy - 87, 2, 0, 6.28); ctx.fill();

            // Flag
            let flagCol = act ? '#E53935' : '#BDBDBD';
            ctx.fillStyle = flagCol;
            ctx.beginPath();
            ctx.moveTo(fx + 3, fy - 82);
            ctx.quadraticCurveTo(fx + 24 + wave, fy - 76, fx + 38, fy - 67);
            ctx.lineTo(fx + 3, fy - 55);
            ctx.closePath();
            ctx.fill();

            if (act) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.beginPath();
                ctx.moveTo(fx + 3, fy - 82);
                ctx.quadraticCurveTo(fx + 14 + wave * .5, fy - 79, fx + 19, fy - 74);
                ctx.lineTo(fx + 3, fy - 69);
                ctx.closePath();
                ctx.fill();
            }

            // Base
            ctx.fillStyle = act ? '#8E2424' : '#757575';
            ctx.beginPath(); ctx.roundRect(fx - 8, fy - 4, 16, 6, 2); ctx.fill();

            // Sparkles when active
            if (act && tick % 35 < 3) {
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.beginPath(); ctx.arc(fx + 8 + Math.random() * 22, fy - 75 + Math.random() * 18, 1.5, 0, 6.28); ctx.fill();
            }

            // "CP" label
            ctx.fillStyle = act ? 'rgba(229,57,53,0.7)' : 'rgba(158,158,158,0.5)';
            ctx.font = 'bold 9px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(act ? '✓' : '▶', fx, fy - 50);
        });
    }

    function drawStars() {
        sts.forEach(s => {
            if (s.got || s.x < cam.x - 40 || s.x > cam.x + W + 40) return;
            let bob = Math.sin(tick * .05 + s.bp) * 4, sy = s.y + bob, rot = tick * .03 + s.bp, pulse = 1 + .08 * Math.sin(tick * .08 + s.bp);
            ctx.fillStyle = 'rgba(255,214,0,0.18)'; ctx.beginPath(); ctx.arc(s.x, sy, 17 * pulse, 0, 6.28); ctx.fill();
            ctx.save(); ctx.translate(s.x, sy); ctx.scale(pulse, pulse);
            let sg = ctx.createRadialGradient(-2, -2, 1, 0, 0, 11);
            sg.addColorStop(0, '#FFF9C4'); sg.addColorStop(0.4, '#FFD600'); sg.addColorStop(1, '#F9A825');
            ctx.fillStyle = sg; star5(0, 0, 11, 5, rot); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.35)'; star5(0, -1, 7, 3, rot); ctx.fill();
            ctx.restore();
            if (tick % 25 < 4) { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(s.x + 6, sy - 6, 1.8, 0, 6.28); ctx.fill(); }
        });
    }

    function drawEns() {
        ens.forEach(e => {
            if (!e.alive) { if (e.sq < 1) { ctx.save(); ctx.translate(e.x + e.w / 2, e.y + e.h); ctx.scale(1 + e.sq * .6, Math.max(.05, 1 - e.sq)); let bg = ctx.createLinearGradient(0, -e.h, 0, 0); bg.addColorStop(0, e.fast ? '#EF9A9A' : '#B0BEC5'); bg.addColorStop(1, e.fast ? '#C62828' : '#546E7A'); ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-e.w / 2, -e.h, e.w, e.h, 3); ctx.fill(); ctx.restore(); e.sq += .04; } return; }
            if (e.x < cam.x - 50 || e.x > cam.x + W + 50) return;
            let bn = Math.abs(Math.sin(tick * (e.fast ? .15 : .1) + e.ph)) * 3;
            ctx.save(); ctx.translate(e.x + e.w / 2, e.y + e.h / 2 - bn);
            ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.beginPath(); ctx.ellipse(0, e.h / 2 + bn, e.w / 2 + 2, 3, 0, 0, 6.28); ctx.fill();
            let bg = ctx.createLinearGradient(0, -e.h / 2, 0, e.h / 2);
            if (e.fast) { bg.addColorStop(0, '#EF9A9A'); bg.addColorStop(.5, '#E53935'); bg.addColorStop(1, '#C62828'); }
            else { bg.addColorStop(0, '#B0BEC5'); bg.addColorStop(.5, '#78909C'); bg.addColorStop(1, '#546E7A'); }
            ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-e.w / 2, -e.h / 2, e.w, e.h, 4); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.13)'; ctx.fillRect(-e.w / 2 + 2, -e.h / 2 + 2, e.w - 4, e.h / 3);
            let ed = e.dir;
            // Angry brows for fast enemies
            if (e.fast) {
                ctx.strokeStyle = '#B71C1C'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(-9 - ed, -10); ctx.lineTo(-3 - ed, -7); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(9 - ed, -10); ctx.lineTo(3 - ed, -7); ctx.stroke();
            } else {
                ctx.strokeStyle = '#37474F'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(-7 - ed, -8); ctx.lineTo(-2 - ed, -5.5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(7 - ed, -8); ctx.lineTo(2 - ed, -5.5); ctx.stroke();
            }
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-4.5, -1.5, 4.2, 0, 6.28); ctx.fill(); ctx.beginPath(); ctx.arc(4.5, -1.5, 4.2, 0, 6.28); ctx.fill();
            ctx.fillStyle = e.fast ? '#B71C1C' : '#1a1a1a';
            ctx.beginPath(); ctx.arc(-3.5 + ed * 1.6, -1, 2.2, 0, 6.28); ctx.fill(); ctx.beginPath(); ctx.arc(5.5 + ed * 1.6, -1, 2.2, 0, 6.28); ctx.fill();
            ctx.strokeStyle = e.fast ? '#B71C1C' : '#37474F'; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
            if (e.fast) { ctx.beginPath(); ctx.moveTo(-5, 8); ctx.lineTo(-3, 5); ctx.lineTo(3, 5); ctx.lineTo(5, 8); ctx.stroke(); }
            else { ctx.beginPath(); ctx.moveTo(-5, 7); ctx.lineTo(-2, 5); ctx.lineTo(2, 5); ctx.lineTo(5, 7); ctx.stroke(); }
            ctx.restore();
        });
    }

    function drawFlag() {
        if (flagX < cam.x - 80 || flagX > cam.x + W + 80) return;
        let fx = flagX, fy = GY;
        ctx.fillStyle = '#BDBDBD'; ctx.fillRect(fx - 3, fy - 115, 6, 115);
        ctx.fillStyle = '#FFD600'; ctx.beginPath(); ctx.arc(fx, fy - 115, 7, 0, 6.28); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(fx - 2, fy - 117, 3, 0, 6.28); ctx.fill();
        let w = Math.sin(tick * .06) * 6;
        ctx.fillStyle = '#E53935'; ctx.beginPath(); ctx.moveTo(fx + 3, fy - 108); ctx.quadraticCurveTo(fx + 30 + w, fy - 100, fx + 48, fy - 88); ctx.lineTo(fx + 3, fy - 68); ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); ctx.moveTo(fx + 3, fy - 108); ctx.quadraticCurveTo(fx + 18 + w * .5, fy - 104, fx + 24, fy - 96); ctx.lineTo(fx + 3, fy - 88); ctx.closePath(); ctx.fill();
        // Star on flag
        ctx.save(); ctx.translate(fx + 22, fy - 92);
        ctx.fillStyle = '#FFD600'; star5(0, 0, 5, 2.5, tick * .02); ctx.fill();
        ctx.restore();
    }

    function drawTrail() {
        trail.forEach(t => {
            ctx.fillStyle = `rgba(229,57,53,${t.a})`;
            ctx.beginPath(); ctx.arc(t.x, t.y, t.s, 0, 6.28); ctx.fill();
        });
    }

    function drawBall() {
        if (ball.dead) {
            if (ball.dt < 35) {
                let t = ball.dt / 35;
                ctx.save(); ctx.translate(ball.x, ball.y); ctx.scale(1 + t * 2.5, Math.max(.03, 1 - t)); ctx.globalAlpha = 1 - t;
                let g = ctx.createRadialGradient(-4, -5, 2, 0, 0, ball.r); g.addColorStop(0, '#FF8A80'); g.addColorStop(.5, '#E53935'); g.addColorStop(1, '#B71C1C');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, ball.r, 0, 6.28); ctx.fill(); ctx.restore();
            }
            return;
        }
        let sDist = Math.max(0, (GY - ball.r) - ball.y);
        let sSc = Math.max(.25, 1 - sDist / 250);
        ctx.fillStyle = `rgba(0,0,0,${.13 * sSc})`; ctx.beginPath(); ctx.ellipse(ball.x, GY, ball.r * .8 * sSc, 4 * sSc, 0, 0, 6.28); ctx.fill();
        if (ball.inv > 0 && Math.floor(tick / 4) % 2 === 0) {
            ctx.fillStyle = 'rgba(255,255,100,0.12)'; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r + 10 + Math.sin(tick * .2) * 3, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 0.5;
        }
        ctx.save(); ctx.translate(ball.x, ball.y); ctx.scale(ball.sqX, ball.sqY); ctx.rotate(ball.rot);
        let g = ctx.createRadialGradient(-4, -5, 2, 0, 0, ball.r);
        g.addColorStop(0, '#FF8A80'); g.addColorStop(.35, '#EF5350'); g.addColorStop(.7, '#E53935'); g.addColorStop(1, '#B71C1C');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, ball.r, 0, 6.28); ctx.fill();
        ctx.strokeStyle = 'rgba(130,20,20,0.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, ball.r, 0, 6.28); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(-4, -6, 6.5, 4, -.3, 0, 6.28); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(4, -2, 2.5, 0, 6.28); ctx.fill();
        ctx.restore();
        let ed = ball.vx > .5 ? 2.5 : ball.vx < -.5 ? -2.5 : 0;
        if (ball.inv <= 0 || Math.floor(tick / 4) % 2 !== 0) {
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.ellipse(ball.x - 5.5, ball.y - 2, 5, 5.5, 0, 0, 6.28); ctx.fill();
            ctx.beginPath(); ctx.ellipse(ball.x + 5.5, ball.y - 2, 5, 5.5, 0, 0, 6.28); ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = .8;
            ctx.beginPath(); ctx.ellipse(ball.x - 5.5, ball.y - 2, 5, 5.5, 0, 0, 6.28); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(ball.x + 5.5, ball.y - 2, 5, 5.5, 0, 0, 6.28); ctx.stroke();
            ctx.fillStyle = '#1a1a1a';
            ctx.beginPath(); ctx.arc(ball.x - 4.5 + ed, ball.y - 1.5, 2.6, 0, 6.28); ctx.fill();
            ctx.beginPath(); ctx.arc(ball.x + 6.5 + ed, ball.y - 1.5, 2.6, 0, 6.28); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.beginPath(); ctx.arc(ball.x - 6 + ed * .3, ball.y - 3.5, 1.4, 0, 6.28); ctx.fill();
            ctx.beginPath(); ctx.arc(ball.x + 5 + ed * .3, ball.y - 3.5, 1.4, 0, 6.28); ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    function drawPts() {
        pts.forEach(p => { ctx.save(); ctx.globalAlpha = Math.max(0, p.l); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; if (p.sh === 'c') { ctx.beginPath(); ctx.arc(0, 0, p.sz, 0, 6.28); ctx.fill(); } else ctx.fillRect(-p.sz / 2, -p.sz / 2, p.sz, p.sz); ctx.restore(); });
    }

    function drawHUD() {
        // Stars box
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(10, 10, 140, 42, 12); ctx.fill();
        ctx.save(); ctx.translate(36, 31); ctx.fillStyle = '#FFD600'; star5(0, 0, 11, 5, 0); ctx.fill(); ctx.restore();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Inter,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(starsC + ' / ' + starsT, 54, 31);

        // Hearts
        for (let i = 0; i < 3; i++) {
            let hx = W - 30 - i * 34, hy = 12;
            if (i < lives) {
                ctx.fillStyle = '#E53935'; drawHeart(hx, hy, 10); ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(hx - 3, hy + 3, 2.5, 0, 6.28); ctx.fill();
            } else {
                ctx.fillStyle = 'rgba(255,255,255,0.15)'; drawHeart(hx, hy, 10); ctx.fill();
            }
        }

        // Progress bar with checkpoints
        let barW = Math.min(200, W * 0.3), barX = W / 2 - barW / 2, barY = 10, barH = 6;
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 3); ctx.fill();
        let prog = Math.max(0, Math.min(1, ball.x / flagX));
        if (prog > 0) {
            let pg = ctx.createLinearGradient(barX, 0, barX + barW * prog, 0);
            pg.addColorStop(0, '#FF8A80'); pg.addColorStop(1, '#E53935');
            ctx.fillStyle = pg; ctx.beginPath(); ctx.roundRect(barX, barY, barW * prog, barH, 3); ctx.fill();
        }
        // Checkpoint markers on bar
        cps.forEach((cp, i) => {
            let cx = barX + (cp.x / flagX) * barW;
            ctx.fillStyle = cp.active ? '#FFD600' : 'rgba(255,255,255,0.3)';
            ctx.fillRect(cx - 1.5, barY - 2, 3, barH + 4);
        });
        // Ball position dot
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(barX + prog * barW, barY + barH / 2, 4, 0, 6.28); ctx.fill();
        ctx.fillStyle = 'rgba(229,57,53,0.6)'; ctx.beginPath(); ctx.arc(barX + prog * barW, barY + barH / 2, 2.5, 0, 6.28); ctx.fill();

        // Checkpoint label
        let activeCPs = cps.filter(c => c.active).length;
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.roundRect(W / 2 - 22, barY + barH + 4, 44, 16, 6); ctx.fill();
        ctx.fillStyle = activeCPs > 0 ? '#FFD600' : 'rgba(255,255,255,0.4)';
        ctx.font = 'bold 9px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('CP ' + activeCPs + '/' + cps.length, W / 2, barY + barH + 12);

        // Best
        let best = getHS('bounce') || 0;
        if (best > 0) { ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left'; ctx.fillText('Best: ' + best, 14, 62); }
    }

    function drawOverlay(title, sub, sub2, titleColor) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H);
        let tb = Math.sin(tBounce) * 6;
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.font = 'bold 44px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(title, W / 2 + 3, H / 2 - 65 + tb + 3);
        ctx.fillStyle = titleColor || '#E53935'; ctx.fillText(title, W / 2, H / 2 - 65 + tb);
        ctx.fillStyle = '#fff'; ctx.font = '16px Inter,sans-serif'; ctx.fillText(sub, W / 2, H / 2 - 15);
        if (sub2) { ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = '13px Inter,sans-serif'; ctx.fillText(sub2, W / 2, H / 2 + 12); }
        let pa = .4 + .3 * Math.sin(tick * .06);
        ctx.fillStyle = `rgba(255,255,255,${pa})`; ctx.font = '13px Inter,sans-serif';
        ctx.fillText('Tap or press any key to retry', W / 2, H / 2 + 55);
    }

    function drawTitle() {
        ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(0, 0, W, H);
        let tb = Math.sin(tBounce) * 7;
        let tby = H / 2 - 135 + Math.abs(Math.sin(tBounce * 1.2)) * 18;
        ctx.save(); ctx.translate(W / 2, tby);
        let g = ctx.createRadialGradient(-3, -4, 2, 0, 0, 16); g.addColorStop(0, '#FF8A80'); g.addColorStop(.5, '#E53935'); g.addColorStop(1, '#B71C1C');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 6.28); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-4.5, -2, 4, 4.5, 0, 0, 6.28); ctx.fill(); ctx.beginPath(); ctx.ellipse(4.5, -2, 4, 4.5, 0, 0, 6.28); ctx.fill();
        ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(-3.5, -1.5, 2, 0, 6.28); ctx.fill(); ctx.beginPath(); ctx.arc(5.5, -1.5, 2, 0, 6.28); ctx.fill();
        ctx.restore();
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.font = 'bold 46px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('Red Ball', W / 2 + 3, H / 2 - 65 + tb + 3);
        let tg = ctx.createLinearGradient(W / 2 - 90, 0, W / 2 + 90, 0);
        tg.addColorStop(0, '#FF8A80'); tg.addColorStop(.5, '#E53935'); tg.addColorStop(1, '#B71C1C');
        ctx.fillStyle = tg; ctx.fillText('Red Ball', W / 2, H / 2 - 65 + tb);
        ctx.fillStyle = '#fff'; ctx.font = '16px Inter,sans-serif'; ctx.fillText('Roll, bounce, and collect the stars!', W / 2, H / 2 - 10);
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = '13px Inter,sans-serif';
        ctx.fillText('Arrows / WASD to move  \u2022  Space / Up to jump', W / 2, H / 2 + 18);
        ctx.fillStyle = 'rgba(229,57,53,0.6)'; ctx.font = '12px Inter,sans-serif';
        ctx.fillText('Reach red flag checkpoints to save your progress!', W / 2, H / 2 + 42);
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#E53935'; drawHeart(W / 2 - 22 + i * 22, H / 2 + 58, 8); ctx.fill();
        }
        let pa = .4 + .3 * Math.sin(tick * .06); ctx.fillStyle = `rgba(255,255,255,${pa})`; ctx.font = '13px Inter,sans-serif';
        ctx.fillText('Tap or press any key to start', W / 2, H / 2 + 92);
    }

    function drawWin() {
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0, 0, W, H);
        let b = Math.sin(tick * .08) * 5;
        ctx.fillStyle = '#FFD600'; ctx.font = 'bold 38px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('Level Complete!', W / 2, H / 2 - 80 + b);
        let bigStars = starsC >= starsT * .85 ? 3 : starsC >= starsT * .5 ? 2 : 1;
        for (let i = 0; i < 3; i++) {
            let sx = W / 2 - 55 + i * 55, sy = H / 2 - 25, col = i < bigStars;
            ctx.save(); ctx.translate(sx, sy); ctx.scale(col ? 1.15 : .7, col ? 1.15 : .7);
            ctx.fillStyle = col ? '#FFD600' : 'rgba(255,255,255,0.15)'; star5(0, 0, 20, 9, 0); ctx.fill();
            if (col) { ctx.fillStyle = 'rgba(255,255,255,0.3)'; star5(0, -2, 13, 6, 0); ctx.fill(); }
            ctx.restore();
        }
        ctx.fillStyle = '#fff'; ctx.font = '15px Inter,sans-serif'; ctx.fillText('Stars: ' + starsC + ' / ' + starsT, W / 2, H / 2 + 20);
        ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '13px Inter,sans-serif';
        ctx.fillText('Lives remaining:', W / 2 - 48, H / 2 + 48);
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = i < lives ? '#E53935' : 'rgba(255,255,255,0.15)';
            drawHeart(W / 2 + 50 + i * 22, H / 2 + 38, 7); ctx.fill();
        }
        let activeCPs = cps.filter(c => c.active).length;
        ctx.fillStyle = 'rgba(255,214,0,0.5)'; ctx.font = '12px Inter,sans-serif';
        ctx.fillText('Checkpoints reached: ' + activeCPs + '/' + cps.length, W / 2, H / 2 + 72);
        let pa = .4 + .3 * Math.sin(tick * .06); ctx.fillStyle = `rgba(255,255,255,${pa})`; ctx.font = '13px Inter,sans-serif';
        ctx.fillText('Tap or press any key to play again', W / 2, H / 2 + 100);
    }

    function draw() {
        ctx.save();
        if (cam.shake > .5) ctx.translate((Math.random() - .5) * cam.shake * 2, (Math.random() - .5) * cam.shake * 2);
        drawSky(); drawClouds(); drawHills();
        ctx.save(); ctx.translate(-cam.x, 0);
        drawGrounds(); drawPlats(); drawCheckpoints(); drawFlag(); drawStars(); drawTrail(); drawEns(); drawPts(); drawBall();
        ctx.restore(); ctx.restore();
        // CP flash
        if (cpFlash > 0) { ctx.fillStyle = `rgba(229,57,53,${cpFlash / 18 * 0.12})`; ctx.fillRect(0, 0, W, H); }
        drawHUD();
        if (!started) drawTitle();
        else if (gameOver) drawOverlay('Game Over', 'Stars: ' + starsC + ' / ' + starsT, 'Best: ' + (getHS('bounce') || 0) + ' stars', '#E53935');
        else if (won) drawWin();
    }

    function respawnBall() {
        let lastCP = null;
        for (let i = cps.length - 1; i >= 0; i--) { if (cps[i].active) { lastCP = cps[i]; break; } }
        ball.x = lastCP ? lastCP.x : 100;
        ball.y = (lastCP ? lastCP.y : GY) - ball.r;
        ball.vx = 0; ball.vy = 0; ball.rot = 0;
        ball.onG = false; ball.sqX = 1; ball.sqY = 1;
        ball.dead = false; ball.dt = 0; ball.prevY = ball.y;
        ball.inv = 120; ball.jumpHeld = false;
        coyoteF = 999; jBufF = 999;
        spP(ball.x, ball.y, '#FFD600', 15, { s: 3, sz: 2.5, sh: 'c', d: .03 });
        spP(ball.x, ball.y, '#fff', 8, { s: 2, sz: 2, sh: 'c', d: .04 });
    }

    function tryKill() {
        if (ball.dead || ball.inv > 0) return;
        lives--;
        ball.dead = true; ball.dt = 0;
        spP(ball.x, ball.y, '#E53935', 18, { s: 4.5, sz: 3.5, sh: 'c', d: .025 });
        spP(ball.x, ball.y, '#FF8A80', 12, { s: 3, sz: 2.5, d: .035 });
        cam.shake = 12;
        if (lives <= 0) {
            gameOver = true;
            if (starsC > (getHS('bounce') || 0)) setHS('bounce', starsC, false);
            gHigh('bounce');
        }
    }

    function update() {
        tick++; tBounce += .04;

        if (!started || won) {
            if (won) {
                pts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.d; p.r += p.rs; });
                pts = pts.filter(p => p.l > 0);
                // Celebration particles
                if (tick % 8 === 0) {
                    let cols = ['#FFD600', '#E53935', '#43A047', '#2196F3', '#FF9800'];
                    spP(flagX + (Math.random() - .5) * 60, GY - 50 - Math.random() * 80, cols[Math.floor(Math.random() * cols.length)], 3, { a: -Math.PI / 2, sp: 1.5, s: 3, sz: 3, sh: 'c', d: .015, g: .05 });
                }
            }
            draw(); return;
        }

        if (gameOver) {
            pts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.d; p.r += p.rs; });
            pts = pts.filter(p => p.l > 0);
            if (ball.dead) ball.dt++;
            draw(); return;
        }

        if (ball.dead) {
            ball.dt++;
            pts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.d; p.r += p.rs; });
            pts = pts.filter(p => p.l > 0);
            if (cam.shake > .5) cam.shake *= .85; else cam.shake = 0;
            if (ball.dt > 42 && lives > 0) respawnBall();
            draw(); return;
        }

        if (ball.inv > 0) ball.inv--;
        if (cpFlash > 0) cpFlash--;

        // Coyote time
        if (ball.onG) coyoteF = 0; else coyoteF++;

        // Jump buffer
        if (keys.j && !jPress) jBufF = 0; else jBufF++;
        jPress = keys.j;

        // Execute jump
        if (jBufF < JBUF && coyoteF < COYOTE) {
            ball.vy = JFORCE; ball.onG = false;
            ball.sqX = .72; ball.sqY = 1.35; ball.jumpHeld = true;
            jBufF = 999; coyoteF = 999;
            spP(ball.x, ball.y + ball.r, 'rgba(139,105,20,0.6)', 6, { a: -Math.PI / 2, sp: 1.2, s: 2.2, sz: 2.5, d: .04 });
        }

        // Variable jump height
        if (!keys.j && ball.jumpHeld && ball.vy < JFORCE * 0.4) {
            ball.vy *= 0.5; ball.jumpHeld = false;
        }

        // Movement
        let ac = ball.onG ? GACCEL : AACCEL;
        if (keys.l) ball.vx = Math.max(ball.vx - ac, -MAXSPD);
        else if (keys.r) ball.vx = Math.min(ball.vx + ac, MAXSPD);
        else ball.vx *= FRIC;
        if (Math.abs(ball.vx) < .08) ball.vx = 0;

        ball.vy += GRAV; if (ball.vy > 17) ball.vy = 17;
        ball.prevY = ball.y; ball.x += ball.vx; ball.y += ball.vy;
        ball.rot += (ball.onG ? ball.vx * .055 : ball.vx * .02);
        ball.sqX += (1 - ball.sqX) * .15; ball.sqY += (1 - ball.sqY) * .15;

        // Moving platforms
        plats.forEach(p => {
            p._dx = 0; p._dy = 0;
            if (p.moving) {
                let px = p.x, py = p.y;
                if (p.mAxis === 'y') { p.y += p.mSpd * p.mDir; if (Math.abs(p.y - p.oY) > p.mRange) p.mDir *= -1; }
                else { p.x += p.mSpd * p.mDir; if (Math.abs(p.x - p.oX) > p.mRange) p.mDir *= -1; }
                p._dx = p.x - px; p._dy = p.y - py;
            }
            if (p.crActive) { p.crTimer++; p.alpha = Math.max(0, 1 - p.crTimer / 50); }
        });

        // Collision
        ball.onG = false; let stood = null;
        let all = [...gnds.map(g => ({ ...g, tp: 'g' })), ...plats.filter(p => !(p.crActive && p.alpha <= 0)).map(p => ({ ...p, tp: 'p' }))];
        all.forEach(p => {
            if (p.x + p.w < cam.x - 60 || p.x > cam.x + W + 60) return;
            let hO = ball.x + ball.r > p.x + 3 && ball.x - ball.r < p.x + p.w - 3;
            if (ball.vy >= 0 && hO && ball.prevY + ball.r <= p.y + 12 && ball.y + ball.r >= p.y) {
                ball.y = p.y - ball.r;
                if (ball.vy > 3.5) {
                    ball.sqX = 1.28; ball.sqY = .72;
                    spP(ball.x, ball.y + ball.r, p.tp === 'g' ? 'rgba(76,175,80,0.5)' : 'rgba(109,76,47,0.5)', 5, { a: -Math.PI / 2, sp: 1, s: 1.8, sz: 2.2, d: .04 });
                }
                ball.vy = 0; ball.onG = true; stood = p;
                if (p.crumble && !p.crActive) { p.crActive = true; p.crTimer = 0; spP(p.x + p.w / 2, p.y, '#BCAAA4', 10, { a: -Math.PI / 2, sp: 1.5, s: 2.2, sz: 3, d: .03 }); }
            }
            if (p.tp === 'g' && ball.y + ball.r > p.y + 8 && ball.y - ball.r < p.y + p.h - 5) {
                if (ball.vx > 0 && ball.x + ball.r > p.x && ball.x + ball.r < p.x + 14) { ball.x = p.x - ball.r; ball.vx = 0; }
                if (ball.vx < 0 && ball.x - ball.r < p.x + p.w && ball.x - ball.r > p.x + p.w - 14) { ball.x = p.x + p.w + ball.r; ball.vx = 0; }
            }
        });
        if (stood && stood._dx !== undefined) { ball.x += stood._dx; ball.y += stood._dy; }

        // Trail
        if (Math.abs(ball.vx) > 2.5 || Math.abs(ball.vy) > 2.5) {
            trail.push({ x: ball.x, y: ball.y, a: 0.28, s: ball.r * 0.65 });
        }
        for (let i = trail.length - 1; i >= 0; i--) {
            trail[i].a -= 0.018; trail[i].s *= 0.97;
            if (trail[i].a <= 0) trail.splice(i, 1);
        }

        // Dust
        if (ball.onG && Math.abs(ball.vx) > 3 && tick % 4 === 0) spP(ball.x - ball.vx * .5, ball.y + ball.r, 'rgba(139,105,20,0.35)', 1, { a: Math.PI + (ball.vx > 0 ? 0 : Math.PI), sp: .5, s: .8, sz: 2.5, d: .05, g: -.02 });

        // Checkpoints
        cps.forEach(cp => {
            if (cp.active) return;
            if (Math.abs(ball.x - cp.x) < 35 && ball.y + ball.r >= cp.y - 15) {
                cp.active = true; cpFlash = 18;
                spP(cp.x, cp.y - 55, '#E53935', 18, { s: 3.5, sz: 3, sh: 'c', d: .028 });
                spP(cp.x, cp.y - 55, '#FFD600', 10, { s: 2.5, sz: 2.5, sh: 'c', d: .035 });
                spP(cp.x, cp.y - 55, '#fff', 5, { s: 2, sz: 1.5, sh: 'c', d: .04 });
                cam.shake = 3;
            }
        });

        // Stars
        sts.forEach(s => {
            if (s.got) return;
            let bob = Math.sin(tick * .05 + s.bp) * 4, sy = s.y + bob;
            let dx = ball.x - s.x, dy = ball.y - sy;
            if (Math.sqrt(dx * dx + dy * dy) < ball.r + 13) {
                s.got = true; starsC++; gScore('\u2605 ' + starsC + ' / ' + starsT);
                spP(s.x, sy, '#FFD600', 12, { s: 3.5, sz: 3, sh: 'c', d: .03 }); spP(s.x, sy, '#FFF9C4', 6, { s: 2, sz: 2, sh: 'c', d: .04 });
            }
        });

        // Enemies
        ens.forEach(e => {
            if (!e.alive) return;
            e.x += e.spd * e.dir; if (e.x <= e.sX || e.x >= e.eX) e.dir *= -1;
            if (ball.x + ball.r > e.x + 3 && ball.x - ball.r < e.x + e.w - 3 && ball.y + ball.r > e.y + 3 && ball.y - ball.r < e.y + e.h - 3) {
                if (ball.vy > 0 && ball.y + ball.r < e.y + e.h * .55) {
                    e.alive = false; e.sq = 0; ball.vy = JFORCE * .65; ball.onG = false;
                    ball.sqX = .68; ball.sqY = 1.35; ball.jumpHeld = false;
                    let ec = e.fast ? '#E53935' : '#78909C', ec2 = e.fast ? '#FF8A80' : '#B0BEC5';
                    spP(e.x + e.w / 2, e.y + e.h / 2, ec, 12, { s: 3.5, sz: 3, d: .03 }); spP(e.x + e.w / 2, e.y + e.h / 2, ec2, 6, { s: 2, sz: 2, sh: 'c', d: .04 });
                    cam.shake = 5;
                } else tryKill();
            }
        });

        // Flag win
        if (ball.x > flagX - 25 && ball.x < flagX + 25 && !won) {
            won = true;
            if (starsC > (getHS('bounce') || 0)) setHS('bounce', starsC, false);
            gHigh('bounce');
            spP(flagX, GY - 55, '#FFD600', 25, { s: 4, sz: 3, sh: 'c', d: .02 });
            spP(flagX, GY - 55, '#E53935', 18, { s: 3, sz: 2.5, sh: 'c', d: .025 });
            spP(flagX, GY - 55, '#fff', 10, { s: 2.5, sz: 2, sh: 'c', d: .03 });
            cam.shake = 6;
        }

        // Fall death
        if (ball.y > H + 100) tryKill();

        // Particles
        pts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l -= p.d; p.r += p.rs; });
        pts = pts.filter(p => p.l > 0);

        // Camera
        let tc = ball.x - W * 0.35;
        cam.x += (tc - cam.x) * 0.08;
        if (cam.x < 0) cam.x = 0;
        if (cam.shake > .5) cam.shake *= .85; else cam.shake = 0;

        draw();
    }

    function restartGame() {
        ball = { x: 100, y: GY - 18, r: 18, vx: 0, vy: 0, rot: 0, onG: false, sqX: 1, sqY: 1, dead: false, dt: 0, prevY: GY - 18, inv: 0, jumpHeld: false };
        cam = { x: 0, shake: 0 };
        starsC = 0; lives = 3; coyoteF = 0; jBufF = 999; cpFlash = 0;
        jPress = false; gameOver = false; won = false;
        keys = { l: false, r: false, j: false };
        pts = []; trail = [];
        buildLevel();
        gScore(''); gHigh('bounce');
    }

    function startG() {
        if ((gameOver || won) && started) { restartGame(); return; }
        if (!started) { started = true; gScore('\u2605 0 / ' + starsT); }
    }

    // ── Keyboard ──
    function keyH(e) {
        if ((gameOver || won) && started) { restartGame(); e.preventDefault(); return; }
        if (e.key === 'ArrowLeft' || e.key === 'a') { keys.l = true; e.preventDefault(); startG(); }
        if (e.key === 'ArrowRight' || e.key === 'd') { keys.r = true; e.preventDefault(); startG(); }
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') { keys.j = true; e.preventDefault(); startG(); }
    }
    function keyU(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') keys.l = false;
        if (e.key === 'ArrowRight' || e.key === 'd') keys.r = false;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.j = false;
    }
    document.addEventListener('keydown', keyH);
    document.addEventListener('keyup', keyU);
    addClean(() => { document.removeEventListener('keydown', keyH); document.removeEventListener('keyup', keyU); });

    // ── Touch ──
    let touchX = null, touchY = null, swiped = false;
    function ts(e) { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; swiped = false; if ((gameOver || won) && started) restartGame(); else startG(); }
    function tm(e) { if (touchX === null || swiped) return; let dx = e.touches[0].clientX - touchX, dy = e.touches[0].clientY - touchY; keys.l = dx < -15; keys.r = dx > 15; if (dy < -25 && !swiped) { keys.j = true; swiped = true; } }
    function te() { touchX = null; touchY = null; keys.l = false; keys.r = false; keys.j = false; }
    c.addEventListener('touchstart', ts, { passive: true });
    c.addEventListener('touchmove', tm, { passive: true });
    c.addEventListener('touchend', te);
    addClean(() => { c.removeEventListener('touchstart', ts); c.removeEventListener('touchmove', tm); c.removeEventListener('touchend', te); });

    // ── Game Loop ──
    frame = setInterval(update, 16);
    addClean(() => clearInterval(frame));
    draw();

    // ── On-screen controls ──
    showControls(`<div class="game-ctrl-row" style="gap:12px"><button class="game-ctrl-btn" id="bL" style="width:62px"><i class="fas fa-chevron-left"></i></button><button class="game-ctrl-btn" id="bJ" style="width:72px;font-size:11px;font-weight:700;letter-spacing:0.5px">JUMP</button><button class="game-ctrl-btn" id="bR" style="width:62px"><i class="fas fa-chevron-right"></i></button></div>`);
    let bL = document.getElementById('bL'), bJ = document.getElementById('bJ'), bR = document.getElementById('bR');
    function ld() { keys.l = true; startG(); } function lu() { keys.l = false; }
    function jd() { keys.j = true; startG(); } function ju() { keys.j = false; }
    function rd() { keys.r = true; startG(); } function ru() { keys.r = false; }
    bL.addEventListener('mousedown', ld); bL.addEventListener('mouseup', lu); bL.addEventListener('mouseleave', lu);
    bL.addEventListener('touchstart', e => { e.preventDefault(); ld(); }, { passive: false });
    bL.addEventListener('touchend', e => { e.preventDefault(); lu(); }, { passive: false });
    bJ.addEventListener('mousedown', jd); bJ.addEventListener('mouseup', ju); bJ.addEventListener('mouseleave', ju);
    bJ.addEventListener('touchstart', e => { e.preventDefault(); jd(); }, { passive: false });
    bJ.addEventListener('touchend', e => { e.preventDefault(); ju(); }, { passive: false });
    bR.addEventListener('mousedown', rd); bR.addEventListener('mouseup', ru); bR.addEventListener('mouseleave', ru);
    bR.addEventListener('touchstart', e => { e.preventDefault(); rd(); }, { passive: false });
    bR.addEventListener('touchend', e => { e.preventDefault(); ru(); }, { passive: false });
    addClean(() => { bL.removeEventListener('mousedown', ld); bL.removeEventListener('mouseup', lu); bJ.removeEventListener('mousedown', jd); bJ.removeEventListener('mouseup', ju); bR.removeEventListener('mousedown', rd); bR.removeEventListener('mouseup', ru); });

    gScore(''); gHigh('bounce');
};



// ==========END OF GAMES SECTION==========




/* ================================================================
   settings page 
   ================================================================ */
function openSettings(){ 
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  panel.classList.remove('closing');
  panel.classList.add('open'); 
  overlay.classList.add('open');
  panel.querySelectorAll('.glass, .set-row, .settings-title, div[style]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-12px)';
    setTimeout(() => {
      el.style.transition = 'opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, 80 + i * 40);
  });
}
function closeSettings(){ 
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  panel.classList.add('closing');
  setTimeout(() => {
    panel.classList.remove('open');
    panel.classList.remove('closing');
    overlay.classList.remove('open');
  }, 280);
}
function onBlur(el){ const v=parseInt(el.value); document.getElementById('v-blur').textContent=v; document.documentElement.style.setProperty('--blur', v+'px'); el.style.setProperty('--p', ((v/40)*100)+'%'); }
function setGlassBlur(el){ onBlur(el); }
function togParticles(){ document.querySelector('.particles').style.display = document.getElementById('s-particles').checked ? '' : 'none'; }
function togGrain(){ document.querySelector('.grain').style.display = document.getElementById('s-grain').checked ? '' : 'none'; }

/* ===== CUSTOM BACKGROUND ===== */
const BG_STORAGE_KEY = 'xecute-custom-bg';

function pickCustomBg() {
  const input = document.getElementById('bgFileInput');
  if (input) {
    input.value = '';
    input.click();
  }
}

function handleBgFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showKbToast('❌ Image too large! Max 5MB');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    applyCustomBg(dataUrl);
    try {
      localStorage.setItem(BG_STORAGE_KEY, dataUrl);
      showKbToast('✅ Background saved!');
    } catch(err) {
      showKbToast('❌ Failed to save');
    }
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function applyCustomBg(dataUrl) {
  if (!dataUrl) {
    removeCustomBg();
    return;
  }
  
  // Create or update background overlay
  let bgOverlay = document.getElementById('customBgOverlay');
  if (!bgOverlay) {
    bgOverlay = document.createElement('div');
    bgOverlay.id = 'customBgOverlay';
    bgOverlay.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat;transition:opacity 0.5s ease;';
    document.body.insertBefore(bgOverlay, document.body.firstChild);
  }
  
  bgOverlay.style.backgroundImage = `url('${dataUrl}')`;
  bgOverlay.style.opacity = '1';
  
  // Update preview
  const preview = document.getElementById('bg-preview');
  if (preview) {
    preview.style.backgroundImage = `url('${dataUrl}')`;
    preview.style.display = 'block';
  }
  
  // Update status
  const status = document.getElementById('bg-status');
  if (status) {
    status.textContent = '✓ Custom background active';
    status.style.color = 'var(--accent)';
  }
}

function removeCustomBg() {
  const bgOverlay = document.getElementById('customBgOverlay');
  if (bgOverlay) {
    bgOverlay.style.opacity = '0';
    setTimeout(() => {
      if (bgOverlay.parentNode) bgOverlay.parentNode.removeChild(bgOverlay);
    }, 500);
  }
  
  // Clear preview
  const preview = document.getElementById('bg-preview');
  if (preview) {
    preview.style.display = 'none';
    preview.style.backgroundImage = 'none';
  }
  
  // Update status
  const status = document.getElementById('bg-status');
  if (status) {
    status.textContent = 'No custom background set';
    status.style.color = 'var(--text-muted)';
  }
  
  // Clear storage
  try {
    localStorage.removeItem(BG_STORAGE_KEY);
    showKbToast('🗑️ Background removed');
  } catch(err) {}
}

// Load saved background on page load
function loadSavedBg() {
  try {
    const savedBg = localStorage.getItem(BG_STORAGE_KEY);
    if (savedBg) {
      applyCustomBg(savedBg);
    }
  } catch(err) {}
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', loadSavedBg);
/* ===== END CUSTOM BACKGROUND ===== */



// ===== SILENT PROTECTION (background only, no UI) =====
if(window.top!==window.self){window.top.location=window.self.location;}
document.addEventListener('dragstart',function(e){e.preventDefault();});
document.addEventListener('contextmenu',function(e){e.preventDefault();});
document.addEventListener('copy',function(e){e.preventDefault();});
document.addEventListener('cut',function(e){e.preventDefault();});
document.addEventListener('selectstart',function(e){e.preventDefault();});
document.addEventListener('keydown',function(e){ if((e.ctrlKey||e.metaKey)&&(e.key==='a'||e.key==='c'||e.key==='x'||e.key==='u')){ if(e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA')e.preventDefault(); } if(e.key==='F12'){e.preventDefault();return false;} if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==='I'||e.key==='i')){e.preventDefault();return false;} if((e.ctrlKey||e.metaKey)&&e.key==='u'){e.preventDefault();return false;} });
document.querySelectorAll('img').forEach(img => { img.setAttribute('draggable', 'false'); img.addEventListener('contextmenu', e => e.preventDefault()); });
document.addEventListener('click', startBgOnFirstInteraction);
document.addEventListener('scroll', startBgOnFirstInteraction);
document.addEventListener('touchstart', startBgOnFirstInteraction);


/* ================================================================
   MISSING ANIMATIONS — fully wired
   ================================================================ */

/* ── 1. Ripple effect on ALL buttons ── */
(function initRipple() {
    function spawnRipple(e, el) {
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.8;
        const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? rect.left + rect.width / 2;
        const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? rect.top + rect.height / 2;
        const x = clientX - rect.left - size / 2;
        const y = clientY - rect.top  - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;`;
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    }

    const rippleSel = '.btn, .control-btn-circle, .play-btn, .social-card, .game-sel-btn, .chat-type-send';

    function attachRipple(el) {
        if (el._ripple) return;
        el._ripple = true;
        el.addEventListener('pointerdown', e => spawnRipple(e, el));
    }

    document.querySelectorAll(rippleSel).forEach(attachRipple);

    // Re-attach for dynamically added elements (game buttons etc.)
    new MutationObserver(muts => {
        muts.forEach(m => m.addedNodes.forEach(n => {
            if (n.nodeType !== 1) return;
            if (n.matches && n.matches(rippleSel)) attachRipple(n);
            n.querySelectorAll && n.querySelectorAll(rippleSel).forEach(attachRipple);
        }));
    }).observe(document.body, { childList: true, subtree: true });
})();


/* ── 2. .pop class on every .btn, .control-btn-circle, .play-btn, .game-sel-btn click ── */
(function initPop() {
    const popSel = '.btn, .control-btn-circle, .play-btn, .game-sel-btn';

    function triggerPop(el) {
        el.classList.remove('pop');
        void el.offsetWidth; // reflow to restart animation
        el.classList.add('pop');
        el.addEventListener('animationend', () => el.classList.remove('pop'), { once: true });
    }

    document.addEventListener('pointerdown', e => {
        const el = e.target.closest(popSel);
        if (el) triggerPop(el);
    });
})();


/* ── 3. Cursor hover expand on interactive elements ── */
(function initCursorHover() {
    const dot     = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    if (!dot || !outline) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

    const hoverSel = 'a, button, .btn, .glass, .social-card, .theme-card, .skill-item, .hobby-card, .project-card, .nav-link, .control-btn-circle, .play-btn, .game-sel-btn, label, input[type="range"], .chat-type-send, .chat-help-btn';

    document.addEventListener('mouseover', e => {
        if (e.target.closest(hoverSel)) {
            outline.classList.add('hovered');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(hoverSel)) {
            outline.classList.remove('hovered');
        }
    });

    // Shrink dot on click
    document.addEventListener('mousedown', () => dot.classList.add('clicking'));
    document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));
})();


/* ── 4. Theme card pop + flash animation on click ── */
(function initThemeCardPop() {
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            // spring scale
            card.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(0.92)' },
                    { transform: 'scale(1.06)' },
                    { transform: 'scale(1)' }
                ],
                { duration: 320, easing: 'cubic-bezier(0.34,1.7,0.64,1)' }
            );
            // flash overlay
            card.classList.add('flash');
            setTimeout(() => card.classList.remove('flash'), 400);
        });
    });
})();


/* ── 5. Nav link active underline slide on click ── */
(function initNavUnderline() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
})();


/* ── 6. Settings slider real-time track fill ── */
(function initSliderFill() {
    function syncFill(el) {
        const min = parseFloat(el.min) || 0;
        const max = parseFloat(el.max) || 100;
        const val = parseFloat(el.value);
        const pct = ((val - min) / (max - min)) * 100;
        el.style.setProperty('--p', pct + '%');
    }
    document.querySelectorAll('.sl2').forEach(sl => {
        syncFill(sl);
        sl.addEventListener('input', () => syncFill(sl));
    });
})();


/* ── 7. Scroll-triggered section reveal (IntersectionObserver) ── */
(function initScrollReveal() {
    const revealEls = document.querySelectorAll('.glass, .section-header, .skill-item, .hobby-card, .project-card, .social-card');
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
        if (getComputedStyle(el).animationName !== 'none') return; // already animated by CSS
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.23,1,0.32,1)';
        observer.observe(el);
    });
})();