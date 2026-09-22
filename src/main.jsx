import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Clock3, MapPin, Navigation, QrCode, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import './styles.css';
import './reveal-fix.css';
import './content-update.css';
import './card-opening.css';
import './responsive-doodles.css';
import './hero-frame-fix.css';
import './royal-door-music.css';
import './antique-burgundy-door.css';
import './door-reveal-fix.css';
import './antique-doodles.css';
import './music-control.css';
import './south-indian-doodles.css';
import './floral-celebration.css';
import './door-doodle-border.css';
import './pendulum-doodles.css';
import './strong-pendulum.css';
import './always-sway.css';
import './hero-image-cleanup.css';
import './doodle-hover-reverse.css';
import './celebration-burst.css';
import './site-footer.css';
import './mobile-hero.css';
import './monogram-logo.css';
import './ampersand-style.css';
import './qr-link.css';
import './reception-countdown.css';
import './scroll-cue.css';

const A = '/assets/';
const eventData = [
  { kind: 'Reception', title: 'An evening in celebration', date: 'Thursday, 19 November 2026', time: '6:30 PM onwards', venue: 'MGM Mahal, Kovur, Chennai', className: 'reception' },
  { kind: 'Wedding', title: 'The sacred union', date: 'Friday, 20 November 2026', time: 'Between 9:00 AM & 10:05 AM', venue: 'MGM Mahal, Kovur, Chennai', className: 'wedding' }
];
const receptionStartsAt = new Date('2026-11-19T18:30:00+05:30');
const receptionEndsAt = new Date('2026-11-19T22:00:00+05:30');
const weddingStartsAt = new Date('2026-11-20T09:00:00+05:30');
const weddingEndsAt = new Date('2026-11-20T10:05:00+05:30');
const getCountdown = (target) => {
 const remaining = Math.max(0, target.getTime() - Date.now());
 return {
  days: Math.floor(remaining / 86400000),
  hours: Math.floor((remaining % 86400000) / 3600000),
  minutes: Math.floor((remaining % 3600000) / 60000),
  seconds: Math.floor((remaining % 60000) / 1000)
 };
};
const getCelebrationPhase = () => {
 const now = Date.now();
 if (now < receptionStartsAt) return { type:'reception-countdown', countdown:getCountdown(receptionStartsAt) };
 if (now < receptionEndsAt) return { type:'reception-live' };
 if (now < weddingStartsAt) return { type:'wedding-countdown', countdown:getCountdown(weddingStartsAt) };
 if (now < weddingEndsAt) return { type:'wedding-live' };
 return { type:'ended' };
};

function Ornament({dark=false}) { return <div className={`ornament ${dark ? 'dark' : ''}`}><span>✦</span><i></i><b>❋</b><i></i><span>✦</span></div> }
function MonogramLogo({className=''}) { return <img className={`monogram-logo ${className}`} src={`${A}location%20logo.png`} alt="Muthu and Deepika monogram"/> }
function CelebrationBurst(){
 const sparks = Array.from({length: 26}, (_, i) => i);
 return <div className="celebration-burst" aria-hidden="true">
  <div className="sky-firework firework-left">{sparks.slice(0,13).map(i=><i key={i} style={{'--i':i}}/> )}</div>
  <div className="sky-firework firework-right">{sparks.slice(13).map((_,i)=><i key={i} style={{'--i':i}}/> )}</div>
  <div className="party-popper popper-left">{sparks.slice(0,10).map(i=><b key={i} style={{'--i':i}}/> )}</div>
  <div className="party-popper popper-right">{sparks.slice(0,10).map(i=><b key={i} style={{'--i':i}}/> )}</div>
 </div>
}
function App(){
 const [muted,setMuted] = useState(true); const [opened,setOpened] = useState(false); const [hasScrolled,setHasScrolled] = useState(false);
 const [celebrationPhase,setCelebrationPhase] = useState(getCelebrationPhase);
 const audioRef = useRef(null);
 const fadeFrameRef = useRef(null);
 useEffect(()=>{ const reveal=()=>document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.87)el.classList.add('shown')}); const track=audioRef.current; if(track){track.muted=false;track.volume=0} reveal(); window.addEventListener('scroll',reveal); return()=>{window.removeEventListener('scroll',reveal);if(fadeFrameRef.current)cancelAnimationFrame(fadeFrameRef.current)}},[]);
 useEffect(()=>{const timer=window.setInterval(()=>setCelebrationPhase(getCelebrationPhase()),1000);return()=>window.clearInterval(timer)},[]);
 useEffect(()=>{const dismissScrollCue=()=>{if(window.scrollY>24)setHasScrolled(true)};window.addEventListener('scroll',dismissScrollCue,{passive:true});return()=>window.removeEventListener('scroll',dismissScrollCue)},[]);
 const scroll=(id)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
 const cancelFade=()=>{if(fadeFrameRef.current)cancelAnimationFrame(fadeFrameRef.current)};
 const fadeVolume=(target,duration=1500)=>{const track=audioRef.current;if(!track)return;cancelFade();const start=track.volume;const startedAt=performance.now();const step=(now)=>{const progress=Math.min((now-startedAt)/duration,1);track.volume=start+(target-start)*progress;if(progress<1)fadeFrameRef.current=requestAnimationFrame(step)};fadeFrameRef.current=requestAnimationFrame(step)};
 const playMusic=()=>{const track=audioRef.current;if(!track)return;cancelFade();track.muted=false;track.volume=0;const playback=track.play();if(playback)playback.then(()=>{setMuted(false);fadeVolume(.5)}).catch(()=>{track.volume=0;setMuted(true)})};
 const toggleMusic=()=>{const track=audioRef.current;if(!track)return;cancelFade();if(track.volume<.01){track.muted=false;track.volume=.5;const playback=track.play();if(playback)playback.then(()=>setMuted(false)).catch(()=>{track.volume=0;setMuted(true)})}else{track.volume=0;setMuted(true)}};
 const openInvitation=()=>{playMusic();setOpened(true)};
 return <main className={opened ? 'invitation-opened' : 'invitation-closed'}>
  <div className="card-opening" aria-hidden={opened}>
   <div className="curtain curtain-left"><span>❋</span><i>✦</i><div className="door-doodles"><b>✿</b><b>✦</b><b>❀</b><b>♥</b><b>✽</b><b>✧</b><b>❋</b><b>✦</b><b>✿</b><b>♥</b></div></div><div className="curtain curtain-right"><span>❋</span><i>✦</i><div className="door-doodles"><b>✿</b><b>✦</b><b>❀</b><b>♥</b><b>✽</b><b>✧</b><b>❋</b><b>✦</b><b>✿</b><b>♥</b></div></div>
   <div className="opening-note"><button type="button" className="wax-seal" aria-label="Open invitation and play music" onClick={openInvitation}><MonogramLogo className="door-monogram"/></button><h1>Muthu <em className="ampersand">&amp;</em> Deepika</h1><button onClick={openInvitation}>Open our invitation <span>↗</span></button></div>
  </div>
 {opened && <CelebrationBurst/>}
 <audio ref={audioRef} loop preload="auto" src={`${A}Hey%20Minnale%20Ringtone%20Bgm%20Melting%20Lines.mp3`} />
 <button className="sound sticky-sound" aria-label="Toggle music" onClick={toggleMusic}>{muted?<VolumeX/>:<Volume2/>}</button>
  <div className="floating-doodles south-doodles" aria-hidden="true"><span className="flower">✿</span><span className="sparkle">✦</span><span className="flower">❀</span><span className="heart">♥</span><span className="flower">✽</span><span className="sparkle">✧</span><span className="flower">❋</span><span className="heart">♥</span><span className="sparkle">✦</span><span className="flower">✿</span></div>
  <section className="hero" id="home">
   <div className="hero-pattern pattern-left">❁</div><div className="hero-pattern pattern-right">❁</div><div className="grain"></div>
   <nav><button className="monogram" aria-label="Back to top" onClick={()=>scroll('home')}>M<span>&amp;</span>D</button><div className="nav-links"><button onClick={()=>scroll('family')}>Families</button><button onClick={()=>scroll('events')}>Events</button><button onClick={()=>scroll('venue')}>Venue</button></div></nav>
   <div className="hero-copy">
    <p className="invite-line">Together with our families</p><p className="invite-line second">we joyfully invite you to celebrate</p>
    <div className="names"><span>Muthu</span><em className="ampersand">&amp;</em><span>Deepika</span></div>
    <Ornament dark/><p className="date">19 <i>•</i> 20 NOV <i>•</i> 2026</p>
    <button className="outline-button" onClick={()=>scroll('events')}>View celebration <ChevronDown size={15}/></button>
   </div>
   <div className="couple-frame"><div className="arch"></div><img className="couple" src={`${A}hero-couple-alpha.png`} alt="Muthu and Deepika"/></div>
   <div className="hero-footer"><span>Kovur, Chennai</span><span>With love &amp; blessings</span></div>
   {opened && !hasScrolled && <div className="scroll-cue" aria-hidden="true"><ChevronDown size={24}/><ChevronDown size={24}/></div>}
  </section>
  <section className="welcome welcome-copy-only" id="story"><div className="welcome-copy reveal"><p className="section-label">A celebration of love</p><h2>Two hearts,<br/><i>one beautiful</i> journey.</h2><Ornament/><p>With joyful hearts and the blessings of our loved ones, we invite you to celebrate the beginning of our forever.</p><p className="script">Your presence will make our day complete.</p></div><div className="corner-flower">✽</div></section>
  <section className="family" id="family"><div className="family-inner reveal"><p className="section-label">With blessings from our families</p><h2>Two families, <i>one forever</i></h2><Ornament/><div className="family-grid"><div><p>Mr. P. Pitchamuthu<br/>&amp; Mrs. P. Gomathi</p><p className="relationship">Their beloved son</p><h3>P. Muthu Krishnan</h3></div><div className="family-heart">♥<span>joining hands with</span></div><div><p>Mr. P. Muthu Balakrishnan<br/>&amp; Mrs. M. Subha</p><p className="relationship">Their beloved daughter</p><h3>M. Deepika</h3></div></div></div></section>
  <section className="events" id="events"><div className="events-heading reveal"><p className="section-label">Save the date</p><h2>Join us for the <i>celebration</i></h2><Ornament dark/></div><div className="event-list">{eventData.map((e,i)=><article className={`event ${e.className} reveal`} key={e.kind}><div className="event-number">0{i+1}</div><div className="event-title"><p>{e.kind}</p><h3>{e.title}</h3></div><div className="event-info"><span><CalendarDays/> {e.date}</span><span><Clock3/> {e.time}</span><span><MapPin/> {e.venue}</span></div><button onClick={()=>scroll('venue')} aria-label="View venue"><Navigation/></button></article>)}</div></section>
  {celebrationPhase.type !== 'ended' && <section className="reception-countdown" aria-labelledby="reception-countdown-title"><div className="countdown-inner reveal">{celebrationPhase.type === 'reception-countdown' && <><p className="section-label">Counting down to the reception</p><h2 id="reception-countdown-title">A sparkling evening<br/><i>awaits.</i></h2><Ornament/><div className="countdown-grid" aria-live="polite">{Object.entries(celebrationPhase.countdown).map(([label,value])=><div className="countdown-unit" key={label}><strong>{String(value).padStart(2,'0')}</strong><span>{label}</span></div>)}</div><p className="countdown-details">Thursday, 19 November 2026 · 6:30 PM onwards · MGM Mahal, Kovur</p></>}{celebrationPhase.type === 'reception-live' && <><p className="section-label">The reception has begun</p><h2 id="reception-countdown-title">The reception is<br/><i>in full swing.</i></h2><Ornament/><p className="celebration-live-message">Come celebrate this beautiful evening with us.</p><p className="countdown-details">MGM Mahal, Kovur · Until 10:00 PM</p></>}{celebrationPhase.type === 'wedding-countdown' && <><p className="section-label">Counting down to the wedding</p><h2 id="reception-countdown-title">The sacred union<br/><i>awaits.</i></h2><Ornament/><div className="countdown-grid" aria-live="polite">{Object.entries(celebrationPhase.countdown).map(([label,value])=><div className="countdown-unit" key={label}><strong>{String(value).padStart(2,'0')}</strong><span>{label}</span></div>)}</div><p className="countdown-details">Friday, 20 November 2026 · 9:00 AM · MGM Mahal, Kovur</p></>}{celebrationPhase.type === 'wedding-live' && <><p className="section-label">The wedding ceremony is underway</p><h2 id="reception-countdown-title">Two souls, one<br/><i>sacred forever.</i></h2><Ornament/><p className="celebration-live-message">We welcome your blessings as Muthu and Deepika begin their forever.</p><p className="countdown-details">MGM Mahal, Kovur · Ceremony concludes at 10:05 AM</p></>}</div></section>}
  <section className="music-note"><div className="music-inner reveal"><p className="section-label">Set the mood before you arrive</p><h2>Our soundtrack<br/><i>to forever.</i></h2><a className="music-code" href="https://open.spotify.com/track/03fzjLAmEIlVMHUfX9zIxo?si=271baf84c0374535&autoplay=true" target="_blank" rel="noreferrer" aria-label="Open and play our soundtrack on Spotify"><img src={`${A}spotify-code.png`} alt="Spotify code for Muthu and Deepika's soundtrack"/></a><p>Scan the Spotify code, press play, and join the vibe.</p></div></section>
  <section className="venue" id="venue"><div className="venue-heading reveal"><p className="section-label">The venue</p><h2>A place where memories<br/><i>will be made</i></h2><Ornament/></div><div className="venue-grid"><div className="venue-card reveal"><div className="map-art"><img src={`${A}location%20logo.png`} alt="MGM Mahal location"/></div><h3>MGM Mahal</h3><p>Kovur<br/>Chennai</p><a href="https://www.google.com/maps/search/?api=1&query=MGM+Mahal+Kovur+Chennai" target="_blank" rel="noreferrer">Get directions <Navigation size={16}/></a></div><div className="qr-card reveal"><a className="qr-wrap" href="https://www.google.com/maps/search/?api=1&query=MGM+Mahal+Kovur+Chennai" target="_blank" rel="noreferrer" aria-label="Open MGM Mahal directions in Google Maps"><img src={`${A}mahal%20qr-code.png`} alt="QR code for MGM Mahal location"/></a><p className="section-label">Finding us is easy</p><h3>Scan to find<br/>the venue</h3><span><QrCode size={17}/> Scan with your phone camera</span></div></div></section>
  <section className="closing-note"><div className="closing-inner reveal"><p className="section-label">With love</p><h2>A little love, a lot of laughter,<br/><i>and one happy forever.</i></h2><Ornament dark/><p>For any assistance, reach out: +91 95518 81620 &nbsp; | &nbsp; +91 88700 50341</p><small>#MeetTheMuthuDeepika</small></div></section>
  <footer className="site-footer"><span>© {new Date().getFullYear()} Muthu &amp; Deepika</span><span>Powered by <em>PM</em> & <em>GRD</em></span></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
