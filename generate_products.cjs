const fs = require('fs');
const https = require('https');
const path = require('path');

const genres = {
  'Hip-Hop': [
    { title: 'The Chronic', artist: 'Dr. Dre', year: 1992, weeksAtNo1: 0, salesMillion: 3, grammys: 1 },
    { title: 'Paid in Full', artist: 'Eric B. & Rakim', year: 1987, weeksAtNo1: 0, salesMillion: 1, grammys: 0 },
    { title: 'Illmatic', artist: 'Nas', year: 1994, weeksAtNo1: 0, salesMillion: 2, grammys: 0 },
    { title: 'Ready to Die', artist: 'The Notorious B.I.G.', year: 1994, weeksAtNo1: 0, salesMillion: 6, grammys: 0 },
    { title: 'Enter the Wu-Tang (36 Chambers)', artist: 'Wu-Tang Clan', year: 1993, weeksAtNo1: 0, salesMillion: 3, grammys: 0 },
    { title: 'The Low End Theory', artist: 'A Tribe Called Quest', year: 1991, weeksAtNo1: 0, salesMillion: 1, grammys: 0 },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest', year: 1993, weeksAtNo1: 0, salesMillion: 1, grammys: 0 },
    { title: 'Reasonable Doubt', artist: 'Jay-Z', year: 1996, weeksAtNo1: 0, salesMillion: 1, grammys: 0 },
    { title: 'Life After Death', artist: 'The Notorious B.I.G.', year: 1997, weeksAtNo1: 4, salesMillion: 11, grammys: 0 },
    { title: 'Aquemini', artist: 'OutKast', year: 1998, weeksAtNo1: 0, salesMillion: 2, grammys: 0 },
    { title: 'The Miseducation of Lauryn Hill', artist: 'Lauryn Hill', year: 1998, weeksAtNo1: 4, salesMillion: 20, grammys: 5 },
    { title: '2001', artist: 'Dr. Dre', year: 1999, weeksAtNo1: 0, salesMillion: 6, grammys: 1 },
    { title: 'Get Rich or Die Tryin\'', artist: '50 Cent', year: 2003, weeksAtNo1: 6, salesMillion: 9, grammys: 1 },
    { title: 'Late Registration', artist: 'Kanye West', year: 2005, weeksAtNo1: 2, salesMillion: 3, grammys: 3 },
    { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', year: 2012, weeksAtNo1: 0, salesMillion: 3, grammys: 7 }
  ],
  'Rock': [
    { title: 'Nevermind', artist: 'Nirvana', year: 1991, weeksAtNo1: 2, salesMillion: 30, grammys: 2 },
    { title: 'Dark Side of the Moon', artist: 'Pink Floyd', year: 1973, weeksAtNo1: 1, salesMillion: 45, grammys: 1 },
    { title: 'Abbey Road', artist: 'The Beatles', year: 1969, weeksAtNo1: 11, salesMillion: 12, grammys: 1 },
    { title: 'Led Zeppelin IV', artist: 'Led Zeppelin', year: 1971, weeksAtNo1: 0, salesMillion: 37, grammys: 0 },
    { title: 'Hotel California', artist: 'Eagles', year: 1976, weeksAtNo1: 8, salesMillion: 32, grammys: 2 },
    { title: 'Back in Black', artist: 'AC/DC', year: 1980, weeksAtNo1: 0, salesMillion: 50, grammys: 0 },
    { title: 'Rumours', artist: 'Fleetwood Mac', year: 1977, weeksAtNo1: 31, salesMillion: 40, grammys: 1 },
    { title: 'Born to Run', artist: 'Bruce Springsteen', year: 1975, weeksAtNo1: 0, salesMillion: 6, grammys: 0 },
    { title: 'The Wall', artist: 'Pink Floyd', year: 1979, weeksAtNo1: 15, salesMillion: 23, grammys: 1 },
    { title: 'Appetite for Destruction', artist: 'Guns N\' Roses', year: 1987, weeksAtNo1: 5, salesMillion: 30, grammys: 0 },
    { title: 'Achtung Baby', artist: 'U2', year: 1991, weeksAtNo1: 1, salesMillion: 18, grammys: 1 },
    { title: 'OK Computer', artist: 'Radiohead', year: 1997, weeksAtNo1: 0, salesMillion: 5, grammys: 1 },
    { title: 'Is This It', artist: 'The Strokes', year: 2001, weeksAtNo1: 0, salesMillion: 2, grammys: 1 },
    { title: 'London Calling', artist: 'The Clash', year: 1979, weeksAtNo1: 0, salesMillion: 5, grammys: 0 },
    { title: 'Elephant', artist: 'The White Stripes', year: 2003, weeksAtNo1: 0, salesMillion: 4, grammys: 2 }
  ],
  'Classical': [
    { title: 'Beethoven Symphony No. 5', artist: 'Ludwig van Beethoven', year: 1808, generalImpact: 'One of the most recognizable compositions in classical music' },
    { title: 'The Four Seasons', artist: 'Antonio Vivaldi', year: 1723, generalImpact: 'Revolutionized the concerto form' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', year: 1905, generalImpact: 'An impressionist masterpiece for piano' },
    { title: 'Canon in D', artist: 'Johann Pachelbel', year: 1680, generalImpact: 'The most popular wedding processional in history' },
    { title: 'Symphony No. 9', artist: 'Ludwig van Beethoven', year: 1824, generalImpact: 'A monumental work featuring the "Ode to Joy"' },
    { title: 'Eine Kleine Nachtmusik', artist: 'Wolfgang Amadeus Mozart', year: 1787, generalImpact: 'The quintessential example of the Serenade form' },
    { title: 'Nocturnes', artist: 'Frédéric Chopin', year: 1832, generalImpact: 'Defined the romantic piano nocturne' },
    { title: 'The Planets', artist: 'Gustav Holst', year: 1916, generalImpact: 'A celestial journey that influenced modern film scores' },
    { title: 'The Blue Danube', artist: 'Johann Strauss II', year: 1866, generalImpact: 'The unofficial national anthem of Austria' },
    { title: 'Peer Gynt', artist: 'Edvard Grieg', year: 1875, generalImpact: 'Captures the magic and mystery of Scandinavian folklore' },
    { title: 'Swan Lake', artist: 'Pyotr Ilyich Tchaikovsky', year: 1876, generalImpact: 'The world\'s most beloved and enduring ballet' },
    { title: 'Boléro', artist: 'Maurice Ravel', year: 1928, generalImpact: 'A hypnotic study in orchestral crescendo' },
    { title: 'The Nutcracker', artist: 'Pyotr Ilyich Tchaikovsky', year: 1892, generalImpact: 'An annual Christmas tradition worldwide' },
    { title: 'Also Sprach Zarathustra', artist: 'Richard Strauss', year: 1896, generalImpact: 'Famous for its powerful opening, immortalized in "2001: A Space Odyssey"' },
    { title: 'Air on the G String', artist: 'Johann Sebastian Bach', year: 1723, generalImpact: 'A timeless expression of Baroque elegance and serenity' }
  ],
  'Top 40s': [
    { title: 'Thriller', artist: 'Michael Jackson', year: 1982, weeksAtNo1: 37, salesMillion: 70, grammys: 8 },
    { title: 'Purple Rain', artist: 'Prince', year: 1984, weeksAtNo1: 24, salesMillion: 25, grammys: 1 },
    { title: 'Rumours', artist: 'Fleetwood Mac', year: 1977, weeksAtNo1: 31, salesMillion: 40, grammys: 1 },
    { title: 'Saturday Night Fever', artist: 'Bee Gees', year: 1977, weeksAtNo1: 24, salesMillion: 40, grammys: 5 },
    { title: 'Like a Prayer', artist: 'Madonna', year: 1989, weeksAtNo1: 6, salesMillion: 15, grammys: 0 },
    { title: 'Bad', artist: 'Michael Jackson', year: 1987, weeksAtNo1: 6, salesMillion: 35, grammys: 2 },
    { title: 'The Bodyguard', artist: 'Whitney Houston', year: 1992, weeksAtNo1: 20, salesMillion: 45, grammys: 3 },
    { title: 'Jagged Little Pill', artist: 'Alanis Morissette', year: 1995, weeksAtNo1: 12, salesMillion: 33, grammys: 5 },
    { title: 'Come On Over', artist: 'Shania Twain', year: 1997, weeksAtNo1: 0, salesMillion: 40, grammys: 2 },
    { title: 'Let\'s Dance', artist: 'David Bowie', year: 1983, weeksAtNo1: 0, salesMillion: 10, grammys: 0 },
    { title: 'True Blue', artist: 'Madonna', year: 1986, weeksAtNo1: 5, salesMillion: 25, grammys: 0 },
    { title: 'Faith', artist: 'George Michael', year: 1987, weeksAtNo1: 12, salesMillion: 20, grammys: 2 },
    { title: '1999', artist: 'Prince', year: 1982, weeksAtNo1: 0, salesMillion: 4, grammys: 0 },
    { title: 'Born in the USA', artist: 'Bruce Springsteen', year: 1984, weeksAtNo1: 7, salesMillion: 30, grammys: 1 },
    { title: 'Like a Virgin', artist: 'Madonna', year: 1984, weeksAtNo1: 3, salesMillion: 21, grammys: 0 }
  ],
  'Movie Scenes': [
    { title: 'Pulp Fiction Dance', year: 1994, boxOffice: 214, director: 'Quentin Tarantino', stars: 'John Travolta, Uma Thurman and Samuel L. Jackson', academyAwards: 1, rottenTomatoes: 92, sceneName: 'Jack Rabbit Slims dance' },
    { title: 'The Godfather', year: 1972, boxOffice: 250, director: 'Francis Ford Coppola', stars: 'Marlon Brando and Al Pacino', academyAwards: 3, rottenTomatoes: 97, sceneName: 'opening wedding' },
    { title: 'Paid in Full', year: 2002, boxOffice: 3, director: 'Charles Stone III', stars: 'Wood Harris and Mekhi Phifer', academyAwards: 0, rottenTomatoes: 53, sceneName: 'money stack' },
    { title: 'Fight Club', year: 1999, boxOffice: 101, director: 'David Fincher', stars: 'Brad Pitt and Edward Norton', academyAwards: 0, rottenTomatoes: 79, sceneName: 'skyline ending' },
    { title: 'Scarface', year: 1983, boxOffice: 66, director: 'Brian De Palma', stars: 'Al Pacino', academyAwards: 0, rottenTomatoes: 79, sceneName: '"Say Hello to My Little Friend"' },
    { title: 'Blade Runner 2049', year: 2017, boxOffice: 259, director: 'Denis Villeneuve', stars: 'Ryan Gosling and Harrison Ford', academyAwards: 2, rottenTomatoes: 88, sceneName: 'neon cityscape' },
    { title: 'The Matrix', year: 1999, boxOffice: 467, director: 'The Wachowskis', stars: 'Keanu Reeves', academyAwards: 4, rottenTomatoes: 83, sceneName: 'code rain' },
    { title: 'Inception', year: 2010, boxOffice: 836, director: 'Christopher Nolan', stars: 'Leonardo DiCaprio', academyAwards: 4, rottenTomatoes: 87, sceneName: 'spinning top' },
    { title: 'Star Wars', year: 1977, boxOffice: 775, director: 'George Lucas', stars: 'Mark Hamill and Harrison Ford', academyAwards: 6, rottenTomatoes: 93, sceneName: 'twin sunset' },
    { title: 'Jurassic Park', year: 1993, boxOffice: 1033, director: 'Steven Spielberg', stars: 'Sam Neill and Laura Dern', academyAwards: 3, rottenTomatoes: 91, sceneName: 'T-Rex reveal' },
    { title: 'Eternal Sunshine', year: 2004, boxOffice: 74, director: 'Michel Gondry', stars: 'Jim Carrey and Kate Winslet', academyAwards: 1, rottenTomatoes: 92, sceneName: 'frozen lake' },
    { title: 'Taxi Driver', year: 1976, boxOffice: 28, director: 'Martin Scorsese', stars: 'Robert De Niro', academyAwards: 0, rottenTomatoes: 89, sceneName: 'neon night' },
    { title: 'La La Land', year: 2016, boxOffice: 448, director: 'Damien Chazelle', stars: 'Ryan Gosling and Emma Stone', academyAwards: 6, rottenTomatoes: 91, sceneName: 'sunset dance' },
    { title: 'Moonlight', year: 2016, boxOffice: 65, director: 'Barry Jenkins', stars: 'Trevante Rhodes', academyAwards: 3, rottenTomatoes: 98, sceneName: 'blue-tinted portrait' },
    { title: 'Parasite', year: 2019, boxOffice: 263, director: 'Bong Joon-ho', stars: 'Song Kang-ho', academyAwards: 4, rottenTomatoes: 99, sceneName: 'basement window' },
    { title: 'Friday', year: 1995, boxOffice: 28, director: 'F. Gary Gray', stars: 'Ice Cube and Chris Tucker', academyAwards: 0, rottenTomatoes: 78, sceneName: '"Bye Felicia"' },
    { title: 'The Color Purple', year: 1985, boxOffice: 142, director: 'Steven Spielberg', stars: 'Whoopi Goldberg', academyAwards: 0, rottenTomatoes: 73, sceneName: 'sisterhood' },
    { title: 'Grease', year: 1978, boxOffice: 396, director: 'Randal Kleiser', stars: 'John Travolta and Olivia Newton-John', academyAwards: 0, rottenTomatoes: 75, sceneName: 'summer nights' },
    { title: 'Madea\'s Family Reunion', year: 2006, boxOffice: 63, director: 'Tyler Perry', stars: 'Tyler Perry', academyAwards: 0, rottenTomatoes: 26, sceneName: 'family reunion' },
    { title: 'Bad Boys', year: 1995, boxOffice: 141, director: 'Michael Bay', stars: 'Will Smith and Martin Lawrence', academyAwards: 0, rottenTomatoes: 42, sceneName: 'ride together' },
    { title: 'Training Day', year: 2001, boxOffice: 104, director: 'Antoine Fuqua', stars: 'Denzel Washington and Ethan Hawke', academyAwards: 1, rottenTomatoes: 73, sceneName: 'King Kong' },
    { title: 'The Devil Wears Prada', year: 2006, boxOffice: 326, director: 'David Frankel', stars: 'Meryl Streep and Anne Hathaway', academyAwards: 0, rottenTomatoes: 75, sceneName: 'fashion battlefield' },
    { title: 'Shottas', year: 2002, boxOffice: 0.9, director: 'Cess Silvera', stars: 'Ky-Mani Marley and Spragga Benz', academyAwards: 0, rottenTomatoes: 0, sceneName: 'Kingston street' }
  ],
  'Quotes': [
    { title: 'Stay Hungry, Stay Foolish', artist: 'Steve Jobs', year: 2005, quote: 'Stay Hungry, Stay Foolish' },
    { title: 'To Be Or Not To Be', artist: 'William Shakespeare', year: 1600, quote: 'To Be Or Not To Be' },
    { title: 'I Have A Dream', artist: 'Martin Luther King Jr.', year: 1963, quote: 'I Have A Dream' },
    { title: 'Imagination is more important than knowledge', artist: 'Albert Einstein', year: 1929, quote: 'Imagination is more important than knowledge' },
    { title: 'The only thing we have to fear is fear itself', artist: 'Franklin D. Roosevelt', year: 1933, quote: 'The only thing we have to fear is fear itself' },
    { title: 'That\'s one small step for man', artist: 'Neil Armstrong', year: 1969, quote: 'That\'s one small step for man' },
    { title: 'Be the change you wish to see in the world', artist: 'Mahatma Gandhi', year: 1913, quote: 'Be the change you wish to see in the world' },
    { title: 'In the end, we will remember not the words of our enemies', artist: 'Martin Luther King Jr.', year: 1967, quote: 'In the end, we will remember not the words of our enemies' },
    { title: 'Life is what happens when you\'re making other plans', artist: 'John Lennon', year: 1980, quote: 'Life is what happens when you\'re making other plans' },
    { title: 'The journey of a thousand miles begins with one step', artist: 'Lao Tzu', year: -400, quote: 'The journey of a thousand miles begins with one step' },
    { title: 'Float like a butterfly, sting like a bee', artist: 'Muhammad Ali', year: 1964, quote: 'Float like a butterfly, sting like a bee' },
    { title: 'Well done is better than well said', artist: 'Benjamin Franklin', year: 1737, quote: 'Well done is better than well said' },
    { title: 'Everything you can imagine is real', artist: 'Pablo Picasso', year: 1940, quote: 'Everything you can imagine is real' },
    { title: 'Keep calm and carry on', artist: 'British Government', year: 1939, quote: 'Keep calm and carry on' },
    { title: 'Knowledge is power', artist: 'Francis Bacon', year: 1597, quote: 'Knowledge is power' }
  ],
  'Psychedelic/Original Art': [
    { title: 'Amanita Muscaria', artist: 'Kapsule Originals', scientificDescription: 'Amanita muscaria (Fly Agaric) contains the psychoactive compounds ibotenic acid and muscimol. Known for its sedative and dissociative properties, it has been used in shamanic traditions for centuries.' },
    { title: 'Neon Nebula', artist: 'Kapsule Originals', scientificDescription: 'Psilocybin (4-phosphoryloxy-N,N-dimethyltryptamine) is a naturally occurring psychedelic prodrug compound produced by more than 200 species of mushrooms, notably of the Psilocybe genus.' },
    { title: 'Fractal Forest', artist: 'Kapsule Originals', scientificDescription: 'Psilocin (4-hydroxy-N,N-dimethyltryptamine) is the pharmacologically active agent in the body resulting from the dephosphorylation of psilocybin, interacting primarily with serotonin receptors.' },
    { title: 'Electric Dreams', artist: 'Kapsule Originals', scientificDescription: 'DMT (N,N-Dimethyltryptamine) is a substituted tryptamine found in many plants such as Psychotria viridis. It is known for producing intense, short-acting hallucinogenic effects.' },
    { title: 'Celestial Garden', artist: 'Kapsule Originals', scientificDescription: 'Mescaline (3,4,5-trimethoxyphenethylamine) is a naturally occurring alkaloid found in the Peyote cactus (Lophophora williamsii) and San Pedro cactus, inducing a state of altered perception.' },
    { title: 'Prism Pathway', artist: 'Kapsule Originals', scientificDescription: 'Claviceps purpurea (Ergot) is a fungus that grows on rye and related plants. It is the primary source of ergotamine, used by Albert Hofmann to synthesize LSD-25.' },
    { title: 'Liquid Light', artist: 'Kapsule Originals', scientificDescription: 'Psilocybe cubensis is a species of psychedelic mushroom whose principal active compounds are psilocybin and psilocin. It is the most popular species for mycological research.' },
    { title: 'Cosmic Mushroom', artist: 'Kapsule Originals', scientificDescription: 'Lophophora williamsii (Peyote) is a small, spineless cactus containing the psychoactive alkaloid mescaline. It has a long history of ritual use by indigenous peoples.' },
    { title: 'Astral Plane', artist: 'Kapsule Originals', scientificDescription: 'A high-fidelity abstract representation of expanded consciousness, illustrating the neural connectivity and pattern recognition associated with altered states of perception.' },
    { title: 'Geometric Galaxy', artist: 'Kapsule Originals', scientificDescription: 'Exploration of geometric fractal patterns commonly associated with altered states of perception and the mathematical beauty of the natural world.' },
    { title: 'Melting Moments', artist: 'Kapsule Originals', scientificDescription: 'Captures the fluid nature of visual perception during intense sensory experiences, reflecting the neuroplasticity and cognitive flexibility of the human brain.' },
    { title: 'Vortex Vision', artist: 'Kapsule Originals', scientificDescription: 'A visual study of the \'vortex\' effect often reported in deep meditative or psychedelic states, rendered with exceptional depth and clarity.' },
    { title: 'Spirit Guide', artist: 'Kapsule Originals', scientificDescription: 'Representing the \'entity\' or \'guide\' archetypes frequently encountered in transcendental journeys across various global cultures and traditions.' },
    { title: 'Technicolor Tundra', artist: 'Kapsule Originals', scientificDescription: 'A vibrant landscape transformation reflecting the enhanced color saturation and hyper-reality often experienced in the natural world during altered states.' },
    { title: 'Dream Weaver', artist: 'Kapsule Originals', scientificDescription: 'A complex web of interconnected thoughts and visions, illustrating the synaptic pruning and network crosstalk associated with mind-expanding compounds.' }
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
    'Amanita Muscaria': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/1280px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg',
    'Neon Nebula': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Psilocybin%2C_Kekul%C3%A9%2C_skeletal_formula_of_canonical_psilocybin.svg/1280px-Psilocybin%2C_Kekul%C3%A9%2C_skeletal_formula_of_canonical_psilocybin.svg.png',
    'Fractal Forest': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Psilocine_skeletal_formula.svg/1280px-Psilocine_skeletal_formula.svg.png',
    'Electric Dreams': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/DMT.svg/1280px-DMT.svg.png',
    'Celestial Garden': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mescaline_Structural_Formulae_bondline.svg/1280px-Mescaline_Structural_Formulae_bondline.svg.png',
    'Prism Pathway': 'https://upload.wikimedia.org/wikipedia/commons/2/26/Claviceps_purpurea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-185.jpg',
    'Liquid Light': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Cubensis_Xalapa.jpg/1280px-Cubensis_Xalapa.jpg',
    'Cosmic Mushroom': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Peyote_Cactus.jpg',
    'Astral Plane': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000',
    'Geometric Galaxy': 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000',
    'Melting Moments': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000',
    'Vortex Vision': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000',
    'Spirit Guide': 'https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80&w=1000',
    'Technicolor Tundra': 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=80&w=1000',
    'Dream Weaver': 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&q=80&w=1000'
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
      
      let description = '';
      if (['Hip-Hop', 'Rock', 'Classical', 'Top 40s'].includes(genre)) {
        if (genre === 'Classical') {
          description = `Premiered in ${item.year}, ${item.title} by ${item.artist} is ${item.generalImpact}. Preserved here in premium museum-quality acrylic — a true Kulture Kapsule.`;
        } else {
          description = `Released in ${item.year}, ${item.title} by ${item.artist} spent ${item.weeksAtNo1 || 0} weeks at #1 on the Billboard 200, sold ${item.salesMillion || 0} million copies worldwide, and won ${item.grammys || 0} Grammy awards. ${item.title} is widely regarded as one of the greatest albums of all time, shaping ${genre} for generations to come. Preserved here in premium museum-quality acrylic — a true Kulture Kapsule.`;
        }
      } else if (genre === 'Movie Scenes') {
        description = `Released in ${item.year}, ${item.title} grossed over $${item.boxOffice}M at the global box office. Directed by ${item.director} and starring ${item.stars}, it won ${item.academyAwards} Academy Awards and holds a ${item.rottenTomatoes}% rating on Rotten Tomatoes. The ${item.sceneName} scene became an iconic moment in cinema history, referenced across music, fashion, and pop culture. Preserved here in premium 24x36 acrylic — a true Kulture Kapsule.`;
        price = 500;
        type = 'single';
        dimensions = '24" x 36"';
        features = ["Museum-quality acrylic", "French-pleat back", "Full-size movie poster format", "Floating effect"];
      } else if (genre === 'Quotes') {
        description = `Spoken by ${item.artist} in ${item.year}, '${item.quote}' has become one of the most referenced, parodied, and culturally significant phrases in history. Whether from film, literature, or history, these words continue to resonate across generations. Preserved here in premium museum-quality acrylic — a true Kulture Kapsule.`;
      } else if (genre === 'Psychedelic/Original Art') {
        description = `${item.scientificDescription} Preserved here in premium museum-quality acrylic — a true Kulture Kapsule.`;
      } else {
        description = `${item.title} by ${item.artist}, immortalized in museum-quality acrylic. Preserved here in premium museum-quality acrylic — a true Kulture Kapsule.`;
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
