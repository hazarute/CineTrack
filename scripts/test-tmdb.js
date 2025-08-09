// Test script to check TMDB API connection
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error('HATA: TMDB_API_KEY ortam değişkeni tanımlı değil!');
  console.log('Lütfen .env dosyanızda TMDB_API_KEY değişkenini ayarlayın:');
  console.log('TMDB_API_KEY=your_tmdb_api_key_here');
  process.exit(1);
}

console.log('TMDB_API_KEY başarıyla bulundu.');
console.log('API anahtarının ilk 5 karakteri:', TMDB_API_KEY.substring(0, 5) + '...');

// Test TMDB API connection
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const testUrl = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`;

console.log('\nTMDB API bağlantısı test ediliyor...');
console.log('İstek URL:', testUrl.substring(0, testUrl.indexOf('api_key') + 8) + '***');

fetch(testUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('\n✅ TMDB API bağlantısı başarılı!');
    console.log(`Toplam ${data.results.length} film bulundu.`);
    console.log('\nİlk 3 film:');
    data.results.slice(0, 3).forEach((movie, index) => {
      console.log(`\n${index + 1}. ${movie.title} (${movie.release_date?.substring(0, 4)})`);
      console.log(`   Puan: ${movie.vote_average}/10 (${movie.vote_count} oy)`);
      console.log(`   Özet: ${movie.overview?.substring(0, 100)}...`);
    });
  })
  .catch(error => {
    console.error('\n❌ TMDB API bağlantı hatası:', error.message);
    if (error.message.includes('401')) {
      console.log('HATA: Geçersiz API anahtarı. Lütfen TMDB_API_KEY değerini kontrol edin.');
    } else if (error.message.includes('404')) {
      console.log('HATA: İstenen kaynak bulunamadı. API URL yapısını kontrol edin.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('HATA: İnternet bağlantısı yok veya TMDB API erişilemiyor.');
    }
  });
