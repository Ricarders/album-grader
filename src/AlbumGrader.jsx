import React, { useState, useMemo, useRef } from 'react';
import { 
  Plus, Trash2, Disc, Music, Trophy, Calculator, 
  Check, ChevronLeft, Download, Upload, Save, Edit3, 
  Calendar, Tag, Image as ImageIcon, User, ExternalLink, Copy, AlertTriangle, Star, Mic2,
  LineChart, X
} from 'lucide-react';

// --- HELPER FUNCTIONS ---

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const GENRES = ['Rock', 'Metal', 'Pop', 'Rap', 'Blues', 'Other'];

const calculateStats = (songs) => {
  const ratedSongs = songs.filter((s) => s.rating !== '' && s.rating !== null && !isNaN(s.rating));
  const n = ratedSongs.length;

  if (n === 0) return { n: 0, s: 0, finalGrade: 0, rawAverage: 0, droppedIds: new Set() };

  // s = (n-1)/4 rounded down
  const s = Math.floor((n - 1) / 4);

  // Raw Average
  const rawTotal = ratedSongs.reduce((sum, song) => sum + Number(song.rating), 0);
  const rawAverage = (rawTotal / n).toFixed(1);

  // Sort to find drops
  const sortedByRating = [...ratedSongs].sort((a, b) => a.rating - b.rating);
  
  // Identify drops
  const songsToDrop = sortedByRating.slice(0, s);
  const droppedIds = new Set(songsToDrop.map(song => song.id));

  // Calculate Adjusted Grade
  const songsToCount = sortedByRating.slice(s);
  let adjustedTotalScore = 0;
  if (songsToCount.length > 0) {
    adjustedTotalScore = songsToCount.reduce((sum, song) => sum + Number(song.rating), 0);
  }
  const finalGrade = songsToCount.length > 0 ? (adjustedTotalScore / songsToCount.length).toFixed(1) : 0;

  return {
    n,
    s,
    finalGrade,
    rawAverage,
    droppedIds
  };
};

const sortAlbums = (albums) => {
  return [...albums].map(album => {
    const stats = calculateStats(album.songs);
    return { ...album, stats };
  }).sort((a, b) => {
    // 1. Final Grade (Desc)
    const gradeDiff = Number(b.stats.finalGrade) - Number(a.stats.finalGrade);
    if (gradeDiff !== 0) return gradeDiff;

    // 2. Raw Average (Desc)
    const avgDiff = Number(b.stats.rawAverage) - Number(a.stats.rawAverage);
    if (avgDiff !== 0) return avgDiff;

    // 3. Track Count (Desc) - "One with more tracks on top"
    const countDiff = b.stats.n - a.stats.n;
    if (countDiff !== 0) return countDiff;

    // 4. Alphabetical (Asc)
    return (a.title || '').localeCompare(b.title || '');
  });
};

const calculateArtistStats = (albums) => {
  const artistMap = {};
  
  // Group albums by artist
  albums.forEach(album => {
    const artistName = album.artist || 'Unknown Artist';
    if (!artistMap[artistName]) {
      artistMap[artistName] = [];
    }
    artistMap[artistName].push(album);
  });

  // Calculate stats for each artist
  const artistStats = Object.keys(artistMap).map(artistName => {
    const artistAlbums = artistMap[artistName];
    // Calculate stats for each album to get their grades
    const albumsWithStats = artistAlbums.map(a => ({ ...a, stats: calculateStats(a.songs) }));
    
    // Average of every album's grade
    const totalGrade = albumsWithStats.reduce((sum, a) => sum + Number(a.stats.finalGrade), 0);
    const averageRating = albumsWithStats.length > 0 ? (totalGrade / albumsWithStats.length).toFixed(1) : 0;

    return {
      name: artistName,
      albumCount: albumsWithStats.length,
      rating: averageRating,
      albums: albumsWithStats 
    };
  });

  // Sort by Rating (Desc), then Album Count (Desc), then Name (Asc)
  return artistStats.sort((a, b) => {
    const rateDiff = Number(b.rating) - Number(a.rating);
    if (rateDiff !== 0) return rateDiff;
    const countDiff = b.albumCount - a.albumCount;
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });
};

// --- SUB-COMPONENTS ---

// NEW: GRAPH COMPONENT
const AlbumGraph = ({ albums }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // 1. Prepare Data
  const data = useMemo(() => {
    return albums
      .map(a => ({
          id: a.id,
          title: a.title,
          artist: a.artist,
          year: parseInt(a.year),
          grade: parseFloat(a.stats.finalGrade)
      }))
      .filter(item => !isNaN(item.year) && !isNaN(item.grade))
      .sort((a, b) => a.year - b.year);
  }, [albums]);

  if (data.length === 0) return <div className="bg-neutral-800/30 p-8 rounded-xl border border-neutral-700 border-dashed text-center text-neutral-500 text-sm mb-6">No albums with valid release years found to display graph.</div>;

  // 2. Constants for SVG
  const width = 1000;
  const height = 400;
  const padding = 60;
  
  // X Axis calculations
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));
  const yearRange = maxYear === minYear ? 1 : maxYear - minYear;
  
  // Y Axis calculations (Dynamic Range)
  const minGrade = Math.min(...data.map(d => d.grade));
  const maxGrade = Math.max(...data.map(d => d.grade));
  
  // Add a small buffer to the Y domain so points aren't on the absolute edge
  const buffer = 0.5; 
  const domainMin = Math.max(0, minGrade - buffer);
  const domainMax = Math.min(10, maxGrade + buffer);
  const gradeRange = domainMax - domainMin || 1; // Prevent div by zero

  // Coordinate helpers
  const getX = (year) => {
     if (maxYear === minYear) return width / 2;
     return padding + ((year - minYear) / yearRange) * (width - (padding * 2));
  };
  
  const getY = (grade) => {
     // Map grade based on dynamic domainMin/domainMax
     return height - padding - ((grade - domainMin) / gradeRange) * (height - (padding * 2));
  };

  // Generate dynamic ticks for Y axis
  const yTicks = [];
  const numTicks = 5;
  for (let i = 0; i < numTicks; i++) {
    const val = domainMin + (i * (gradeRange / (numTicks - 1)));
    yTicks.push(val);
  }

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 shadow-xl relative overflow-hidden">
       <h3 className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
         <LineChart size={14} /> Performance Over Time
       </h3>
       
       <div className="w-full overflow-x-auto">
         <div className="min-w-[600px] relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ maxHeight: '300px' }}>
                {/* Grid Lines Y-Axis */}
                {yTicks.map(val => (
                   <g key={val}>
                      <line 
                        x1={padding} 
                        y1={getY(val)} 
                        x2={width - padding} 
                        y2={getY(val)} 
                        stroke="#404040" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <text 
                        x={padding - 10} 
                        y={getY(val)} 
                        fill="#737373" 
                        fontSize="12" 
                        textAnchor="end" 
                        alignmentBaseline="middle"
                      >
                        {val.toFixed(1)}
                      </text>
                   </g>
                ))}

                {/* Data Points */}
                {data.map((d) => (
                   <g key={d.id}>
                      <circle
                         cx={getX(d.year)}
                         cy={getY(d.grade)}
                         r="6"
                         fill="#ea580c"
                         stroke="#171717"
                         strokeWidth="2"
                         className="hover:r-8 transition-all cursor-pointer"
                         onMouseEnter={() => setHoveredPoint(d)}
                         onMouseLeave={() => setHoveredPoint(null)}
                      />
                   </g>
                ))}
                
                {/* X-Axis Labels (Min/Max) */}
                <text x={padding} y={height - 20} fill="#737373" fontSize="12" textAnchor="middle">{minYear}</text>
                {maxYear !== minYear && (
                   <text x={width - padding} y={height - 20} fill="#737373" fontSize="12" textAnchor="middle">{maxYear}</text>
                )}
            </svg>

            {/* Tooltip Overlay */}
            {hoveredPoint && (
               <div 
                  className="absolute bg-neutral-800 text-white text-xs p-2 rounded border border-neutral-600 shadow-xl pointer-events-none z-10 whitespace-nowrap"
                  style={{ 
                     left: `${(getX(hoveredPoint.year) / width) * 100}%`, 
                     top: `${(getY(hoveredPoint.grade) / height) * 100}%`,
                     transform: 'translate(-50%, -120%)'
                  }}
               >
                  <div className="font-bold text-orange-400">{hoveredPoint.title}</div>
                  <div className="text-neutral-400">{hoveredPoint.year} • Grade: {hoveredPoint.grade}</div>
               </div>
            )}
         </div>
       </div>
    </div>
  );
};

// NEW: ALBUM DETAIL (Read Only View)
const AlbumDetail = ({ album, onEdit, onBack, onArtistClick }) => {
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => calculateStats(album.songs), [album.songs]);

  const handleExportText = () => {
    const lines = [];
    lines.push(`Album: ${album.title || 'Untitled'}`);
    lines.push(`Artist: ${album.artist || 'Unknown'}`);
    lines.push(`Year: ${album.year || 'Unknown'}`);
    lines.push(`Genre: ${album.genre || 'Unknown'}`);
    lines.push('--------------------------------');
    lines.push(`Total Songs: ${stats.n}`);
    lines.push(`Skipped: ${stats.s}`);
    lines.push(`Average: ${stats.rawAverage}`);
    lines.push(`Grade: ${stats.finalGrade}`);
    lines.push('--------------------------------');
    album.songs.forEach((song, idx) => {
      const isDropped = stats.droppedIds.has(song.id);
      lines.push(`${idx + 1}. ${song.name || 'Untitled'} - ${song.rating || '-'} ${isDropped ? '[Skipped]' : ''}`);
    });
    
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
        <div className="flex gap-2">
           <button
            onClick={handleExportText}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-sm font-medium transition-colors border border-neutral-700"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button
            onClick={() => onEdit(album)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-orange-900/20"
          >
            <Edit3 size={16} /> Edit
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-3 md:gap-6 mb-6 items-stretch">
        
        {/* Left Column: Cover Art (Increased Width + Square) */}
        <div className="w-[45%] sm:w-[40%] md:w-72 flex-shrink-0">
          <div className="aspect-square w-full bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden shadow-2xl relative">
            {album.coverArt ? (
              <img src={album.coverArt} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-neutral-600">
                <Disc size={32} className="mb-2 opacity-20" />
                <span className="text-[10px] uppercase tracking-wider">No Art</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Info & Stats */}
        <div className="flex-1 flex flex-col gap-2 min-w-0 h-auto justify-between">
          {/* Info Box */}
          <div className="bg-neutral-800/50 rounded-2xl p-3 md:p-6 border border-neutral-700 backdrop-blur-sm flex-grow flex flex-col justify-center">
             <h1 className="text-xl md:text-4xl font-black text-white leading-tight mb-1 md:mb-2 truncate">{album.title || 'Untitled Album'}</h1>
             <div className="text-neutral-400 text-xs md:text-lg flex items-center gap-2 mb-3 md:mb-6">
               <User size={14} className="text-orange-500 flex-shrink-0 md:w-[18px] md:h-[18px]"/>
               <button 
                 onClick={() => onArtistClick(album.artist)}
                 className="hover:text-orange-400 hover:underline decoration-orange-400/50 underline-offset-4 transition-colors text-left truncate"
               >
                 {album.artist || 'Unknown Artist'}
               </button>
             </div>
             
             <div className="flex flex-wrap gap-2 md:gap-3">
                {album.year && (
                  <div className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-neutral-800 rounded-lg border border-neutral-600 text-neutral-300 text-[10px] md:text-sm">
                    <Calendar size={10} className="text-neutral-500 md:w-[12px] md:h-[12px]" />
                    {album.year}
                  </div>
                )}
                {album.genre && (
                  <div className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-neutral-800 rounded-lg border border-neutral-600 text-neutral-300 text-[10px] md:text-sm">
                    <Tag size={10} className="text-neutral-500 md:w-[12px] md:h-[12px]" />
                    {album.genre}
                  </div>
                )}
             </div>
          </div>

          {/* Stats Box - Only Grade and Average */}
          <div className="grid grid-cols-2 gap-2 h-auto flex-grow">
            <div className="bg-neutral-800 rounded-2xl p-2 md:p-4 border border-neutral-700 text-center flex flex-col justify-center h-full">
              <span className="text-orange-200/70 text-[10px] md:text-xs font-medium block mb-0.5">Average</span>
              <span className="text-lg md:text-2xl font-bold text-orange-200">{stats.rawAverage || '--'}</span>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-2 md:p-4 border border-orange-500/50 text-center shadow-lg shadow-orange-900/20 flex flex-col justify-center h-full">
              <span className="text-orange-100 text-[10px] md:text-xs font-medium block mb-0.5">Grade</span>
              <span className="text-2xl md:text-4xl font-black text-white">{stats.finalGrade || '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Song List (Read Only) */}
      <div className="space-y-3">
        {album.songs.map((song, index) => {
          return (
            <div key={song.id} className="flex items-center gap-4 bg-neutral-800 p-3 rounded-xl border border-neutral-700">
              <div className="w-8 text-center text-neutral-500 font-mono text-sm">{index + 1}</div>
              <div className="flex-grow text-neutral-200 font-medium">
                {song.name || 'Untitled Track'}
              </div>
              <div className="w-14 text-center font-bold text-orange-400">
                {song.rating !== '' ? song.rating : '-'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 1. ALBUM EDITOR (Input Only)
const AlbumEditor = ({ album, onSave, onBack, onDelete }) => {
  const [title, setTitle] = useState(album.title || '');
  const [artist, setArtist] = useState(album.artist || '');
  const [year, setYear] = useState(album.year || '');
  const [genre, setGenre] = useState(album.genre || 'Rock');
  const [coverArt, setCoverArt] = useState(album.coverArt || '');
  const [songs, setSongs] = useState(album.songs || [{ id: generateId(), name: '', rating: '' }]);

  const addSong = () => {
    setSongs([...songs, { id: generateId(), name: '', rating: '' }]);
  };

  const removeSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const updateSong = (id, field, value) => {
    setSongs(songs.map((song) => {
      if (song.id === id) {
        if (field === 'rating') {
          if (value === '') return { ...song, rating: '' };
          let num = parseInt(value, 10);
          if (isNaN(num)) return { ...song, rating: '' };
          if (num < 0) num = 0;
          if (num > 10) num = 10;
          return { ...song, rating: num };
        }
        return { ...song, [field]: value };
      }
      return song;
    }));
  };

  const handleSave = () => {
    onSave({
      ...album,
      title,
      artist,
      year,
      genre,
      coverArt,
      songs,
      updatedAt: Date.now()
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(album.id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-red-900/20"
          >
            <Trash2 size={16} /> Delete Album
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-colors shadow-lg shadow-orange-900/20"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-3 md:gap-6 mb-6 items-stretch">
        {/* Cover Art Preview & Input (Fixed Width + Square) */}
        <div className="w-[45%] sm:w-[40%] md:w-72 flex-shrink-0">
          <div className="aspect-square w-full bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden relative group">
            {coverArt ? (
              <img src={coverArt} alt="Cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
                <Disc size={32} className="mb-2 opacity-20" />
                <span className="text-[10px] uppercase tracking-wider">No Cover Art</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 md:p-6">
              <div className="w-full">
                <label className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1 md:mb-2 block">Image URL</label>
                <input
                  type="text"
                  value={coverArt}
                  onChange={(e) => setCoverArt(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Inputs */}
        <div className="flex-1 flex flex-col gap-2 min-w-0 bg-neutral-800/50 rounded-2xl p-3 md:p-6 border border-neutral-700 backdrop-blur-sm h-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">Album Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Album Title"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-lg"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">Artist</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist Name"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-lg"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">Year</label>
              <div className="relative">
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 1973"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-lg pl-8 md:pl-10"
                />
                <Calendar size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 md:w-[18px] md:h-[18px]" />
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">Genre</label>
              <div className="relative">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-lg appearance-none pl-8 md:pl-10"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <Tag size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500 md:w-[18px] md:h-[18px]" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[12px] md:h-[12px]">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-3">
        {songs.map((song, index) => {
          return (
            <div key={song.id} className="flex items-center gap-4 bg-neutral-800 p-3 rounded-xl border border-neutral-700">
              <div className="w-8 text-center text-neutral-500 font-mono text-sm">{index + 1}</div>
              <input
                type="text"
                value={song.name}
                onChange={(e) => updateSong(song.id, 'name', e.target.value)}
                placeholder="Track Title"
                className="flex-grow bg-transparent border-none p-0 focus:ring-0 text-neutral-200"
              />
              <input
                type="number"
                value={song.rating}
                onChange={(e) => updateSong(song.id, 'rating', e.target.value)}
                placeholder="-"
                className="w-14 bg-neutral-900 border rounded-lg px-2 py-1 text-center font-bold focus:outline-none focus:border-orange-500 border-neutral-600 text-orange-400"
              />
              <button onClick={() => removeSong(song.id)} className="text-neutral-600 hover:text-red-400 p-1">
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
        <button onClick={addSong} className="w-full py-4 rounded-xl border-2 border-dashed border-neutral-700 text-neutral-500 hover:border-orange-500/50 hover:text-orange-400 hover:bg-neutral-800/50 transition-all flex items-center justify-center gap-2">
          <Plus size={20} /> Add Track
        </button>
      </div>
    </div>
  );
};

// 2. ARTIST PROFILE
const ArtistProfile = ({ artistName, albums, artistImage, onUpdateImage, onBack, onViewAlbum }) => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(artistImage || '');
  const [showGraph, setShowGraph] = useState(false);

  // Sort albums for this artist
  const artistAlbums = useMemo(() => sortAlbums(albums), [albums]);

  // Calculate Artist Rating (Average of all album grades)
  const artistRating = useMemo(() => {
    if (artistAlbums.length === 0) return 0;
    const total = artistAlbums.reduce((acc, a) => acc + Number(a.stats.finalGrade), 0);
    return (total / artistAlbums.length).toFixed(1);
  }, [artistAlbums]);

  const handleSaveImage = () => {
    onUpdateImage(artistName, imageUrlInput);
    setIsEditingImage(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ... (rest of ArtistProfile same as before) ... */}
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4">
          <ChevronLeft size={20} /> Back to Library
        </button>
        
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-neutral-800/50 p-6 rounded-3xl border border-neutral-700 mb-6">
          <div className="relative group w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
             <div className="w-full h-full rounded-full overflow-hidden border-4 border-neutral-800 shadow-xl bg-neutral-800">
                {artistImage ? (
                  <img src={artistImage} alt={artistName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-900">
                    <User size={48} />
                  </div>
                )}
             </div>
             <button 
                onClick={() => setIsEditingImage(!isEditingImage)}
                className="absolute bottom-0 right-0 p-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-500 transition-colors"
             >
               <Edit3 size={16} />
             </button>
          </div>
          
          <div className="flex-grow text-center md:text-left space-y-2">
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{artistName}</h1>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                <span className="bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-neutral-300 text-sm">
                   {artistAlbums.length} Albums
                </span>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-orange-900/20 flex items-center gap-1">
                   <Star size={14} className="fill-white" />
                   Artist Rating: {artistRating}
                </span>
             </div>
          </div>
        </div>

        {isEditingImage && (
          <div className="mt-4 mb-6 bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex gap-2 animate-in fade-in">
             <input 
                type="text" 
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste Artist Image URL..."
                className="flex-grow bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
             />
             <button onClick={handleSaveImage} className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white font-medium">
               Save URL
             </button>
          </div>
        )}
      </div>

      {/* GRAPH TOGGLE SECTION */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Disc className="text-orange-500" /> Discography
        </h2>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showGraph ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
        >
          {showGraph ? <X size={16} /> : <LineChart size={16} />}
          {showGraph ? 'Hide Graph' : 'Show Graph'}
        </button>
      </div>

      {showGraph && <AlbumGraph albums={artistAlbums} />}

      <div className="space-y-4">
        {artistAlbums.map((album, index) => (
           <div 
            key={album.id}
            onClick={() => onViewAlbum(album)}
            className="group bg-neutral-800 hover:bg-neutral-800/80 p-4 rounded-xl border border-neutral-700 hover:border-orange-500/50 transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-700">
                {album.coverArt ? (
                  <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-700">
                    <Disc size={24} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                 <div className={`w-8 flex justify-center font-bold text-lg ${
                    index === 0 ? 'text-orange-400' :
                    index === 1 ? 'text-orange-300' :
                    index === 2 ? 'text-orange-200' :
                    'text-white'
                 }`}>
                    {index + 1}
                  </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight group-hover:text-orange-400 transition-colors">{album.title || 'Untitled Album'}</h3>
                  <div className="text-neutral-500 text-xs flex items-center gap-2 mt-1">
                    <span>{album.year || '----'}</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-neutral-700/50 border border-neutral-700">{album.genre}</span>
                     <span>•</span>
                     <span>{album.stats.n} tracks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-neutral-500 uppercase tracking-wider">Grade</div>
              <div className="text-3xl font-black text-white">{album.stats.finalGrade}</div>
              <div className="text-[10px] text-neutral-600">Avg: {album.stats.rawAverage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. ARTIST RANKING LIST
const ArtistRankingList = ({ albums, artistImages, onArtistClick }) => {
  const rankedArtists = useMemo(() => calculateArtistStats(albums), [albums]);

  return (
     <div className="animate-in fade-in duration-500">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Mic2 className="text-orange-500" size={20} /> Artist Rankings
        </h2>

        {rankedArtists.length === 0 ? (
          <div className="text-center py-20 bg-neutral-800/30 rounded-2xl border border-neutral-800 border-dashed">
             <User size={48} className="mx-auto text-neutral-600 mb-4" />
             <h3 className="text-neutral-400 font-medium">No artists found</h3>
          </div>
        ) : (
           <div className="grid gap-3">
              {rankedArtists.map((artist, index) => {
                 const imageUrl = artistImages[artist.name];
                 return (
                   <div 
                      key={artist.name}
                      onClick={() => onArtistClick(artist.name)}
                      className="group bg-neutral-800 hover:bg-neutral-800/80 p-3 sm:p-4 rounded-xl border border-neutral-700 hover:border-orange-500/50 transition-all flex items-center justify-between cursor-pointer"
                   >
                      <div className="flex items-center gap-4">
                         <div className={`w-10 flex-shrink-0 flex items-center justify-center font-bold text-xl ${
                            index === 0 ? 'text-orange-400' :
                            index === 1 ? 'text-orange-300' :
                            index === 2 ? 'text-orange-200' :
                            'text-white'
                         }`}>
                            {index + 1}
                         </div>

                         {/* Artist Image Thumbnail */}
                         <div className="w-12 h-12 rounded-full bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-700 hidden sm:block">
                            {imageUrl ? (
                               <img src={imageUrl} alt={artist.name} className="w-full h-full object-cover" />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                  <User size={20} />
                               </div>
                            )}
                         </div>
                         
                         <div>
                            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-orange-400 transition-colors">{artist.name}</h3>
                            <p className="text-neutral-400 text-sm mt-0.5">{artist.albumCount} Album{artist.albumCount !== 1 ? 's' : ''}</p>
                         </div>
                      </div>

                      <div className="text-right">
                         <div className="text-xs text-neutral-500 uppercase tracking-wider">Rating</div>
                         <div className="text-2xl font-black text-white">{artist.rating}</div>
                      </div>
                   </div>
                 );
              })}
           </div>
        )}
     </div>
  );
};

// 4. ALBUM LIBRARY
const AlbumLibrary = ({ albums, onDelete, onViewAlbum, onArtistClick }) => {
  const [showGraph, setShowGraph] = useState(false);
  const rankedAlbums = useMemo(() => sortAlbums(albums), [albums]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Ranking List Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="text-orange-500" size={20} /> Album Rankings
        </h2>
         <button
          onClick={() => setShowGraph(!showGraph)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showGraph ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
        >
          {showGraph ? <X size={16} /> : <LineChart size={16} />}
          {showGraph ? 'Hide Graph' : 'Show Graph'}
        </button>
      </div>

      {showGraph && <AlbumGraph albums={rankedAlbums} />}
        
      {rankedAlbums.length === 0 ? (
        <div className="text-center py-20 bg-neutral-800/30 rounded-2xl border border-neutral-800 border-dashed">
          <Disc size={48} className="mx-auto text-neutral-600 mb-4" />
          <h3 className="text-neutral-400 font-medium">Your library is empty</h3>
          <p className="text-neutral-600 text-sm mt-2">Create a new album or import a backup to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {rankedAlbums.map((album, index) => (
            <div 
              key={album.id}
              onClick={() => onViewAlbum(album)}
              className="group bg-neutral-800 hover:bg-neutral-800/80 p-3 sm:p-4 rounded-xl border border-neutral-700 hover:border-orange-500/50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className={`w-10 flex-shrink-0 flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'text-orange-400' :
                    index === 1 ? 'text-orange-300' :
                    index === 2 ? 'text-orange-200' :
                    'text-white'
                }`}>
                  {index + 1}
                </div>
                
                {/* Cover Art Thumbnail */}
                <div className="w-12 h-12 rounded-md bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-700 hidden sm:block">
                    {album.coverArt ? (
                      <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-700">
                        <Disc size={20} />
                      </div>
                    )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-white text-lg leading-tight truncate group-hover:text-orange-400 transition-colors">{album.title || 'Untitled Album'}</h3>
                  <p className="text-neutral-400 text-sm flex items-center gap-2 mt-1 truncate">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onArtistClick(album.artist); }}
                      className="hover:text-orange-400 hover:underline decoration-orange-400/50 underline-offset-2 transition-colors"
                    >
                      {album.artist || 'Unknown Artist'}
                    </button>
                    {album.year && (
                      <>
                        <span className="text-neutral-600">•</span>
                        <span>{album.year}</span>
                      </>
                    )}
                    {album.genre && (
                        <>
                        <span className="text-neutral-600">•</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-neutral-700/50 text-xs border border-neutral-700 hidden sm:inline-block">{album.genre}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Grade</div>
                  <div className="text-2xl font-black text-white">{album.stats.finalGrade}</div>
                </div>
                
                {/* No Delete Button Here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const AlbumApp = () => {
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'editor' | 'artist'
  const [rankingMode, setRankingMode] = useState('albums'); // 'albums' | 'artists'
  const [albums, setAlbums] = useState([]);
  const [artistImages, setArtistImages] = useState({}); // { "Artist Name": "url" }
  const [currentAlbumId, setCurrentAlbumId] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);

  // Modal States
  const [pendingImport, setPendingImport] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  // Load Album into Detail View
  const handleViewAlbum = (album) => {
    setCurrentAlbumId(album.id);
    setView('detail');
  };

  // Switch from Detail to Editor
  const handleEditAlbum = (album) => {
    setCurrentAlbumId(album.id);
    setView('editor');
  };

  const handleArtistClick = (artistName) => {
    if (!artistName) return;
    setCurrentArtist(artistName);
    setView('artist');
  };

  const handleUpdateArtistImage = (name, url) => {
    setArtistImages(prev => ({
      ...prev,
      [name]: url
    }));
  };

  // Create New Album
  const handleCreateAlbum = () => {
    const newId = generateId();
    const newAlbum = {
      id: newId,
      title: '',
      artist: '',
      year: '',
      genre: 'Rock',
      coverArt: '',
      songs: [{ id: generateId(), name: '', rating: '' }],
      createdAt: Date.now()
    };
    setAlbums([...albums, newAlbum]);
    setCurrentAlbumId(newId);
    setView('editor');
  };

  // Save Album (Update List)
  const handleSaveAlbum = (updatedAlbum) => {
    setAlbums(albums.map(a => a.id === updatedAlbum.id ? updatedAlbum : a));
    // Go back to detail view after saving
    setView('detail');
  };

  // Delete Logic with Custom Modal
  const handleDeleteAlbum = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      setAlbums(albums.filter(a => a.id !== pendingDeleteId));
      
      // If we are deleting the album we are currently viewing/editing, go back to list
      if (pendingDeleteId === currentAlbumId) {
        setView('list');
        setCurrentAlbumId(null);
      }
      
      setPendingDeleteId(null);
    }
  };

  // Export Data
  const handleExportData = () => {
    const dataStr = JSON.stringify({ albums, artistImages, version: 2 }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Generate filename with date and time (YYYY-MM-DD_HH-MM-SS)
    const now = new Date();
    const timestamp = now.toISOString().replace('T', '_').replace(/\..+/, '').replace(/:/g, '-');
    const filename = `album-data-${timestamp}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.download = filename;
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(url);
  };

  // Import Logic with Custom Modal
  const handleImportData = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.albums && Array.isArray(json.albums)) {
           // Store parsed data for confirmation
           setPendingImport(json); 
        } else {
          console.error("Invalid JSON structure");
        }
      } catch (e) {
        console.error("Error parsing JSON", e);
      }
    };
    reader.readAsText(file);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImportData(file);
    }
    e.target.value = '';
  };

  const confirmImport = () => {
    if (pendingImport) {
       setAlbums(pendingImport.albums);
       if (pendingImport.artistImages) {
         setArtistImages(pendingImport.artistImages);
       }
       setPendingImport(null);
       setView('list'); 
    }
  };

  // Calculate stats for header display
  const uniqueArtistCount = useMemo(() => {
    const artists = new Set(albums.map(a => a.artist || 'Unknown Artist'));
    return artists.size;
  }, [albums]);

  // Find current album object for editor/detail
  const activeAlbum = albums.find(a => a.id === currentAlbumId);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-orange-500 selection:text-white pb-20 relative">
      {/* App Header */}
      <header className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('list')}>
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-2 rounded-lg shadow-lg shadow-orange-900/20">
              <Disc size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
              AlbumGrader
            </h1>
          </div>
          <div className="flex items-center gap-4">
             {view === 'list' && (
                <div className="bg-neutral-900/50 p-1 rounded-lg flex gap-1 border border-neutral-700">
                    <button 
                      onClick={() => setRankingMode('albums')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rankingMode === 'albums' ? 'bg-neutral-700 text-white shadow-md border border-neutral-600' : 'text-neutral-500 hover:text-white hover:bg-neutral-700/50'}`}
                    >
                      Album
                    </button>
                    <button 
                      onClick={() => setRankingMode('artists')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${rankingMode === 'artists' ? 'bg-neutral-700 text-white shadow-md border border-neutral-600' : 'text-neutral-500 hover:text-white hover:bg-neutral-700/50'}`}
                    >
                      Artist
                    </button>
                </div>
             )}
            <div className="text-xs text-neutral-500 font-mono hidden md:block">
              {view === 'list' && rankingMode === 'albums' && `${albums.length} Albums`}
              {view === 'list' && rankingMode === 'artists' && `${uniqueArtistCount} Artists`}
              {view === 'detail' && 'Album Details'}
              {view === 'editor' && 'Editing'}
              {view === 'artist' && 'Artist Profile'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {view === 'list' && (
          <>
             {/* Dashboard Actions (Only in List View) */}
             <div className="flex flex-wrap gap-4 items-center justify-between bg-neutral-800/50 p-4 rounded-2xl border border-neutral-700 mb-8 animate-in fade-in slide-in-from-top-4">
                <button
                  onClick={handleCreateAlbum}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white rounded-xl font-bold shadow-lg shadow-orange-900/20 transition-all transform hover:scale-105"
                >
                  <Plus size={20} /> New Album
                </button>

                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl font-medium border border-neutral-600 transition-colors"
                  >
                    <Upload size={18} /> Import JSON
                  </button>
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl font-medium border border-neutral-600 transition-colors"
                  >
                    <Download size={18} /> Export JSON
                  </button>
                </div>
              </div>

             {/* List Content */}
             {rankingMode === 'albums' ? (
                <AlbumLibrary 
                  albums={albums}
                  onDelete={handleDeleteAlbum}
                  onViewAlbum={handleViewAlbum}
                  onArtistClick={handleArtistClick}
                />
             ) : (
                <ArtistRankingList 
                   albums={albums}
                   artistImages={artistImages}
                   onArtistClick={handleArtistClick}
                />
             )}
          </>
        )}
        
        {view === 'detail' && activeAlbum && (
          <AlbumDetail 
            album={activeAlbum}
            onEdit={handleEditAlbum}
            onBack={() => setView('list')}
            onArtistClick={handleArtistClick}
          />
        )}

        {view === 'editor' && activeAlbum && (
          <AlbumEditor 
            album={activeAlbum}
            onSave={handleSaveAlbum}
            onBack={() => setView('detail')} // Back goes to Detail view now
            onDelete={handleDeleteAlbum}
          />
        )}

        {view === 'artist' && currentArtist && (
          <ArtistProfile 
            artistName={currentArtist}
            artistImage={artistImages[currentArtist]}
            albums={albums.filter(a => a.artist === currentArtist)}
            onUpdateImage={handleUpdateArtistImage}
            onViewAlbum={handleViewAlbum}
            onBack={() => setView('list')}
          />
        )}
      </main>

      {/* --- MODALS --- */}

      {/* Import Confirmation Modal */}
      {pendingImport && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-800 rounded-2xl p-6 max-w-sm w-full border border-neutral-700 shadow-2xl scale-100 transform transition-all">
            <div className="flex items-center gap-3 mb-4 text-orange-500">
              <AlertTriangle size={24} />
              <h3 className="text-xl font-bold text-white">Import Library?</h3>
            </div>
            <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
              This will <strong className="text-white">overwrite</strong> your current library with <span className="text-orange-400">{pendingImport.albums.length} albums</span>. 
              <br/><br/>
              This action cannot be undone. Are you sure?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPendingImport(null)}
                className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-xl font-medium text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmImport}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl font-bold text-white transition-colors shadow-lg shadow-orange-900/20"
              >
                Overwrite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-800 rounded-2xl p-6 max-w-sm w-full border border-neutral-700 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <Trash2 size={24} />
              <h3 className="text-xl font-bold text-white">Delete Album?</h3>
            </div>
            <p className="text-neutral-400 mb-6 text-sm">
              Are you sure you want to delete this album? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-xl font-medium text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white transition-colors shadow-lg shadow-red-900/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumApp;