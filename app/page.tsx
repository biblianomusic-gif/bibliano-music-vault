'use client';
import { useEffect, useState, useMemo } from 'react';

export default function MusicVault() {
    const [songs, setSongs] = useState([]);
    const [karaokes, setKaraokes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTrack, setCurrentTrack] = useState<{name: string, url: string} | null>(null);

    const API_KEY = "AIzaSyDtx-gU2arlpCs7gbMo0xQBXYE2HEe-JBE";
    const SONGS_ID = "18HakeSKjoia_LpowlJ1AEnY8azDYGmfZ"; 
    const KARAOKE_ID = "1i82F8nxbqTIrZhND-NgBpc4wVvR713lB";
    
    const ZIP_FILE_ID = "1bW3ffYEqwl2wSS0BooUJa04aroQj3WdR"; 
    const DIRECT_DOWNLOAD_LINK = `https://drive.google.com/uc?export=download&id=${ZIP_FILE_ID}`;

    useEffect(() => {
        const fetchFolder = async (id: string) => {
            try {
                const query = encodeURIComponent(`'${id}' in parents and trashed = false`);
                const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webContentLink)&key=${API_KEY}`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.error) return [];
                return (data.files || []).sort((a: any, b: any) => 
                    a.name.localeCompare(b.name, undefined, {numeric: true, sensitivity: 'base'})
                );
            } catch (error) { return []; }
        };
        Promise.all([fetchFolder(SONGS_ID), fetchFolder(KARAOKE_ID)]).then(([s, k]) => {
            setSongs(s); setKaraokes(k); setLoading(false);
        });
    }, []);

    const playTrack = (file: any) => {
        const streamUrl = `https://drive.google.com/file/d/${file.id}/preview`;
        setCurrentTrack({ name: file.name.replace(/\.[^/.]+$/, ""), url: streamUrl });
    };

    const filteredSongs = useMemo(() => 
        songs.filter((s: any) => s.name.toLowerCase().includes(searchQuery.toLowerCase())), 
    [songs, searchQuery]);

    const filteredKaraokes = useMemo(() => 
        karaokes.filter((k: any) => k.name.toLowerCase().includes(searchQuery.toLowerCase())), 
    [karaokes, searchQuery]);

    return (
        <div className="min-h-screen bg-[#080808] text-white font-sans p-6 md:p-12 pb-64">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER - RESTORED TO ORIGINAL IMAGE LAYOUT */}
                <header className="mb-12 flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-white/5 pb-10">
                    <div className="text-left">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Bibliano Music <span className="text-[#10b981]">Vault</span> - <span className="text-purple-500">Hindi Qurbana Songs & Karaoke Tracks</span>
                        </h1>
                        <p className="text-white/70 text-[11px] font-bold tracking-[0.2em] uppercase mt-2">
                            MALANKARA ORTHODOX SYRIAN CHURCH
                        </p>
                    </div>

                    <a 
                        href={DIRECT_DOWNLOAD_LINK} 
                        className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap"
                    >
                        📦 DOWNLOAD COMPLETE LIBRARY (.ZIP)
                    </a>
                </header>

                {/* SEARCH */}
                <div className="relative mb-12 max-w-md">
                    <input 
                        type="text"
                        placeholder="Search for a song or track name..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-purple-500 transition-all"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="py-20 text-center text-white/20 animate-pulse tracking-widest uppercase">Initializing Vault...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                        {/* Songs */}
                        <section>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-purple-500 mb-6 flex items-center gap-2">
                                <span className="w-4 h-[1px] bg-purple-500"></span> Hindi Qurbana Songs
                            </h2>
                            <div className="space-y-1">
                                {filteredSongs.map((f: any) => (
                                    <div key={f.id} className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all">
                                        <p className="text-sm text-white/70 group-hover:text-white truncate pr-4">{f.name.replace(/\.[^/.]+$/, "")}</p>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => playTrack(f)} className="text-[9px] font-bold uppercase bg-purple-600/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all">Play</button>
                                            <a href={f.webContentLink} title="Download" className="text-amber-400/60 hover:text-amber-400 text-xl px-1 transition-transform hover:scale-125">↓</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Karaoke */}
                        <section>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-2">
                                <span className="w-4 h-[1px] bg-indigo-400"></span> Karaoke Tracks
                            </h2>
                            <div className="space-y-1">
                                {filteredKaraokes.map((f: any) => (
                                    <div key={f.id} className="group flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-all">
                                        <p className="text-sm text-white/70 group-hover:text-white truncate pr-4">{f.name.replace(/\.[^/.]+$/, "")}</p>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => playTrack(f)} className="text-[9px] font-bold uppercase bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">Play</button>
                                            <a href={f.webContentLink} title="Download" className="text-amber-400/60 hover:text-amber-400 text-xl px-1 transition-transform hover:scale-125">↓</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* --- FOOTER: IDENTITY LEFT | SOCIALS RIGHT | COPYRIGHT CENTERED --- */}
                <footer className="mt-20 pt-10 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                        {/* LEFT */}
                        <div className="space-y-1 text-left">
                            <p className="text-lg font-bold text-white tracking-tight">Bibliano Music</p>
                            <p className="text-sm text-white font-medium">Founded by Robin Thomas</p>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-3 text-sm text-white font-medium">
                            <a href="https://facebook.com/biblianomusic" target="_blank" className="hover:underline">Facebook</a>
                            <span className="text-white/30">|</span>
                            <a href="https://instagram.com/biblianomusic" target="_blank" className="hover:underline">Instagram</a>
                            <span className="text-white/30">|</span>
                            <a href="https://youtube.com/@biblianomusic" target="_blank" className="hover:underline">YouTube</a>
                        </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="pt-8 border-t border-white/[0.02] text-center">
                        <p className="text-sm text-white font-medium">
                            © 2026 Bibliano Music. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            {/* PLAYER BAR */}
            {currentTrack && (
                <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 z-50">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 min-w-0 md:text-left text-center">
                            <p className="text-[8px] font-bold text-[#10b981] uppercase tracking-[0.4em] mb-1">Playing Now</p>
                            <h3 className="text-sm font-bold text-white/95 truncate">{currentTrack.name}</h3>
                        </div>
                        <div className="w-full md:w-[500px] h-[54px] overflow-hidden rounded-xl bg-black/50 border border-white/10">
                            <iframe src={currentTrack.url} className="w-full h-[150px] -mt-[50px] grayscale opacity-80" allow="autoplay"></iframe>
                        </div>
                        <button onClick={() => setCurrentTrack(null)} className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest">[ CLOSE ]</button>
                    </div>
                </div>
            )}
        </div>
    );
}
