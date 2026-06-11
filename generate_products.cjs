const fs = require('fs');
const https = require('https');
const path = require('path');

const genres = {
  'Hip-Hop': [
    { title: 'The Chronic', artist: 'Dr. Dre' },
    { title: 'Paid in Full', artist: 'Eric B. & Rakim' },
    { title: 'Illmatic', artist: 'Nas' },
    { title: 'Ready to Die', artist: 'The Notorious B.I.G.' },
    { title: 'Enter the Wu-Tang (36 Chambers)', artist: 'Wu-Tang Clan' },
    { title: 'The Low End Theory', artist: 'A Tribe Called Quest' },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest' },
    { title: 'Reasonable Doubt', artist: 'Jay-Z' },
    { title: 'Life After Death', artist: 'The Notorious B.I.G.' },
    { title: 'Aquemini', artist: 'OutKast' },
    { title: 'The Miseducation of Lauryn Hill', artist: 'Lauryn Hill' },
    { title: '2001', artist: 'Dr. Dre' },
    { title: 'Get Rich or Die Tryin\'', artist: '50 Cent' },
    { title: 'Late Registration', artist: 'Kanye West' },
    { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar' }
  ],
  'Rock': [
    { title: 'Nevermind', artist: 'Nirvana' },
    { title: 'Dark Side of the Moon', artist: 'Pink Floyd' },
    { title: 'Abbey Road', artist: 'The Beatles' },
    { title: 'Led Zeppelin IV', artist: 'Led Zeppelin' },
    { title: 'Hotel California', artist: 'Eagles' },
    { title: 'Back in Black', artist: 'AC/DC' },
    { title: 'Rumours', artist: 'Fleetwood Mac' },
    { title: 'Born to Run', artist: 'Bruce Springsteen' },
    { title: 'The Wall', artist: 'Pink Floyd' },
    { title: 'Appetite for Destruction', artist: 'Guns N\' Roses' },
    { title: 'Achtung Baby', artist: 'U2' },
    { title: 'OK Computer', artist: 'Radiohead' },
    { title: 'Is This It', artist: 'The Strokes' },
    { title: 'London Calling', artist: 'The Clash' },
    { title: 'Elephant', artist: 'The White Stripes' }
  ],
  'Classical': [
    { title: 'Beethoven Symphony No. 5', artist: 'Ludwig van Beethoven' },
    { title: 'The Four Seasons', artist: 'Antonio Vivaldi' },
    { title: 'Clair de Lune', artist: 'Claude Debussy' },
    { title: 'Canon in D', artist: 'Johann Pachelbel' },
    { title: 'Symphony No. 9', artist: 'Ludwig van Beethoven' },
    { title: 'Eine Kleine Nachtmusik', artist: 'Wolfgang Amadeus Mozart' },
    { title: 'Nocturnes', artist: 'Frédéric Chopin' },
    { title: 'The Planets', artist: 'Gustav Holst' },
    { title: 'The Blue Danube', artist: 'Johann Strauss II' },
    { title: 'Peer Gynt', artist: 'Edvard Grieg' },
    { title: 'Swan Lake', artist: 'Pyotr Ilyich Tchaikovsky' },
    { title: 'Boléro', artist: 'Maurice Ravel' },
    { title: 'The Nutcracker', artist: 'Pyotr Ilyich Tchaikovsky' },
    { title: 'Also Sprach Zarathustra', artist: 'Richard Strauss' },
    { title: 'Air on the G String', artist: 'Johann Sebastian Bach' }
  ],
  'Top 40s': [
    { title: 'Thriller', artist: 'Michael Jackson' },
    { title: 'Purple Rain', artist: 'Prince' },
    { title: 'Rumours', artist: 'Fleetwood Mac' },
    { title: 'Saturday Night Fever', artist: 'Bee Gees' },
    { title: 'Like a Prayer', artist: 'Madonna' },
    { title: 'Bad', artist: 'Michael Jackson' },
    { title: 'The Bodyguard', artist: 'Whitney Houston' },
    { title: 'Jagged Little Pill', artist: 'Alanis Morissette' },
    { title: 'Come On Over', artist: 'Shania Twain' },
    { title: 'Let\'s Dance', artist: 'David Bowie' },
    { title: 'True Blue', artist: 'Madonna' },
    { title: 'Faith', artist: 'George Michael' },
    { title: '1999', artist: 'Prince' },
    { title: 'Born in the USA', artist: 'Bruce Springsteen' },
    { title: 'Like a Virgin', artist: 'Madonna' }
  ],
  'Movie Scenes': [
    { title: 'Pulp Fiction Dance', description: 'The iconic Jack Rabbit Slims dance scene.' },
    { title: 'The Godfather', description: 'The classic puppet-string logo.' },
    { title: 'Paid in Full', description: 'The legendary money stack scene.' },
    { title: 'Fight Club', description: 'The final scene overlooking the skyline.' },
    { title: 'Scarface', description: 'The "Say Hello to My Little Friend" moment.' },
    { title: 'Blade Runner 2049', description: 'The atmospheric neon cityscape.' },
    { title: 'The Matrix', description: 'The falling green code rain.' },
    { title: 'Inception', description: 'The spinning top on the table.' },
    { title: 'Star Wars', description: 'The twin sunset on Tatooine.' },
    { title: 'Jurassic Park', description: 'The first T-Rex reveal in the rain.' },
    { title: 'Eternal Sunshine', description: 'The couple lying on the frozen lake.' },
    { title: 'Taxi Driver', description: 'Travis Bickle in the neon night.' },
    { title: 'La La Land', description: 'The sunset dance overlooking LA.' },
    { title: 'Moonlight', description: 'The iconic blue-tinted portrait.' },
    { title: 'Parasite', description: 'The minimalist basement window view.' },
    { title: 'Friday', description: 'The legendary "Bye Felicia" moment.' },
    { title: 'The Color Purple', description: 'A story of sisterhood and resilience.' },
    { title: 'Grease', description: 'Summer nights and high school dreams.' },
    { title: 'Madea\'s Family Reunion', description: 'Family, faith, and fun.' },
    { title: 'Bad Boys', description: 'Ride together, die together.' },
    { title: 'Training Day', description: 'King Kong ain\'t got nothing on me.' },
    { title: 'The Devil Wears Prada', description: 'Fashion is a battlefield.' },
    { title: 'Shottas', description: 'The raw street culture of Kingston.' }
  ],
  'Quotes': [
    { title: 'Stay Hungry, Stay Foolish', artist: 'Steve Jobs' },
    { title: 'To Be Or Not To Be', artist: 'William Shakespeare' },
    { title: 'I Have A Dream', artist: 'Martin Luther King Jr.' },
    { title: 'Imagination is more important than knowledge', artist: 'Albert Einstein' },
    { title: 'The only thing we have to fear is fear itself', artist: 'Franklin D. Roosevelt' },
    { title: 'That\'s one small step for man', artist: 'Neil Armstrong' },
    { title: 'Be the change you wish to see in the world', artist: 'Mahatma Gandhi' },
    { title: 'In the end, we will remember not the words of our enemies', artist: 'Martin Luther King Jr.' },
    { title: 'Life is what happens when you\'re making other plans', artist: 'John Lennon' },
    { title: 'The journey of a thousand miles begins with one step', artist: 'Lao Tzu' },
    { title: 'Float like a butterfly, sting like a bee', artist: 'Muhammad Ali' },
    { title: 'Well done is better than well said', artist: 'Benjamin Franklin' },
    { title: 'Everything you can imagine is real', artist: 'Pablo Picasso' },
    { title: 'Keep calm and carry on', artist: 'British Government' },
    { title: 'Knowledge is power', artist: 'Francis Bacon' }
  ],
  'Psychedelic/Original Art': [
    { title: 'Amanita Muscaria', artist: 'Kapsule Originals' },
    { title: 'Neon Nebula', artist: 'Kapsule Originals' },
    { title: 'Fractal Forest', artist: 'Kapsule Originals' },
    { title: 'Electric Dreams', artist: 'Kapsule Originals' },
    { title: 'Celestial Garden', artist: 'Kapsule Originals' },
    { title: 'Prism Pathway', artist: 'Kapsule Originals' },
    { title: 'Liquid Light', artist: 'Kapsule Originals' },
    { title: 'Cosmic Mushroom', artist: 'Kapsule Originals' },
    { title: 'Astral Plane', artist: 'Kapsule Originals' },
    { title: 'Geometric Galaxy', artist: 'Kapsule Originals' },
    { title: 'Melting Moments', artist: 'Kapsule Originals' },
    { title: 'Vortex Vision', artist: 'Kapsule Originals' },
    { title: 'Spirit Guide', artist: 'Kapsule Originals' },
    { title: 'Technicolor Tundra', artist: 'Kapsule Originals' },
    { title: 'Dream Weaver', artist: 'Kapsule Originals' }
  ]
};

function fetchDeezerCover(title, artist) {
  return new Promise((resolve) => {
    const query = encodeURIComponent(`artist:"${artist}" album:"${title}"`);
    https.get(`https://api.deezer.com/search?q=${query}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.data && json.data.length > 0) {
            resolve(json.data[0].album.cover_xl);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function generate() {
  const products = [];
  const specialUrls = {
    // Music
    'The Chronic': 'https://cdn-images.dzcdn.net/images/cover/36cffacf94fdcc49921affe8a865f6f1/1000x1000-000000-80-0-0.jpg',
    'Nevermind': 'https://cdn-images.dzcdn.net/images/cover/fb71ce45bc9d3f2cb53977cf18d43b0a/1000x1000-000000-80-0-0.jpg',
    'Dark Side of the Moon': 'https://cdn-images.dzcdn.net/images/cover/e635a8510c1a74bc089b3566ebbb9cb8/1000x1000-000000-80-0-0.jpg',
    'Abbey Road': 'https://cdn-images.dzcdn.net/images/cover/aa94ab293730bb7845d2aa8c672b2c29/1000x1000-000000-80-0-0.jpg',
    'Thriller': 'https://cdn-images.dzcdn.net/images/cover/92a024220a9532489c75c9d994835697/1000x1000-000000-80-0-0.jpg',
    'Paid in Full': 'https://cdn-images.dzcdn.net/images/cover/c5a0ba17814011f4ccce2efec2eb4d67/1000x1000-000000-80-0-0.jpg',
    'Illmatic': 'https://cdn-images.dzcdn.net/images/cover/4c2dc31af4f87864afcdb6ab599c7960/1000x1000-000000-80-0-0.jpg',
    
    // Movie Scenes
    'Pulp Fiction Dance': 'https://upload.wikimedia.org/wikipedia/en/2/29/Pulp_Fiction_%281994%29_poster.jpg',
    'The Godfather': 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    'Fight Club': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
    'Scarface': 'https://upload.wikimedia.org/wikipedia/en/7/7f/Scarfaceposter.jpg',
    'Blade Runner 2049': 'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png',
    'The Matrix': 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    'Inception': 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    'Star Wars': 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
    'Jurassic Park': 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg',
    'Eternal Sunshine': 'https://upload.wikimedia.org/wikipedia/en/6/6b/Eternal_sunshine_sm.jpg',
    'Taxi Driver': 'https://upload.wikimedia.org/wikipedia/en/3/3d/Taxi_Driver_%281976_film%29_poster.jpg',
    'La La Land': 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29_poster.png',
    'Moonlight': 'https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29.png',
    'Parasite': 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29_poster.jpg',
    'Friday': 'https://upload.wikimedia.org/wikipedia/en/2/27/Fridayposter1995.jpg',
    'The Color Purple': 'https://upload.wikimedia.org/wikipedia/en/b/be/The_Color_Purple_poster.jpg',
    'Grease': 'https://upload.wikimedia.org/wikipedia/en/e/e2/Grease_ver2.jpg',
    'Madea\'s Family Reunion': 'https://upload.wikimedia.org/wikipedia/en/2/21/Madea%27s_Family_Reunion.jpg',
    'Bad Boys': 'https://upload.wikimedia.org/wikipedia/en/a/a8/Bad_Boys.jpg',
    'Training Day': 'https://upload.wikimedia.org/wikipedia/en/b/b3/Training_Day_Poster.jpg',
    'The Devil Wears Prada': 'https://upload.wikimedia.org/wikipedia/en/e/e7/The_Devil_Wears_Prada_main_onesheet.jpg',
    'Shottas': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Shottas2002Film.jpg',

    // Classical
    'Swan Lake': 'https://images.unsplash.com/photo-1507838155914-a4f5f94cf6dc?auto=format&fit=crop&q=80&w=1000',
    'The Nutcracker': 'https://images.unsplash.com/photo-1465847793335-da3b44f50633?auto=format&fit=crop&q=80&w=1000',

    // Quotes
    'Stay Hungry, Stay Foolish': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000',
    'To Be Or Not To Be': 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1000',
    'I Have A Dream': 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=1000',
    'Imagination is more important than knowledge': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    'The only thing we have to fear is fear itself': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1000',
    'That\'s one small step for man': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    'Be the change you wish to see in the world': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000',
    'In the end, we will remember not the words of our enemies': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000',
    'Life is what happens when you\'re making other plans': 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=1000',
    'The journey of a thousand miles begins with one step': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000',
    'Float like a butterfly, sting like a bee': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1000',
    'Well done is better than well said': 'https://images.unsplash.com/photo-1532619187609-e3a4c52e7ff4?auto=format&fit=crop&q=80&w=1000',
    'Everything you can imagine is real': 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&q=80&w=1000',
    'Keep calm and carry on': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000',
    'Knowledge is power': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',

    // Psychedelic
    'Amanita Muscaria': 'https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80&w=1000',
    'Neon Nebula': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000',
    'Fractal Forest': 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=80&w=1000',
    'Electric Dreams': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000',
    'Celestial Garden': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000',
    'Prism Pathway': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000',
    'Liquid Light': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000',
    'Cosmic Mushroom': 'https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80&w=1000',
    'Astral Plane': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000',
    'Geometric Galaxy': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000',
    'Melting Moments': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000',
    'Vortex Vision': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000',
    'Spirit Guide': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000',
    'Technicolor Tundra': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000',
    'Dream Weaver': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000'
  };

  let globalIndex = 1;

  for (const [genre, items] of Object.entries(genres)) {
    let genreIndex = 1;
    for (const item of items) {
      let imageUrl = specialUrls[item.title];
      
      if (!imageUrl && ['Hip-Hop', 'Rock', 'Classical', 'Top 40s'].includes(genre)) {
        imageUrl = await fetchDeezerCover(item.title, item.artist);
      }
      
      if (!imageUrl) {
        // Fallback or Unsplash for non-music
        const query = encodeURIComponent(`${item.title} ${genre}`);
        imageUrl = `https://images.unsplash.com/photo-1?auto=format&fit=crop&q=80&w=1200&sig=${globalIndex}`;
      }

      const isTriptych = [2, 9, 12].includes(genreIndex) && genre !== 'Movie Scenes'; // Consistent triptych slots per genre, except Movie Scenes
      
      let price = isTriptych ? 349 : 129;
      let type = isTriptych ? 'triptych' : 'single';
      let dimensions = isTriptych ? '36" x 12" (Three 12" x 12" panels)' : '12" x 12"';
      let features = ['Museum-quality acrylic', 'French-pleat back', isTriptych ? 'Seamless alignment' : 'Floating effect'];
      let description = item.description || `${item.title} by ${item.artist}, immortalized in museum-quality acrylic.`;

      if (genre === 'Movie Scenes') {
        price = 500;
        type = 'single';
        dimensions = '27" x 40"';
        features = ["Museum-quality acrylic", "French-pleat back", "Full-size 27x40 movie poster format", "Floating effect"];
        description = (item.description || item.title) + " Premium 27x40 vertical acrylic format.";
      }

      products.push({
        id: String(globalIndex++),
        title: item.title,
        artist: item.artist || undefined,
        description: description,
        price: price,
        category: genre,
        type: type,
        imageUrl: imageUrl,
        dimensions: dimensions,
        features: features
      });
      genreIndex++;
    }
  }

  const content = `import type { Product } from '../types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;
  
  fs.writeFileSync(path.join(__dirname, 'src/data/products.ts'), content);
  console.log('Generated ' + products.length + ' products.');
}

generate();
