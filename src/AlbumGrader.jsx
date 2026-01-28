import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Plus, Trash2, Disc, Music, Trophy, Calculator, 
  Check, ChevronLeft, Download, Upload, Save, Edit3, 
  Calendar, Tag, Image as ImageIcon, User, ExternalLink, Copy, AlertTriangle, Star, Mic2,
  LineChart, X
} from 'lucide-react';

// --- CONFIGURATION: DEFAULT DATA ---
// Cole o conteúdo do seu JSON aqui para definir a biblioteca padrão para novos usuários.
const DEFAULT_DATA = {
  "albums": [
    {
      "id": "mkedym0iibjcw7ul4qk",
      "title": "Blackbird",
      "artist": "Alter Bridge",
      "year": "2007",
      "genre": "Rock",
      "coverArt": "https://upload.wikimedia.org/wikipedia/en/1/13/Alterbridge_blackbird.jpg",
      "songs": [
        {
          "id": "mkedym0ierdqs7d1tga",
          "name": "Ties That Bind",
          "rating": 10
        },
        {
          "id": "mkee8dwty1ueraorso",
          "name": "Come To Life",
          "rating": 8
        },
        {
          "id": "mkee8hrea3gye54qwv",
          "name": "Brand New Start",
          "rating": 9
        },
        {
          "id": "mkee8le5tu7ukhm74cm",
          "name": "Buried Alive",
          "rating": 8
        },
        {
          "id": "mkee8p7x0zprqcmd3uu",
          "name": "Coming Home",
          "rating": 8
        },
        {
          "id": "mkee8upg83kusg82pg2",
          "name": "Before Tomorrow Comes",
          "rating": 9
        },
        {
          "id": "mkee8yji2v9y80072b",
          "name": "Rise Today",
          "rating": 10
        },
        {
          "id": "mkee945bou6r4q376ud",
          "name": "Blackbird",
          "rating": 10
        },
        {
          "id": "mkee980l62jd0nvu9sy",
          "name": "One By One",
          "rating": 9
        },
        {
          "id": "mkee9csi5d0bnyj0ug7",
          "name": "Watch Over You",
          "rating": 10
        },
        {
          "id": "mkee9gyruhlk71ouq8i",
          "name": "Break Me Down",
          "rating": 8
        },
        {
          "id": "mkee9kiwe54hgsuqq",
          "name": "White Knuckles",
          "rating": 8
        },
        {
          "id": "mkee9ojckpkblvx0a4",
          "name": "Wayward One",
          "rating": 9
        },
        {
          "id": "mkee9swfiafkh66xg6f",
          "name": "We Don’t Care At All ",
          "rating": 7
        }
      ],
      "createdAt": 1768417233138,
      "updatedAt": 1768423323487
    },
    {
      "id": "mkee08wd5yeyph4bc6g",
      "title": "One Day Remains",
      "artist": "Alter Bridge",
      "year": "2004",
      "genre": "Rock",
      "coverArt": "https://i.scdn.co/image/ab67616d0000b273bc7ddb77993dd1d8d19c22a2",
      "songs": [
        {
          "id": "mkee08wdcifmaofa5p6",
          "name": "Find The Real",
          "rating": 8
        },
        {
          "id": "mkee55c0mcn1sslahud",
          "name": "One Day Remains",
          "rating": 8
        },
        {
          "id": "mkee58l4uafz6gd1p1f",
          "name": "Open Your Eyes",
          "rating": 9
        },
        {
          "id": "mkee5ck41h8695syz3k",
          "name": "Burn It Down",
          "rating": 10
        },
        {
          "id": "mkee5jzoxnbeat1ti0m",
          "name": "Metalingus",
          "rating": 9
        },
        {
          "id": "mkee5q834hie3egvs9d",
          "name": "Broken Wings",
          "rating": 10
        },
        {
          "id": "mkee5vo3rs6aggfwcq",
          "name": "In Loving Memory",
          "rating": 10
        },
        {
          "id": "mkee5zu22eem7xdod8k",
          "name": "Down To My Last",
          "rating": 8
        },
        {
          "id": "mkee63msxdyn21n7i4s",
          "name": "Watch Your Word",
          "rating": 9
        },
        {
          "id": "mkee68mvj0262k1irh",
          "name": "Shed My Skin",
          "rating": 9
        },
        {
          "id": "mkee6dvbxkxo2kinqtg",
          "name": "The End Is Here",
          "rating": 10
        }
      ],
      "createdAt": 1768417309453,
      "updatedAt": 1768423287066
    },
    {
      "id": "mkeebnrexyqj00kyrsa",
      "title": "ABIII",
      "artist": "Alter Bridge",
      "year": "2010",
      "genre": "Rock",
      "coverArt": "https://m.media-amazon.com/images/I/91CeiJe3AtL._AC_UF1000,1000_QL80_.jpg",
      "songs": [
        {
          "id": "mkeebnrejqsnuzcszwa",
          "name": "Slip To The Void",
          "rating": 10
        },
        {
          "id": "mkeeclgjbhqb4qxx7jg",
          "name": "Isolation",
          "rating": 10
        },
        {
          "id": "mkeecp82fcqfcyxpav",
          "name": "Ghost of Days Gone By",
          "rating": 10
        },
        {
          "id": "mkeecu07ydcjxfbbal",
          "name": "All Hope Is Gone",
          "rating": 8
        },
        {
          "id": "mkeed2d4lgfzeox294f",
          "name": "Still Remains",
          "rating": 9
        },
        {
          "id": "mkeed60tuj7npycwnn9",
          "name": "Make It Right",
          "rating": 9
        },
        {
          "id": "mkeed9w4ojcup84og2k",
          "name": "Wonderful Life",
          "rating": 10
        },
        {
          "id": "mkeedh5df4p9gsup0yl",
          "name": "I Know It Hurts",
          "rating": 8
        },
        {
          "id": "mkeedn2kcsohd9yyr5m",
          "name": "Show Me a Sign",
          "rating": 9
        },
        {
          "id": "mkeedrj4lzmdgrngwy",
          "name": "Fallout",
          "rating": 9
        },
        {
          "id": "mkeedvkf4yz8l0efo79",
          "name": "Breathe Again",
          "rating": 8
        },
        {
          "id": "mkeedzfu4k0yzpf0gl9",
          "name": "Coeur d’Alene",
          "rating": 10
        },
        {
          "id": "mkeee34unsxplzgcmop",
          "name": "Life Must Go On",
          "rating": 10
        },
        {
          "id": "mkeee734ga64ixcystf",
          "name": "Words Darker Than Their Wings",
          "rating": 10
        },
        {
          "id": "mkeeebl3qshn6e2dgc9",
          "name": "Zero",
          "rating": 8
        },
        {
          "id": "mkeeefqbru30ig4hzd",
          "name": "Home",
          "rating": 8
        },
        {
          "id": "mkeeekvntf647vg6h2",
          "name": "Never Born To Follow",
          "rating": 7
        }
      ],
      "createdAt": 1768417841930,
      "updatedAt": 1768423354186
    },
    {
      "id": "mkeegk5jz2rcz2wajg",
      "title": "Fortress",
      "artist": "Alter Bridge",
      "year": "2013",
      "genre": "Rock",
      "coverArt": "data:image/jpeg;base64,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",
      "songs": [
        {
          "id": "mkeegk5j5c5zw91de7t",
          "name": "Cry of Achilles",
          "rating": 10
        },
        {
          "id": "mkeeh3bbm140t3vha2b",
          "name": "Addicted to Pain",
          "rating": 10
        },
        {
          "id": "mkeeh7dpgj35cqkziz7",
          "name": "Bleed It Dry",
          "rating": 10
        },
        {
          "id": "mkeehap0fkzqgbx1k5b",
          "name": "Lover",
          "rating": 10
        },
        {
          "id": "mkeehfo4mkg4e94zufr",
          "name": "The Uninvited",
          "rating": 10
        },
        {
          "id": "mkeehkufs0ayzw4snho",
          "name": "Peace Is Broken",
          "rating": 8
        },
        {
          "id": "mkeehpifhjmigbnago5",
          "name": "Calm The Fire",
          "rating": 9
        },
        {
          "id": "mkeehtm524fwhfang2k",
          "name": "Waters Rising",
          "rating": 10
        },
        {
          "id": "mkeehx64i9fdxhn5xof",
          "name": "Farther Than The Sun",
          "rating": 10
        },
        {
          "id": "mkeei1lcpb84xla273a",
          "name": "Cry a River",
          "rating": 8
        },
        {
          "id": "mkeei5y2y8f674f5yj",
          "name": "All Ends Well",
          "rating": 10
        },
        {
          "id": "mkeeiaz9ldcq2j7a29",
          "name": "Fortress",
          "rating": 10
        }
      ],
      "createdAt": 1768418070535,
      "updatedAt": 1768423235596
    },
    {
      "id": "mkeemivq1s8mt1a0r7f",
      "title": "The Last Hero",
      "artist": "Alter Bridge",
      "year": "2016",
      "genre": "Rock",
      "coverArt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4h4jkO0R4v5_R-_q3mRKhPEQ0L4S_kMnyrw&s",
      "songs": [
        {
          "id": "mkeemivq00gxfx23rvw2t",
          "name": "Show Me a Leader",
          "rating": 9
        },
        {
          "id": "mkeena4iexnp6bnkw97",
          "name": "The Writing on the Wall",
          "rating": 9
        },
        {
          "id": "mkeenelw9g5by8othn8",
          "name": "The Other Side",
          "rating": 10
        },
        {
          "id": "mkeenldpf2eiua6fpa",
          "name": "My Champion",
          "rating": 8
        },
        {
          "id": "mkeenr2te0zfe326eg",
          "name": "Poison in Your Veins",
          "rating": 8
        },
        {
          "id": "mkeenuvoxugh4lv9k2r",
          "name": "Cradle to the Grave",
          "rating": 10
        },
        {
          "id": "mkeeo0ip7qgybeb0riw",
          "name": "Losing Patience",
          "rating": 8
        },
        {
          "id": "mkeeo6r4efuydp6tuwm",
          "name": "This Side of Fate",
          "rating": 9
        },
        {
          "id": "mkeeoahgwucb9wrkio8",
          "name": "You Will Be Remembered",
          "rating": 10
        },
        {
          "id": "mkeeoedktm4zt2b7mk",
          "name": "Crows on a Wire",
          "rating": 8
        },
        {
          "id": "mkeeojnlzbi5rw1ww9a",
          "name": "Twilight",
          "rating": 7
        },
        {
          "id": "mkeeon6b5nb862fmqjs",
          "name": "Island of Fools",
          "rating": 8
        },
        {
          "id": "mkeeoqeq3xw1fxz127l",
          "name": "The Last Hero",
          "rating": 8
        },
        {
          "id": "mkeeova2zw5s2ylgyr",
          "name": "Last Of Our Kind",
          "rating": 8
        }
      ],
      "createdAt": 1768418348822,
      "updatedAt": 1768423378359
    },
    {
      "id": "mkeerrgwp5tfn7yyydc",
      "title": "Walk The Sky",
      "artist": "Alter Bridge",
      "year": "2019",
      "genre": "Rock",
      "coverArt": "https://i.scdn.co/image/ab67616d0000b2734d9c375463b7e3056169142e",
      "songs": [
        {
          "id": "mkeerrgw3vfhz00wj6l",
          "name": "One Life",
          "rating": 9
        },
        {
          "id": "mkeesrjciu85gwivqc",
          "name": "Wouldn’t You Rather",
          "rating": 10
        },
        {
          "id": "mkeesvok1i0ri8r9xx",
          "name": "In the Deep",
          "rating": 6
        },
        {
          "id": "mkeeszzd62kcjizqrsr",
          "name": "Godspeed",
          "rating": 9
        },
        {
          "id": "mkeet5in6nlqul94zyu",
          "name": "Native Son",
          "rating": 10
        },
        {
          "id": "mkeet99gdhiwcvi6tee",
          "name": "Take the Crown",
          "rating": 9
        },
        {
          "id": "mkeetcyz4ui5xco49c4",
          "name": "Indoctrination",
          "rating": 10
        },
        {
          "id": "mkeeth8z0newg8f4ddt",
          "name": "The Bitter End",
          "rating": 8
        },
        {
          "id": "mkeetl86oigh3ont6uq",
          "name": "Pay No Mind",
          "rating": 10
        },
        {
          "id": "mkeetozfajtaaxk8a0m",
          "name": "Forever Falling",
          "rating": 8
        },
        {
          "id": "mkeetsjmobzss3pux8d",
          "name": "Clear Horizon",
          "rating": 8
        },
        {
          "id": "mkeetwnh1ua5hfo8rlz",
          "name": "Walking on the Sky",
          "rating": 7
        },
        {
          "id": "mkeeu06xrjudfdbpcmd",
          "name": "Tear Us Apart",
          "rating": 6
        },
        {
          "id": "mkeeu438pjmbyi3gyph",
          "name": "Dying Light",
          "rating": 10
        },
        {
          "id": "mkeeu9aa10lxrzj35p3",
          "name": "Last Rites",
          "rating": 9
        }
      ],
      "createdAt": 1768418593232,
      "updatedAt": 1768423399570
    },
    {
      "id": "mkeexbmsrmwedtt859g",
      "title": "Pawns & Kings",
      "artist": "Alter Bridge",
      "year": "2022",
      "genre": "Rock",
      "coverArt": "https://m.media-amazon.com/images/I/91iGIS2TsqL.jpg",
      "songs": [
        {
          "id": "mkeexbmsxcrjlv8pzp",
          "name": "This is War",
          "rating": 9
        },
        {
          "id": "mkeey98upav925semd",
          "name": "Dead Among the Living",
          "rating": 10
        },
        {
          "id": "mkeeyd1iqfxgy33p9q",
          "name": "Silver Tongue",
          "rating": 9
        },
        {
          "id": "mkeeyhcjxpat6gfv4g",
          "name": "Sin After Sin",
          "rating": 10
        },
        {
          "id": "mkeeyl6grx0k5bqc6ta",
          "name": "Stay",
          "rating": 8
        },
        {
          "id": "mkeeyrdu4rumns8cucm",
          "name": "Holiday",
          "rating": 7
        },
        {
          "id": "mkeez813t8cmkcral4",
          "name": "Fable of the Silent Son",
          "rating": 10
        },
        {
          "id": "mkeezd09hgq3nr4v8e5",
          "name": "Season of Promise",
          "rating": 8
        },
        {
          "id": "mkeezi02zxri1fp8ru",
          "name": "Last Man Standing",
          "rating": 9
        },
        {
          "id": "mkeeznsgbx0od9tlmto",
          "name": "Pawns & Kings",
          "rating": 10
        }
      ],
      "createdAt": 1768418852644,
      "updatedAt": 1768423425402
    },
    {
      "id": "mkef1sk2vi69agcyad",
      "title": "Alter Bridge",
      "artist": "Alter Bridge",
      "year": "2026",
      "genre": "Rock",
      "coverArt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIHIpi1WCbAfbuqg7mldDBlYu53WYp7thBw&s",
      "songs": [
        {
          "id": "mkef1sk295fm7hv16t",
          "name": "Silent Divide",
          "rating": 9
        },
        {
          "id": "mkef2jyb70ijux3n9zb",
          "name": "Rue The Day",
          "rating": 9
        },
        {
          "id": "mkef2pb041c91xv34mb",
          "name": "Power Down",
          "rating": 8
        },
        {
          "id": "mkef2tgco285p6060l",
          "name": "Trust In Me",
          "rating": 8
        },
        {
          "id": "mkef2z48l1nie5rdy4",
          "name": "Disregarded",
          "rating": 10
        },
        {
          "id": "mkef32ge8wwa98r3vtu",
          "name": "Tested and Able",
          "rating": 9
        },
        {
          "id": "mkef36kv3vz4rhxt4rx",
          "name": "What Lies Within",
          "rating": 8
        },
        {
          "id": "mkef3b30y6xo9zu987r",
          "name": "Hang By A Thread ",
          "rating": 10
        },
        {
          "id": "mkef3g5r2a1lsjoyoxm",
          "name": "Scales Are Falling",
          "rating": 7
        },
        {
          "id": "mkef3kuob0qfzsquspd",
          "name": "Playing Aces",
          "rating": 8
        },
        {
          "id": "mkef3sf3e7sykbc6pga",
          "name": "What Are You Waiting For",
          "rating": 7
        },
        {
          "id": "mkef3xwpy0dbox4l8tj",
          "name": "Slave To Master",
          "rating": 10
        }
      ],
      "createdAt": 1768419061202,
      "updatedAt": 1768423456256
    },
    {
      "id": "mkef6qdwj6td4ainha",
      "title": "Audioslave",
      "artist": "Audioslave",
      "year": "2002",
      "genre": "Rock",
      "coverArt": "https://upload.wikimedia.org/wikipedia/en/a/ac/Audioslave_-_Audioslave.jpg",
      "songs": [
        {
          "id": "mkef6qdwntcssq2qszn",
          "name": " Cochise",
          "rating": 8
        },
        {
          "id": "mkef8d1yrkaj70mjtua",
          "name": " Show Me How to Live",
          "rating": 10
        },
        {
          "id": "mkef8g9oqwq315dmw3",
          "name": "Gasoline",
          "rating": 8
        },
        {
          "id": "mkef8kebbggi7e8aspa",
          "name": "What You Are",
          "rating": 9
        },
        {
          "id": "mkef8p8xpujaor7pl8",
          "name": " Like a Stone",
          "rating": 10
        },
        {
          "id": "mkef8t40oxrn4z0z5yd",
          "name": " Set It Off",
          "rating": 9
        },
        {
          "id": "mkef8xt3gvhc944turl",
          "name": " Shadow on the Sun",
          "rating": 9
        },
        {
          "id": "mkef93dtm60tgjiezbs",
          "name": " I Am the Highway",
          "rating": 10
        },
        {
          "id": "mkef97qcjdyxmoh87li",
          "name": " Exploder",
          "rating": 8
        },
        {
          "id": "mkef9c193m1azuw64kj",
          "name": "Hypnotize",
          "rating": 6
        },
        {
          "id": "mkef9fexi4w2qggwhg",
          "name": " Bring 'Em Back Alive",
          "rating": 10
        },
        {
          "id": "mkef9iprtcx4amphu1d",
          "name": " Light My Way",
          "rating": 10
        },
        {
          "id": "mkef9m1yrccqdm0k9yq",
          "name": " Getaway Car",
          "rating": 9
        },
        {
          "id": "mkef9s98n9xpwc3v8pb",
          "name": "The Last Remaining Light",
          "rating": 9
        }
      ],
      "createdAt": 1768419291668,
      "updatedAt": 1768423608411
    },
    {
      "id": "mkefc4vhci77qjd9yor",
      "title": "Appetite For Destruction",
      "artist": "Guns N Roses",
      "year": "1987",
      "genre": "Rock",
      "coverArt": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEhURExAVFhISFxgYGRUYFxYXGBkgIBkYHxUbGxkYHygiHx4mGxgaIjIjJSkrLjAuHR8zODMvNystLisBCgoKDg0OGhAQGy8mICY2MCswMSsvLS81LS0vLy01LS4tMi8tNSsvNS81LS8tNS83LzUtLzUvLS01LS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABKEAACAQMCBAQDBQMGCQ0AAAABAgMABBESIQUGEzEiQVFhMnGBBxRCUpEjYqEzQ3KSscEVFiRUgpSi0dMXNERTVWN0k7PE0vDx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EADERAAIBAgQDBgUEAwAAAAAAAAABAgMRBBIhMUFRkQUTImGh8DJxgcHxI7HR4RRCU//aAAwDAQACEQMRAD8A4bSlKAUpSgFKUoBSlKAUpSgFKUoBSvccZYhVBLHsAMk/ICrVw/7OOKSgMLVlB7av9wyR9cVxtLcFSpVpvPs84pHkm0cgea4Pz2O5/SqzNEyMVZSrDupBBHzBomnsDxSlK6BSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpU7y/yffXmDb2zMp/GcKnv4mwP0rjaW4IKlde4F9irNvdXOkg4ZIsEjbI8TDfO3lWS74Fwq3YxJbFylx93Z5Dqw+gMpwTjSc4yANx2xVTrwW2pbCk5uxq/ZNwqNFWcqDJJkgkbquoqAPmVYn1BFdF57t3HDGW3JjeHS6aCVwIwW07eWFxiqhwkgSGIjCFNIVfAAMtkDTjHx+Xqa6KsK9KKML4AyLjv4fhOfbBrzZV81XMejicL3MIxHCOIiaIzg5WYROP9KGM/wBtc6+0nl+CaFnVFWWJPA422UZKn1GkHHoce9T3JkEsNpLbTxsBDJJEpYfHGD4GHqMHH0qF4y6qI4UACbqF7jQFKlcHORhgN6Kpkq6P8DDYbvYNWOG0rqPDOX+H3xjTpNDLOshjKEAYjbDE7EDO+PD5HcbVj4x9kMynFvcJI2M9NyFfHbO3ffA7AV6SrwvZ6HnTpSj5nMqVI8X4FdWp0zwPGc43G36jao6rioUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBUvy7y3c3r6II8gHdzkIvzOP4DJpyzwU3UunJEa7uw74zsB7k7b7Dc+Vdc5d4g8cgt7WFAlvIqSQ9nMbKMSoxIBAbvnJOO+aqq1cm25fSouSzPYjbXk+xseqro13fwQfeRE3gjKBgG0bHJGDnv54IPbpnEbWG+4cyx7RXEOUK7EbZXHvkYqF59tXRIeIwrqmsG1Mv/WQnadP0Of1r59nt0kE0vD1bMDAXVm3k0Um7oPdHPb3NYZydSOa+qDWV2M/I/GXfVBOc3NuBFKfz6QWt5QPR4mYk+q1A882b28s13bzJ1JU6klrIAwkEYALpjxKwU4yKnOM8DZLm3u45VjeCQxyK2T1oCdSAKoLFkyVG3rvioXm/mLhTOkjzjqwiRBpcNs40yKyx6s7eRGQfSuKEnLNFaMnTkluyBlvPEkyHSHXOe+NQBH8cd9qguYvtA4hDcywqyKsTsEGCxA30nLE7lT/ABrai4/ZuVhhWRwowqhVjVVUblpJGOFAG5K1CX/FrPqPJoLzOd2VUMaABQip1gdWy7uUyT2wO+jDUHG+ZGrtDEwqqOR68Td4R9od9LNHE+hxI6qdnU7kA4KMN8eual+I8RJWWUkERRtpP69/fOkVVoOKWZeOTQ0c0Tq6yFUKNg5KyLCF2/eVc+ufKbn4lYgGCYSJHIAfzoy5ypSWPcjbzTywd8iu16N2nFEcFiY01LM9baFr+zywVbuNCGMsPD4QOwVdblnB89RJG/pmsKO11LrRt+JcQRFbO4t7TxFlI7Zdcg1v8scX4ezzyRXiie6jVBkjwaVKpoUhXPfOME7VL8q8uNDLFNlWgsrLoxqh1M0jHXcPjyJPhAO5z2FUu8W3L37Zmm09Ee+buOft5oBCskVtatPMpQuzs21vGuNwMnJPkD86qvNn2V27rHLA62002B0XcaNRXUVHuMH4fTYGp3hV/LdcSspxGIZxaO92qkkCNz/k0bEgYbOHx3GTWSymXiHEGuXUm0stcVtlSUkkxieTtggDwjO3mNwcdUnTWnArSzM4Lx3gVxaSGKeMq3ke6t8j51G1+g+b7qxmL2UqkiKMM8gxoh7dMM+chjtgAE49siuH8xcIa1mMRORjKt6jJH65BB9wa1Uquda7ipScdeBGUpSrioUpSgFKUoBSlKAUpSgFKUoBSlKA6D9nkarAz+bSkE/0EXT/AOq1WPiccisl7bjM9uN1H87H+ND7juNjVI5F4qF12rHHWZWjY7ASAEaSfIOrYz21BM7ZNXzh07A7522989sb+edq87EqUamZH0GBjTrYVwvqvdyycmcSOmbXKZrKRetFNIwJAfV1IHz5qQe/YHfAqh8Y57tbTEHDotXTDqsrsX0BjkqjHxaSd8KQv9LvUL9oHNkkrm0iciGPwuQSNbD4ht+AHbHmRnfw4pFaaVFLVniVZK9kSvFOY7u4z1bh2B7qDpX+quB/Cty15TleOOXrQhZV1LvIexwQSqEZB7jORVeqY5f461uSrDXA5y8ecb9g6H8LgefmNjkVoRCNr+IlrXg33ZJnlkR1kiaMLH1NepiujdkAA1AZ9sjzqx8hWM1tJbtHw5bhr1VYXD6jHEhYhxgDSCFXJJ33IHvocz3+LRIEVXSSWOSOTCq+kqxAO2cE+ROzKfKrl9kc86WRxqlhkMsYTWx0spJwu+F1K+fD+X1Oa4yc4xUrRIDmblWJbnRbcOL28qEw3SSZiwVJVn0powMEHJ3XBJzvVSi4b96t4VSWNHtzIjK3UOQza1YFVP5iMfu+9dZ+0C3ki4WYUjeC2hTGBK2SupQFOSdSnU2x9AK5pyHcMOsixRHrBV6kiqxTBJJXIOPDnJ9BtviivwEIpyszQj5KmY6RPBnBO5lAAHxEkx4AHmTtWHg3Ol/bY6dwxUfgclh9D8S/6JFeuYuYeoDBASsGfE3ZpiOxb0QeSfU5O9VyutJkZ5b+E7by/wDaJFeQyWkjm2uJ06fVGCxJBUEMcajg4wSG9Cx7Wk8Qhsba3gSMkErDGkfiLHfU2TjyDMc486/NIronKPNrTL9zuGJkI0xOWKliRp0sw3D6fCrDGc4J3BGSth76x6FtCazWl1JWHpSy3owXhN31VbJwzY8S/vKrdvKqz9oZDCB/xZlXPsOmw/i7frVmRQoWGJMDsqjb+3z9z9aonOHEllmCRsGihGlWHZiTmR/kW2HsFqOHvKblwPVx9OFDDRp/7PUgaUpW08IUpSgFKUoBSlKAUpSgFKUoBSlKAV0rgvFPvNsC28odY5ffYlHPuwXBP5lJ865rW/wjislu5ZArBhhkcakYZBAYexAIIwQRtVdWnnjYvw9d0Z5l9Sa574YVl+8geCc+L2fHi/rfF9T6VVquPEObkeBomtCDKnnIdIP4XUMuo4O4y31qnV2mpKKUtyNZwc24bClKVMqLrcWRmtLcL8SQhuxJ2afIwKx/Z/xm4gu0+7ygNKShjPwOSPCNJ21EgAHvkgedWTk8fs4//BS/+4qVueH2rNAZFj1tHbMmFOoPo/lJCu5jAVfCNyQdwMmqKtfJK1veptjh86TRV+f+PX1xKkUzMU0KwiVSoY62AJRe51AjfzA2rPZ8K6NtG385PDcs/oMJMqjHsBVxsEKXQcn/ACxFXrsEGZkG5WPHxMFCsXAy4zjsRUDxL/m8BHf7vd/2T1CniHUmla34ZZ/jqF5HI6UpWo84VY+TeFF5PvBH7OAgj99+6qD7bE+gx6iq5V5tebbSOCONYZgY0UaQYwM7FzrOdmbJ+Hzqupmy+Dcto5M6dTYy8euzb27kEiWZiiH0XSpmYfrpz++2O21BqR47xZ7mXqMAoACog3CqCSBk7k5JJPmSe3ao6lOGSKRLE1nWqOXT5ClKVYUClKUApSlAKUpQClKUApSlAKUpQClKUB0S+4ak8MEMjaCEhEb41FSY0ypHmhz2HY7+udn/ABCsQUi6szTOQFA1JqGwcnMLaCCc6T5Dv3rd5emhiIluAdMUUCR5JH7VkjOAF3JCDJABPiGB6ySTNcSNd2c0MFzCZhMOqpZ01YZtLsNACjVltOOwqLfItlZsqV5yC0sZe2glR486ldhIkmFUN02UAriQMPF3ypyBkChOhBIIIIOCDsQfMEV1rkvmmeOOS3lJIlkYddWEgVsEldes6hoyQNtskHasFpaxapluJ4OpHLImprVZWYBiAxcIckjBySSc775pm9/g5CnndkeOUrxYUt3dNa/d2GnsDqM4AJ8hvvU1we/+9NmPCOsSxMwGCoGoHpjsurxeLcgAAdya0pbi1hV5eus7omEi6LqmcYTUGAXQvfQO5x71W7bii2miRZCG0gHCy+LscMc6c/Lcb0jCjKpnkm7fS/093J4qdWFPJB2b4l34nbtAIjhnW2II30yadyVRxjsewPbOxA2qJ4jxdLhI2VNLfd59QAwCzRzMWA8tROceRyKjuP8AEZZoornq5t5A3YkYKnBVozkliexBxisvBL+zliiHWFtNEull6cjB8YKyKY12JBwwIGfIYrtVUM6motb+t+CI4OVbK4VJX5HL6nuC8sSTqkhOiORmVCFMjuVxqCou5xkd8dxV+HDrH/ObX/UT/wAGs0cDww29wuFEoJAj/ZaYQ5aVyIwuA2E8AwWAOSTjEc6f4a/clKg47srkvK9hFmCV5BLqGZi8aNESFCI1uSWYEkkkYI28q+cA4LBbyiRpFlOoAMVIWMeHVqVtjJgnbJCgZySRiQvLp5D1+loTcriIABcnAJVNJ9PTuKx8HmZZUiWTRqV+kSqdMEnJVsjIVidOUwckZ9oRqXdmaHg5U4d5dPyvr9UUPjVk0M8kTgBkY5AKkDzAypI7GtGp3nS3K3TORhrhVuCmclDKNZQ53GC2wO+CM1BVcYBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAVt8JhV54kf4HkRW8tiwB3+ValZbYNrXR8eoafnnbv70B13nLgwSzV2bMkRaUdNvHrdy2T28IUqRjsABudxb+AcvWyos9ikcXXkX7wLkBi0QyJo0AJC5J+XviqPz7YGJo5rdi7LEzy5ZnVS8gEaqhO27EAHIx5bVZuA8Z4cIwbkHrsELlFfSx6SKxwcflxv9NqhG7ehdlb4Fe55+58O0QWNuwkM6yuzMHj8CHCd8kYm88DfvWeW+uYWZCohBYsEGiQb/ABHUwJxq1d/TbYVC8ckPEL4RwJohSRgAcDVkKTuPXGBn93O+ak+L3EDcRmi6gSJVQdUKZMuFyVIBB7EnIqdLu1U/UV18rnY5v9dyH4jxmSeQRsQyKQMlU0b7HPTAOMEbZGd63OXuVb0sJoYdUNzG2lxIn7N9RCvKNJGVAyU7b4zWpx6GKEdWG4EpOdSdJk8jhsnvjsPpV0+yNQ1qptpUEys6zId2x1JGiOPy4fGT9Kq0ztxVlw0t6F9ZvIovcgr+xubjqTW69WzuAsYdnWFY2RgJTKu2sEhtOewI7EVV7G5ML9ZWBdNSAqFK/vL4hg7ZIIG4FdS+0bqJbS/eJEb9nLHEMYdpHVVUgdjhWfLeQzvXLeDQEkW8mmOMkSGUgvgDXjCjfUWOCPLBrktXYhR0uWZ+NXJQlZBqxt+zh7+X4PWtRkaSK1iW5VWeKOTTIkjowR2ADmIHSpMrk5wPh3G1b0tvbqpIvVJAJA6M2+BsM1FWdsbV4ZbxHaCSAxakzmJWHhZRnsrA53z9TvorOg7d0rc9LfuRlGoviLv/AImM5NoYdBhZbpblUxA0pYFoBCdzGBjbvsfOqfxPl0liFcSlnnErpGUiVpMlUiVh5FSSRsO3c10ie84eYjJ/hKM+DVtMNQz5hNWrbPw99gKp/DpsPJcWUTkGPoxIx8REathmJBIZgkn9YZ3O1LZBI5fzeP8ALJTndirNvnxMil/9onby7VDVP85cLaGYSFmIuV63ixqBZjqBx3+e3f51AVYUilKUApSlAKUpQClKUApSlAKUpQClKUAr1G5BBGxByP7q80oDo3FOJzdKZVQNHeBZGLElkDIrMgPfSr4ZSO2CPOpBOaBAkcZu1gwiERLDrKgqCupgh8RBB3YnffHaoCbmqKGGEwaZJxHGCGQlIiqqGyHGHbI27qBvucYqPEb15pGlfGpvJQAoAACqoHYAAAD0FRcIvddTQ6mT4TsHKvF9Bd4IRdTXBaZJQpUE/A4kUgBAj6GyMDST6VXobhLKQia7EVyx6roYWcozqcgnQQTpbG23mKrNpzVIlhJY4JDN4HBxoU/yq7DLajjudst61ASSMxyxJO25OTsMDv7CmVcitVGnc6vd8QluI9H3hJIp0JDdNFGDrX8isCGQj/8AarPJ8cysbjMiacxhxlfFgEgMMHOANqlOWrZ5La3CfEsMje+FmuCcDzPnj2qft4YgGA0pb3h6iYzohmUY0+y9x/RdSNhRShSnFpK3Fe/L9jW6bmrld5mmaYKJJHd8hV1OzHByDuT2wD+oqctpJrREgE4BWMPIzIjYPT1tqLKx8MYA29KyRcJj6idXvCOtcDuFAwY48fn3xt5yY8q0OMLIVknk/wCkQ3Mg+RimH6Z7ewFdnOnVqt201t00/ZvodVNwh5n0c8p/2gn+rD/gVI3V1JNw9nLdeFg3QdAVIYuVeFl0LhSNeAd/hwNhji9TsHNl0lutqjKqR6tLAeMaidRBzgE5xqADY2ziuKEVsl0MjrSe5fuH8Q1FeHrdQkr+zaIxK2FG0oEjw+IqurfP4awPdSNcfdxj7tHN4QACrAShgp9SGx65we1cxtbp43WVHKuhDBh3B9auvAuZ7Z3xJFHbEEPrQPoc5BkDKM6STuukYHw9sEdUYp7dCUKl2sxU+NcRlnmaSWQu2SAT5DJwABsBudhWhXqVskn1JNea6UClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUB1bkG46cdu3VWM/d5grscAMZbjTnY+dT0RjBZosujSjUV0pHA+kmOSMS+JcHPibCkZXfaq5yWq9CAsgYJbTvpOSCVkuCNgRn5VGc6x3PWaKJ5HTfCRjAKHB+GMDIIAJyPKs9Sh3km0+V/U2rEKkoprf+EXSaNOkOqWMGFJuVwOsVZsxkbktqY6S2G7sc1oc13YkUYeNtNrcDEedKDpz6E3AIwmkdvKoLgjSQ2U8ihlkkVFRt11F3CgnPxAb98ipbjir0lZQATb3OSAF1aVuFViF2yQozgCkMP3c1d33t0ZKOI76L0scjpSlaDAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKlb3l64it0uZU0JI2lQ2ztsTqC/l8J3+VLgiqUpQF94bxoWtnA+nWzwSxhc4xqluBqPsK0eGcT4ldyRQxSsuorGOmAukFk7lfFgFFJyfL516ezObe2K5KWwd87CMF5ZHbtuQjAeYyexq68rctSskHEI5IkhWKR2hjZg6adQHwYLyDB7/AIjjFLaXLJSzWXBFQ4pd8UtZCjT6gBsx0kEALsNsj4QuP3cGsvD+MyTwujoAYIJ1BGRnMdw24PYjNXkcqxy6+ITTtFb3KBkjckPE+/URo2GmViwOcjJ375rmvDb3XLIkSYWWKbCAdnFvKPBjOzHsN+4G9dVuPvQ7GWV+RVKV9r5XCoUqXh5cuHtTdxqHjVirhcl0xjdhjtv5Z98VEVxNMClKV0ClKUApSlAKUpQClKUApSlAKUpQCpXl3gb3bsiuiCNC7O+dIAx3wCe5qKq9ckxaLK4lPeaSOJfkoZn/ALR+lV1p5INovwtHvqsafM0/+T+40lzc2oQd3MrBR7klawDl6zj/AJfikJ/dt0kmJ+TEKv8AGp23uCCWRmVlOMjKn6H0rXnFvOpe4hCnJAljwknfAJAGls+4z71ljXnfxeh6uI7Hya0pX+fl6Ghb8XtoWCWFmXmYgLPcaZJMk4XpxDwKckYJyameeeEcQl6EKwXEwiTU0ulm1yPu5z6DYe3byqEHJtw7qtuySqxwGB0lf6aHcHO22R71vx8QtrDvcSXdwPwrIwt0Puc+L+P0NWJpu8NX76HlThKHhmrFW4lwO5gUPNA8asdILDGTgEj9CD9RUdUjxzjU93J1Jn1HfA7KufID/wCk+dWXlzlJgqXE0EkmsB44xG7oQfhaQqMHOxCA/wBLA2OpX4lUYOTsjV4mzvJDIGZetbIzbHIwGQ4x3z0tQJ+flXQfsqvEMKQQ3Om6QyDpkL44y5ZCCd8K+vIBz4icdqpPHIpfvKtJHMGZQFyrLqID6gNQAOPDt6bDG1QPA9RuYtGdesEaPi2OWIxv2BxUrHWssrHZ/tNumgt2E90TLLE4ijUAZY6UYg/EAFd8+WPlXGuHSgPD4dUolQqQwUbONizeEZxgHsPOrXzfDA8sDTG7CZfW0wGoqF1aVOxycY3238qrDRwyyqqK+ln0rkdxnsAN+2P1okJxallZq802fRu54wQQHJUjBBDeJSCCRjSRWKw4LczKXhgeRVOklRnfGcYG/arZzBwA3LGVQy3Dd9QIWQ+uceFz/VPse9Z4Nxm5spS0ZKMDpeNgcHB3V12OQcjyI37VGSauuIlHK9S2cg2d9H17fo3EPVTUkpjkUJImSpORjBGxB74AqJuL+zmZkvLUwzqxDS24C5IJ1a4jtnPmpFSMl1BfjEN3La3B/mJZH6DH0Rs7ZPkQPYVEf4o3KuyzaYlQ4Lsc5x8WkDdiPpg9yKzXSbctPfqThCU/DFXDcuWr7w8Tg+UyvCfrkEVmj5DnZeotzaumcakkdx77hMVvW8NtAB0otbkEiWUBiSB2VfgX9GPvXi44jJIdRYtp0tg5OUI8vQjB7VDvZv4fU9Cn2Z/1lbyWr/grnHuCvasqsysJFDKy9j61F1debow9lbyg56Ujxk+zDUv9h/hVKrRTlmimzz8RS7qrKHIUpSrCkUpSgFKUoBSlKAUpSgFdP4BaCSxt4oZInddbugddYZmOMp3GFAGTtXMK+qxByDgjzqupTzqxfhsRKhUVSO6Oh8RgkjB1IysAcDHc+WPX6VoJGx0oCP2SjJPbXjb9Nz+lRvCucrqLwuwni845fF+jdx+uParNZTW14D92fpTsN4HxnP8A3bHAfH648hWWVOUFzPepdp0sRL9Twv0f14cCJs7p0demzeE6Qdx2OZXJ/hUpdLaXy6rhTDOdhdIoGryUyxjAOfzDBrVurZkAh0svkfLAHf6msV2NRWEdju3so8vqcCo3u7rQ01MLGUGp68vm9kn79CF41yndW46mkSwHtNFl4/qR8J9mxUIkrDsxHyJFdAsuIyxO7RyGNEAG3Ynu2R2IAwMGvctzaTBDc2EeuT8URMTk4zuFGkn6Cro4hr4l0PIrdkyT/Td/npxt8itcqXrPMtvK7NbTHEilTKFyCBIF3IKkg5XBqebli6t0kW2inmnlGgyrE6JGn4grsBqZsAZGwGfXaW4UtvbxzLaddHkXUWdlJGkrsrIAfxHvUH9/lZI2aRmZ2UNk575z/ZXP8lt+FHKfZcrfqPK+vLz8z7wzgl8FlhvLe6MMiZUiN5jHIv8AJuADtsWB9dWD6jT4px5YU6NtZNauAU6rj9sVzknUVDB22BwcADSMAnOaHiMoClZCCUJyM99eF7e1TnFXt5o4VvOtIy5KFXAzqz4SzAn8G2Peuqu07SXQ5U7NeW9OV9vLf6nPf8M3P+czf+Y/++pLg3Kd1cftGHSh7maXKr74zux+VWW2v7SEF7eyjUpg9R8zOM+Y17Db0FYr/iM8jK8rsRqKkE7AbhWHoPYY70lXk/hXU7R7Lb1qS08tf6Ni2+52QAt16k58P3iQDvjICIchfmd/nWh99eZwzsd/zb5wPEhz5g7j2rUaMDUh7DCk+eCf2b589O4r3aWksj6VU6ycnA7OOzD2Zdqqst29T0acVRaUI2XH+37XQyhPii8x40/XI/Q7fLFfeH2csjKY42PfyPwnxAe2G23rfuls7MD7y+uVclYEOWGfJm/CN/PfG+9V/inOtzINEWLeL8kWx+r9z9MD2qUYTlt6lGIx9KDWXVrlt18tixcU4UYbC4SZ0QNpeNWYBsg/CAT4tvTNc3r3JIWJZiSx7knJP1NeK1U4ZFY8WvWdWeZqwpSlTKRSlKAUpSgFKUoBSlKAUpSgFfVYg5BwR518pQFu4Vzo2BHeJ1kGwkG0y/6X4h89/ep+Hh6Sq01pKJgRv5OuBtqQ7jHt9PWuZVkt53Rg6Oysu4ZSVI+RG9UzoRlqtGbsN2hVoaLVcn9uRdZ7UqiwkHJIDkjHuxPz/vr7LvKgH4FZv18I/vrQsue7gALPHHcIPzDS/wBHX+8GpOPmPhjnLRTwsR3XTIv8SDj5CqHSqLhc9al2pQlbNeO3noiQsPib3jkH+yT/AHVHQ8Ol0IOm3hfOSCcjUTsfXFbsHEbDUGj4gFYHIJSVSPrpx/GsHG+YLeGCT7rdt94ldSTH1Bgfi0sw8KnA8OTv227VwpzzWsTxXaVFeKHi4cvsaZ4RMFxobZQMgH8+o+XpW5xYfyX7nR/iB/8AOvvAOY7eWBVvbtutFKzqW6hJ28IZkBJTJJ05Hb0r3c8S4ezFnvgxJ1HEcpOfLGUx6eddlCpn22KqGOoyi83h9fsRXD+4B+FkIx5eFmBH6EVltLVizIqsFZSNOSdJBwCvsQc/Svb8xcOj+CKaUjONQSNf4Enf5VG33O9wwKwolun7gy/1dt8/LFWqnNvkQl2jQhFKN5NfT+ywy8OjhUPeyrH4cFR4ncbdk/v7DO+KgeLc4sQYrROhH2L/AM63zb8I9hv71V5pWZizMWZtyxJJPzJrxVsKKjq9TzMRjatbR6LkvvzPrMSck5J86+UpVxjFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoD/2Q==",
      "songs": [
        {
          "id": "mkefc4vi09pvlpkoj4qs",
          "name": " Welcome to the Jungle",
          "rating": 10
        },
        {
          "id": "mkefeaddbvebtaydb6s",
          "name": "It's So Easy",
          "rating": 9
        },
        {
          "id": "mkefedq6bc27cjvel9n",
          "name": " Nightrain",
          "rating": 10
        },
        {
          "id": "mkefehu347io3w5l9qg",
          "name": " Out ta Get Me",
          "rating": 9
        },
        {
          "id": "mkefem3v6cfvngcujl",
          "name": " Mr. Brownstone",
          "rating": 9
        },
        {
          "id": "mkefeqhzwmmllq5r7sg",
          "name": " Paradise City",
          "rating": 10
        },
        {
          "id": "mkefeu7f4em0tv9kazt",
          "name": " My Michelle",
          "rating": 10
        },
        {
          "id": "mkefexk94a43zyy2ee6",
          "name": "Think About You",
          "rating": 8
        },
        {
          "id": "mkeff1aotiq959owbpe",
          "name": " Sweet Child O' Mine",
          "rating": 10
        },
        {
          "id": "mkeff5e5tlxcus330u",
          "name": " You're Crazy",
          "rating": 9
        },
        {
          "id": "mkeff99r1jbarnvz5os",
          "name": " Anything Goes",
          "rating": 10
        },
        {
          "id": "mkeffct80o9jfa1nhnkp",
          "name": " Rocket Queen",
          "rating": 10
        }
      ],
      "createdAt": 1768419543726,
      "updatedAt": 1768423475809
    },
    {
      "id": "mkefguhyfh8sx0kldhv",
      "title": "Dream Widow",
      "artist": "Foo Fighters",
      "year": "2022",
      "genre": "Metal",
      "coverArt": "https://i.scdn.co/image/ab67616d0000b2734ae95e1938d5c4c869abb98c",
      "songs": [
        {
          "id": "mkefguhy24z9ada7e5j",
          "name": " Encino",
          "rating": 8
        },
        {
          "id": "mkefhmvs486pkxjn46w",
          "name": " Cold",
          "rating": 9
        },
        {
          "id": "mkefhr13hcc4p2umt96",
          "name": " March of the Insane",
          "rating": 7
        },
        {
          "id": "mkefhvxizbpum4h9y8j",
          "name": " The Sweet Abyss",
          "rating": 9
        },
        {
          "id": "mkefi0icwui17v7fur",
          "name": " Angel With Severed Wings",
          "rating": 8
        },
        {
          "id": "mkefi5flgzm5bxdljvf",
          "name": " Come All Ye Unfaithful",
          "rating": 8
        },
        {
          "id": "mkefi9b8xemt2iysycn",
          "name": " Becoming",
          "rating": 9
        },
        {
          "id": "mkefih33v9pumhllawr",
          "name": " Lacrimus dei Ebrius",
          "rating": 10
        }
      ],
      "createdAt": 1768419763558,
      "updatedAt": 1768423634613
    },
    {
      "id": "mkefrs5qp4aoai4zan",
      "title": "Apocalyptic Love",
      "artist": "SMKC",
      "year": "2012",
      "genre": "Rock",
      "coverArt": "https://upload.wikimedia.org/wikipedia/en/1/12/Apocalyptic_Love.jpg",
      "songs": [
        {
          "id": "mkefrs5qf8ks4su6oo",
          "name": "Apocalyptic Love",
          "rating": 8
        },
        {
          "id": "mkefsgfb02436ojolfse",
          "name": "One Last Thrill",
          "rating": 8
        },
        {
          "id": "mkefsk8a9k6hsums5mm",
          "name": "Standing In The Sun",
          "rating": 9
        },
        {
          "id": "mkefsoewr7rz7wv8vg",
          "name": "You're A Lie",
          "rating": 10
        },
        {
          "id": "mkefsvliz8caxv1faz8",
          "name": "No More Heroes",
          "rating": 8
        },
        {
          "id": "mkeft02zyyr6hwwlso",
          "name": "Halo",
          "rating": 10
        },
        {
          "id": "mkeft46432amxuw25y2",
          "name": "We Will Roam",
          "rating": 8
        },
        {
          "id": "mkeft8ncx09dl6p5g3e",
          "name": "Anastasia",
          "rating": 10
        },
        {
          "id": "mkeftcksv97npt5u5w",
          "name": "Not For Me",
          "rating": 10
        },
        {
          "id": "mkeftgh6azqivzpkv1t",
          "name": "Bad Rain",
          "rating": 9
        },
        {
          "id": "mkeftk3vqgnnwv739ur",
          "name": "Hard & Fast",
          "rating": 8
        },
        {
          "id": "mkeftp269f98lhu9lg4",
          "name": "Far And Away",
          "rating": 10
        }
      ],
      "createdAt": 1768420273742,
      "updatedAt": 1768423530126
    },
    {
      "id": "mkefv01ignthqb4bwop",
      "title": "World On Fire",
      "artist": "SMKC",
      "year": "2014",
      "genre": "Rock",
      "coverArt": "https://i.scdn.co/image/ab67616d0000b2732bcb814f969f1abfe944c23e",
      "songs": [
        {
          "id": "mkefv01infq8tq5i3x9",
          "name": "World On Fire",
          "rating": 10
        },
        {
          "id": "mkefvxrcyba5hy5n3ur",
          "name": "Shadow Life",
          "rating": 9
        },
        {
          "id": "mkefw1deogysb9pagr",
          "name": "Automatic Overdrive",
          "rating": 8
        },
        {
          "id": "mkefw7nwf4cq0dywfjt",
          "name": "Wicked Stone",
          "rating": 10
        },
        {
          "id": "mkefwailld7euipide",
          "name": "30 Years to Life",
          "rating": 9
        },
        {
          "id": "mkefweq8um46kb4nalc",
          "name": "Bent to Fly",
          "rating": 10
        },
        {
          "id": "mkefwi6ulqgpt6m2ljj",
          "name": "Stone Blind",
          "rating": 9
        },
        {
          "id": "mkefwlffwzzcyu7xj2h",
          "name": "Too Far Gone",
          "rating": 10
        },
        {
          "id": "mkefwour404ki1cwe4a",
          "name": "Beneath the Savage Sun",
          "rating": 10
        },
        {
          "id": "mkefwttkd8mlajl5v0e",
          "name": "Withered Delilah",
          "rating": 8
        },
        {
          "id": "mkefwyhzvighwku1yti",
          "name": "Battleground",
          "rating": 10
        },
        {
          "id": "mkefx47ik4arcnyp5w",
          "name": "Dirty Girl",
          "rating": 9
        },
        {
          "id": "mkefx7gxiq1rp13girg",
          "name": "Iris of the Storm",
          "rating": 8
        },
        {
          "id": "mkefxaw4ttg2mcrhtk",
          "name": "Avalon",
          "rating": 8
        },
        {
          "id": "mkefxerfebczszfxose",
          "name": "The Dissident",
          "rating": 9
        },
        {
          "id": "mkefxic6ytels89fydh",
          "name": "Safari Inn",
          "rating": 10
        },
        {
          "id": "mkefxm9p4nnjpta0flv",
          "name": "The Unholy",
          "rating": 10
        }
      ],
      "createdAt": 1768420423926,
      "updatedAt": 1768423496367
    },
    {
      "id": "mkeg05e96yj2en70wmd",
      "title": "Living the Dream",
      "artist": "SMKC",
      "year": "2018",
      "genre": "Rock",
      "coverArt": "https://upload.wikimedia.org/wikipedia/en/4/44/Livingthedream-front.jpg",
      "songs": [
        {
          "id": "mkeg05e9b0ubilhv2vu",
          "name": "The Call of the Wild",
          "rating": 8
        },
        {
          "id": "mkeg2c824dig53sjelx",
          "name": "Serve You Right",
          "rating": 10
        },
        {
          "id": "mkeg2fm9v05zr92wz4q",
          "name": "My Antidote",
          "rating": 9
        },
        {
          "id": "mkeg2io493d4kek3cl8",
          "name": "Mind Your Manners",
          "rating": 9
        },
        {
          "id": "mkeg2mlprm3jf6vb99m",
          "name": "Lost Inside the Girl",
          "rating": 9
        },
        {
          "id": "mkeg2qptrx7aoy5tab",
          "name": "Read Between the Lines",
          "rating": 10
        },
        {
          "id": "mkeg2vszd0kalzu4ij",
          "name": "Slow Grind",
          "rating": 8
        },
        {
          "id": "mkeg2zq5rlp9ezg7dae",
          "name": "The One You Loved Is Gone",
          "rating": 10
        },
        {
          "id": "mkeg34mdvwo6ekjc619",
          "name": "Driving Rain",
          "rating": 9
        },
        {
          "id": "mkeg37lmkxvx3wisb8",
          "name": "Sugar Cane",
          "rating": 8
        },
        {
          "id": "mkeg3ay2u3xg20ob4ii",
          "name": "The Great Pretender",
          "rating": 10
        },
        {
          "id": "mkeg3dvxrx2zknujni",
          "name": "Boulevard of Broken Hearts",
          "rating": 8
        }
      ],
      "createdAt": 1768420664145,
      "updatedAt": 1768423553016
    },
    {
      "id": "mkeg5t6s72ix7gsrwn3",
      "title": "4",
      "artist": "SMKC",
      "year": "2022",
      "genre": "Rock",
      "coverArt": "https://www.slashonline.com/wp-content/uploads/2022/02/Picture1-2.jpg",
      "songs": [
        {
          "id": "mkeg5t6soo9lco7uah",
          "name": "The River Is Rising",
          "rating": 9
        },
        {
          "id": "mkeg6vvhk15o9n2283l",
          "name": "Whatever Gets You By",
          "rating": 8
        },
        {
          "id": "mkeg6zeg4yihfq8lhli",
          "name": "C'est la vie",
          "rating": 10
        },
        {
          "id": "mkeg72qt6cgiuviue2t",
          "name": "The Path Less Followed",
          "rating": 7
        },
        {
          "id": "mkeg77w3izuk9jsalz",
          "name": "Actions Speak Louder Than Words",
          "rating": 7
        },
        {
          "id": "mkeg7c9dx6leq61zd5",
          "name": "Spirit Love",
          "rating": 9
        },
        {
          "id": "mkeg7foe7q0b9lox24b",
          "name": "Fill My World",
          "rating": 9
        },
        {
          "id": "mkeg7jgv255162ppxa8",
          "name": "April Fool",
          "rating": 8
        },
        {
          "id": "mkeg7n8mdxrx9iojygh",
          "name": "Call Off The Dogs",
          "rating": 8
        },
        {
          "id": "mkeg7qheiulhep86xcj",
          "name": "Fall Back To Earth",
          "rating": 9
        }
      ],
      "createdAt": 1768420928260,
      "updatedAt": 1768423573787
    },
    {
      "id": "mkej25wbyhkqru8fqpi",
      "title": "Year Of The Tiger",
      "artist": "Myles Kennedy",
      "year": "2018",
      "genre": "Rock",
      "coverArt": "https://m.media-amazon.com/images/I/817UEF0N8RL._UF1000,1000_QL80_.jpg",
      "songs": [
        {
          "id": "mkej25wb2bgnoex0j88",
          "name": " Year of the Tiger",
          "rating": 8
        },
        {
          "id": "mkej3yf0sj7ry7hgqtf",
          "name": " The Great Beyond",
          "rating": 10
        },
        {
          "id": "mkej41xltvlbubwmosr",
          "name": " Blind Faith",
          "rating": 8
        },
        {
          "id": "mkej44uf3zkina7fv44",
          "name": " Devil on the Wal",
          "rating": 9
        },
        {
          "id": "mkej48ml6m2j0gl3215",
          "name": " Ghost of Shangri La",
          "rating": 8
        },
        {
          "id": "mkej4bgp9nluvho2iou",
          "name": " Turning Stones",
          "rating": 8
        },
        {
          "id": "mkej4f61hpyy6anltg8",
          "name": " Haunted by Design",
          "rating": 9
        },
        {
          "id": "mkej4i3d1w0bjjb3hrs",
          "name": " Mother",
          "rating": 7
        },
        {
          "id": "mkej4mqwhv8m3396wzk",
          "name": " Nothing but a Name",
          "rating": 10
        },
        {
          "id": "mkej4x1outuoz17av4",
          "name": " Love Can Only Heal",
          "rating": 10
        },
        {
          "id": "mkej50w9kzughci8bah",
          "name": " Songbird",
          "rating": 8
        },
        {
          "id": "mkej55xfldou3hiox0b",
          "name": " One Fine Day",
          "rating": 8
        }
      ],
      "createdAt": 1768425796955,
      "updatedAt": 1768426007335
    },
    {
      "id": "mkhh94szj1ggdyypg5",
      "title": "All I Was",
      "artist": "Tremonti",
      "year": "2012",
      "genre": "Metal",
      "coverArt": "https://upload.wikimedia.org/wikipedia/en/c/cb/Tremontialliwascover.jpg",
      "songs": [
        {
          "id": "mkhh94sznkz0bqlt7pj",
          "name": "Leave It Alone",
          "rating": 10
        },
        {
          "id": "mkhhbpu64k0p9h0ugg",
          "name": "So You’re Afraid",
          "rating": 10
        },
        {
          "id": "mkhhbuivfwopiq1ewd7",
          "name": "Wish You Well",
          "rating": 10
        },
        {
          "id": "mkhhc1vke77jy7d9m1b",
          "name": "Brains",
          "rating": 10
        },
        {
          "id": "mkhhc6iem2ajavqs64m",
          "name": "The Thing I’ve Seen",
          "rating": 10
        },
        {
          "id": "mkhhccfops7c7joae3h",
          "name": "You Waste Your Time",
          "rating": 9
        },
        {
          "id": "mkhhch8kap45wuckv7g",
          "name": "New Way Out",
          "rating": 8
        },
        {
          "id": "mkhhcpouq223ae6wna9",
          "name": "Giving Up",
          "rating": 9
        },
        {
          "id": "mkhhcwe3gwr1zhmq996",
          "name": "Proof",
          "rating": 8
        },
        {
          "id": "mkhhdjxm6i3442js84d",
          "name": "All I Was",
          "rating": 10
        },
        {
          "id": "mkhhdo55hz7w3j79v94",
          "name": "Doesn't Matter",
          "rating": 7
        },
        {
          "id": "mkhhdyb0n9oebqtsvx",
          "name": "Decay",
          "rating": 9
        }
      ],
      "createdAt": 1768604161428,
      "updatedAt": 1768604480874
    },
    {
      "id": "mkhhgeskqd9btdypnkn",
      "title": "Cauterize",
      "artist": "Tremonti",
      "year": "2015",
      "genre": "Metal",
      "coverArt": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ2GeZpBFuNngyr2SZb6uNHeNvSfKfL1pSJiGho_5UHub_r4_9VdnI7Ky0s2OF1AnajOxZbfY6_ChdhJJjBF2As7kQ6Y7-4cg",
      "songs": [
        {
          "id": "mkhhgeskov14ywvwnnq",
          "name": "Radical Change",
          "rating": 8
        },
        {
          "id": "mkhhib6ojlop2fhnvdp",
          "name": "Flying Monkeys",
          "rating": 10
        },
        {
          "id": "mkhhig8590nwwhu14e",
          "name": "Cauterize",
          "rating": 9
        },
        {
          "id": "mkhhilkih5wtzhoe7gt",
          "name": "Arm Yourself",
          "rating": 8
        },
        {
          "id": "mkhhipthmky4t45wmn",
          "name": "Dark Trip",
          "rating": 10
        },
        {
          "id": "mkhhiucr2kcbio9j16w",
          "name": "Another Heart",
          "rating": 10
        },
        {
          "id": "mkhhiy8xy7t8lrpbpj",
          "name": "Fall Again",
          "rating": 9
        },
        {
          "id": "mkhhj1rvl38mqd9440b",
          "name": "Tie the Noose",
          "rating": 7
        },
        {
          "id": "mkhhja7zgr879roywuu",
          "name": "Sympathy",
          "rating": 8
        },
        {
          "id": "mkhhjirqan745imgvn8",
          "name": "Providence",
          "rating": 9
        }
      ],
      "createdAt": 1768604500964,
      "updatedAt": 1768604694575
    },
    {
      "id": "mkhhl486eu3mjjg3xqf",
      "title": "Dust",
      "artist": "Tremonti",
      "year": "2016",
      "genre": "Metal",
      "coverArt": "data:image/jpeg;base64,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",
      "songs": [
        {
          "id": "mkhhl486ok9jvmd1j9",
          "name": "My Last Mistake",
          "rating": 8
        },
        {
          "id": "mkhhmhy7htdzsupfl1p",
          "name": "The Cage",
          "rating": 7
        },
        {
          "id": "mkhhn16x7bjjybufojh",
          "name": "Once Dead",
          "rating": 9
        },
        {
          "id": "mkhhn4hmym8gc5f8tr",
          "name": "Dust",
          "rating": 9
        },
        {
          "id": "mkhhncp152nevzmiog8",
          "name": "Betray Me",
          "rating": 10
        },
        {
          "id": "mkhhnimqkzzqk111i4",
          "name": "Tore My Heart Out",
          "rating": 7
        },
        {
          "id": "mkhhnmov2uvcdevrw5h",
          "name": "Catching Fire",
          "rating": 9
        },
        {
          "id": "mkhhnu0p0daywm5tkmyg",
          "name": "Never Wrong",
          "rating": 8
        },
        {
          "id": "mkhho17wwwph6vi4y8r",
          "name": "Rising Storm",
          "rating": 8
        },
        {
          "id": "mkhhocnbt6sl90e0qte",
          "name": "Unable to See",
          "rating": 9
        }
      ],
      "createdAt": 1768604720550,
      "updatedAt": 1768604903888
    },
    {
      "id": "mkhhq8eh2dth52dthfy",
      "title": "A Dying Machine",
      "artist": "Tremonti",
      "year": "2018",
      "genre": "Metal",
      "coverArt": "https://www.zeitgeist.com.br/wp-content/uploads/2023/05/tremonti-dying-machine.jpg",
      "songs": [
        {
          "id": "mkhhq8ehvog6qej0l2k",
          "name": "Bringer of War",
          "rating": 9
        },
        {
          "id": "mkhhtl1jbvksy6b0twk",
          "name": "From the Sky",
          "rating": 8
        },
        {
          "id": "mkhhtrrd1tgqy3os3ws",
          "name": "A Dying Machine",
          "rating": 10
        },
        {
          "id": "mkhhu0icyac65r1i6vk",
          "name": "Trust",
          "rating": 9
        },
        {
          "id": "mkhhug125yu02xj3cr8",
          "name": "Throw Them to the Lions",
          "rating": 10
        },
        {
          "id": "mkhhuu7763snfq5sdd6",
          "name": "Make It Hurt",
          "rating": 9
        },
        {
          "id": "mkhhv0dwregyb7cnt9",
          "name": "Traipse",
          "rating": 10
        },
        {
          "id": "mkhhvdpgaqjheqx7nwe",
          "name": "The First the Last",
          "rating": 8
        },
        {
          "id": "mkhhvinqv392vv23x0c",
          "name": "A Lot Like Sin",
          "rating": 9
        },
        {
          "id": "mkhhvnudljlvnncop5l",
          "name": "The Day When Legions Burned",
          "rating": 8
        },
        {
          "id": "mkhhvtehfchatlxexsh",
          "name": "As the Silence Becomes Me",
          "rating": 10
        },
        {
          "id": "mkhhvxkzk2crq9h0jdq",
          "name": "Take You With Me",
          "rating": 7
        },
        {
          "id": "mkhhw1gvwj3g3gd7e2p",
          "name": "Desolation",
          "rating": 10
        },
        {
          "id": "mkhhwam24qjbgu2eciu",
          "name": "Found",
          "rating": 8
        },
        {
          "id": "mkhhxzdvpvdmc9nvoee",
          "name": "Now or Never",
          "rating": 8
        }
      ],
      "createdAt": 1768604959241,
      "updatedAt": 1768605415678
    },
    {
      "id": "mkhi1c2ji1uoy31u17",
      "title": "Marching In Time",
      "artist": "Tremonti",
      "year": "2021",
      "genre": "Metal",
      "coverArt": "https://f4.bcbits.com/img/a1157659606_10.jpg",
      "songs": [
        {
          "id": "mkhi1c2j6p29xn4o62h",
          "name": "A World Away",
          "rating": 7
        },
        {
          "id": "mkhi2ucxmvokwmm5om",
          "name": "Now And Forever",
          "rating": 8
        },
        {
          "id": "mkhi2xsx4a4z26acx0t",
          "name": "If Not For You",
          "rating": 10
        },
        {
          "id": "mkhi32n3ykswy43ey9k",
          "name": "Thrown Further",
          "rating": 8
        },
        {
          "id": "mkhi3o583r7w15jdhh4",
          "name": "Let That Be Us",
          "rating": 8
        },
        {
          "id": "mkhi3t051v0im5wupic",
          "name": "The Last One Of Us",
          "rating": 8
        },
        {
          "id": "mkhi3zp437zpujt8dzc",
          "name": "In One Piece",
          "rating": 8
        },
        {
          "id": "mkhi4noumkqxt9jlghe",
          "name": "Under The Sun",
          "rating": 9
        },
        {
          "id": "mkhi4rat1afahwdoaw8",
          "name": "Not Afraid To Lose",
          "rating": 8
        },
        {
          "id": "mkhi4zfgv0pcdr6xdin",
          "name": "Bleak",
          "rating": 7
        },
        {
          "id": "mkhi5501vyg5wuumjco",
          "name": "Would You Kill",
          "rating": 8
        },
        {
          "id": "mkhi58n27snc08zj3q",
          "name": "Marching In Time",
          "rating": 10
        }
      ],
      "createdAt": 1768605477211,
      "updatedAt": 1768605801565
    },
    {
      "id": "mkhi8v9ko5deke5co3a",
      "title": "The End Will Show Us How",
      "artist": "Tremonti",
      "year": "2025",
      "genre": "Metal",
      "coverArt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysdHfBS5UQg6ru6Dz0UQXVYGvSAosYK5ATQ&s",
      "songs": [
        {
          "id": "mkhi8v9kc1hpw3rvn0p",
          "name": "The Mother, The Earth and I",
          "rating": 7
        },
        {
          "id": "mkhi9rsfboei2vhskj8",
          "name": "One More Time",
          "rating": 8
        },
        {
          "id": "mkhi9wosy63l2jo3ch",
          "name": "Just Too Much",
          "rating": 7
        },
        {
          "id": "mkhia4o3ya4ardsmg7q",
          "name": "Nails",
          "rating": 8
        },
        {
          "id": "mkhia8fl06vmzaljv2tp",
          "name": "It's Not Over",
          "rating": 9
        },
        {
          "id": "mkhiad07zpdv6ah3moq",
          "name": "The End Will Show Us How",
          "rating": 8
        },
        {
          "id": "mkhiahlidfx7qn999ir",
          "name": "Tomorrow We Will Fail ",
          "rating": 8
        },
        {
          "id": "mkhialck7iqqjomotsq",
          "name": "I'll Take My Chances",
          "rating": 8
        },
        {
          "id": "mkhiapqygm92a6lvokd",
          "name": "The Bottom",
          "rating": 8
        },
        {
          "id": "mkhiaso580tj6q6md7o",
          "name": "Live In Fear",
          "rating": 8
        },
        {
          "id": "mkhiawcss3hpmbs7tsk",
          "name": "Now That I've Made It",
          "rating": 8
        },
        {
          "id": "mkhib0ipd79toqczy2",
          "name": "All The Wicked Things",
          "rating": 9
        }
      ],
      "createdAt": 1768605828680,
      "updatedAt": 1768605963011
    },
    {
      "id": "mkhif7ucsrqhal73zw",
      "title": "The Ides of March",
      "artist": "Myles Kennedy",
      "year": "2021",
      "genre": "Rock",
      "coverArt": "https://i2.wp.com/townsquare.media/site/366/files/2021/02/Myles-Kennedy-The-Ides-of-March-Artwork.jpg?w=900&ssl=1",
      "songs": [
        {
          "id": "mkhif7uc2525g5yc7oth",
          "name": "Get Along",
          "rating": 7
        },
        {
          "id": "mkhiglcgm50qrt52hse",
          "name": "A Thousand Words",
          "rating": 8
        },
        {
          "id": "mkhigoduj3zain8kj2t",
          "name": "In Stride",
          "rating": 9
        },
        {
          "id": "mkhigrgnmk9wiofotp",
          "name": "The Ides of March",
          "rating": 10
        },
        {
          "id": "mkhigu42xcqa26oivlb",
          "name": "Wake Me When It's Over",
          "rating": 10
        },
        {
          "id": "mkhigxu97ck3oiti5pc",
          "name": "Love Rain Down",
          "rating": 10
        },
        {
          "id": "mkhih1c18ibkau5u5ra",
          "name": "Tell It Like It Is",
          "rating": 8
        },
        {
          "id": "mkhih4my6lm99k7miad",
          "name": "Moonshot",
          "rating": 9
        },
        {
          "id": "mkhihbdl3npvnj4vlpl",
          "name": "Wanderlust Begins",
          "rating": 8
        },
        {
          "id": "mkhihg627v4tl25wt2w",
          "name": "Sifting Through the Fire",
          "rating": 8
        },
        {
          "id": "mkhihk4myj04189wmzi",
          "name": "Worried Mind",
          "rating": 10
        }
      ],
      "createdAt": 1768606124916,
      "updatedAt": 1768606265472
    },
    {
      "id": "mkhij1m03a4o6zq2hhl",
      "title": "The Art of Letting Go",
      "artist": "Myles Kennedy",
      "year": "2024",
      "genre": "Rock",
      "coverArt": "https://f4.bcbits.com/img/a2389577300_16.jpg",
      "songs": [
        {
          "id": "mkhij1m0mb8uxqt7ti8",
          "name": "The Art of Letting Go",
          "rating": 7
        },
        {
          "id": "mkhik28swu4hr9d23si",
          "name": "Say What You Will",
          "rating": 8
        },
        {
          "id": "mkhik5qz9xzrbz5wfhn",
          "name": "Mr. Downside",
          "rating": 7
        },
        {
          "id": "mkhikb88f9oalb24fju",
          "name": "Miss You When You’re Gone",
          "rating": 8
        },
        {
          "id": "mkhikf5butfi3l0ln6s",
          "name": "Behind The Veil",
          "rating": 8
        },
        {
          "id": "mkhikj7gvrxvpm7l52b",
          "name": "Saving Face",
          "rating": 7
        },
        {
          "id": "mkhikmz5yiez7hpwc1g",
          "name": "Eternal Lullaby",
          "rating": 10
        },
        {
          "id": "mkhikqrv8o0m7m7fbce",
          "name": "Nothing More To Gain",
          "rating": 7
        },
        {
          "id": "mkhikwpr4m96imbkow4",
          "name": "Dead To Rights",
          "rating": 7
        },
        {
          "id": "mkhil0p2ztiyuu01me",
          "name": "How The Story Ends",
          "rating": 8
        }
      ],
      "createdAt": 1768606303464,
      "updatedAt": 1768606435760
    }
  ],
  "artistImages": {
    "Alter Bridge": "data:image/jpeg;base64,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",
    "Audioslave": "https://preview.redd.it/how-do-you-guys-look-back-on-audioslave-v0-shue2vkilf5e1.jpeg?auto=webp&s=3ec0ba349618d75b95b528ae17f8c366711e86db",
    "Guns N Roses": "https://townsquare.media/site/366/files/2020/03/GettyImages-1124270720.jpg?w=780&q=75",
    "SMKC": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbpmjyzy_79LoMxEMwzRRQUSAKvCtXBsAWzA&s",
    "Foo Fighters": "https://veja.abril.com.br/wp-content/uploads/2021/02/FOOFIGHTERS-PRESS-SONY-MUSIC-1.jpg.jpg?crop=1&resize=1212,909",
    "Tremonti": "https://www.therockpit.net/wp-content/uploads/2018/04/news-tremonti2.jpg",
    "Myles Kennedy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdah2xPEXMjkoLDi4Ga0fkzKv2H8HA9DgqYA&s"
  },
  "version": 2
};

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
  const songsToDrop = sortedByRating.slice(s);
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
  
  // 1. Initialize State from LocalStorage OR Default Data
  const [albums, setAlbums] = useState(() => {
    try {
      const saved = localStorage.getItem('album_grader_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.albums) ? parsed.albums : DEFAULT_DATA.albums || [];
      }
    } catch (e) {
      console.error("Error loading albums from local storage", e);
    }
    return DEFAULT_DATA.albums || [];
  });

  const [artistImages, setArtistImages] = useState(() => {
    try {
      const saved = localStorage.getItem('album_grader_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.artistImages || DEFAULT_DATA.artistImages || {};
      }
    } catch (e) {
      return DEFAULT_DATA.artistImages || {};
    }
    return DEFAULT_DATA.artistImages || {};
  });

  // 2. Save to LocalStorage automatically whenever data changes
  useEffect(() => {
    const data = {
      albums,
      artistImages,
      version: 2,
      lastSaved: Date.now()
    };
    localStorage.setItem('album_grader_data', JSON.stringify(data));
  }, [albums, artistImages]);

  const [currentAlbumId, setCurrentAlbumId] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);

  // Modal States
  const [pendingImport, setPendingImport] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  // --- NEW: Sync Tab Title and Icon ---
  useEffect(() => {
    // 1. Set Tab Title
    document.title = "AlbumGrader";

    // 2. Set Tab Icon (Dynamic SVG Favicon)
    const setFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      // SVG: Rounded square with gradient and a 'disc' circle in the middle
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><linearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 style=%22stop-color:%23dc2626;stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:%23f97316;stop-opacity:1%22 /></linearGradient></defs><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22url(%23g)%22 /><circle cx=%2250%22 cy=%2250%22 r=%2230%22 stroke=%22white%22 stroke-width=%228%22 fill=%22none%22 /><circle cx=%2250%22 cy=%2250%22 r=%228%22 fill=%22white%22 /></svg>`;
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    setFavicon();
  }, []);

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