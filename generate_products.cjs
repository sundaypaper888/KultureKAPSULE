
const fs = require('fs');
const https = require('https');

const genres = {
  'Hip-Hop': [
    { title: 'The Chronic', artist: 'Dr. Dre' },
    { title: 'Paid in Full', artist: 'Eric B. & Rakim' },
    { title: 'Illmatic', artist: 'Nas' },
    { title: 'Ready to Die', artist: 'The Notorious B.I.G.' },
    { title: '36 Chambers', artist: 'Wu-Tang Clan' },
    { title: 'The Low End Theory', artist: 'A Tribe Called Quest' },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest' },
    { title: 'Reasonable Doubt', artist: 'Jay-Z' },
    { title: 'Life After Death', artist: 'The Notorious B.I.G.' },
    { title: 'Aquemini', artist: 'Outkast' },
    { title: 'The Miseducation of Lauryn Hill', artist: 'Lauryn Hill' },
    { title: '2001', artist: 'Dr. Dre' },
    { title: 'Get Rich or Die Tryin\'', artist: '50 Cent' },
    { title: 'Late Registration', artist: 'Kanye West' },
    { title: 'Good Kid M.A.A.D City', artist: 'Kendrick Lamar' }
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
    { title: 'Parasite', description: 'The minimalist basement window view.' }
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
    const query = encodeURIComponent(`${title} ${artist}`);
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
  let idCounter = 1;

  const specialUrls = {
    'The Chronic': 'https://cdn-images.dzcdn.net/images/cover/36cffacf94fdcc49921affe8a865f6f1/1000x1000-000000-80-0-0.jpg',
    'Nevermind': 'https://cdn-images.dzcdn.net/images/cover/fb71ce45bc9d3f2cb53977cf18d43b0a/1000x1000-000000-80-0-0.jpg',
    'Dark Side of the Moon': 'https://cdn-images.dzcdn.net/images/cover/e635a8510c1a74bc089b3566ebbb9cb8/1000x1000-000000-80-0-0.jpg',
    'Abbey Road': 'https://cdn-images.dzcdn.net/images/cover/aa94ab293730bb7845d2aa8c672b2c29/1000x1000-000000-80-0-0.jpg',
    'Thriller': 'https://cdn-images.dzcdn.net/images/cover/92a024220a9532489c75c9d994835697/1000x1000-000000-80-0-0.jpg',
    'Paid in Full': 'https://cdn-images.dzcdn.net/images/cover/c5a0ba17814011f4ccce2efec2eb4d67/1000x1000-000000-80-0-0.jpg',
    'Illmatic': 'https://cdn-images.dzcdn.net/images/cover/4c2dc31af4f87864afcdb6ab599c7960/1000x1000-000000-80-0-0.jpg'
  };

  for (const [genre, items] of Object.entries(genres)) {
    for (const item of items) {
      let imageUrl = specialUrls[item.title];
      
      if (!imageUrl && ['Hip-Hop', 'Rock', 'Classical', 'Top 40s'].includes(genre)) {
        imageUrl = await fetchDeezerCover(item.title, item.artist);
      }
      
      if (!imageUrl) {
        // Fallback or Unsplash for non-music
        const query = encodeURIComponent(`${item.title} ${genre}`);
        imageUrl = `https://images.unsplash.com/photo-1?auto=format&fit=crop&q=80&w=1200&sig=${idCounter}`; // Mocking with sig
      }

      const isTriptych = [2, 9, 12].includes(idCounter % 15); // Randomly make some triptychs

      products.push({
        id: String(idCounter++),
        title: item.title,
        artist: item.artist || undefined,
        description: item.description || `${item.title} by ${item.artist}, immortalized in museum-quality acrylic.`,
        price: isTriptych ? 349 : 129,
        category: genre,
        type: isTriptych ? 'triptych' : 'single',
        imageUrl: imageUrl,
        dimensions: isTriptych ? '36" x 12" (Three 12" x 12" panels)' : '12" x 12"',
        features: ['Museum-quality acrylic', 'French-pleat back', isTriptych ? 'Seamless alignment' : 'Floating effect']
      });
    }
  }

  // Specific additions requested by lead
  products.push({
    id: String(idCounter++),
    title: 'Paid in Full (Single)',
    artist: 'Eric B. & Rakim',
    description: 'The definitive Golden Age hip-hop cover, immortalized in a single 12x12 acrylic panel.',
    price: 129,
    category: 'Hip-Hop',
    type: 'single',
    imageUrl: specialUrls['Paid in Full'],
    dimensions: '12" x 12"',
    features: ['Museum-quality acrylic', 'French-pleat back', 'Floating effect']
  });

  products.push({
    id: String(idCounter++),
    title: 'Illmatic (Single)',
    artist: 'Nas',
    description: 'Nas\'s debut masterpiece, immortalized in a single 12x12 acrylic panel.',
    price: 129,
    category: 'Hip-Hop',
    type: 'single',
    imageUrl: specialUrls['Illmatic'],
    dimensions: '12" x 12"',
    features: ['Museum-quality acrylic', 'French-pleat back', 'Floating effect']
  });

  const content = `import type { Product } from '../types';\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  const path = require('path');
  fs.writeFileSync(path.join(__dirname, 'src/data/products.ts'), content);
  console.log('Generated 105 products.');
}

generate();
