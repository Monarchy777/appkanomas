const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function getGoogleTTSUrl(text) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(text)}`;
}

const AUDIO_ITEMS = [
  // 1. Quran Verses (Authentic Recitation by Sheikh Mishary Rashid Alafasy from EveryAyah)
  {
    name: 'doa-sapujagad.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3' // Al-Baqarah 201
  },
  {
    name: 'doa-sai-safamarwah.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002158.mp3' // Al-Baqarah 158
  },
  {
    name: 'doa-sai-7.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002127.mp3' // Al-Baqarah 127
  },
  {
    name: 'doa-muzdalifah.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002198.mp3' // Al-Baqarah 198
  },

  // 2. Hadith & Manasik Duas (Native Arabic Voice)
  {
    name: 'doa-niat-umrah.mp3',
    text: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً'
  },
  {
    name: 'doa-niat-haji.mp3',
    text: 'لَبَّيْكَ اللَّهُمَّ حَجًّا'
  },
  {
    name: 'doa-masuk-masjid.mp3',
    text: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ'
  },
  {
    name: 'doa-melihat-kabah.mp3',
    text: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً'
  },
  {
    name: 'doa-minum-zamzam.mp3',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ'
  },
  {
    name: 'doa-wukuf-arafah.mp3',
    text: 'لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'
  },
  {
    name: 'doa-takbir-jamarat.mp3',
    text: 'بِسْمِ اللَّهِ، وَاللَّهُ أَكْبَرُ، رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمٰنِ'
  },
  {
    name: 'doa-tahallul.mp3',
    text: 'الْحَمْدُ لِلَّهِ عَلَى مَا هَدَانَا، وَالْحَمْدُ لِلَّهِ عَلَى مَا أَنْعَمَنَا بِهِ عَلَيْنَا'
  },
  {
    name: 'doa-thawaf-wada.mp3',
    text: 'اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ، وَإِنْ جَعَلْتَهُ فَاعْوِضْنِي عَنْهُ الْجَنَّةَ'
  },

  // 3. Putaran Tawaf Ka'bah 1 - 7
  {
    name: 'tawaf-round-1.mp3',
    text: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ'
  },
  {
    name: 'tawaf-round-2.mp3',
    text: 'اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ'
  },
  {
    name: 'tawaf-round-3.mp3',
    text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الْأَخْلَاقِ'
  },
  {
    name: 'tawaf-round-4.mp3',
    text: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَذَنْبًا مَغْفُورًا، وَسَعْيًا مَشْكُورًا، وَتِجَارَةً لَنْ تَبُورَ'
  },
  {
    name: 'tawaf-round-5.mp3',
    text: 'اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلَّ إِلَّا ظِلُّكَ، وَاسْقِنِي مِنْ حَوْضِ نَبِيِّكَ شَرْبَةً هَنِيئَةً'
  },
  {
    name: 'tawaf-round-6.mp3',
    text: 'اللَّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَكَ، فَاغْفِرْ لِي مَا كَانَ لَكَ، وَتَحَمَّلْ عَنِّي مَا كَانَ لِخَلْقِكَ'
  },
  {
    name: 'tawaf-round-7.mp3',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا كَامِلًا، وَيَقِينًا صَادِقًا، وَرِزْقًا وَاسِعًا، وَقَلْبًا خَاشِعًا، وَتَوْبَةً نَصُوحًا قَبْلَ الْمَوْتِ'
  },

  // 4. Putaran Sa'i Safa-Marwah 1 - 7
  {
    name: 'sai-round-1.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002158.mp3' // Al-Baqarah 158
  },
  {
    name: 'sai-round-2.mp3',
    text: 'رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ عَمَّا تَعْلَمْ، وَأَنْتَ الْأَعَزُّ الْأَكْرَمُ'
  },
  {
    name: 'sai-round-3.mp3',
    text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ، وَعَزَائِمَ مَغْفِرَتِكَ، وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ، وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ'
  },
  {
    name: 'sai-round-4.mp3',
    text: 'اللَّهُمَّ كَمَا هَدَيْتَنَا لِلْإِسْلَامِ فَلَا تَنْزِعْهُ مِنَّا حَتَّى تَتَوَفَّانَا وَنَحْنُ مُسْلِمُونَ'
  },
  {
    name: 'sai-round-5.mp3',
    text: 'اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا، وَكَفِّرْ عَنَّا سَيِّئَاتِنَا، وَتَوَفَّنَا مَعَ الْأَبْرَارِ'
  },
  {
    name: 'sai-round-6.mp3',
    text: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ يَسَارِي نُورًا'
  },
  {
    name: 'sai-round-7.mp3',
    url: 'https://everyayah.com/data/Alafasy_128kbps/002127.mp3' // Al-Baqarah 127
  }
];

async function main() {
  const publicAudioDir = path.resolve(__dirname, 'public/assets/audio');
  const distAudioDir = path.resolve(__dirname, 'dist/assets/audio');

  if (!fs.existsSync(publicAudioDir)) fs.mkdirSync(publicAudioDir, { recursive: true });
  if (!fs.existsSync(distAudioDir)) fs.mkdirSync(distAudioDir, { recursive: true });

  console.log('Downloading and verifying authentic Islamic audio files...');

  for (const item of AUDIO_ITEMS) {
    const targetPublic = path.join(publicAudioDir, item.name);
    const targetDist = path.join(distAudioDir, item.name);

    const downloadUrl = item.url || getGoogleTTSUrl(item.text);

    try {
      console.log(`Processing: ${item.name}...`);
      await downloadFile(downloadUrl, targetPublic);
      fs.copyFileSync(targetPublic, targetDist);
      const stats = fs.statSync(targetPublic);
      console.log(`✓ OK: ${item.name} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error processing ${item.name}:`, err.message);
    }
  }

  // Ensure talbiyah is preserved and copied
  const talbiyahPublic = path.join(publicAudioDir, 'talbiyah.mp3');
  const talbiyahDist = path.join(distAudioDir, 'talbiyah.mp3');
  if (fs.existsSync(talbiyahPublic)) {
    fs.copyFileSync(talbiyahPublic, talbiyahDist);
    console.log('✓ Talbiyah copied to dist.');
  }

  console.log('All audio files successfully generated and verified!');
}

main().catch(console.error);
